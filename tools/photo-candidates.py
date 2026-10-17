#!/usr/bin/env python3
"""
Shows the free photos Commons offers for places still without one, to choose from by eye.

    python3 tools/photo-candidates.py out/                          # every place of photos.json without a photo
    python3 tools/photo-candidates.py out/ casablanca/aindiab morocco/door

For each place it looks at its "files", "category" and "search" (tools/photos.json),
keeps what fetch-photos.py would accept (free licence, no identifiable people, no
Commons warning) and draws up to six of them, numbered, with author and licence, on
out/candidates-1.jpg, -2.jpg… (eight places per sheet). out/candidates.json has the
same, with the file titles. Put the chosen title first in the place's "files", then
run the Photos workflow (or fetch-photos.py). Same needs as fetch-photos.py.
"""
import io
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
fp = __import__('fetch-photos')
fp.FILE_PROPS['iiurlwidth'] = '360'  # small thumbnails are enough to choose

PER_PLACE, PER_SHEET, TW, TH = 6, 8, 300, 200


def candidates(item):
    seen, out = set(), []

    def add(pages, how):
        for p in pages:
            if p['title'] in seen or fp.usable(p):
                continue
            seen.add(p['title'])
            out.append((how, p))
    named = [t for t in item.get('files', [])]
    if named:
        add([p for p in (fp.info(named).get(t) for t in named) if p], 'file')
    for how in ('search', 'category'):
        if not item.get(how):
            continue
        try:
            pages = fp.search_files(item[how]) if how == 'search' else fp.category_files(item[how])
        except Exception as e:
            print('   ', how, item[how], e)
            continue
        if how == 'search':
            pages.sort(key=lambda p: p.get('index', 999))
        else:
            pages.sort(key=fp.score, reverse=True)
        add(pages[:12], how)
        time.sleep(0.2)
    # A few of each way of finding, the named files first
    picked = [c for c in out if c[0] == 'file']
    rest = [c for c in out if c[0] != 'file']
    by = {'search': [c for c in rest if c[0] == 'search'], 'category': [c for c in rest if c[0] == 'category']}
    while len(picked) < PER_PLACE and (by['search'] or by['category']):
        for k in ('search', 'category'):
            if by[k] and len(picked) < PER_PLACE:
                picked.append(by[k].pop(0))
    return picked


def main():
    from PIL import Image, ImageDraw, ImageFont
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    with open(fp.WANTED, encoding='utf-8') as f:
        wanted = json.load(f)
    lock = {}
    if os.path.exists(fp.LOCK):
        with open(fp.LOCK, encoding='utf-8') as f:
            lock = json.load(f)
    keys = sys.argv[2:] or [c + '/' + i for c, w in wanted.items() for i in w
                             if not i.startswith('_') and not lock.get(c + '/' + i, {}).get('src')]
    rows, report = [], {}
    for key in keys:
        city, _, iid = key.partition('/')
        item = wanted.get(city, {}).get(iid)
        if not item:
            print('  ? %s is not in photos.json' % key)
            continue
        found = candidates(item)
        report[key] = [{'n': n + 1, 'file': p['title'], 'how': how, 'by': fp.clean(fp.meta(p, 'Attribution')) or fp.clean(fp.meta(p, 'Artist')),
                        'lic': fp.clean(fp.meta(p, 'LicenseShortName')), 'size': '%dx%d' % (p['imageinfo'][0]['width'], p['imageinfo'][0]['height'])}
                       for n, (how, p) in enumerate(found)]
        thumbs = []
        for how, p in found:
            try:
                thumbs.append(fp.get(p['imageinfo'][0]['thumburl']))
            except Exception as e:
                thumbs.append(b'')
                print('   ', p['title'], e)
            time.sleep(0.15)
        rows.append((key, item, report[key], thumbs))
        print('  %-34s %d candidates' % (key, len(found)))
    with open(os.path.join(out, 'candidates.json'), 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=1)
    try:
        font, small = ImageFont.load_default(size=22), ImageFont.load_default(size=15)
    except TypeError:  # Pillow before 10.1
        font = small = ImageFont.load_default()
    rh = 34 + TH + 44
    for s in range(0, len(rows), PER_SHEET):
        part = rows[s:s + PER_SHEET]
        sheet = Image.new('RGB', (PER_PLACE * (TW + 10) + 10, rh * len(part)), 'white')
        d = ImageDraw.Draw(sheet)
        for r, (key, item, rep, thumbs) in enumerate(part):
            y = r * rh
            d.text((10, y + 6), '%s   (%s)' % (key, item.get('search') or item.get('category') or ''), fill='black', font=font)
            for c, (e, raw) in enumerate(zip(rep, thumbs)):
                x = 10 + c * (TW + 10)
                if raw:
                    im = Image.open(io.BytesIO(raw)).convert('RGB')
                    im.thumbnail((TW, TH))
                    sheet.paste(im, (x, y + 34))
                d.text((x, y + 36 + TH), '#%d %s %s' % (e['n'], e['lic'], e['size']), fill='black', font=small)
                d.text((x, y + 54 + TH), (e['by'] or '-')[:34], fill='#555555', font=small)
            if not rep:
                d.text((10, y + 40), 'nothing usable', fill='red', font=font)
        path = os.path.join(out, 'candidates-%d.jpg' % (s // PER_SHEET + 1))
        sheet.save(path, quality=82)
        print('sheet', path)


if __name__ == '__main__':
    main()
