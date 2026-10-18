#!/usr/bin/env node
/*
 * Checks the guide before it goes out: every script parses and loads, every place has
 * its city and its page, the four languages have the same texts, every photo and the
 * film exist and are credited, the host can be reached on WhatsApp.
 *     node tools/check-content.js        (also run by GitHub on every push: .github/workflows/check.yml)
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const errors = [];
const fail = m => errors.push(m);

// A browser-like global: window is the global object, as on the page
const win = vm.createContext({});
win.window = win;
function load(rel) {
  try { vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), win, { filename: rel }); return true; }
  catch (e) { fail(rel + ': ' + e.message); return false; }
}
['content/ui.js', 'content/brand.js', 'content/photos.js', 'content/morocco.js'].forEach(load);
const C = win.CASA || {};
const B = C.brand || {};
if (!B.stays || !B.stays.length) fail('content/brand.js: no places');

// Every place: its city file and its own file load and match
for (const s of B.stays || []) {
  for (const rel of ['content/cities/' + s.city + '.js', 'content/stays/' + s.id + '.js']) {
    if (!fs.existsSync(path.join(ROOT, rel))) fail(s.id + ': missing ' + rel); else load(rel);
  }
  if (!(C.cities || {})[s.city]) fail(s.id + ': city ' + s.city + ' not defined');
  const st = (C.stays || {})[s.id];
  if (!st) { fail(s.id + ': content/stays/' + s.id + '.js does not define CASA.stays["' + s.id + '"]'); continue; }
  for (const k of ['checkin', 'checkout']) if (!st[k] || !/^\d\d:\d\d$/.test(st[k].time || '')) fail(s.id + ': ' + k + ' time missing');
  if (st.wifi && st.wifi.password) fail(s.id + ': a Wi-Fi password is in the public repo (it belongs on the printed card only)');
  if (!fs.existsSync(path.join(ROOT, s.id, 'index.html'))) fail(s.id + ': missing the short link folder ' + s.id + '/index.html');
}

// The host can be reached
const wa = String((B.host || {}).whatsapp || '').replace(/\D/g, '');
if (wa.length < 10) fail('content/brand.js: host.whatsapp is empty or too short');

// The WhatsApp button works before the script runs: index.html carries the same number
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const dock = /id="dock-wa" href="https:\/\/wa\.me\/(\d*)"/.exec(html);
if (!dock || dock[1] !== wa) fail('index.html: the WhatsApp button (dock-wa) should link to wa.me/' + wa);

// Offline: every file the service worker stores at install exists (one missing file stops it),
// and every place's short link is among them
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const core = (/var CORE = \[([\s\S]*?)\];/.exec(sw) || [])[1] || '';
const coreFiles = (core.replace(/\/\/.*$/gm, '').match(/'[^']*'/g) || []).map(q => q.slice(1, -1));
for (const f of coreFiles) {
  const disk = path.join(ROOT, f === './' ? 'index.html' : f.endsWith('/') ? f + 'index.html' : f);
  if (!fs.existsSync(disk)) fail('sw.js: CORE lists ' + f + ', which does not exist');
}
for (const s of B.stays || []) if (coreFiles.indexOf(s.id + '/') < 0) fail('sw.js: CORE lacks the short link ' + s.id + '/');
for (const old of Object.keys(B.aliases || {})) if (coreFiles.indexOf(old + '/') < 0) fail('sw.js: CORE lacks the old link ' + old + '/');

// Same texts in the four languages
const U = C.ui || {};
const keys = Object.keys(U.fr || {});
for (const l of ['en', 'ar', 'es']) {
  const miss = keys.filter(k => !(k in (U[l] || {})));
  if (miss.length) fail('content/ui.js: ' + l + ' lacks ' + miss.join(', '));
}

// Photos: the files exist and each one is credited
for (const [city, all] of Object.entries(C.photos || {})) {
  for (const [id, p] of Object.entries(all)) {
    if (id.charAt(0) === '_') continue;
    for (const f of [p.src, p.sm]) if (!f || !fs.existsSync(path.join(ROOT, f.split('?')[0]))) fail('photo ' + city + '/' + id + ': missing file ' + f);
    if (!p.lic || !p.url) fail('photo ' + city + '/' + id + ': no licence or link');
  }
  const refs = [all._city].concat(Object.values(all._covers || {})).filter(Boolean);
  for (const r of refs) if (!all[r]) fail('photo ' + city + ': cover "' + r + '" has no photo');
}

// An item that names a picture (photo: 'tea') names one of the wish list, of its city or a shared one
const wish = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'photos.json'), 'utf8'));
for (const [id, c] of Object.entries(C.cities || {})) {
  for (const [sid, s] of Object.entries(c.sections || {})) {
    for (const it of s.items || []) {
      if (it.photo && !((wish[id] || {})[it.photo] || (wish.morocco || {})[it.photo])) fail(id + '/' + sid + '/' + it.id + ': photo "' + it.photo + '" is not in tools/photos.json');
    }
  }
}

// The films (the home's, and each city's own): their files exist, and each clip they are cut from is credited
function checkFilm(film, where) {
  for (const cut of [film.video, film.videoPortrait].filter(Boolean)) {
    for (const f of [cut.mp4, cut.webm, cut.poster].filter(Boolean)) if (!fs.existsSync(path.join(ROOT, f))) fail(where + ': film file ' + f + ' is missing');
  }
  if (!(film.credits || []).length && !(film.credit && film.credit.name)) fail(where + ': the film credits no one');
  for (const c of film.credits || []) if (!c.by || !c.lic || !c.url) fail(where + ': film clip "' + (c.title || '?') + '" lacks its author, licence or link');
}
if (B.film) checkFilm(B.film, 'content/brand.js');
for (const [id, c] of Object.entries(C.cities || {})) {
  if (c.film === 'brand' && !B.film) fail(id + ': film is "brand" but content/brand.js has no film');
  else if (c.film && typeof c.film === 'object') checkFilm(c.film, 'content/cities/' + id + '.js');
}

// The site's address: its own domain once Settings → Pages has saved one (GitHub writes it in CNAME),
// else github.io. Link previews (og:url, og:image: crawlers run no script) and the links sent to
// guests must carry it, and 404.html must not write the site's folder by hand
const cname = fs.existsSync(path.join(ROOT, 'CNAME')) ? fs.readFileSync(path.join(ROOT, 'CNAME'), 'utf8').trim() : '';
const SITE = cname ? 'https://' + cname + '/' : 'https://atlasattir.github.io/airbnb-casablanca/';
for (const dir of [''].concat((B.stays || []).map(s => s.id + '/'))) {
  const page = fs.readFileSync(path.join(ROOT, dir, 'index.html'), 'utf8');
  const og = k => (new RegExp('property="og:' + k + '" content="([^"]*)"').exec(page) || [])[1];
  if (og('url') !== SITE + dir) fail(dir + 'index.html: og:url should be ' + SITE + dir);
  if (og('image') !== SITE + 'assets/img/share.jpg') fail(dir + 'index.html: og:image should be ' + SITE + 'assets/img/share.jpg');
}
const messages = fs.readFileSync(path.join(ROOT, 'docs/messages.md'), 'utf8');
for (const s of B.stays || []) if (messages.indexOf('`' + SITE + s.id + '/`') < 0) fail('docs/messages.md: the link of ' + s.id + ' should be ' + SITE + s.id + '/');
if (/var base = '\/[^']+\/'/.test(fs.readFileSync(path.join(ROOT, '404.html'), 'utf8'))) fail('404.html: the site\'s folder is written by hand (it changes with the domain)');

if (errors.length) { console.error('✗ ' + errors.length + ' problem(s):\n  ' + errors.join('\n  ')); process.exit(1); }
console.log('✓ ' + (B.stays || []).length + ' places, ' + keys.length + ' texts × 4 languages, ' +
  Object.values(C.photos || {}).reduce((n, a) => n + Object.keys(a).filter(k => k[0] !== '_').length, 0) + ' photos: all good');
