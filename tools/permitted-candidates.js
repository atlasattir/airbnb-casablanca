#!/usr/bin/env node
/*
 * Collects the photos an establishment publishes on its own pages (a hotel's gallery, the
 * host's own listing), for places whose owners allowed the guide to use them, and lays them
 * out on numbered contact sheets to choose from. Only the sheets and the list of addresses
 * are kept, never the photos themselves: the chosen ones go through tools/fetch-photos.py.
 *     node tools/permitted-candidates.js <out dir> <page or image URL> [more URLs…]
 *     (GitHub → Actions → Permitted photos; needs Playwright)
 */
'use strict';
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [OUT, ...URLS] = process.argv.slice(2);
const MIN_W = 900, MIN_H = 500, PER_PAGE = 48, PER_SHEET = 12;

// Every picture a page shows or loads: <img> (largest srcset entry), CSS backgrounds, og:image
function picturesOnPage() {
  const urls = new Set();
  const add = u => { try { if (u && !/^data:/.test(u)) urls.add(new URL(u, location.href).href); } catch (e) { /* bad URL */ } };
  for (const img of document.images) {
    add(img.currentSrc || img.src);
    const set = img.getAttribute('srcset') || img.getAttribute('data-srcset') || '';
    const best = set.split(',').map(s => s.trim().split(/\s+/)).filter(p => p[0]).sort((a, b) => parseFloat(b[1] || 0) - parseFloat(a[1] || 0))[0];
    if (best) add(best[0]);
    ['data-src', 'data-lazy-src', 'data-original', 'data-full', 'data-zoom-image'].forEach(a => add(img.getAttribute(a)));
  }
  for (const el of document.querySelectorAll('*')) {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).forEach(m => add(m.replace(/^url\(["']?|["']?\)$/g, '')));
  }
  document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"], link[rel="image_src"]').forEach(m => add(m.content || m.href));
  document.querySelectorAll('a[href]').forEach(a => { if (/\.(jpe?g|png|webp)(\?|$)/i.test(a.href)) add(a.href); });
  return [...urls];
}

// Its real size, measured by the browser (the address alone rarely says)
async function measure(page, url) {
  return page.evaluate(u => new Promise(done => {
    const im = new Image();
    im.onload = () => done({ w: im.naturalWidth, h: im.naturalHeight });
    im.onerror = () => done(null);
    setTimeout(() => done(null), 15000);
    im.src = u;
  }), url);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'fr-FR',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' });
  const page = await ctx.newPage();
  const found = [];
  for (const src of URLS) {
    let urls = [];
    if (/\.(jpe?g|png|webp)(\?|$)/i.test(src)) urls = [src];
    else {
      const loaded = new Set();
      page.on('response', r => { if (r.request().resourceType() === 'image' && r.ok()) loaded.add(r.url()); });
      try {
        await page.goto(src, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(3000);
        // Down the page slowly, so lazy galleries load their pictures
        for (let y = 0; y < 40; y++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(250); }
        await page.waitForTimeout(2000);
        urls = [...new Set((await page.evaluate(picturesOnPage)).concat([...loaded]))];
      } catch (e) { console.log('✗ ' + src + ': ' + e.message.split('\n')[0]); }
      page.removeAllListeners('response');
    }
    let kept = 0;
    for (const u of urls) {
      if (kept >= PER_PAGE || found.some(f => f.url.split('?')[0] === u.split('?')[0])) continue;
      const size = await measure(page, u);
      if (!size || size.w < MIN_W || size.h < MIN_H) continue;
      found.push({ n: found.length + 1, page: src, url: u, w: size.w, h: size.h });
      kept++;
    }
    console.log((kept ? '✓ ' : '· ') + src + ': ' + kept + ' photo(s) of ' + MIN_W + ' px or more');
  }

  // Numbered contact sheets, drawn by the browser from the original addresses
  for (let s = 0; s * PER_SHEET < found.length; s++) {
    const part = found.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
    const cells = part.map(f => '<figure><img src="' + f.url.replace(/"/g, '&quot;') + '"><figcaption><b>' + f.n + '</b> ' + f.w + '×' + f.h + ' · ' +
      new URL(f.url).hostname + '</figcaption></figure>').join('');
    await page.setContent('<style>body{margin:0;background:#111;color:#eee;font:15px sans-serif;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px;width:1424px}' +
      'figure{margin:0}img{width:100%;height:300px;object-fit:cover;display:block;background:#333}b{font-size:22px;color:#fc6}</style>' + cells, { waitUntil: 'load', timeout: 120000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUT, 'sheet-' + (s + 1) + '.jpg'), type: 'jpeg', quality: 72, fullPage: true });
  }
  fs.writeFileSync(path.join(OUT, 'candidates.json'), JSON.stringify(found, null, 1));
  console.log(found.length + ' candidate photo(s) on ' + Math.ceil(found.length / PER_SHEET) + ' sheet(s)');
  await browser.close();
})();
