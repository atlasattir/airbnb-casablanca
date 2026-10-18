#!/usr/bin/env node
/*
 * Opens the live guide (GitHub Pages) the way guests do, from outside: every file online and
 * the latest version, the home and every place's short link on an iPhone and a Galaxy, every
 * page of each place (no missing photo, no error), the map buttons, and offline mode.
 *     node tools/check-live.js [https://…/airbnb-casablanca/]
 *     (GitHub → Actions → Live check → Run workflow; needs Playwright: npm i playwright)
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const { chromium, devices } = require('playwright');
const ROOT = path.join(__dirname, '..');
const BASE = (process.argv[2] || 'https://atlasattir.github.io/airbnb-casablanca/').replace(/\/?$/, '/');

const win = vm.createContext({});
win.window = win;
const load = rel => vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), win, { filename: rel });
['content/ui.js', 'content/brand.js', 'content/photos.js'].forEach(load);
const C = win.CASA, STAYS = C.brand.stays;
for (const s of STAYS) { load('content/cities/' + s.city + '.js'); load('content/stays/' + s.id + '.js'); }

let bad = 0;
const ok = (c, m) => { console.log((c ? '✓ ' : '✗ ') + m); if (!c) bad++; };

// A file's status, asked again on a passing server error (GitHub Pages answers 503 now and then)
async function status(url) {
  let last = 0;
  for (let i = 0; i < 4; i++) {
    try { last = (await fetch(url, { method: 'HEAD' })).status; if (last < 500) return last; } catch (e) { last = 0; }
    await new Promise(r => setTimeout(r, 1500 * (i + 1)));
  }
  return last;
}

(async () => {
  // 1. Every file the guide needs is online, and the version online is the latest one
  const files = new Set(['', 'index.html', 'manifest.webmanifest', 'sw.js', 'assets/css/style.css', 'assets/js/app.js', 'assets/js/icons.js']);
  for (const all of Object.values(C.photos)) {
    for (const [k, p] of Object.entries(all)) if (k[0] !== '_') { files.add(p.src.split('?')[0]); files.add(p.sm.split('?')[0]); }
  }
  const films = [C.brand.film].concat(Object.values(C.cities).map(c => c.film)).filter(f => f && typeof f === 'object');
  for (const f of films) for (const cut of [f.video, f.videoPortrait].filter(Boolean)) [cut.mp4, cut.webm, cut.poster].filter(Boolean).forEach(x => files.add(x));
  const core = (/var CORE = \[([\s\S]*?)\];/.exec(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8')) || [])[1] || '';
  (core.replace(/\/\/.*$/gm, '').match(/'[^']*'/g) || []).map(q => q.slice(1, -1).replace(/^\.\//, '')).forEach(x => files.add(x));
  const list = [...files], missing = [];
  for (let i = 0; i < list.length; i += 12) {
    const got = await Promise.all(list.slice(i, i + 12).map(f => status(BASE + f).then(s => [f, s])));
    got.filter(([, s]) => s !== 200).forEach(([f, s]) => missing.push(f + ' (' + s + ')'));
  }
  ok(!missing.length, list.length + ' files online (photos, films, scripts, offline files)' + (missing.length ? ': missing ' + missing.slice(0, 12).join(', ') : ''));
  for (const rel of ['content/photos.js', 'assets/js/app.js', 'content/brand.js']) {
    const live = await fetch(BASE + rel).then(r => r.text()).catch(() => '');
    ok(live === fs.readFileSync(path.join(ROOT, rel), 'utf8'), 'the live ' + rel + ' is the latest version');
  }

  // 2. On phones: the home, then every place and every page of it
  const browser = await chromium.launch();
  for (const [dev, locale] of [['iPhone 13', 'fr-FR'], ['Galaxy S9+', 'ar-MA']]) {
    const ctx = await browser.newContext(Object.assign({}, devices[dev], { locale, serviceWorkers: 'block' }));
    const page = await ctx.newPage();
    const errors = [], broken = new Set();
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith(BASE) && r.status() >= 400) broken.add(r.url().slice(BASE.length) + ' ' + r.status()); });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(4000);
    const home = await page.evaluate(() => ({ chips: document.querySelectorAll('.city-chip').length, film: document.querySelector('.stage').classList.contains('has-video') }));
    ok(home.chips === 3, dev + ': the home shows the 3 cities');
    ok(home.film, dev + ': the home film plays');
    for (const s of STAYS) {
      await page.goto(BASE + s.id + '/', { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const tiles = await page.$$eval('.tile[data-open]', t => t.map(x => x.getAttribute('data-open')));
      const film = await page.evaluate(() => document.querySelector('.stage').classList.contains('has-video'));
      let maps = 0, pages = 0, noPhoto = [];
      for (const sid of tiles.concat(['location'])) {
        await page.evaluate(h => { location.hash = h; }, sid);
        await page.waitForTimeout(900);
        pages++;
        const r = await page.evaluate(() => ({
          maps: document.querySelectorAll('.sheet.is-open a[data-maps]').length,
          band: !!document.querySelector('.sheet.is-open .band__photo img, .sheet.is-open .band--photo'),
          cards: [...document.querySelectorAll('.sheet.is-open .vcard:not(.vcard--soon)')].filter(c => !c.querySelector('.art--photo img')).map(c => (c.querySelector('.vcard__name') || {}).textContent)
        }));
        maps += r.maps;
        noPhoto = noPhoto.concat(r.cards);
      }
      await page.waitForTimeout(1500);
      ok(tiles.length >= 12 && film && !noPhoto.length,
        dev + ' ' + s.id + '/: ' + tiles.length + ' buttons, ' + pages + ' pages, ' + maps + ' map buttons, film ' + (film ? 'plays' : 'MISSING') +
        (noPhoto.length ? ', cards without photo: ' + noPhoto.join(', ') : ''));
    }
    ok(!broken.size, dev + ': nothing failed to load' + (broken.size ? ': ' + [...broken].slice(0, 10).join(', ') : ''));
    ok(!errors.length, dev + ': no script error' + (errors.length ? ': ' + errors.slice(0, 3).join('; ') : ''));
    await ctx.close();
  }

  // 3. Offline: after one visit through the short link, the place opens without network
  const ctx = await browser.newContext(Object.assign({}, devices['iPhone 13'], { locale: 'fr-FR' }));
  const page = await ctx.newPage();
  await page.goto(BASE + 'bourgogne/', { waitUntil: 'load' });
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 30000 }).catch(() => null);
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(4000);
  await ctx.setOffline(true);
  await page.reload({ waitUntil: 'load' }).catch(() => null);
  await page.waitForTimeout(2500);
  const offline = await page.evaluate(() => document.querySelectorAll('.tile[data-open]').length).catch(() => 0);
  ok(offline >= 12, 'offline: bourgogne/ opens without network (' + offline + ' buttons)');
  await browser.close();

  console.log(bad ? '\n' + bad + ' problem(s) on ' + BASE : '\nThe live guide works: ' + BASE);
  process.exit(bad ? 1 : 0);
})();
