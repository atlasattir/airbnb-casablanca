#!/usr/bin/env python3
"""
Finds open-licence videos of Morocco on Wikimedia Commons, for the guide's film.

    python3 tools/film-sources.py find   out/      # candidates: a contact sheet + small previews
    python3 tools/film-sources.py fetch  out/ "File:A.webm" "File:B.webm#30-45"   # the chosen ones, full size
                                                   # (#30-45: only seconds 30 to 45)

Needs Python 3.8+, Pillow and ffmpeg, and access to commons.wikimedia.org and
upload.wikimedia.org (or run it on GitHub: .github/workflows/film.yml).

"find" asks Commons for videos about Morocco (its cities, the desert, the coast,
the mountains), keeps only free licences (CC0, public domain, CC BY, CC BY-SA)
and files not marked as showing identifiable people, then draws four frames of
each on candidates.jpg, with its title, length, size, licence and author
(candidates.json has the same, with the links). "fetch" downloads the chosen
files at their best size up to 1080p, with their credits (sources.json).
"""
import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
fp = __import__('fetch-photos')  # same Commons helpers as the photos: get, api, clean, licence_ok

SEARCHES = ['Morocco', 'Maroc', 'Marrakech', 'Marrakesh', 'Jemaa el-Fna', 'Koutoubia', 'Casablanca', 'Hassan II Mosque',
            'Chefchaouen', 'Fez Morocco', 'Fes medina', 'Essaouira', 'Merzouga', 'Sahara Morocco', 'Erg Chebbi',
            'Atlas Mountains Morocco', 'Ait Benhaddou', 'Tangier', 'Tetouan', 'Martil', 'Rabat', 'Agadir', 'Ouarzazate',
            'Moroccan tea', 'Morocco souk', 'Morocco drone']
CATEGORIES = ['Category:Videos of Morocco', 'Category:Videos of Marrakesh', 'Category:Videos of Casablanca',
              'Category:Videos of Fez', 'Category:Videos of Chefchaouen', 'Category:Videos of Essaouira',
              'Category:Videos of the Sahara', 'Category:Drone videos of Morocco']
VPROPS = {'prop': 'videoinfo', 'viprop': 'url|size|mime|extmetadata|derivatives', 'viextmetadatafilter': fp.META + '|ImageDescription|Categories'}
# A candidate must be about Morocco: one of these in its title, description or categories
MOROCCO = re.compile(r'morocc|maroc|marokk|marruec|marrak|casablanca|chefchaouen|chaouen|\bf[eè]s\b|fez,|medina of fe|essaouira|merzouga|'
                     r'erg chebbi|sahara|atlas mountain|high atlas|toubkal|ait.?ben|tanger|tangier|t[eé]touan|martil|rabat|agadir|ouarzazate|'
                     r'djemaa|jemaa|jamaa|koutoubia|hassan ii|majorelle|ifrane|meknes|volubilis|todra|dades|zagora', re.I)
NOT_SCENERY = re.compile(r'interview|entrevista|press|conference|speech|discours|debate|gameplay|occupation|protest|parliament|lecture|news', re.I)


def pages(data):
    return [p for p in data.get('query', {}).get('pages', []) if p.get('videoinfo')]


def candidates():
    seen = {}
    for q in SEARCHES:
        try:
            for p in pages(fp.api(dict(VPROPS, generator='search', gsrsearch=q + ' filetype:video', gsrnamespace='6', gsrlimit='40'))):
                seen.setdefault(p['title'], p)
        except Exception as e:
            print('search', q, e)
        time.sleep(0.2)
    for c in CATEGORIES:
        try:
            for p in pages(fp.api(dict(VPROPS, generator='categorymembers', gcmtitle=c, gcmtype='file', gcmlimit='100'))):
                seen.setdefault(p['title'], p)
        except Exception as e:
            print('category', c, e)
    return list(seen.values())


def meta(p, key):
    return (p['videoinfo'][0].get('extmetadata', {}).get(key) or {}).get('value', '')


def usable(p):
    vi = p['videoinfo'][0]
    lic = fp.clean(meta(p, 'LicenseShortName'))
    if not str(vi.get('mime', '')).startswith('video/'):
        return 'not a video'
    if (vi.get('duration') or 0) < 5:
        return 'too short'
    if (vi.get('duration') or 0) > 240:
        return 'too long (an interview or a lecture, not scenery)'
    about = ' '.join([p['title'], fp.clean(meta(p, 'ImageDescription')), fp.clean(meta(p, 'Categories')), fp.clean(meta(p, 'ObjectName'))])
    if not MOROCCO.search(about):
        return 'not about Morocco'
    if NOT_SCENERY.search(about):
        return 'not scenery'
    if (vi.get('width') or 0) < 1280:
        return 'too small'
    if str(meta(p, 'NonFree')).lower() == 'true' or not fp.licence_ok(lic):
        return 'licence: ' + (lic or '?')
    if 'personality' in str(meta(p, 'Restrictions')).lower():
        return 'shows identifiable people'
    if fp.clean(meta(p, 'DeletionReason')):
        return 'nominated for deletion'
    return ''


def derivative(p, best=1080):
    """The best transcode up to `best` lines (Commons offers VP9 WebM at 240p … 2160p)."""
    vi = p['videoinfo'][0]
    out = []
    for d in vi.get('derivatives', []):
        m = re.match(r'(\d+)p\.vp9\.webm', d.get('transcodekey', ''))
        if m and int(m.group(1)) <= best:
            out.append((int(m.group(1)), d['src']))
    if out:
        return max(out)[1]
    return vi['url']


def describe(p):
    vi = p['videoinfo'][0]
    return {'file': p['title'], 'url': vi.get('descriptionurl'), 'duration': round(vi.get('duration') or 0, 1),
            'size': '%dx%d' % (vi.get('width', 0), vi.get('height', 0)),
            'by': fp.clean(meta(p, 'Attribution')) or fp.clean(meta(p, 'Artist')),
            'lic': fp.clean(meta(p, 'LicenseShortName')), 'licUrl': fp.clean(meta(p, 'LicenseUrl')),
            'title': fp.clean(meta(p, 'ObjectName')) or p['title'][5:]}


def frames(video, n=6):
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video],
                               capture_output=True, text=True).stdout.strip() or 0)
    shots = []
    for i in range(n):
        t = dur * (0.1 + 0.8 * i / max(n - 1, 1))
        r = subprocess.run(['ffmpeg', '-v', 'error', '-ss', '%.2f' % t, '-i', video, '-frames:v', '1', '-vf', 'scale=320:-2', '-f', 'image2pipe', '-vcodec', 'png', '-'],
                           capture_output=True)
        shots.append((t, r.stdout))
    return shots


def find(out):
    from PIL import Image, ImageDraw
    os.makedirs(out + '/preview', exist_ok=True)
    found = candidates()
    keep, rows = [], []
    for p in found:
        why = usable(p)
        if why:
            continue
        keep.append(p)
    keep.sort(key=lambda p: p['title'])
    print('%d videos found, %d usable' % (len(found), len(keep)))
    sheet_rows = []
    for i, p in enumerate(keep[:60]):
        e = describe(p)
        e['n'] = i
        src = derivative(p, best=480)
        path = '%s/preview/%02d.webm' % (out, i)
        try:
            with open(path, 'wb') as f:
                f.write(fp.get(src))
            shots = frames(path)
            e['frames'] = [round(t, 1) for t, _ in shots]
            sheet_rows.append((e, shots))
        except Exception as err:
            e['error'] = str(err)
        rows.append(e)
        print('  %02d %-60s %5ss %s %s' % (i, e['file'][:60], e['duration'], e['size'], e['lic']))
        time.sleep(0.3)
    with open(out + '/candidates.json', 'w', encoding='utf-8') as f:
        json.dump(rows, f, ensure_ascii=False, indent=1)
    if sheet_rows:
        W, H = 6 * 330 + 10, 210
        sheet = Image.new('RGB', (W, H * len(sheet_rows)), 'white')
        d = ImageDraw.Draw(sheet)
        for r, (e, shots) in enumerate(sheet_rows):
            y = r * H
            for c, (t, png) in enumerate(shots):
                if png:
                    im = Image.open(io.BytesIO(png)).convert('RGB')
                    im.thumbnail((320, 180))
                    sheet.paste(im, (10 + c * 330, y + 4))
                d.text((10 + c * 330, y + 186), '%.1fs' % t, fill='gray')
            d.text((10, y + 196), '%02d  %s  ·  %ss  %s  ·  %s  ·  %s' % (e['n'], e['file'][5:70], e['duration'], e['size'], e['lic'], (e['by'] or '')[:40]), fill='black')
        sheet.save(out + '/candidates.jpg', quality=78)


def fetch(out, wanted):
    os.makedirs(out + '/src', exist_ok=True)
    parts = {}
    for w in wanted:
        title, _, seg = w.partition('#')
        parts[title.strip()] = seg.strip()
    data = fp.api(dict(VPROPS, titles='|'.join(parts)))
    norm = {n['to']: n['from'] for n in data.get('query', {}).get('normalized', [])}
    got = []
    for p in pages(data):
        why = usable(p)
        if why:
            print('  -', p['title'], why)
            continue
        e = describe(p)
        seg = parts.get(p['title']) or parts.get(norm.get(p['title'], ''), '')
        raw = out + '/src/' + fp.slug(p['title']) + '.source'
        with open(raw, 'wb') as f:
            f.write(fp.get(derivative(p, best=1080)))
        # The part used (or all of it), at high quality, without sound
        name = fp.slug(p['title']) + ('-%s' % seg.replace('-', '_') if seg else '') + '.mp4'
        cut = ['-ss', seg.split('-')[0], '-to', seg.split('-')[1]] if seg else []
        subprocess.run(['ffmpeg', '-v', 'error', '-y'] + cut + ['-i', raw, '-an', '-c:v', 'libx264', '-crf', '17', '-preset', 'fast',
                        '-pix_fmt', 'yuv420p', out + '/src/' + name], check=True)
        os.remove(raw)
        e['src'] = 'src/' + name
        e['segment'] = seg
        got.append(e)
        print('  +', p['title'], e['lic'], e['by'][:40])
    with open(out + '/sources.json', 'w', encoding='utf-8') as f:
        json.dump(got, f, ensure_ascii=False, indent=1)


if __name__ == '__main__':
    mode, out = sys.argv[1], sys.argv[2]
    if mode == 'find':
        find(out)
    else:
        fetch(out, sys.argv[3:])
