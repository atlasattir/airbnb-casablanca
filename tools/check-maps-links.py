#!/usr/bin/env python3
"""
Checks each place's "Localisation" link (the host's Google Maps link, mapsUrl in
content/stays/<id>.js) still opens a Google Maps place, close to the area the guide shows.

    python3 tools/check-maps-links.py      (or GitHub → Actions → Maps links → Run workflow)

It prints only whether each link works and how far its pin is from the place's area in
content/brand.js, never the pin itself: the logs of a public repository are public.
Needs node (to read the content files) and access to maps.app.goo.gl.
"""
import json
import math
import os
import re
import subprocess
import sys
import urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
UA = ('Mozilla/5.0 (Linux; Android 14; SM-A556B) AppleWebKit/537.36 (KHTML, like Gecko) '
      'Chrome/126.0 Mobile Safari/537.36')
FAR_KM = 5  # the areas in brand.js are rounded to two decimals, about a kilometre

READ = r"""
const fs = require('fs'), vm = require('vm'), path = require('path');
const win = vm.createContext({}); win.window = win;
const load = f => vm.runInContext(fs.readFileSync(path.join(process.argv[1], f), 'utf8'), win);
load('content/brand.js');
const out = [];
for (const s of win.CASA.brand.stays) {
  load('content/stays/' + s.id + '.js');
  const loc = (win.CASA.stays[s.id] || {}).location || {};
  out.push({ id: s.id, lat: s.lat, lng: s.lng, url: loc.mapsUrl || '' });
}
console.log(JSON.stringify(out));
"""


def km(a, b):
    r = math.pi / 180
    h = (math.sin((b[0] - a[0]) * r / 2) ** 2 +
         math.cos(a[0] * r) * math.cos(b[0] * r) * math.sin((b[1] - a[1]) * r / 2) ** 2)
    return 12742 * math.asin(min(1, math.sqrt(h)))


def pin(url):
    # The place itself (!3d…!4d…), else the map's centre (@lat,lng), else a q= or ll= pair
    for pat in (r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', r'@(-?\d+\.\d+),(-?\d+\.\d+)',
                r'[?&](?:q|ll|query)=(-?\d+\.\d+)(?:,|%2C)(-?\d+\.\d+)'):
        m = re.search(pat, url)
        if m:
            return float(m.group(1)), float(m.group(2))
    return None


def main():
    stays = json.loads(subprocess.check_output(['node', '-e', READ, ROOT], text=True))
    bad = 0
    for s in stays:
        if not s['url']:
            print('  %-12s no link: "Localisation" searches the area name instead' % s['id'])
            continue
        try:
            req = urllib.request.Request(s['url'], headers={'User-Agent': UA, 'Accept-Language': 'fr'})
            with urllib.request.urlopen(req, timeout=30) as r:
                final, status = r.geturl(), r.status
        except Exception as e:
            print('✗ %-12s the link does not open: %s' % (s['id'], e))
            bad += 1
            continue
        kind = ('a place' if '/maps/place/' in final else 'a search' if '/maps/search/' in final
                else 'directions' if '/maps/dir/' in final else 'a map' if '/maps' in final else None)
        where = pin(final)
        if not kind or not where:
            # Say what it opens, by its shape only: the page and the names of its parameters
            path = re.sub(r'[?#].*', '', final).split('/', 3)
            names = sorted(set(re.findall(r'[?&]([a-z_]+)=', final)))
            print('✗ %-12s opens %s/%s (parameters: %s), not a Google Maps place with a pin'
                  % (s['id'], path[2], (path[3] if len(path) > 3 else '').split('/')[0], ', '.join(names) or 'none'))
            bad += 1
            continue
        d = km((s['lat'], s['lng']), where)
        ok = d <= FAR_KM
        bad += not ok
        print('%s %-12s opens %s in Google Maps, %.1f km from the area shown in the guide%s'
              % ('✓' if ok else '✗', s['id'], kind, d, '' if ok else ': check the link'))
    print('\n%d link(s) to fix' % bad if bad else '\nEvery link works')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
