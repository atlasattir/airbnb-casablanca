/*
 * Darna Collection — guest guide.
 * Plain JavaScript, no build step.
 *
 * Two modes on the same page:
 *   home  (./)            the brand, the choice of a city and of a place
 *   stay  (./?stay=<id>)  one place's guide; loads content/morocco.js,
 *                         content/cities/<city>.js and content/stays/<id>.js
 * Each place also has a short link, ./<id>/, that forwards to ./?stay=<id>.
 */
(function () {
  'use strict';

  var C = window.CASA || {};
  var BRAND = C.brand || {};
  var UI = C.ui || {};
  var ICONS = C.icons || {};
  var STAYS = BRAND.stays || [];
  var CITIES = BRAND.cities || [];

  // Filled once a place is chosen (bootStay)
  var STAY = null;     // the place's line in content/brand.js
  var APT = {};        // the place's content, merged with the brand defaults
  var CITY = {};       // the city file
  var NEAR = {};       // ids of the city's addresses within walking distance
  var SECTIONS = {};
  var GROUPS = [];
  var INDEX = {};      // places by id, for favourites
  var MODE = 'home';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var LANGS = ['fr', 'en', 'ar', 'es'];
  var LOCALES = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-MA', es: 'es-ES' };
  var CITY_ICONS = { casablanca: 'minaret', marrakech: 'arch', martil: 'waves' };
  var SPECIAL = {
    location: { icon: 'pin', tint: '#1D4C49' },
    favorites: { icon: 'heart', tint: '#8E6E3A' },
    credits: { icon: 'sparkle', tint: '#5B5346' }
  };
  var ALIASES = { apartment: 'stay' };

  function byId(id) { return document.getElementById(id); }
  var els = {
    stage: byId('stage'),
    video: byId('hero-video'),
    poster: byId('hero-poster'),
    topbar: byId('topbar'),
    clock: byId('clock'),
    clockHome: byId('clock-home'),
    clockCity: byId('clock-city'),
    sunset: byId('sunset-time'),
    coords: byId('coords'),
    cue: byId('scroll-cue'),
    menu: byId('menu'),
    groups: byId('groups'),
    chips: byId('city-chips'),
    resume: byId('resume'),
    locate: byId('locate-btn'),
    sheet: byId('sheet'),
    scroll: byId('sheet-scroll'),
    bar: byId('sheet-bar'),
    barTitle: byId('sheet-bar-title'),
    back: byId('sheet-back'),
    band: byId('sheet-band'),
    body: byId('sheet-body'),
    modal: byId('modal'),
    panel: byId('modal-panel'),
    modalBody: byId('modal-body'),
    wa: byId('dock-wa'),
    favCount: byId('fav-count'),
    toast: byId('toast')
  };

  function query() {
    var out = {};
    (window.location.search || '').replace(/^\?/, '').split('&').forEach(function (pair) {
      if (!pair) return;
      var i = pair.indexOf('=');
      var k = decodeURIComponent(i > -1 ? pair.slice(0, i) : pair);
      out[k] = i > -1 ? decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' ')) : '';
    });
    return out;
  }
  var params = query();

  // Draft view for the host: ./?stay=<id>&draft shows what is still to complete
  // ("Bientôt" badges). Guests never see unfinished entries.
  var DRAFT = (function () {
    try {
      if ('draft' in params) window.sessionStorage.setItem('atlas.draft', '1');
      return window.sessionStorage.getItem('atlas.draft') === '1';
    } catch (e) { return 'draft' in params; }
  })();
  function ready4guests(v) { return DRAFT || !isTodo(typeof v === 'object' && v ? (v.fr || v.en || '') : v); }

  /* ---------- storage: optional, the guide works without it ---------- */

  function load(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ } }
  function loadJSON(key, fallback) {
    try { var v = JSON.parse(load(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  // Preferences saved by the first version of the guide (casa.*) are carried over once
  function loadPref(key, old) {
    var v = load(key);
    if (v == null && old) { v = load(old); if (v != null) save(key, v); }
    return v;
  }

  var state = {
    lang: initialLang(),
    favs: [],
    done: [],
    current: null,
    modal: null,
    lastFocus: null,
    stayTab: 'in',
    howto: -1,
    geo: null,       // distances after "Trouver mon logement"
    locating: false
  };

  // The guest's own choice wins; otherwise the phone's main language if the
  // guide has it (fr, en, ar, es, any region), otherwise English.
  function deviceLang() {
    var main = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    var code = String(main).slice(0, 2).toLowerCase();
    return LANGS.indexOf(code) > -1 ? code : 'en';
  }

  function initialLang() {
    var saved = loadPref('atlas.lang', 'casa.lang');
    return saved && LANGS.indexOf(saved) > -1 ? saved : deviceLang();
  }

  /* ---------- the brand's places ---------- */

  function stayById(id) { return STAYS.filter(function (s) { return s.id === id; })[0] || null; }
  function cityById(id) { return CITIES.filter(function (c) { return c.id === id; })[0] || null; }
  function staysIn(cityId) { return STAYS.filter(function (s) { return s.city === cityId; }); }
  function areaName(s) { return tr((BRAND.areas || {})[s.area]) || ''; }
  function cityName(id) { var c = cityById(id); return c ? tr(c.name) : ''; }
  // "Aïn Diab · Casablanca", or only "Martil" when the area is the city
  function placeLine(s) {
    var a = areaName(s), c = cityName(s.city);
    return a && a !== c ? a + ' · ' + c : c;
  }
  function host() { return APT.host || BRAND.host || {}; }

  /* ---------- text ---------- */

  function tr(v) {
    if (v == null) return '';
    if (typeof v !== 'object') return String(v);
    return v[state.lang] || v.en || v.fr || '';
  }

  function ui(key) {
    var dict = UI[state.lang] || UI.en || {};
    return fill(dict[key] != null ? dict[key] : ((UI.en || {})[key] || ''));
  }

  function fill(s) {
    s = String(s)
      .replace(/\{host\}/g, host().name || '')
      .replace(/\{stay\}/g, STAY ? STAY.name : BRAND.name || '')
      .replace(/\{city\}/g, STAY ? cityName(STAY.city) : '')
      .replace(/\{area\}/g, STAY ? areaName(STAY) : '')
      .replace(/\{airport\}/g, tr(CITY.airport))
      .replace(/\{checkin\}/g, (APT.checkin && APT.checkin.time) || '')
      .replace(/\{checkout\}/g, (APT.checkout && APT.checkout.time) || '');
    // French typography: keep « » and ; : ? ! attached to their words
    if (state.lang === 'fr') s = s.replace(/« /g, '« ').replace(/ ([»;:?!])/g, ' $1');
    return s;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function isTodo(s) { return typeof s === 'string' && /^\s*TODO/.test(s); }
  function todoBadge() { return '<span class="todo">' + esc(ui('todo')) + '</span>'; }

  /* Translated, filled and escaped text — or a "to complete" badge. */
  function txt(v) {
    var s = fill(tr(v));
    return isTodo(s) ? todoBadge() : esc(s);
  }

  function icon(name, cls) {
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.star) + '</svg>';
  }

  function d(i) { return ' style="--i:' + Math.min(i, 10) + '"'; }
  function tintStyle(t, i) { return ' style="--tint:' + (t || '#1D4C49') + (i != null ? ';--i:' + Math.min(i, 10) : '') + '"'; }

  /* Photos: open-licence pictures from Wikimedia Commons, listed in content/photos.js
     (made by tools/fetch-photos.py), by city, plus "morocco": pictures of the kind of
     thing (a door, mint tea), shared by every city. Without one, the drawn icon shows. */
  function photosOf(cityId) { return ((C.photos || {})[cityId]) || {}; }
  function photoFor(it, cityId) {
    if (!it) return null;
    if (it.image) return { src: it.image };
    // Its own photo, else the one it names (photo: 'tea'), of its city or a shared one
    var all = photosOf(cityId || (STAY && STAY.city));
    var p = (it.id && all[it.id]) || (it.photo && (all[it.photo] || photosOf('morocco')[it.photo]));
    return p && p.src ? p : null;
  }
  // A city's picture for its button, a section's for its tile and header
  // (the place's own pages, Wi-Fi or check-in, take a shared one)
  function coverFor(cityId, key) {
    var all = photosOf(cityId), ref = key ? (all._covers || {})[key] : all._city;
    if (ref && all[ref] && all[ref].src) return all[ref];
    var gen = photosOf('morocco'), g = key && (gen._covers || {})[key];
    return g && gen[g] && gen[g].src ? gen[g] : null;
  }
  function photoImg(p, sizes, eager) {
    // The real widths: a portrait or a small original is narrower than 1280 / 640
    var lw = p.w || 1280, sw = p.smw || (p.w && p.h ? Math.round(p.w * Math.min(1, 640 / Math.max(p.w, p.h))) : 640);
    return '<img src="' + esc(p.sm || p.src) + '"' +
      (p.sm ? ' srcset="' + esc(p.sm) + ' ' + sw + 'w, ' + esc(p.src) + ' ' + lw + 'w" sizes="' + esc(sizes || '50vw') + '"' : '') +
      ' alt=""' + (eager ? '' : ' loading="lazy"') + ' decoding="async"' +
      (p.pos ? ' style="object-position:' + esc(p.pos) + '"' : '') + '>';
  }
  function photoCredit(p) {
    if (!p.by && !p.lic) return '';
    var t = esc(ui(p.illustr ? 'illustration' : 'photo')) + (p.by ? ' · <bdi>' + esc(p.by) + '</bdi>' : '') + (p.lic ? ' · ' + esc(p.lic) : '');
    return '<figcaption class="ph-credit">' + (p.url ? '<a' + ext(p.url) + '>' + t + '</a>' : '<span>' + t + '</span>') + '</figcaption>';
  }

  /* ---------- formats ---------- */

  function fmtDuration(min) {
    if (!min) return '';
    var h = Math.floor(min / 60), m = min % 60;
    if (state.lang === 'ar') {
      var hs = h === 1 ? 'ساعة' : h === 2 ? 'ساعتان' : h ? h + ' ساعات' : '';
      var ms = m ? m + ' دقيقة' : '';
      return hs && ms ? hs + ' و' + ms : (hs || ms);
    }
    if (!h) return m + ' min';
    if (state.lang === 'fr') return h + ' h' + (m ? ' ' + (m < 10 ? '0' : '') + m : '');
    return h + ' h' + (m ? ' ' + m + ' min' : '');
  }

  function fmtPrice(it) {
    if (it.price === 0) return ui('free');
    if (typeof it.price !== 'number') return '';
    var amount = it.price + ' ' + (state.lang === 'ar' ? 'درهم' : 'MAD');
    return it.priceFrom ? ui('priceFrom') + ' ' + amount : '≈ ' + amount;
  }

  function fmtCoord(v, pos, neg) {
    var a = Math.abs(v), deg = Math.floor(a), m = Math.round((a - deg) * 60);
    if (m === 60) { deg += 1; m = 0; }
    return deg + '°' + (m < 10 ? '0' : '') + m + '′ ' + (v >= 0 ? pos : neg);
  }

  function fmtDistance(km) {
    if (km < 1) return Math.max(10, Math.round(km * 100) * 10) + ' m';
    var v = km < 10 ? (Math.round(km * 10) / 10).toString() : String(Math.round(km));
    if (state.lang !== 'en') v = v.replace('.', ',');
    return v + ' km';
  }

  // Morocco has been on UTC+0 all year since 20 September 2026. Phones whose
  // time-zone data predate that change still add an hour to Africa/Casablanca:
  // they get UTC instead, which is the same clock.
  var TZ = (function () {
    try {
      var now = new Date();
      if (now.getTime() < Date.UTC(2026, 8, 20, 1)) return 'Africa/Casablanca';
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Casablanca', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now);
      var get = function (t) { return +parts.filter(function (p) { return p.type === t; })[0].value; };
      var local = (get('hour') % 24) * 60 + get('minute');
      var utc = now.getUTCHours() * 60 + now.getUTCMinutes();
      return local === utc ? 'Africa/Casablanca' : 'UTC';
    } catch (e) { return 'Africa/Casablanca'; }
  })();

  function fmtTime(date) {
    try {
      return new Intl.DateTimeFormat(LOCALES[state.lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ }).format(date);
    } catch (e) { return ''; }
  }

  function budgetMarks(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
    return '<span class="budget" role="img" aria-label="' + esc(ui('budget') + ' ' + n + '/3') + '">' + s + '</span>';
  }

  /* ---------- today's sunset over the place (standard solar formulas) ---------- */

  function sunsetOn(date, lat, lng) {
    var rad = Math.PI / 180, dayMs = 86400000, J1970 = 2440588, J2000 = 2451545, J0 = 0.0009;
    var days = date.valueOf() / dayMs - 0.5 + J1970 - J2000;
    var lw = rad * -lng, phi = rad * lat;
    var n = Math.round(days - J0 - lw / (2 * Math.PI));
    var ds = J0 + lw / (2 * Math.PI) + n;
    var M = rad * (357.5291 + 0.98560028 * ds);
    var L = M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + Math.PI;
    var dec = Math.asin(Math.sin(rad * 23.4397) * Math.sin(L));
    var w = Math.acos((Math.sin(rad * -0.833) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)));
    var a = J0 + (w + lw) / (2 * Math.PI) + n;
    var jset = J2000 + a + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
    return new Date((jset + 0.5 - J1970) * dayMs);
  }

  function placePos() {
    var loc = APT.location || {};
    if (typeof loc.lat === 'number' && typeof loc.lng === 'number') return { lat: loc.lat, lng: loc.lng };
    var c = STAY ? cityById(STAY.city) : null;
    return c ? { lat: c.lat, lng: c.lng } : { lat: 33.59, lng: -7.62 };
  }

  function todaysSunset() {
    var p = placePos();
    return sunsetOn(new Date(), p.lat, p.lng);
  }

  function stopTime(st) {
    if (typeof st.rel !== 'number') return st.time;
    var t = todaysSunset().getTime() + st.rel * 60000;
    var step = 5 * 60000;
    return fmtTime(new Date(Math.round(t / step) * step));
  }

  function distanceKm(a, b) {
    var rad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 12742 * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  /* ---------- links ---------- */

  function aptQuery() {
    return (APT.location && APT.location.mapsQuery) || (STAY ? areaName(STAY) + ', ' + cityName(STAY.city) : '');
  }
  function aptLink() { return (APT.location && APT.location.mapsUrl) || mapsSearch(aptQuery()); }
  function mapsSearch(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function mapsDir(q, mode) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q) + (mode ? '&travelmode=' + mode : '');
  }

  function routeUrl(r) {
    var pts = r.stops.filter(function (s) { return s.maps; }).map(function (s) { return s.maps; });
    var origin = r.fromHome ? aptQuery() : pts.shift();
    var dest = pts.pop() || origin;
    // Google Maps in a phone's browser takes at most 3 stops in between: keep 3, evenly spread
    // (each stop of the timeline keeps its own arrow)
    if (pts.length > 3) pts = [pts[0], pts[Math.floor(pts.length / 2)], pts[pts.length - 1]];
    var url = 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(origin) + '&destination=' + encodeURIComponent(dest);
    if (pts.length) url += '&waypoints=' + pts.map(encodeURIComponent).join('%7C');
    if (r.mode) url += '&travelmode=' + r.mode;
    return url;
  }

  function waLink(message) {
    var number = String(host().whatsapp || '').replace(/\D/g, '');
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  function waHello() { return MODE === 'stay' ? ui('waHello') : ui('waHelloHome'); }
  function requestLink(what) { return waLink(ui('waRequest') + fill(tr(what))); }
  function ext(href) { return ' href="' + esc(href) + '" target="_blank" rel="noopener"'; }
  function stayHref(s) { return './?stay=' + encodeURIComponent(s.id); }

  /* ---------- favourites (kept per city) ---------- */

  function favKey() { return 'atlas.favs.' + (STAY ? STAY.city : ''); }
  function isNear(it) { return !!NEAR[it.id]; }
  function isFav(id) { return state.favs.indexOf(id) > -1; }

  function favButton(id) {
    var on = isFav(id);
    return '<button class="fav" type="button" data-fav="' + esc(id) + '" aria-pressed="' + on + '" aria-label="' + esc(ui(on ? 'removeFav' : 'addFav')) + '">' + icon('heart') + '</button>';
  }

  /* ---------- home: the brand and the choice of a place ---------- */

  function factPills(s, max) {
    return '<span class="facts">' + (s.facts || []).slice(0, max || 3).map(function (f) {
      return '<span class="fact">' + icon(f.icon) + '<span>' + esc(tr(f.label)) + '</span></span>';
    }).join('') + '</span>';
  }

  function stayCard(s, i, opts) {
    opts = opts || {};
    var km = state.geo ? state.geo.km[s.id] : null;
    var near = state.geo && state.geo.best.indexOf(s.id) > -1;
    var badge = km != null ? '<span class="vcard__badge" dir="ltr">' + esc(fmtDistance(km)) + '</span>' : '';
    // A photo of the place itself (cover), else of its neighbourhood
    var ph = s.cover ? { src: s.cover } : s.photo ? photoFor({ photo: s.photo }, s.city) : null;
    return '<article class="scard' + (opts.reveal ? ' reveal' : ' rise') + (near ? ' is-nearest' : '') + '"' + tintStyle(s.tint, i) + '>' +
      '<a class="scard__link" href="' + esc(stayHref(s)) + '">' +
        '<span class="art' + (ph ? ' art--photo' : '') + '">' + icon(s.icon || 'house') + (ph ? photoImg(ph, '128px') : '') + badge + '</span>' +
        '<span class="scard__body">' + (near ? '<span class="scard__near">' + icon('locate') + esc(ui('nearest')) + '</span>' : '') +
          '<span class="scard__name" dir="ltr">' + esc(s.name) + '</span>' +
          '<span class="scard__place">' + esc(placeLine(s)) + '</span>' + factPills(s, 3) + '</span>' +
        '<span class="scard__go" aria-hidden="true">' + icon('go', 'flip-rtl') + '</span></a></article>';
  }

  function sortedStays(list) {
    if (!state.geo) return list;
    return list.slice().sort(function (a, b) { return state.geo.km[a.id] - state.geo.km[b.id]; });
  }

  function renderHome() {
    // One big button per city: its emblem, its name, its number of places
    els.chips.innerHTML = CITIES.map(function (c) {
      var n = staysIn(c.id).length, ph = coverFor(c.id);
      return '<a class="city-chip" href="#' + esc(c.id) + '" data-open="' + esc(c.id) + '"' + tintStyle(c.tint) + '>' +
        '<span class="city-chip__icon' + (ph ? ' has-photo' : '') + '" aria-hidden="true">' + icon(CITY_ICONS[c.id] || 'pin') + (ph ? photoImg(ph, '120px', true) : '') + '</span>' +
        '<span class="city-chip__text"><span class="city-chip__name">' + esc(tr(c.name)) + '</span>' +
        '<span class="city-chip__n">' + n + ' ' + esc(ui(n > 1 ? 'stayMany' : 'stayOne')) + '</span></span>' +
        '<span class="city-chip__go" aria-hidden="true">' + icon('next', 'flip-rtl') + '</span></a>';
    }).join('');
    byId('home-kicker').textContent = CITIES.map(function (c) { return tr(c.name); }).join(' · ');

    // Back to the last place opened on this phone
    var last = loadJSON('atlas.stay', null);
    var lastStay = last && last.id ? stayById(last.id) : null;
    root.classList.toggle('has-resume', !!lastStay);
    if (lastStay) {
      els.resume.hidden = false;
      els.resume.href = stayHref(lastStay);
      els.resume.innerHTML = '<span>' + esc(ui('resume')) + '</span><b dir="ltr">' + esc(lastStay.name) + '</b>' + icon('go', 'flip-rtl');
    } else {
      els.resume.hidden = true;
    }
    els.locate.innerHTML = locateLabel();

    // Below the first screen: every place, by city
    var seen = !!els.groups.querySelector('.reveal.is-in');
    var rv = ' reveal' + (seen ? ' is-in' : '');
    els.groups.innerHTML = '<section class="group group--places" aria-labelledby="group-places">' +
      '<header class="group__head' + rv + '"><p class="eyebrow">' + esc(ui('ourPlaces')) + '</p>' +
      '<h2 class="group__title" id="group-places">' + esc(ui('ourPlacesTitle')) + '</h2></header>' +
      CITIES.map(function (c) {
        var list = sortedStays(staysIn(c.id));
        if (!list.length) return '';
        return '<div class="city-block">' +
          '<h3 class="city-block__title' + rv + '"' + tintStyle(c.tint) + '><span class="icircle">' + icon(CITY_ICONS[c.id] || 'pin') + '</span><span>' + esc(tr(c.name)) + '</span>' +
          '<span class="city-block__n">' + list.length + ' ' + esc(ui(list.length > 1 ? 'stayMany' : 'stayOne')) + '</span></h3>' +
          '<div class="scards">' + list.map(function (s, i) { return stayCard(s, i, { reveal: true }); }).join('') + '</div></div>';
      }).join('') + '</section>';
    if (seen) els.groups.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    watch(els.groups);
  }

  function locateLabel() { return icon('locate') + '<span>' + esc(ui(state.locating ? 'locating' : 'locateMe')) + '</span>'; }

  function viewCity(meta, id) {
    var list = sortedStays(staysIn(id));
    // Several places in this city: help the guest who does not know the name of theirs
    var help = list.length > 1 ? '<div class="locate-box rise"' + d(0) + '>' +
      '<p class="locate-box__q">' + esc(ui('dontKnowName')) + '</p>' +
      '<button class="locate locate--sheet" type="button" data-locate' + (state.locating ? ' aria-busy="true"' : '') + '>' + locateLabel() + '</button>' +
      '<p class="locate-box__note">' + esc(ui('locateNote')) + '</p></div>' : '';
    return help + '<div class="scards scards--sheet">' + list.map(function (s, i) { return stayCard(s, i + 1); }).join('') + '</div>';
  }

  /* "Trouver mon logement": the position stays on the phone; it only sorts the places */
  function locate() {
    // From the home's button, or from a city's page ("you don't know the name of your place?")
    var inCity = !!state.current && (sectionMeta(state.current) || {}).type === 'city';
    if (!navigator.geolocation) { toast(ui(inCity ? 'locateFailList' : 'locateFail')); return; }
    if (state.locating) return;
    function busy(on) {
      state.locating = on;
      document.querySelectorAll('#locate-btn, [data-locate]').forEach(function (b) {
        if (on) b.setAttribute('aria-busy', 'true'); else b.removeAttribute('aria-busy');
        b.innerHTML = locateLabel();
      });
    }
    busy(true);
    function stop() { busy(false); }
    navigator.geolocation.getCurrentPosition(function (pos) {
      stop();
      var here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      var km = {};
      STAYS.forEach(function (s) { if (typeof s.lat === 'number') km[s.id] = distanceKm(here, s); });
      var ids = Object.keys(km).sort(function (a, b) { return km[a] - km[b]; });
      if (!ids.length || km[ids[0]] > 60) { renderHome(); toast(ui(inCity ? 'locateFarList' : 'locateFar')); return; }
      // Places at the same spot (one building, or positions not set yet) are all "closest"
      var best = ids.filter(function (id) { return km[id] - km[ids[0]] < 0.15; });
      state.geo = { km: km, best: best };
      renderHome();
      var city = stayById(ids[0]).city;
      if (!inCity) stepIn('#' + city);
      if (window.location.hash === '#' + city) route(); else window.location.hash = city;
      // The closest place is now first in the list: show it
      if (inCity && state.current === city) els.scroll.scrollTop = 0;
    }, function (err) {
      stop();
      renderHome();
      toast(ui((err && err.code === 1 ? 'locateDenied' : 'locateFail') + (inCity ? 'List' : '')));
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 120000 });
  }

  /* ---------- a place's home ---------- */

  // "1 parcours", "2 routes", "مساران": the singular, the Arabic dual, the plural
  function count(n, what) {
    if (n === 1) return ui(what + 'One');
    if (n === 2 && state.lang === 'ar') return ui(what + 'Two');
    return n + ' ' + ui(what + 'sCount');
  }

  function tileData(id) {
    if (id === 'wifi') {
      var n = APT.wifi && APT.wifi.network;
      return n && !isTodo(n) ? '<span dir="ltr">' + esc(n) + '</span>' : DRAFT ? '' : esc(ui('wifiOnCard'));
    }
    if (id === 'stay') return '<span dir="ltr">' + esc(APT.checkin.time) + ' · ' + esc(APT.checkout.time) + '</span>';
    if (id === 'assistance') return '<span dir="ltr">19 · 15 · 177</span>';
    var s = SECTIONS[id];
    var shown = (s.items || []).filter(function (it) { return DRAFT || it.kind !== 'placeholder'; }).length;
    if (s.type === 'routes') return esc(count(shown, 'route'));
    if (id === 'visit') return esc(count(shown, 'place'));
    return '';
  }

  function renderGroups() {
    var seen = !!els.groups.querySelector('.reveal.is-in');
    var rv = ' reveal' + (seen ? ' is-in' : '');
    els.groups.innerHTML = GROUPS.map(function (g) {
      var tiles = g.items.filter(function (id) { return SECTIONS[id]; }).map(function (id, i) {
        var s = SECTIONS[id];
        var wide = (g.wide || []).indexOf(id) > -1;
        var data = tileData(id);
        var ph = coverFor(STAY.city, id);
        return '<a class="tile tile--' + g.id + (wide ? ' tile--wide' : '') + (ph ? ' tile--photo' : '') + rv + '"' + tintStyle(s.tint, i) + ' href="#' + id + '" data-open="' + id + '">' +
          (ph ? '<span class="tile__photo" aria-hidden="true">' + photoImg(ph, wide ? '(min-width: 760px) 50vw, 100vw' : '(min-width: 760px) 25vw, 50vw') + '</span>' : '') +
          '<span class="tile__icon">' + icon(s.icon) + '</span>' +
          (g.id === 'city' ? '<span class="tile__art" aria-hidden="true">' + icon(s.icon) + '</span>' : '') +
          '<span class="tile__text"><span class="tile__label">' + esc(tr(s.title)) + '</span>' +
          (data ? '<span class="tile__data">' + data + '</span>' : '') + '</span></a>';
      }).join('');
      var hostLine = g.id === 'home' && APT.welcome ?
        '<p class="host-line"><span class="avatar" aria-hidden="true">' + esc((host().name || '?').charAt(0)) + '</span><span>' + txt(APT.welcome) + '</span></p>' : '';
      return '<section class="group group--' + g.id + '" aria-labelledby="group-' + g.id + '">' +
        '<header class="group__head' + rv + '"><p class="eyebrow">' + txt(g.kicker) + '</p>' +
        '<h2 class="group__title" id="group-' + g.id + '">' + txt(g.title) + '</h2>' + hostLine + '</header>' +
        '<nav class="btns btns--' + g.id + '" aria-labelledby="group-' + g.id + '">' + tiles + '</nav></section>';
    }).join('');
    watch(els.groups);
  }

  function renderStayHero() {
    // Above the name: the brand ("Darna Collection" over "Bourgogne"); the city is in the clock line
    byId('stay-kicker').textContent = BRAND.name || '';
    var words = String(STAY.name).split(' ');
    var lines = STAY.title || (words.length > 1 ? [words.slice(0, -1).join(' '), words[words.length - 1]] : [STAY.name, '']);
    var title = byId('stay-title');
    title.querySelector('.l1').textContent = lines[0];
    title.querySelector('.l2').textContent = lines[1] || '';
    // Long names get a smaller title so they stay on one line each
    title.style.setProperty('--tc', Math.max(lines[0].length, (lines[1] || '').length + 1, 5));
    byId('stay-tagline').textContent = ui('homeTagline');
    var p = placePos();
    els.coords.textContent = fmtCoord(p.lat, 'N', 'S') + ' · ' + fmtCoord(p.lng, 'E', 'W');
    els.clockCity.textContent = cityName(STAY.city);
  }

  function applyLang() {
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = ui(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) { el.setAttribute('aria-label', ui(el.getAttribute('data-i18n-label'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === state.lang)); });
    document.querySelectorAll('[data-host]').forEach(function (el) { el.textContent = host().name || ''; });
    els.wa.href = waLink(waHello());
    updateThemeButton();
    if (MODE === 'stay') { renderStayHero(); renderGroups(); updateFavCount(); }
    else renderHome();
    updateClock();
    if (state.current) renderSheet(state.current, true);
    if (state.modal) renderModal(state.modal);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1 || lang === state.lang) return;
    state.lang = lang;
    save('atlas.lang', lang);
    applyLang();
  }

  /* ---------- light and dark mode ---------- */

  // Follows the phone's setting until the guest picks one with the sun/moon button.
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return darkQuery && darkQuery.matches ? 'dark' : 'light';
  }

  function updateThemeButton() {
    var btn = byId('theme-btn');
    if (!btn) return;
    var dark = currentTheme() === 'dark';
    btn.innerHTML = icon(dark ? 'sun' : 'moon');
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', ui(dark ? 'themeLight' : 'themeDark'));
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    save('atlas.theme', theme);
    updateThemeButton();
  }

  var savedTheme = loadPref('atlas.theme', 'casa.theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.setAttribute('data-theme', savedTheme);
  if (darkQuery) {
    var onSystemTheme = function () { updateThemeButton(); };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemTheme);
    else if (darkQuery.addListener) darkQuery.addListener(onSystemTheme);
  }

  function updateClock() {
    var now = fmtTime(new Date());
    if (els.clock) els.clock.textContent = now;
    if (els.clockHome) els.clockHome.textContent = now;
    if (els.sunset && MODE === 'stay') els.sunset.textContent = fmtTime(todaysSunset());
  }

  function updateFavCount() {
    var n = state.favs.filter(function (id) { return INDEX[id]; }).length;
    els.favCount.textContent = n;
    els.favCount.hidden = n === 0;
  }

  /* ---------- reveal on scroll ---------- */

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }) : null;

  function watch(scope) {
    scope.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) {
      if (io) io.observe(el); else el.classList.add('is-in');
    });
  }

  /* ---------- scroll-driven film ---------- */

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var h = window.innerHeight || 1;
      var y = window.scrollY || window.pageYOffset || 0;
      var p = Math.min(1, Math.max(0, y / (h * 0.85)));
      root.style.setProperty('--p', p.toFixed(3));
      els.topbar.classList.toggle('is-solid', y > h * 0.6);
      root.classList.toggle('on-hero', y <= h * 0.6);
    });
  }

  /* ---------- video ---------- */

  function reducedMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  function playVideo() {
    if (!els.video || !els.video.currentSrc || reducedMotion()) return;
    var p = els.video.play();
    if (p && p.catch) p.catch(function () { /* autoplay refused: the still stays */ });
  }
  function pauseVideo() { if (els.video && !els.video.paused) els.video.pause(); }
  function resumeVideo() { if (els.stage.classList.contains('has-video')) playVideo(); }

  // film: { video, videoPortrait, credit } or null; scene: the drawing underneath
  function initVideo(film, scene) {
    els.stage.setAttribute('data-scene', scene || 'atlantic');
    var v = els.video;
    if (!v || !film) return;
    // Phones held upright get the vertical cut, anything wider the landscape one
    var cut = (window.innerHeight > window.innerWidth && film.videoPortrait) || film.video;
    if (!cut) return;
    if (typeof cut === 'string') cut = { mp4: cut };
    // Who filmed it: one name with its link, or several clips listed on the credits page
    state.film = film;
    var credit = film.credit, creditEl = byId('film-credit'), link = byId('film-credit-link');
    if (creditEl && link && film.credits && film.credits.length) {
      var lead = creditEl.querySelector('[data-i18n]');
      if (lead) { lead.setAttribute('data-i18n', 'filmFrom'); lead.textContent = ui('filmFrom'); }
      link.setAttribute('data-i18n', 'filmCommons');
      link.textContent = ui('filmCommons');
      link.href = '#credits';
      link.setAttribute('data-open', 'credits');
      link.removeAttribute('target');
      creditEl.hidden = false;
    } else if (credit && credit.name && creditEl && link) {
      link.textContent = credit.name;
      if (credit.url) link.href = credit.url; else link.removeAttribute('href');
      creditEl.hidden = false;
    }
    // The still (the film's first frame) replaces the drawn scene as soon as it loads,
    // and stays on its own with reduced motion, Data Saver, or when autoplay is refused
    if (cut.poster && els.poster) {
      els.poster.addEventListener('load', function () { els.stage.classList.add('has-poster'); });
      els.poster.src = cut.poster;
    }
    if (reducedMotion() || (navigator.connection && navigator.connection.saveData)) return;
    // H.264 first (iPhones decode it in hardware), VP9 where H.264 is missing
    var sources = [];
    if (cut.mp4 && v.canPlayType('video/mp4; codecs="avc1.640028"')) sources.push(cut.mp4);
    if (cut.webm && v.canPlayType('video/webm; codecs="vp9"')) sources.push(cut.webm);
    if (!sources.length) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    var i = 0;
    function next() {
      if (i >= sources.length) return;
      v.src = sources[i++];
      v.load();
    }
    v.addEventListener('error', next);
    // Show the film only once it really plays (iPhone Low Power Mode refuses autoplay)
    v.addEventListener('playing', function () { els.stage.classList.add('has-video'); });
    v.addEventListener('loadeddata', function () { if (!state.current) playVideo(); });
    next();
  }

  /* ---------- sheet ---------- */

  function sectionMeta(id) {
    var m = SECTIONS[id] || SPECIAL[id];
    // The home screen only opens city pages; the rest needs a place
    return MODE === 'home' && (!m || (m.type !== 'city' && id !== 'credits')) ? null : m;
  }

  function openSheet(id) {
    var wasOpen = !!state.current;
    state.current = id;
    state.howto = -1;
    renderSheet(id);
    els.scroll.scrollTop = 0;
    els.bar.classList.remove('is-stuck');
    if (!wasOpen) {
      state.lastFocus = document.activeElement;
      els.sheet.hidden = false;
      document.body.classList.add('is-locked');
      els.sheet.getBoundingClientRect();
      els.sheet.classList.add('is-open');
      pauseVideo();
    }
    // Focus the page itself (announced by screen readers) rather than drawing a ring on the back button
    window.setTimeout(function () { try { els.sheet.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 60);
  }

  function closeSheet() {
    if (!state.current) return;
    state.current = null;
    els.sheet.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    window.setTimeout(function () {
      if (!state.current) { els.sheet.hidden = true; els.body.innerHTML = ''; els.band.innerHTML = ''; }
    }, 700);
    resumeVideo();
    if (state.lastFocus && state.lastFocus.focus) {
      try { state.lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }

  /* The guide's own steps in the browser history (a tap that opened a page or a detail).
     The back arrows go back through them, like the phone's Back button, and only close
     a page in place when it was opened directly from a link. */
  var trail = [];
  function stepIn(to) {
    if (to && to !== window.location.hash) trail.push({ from: window.location.hash, to: to });
  }
  function ownStep() {
    var t = trail[trail.length - 1];
    return t && t.to === window.location.hash ? t : null;
  }

  function goBack() {
    if (ownStep()) { window.history.back(); return; }
    closeModal();
    closeSheet();
    try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) { /* sandboxed frame */ }
  }

  function parseHash() {
    var raw = (window.location.hash || '').replace(/^#/, '');
    var dot = raw.indexOf('.');
    var sid = dot > -1 ? raw.slice(0, dot) : raw;
    var iid = dot > -1 ? raw.slice(dot + 1) : '';
    return { sid: ALIASES[sid] || sid, iid: iid };
  }

  function route() {
    // Back (arrow or phone) to where the last step started: that step is done
    var last = trail[trail.length - 1];
    if (last && window.location.hash === last.from) trail.pop();
    var h = parseHash();
    var meta = sectionMeta(h.sid);
    if (meta && meta.type === 'city' && staysIn(h.sid).length === 1) {
      try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) { /* sandboxed frame */ }
      window.location.assign(stayHref(staysIn(h.sid)[0]));
      return;
    }
    if (!sectionMeta(h.sid)) {
      closeModal();
      if (state.current) closeSheet();
      return;
    }
    if (state.current !== h.sid) openSheet(h.sid);
    else if (sectionMeta(h.sid).type === 'city') renderSheet(h.sid, true); // re-sorted by distance
    if (h.iid) openModal(h.sid + '.' + h.iid);
    else closeModal();
  }

  function renderSheet(id, keepScroll) {
    var top = els.scroll.scrollTop;
    var meta = sectionMeta(id);
    var title, kicker, html, extra = '';
    if (meta.type === 'city') {
      var n = staysIn(id).length;
      title = cityName(id);
      kicker = n + ' ' + ui(n > 1 ? 'stayMany' : 'stayOne');
      html = viewCity(meta, id);
    }
    else if (id === 'location') { title = ui('locationTitle'); kicker = STAY.name; html = viewLocation(); }
    else if (id === 'favorites') { title = ui('favsTitle'); kicker = cityName(STAY.city); html = viewFavorites(); }
    else if (id === 'credits') { title = ui('photoCredits'); kicker = STAY ? cityName(STAY.city) : BRAND.name; html = viewCredits(); }
    else {
      title = tr(meta.title);
      kicker = (BRAND.stayGroup || []).indexOf(id) > -1 ? STAY.name : cityName(STAY.city);
      var view = VIEWS[meta.type] || viewPlaces;
      html = view(meta, id);
      if (meta.type === 'routes') extra = '<div class="band__meta"><span class="pill">' + icon('sun') + '<span>' + esc(ui('sunsetToday')) + ' ' + esc(fmtTime(todaysSunset())) + '</span></span></div>';
    }
    var cover = meta.type === 'city' ? coverFor(id) : !STAY || id === 'credits' ? null :
      coverFor(STAY.city, id) || (id === 'location' ? coverFor(STAY.city) : null);
    els.band.innerHTML = '<header class="band' + (cover ? ' band--photo' : '') + '"' + tintStyle(meta.tint) + '>' +
      '<span class="band__art" aria-hidden="true">' + icon(meta.icon) + '</span>' +
      (cover ? '<span class="band__photo" aria-hidden="true">' + photoImg(cover, '100vw', true) + '</span>' : '') +
      '<div class="band__text"><p class="eyebrow">' + esc(kicker) + '</p>' +
      '<h1 class="band__title" id="sheet-title">' + esc(title) + '</h1>' + extra + '</div></header>';
    els.barTitle.textContent = title;
    els.body.style.setProperty('--tint', meta.tint || '#1D4C49');
    els.body.innerHTML = html;
    if (keepScroll) els.scroll.scrollTop = top;
  }

  function subhead(label, i) { return '<h2 class="s-sub rise"' + d(i) + '>' + esc(label) + '</h2>'; }

  /* places */

  function art(it, iconName, sizes) {
    var ph = photoFor(it);
    return '<span class="art' + (ph ? ' art--photo' : '') + '">' + icon(it.icon || iconName) +
      (ph ? photoImg(ph, sizes) + (ph.illustr ? '<span class="ph-tag">' + esc(ui('illustration')) + '</span>' : '') : '');
  }

  function detailArt(it, iconName) {
    var ph = photoFor(it);
    if (!ph) return '<div class="art d-art">' + icon(it.icon || iconName) + '</div>';
    return '<figure class="art d-art art--photo">' + icon(it.icon || iconName) + photoImg(ph, '(min-width: 700px) 640px, 100vw', true) + photoCredit(ph) + '</figure>';
  }

  // A photo that cannot load (offline and never seen, or gone): back to the drawn icon
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    var box = img.closest('.art--photo, .tile--photo, .band--photo, .has-photo, .credit-row__img');
    if (!box) return;
    ['art--photo', 'tile--photo', 'band--photo', 'has-photo'].forEach(function (c) { box.classList.remove(c); });
    box.querySelectorAll('.tile__photo, .band__photo, .ph-credit, .ph-tag').forEach(function (el) { el.parentNode.removeChild(el); });
    if (img.parentNode) img.parentNode.removeChild(img);
  }, true);

  function chip(id, label, on) {
    return '<button class="chip" type="button" data-chip="' + esc(id) + '" aria-pressed="' + on + '">' + esc(label) + '</button>';
  }

  function card(it, sid, i) {
    var s = SECTIONS[sid];
    var href = '#' + sid + '.' + it.id;
    if (it.kind === 'placeholder') {
      if (!DRAFT) return '';
      return '<article class="vcard vcard--soon rise"' + tintStyle(s.tint, i) + '><div class="vcard__link">' +
        '<span class="art">' + icon('star') + '</span>' +
        '<span class="vcard__body"><span class="vcard__name">' + txt(it.name) + '</span>' + todoBadge() + '</span></div></article>';
    }
    var badge = isNear(it) ? '<span class="vcard__badge">' + icon('walk') + esc(ui('onFoot')) + '</span>' :
      it.kind === 'request' ? '<span class="vcard__badge">' + icon('chat') + esc(ui('onRequest')) + '</span>' : '';
    return '<article class="vcard' + (it.kind === 'note' ? ' vcard--note' : '') + ' rise" data-tags="' + esc((it.tags || []).join(' ')) + '"' + tintStyle(s.tint, i) + '>' +
      '<a class="vcard__link" href="' + href + '" data-open-detail>' +
        art(it, it.kind === 'note' ? 'bulb' : s.icon, '(min-width: 620px) 30vw, 50vw') + badge + '</span>' +
        '<span class="vcard__body"><span class="vcard__name">' + txt(it.name) + '</span>' +
        (it.short ? '<span class="vcard__short">' + txt(it.short) + '</span>' : '') + '</span></a>' +
      (it.kind ? '' : favButton(it.id)) +
      '</article>';
  }

  function viewPlaces(s, sid) {
    var out = '';
    if (s.filters && s.filters.length) {
      out += '<div class="chips rise"' + d(0) + ' role="group" aria-label="' + esc(ui('filter')) + '">' +
        chip('all', ui('all'), true) + s.filters.map(function (f) { return chip(f.id, tr(f.label), false); }).join('') + '</div>';
    }
    return out + '<div class="cards">' + s.items.map(function (it, i) { return card(it, sid, i + 1); }).join('') + '</div>';
  }

  function placePills(it) {
    var p = [];
    if (it.duration) p.push('<span class="pill">' + icon('clock') + '<span>' + esc(fmtDuration(it.duration)) + '</span></span>');
    var price = fmtPrice(it);
    if (price) p.push('<span class="pill">' + icon('coins') + '<span>' + esc(price) + '</span></span>');
    if (it.budget) p.push('<span class="pill">' + icon('coins') + budgetMarks(it.budget) + '</span>');
    if (it.sunset) p.push('<span class="pill">' + icon('sunset') + '<span>' + esc(fmtTime(todaysSunset())) + '</span></span>');
    if (isNear(it)) p.push('<span class="pill pill--near">' + icon('walk') + '<span>' + esc(ui('nearHome')) + '</span></span>');
    return p.length ? '<div class="pills">' + p.join('') + '</div>' : '';
  }

  function detailPlace(it, sid) {
    var s = SECTIONS[sid];
    if (it.kind === 'note') {
      return '<div class="art d-art">' + icon('bulb') + '</div><div class="d-body">' +
        '<p class="eyebrow">' + esc(ui('goodToKnow')) + '</p>' +
        '<h2 class="d-title" id="modal-title">' + txt(it.name) + '</h2>' +
        (it.desc ? '<p class="d-desc">' + txt(it.desc) + '</p>' : '') +
        '<ul class="d-list">' + (it.list || []).map(function (l) {
          return '<li>' + (l.term ? '<b>' + esc(tr(l.term)) + '</b>' : icon('check')) + '<span>' + txt(l.text) + '</span></li>';
        }).join('') + '</ul></div>';
    }
    var actions = '';
    if (it.maps) actions += '<a class="btn btn--go"' + ext(mapsDir(it.maps, isNear(it) ? 'walking' : '')) + '>' + icon('nav') + '<span>' + esc(ui('go')) + '</span></a>';
    if (it.request) actions += '<a class="btn btn--go"' + ext(requestLink(it.request)) + '>' + icon('chat') + '<span>' + esc(ui('askHost')) + '</span></a>';
    if (!it.kind) actions += favButton(it.id);
    return detailArt(it, s.icon) + '<div class="d-body">' +
      (it.area ? '<p class="eyebrow">' + txt(it.area) + '</p>' : '') +
      '<h2 class="d-title" id="modal-title">' + txt(it.name) + '</h2>' +
      (it.short ? '<p class="d-short">' + txt(it.short) + '</p>' : '') +
      placePills(it) +
      (it.desc ? '<p class="d-desc">' + txt(it.desc) + '</p>' : '') +
      (it.tip ? '<p class="d-tip">' + icon('bulb') + '<span>' + txt(it.tip) + '</span></p>' : '') +
      (actions ? '<div class="d-actions">' + actions + '</div>' : '') + '</div>';
  }

  /* routes */

  function routeLine(n) {
    var w = 300, h = 100, pts = [];
    for (var i = 0; i < n; i++) {
      var x = n === 1 ? w / 2 : 14 + i * ((w - 28) / (n - 1));
      var y = h / 2 + Math.sin(i * 1.35 + 0.6) * (h * 0.3);
      pts.push([x, y]);
    }
    var path = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var k = 1; k < pts.length; k++) {
      var mx = (pts[k - 1][0] + pts[k][0]) / 2;
      path += ' C' + mx.toFixed(1) + ' ' + pts[k - 1][1].toFixed(1) + ' ' + mx.toFixed(1) + ' ' + pts[k][1].toFixed(1) + ' ' + pts[k][0].toFixed(1) + ' ' + pts[k][1].toFixed(1);
    }
    var dots = pts.map(function (p, i) {
      var last = i === pts.length - 1 || i === 0;
      return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (last ? 6 : 4) + '" fill="' + (last ? '#fff' : 'none') + '" stroke="#fff" stroke-width="2"/>';
    }).join('');
    return '<svg class="route-line" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true" focusable="false"><path d="' + path + '" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.6" stroke-dasharray="2 6" stroke-linecap="round"/>' + dots + '</svg>';
  }

  function routePills(r) {
    return '<div class="pills"><span class="pill">' + icon(r.mode === 'walking' ? 'walk' : 'car') + '<span>' + txt(r.duration) + '</span></span>' +
      '<span class="pill">' + icon('pin') + '<span>' + r.stops.length + ' ' + esc(ui('stepsCount')) + '</span></span></div>';
  }

  function viewRoutes(s, sid) {
    return '<div class="rcards">' + s.items.map(function (r, i) {
      var ph = photoFor(r);
      return '<article class="rcard rise"' + tintStyle(s.tint, i) + '><a class="rcard__link" href="#' + sid + '.' + r.id + '" data-open-detail>' +
        '<span class="art' + (ph ? ' art--photo' : '') + '">' + routeLine(r.stops.length) + (ph ? photoImg(ph, '(min-width: 620px) 50vw, 100vw') : '') + '</span>' +
        '<span class="rcard__body"><span class="rcard__title">' + txt(r.title) + '</span>' + routePills(r) + '</span></a></article>';
    }).join('') + '</div>';
  }

  function detailRoute(r) {
    var stops = r.stops.map(function (st) {
      return '<li' + (typeof st.rel === 'number' && st.rel > -30 && st.rel < 0 ? ' class="is-sunset"' : '') + '><time>' + esc(stopTime(st)) + '</time>' +
        '<div class="stop"><h3 class="stop__title">' + txt(st.title) + '</h3>' + (st.text ? '<p class="stop__text">' + txt(st.text) + '</p>' : '') + '</div>' +
        (st.maps ? '<a class="go-mini"' + ext(mapsDir(st.maps, r.mode)) + ' aria-label="' + esc(ui('directions')) + '">' + icon('nav') + '</a>' : '<span></span>') + '</li>';
    }).join('');
    var ph = photoFor(r);
    return (ph ? '<figure class="art d-art art--photo">' + routeLine(r.stops.length) + photoImg(ph, '(min-width: 700px) 640px, 100vw', true) + photoCredit(ph) + '</figure>' :
      '<div class="art d-art">' + routeLine(r.stops.length) + '</div>') + '<div class="d-body">' +
      '<h2 class="d-title" id="modal-title">' + txt(r.title) + '</h2>' + routePills(r) +
      '<ol class="timeline">' + stops + '</ol>' +
      '<div class="d-actions"><a class="btn btn--go"' + ext(routeUrl(r)) + '>' + icon('map') + '<span>' + esc(ui('openRoute')) + '</span></a></div></div>';
  }

  /* practical blocks (transport, help) */

  function blockTile(b, sid, i, tint) {
    return '<a class="itile rise" href="#' + sid + '.b' + i + '" data-open-detail' + tintStyle(tint, i + 1) + '>' +
      '<span class="icircle">' + icon(b.icon || 'info') + '</span>' +
      '<span><span class="itile__title">' + txt(b.title) + '</span>' + (b.key ? '<span class="itile__key">' + txt(b.key) + '</span>' : '') + '</span></a>';
  }

  function viewInfo(s, sid) {
    return '<div class="itiles">' + s.blocks.map(function (b, i) { return blockTile(b, sid, i, s.tint); }).join('') + '</div>';
  }

  function detailBlock(b, s) {
    var h = '<div class="art d-art">' + icon(b.icon || s.icon) + '</div><div class="d-body">' +
      '<h2 class="d-title" id="modal-title">' + txt(b.title) + '</h2>';
    if (b.key) h += '<p class="d-short">' + txt(b.key) + '</p>';
    if (b.body) h += '<p class="d-desc">' + txt(b.body) + '</p>';
    var items = (b.list || []).map(function (li) { return '<li>' + icon('check') + '<span>' + txt(li) + '</span></li>'; });
    (b.rows || []).forEach(function (r) { items.push('<li>' + icon('pin') + '<span>' + txt(r.label) + ' · ' + txt(r.value) + '</span></li>'); });
    if (items.length) h += '<ul class="d-list">' + items.join('') + '</ul>';
    if (b.request) h += '<div class="d-actions"><a class="btn btn--go"' + ext(requestLink(b.request)) + '>' + icon('chat') + '<span>' + esc(ui('askHost')) + '</span></a></div>';
    return h + '</div>';
  }

  function viewHelp(s, sid) {
    var out = '', tiles = [];
    s.blocks.forEach(function (b, i) {
      if (b.action === 'whatsapp') {
        out += '<section class="hostcard rise"' + tintStyle(s.tint, 0) + '><div class="hostcard__who"><span class="avatar" aria-hidden="true">' + esc((host().name || '?').charAt(0)) + '</span>' +
          '<div><div class="hostcard__name">' + esc(host().name) + '</div><div class="hostcard__role">' + esc(ui('yourHost')) + '</div></div></div>' +
          '<a class="btn btn--wide"' + ext(waLink(waHello())) + '>' + icon('chat') + '<span>WhatsApp</span></a></section>';
      } else if (b.phones) {
        out += subhead(tr(b.title), 1) + '<div class="sos rise"' + d(1) + '>' + b.phones.map(function (p) {
          return '<a href="tel:' + esc(p.number) + '"><span class="sos__num">' + esc(p.number) + '</span><span class="sos__label">' + txt(p.label) + '</span></a>';
        }).join('') + '</div>';
      } else if (b.phrases) {
        tiles.push({ phrases: b });
      } else {
        tiles.push({ block: b, index: i });
      }
    });
    var plain = tiles.filter(function (t) { return t.block; });
    if (plain.length) {
      out += subhead(ui('goodToKnow'), 2) + '<div class="itiles">' + plain.map(function (t) { return blockTile(t.block, sid, t.index, s.tint); }).join('') + '</div>';
    }
    tiles.filter(function (t) { return t.phrases; }).forEach(function (t) {
      out += subhead(tr(t.phrases.title), 3) + '<div class="flash rise"' + d(3) + '>' + t.phrases.phrases.map(function (p) {
        return '<div class="flash__card"><span class="flash__latin" lang="fr" dir="ltr">' + esc(p.latin) + '</span>' +
          '<span class="flash__ar" lang="ar" dir="rtl">' + esc(p.ar) + '</span><span class="flash__meaning">' + txt(p.meaning) + '</span></div>';
      }).join('') + '</div>';
    });
    return out;
  }

  /* the place's own pages */

  function copyPill(value) {
    return '<button class="copy-pill" type="button" data-copy="' + esc(value) + '">' + icon('copy') + '<span>' + esc(ui('copy')) + '</span></button>';
  }

  function viewWifi() {
    var w = APT.wifi || {};
    var net = w.network;
    var netValue = ready4guests(net) ? '<span class="wifi-row__value" dir="ltr">' + txt(net) + '</span>' :
      '<span class="wifi-row__value is-muted">' + icon('card') + '<span>' + esc(ui('wifiOnCard')) + '</span></span>';
    return '<section class="wifi-card rise"' + d(0) + '>' +
      '<div class="wifi-row"><div class="wifi-row__text"><span class="eyebrow">' + esc(ui('network')) + '</span>' +
        netValue + '</div>' + (net && !isTodo(net) ? copyPill(net) : '') + '</div>' +
      '<div class="wifi-row"><div class="wifi-row__text"><span class="eyebrow">' + esc(ui('password')) + '</span>' +
        (w.password ? '<span class="wifi-row__value" dir="ltr">' + esc(w.password) + '</span>' :
          '<span class="wifi-row__value is-muted">' + icon('card') + '<span>' + esc(ui('wifiOnCard')) + '</span></span>') +
        '</div>' + (w.password ? copyPill(w.password) : '') + '</div></section>';
  }

  function viewStay() {
    var inTab = state.stayTab === 'in';
    var list = inTab ? APT.checkin.steps : APT.checkout.steps;
    var steps = list.map(function (st, i) {
      if (st.todo && !DRAFT) return '';
      var done = !inTab && state.done.indexOf(i) > -1;
      return '<li class="' + (done ? 'is-done' : '') + '"><span class="icircle">' + icon(st.icon || 'check') + '</span>' +
        '<span class="vsteps__text"><span>' + txt(st) + '</span>' + (st.todo ? todoBadge() : '') + '</span>' +
        (inTab ? '' : '<button class="check" type="button" data-check="' + i + '" aria-pressed="' + done + '" aria-label="' + esc(ui('done')) + '">' + icon('check') + '</button>') + '</li>';
    }).join('');
    function timeTile(label, hint, time, ic) {
      return '<div class="time-tile"><span class="icircle">' + icon(ic) + '</span><span class="eyebrow">' + esc(label) + '</span>' +
        '<span class="time-tile__time" dir="ltr">' + (isTodo(time) ? todoBadge() : esc(time)) + '</span><span class="time-tile__hint">' + esc(hint) + '</span></div>';
    }
    return '<div class="times rise"' + d(0) + '>' + timeTile(ui('checkin'), ui('from'), APT.checkin.time, 'key') + timeTile(ui('checkout'), ui('before'), APT.checkout.time, 'door') + '</div>' +
      '<div class="seg rise"' + d(1) + ' role="tablist">' +
        '<button type="button" role="tab" data-tab="in" aria-selected="' + inTab + '">' + esc(ui('checkin')) + '</button>' +
        '<button type="button" role="tab" data-tab="out" aria-selected="' + !inTab + '">' + esc(ui('checkout')) + '</button></div>' +
      '<ol class="vsteps rise"' + d(2) + '>' + steps + '</ol>';
  }

  function viewHouse() {
    var hs = (APT.howto || []).filter(function (h) { return ready4guests(h.body); });
    var grid = '<div class="howto-grid rise"' + d(0) + '>' + hs.map(function (h, i) {
      return '<button class="howto-btn" type="button" data-howto="' + i + '" aria-expanded="' + (state.howto === i) + '"><span class="icircle">' + icon(h.icon || 'info') + '</span><span>' + txt(h.title) + '</span></button>';
    }).join('') + '</div>';
    var sel = hs[state.howto];
    var panel = sel ? '<div class="howto-panel rise"' + d(1) + ' aria-live="polite"><h3>' + txt(sel.title) + '</h3><p>' + txt(sel.body) + '</p></div>' : '';
    var rules = '<div class="rules rise"' + d(3) + '>' + (APT.rules || []).map(function (r) {
      return '<div class="rule"><span class="icircle">' + icon(r.icon || 'check') + '</span><span>' + txt(r) + '</span></div>';
    }).join('') + '</div>';
    return grid + panel + subhead(ui('rules'), 2) + rules;
  }

  function viewNearby() {
    return '<div class="itiles">' + (APT.nearby || []).filter(function (n) { return ready4guests(n.name); }).map(function (n, i) {
      var inner = '<span class="icircle">' + icon(n.icon || 'pin') + '</span><span><span class="itile__title">' + txt(n.label) + '</span>' +
        '<span class="itile__key">' + txt(n.name) + '</span></span>' +
        (n.walk ? '<span class="near-tile__walk">' + icon('walk') + '<span>' + n.walk + ' min</span></span>' :
          n.drive ? '<span class="near-tile__walk">' + icon('car') + '<span>' + n.drive + ' min</span></span>' : '');
      // Directions on foot, unless the tile gives a drive time or the place is reached by car (travel: 'driving')
      var mode = n.walk ? 'walking' : n.drive ? 'driving' : (APT.travel || 'walking');
      return n.maps ? '<a class="itile near-tile rise"' + d(i) + ext(mapsDir(n.maps, mode)) + '>' + inner + '</a>' :
        '<div class="itile near-tile rise"' + d(i) + '>' + inner + '</div>';
    }).join('') + '</div>';
  }

  function viewServices() {
    return '<ul class="svc">' + (APT.services || []).map(function (sv, i) {
      return '<li class="rise"' + d(i) + '><span class="icircle">' + icon(sv.icon || 'sparkle') + '</span>' +
        '<div><h3>' + txt(sv.title) + '</h3><p>' + txt(sv.text) + '</p></div>' +
        '<a class="btn btn--go"' + ext(requestLink(sv.request)) + '>' + icon('chat') + '<span>' + esc(ui('request')) + '</span></a></li>';
    }).join('') + '</ul>';
  }

  /* location */

  function viewLocation() {
    var addr = (APT.location && APT.location.address) || {};
    var line = addr.fr && !isTodo(addr.fr) ? addr.fr : '';
    var showAddr = line || DRAFT;
    return '<section class="address rise"' + d(0) + '>' +
      (showAddr ? '<p class="eyebrow">' + esc(ui('address')) + '</p>' +
      '<p class="address__line" lang="fr" dir="ltr">' + txt(addr.fr) + '</p>' : '') +
      (addr.ar && !isTodo(addr.ar) ? '<p class="address__ar" lang="ar" dir="rtl">' + esc(addr.ar) + '</p>' : '') +
      '<p class="address__note">' + icon('lock') + '<span>' + esc(ui('privateNote')) + '</span></p></section>' +
      '<div class="stack rise"' + d(1) + '>' +
      '<a class="btn btn--go btn--wide"' + ext(aptLink()) + '>' + icon('map') + '<span>' + esc(ui('openMaps')) + '</span></a>' +
      (line ? '<button class="btn btn--wide" type="button" data-copy="' + esc(line) + '">' + icon('copy') + '<span>' + esc(ui('copyAddress')) + '</span></button>' : '') +
      (line || (addr.ar && !isTodo(addr.ar)) ? '<button class="btn btn--wide" type="button" data-taxi>' + icon('car') + '<span>' + esc(ui('showDriver')) + '</span></button>' : '') + '</div>';
  }

  function showTaxi() {
    var addr = (APT.location && APT.location.address) || {};
    var el = document.createElement('div');
    el.className = 'taxi';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', ui('showDriver'));
    el.tabIndex = -1;
    el.innerHTML = '<p class="taxi__hint">' + esc(ui('driverHint')) + '</p>' +
      (addr.ar && !isTodo(addr.ar) ? '<p class="taxi__ar" lang="ar" dir="rtl">' + esc(addr.ar) + '</p>' : '') +
      '<p class="taxi__fr" lang="fr" dir="ltr">' + txt(addr.fr) + '</p>' +
      '<p class="taxi__close">' + esc(ui('tapToClose')) + '</p>';
    el.addEventListener('click', function () { closeTaxi(el); });
    document.body.appendChild(el);
    el.getBoundingClientRect();
    el.classList.add('is-on');
    el.focus();
  }

  function closeTaxi(el) {
    el.classList.remove('is-on');
    window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
  }

  /* favourites */

  // Every photo shown here, with its author, its licence and a link to its page
  function viewCredits() {
    var ids = (STAY ? [STAY.city] : CITIES.map(function (c) { return c.id; })).concat('morocco');
    var rows = [], seen = {};
    ids.forEach(function (cid) {
      var all = photosOf(cid);
      Object.keys(all).forEach(function (k) {
        var p = all[k];
        // Two places can share one photo: it is listed once
        if (k.charAt(0) === '_' || !p.src || !p.by || seen[p.src]) return;
        seen[p.src] = true;
        var name = '<bdi>' + esc(p.title || k) + '</bdi>';
        rows.push('<li class="credit-row"><span class="credit-row__img">' + photoImg(p, '112px') + '</span><span class="credit-row__text">' +
          (p.url ? '<a class="credit-row__title"' + ext(p.url) + '>' + name + '</a>' : '<span class="credit-row__title">' + name + '</span>') +
          '<span class="credit-row__by">' + esc(ui(p.illustr ? 'illustration' : 'photo')) + ' · <bdi>' + esc(p.by) + '</bdi> · ' +
          (p.licUrl ? '<a' + ext(p.licUrl) + '>' + esc(p.lic) + '</a>' : esc(p.lic || '')) + '</span></span></li>');
      });
    });
    var clips = ((state.film && state.film.credits) || []).map(function (c) {
      var name = '<bdi>' + esc(c.title || c.file || '') + '</bdi>';
      return '<li class="credit-row"><span class="credit-row__img credit-row__img--film">' + icon('play') + '</span><span class="credit-row__text">' +
        (c.url ? '<a class="credit-row__title"' + ext(c.url) + '>' + name + '</a>' : '<span class="credit-row__title">' + name + '</span>') +
        '<span class="credit-row__by">' + esc(ui(c.photo ? 'photo' : 'filmBy')) + ' · <bdi>' + esc(c.by || '') + '</bdi> · ' +
        (c.licUrl ? '<a' + ext(c.licUrl) + '>' + esc(c.lic) + '</a>' : esc(c.lic || '')) + '</span></span></li>';
    });
    if (!rows.length && !clips.length) return '<div class="empty rise"' + d(0) + '><span class="icircle">' + icon('sparkle') + '</span><p>' + esc(ui('photoCreditsNone')) + '</p></div>';
    return '<p class="credits__note rise"' + d(0) + '>' + esc(ui(clips.length ? 'photoCreditsNoteFilm' : 'photoCreditsNote')) + '</p>' +
      (clips.length ? '<h2 class="s-sub rise"' + d(1) + '>' + esc(ui('filmCredits')) + '</h2><ul class="credits rise"' + d(1) + '>' + clips.join('') + '</ul>' +
        (rows.length ? '<h2 class="s-sub rise"' + d(2) + '>' + esc(ui('photoCredits')) + '</h2>' : '') : '') +
      (rows.length ? '<ul class="credits rise"' + d(2) + '>' + rows.join('') + '</ul>' : '');
  }

  function viewFavorites() {
    var items = state.favs.map(function (id) { return INDEX[id]; }).filter(Boolean);
    if (!items.length) {
      var first = SECTIONS.visit ? 'visit' : (CITY.group && CITY.group.items || []).filter(function (id) { return SECTIONS[id] && SECTIONS[id].type === 'places'; })[0];
      return '<div class="empty rise"' + d(0) + '><span class="icircle">' + icon('heart') + '</span><p>' + esc(ui('favsEmpty')) + '</p>' +
        (first ? '<a class="btn btn--go" href="#' + first + '" data-open="' + first + '">' + esc(first === 'visit' ? ui('favsBrowse') : tr(SECTIONS[first].title)) + '</a>' : '') + '</div>';
    }
    return '<div class="cards">' + items.map(function (x, i) { return card(x.item, x.sid, i); }).join('') + '</div>';
  }

  var VIEWS = {
    places: viewPlaces, routes: viewRoutes, info: viewInfo, help: viewHelp,
    wifi: viewWifi, stay: viewStay, house: viewHouse, nearby: viewNearby, services: viewServices
  };

  /* ---------- detail sheet ---------- */

  function detailFor(key) {
    var dot = key.indexOf('.');
    var sid = key.slice(0, dot), iid = key.slice(dot + 1);
    if (sid === 'favorites') {
      var f = INDEX[iid];
      return f ? { html: detailPlace(f.item, f.sid), tint: SECTIONS[f.sid].tint } : null;
    }
    var s = SECTIONS[sid];
    if (!s) return null;
    if (s.type === 'places') {
      var it = (s.items || []).filter(function (x) { return x.id === iid; })[0];
      return it && it.kind !== 'placeholder' ? { html: detailPlace(it, sid), tint: s.tint } : null;
    }
    if (s.type === 'routes') {
      var r = (s.items || []).filter(function (x) { return x.id === iid; })[0];
      return r ? { html: detailRoute(r), tint: s.tint } : null;
    }
    if ((s.type === 'info' || s.type === 'help') && /^b\d+$/.test(iid)) {
      var b = s.blocks[+iid.slice(1)];
      return b ? { html: detailBlock(b, s), tint: s.tint } : null;
    }
    return null;
  }

  function renderModal(key) {
    var det = detailFor(key);
    if (!det) return false;
    els.panel.style.setProperty('--tint', det.tint || '#1D4C49');
    els.modalBody.innerHTML = det.html;
    return true;
  }

  function openModal(key) {
    if (state.modal === key) return;
    if (!renderModal(key)) return;
    var wasOpen = !!state.modal;
    state.modal = key;
    els.panel.scrollTop = 0;
    if (!wasOpen) {
      els.modal.hidden = false;
      document.body.classList.add('has-modal');
      els.modal.getBoundingClientRect();
      els.modal.classList.add('is-open');
    }
    window.setTimeout(function () { try { els.panel.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 60);
  }

  function closeModal() {
    if (!state.modal) return;
    state.modal = null;
    els.modal.classList.remove('is-open');
    els.modal.style.removeProperty('--drag');
    document.body.classList.remove('has-modal');
    window.setTimeout(function () { if (!state.modal) { els.modal.hidden = true; els.modalBody.innerHTML = ''; } }, 550);
  }

  function modalBack() {
    var own = ownStep();
    if (own && own.to.indexOf('.') > -1) { window.history.back(); return; }
    var sid = state.current;
    closeModal();
    try { window.history.replaceState(null, '', window.location.pathname + window.location.search + (sid ? '#' + sid : '')); } catch (e) { /* sandboxed frame */ }
  }

  // Swipe the detail sheet down to close it
  (function () {
    var startY = null, dy = 0;
    els.panel.addEventListener('touchstart', function (e) {
      if (els.panel.scrollTop > 0 || e.touches.length !== 1) { startY = null; return; }
      startY = e.touches[0].clientY; dy = 0;
    }, { passive: true });
    els.panel.addEventListener('touchmove', function (e) {
      if (startY == null) return;
      dy = Math.max(0, e.touches[0].clientY - startY);
      if (dy > 0) {
        els.modal.classList.add('is-dragging');
        els.panel.style.setProperty('--drag', dy + 'px');
      }
    }, { passive: true });
    els.panel.addEventListener('touchend', function () {
      if (startY == null) return;
      els.modal.classList.remove('is-dragging');
      els.panel.style.removeProperty('--drag');
      if (dy > 110) modalBack();
      startY = null; dy = 0;
    });
  })();

  /* ---------- actions ---------- */

  function applyFilter(id) {
    els.body.querySelectorAll('[data-chip]').forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-chip') === id)); });
    els.body.querySelectorAll('.cards > .vcard').forEach(function (el) {
      var tags = (el.getAttribute('data-tags') || '').split(' ');
      el.hidden = id !== 'all' && tags.indexOf(id) === -1;
    });
  }

  function toggleFav(id) {
    var at = state.favs.indexOf(id);
    var on = at === -1;
    if (on) state.favs.push(id); else state.favs.splice(at, 1);
    save(favKey(), JSON.stringify(state.favs));
    document.querySelectorAll('[data-fav="' + id + '"]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', ui(on ? 'removeFav' : 'addFav'));
    });
    updateFavCount();
    toast(ui(on ? 'favAdded' : 'favRemoved'));
  }

  // Departure ticks belong to one stay: they are forgotten after a week
  function checkoutKey() { return 'atlas.checkout.' + STAY.id; }
  function toggleCheck(i) {
    var at = state.done.indexOf(i);
    if (at === -1) state.done.push(i); else state.done.splice(at, 1);
    save(checkoutKey(), JSON.stringify({ t: Date.now(), done: state.done }));
    renderSheet(state.current, true);
  }

  function copyText(text) {
    function done() { toast(ui('copied')); }
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { if (fallback()) done(); else toast(text); });
    } else if (fallback()) done();
    else toast(text);
  }

  var toastTimer = 0, toastToken = 0;
  function toast(message) {
    var token = ++toastToken;
    els.toast.textContent = message;
    els.toast.hidden = false;
    els.toast.getBoundingClientRect();
    els.toast.classList.add('is-on');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      els.toast.classList.remove('is-on');
      window.setTimeout(function () { if (token === toastToken) els.toast.hidden = true; }, 400);
    }, 2600);
  }

  /* ---------- events ---------- */

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-open],[data-locate],[data-open-detail],[data-modal-close],[data-lang],[data-fav],[data-chip],[data-copy],[data-taxi],[data-tab],[data-check],[data-howto]');
    if (!t) return;
    if (t.hasAttribute('data-open')) { stepIn(t.getAttribute('href')); return; }
    if (t.hasAttribute('data-locate')) { locate(); return; }
    if (t.hasAttribute('data-open-detail')) { stepIn(t.getAttribute('href')); return; }
    if (t.hasAttribute('data-modal-close')) { modalBack(); return; }
    if (t.hasAttribute('data-lang')) setLang(t.getAttribute('data-lang'));
    else if (t.hasAttribute('data-fav')) { e.preventDefault(); toggleFav(t.getAttribute('data-fav')); }
    else if (t.hasAttribute('data-chip')) applyFilter(t.getAttribute('data-chip'));
    else if (t.hasAttribute('data-copy')) copyText(t.getAttribute('data-copy'));
    else if (t.hasAttribute('data-taxi')) showTaxi();
    else if (t.hasAttribute('data-tab')) { state.stayTab = t.getAttribute('data-tab'); renderSheet(state.current, true); }
    else if (t.hasAttribute('data-check')) toggleCheck(+t.getAttribute('data-check'));
    else if (t.hasAttribute('data-howto')) {
      var i = +t.getAttribute('data-howto');
      state.howto = state.howto === i ? -1 : i;
      renderSheet(state.current, true);
    }
  });

  els.back.addEventListener('click', goBack);
  if (els.locate) els.locate.addEventListener('click', locate);

  byId('theme-btn').addEventListener('click', function () {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  // If the guest has not picked a language, follow a change of the phone's language
  window.addEventListener('languagechange', function () {
    if (!load('atlas.lang')) {
      var l = deviceLang();
      if (l !== state.lang) { state.lang = l; applyLang(); }
    }
  });

  els.cue.addEventListener('click', function (e) {
    e.preventDefault();
    els.menu.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  });

  els.scroll.addEventListener('scroll', function () {
    var bandEl = els.band.firstElementChild;
    var limit = bandEl ? bandEl.offsetHeight - els.bar.offsetHeight - 8 : 8;
    els.bar.classList.toggle('is-stuck', els.scroll.scrollTop > Math.max(8, limit));
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var taxi = document.querySelector('.taxi');
    if (taxi) closeTaxi(taxi);
    else if (state.modal) modalBack();
    else if (state.current) goBack();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pauseVideo();
    else if (!state.current) resumeVideo();
  });

  window.addEventListener('hashchange', route);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- start ---------- */

  function setMode(mode) {
    MODE = mode;
    root.classList.toggle('mode-home', mode === 'home');
    root.classList.toggle('mode-stay', mode === 'stay');
  }

  function isStandalone() {
    try { return window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches; } catch (e) { return false; }
  }

  function loadScripts(list, done) {
    var left = list.length, ok = true;
    list.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = function () { if (--left === 0) done(ok); };
      s.onerror = function () { ok = false; if (--left === 0) done(ok); };
      document.head.appendChild(s);
    });
  }

  function showPhotoCredit() {
    var el = byId('photo-credit');
    if (!el) return;
    var ids = STAY ? [STAY.city] : CITIES.map(function (c) { return c.id; });
    el.hidden = !ids.some(function (cid) {
      var all = photosOf(cid);
      return Object.keys(all).some(function (k) { return k.charAt(0) !== '_' && all[k].src && all[k].by; });
    });
  }

  function finish() {
    showPhotoCredit();
    applyLang();
    watch(document);
    onScroll();
    route();
    window.setInterval(updateClock, 20000);
  }

  function bootHome(message) {
    setMode('home');
    document.title = BRAND.name || document.title;
    SECTIONS = {};
    CITIES.forEach(function (c) { SPECIAL[c.id] = { type: 'city', icon: CITY_ICONS[c.id] || 'pin', tint: c.tint }; });
    // An icon on the home screen of the phone reopens the last place directly
    var last = loadJSON('atlas.stay', null);
    if (!message && isStandalone() && !('choose' in params) && last && stayById(last.id) && Date.now() - (last.t || 0) < 30 * 86400000) {
      window.location.replace(stayHref(stayById(last.id)) + window.location.hash);
      return;
    }
    initVideo(BRAND.film, 'atlantic');
    finish();
    if (message) toast(message);
  }

  function bootStay(st) {
    setMode('stay');
    STAY = st;
    CITY = C.cities[st.city] || {};
    var raw = C.stays[st.id] || {};
    var def = BRAND.defaults || {};
    // The place's file wins; anything it leaves out comes from the brand defaults
    APT = {};
    Object.keys(def).forEach(function (k) { APT[k] = def[k]; });
    Object.keys(raw).forEach(function (k) { if (raw[k] != null) APT[k] = raw[k]; });
    ['checkin', 'checkout'].forEach(function (k) {
      APT[k] = { time: (raw[k] && raw[k].time) || def[k].time, steps: (raw[k] && raw[k].steps) || def[k].steps };
    });
    APT.name = st.name;

    NEAR = {};
    ((CITY.areas || {})[st.area] || { near: [] }).near.forEach(function (id) { NEAR[id] = true; });

    // Sections: the place's own pages, the Moroccan help page, then the city's,
    // without the items meant for other neighbourhoods
    SECTIONS = {};
    var own = BRAND.staySections || {};
    Object.keys(own).forEach(function (k) { SECTIONS[k] = own[k]; });
    var country = (C.country && C.country.sections) || {};
    Object.keys(country).forEach(function (k) { SECTIONS[k] = country[k]; });
    var cs = CITY.sections || {};
    Object.keys(cs).forEach(function (k) {
      var s = cs[k], copy = {};
      Object.keys(s).forEach(function (f) { copy[f] = s[f]; });
      if (s.items) {
        // Items meant for this neighbourhood only come first (its own beach, its walk from the door)
        var mine = function (it) { return it.areas && it.areas.length === 1 && it.kind !== 'placeholder'; };
        var kept = s.items.filter(function (it) { return !it.areas || it.areas.indexOf(st.area) > -1; });
        copy.items = kept.filter(mine).concat(kept.filter(function (it) { return !mine(it); }));
      }
      if (s.blocks) {
        var kb = s.blocks.filter(function (b) { return !b.areas || b.areas.indexOf(st.area) > -1; });
        copy.blocks = kb.filter(function (b) { return b.areas; }).concat(kb.filter(function (b) { return !b.areas; }));
      }
      SECTIONS[k] = copy;
    });
    Object.keys(SECTIONS).forEach(function (sid) {
      if (SECTIONS[sid].type !== 'places') return;
      (SECTIONS[sid].items || []).forEach(function (it) { if (it.id && !it.kind) INDEX[it.id] = { item: it, sid: sid }; });
    });

    GROUPS = [
      { id: 'home', kicker: areaName(st) || cityName(st.city), title: { fr: '', en: '' }, items: (raw.stayGroup || BRAND.stayGroup || []).slice() },
      { id: 'city', kicker: (cityById(st.city) || {}).name, title: (CITY.group || {}).title, items: (CITY.group || {}).items || [], wide: (CITY.group || {}).wide || [] }
    ];
    GROUPS[0].title = st.kind === 'studio' ?
      { fr: UI.fr.yourStudio, en: UI.en.yourStudio, ar: UI.ar.yourStudio, es: UI.es.yourStudio } :
      { fr: UI.fr.yourApartment, en: UI.en.yourApartment, ar: UI.ar.yourApartment, es: UI.es.yourApartment };

    // Favourites per city (the first version kept Casablanca's under casa.favs)
    var favs = loadJSON(favKey(), null);
    if (favs == null && st.city === 'casablanca') favs = loadJSON('casa.favs', null);
    state.favs = Array.isArray(favs) ? favs : [];
    var co = loadJSON(checkoutKey(), null);
    state.done = co && co.done && Date.now() - (co.t || 0) < 7 * 86400000 ? co.done : [];

    save('atlas.stay', JSON.stringify({ id: st.id, t: Date.now() }));
    document.title = st.name + ' · ' + (BRAND.name || '');

    var film = CITY.film === 'brand' ? BRAND.film : (CITY.film || null);
    initVideo(film, CITY.scene || 'plain');
    finish();
    keepForOffline(st);
    window.setTimeout(function () { warmPhotos(st.city); }, 6000);
  }

  // The place's own files were loaded before the service worker was in charge: ask for them
  // again once it is, so the guide opens without data next time (and from its short link)
  function keepForOffline(st) {
    var sw = navigator.serviceWorker;
    if (!sw) return;
    var files = ['content/cities/' + st.city + '.js', 'content/stays/' + st.id + '.js', st.id + '/', st.id + '/manifest.webmanifest'];
    function go() { files.forEach(function (f) { fetch(f).catch(function () { /* offline: next time */ }); }); }
    if (sw.controller) go(); else sw.addEventListener('controllerchange', go);
  }

  // For later, offline: once the guide works offline (its service worker in charge), store the
  // city's small photos, one after the other, unless the phone saves data or the network is slow
  function warmPhotos(cityId) {
    var net = navigator.connection || {};
    if (net.saveData || /2g/.test(net.effectiveType || '')) return;
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;
    var seen = {}, list = [];
    [photosOf(cityId), photosOf('morocco')].forEach(function (all) {
      Object.keys(all).forEach(function (k) { var p = all[k]; if (p && p.sm && !seen[p.sm]) { seen[p.sm] = true; list.push(p.sm); } });
    });
    (function next(i) {
      if (i >= list.length) return;
      fetch(list[i]).catch(function () { /* offline: try another time */ }).then(function () { window.setTimeout(function () { next(i + 1); }, 200); });
    })(0);
  }

  function start() {
    var id = String(params.stay || '').trim().toLowerCase();
    // Links made before the final names still open the right place
    var moved = id && (BRAND.aliases || {})[id];
    if (moved) { window.location.replace('./?stay=' + moved + window.location.hash); return; }
    if (!id) { bootHome(); return; }
    var st = stayById(id);
    if (!st) { bootHome(ui('stayUnknown')); return; }
    var hello = (UI[state.lang] || UI.en || {}).waHello || '';
    els.wa.href = waLink(hello.replace(/\{host\}/g, host().name || '').replace(/\{stay\}/g, st.name));
    loadScripts(['content/morocco.js', 'content/cities/' + st.city + '.js', 'content/stays/' + st.id + '.js'], function (ok) {
      C = window.CASA || C;
      if (!ok || !C.stays || !C.stays[st.id] || !C.cities || !C.cities[st.city]) { bootHome(ui('stayOffline')); return; }
      bootStay(st);
    });
  }

  start();

  // Offline mode, on the published site (and localhost for testing)
  try {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function () { /* not allowed here */ });
      });
    }
  } catch (e) { /* sandboxed frame */ }

  function ready() { root.classList.add('is-ready'); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ready, ready);
    window.setTimeout(ready, 1200);
  } else {
    ready();
  }
})();
