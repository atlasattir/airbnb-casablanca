#!/usr/bin/env python3
"""
Downloads the guides' photos from Wikimedia Commons and writes content/photos.js.

    python3 tools/fetch-photos.py --sheet /tmp/planche.jpg   # what is missing or changed, and a contact sheet
    python3 tools/fetch-photos.py --exact-only     # only the files named in photos.json
    python3 tools/fetch-photos.py --force          # download the chosen photos again
    python3 tools/fetch-photos.py --repick         # choose again from files / category / search
    python3 tools/fetch-photos.py --only casablanca/hassan2,martil/martil-beach

Needs Python 3.8+ and Pillow (pip install pillow), and access to
commons.wikimedia.org and upload.wikimedia.org. Without them, use the
GitHub workflow (.github/workflows/photos.yml, see the README).

The wish list is tools/photos.json. For each place of a city guide (by its id):
    "files":    Commons file titles, best first ("File:...jpg")
    "category": a Commons category to pick from when no file works
    "search":   words to search Commons with when neither works
    "pos":      CSS object-position for the crop ("50% 35%"), optional
    "crop":     the part of the photo to keep, [left, top, right, bottom] from 0 to 1,
                optional: [0, 0, 1, 0.88] cuts off the bottom (a date printed by the camera)
    "illustr":  true when the picture shows the kind of thing, not the place
                itself (a dish for a restaurant): shown as "Illustration"
"_city" names the place whose photo is the city's picture on the home page,
"_covers" the photo of each section's tile and header (section id: place id).
To take a photo down, delete the place's entry (or empty its "files").

Only free licences are kept (CC0, public domain, CC BY, CC BY-SA). A file is
refused when Commons marks it as showing identifiable people, nominates it
for deletion, or flags it for Morocco's lack of freedom of panorama (recent
buildings), or when a CC BY file names no author. The author, the licence and
a link to the file's page are stored with each photo and shown in the guide.
What was chosen is kept in tools/photos.lock.json (commit it with the photos):
a second run reuses those choices and only fetches what changed.
"""
import argparse
import html
import io
import json
import os
import re
import ssl
import sys
import time
import unicodedata
import urllib.error
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
META = 'Artist|Attribution|LicenseShortName|LicenseUrl|UsageTerms|ObjectName|Assessments|Restrictions|NonFree|DeletionReason'
# Commons' own warnings that a file may not stay (or may not be usable in Morocco)
WARNINGS = ['Template:NoFoP-Morocco', 'Template:Delete', 'Template:Speedydelete', 'Template:Copyvio',
            'Template:No permission since', 'Template:No license since', 'Template:No source since']
FILE_PROPS = {'prop': 'imageinfo|templates', 'iiprop': 'url|size|mime|sha1|extmetadata', 'iiurlwidth': str(LARGE + 320),
              'iiextmetadatafilter': META, 'tltemplates': '|'.join(WARNINGS), 'tllimit': 'max'}

CTX = ssl.create_default_context(cafile=os.environ.get('SSL_CERT_FILE') or os.environ.get('REQUESTS_CA_BUNDLE') or None)


def get(url, tries=5):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            # Slow down when Wikimedia asks to; other refusals (404, 403…) will not change
            if e.code not in (429, 500, 502, 503, 504) or i == tries - 1:
                raise
            wait = e.headers.get('Retry-After', '')
            time.sleep(min(int(wait) if wait.isdigit() else 4 * 2 ** i, 120))
        except (urllib.error.URLError, OSError):
            if i == tries - 1:
                raise
            time.sleep(2 ** (i + 1))
    return b''


def api(params):
    params = dict(params, action='query', format='json', formatversion='2')
    return json.loads(get(API + '?' + urllib.parse.urlencode(params)).decode('utf-8'))


def clean(value):
    """Commons metadata is HTML: keep the text."""
    text = re.sub(r'<[^>]+>', ' ', value or '')
    text = html.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()


def slug(title):
    name = re.sub(r'\.\w+$', '', title.split(':', 1)[-1])
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode()  # Tétouan -> Tetouan
    name = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return name[:48].rstrip('-') or 'photo'


def licence_ok(short):
    s = (short or '').lower().replace('-', ' ')
    words = s.split()
    if not s or 'nc' in words or 'nd' in words or 'fair use' in s or 'all rights' in s:
        return False
    return s.startswith('cc0') or s.startswith('public domain') or s.startswith('pd') or s.startswith('cc by')


def pages_of(data):
    return [p for p in data.get('query', {}).get('pages', []) if p.get('imageinfo')]


def info(titles):
    """Size, licence, author and Commons warnings of the given files."""
    out = {}
    for i in range(0, len(titles), 50):  # at most 50 thumbnails per request
        batch = titles[i:i + 50]
        data = api(dict(FILE_PROPS, titles='|'.join(batch)))
        norm = {n['from']: n['to'] for n in data.get('query', {}).get('normalized', [])}
        pages = {p['title']: p for p in data.get('query', {}).get('pages', [])}
        for t in batch:
            p = pages.get(norm.get(t, t))
            out[t] = p if p and not p.get('missing') and p.get('imageinfo') else None
    return out


def category_files(cat):
    return pages_of(api(dict(FILE_PROPS, generator='categorymembers', gcmtitle=cat, gcmtype='file', gcmlimit='50')))


def search_files(words):
    return pages_of(api(dict(FILE_PROPS, generator='search', gsrsearch=words + ' filetype:bitmap', gsrnamespace='6', gsrlimit='20')))


def meta(page, key):
    return (page['imageinfo'][0].get('extmetadata', {}).get(key) or {}).get('value', '')


def usable(page):
    """Why a file cannot be used, or '' when it can."""
    ii = page['imageinfo'][0]
    lic = clean(meta(page, 'LicenseShortName'))
    if ii.get('mime') not in ('image/jpeg', 'image/png', 'image/webp', 'image/tiff'):
        return 'not a photo (%s)' % ii.get('mime')
    if min(ii.get('width', 0), ii.get('height', 0)) < 700:
        return 'too small'
    if str(meta(page, 'NonFree')).lower() == 'true' or not licence_ok(lic):
        return 'licence: %s' % (lic or '?')
    if 'personality' in str(meta(page, 'Restrictions')).lower():
        return 'shows identifiable people'
    if clean(meta(page, 'DeletionReason')):
        return 'nominated for deletion on Commons'
    flags = [t['title'].split(':', 1)[1] for t in page.get('templates', [])]
    if flags:
        return 'Commons warns: ' + ', '.join(flags)
    if lic.lower().startswith('cc by') and not (clean(meta(page, 'Attribution')) or clean(meta(page, 'Artist'))):
        return 'no author to credit'
    return ''


def score(page):
    ii = page['imageinfo'][0]
    a = str(meta(page, 'Assessments')).lower()
    s = 3 * ('featured' in a) + 2 * ('quality' in a) + 1 * ('valued' in a)
    s += 1 if ii['width'] >= ii['height'] * 1.2 else 0
    return s + min(ii['width'] / 4000.0, 1)


def best(cands, how):
    if how == 'search':
        # Relevance first: the best of the three most relevant results, not any nice photo that matches a word
        cands = sorted(cands, key=lambda p: p.get('index', 999))[:3]
    return max(cands, key=score)


def describe(page):
    ii = page['imageinfo'][0]
    by = clean(meta(page, 'Attribution')) or clean(meta(page, 'Artist'))  # in full: the credit the author asked for
    title = clean(meta(page, 'ObjectName')) or re.sub(r'\.\w+$', '', page['title'].split(':', 1)[1]).replace('_', ' ')
    return {
        'file': page['title'],
        'sha1': ii.get('sha1', ''),
        'thumb': ii.get('thumburl') or '',
        'url': ii.get('descriptionurl') or 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(page['title'].replace(' ', '_')),
        'by': by,
        'lic': clean(meta(page, 'LicenseShortName')),
        'licUrl': clean(meta(page, 'LicenseUrl')),
        'title': title[:120],
    }


def save_sizes(raw, base, crop=None):
    from PIL import Image, ImageOps
    Image.MAX_IMAGE_PIXELS = 100_000_000
    im = Image.open(io.BytesIO(raw))
    im = ImageOps.exif_transpose(im)  # upright; no EXIF is kept
    if im.mode in ('RGBA', 'LA', 'PA') or 'transparency' in im.info:
        im = im.convert('RGBA')
        flat = Image.new('RGB', im.size, (247, 246, 242))  # a transparent cut-out on the paper colour, not black
        flat.paste(im, mask=im.split()[-1])
        im = flat
    else:
        im = im.convert('RGB')
    if crop:
        w, h = im.size
        im = im.crop((round(crop[0] * w), round(crop[1] * h), round(crop[2] * w), round(crop[3] * h)))
    out = {}
    # A panorama (much wider than tall) keeps some height, for a page's header band
    pano = im.width > 2.2 * im.height
    for name, size, q in (('', LARGE, 74), ('-sm', SMALL, 70)):
        copy = im.copy()
        copy.thumbnail((size * 4, int(size * 0.7)) if pano else (size, size), Image.LANCZOS)
        path = os.path.join(ROOT, base + name + '.jpg')
        os.makedirs(os.path.dirname(path), exist_ok=True)
        copy.save(path, 'JPEG', quality=q, optimize=True, progressive=True)
        out[name or 'lg'] = (copy.size, os.path.getsize(path))
    return out


def thumb_of(page):
    """The copy to download: a panorama comes wider (Commons serves up to 3840 px), so it keeps some height."""
    ii = page['imageinfo'][0]
    if ii.get('width', 0) > 2.2 * ii.get('height', 1):
        old = FILE_PROPS['iiurlwidth']
        FILE_PROPS['iiurlwidth'] = str(min(3840, ii['width']))
        try:
            wide = info([page['title']]).get(page['title'])
        finally:
            FILE_PROPS['iiurlwidth'] = old
        if wide and wide['imageinfo'][0].get('thumburl'):
            return wide['imageinfo'][0]['thumburl']
    return ii.get('thumburl') or ''


def selection(item):
    """What decides which file is chosen and how it is cut (pos and illustr only change how it shows)."""
    keys = ('files', 'category', 'search') + (('crop',) if item.get('crop') else ())  # without a crop: as before
    return json.dumps({k: item.get(k) for k in keys}, sort_keys=True)


def exists(rel):
    return bool(rel) and os.path.exists(os.path.join(ROOT, rel.split('?')[0]))


def write_lock(lock):
    with open(LOCK, 'w', encoding='utf-8') as f:
        json.dump(lock, f, ensure_ascii=False, indent=1, sort_keys=True)


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
        got = {iid: lock[city + '/' + iid] for iid in w if not iid.startswith('_') and lock.get(city + '/' + iid, {}).get('src')}
        rows = []
        if w.get('_city') in got:
            rows.append('    _city: %s' % json.dumps(w['_city']))
        covers = {s: i for s, i in (w.get('_covers') or {}).items() if i in got}
        if covers:
            rows.append('    _covers: %s' % json.dumps(covers, ensure_ascii=False))
        for iid in sorted(got):
            e = dict(got[iid], pos=w[iid].get('pos', ''), illustr=bool(w[iid].get('illustr')))  # how it shows: from photos.json
            keep = {k: e[k] for k in ('src', 'sm', 'w', 'h', 'smw', 'by', 'lic', 'licUrl', 'url', 'title', 'pos', 'illustr') if e.get(k) not in (None, '', False)}
            rows.append('    %s: %s' % (json.dumps(iid), json.dumps(keep, ensure_ascii=False)))
        cities.append('  %s: {\n%s\n  }' % (json.dumps(city), ',\n'.join(rows)))
    lines.append(',\n'.join(cities))
    lines.append('};')
    with open(OUT_JS, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')


def contact_sheet(lock, path):
    """Every photo with its place, author and licence, to check the choices before publishing."""
    from PIL import Image, ImageDraw
    keys = [k for k in sorted(lock) if exists(lock[k].get('sm'))]
    if not keys:
        return
    cw, ch, cols = 320, 268, 6
    sheet = Image.new('RGB', (cw * cols, ch * ((len(keys) + cols - 1) // cols)), 'white')
    draw = ImageDraw.Draw(sheet)
    for n, k in enumerate(keys):
        e = lock[k]
        im = Image.open(os.path.join(ROOT, e['sm'].split('?')[0]))
        im.thumbnail((cw - 10, ch - 58))
        x, y = (n % cols) * cw, (n // cols) * ch
        sheet.paste(im, (x + 5, y + 5))
        draw.text((x + 6, y + ch - 50), k + (' [auto]' if e.get('auto') else ''), fill='black')
        draw.text((x + 6, y + ch - 36), (e.get('by') or '-')[:46], fill='#333333')
        draw.text((x + 6, y + ch - 22), e.get('lic', ''), fill='gray')
    sheet.save(path, 'JPEG', quality=80)
    print('contact sheet:', path)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--force', action='store_true', help='download the chosen photos again')
    ap.add_argument('--repick', action='store_true', help='choose again instead of keeping the locked choice')
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

    # A place taken out of photos.json loses its photo
    if not only:
        for key in list(lock):
            city, _, iid = key.partition('/')
            if iid.startswith('_') or iid not in wanted.get(city, {}):
                del lock[key]

    todo = []
    for city, w in wanted.items():
        for iid, item in w.items():
            key = city + '/' + iid
            if iid.startswith('_') or (only and key not in only):
                continue
            prev, sel = lock.get(key, {}), selection(item)
            if not (args.force or args.repick) and prev.get('sel') == sel and exists(prev.get('src')) and exists(prev.get('sm')):
                continue
            # Unless asked to choose again, the file chosen before comes first (reviewed already)
            keep = prev.get('file') if prev.get('sel') == sel and not args.repick else None
            todo.append((key, city, iid, item, sel, prev, keep))

    titles = sorted({t for *_, item, _, _, keep in todo for t in ([keep] if keep else []) + item.get('files', [])})
    print('%d places to fetch, %d files to look up' % (len(todo), len(titles)))
    by_file, errors = {}, []  # one download per file, even when two places share it
    try:
        pages = info(titles) if titles else {}
    except Exception as e:  # Commons out of reach: change nothing, only tidy up (removed places)
        print('Commons could not be reached (%s): every photo stays as it is.' % e)
        errors.append('lookup: %s' % e)
        todo = []

    for key, city, iid, item, sel, prev, keep in todo:
        chosen, notes, auto = None, [], prev.get('auto', False) if keep else False
        try:
            for t in ([keep] if keep else []) + [t for t in item.get('files', []) if t != keep]:
                p = pages.get(t)
                why = 'not found' if not p else usable(p)
                if why:
                    notes.append('%s: %s' % (t, why))
                    continue
                chosen, auto = p, (auto if t == keep else False)
                break
            # Else the best free photo of a category, else of a search: marked [auto] on the contact sheet
            for how in ('category', 'search'):
                arg = item.get(how)
                if chosen or not arg or args.exact_only:
                    continue
                try:
                    found = category_files(arg) if how == 'category' else search_files(arg)
                except Exception as e:
                    notes.append('%s: %s' % (arg, e))
                    continue
                cands = [p for p in found if not usable(p)]
                if cands:
                    chosen, auto = best(cands, how), True
            if not chosen:
                print('  - %-34s no usable photo  %s' % (key, '; '.join(notes)))
                lock[key] = {'sel': sel, 'notes': notes}
                continue
            e = describe(chosen)
            crop = item.get('crop')
            ref = e['file'] + (json.dumps(crop) if crop else '')
            if ref in by_file:
                src, sm, size, smw = by_file[ref]
                print('  = %-34s %s  (shared)' % (key, e['file']))
            else:
                if not e['thumb']:
                    raise ValueError('no thumbnail from Commons')
                raw = get(thumb_of(chosen) or e['thumb'])
                # Named after the photo, not the place: two places may share one
                base = '%s/%s/%s-%s' % (IMG_DIR, city, slug(e['file']), (e['sha1'] or 'x')[:6]) + ('-crop' if crop else '')
                sizes = save_sizes(raw, base, crop)
                v = (e['sha1'] or 'x')[:8] + ('c' if crop else '')
                src, sm, size, smw = base + '.jpg?v=' + v, base + '-sm.jpg?v=' + v, sizes['lg'][0], sizes['-sm'][0][0]
                by_file[ref] = (src, sm, size, smw)
                print('  + %-34s %s  (%s, %d KB + %d KB)' % (key, e['file'], e['lic'], sizes['lg'][1] // 1024, sizes['-sm'][1] // 1024))
                time.sleep(0.3)
            e.update({'src': src, 'sm': sm, 'w': size[0], 'h': size[1], 'smw': smw, 'sel': sel, 'auto': auto, 'notes': notes})
            e.pop('thumb', None)
            lock[key] = e
        except Exception as err:  # one failure does not stop the others; the previous photo stays
            errors.append('%s: %s' % (key, err))
            print('  ! %-34s %s%s' % (key, err, '  (keeps its previous photo)' if prev.get('src') else ''))
            if prev:
                lock[key] = prev
        write_lock(lock)  # after each place: an interrupted run keeps what it got

    write_lock(lock)
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
    missing = sorted(k for k in lock if not lock[k].get('src'))
    if missing:
        print('without a photo (they keep their icon):', ', '.join(missing))
    if errors:
        print('errors (run again later):', '; '.join(errors))
    return 0


if __name__ == '__main__':
    sys.exit(main())
