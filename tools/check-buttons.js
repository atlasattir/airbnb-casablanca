#!/usr/bin/env node
/*
 * Taps every button of the guide, on every page of the home and of each place (cards,
 * routes, details, top bar, dock), as a guest's finger would, and reports any tap that does
 * nothing (no new page, no change on screen, nothing saved) or that something else covers.
 *     node tools/check-buttons.js [https://…/airbnb-casablanca/] [chromium|webkit] [k/n]
 *     (k/n: only the k-th of n slices of the screens, to share the work between machines)
 *     (GitHub → Actions → Live check runs it on the published guide; needs Playwright)
 * Taps on external links (Google Maps, WhatsApp, Commons) are answered here, never sent on.
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const pw = require('playwright');
const ROOT = path.join(__dirname, '..');
// The guide's address: its own domain once Settings → Pages has saved one (GitHub writes it in CNAME), else github.io
const CNAME = fs.existsSync(path.join(ROOT, 'CNAME')) ? fs.readFileSync(path.join(ROOT, 'CNAME'), 'utf8').trim() : '';
const BASE = (process.argv[2] || (CNAME ? 'https://' + CNAME + '/' : 'https://atlasattir.github.io/airbnb-casablanca/')).replace(/^(?!https?:\/\/)/i, 'https://').replace(/\/?$/, '/');
const ENGINE = process.argv[3] || 'chromium';
const [SLICE, SLICES] = (process.argv[4] || '1/1').split('/').map(Number);
const DEVICE = ENGINE === 'webkit' ? 'iPhone 13' : 'Galaxy S9+';
// Phones side by side: WebKit draws without a graphics card on the test machines, six at once
// starve it (taps landing seconds late), so it gets two
const LANES = +(process.env.LANES || (ENGINE === 'webkit' ? 2 : 6));

const win = vm.createContext({});
win.window = win;
const load = rel => vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), win, { filename: rel });
['content/ui.js', 'content/brand.js'].forEach(load);
const C = win.CASA, STAYS = C.brand.stays;
for (const s of STAYS) load('content/cities/' + s.city + '.js');

const SEL = 'a[href], button, [data-open], [data-chip], [data-tab], [data-check], [data-howto], [data-copy], [data-taxi], [data-fav], [data-lang], [data-locate], [data-modal-close], summary, [role="button"]';

// In the page: the buttons a finger can reach now (on the open layer, visible, enabled)
function reachable(sel) {
  const modal = document.querySelector('.modal.is-open'), sheet = document.querySelector('.sheet.is-open');
  const fixed = el => el.closest('.dock');
  return [...document.querySelectorAll(sel)].filter(el => {
    if (el.disabled || el.closest('[hidden], [inert], [aria-hidden="true"]') || el.classList.contains('modal__scrim')) return false;
    const r = el.getBoundingClientRect(), st = getComputedStyle(el);
    if (!r.width || !r.height || st.visibility === 'hidden' || st.pointerEvents === 'none' || +st.opacity === 0) return false;
    if (modal) return modal.contains(el);
    if (sheet) return sheet.contains(el) || !!fixed(el);
    return !el.closest('.sheet, .modal');
  });
}
function describe(el) {
  const label = (el.getAttribute('aria-label') || el.innerText || el.getAttribute('title') || '').replace(/\s+/g, ' ').trim().slice(0, 40);
  const attrs = [...el.attributes].filter(a => /^data-|^href$|^id$/.test(a.name)).map(a => a.name + (a.value ? '=' + a.value.slice(0, 50) : '')).join(' ');
  const on = el.getAttribute('aria-pressed') === 'true' || el.getAttribute('aria-selected') === 'true' || el.getAttribute('aria-current') === 'true' ||
    el.classList.contains('is-on') || el.classList.contains('is-active');
  const here = el.hasAttribute('data-open') && location.hash === '#' + el.getAttribute('data-open');  // the page already open
  return { label, attrs, href: el.getAttribute('href') || '', target: el.target || '', on: on || here, tag: el.tagName.toLowerCase() };
}
function signature() {
  const q = s => document.querySelector(s), h = s => { let x = 0; for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) | 0; return s.length + ':' + x; };
  const ls = {};
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k !== 'atlas.seen') ls[k] = localStorage.getItem(k); } } catch (e) { /* none */ }
  const html = document.documentElement, toast = q('#toast');
  return JSON.stringify({ u: location.href, c: html.className, l: html.lang, t: html.getAttribute('data-theme'),
    s: (q('#sheet') || {}).className, sb: h((q('#sheet-body') || {}).innerHTML || ''), m: (q('#modal') || {}).className, mb: h((q('#modal-body') || {}).innerHTML || ''),
    g: h((q('#groups') || {}).innerHTML || ''), toast: toast && !toast.hidden ? toast.className + toast.textContent : '', ls,
    y: Math.round(scrollY / 40), ss: Math.round(((q('#sheet-scroll') || {}).scrollTop || 0) / 40), taxi: !!q('.taxi') });
}

async function tapAll(ctx, label, url, results) {
  const page = await ctx.newPage();
  // Until the guide is drawn, not the page's load event: the film holds that back until its first
  // frame, which WebKit without a graphics card can take a minute to decode. Asked again once: a
  // late tap from the screen before can still be navigating away
  const fresh = async () => {
    const open = () => page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await open().catch(open);
    // Polled on a timer: animation frames may not come for a page in the background
    await page.waitForFunction(() => document.documentElement.classList.contains('is-ready') && document.querySelector('.tile, .city-chip'),
      null, { timeout: 30000, polling: 250 }).catch(() => {});
    await page.waitForTimeout(1100);
  };
  const t0 = Date.now();
  let n = 0;
  const add = r => { results.push(r); n++; };
  await fresh();
  const count = await page.evaluate(`(${reachable})(${JSON.stringify(SEL)}).length`);
  for (let i = 0; i < count; i++) {
    // One screen never holds up the rest: past 6 minutes, say so and move on
    if (Date.now() - t0 > 360000) { add({ ok: false, where: label, how: 'screen stopped after 6 minutes (' + i + ' of ' + count + ' taps done)' }); break; }
    const h = await page.evaluateHandle(`(${reachable})(${JSON.stringify(SEL)})[${i}]`);
    const el = h.asElement();
    if (!el) { await fresh(); continue; }
    const d = await el.evaluate(describe);
    const where = label + ' › ' + (d.label || d.attrs || d.tag);
    if (/^(tel|mailto|sms):/.test(d.href)) { add({ ok: true, where, how: 'phone/mail link' }); continue; }
    const before = await page.evaluate(signature);
    const pages = ctx.pages().length;
    let err = '';
    try { await el.tap({ timeout: 10000 }); } catch (e) {
      // Why, from Playwright's log: the last thing it was waiting for (not stable, not visible…)
      const why = e.message.replace(/\x1b\[[0-9;]*m/g, '').split('\n').map(l => l.replace(/^\s*-\s*/, '').trim()).filter(l => l && !/^(retrying|waiting \d+ms|Call log|attempting|=+)/.test(l)).pop() || '';
      err = /intercepts pointer events|obscured|covered/.test(e.message) ? 'covered by another element: ' + ((/<[^>]+>/.exec(e.message.split('intercepts')[0].split('\n').reverse().find(l => /</.test(l)) || '') || [''])[0]).slice(0, 80) : 'cannot be tapped: ' + why.slice(0, 100);
    }
    let how = '';
    for (let t = 0; t < 20 && !err && !how; t++) {
      await page.waitForTimeout(150);
      if (ctx.pages().length > pages) how = 'opens a new tab';
      else if (await page.evaluate(signature).catch(() => 'navigated') !== before) how = 'changes the screen';
    }
    if (!err && !how && d.on) how = 'already selected / already on that page';
    add({ ok: !err && !!how, where, how: err || how || 'DOES NOTHING', attrs: d.attrs });
    for (const p of ctx.pages()) if (p !== page) await p.close().catch(() => {});
    if (how === 'changes the screen' || err) await fresh();
  }
  if (await page.$('.modal.is-open')) {
    // Once the card has finished sliding up: above it is the dimmed page
    await page.waitForFunction(() => { const p = document.querySelector('.modal__panel'), t = p && p.getBoundingClientRect().top;
      const still = t === window.__panelTop; window.__panelTop = t; return still; }, null, { polling: 200, timeout: 10000 }).catch(() => {});
    const before = await page.evaluate(signature);
    const box = await page.evaluate(() => { const p = document.querySelector('.modal__panel').getBoundingClientRect(); return { x: innerWidth / 2, y: Math.max(8, p.top / 2) }; });
    await page.touchscreen.tap(box.x, box.y);
    await page.waitForTimeout(1500);
    const shut = await page.evaluate(signature) !== before;
    add({ ok: shut, where: label + ' › tap outside the card', how: shut ? 'changes the screen' : 'DOES NOTHING' });
  }
  await page.close();
  console.log('  ' + label + ': ' + n + ' taps in ' + Math.round((Date.now() - t0) / 1000) + ' s');
}

(async () => {
  // The guide's own hosts, never stubbed: BASE's, and the domain github.io sends to once it has one
  const OWN = new Set(['localhost', '127.0.0.1', new URL(BASE).hostname]);
  await fetch(BASE).then(r => OWN.add(new URL(r.url).hostname), () => { /* offline: BASE only */ });
  // The version to test: wait up to 5 minutes for GitHub Pages to publish this checkout's app.js
  const want = fs.readFileSync(path.join(ROOT, 'assets/js/app.js'), 'utf8');
  for (let t = 0; t < 20; t++) {
    if (await fetch(BASE + 'assets/js/app.js?v=' + Date.now()).then(r => r.text(), () => '') === want) break;
    if (t === 19) console.log('· the live app.js is not this checkout\'s: testing what is published');
    else await new Promise(r => setTimeout(r, 15000));
  }
  const browser = await pw[ENGINE].launch();
  const states = [['home', '']];
  for (const c of ['casablanca', 'marrakech', 'martil']) states.push(['home #' + c, '#' + c]);
  for (const s of STAYS) {
    const city = C.cities[s.city], st = '?stay=' + s.id;
    states.push([s.id, st], [s.id + ' #location', st + '#location'], [s.id + ' #favorites', st + '#favorites'], [s.id + ' #credits', st + '#credits']);
    for (const [sid, sec] of Object.entries(city.sections || {})) {
      states.push([s.id + ' #' + sid, st + '#' + sid]);
      // Each card's own page (places and routes); the guide's own pages per place
      if (s.city !== 'casablanca' || s.id === 'bourgogne' || /door/.test(JSON.stringify((sec.items || []).map(i => i.id))))
        (sec.items || []).forEach(it => states.push([s.id + ' #' + sid + '.' + it.id, st + '#' + sid + '.' + it.id]));
    }
    for (const sid of ['wifi', 'stay', 'house', 'nearby', 'services', 'assistance', 'transport']) states.push([s.id + ' #' + sid, st + '#' + sid]);
  }
  const uniq = [...new Map(states.map(s => [s[1], s])).values()].filter((s, i) => i % SLICES === SLICE - 1);
  console.log(ENGINE + ' (' + DEVICE + '): ' + uniq.length + ' screens to go through on ' + BASE + (SLICES > 1 ? ' (slice ' + SLICE + ' of ' + SLICES + ')' : ''));
  const results = [];
  const lanes = LANES;
  await Promise.all(Array.from({ length: lanes }, async (_, lane) => {
    const ctx = await browser.newContext(Object.assign({}, pw.devices[DEVICE], { locale: 'fr-FR', serviceWorkers: 'block',
      permissions: ['geolocation'], geolocation: { latitude: 33.589, longitude: -7.632 } }));
    // WebKit on the test machines decodes the film without a graphics card, which slows every tap on
    // the screens where it plays (an iPhone decodes it in hardware): it gets the still instead. The
    // film itself is checked in Chrome's engine and by tools/check-live.js
    if (ENGINE === 'webkit') await ctx.route(/\.(mp4|webm)(\?|$)/i, r => r.abort());
    await ctx.route(u => /^https?:$/.test(u.protocol) && !OWN.has(u.hostname) && !/(^|\.)github\.io$/.test(u.hostname), r => {
      const t = r.request().resourceType();
      if (t === 'document') return r.fulfill({ status: 200, contentType: 'text/html', body: '<title>outside</title>ok' });
      return r.continue();
    });
    for (let i = lane; i < uniq.length; i += lanes) {
      try { await tapAll(ctx, uniq[i][0], BASE + uniq[i][1], results); } catch (e) { results.push({ ok: false, where: uniq[i][0], how: 'screen failed: ' + e.message.split('\n')[0] }); }
    }
    await ctx.close();
  }));
  await browser.close();
  const bad = results.filter(r => !r.ok);
  const kinds = {};
  results.filter(r => r.ok).forEach(r => { kinds[r.how] = (kinds[r.how] || 0) + 1; });
  console.log(results.length + ' taps: ' + Object.entries(kinds).map(([k, v]) => v + ' ' + k).join(', '));
  // The same button failing on many screens is one problem: group them
  const groups = {};
  bad.forEach(b => { const k = b.how + ' | ' + b.where.split(' › ').pop(); (groups[k] = groups[k] || []).push(b.where.split(' › ')[0]); });
  for (const [k, w] of Object.entries(groups)) console.log('✗ ' + k + '  (' + w.length + ' screens, e.g. ' + w.slice(0, 4).join('; ') + ')');
  console.log(bad.length ? '\n' + bad.length + ' tap(s) that did not work' : '\nEvery button works');
  process.exit(bad.length ? 1 : 0);
})();
