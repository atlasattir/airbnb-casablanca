#!/usr/bin/env python3
"""
Downloads the guides' photos from Wikimedia Commons and writes content/photos.js.

    python3 tools/fetch-photos.py                  # what is missing or changed
    python3 tools/fetch-photos.py --force          # everything again
    python3 tools/fetch-photos.py --only casablanca/hassan2,martil/martil-beach
    python3 tools/fetch-photos.py --sheet review.jpg   # also a contact sheet to check the picks
    python3 tools/fetch-photos.py --exact-only     # only the files named in photos.json

Needs Python 3.8+ and Pillow (pip install pillow), and access to
commons.wikimedia.org and upload.wikimedia.org.

The wish list is tools/photos.json. For each place of a city guide (by its id):
    "files":    Commons file titles, best first ("File:...jpg")
    "category": a Commons category to pick from when no file works
    "search":   words to search Commons with when neither works
    "pos":      CSS object-position for the crop ("50% 35%"), optional
    "illustr":  true when the picture shows the kind of thing, not the place
                itself (a dish for a restaurant): shown as "Illustration"
"_city" names the place whose photo is the city's picture on the home page,
"_covers" the photo of each section's tile and header (section id: place id).

Only free licences are kept (CC0, public domain, CC BY, CC BY-SA), never a
file marked as showing identifiable people. The author, the licence and a
link to the file's page are stored with each photo and shown in the guide.
What was chosen is kept in tools/photos.lock.json, so a second run only
fetches what changed.
"""
import argparse
import hashlib
import html
import io
import json
import os
import re
import ssl
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WANTED = os.path.join(ROOT, 'tools', 'photos.json')
LOCK = os.path.join(ROOT, 'tools', 'photos.lock.json')
OUT_JS = os.path.join(ROOT, 'content', 'photos.js')
IMG_DIR = 'assets/img/photos'
API = 'https://commons.wikimedia.org/w/api.php'
# Wikimedia asks every tool to name itself
UA = 'DarnaCollectionGuide/1.0 (https://github.com/atlasattir/airbnb-casablanca; photo fetcher)'
LARGE, SMALL = 1280, 640
META = 'Artist|Attribution|LicenseShortName|LicenseUrl|UsageTerms|ObjectName|Assessments|Restrictions|NonFree|Copyrighted'

CTX = ssl.create_default_context(cafile=os.environ.get('SSL_CERT_FILE') or os.environ.get('REQUESTS_CA_BUNDLE') or None)


def get(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
                return r.read()
        except Exception:  # network hiccup, or Wikimedia asking to slow down
            if i == tries - 1:
                raise
            time.sleep(2 ** (i + 1))
    return b''


def slug(title):
    name = re.sub(r'\.\w+$', '', title.split(':', 1)[-1])
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode()  # Tétouan -> Tetouan
    name = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return (name[:48].rstrip('-') or 'photo')


def api(params):
    params = dict(params, format='json', formatversion='2')
    return json.loads(get(API + '?' + urllib.parse.urlencode(params)).decode('utf-8'))


def clean(value):
    """Commons metadata is HTML: keep the text."""
    text = re.sub(r'<[^>]+>', ' ', value or '')
    text = html.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()


def licence_ok(short):
    s = (short or '').lower().replace('-', ' ')
    if not s or 'nc' in s.split() or 'nd' in s.split() or 'fair use' in s or 'all rights' in s:
        return False
    return s.startswith('cc0') or s.startswith('public domain') or s.startswith('pd') or s.startswith('cc by')


def info(titles):
    """Size, licence and author of up to 50 files."""
    out = {}
    for i in range(0, len(titles), 50):
        data = api({'action': 'query', 'prop': 'imageinfo', 'titles': '|'.join(titles[i:i + 50]),
                    'iiprop': 'url|size|mime|sha1|extmetadata', 'iiurlwidth': str(LARGE + 320),
                    'iiextmetadatafilter': META})
        norm = {n['from']: n['to'] for n in data.get('query', {}).get('normalized', [])}
        pages = {p['title']: p for p in data.get('query', {}).get('pages', [])}
        for t in titles[i:i + 50]:
            p = pages.get(norm.get(t, t))
            out[t] = p if p and not p.get('missing') and p.get('imageinfo') else None
    return out


def category_files(cat, limit=60):
    data = api({'action': 'query', 'generator': 'categorymembers', 'gcmtitle': cat, 'gcmtype': 'file',
                'gcmlimit': str(limit), 'prop': 'imageinfo', 'iiprop': 'url|size|mime|sha1|extmetadata',
                'iiurlwidth': str(LARGE + 320), 'iiextmetadatafilter': META})
    return [p for p in data.get('query', {}).get('pages', []) if p.get('imageinfo')]


def search_files(words, limit=40):
    data = api({'action': 'query', 'generator': 'search', 'gsrsearch': words + ' filetype:bitmap', 'gsrnamespace': '6',
                'gsrlimit': str(limit), 'prop': 'imageinfo', 'iiprop': 'url|size|mime|sha1|extmetadata',
                'iiurlwidth': str(LARGE + 320), 'iiextmetadatafilter': META})
    return [p for p in data.get('query', {}).get('pages', []) if p.get('imageinfo')]


def usable(page):
    """Why a file cannot be used, or '' when it can."""
    ii = page['imageinfo'][0]
    m = ii.get('extmetadata', {})
    v = lambda k: (m.get(k) or {}).get('value', '')
    if ii.get('mime') not in ('image/jpeg', 'image/png', 'image/webp', 'image/tiff'):
        return 'not a photo (%s)' % ii.get('mime')
    if min(ii.get('width', 0), ii.get('height', 0)) < 700:
        return 'too small'
    if str(v('NonFree')).lower() == 'true' or not licence_ok(v('LicenseShortName')):
        return 'licence: %s' % (v('LicenseShortName') or '?')
    if 'personality' in str(v('Restrictions')).lower():
        return 'shows identifiable people'
    return ''


def score(page):
    ii = page['imageinfo'][0]
    a = str((ii.get('extmetadata', {}).get('Assessments') or {}).get('value', '')).lower()
    s = 3 * ('featured' in a) + 2 * ('quality' in a) + 1 * ('valued' in a)
    s += 1 if ii['width'] >= ii['height'] * 1.2 else 0
    return s + min(ii['width'] / 4000.0, 1)


def describe(page, item):
    ii = page['imageinfo'][0]
    m = ii.get('extmetadata', {})
    v = lambda k: (m.get(k) or {}).get('value', '')
    by = clean(v('Attribution')) or clean(v('Artist')) or 'Wikimedia Commons'
    if len(by) > 80:
        by = by[:77].rstrip() + '…'
    title = clean(v('ObjectName')) or re.sub(r'\.\w+$', '', page['title'].split(':', 1)[1]).replace('_', ' ')
    return {
        'file': page['title'],
        'sha1': ii.get('sha1', ''),
        'thumb': ii.get('thumburl') or ii['url'],
        'url': ii.get('descriptionurl') or 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(page['title'].replace(' ', '_')),
        'by': by,
        'lic': clean(v('LicenseShortName')),
        'licUrl': clean(v('LicenseUrl')),
        'title': title[:90],
        'pos': item.get('pos', ''),
        'illustr': bool(item.get('illustr')),
    }


def save_sizes(raw, base):
    from PIL import Image, ImageOps
    im = Image.open(io.BytesIO(raw))
    im = ImageOps.exif_transpose(im).convert('RGB')  # upright, no EXIF kept
    out = {}
    for name, size, q in (('', LARGE, 74), ('-sm', SMALL, 70)):
        copy = im.copy()
        copy.thumbnail((size, size), Image.LANCZOS)
        path = os.path.join(ROOT, base + name + '.jpg')
        os.makedirs(os.path.dirname(path), exist_ok=True)
        copy.save(path, 'JPEG', quality=q, optimize=True, progressive=True)
        out[name or 'lg'] = (copy.size, os.path.getsize(path))
    return out


def write_js(lock, wanted):
    lines = ['/*',
             ' * Photos of the places in the guides: open-licence pictures from Wikimedia Commons.',
             ' * Made by tools/fetch-photos.py from tools/photos.json: do not edit by hand.',
             ' * A place without a photo shows its drawn icon.',
             ' */',
             'window.CASA = window.CASA || {};',
             'CASA.photos = {']
    cities = []
    for city in sorted(wanted):
        w = wanted[city]
        got = {k.split('/', 1)[1]: e for k, e in lock.items() if k.startswith(city + '/') and e.get('src')}
        rows = []
        if w.get('_city') in got:
            rows.append('    _city: %s' % json.dumps(w['_city']))
        covers = {s: i for s, i in (w.get('_covers') or {}).items() if i in got}
        if covers:
            rows.append('    _covers: %s' % json.dumps(covers, ensure_ascii=False))
        for iid in sorted(got):
            e = got[iid]
            keep = {k: e[k] for k in ('src', 'sm', 'w', 'h', 'by', 'lic', 'licUrl', 'url', 'title', 'pos', 'illustr') if e.get(k) not in (None, '', False)}
            rows.append('    %s: %s' % (json.dumps(iid), json.dumps(keep, ensure_ascii=False)))
        cities.append('  %s: {\n%s\n  }' % (city, ',\n'.join(rows)))
    lines.append(',\n'.join(cities))
    lines.append('};')
    with open(OUT_JS, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')


def contact_sheet(lock, path):
    from PIL import Image, ImageDraw
    keys = [k for k in sorted(lock) if lock[k].get('sm')]
    if not keys:
        return
    cw, ch, cols = 320, 250, 6
    sheet = Image.new('RGB', (cw * cols, ch * ((len(keys) + cols - 1) // cols)), 'white')
    draw = ImageDraw.Draw(sheet)
    for n, k in enumerate(keys):
        im = Image.open(os.path.join(ROOT, lock[k]['sm'].split('?')[0]))
        im.thumbnail((cw - 10, ch - 40))
        x, y = (n % cols) * cw, (n // cols) * ch
        sheet.paste(im, (x + 5, y + 5))
        label = k + (' [auto]' if lock[k].get('auto') else '') + (' [illustr]' if lock[k].get('illustr') else '')
        draw.text((x + 6, y + ch - 32), label, fill='black')
        draw.text((x + 6, y + ch - 18), lock[k].get('lic', ''), fill='gray')
    sheet.save(path, 'JPEG', quality=80)
    print('contact sheet:', path)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--force', action='store_true', help='fetch everything again')
    ap.add_argument('--only', default='', help='comma-separated city/id keys')
    ap.add_argument('--sheet', default='', help='write a contact sheet (JPEG) of all photos')
    ap.add_argument('--exact-only', action='store_true', help='never pick from a category or a search')
    args = ap.parse_args()

    with open(WANTED, encoding='utf-8') as f:
        wanted = json.load(f)
    lock = {}
    if os.path.exists(LOCK):
        with open(LOCK, encoding='utf-8') as f:
            lock = json.load(f)
    only = set(filter(None, args.only.split(',')))

    todo = []
    for city, w in wanted.items():
        for iid, item in w.items():
            if iid.startswith('_'):
                continue
            key = city + '/' + iid
            if only and key not in only:
                continue
            wish = json.dumps(item, sort_keys=True)
            if not args.force and lock.get(key, {}).get('wish') == wish and lock[key].get('src') and \
                    os.path.exists(os.path.join(ROOT, lock[key]['src'].split('?')[0])):
                continue
            todo.append((key, city, iid, item, wish))

    titles = sorted({t for _, _, _, it, _ in todo for t in it.get('files', [])})
    print('%d places to fetch, %d files to look up' % (len(todo), len(titles)))
    pages = info(titles) if titles else {}
    by_file = {}  # one download per file, even when two places share it

    for key, city, iid, item, wish in todo:
        chosen, notes, auto = None, [], False
        for t in item.get('files', []):
            p = pages.get(t)
            why = 'not found' if not p else usable(p)
            if why:
                notes.append('%s: %s' % (t, why))
                continue
            chosen = p
            break
        # Else the best free photo of a category, else of a search: marked [auto] on the contact sheet
        for how, arg in (('category', item.get('category')), ('search', item.get('search'))):
            if chosen or not arg or args.exact_only:
                continue
            cands = []
            try:
                found = category_files(arg) if how == 'category' else search_files(arg)
                cands = [p for p in found if not usable(p)]
            except Exception as e:
                notes.append('%s: %s' % (arg, e))
            if cands:
                chosen, auto = max(cands, key=score), True
        if not chosen:
            print('  - %-34s no usable photo  %s' % (key, '; '.join(notes)))
            lock[key] = {'wish': wish, 'notes': notes}
            continue
        e = describe(chosen, item)
        if e['file'] in by_file:
            src, sm, size = by_file[e['file']]
            print('  = %-34s %s  (shared)' % (key, e['file']))
        else:
            raw = get(e['thumb'])
            # Named after the photo, not the place: two places may share one
            base = '%s/%s/%s-%s' % (IMG_DIR, city, slug(e['file']), (e['sha1'] or 'x')[:6])
            sizes = save_sizes(raw, base)
            v = (e['sha1'] or hashlib.sha1(raw).hexdigest())[:8]
            src, sm, size = base + '.jpg?v=' + v, base + '-sm.jpg?v=' + v, sizes['lg'][0]
            by_file[e['file']] = (src, sm, size)
            print('  + %-34s %s  (%s, %d KB + %d KB)' % (key, e['file'], e['lic'], sizes['lg'][1] // 1024, sizes['-sm'][1] // 1024))
            time.sleep(0.3)
        e.update({'src': src, 'sm': sm, 'w': size[0], 'h': size[1], 'wish': wish, 'auto': auto, 'notes': notes})
        e.pop('thumb', None)
        lock[key] = e

    with open(LOCK, 'w', encoding='utf-8') as f:
        json.dump(lock, f, ensure_ascii=False, indent=1, sort_keys=True)
    write_js(lock, wanted)
    print('wrote', os.path.relpath(OUT_JS, ROOT))

    # Photos no place uses any more
    used = {e[k].split('?')[0] for e in lock.values() for k in ('src', 'sm') if e.get(k)}
    for dirpath, _, names in os.walk(os.path.join(ROOT, IMG_DIR)):
        for n in names:
            rel = os.path.relpath(os.path.join(dirpath, n), ROOT).replace(os.sep, '/')
            if rel not in used:
                os.remove(os.path.join(dirpath, n))
                print('  removed', rel)
    if args.sheet:
        contact_sheet(lock, args.sheet)
    missing = [k for k in lock if not lock[k].get('src')]
    if missing:
        print('without a photo (they keep their icon):', ', '.join(sorted(missing)))


if __name__ == '__main__':
    sys.exit(main())
