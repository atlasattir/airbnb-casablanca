#!/usr/bin/env node
/*
 * Checks the guide before it goes out: every script parses and loads, every place has
 * its city and its page, the four languages have the same texts, every photo exists
 * and is credited, the host can be reached on WhatsApp.
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

if (errors.length) { console.error('✗ ' + errors.length + ' problem(s):\n  ' + errors.join('\n  ')); process.exit(1); }
console.log('✓ ' + (B.stays || []).length + ' places, ' + keys.length + ' texts × 4 languages, ' +
  Object.values(C.photos || {}).reduce((n, a) => n + Object.keys(a).filter(k => k[0] !== '_').length, 0) + ' photos: all good');
