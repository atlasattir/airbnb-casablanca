/*
 * Casa, côté vous — guest guide.
 * Plain JavaScript, no build step: content comes from content/*.js.
 */
(function () {
  'use strict';

  var C = window.CASA || {};
  var APT = C.apartment || {};
  var CITY = C.city || {};
  var SECTIONS = CITY.sections || {};
  var GROUPS = CITY.groups || [];
  var UI = C.ui || {};
  var ICONS = C.icons || {};

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var LANGS = ['fr', 'en', 'ar', 'es'];
  var LOCALES = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-MA', es: 'es-ES' };
  var SPECIAL = {
    location: { icon: 'pin', tint: '#1D4C49' },
    favorites: { icon: 'heart', tint: '#8E6E3A' }
  };
  var ALIASES = { apartment: 'stay' };

  function byId(id) { return document.getElementById(id); }
  var els = {
    stage: byId('stage'),
    video: byId('hero-video'),
    topbar: byId('topbar'),
    clock: byId('clock'),
    sunset: byId('sunset-time'),
    coords: byId('coords'),
    cue: byId('scroll-cue'),
    menu: byId('menu'),
    groups: byId('groups'),
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

  /* ---------- storage: optional, the guide works without it ---------- */

  function load(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ } }
  function loadList(key) {
    try { var v = JSON.parse(load(key) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }

  var state = {
    lang: initialLang(),
    favs: loadList('casa.favs'),
    done: loadList('casa.checkout'),
    current: null,
    modal: null,
    openedHere: false,
    modalHere: false,
    lastFocus: null,
    stayTab: 'in',
    howto: -1
  };

  // The guest's own choice wins; otherwise the phone's main language if the
  // guide has it (fr, en, ar, es, any region), otherwise English.
  function deviceLang() {
    var main = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    var code = String(main).slice(0, 2).toLowerCase();
    return LANGS.indexOf(code) > -1 ? code : 'en';
  }

  function initialLang() {
    var saved = load('casa.lang');
    return saved && LANGS.indexOf(saved) > -1 ? saved : deviceLang();
  }

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
      .replace(/\{host\}/g, (APT.host && APT.host.name) || '')
      .replace(/\{checkin\}/g, (APT.checkin && APT.checkin.time) || '')
      .replace(/\{checkout\}/g, (APT.checkout && APT.checkout.time) || '');
    // French typography: keep « » and ; : ? ! attached to their words
    if (state.lang === 'fr') s = s.replace(/« /g, '« ').replace(/ ([»;:?!])/g, ' $1');
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

  function fmtTime(date) {
    try {
      return new Intl.DateTimeFormat(LOCALES[state.lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Casablanca' }).format(date);
    } catch (e) { return ''; }
  }

  function budgetMarks(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
    return '<span class="budget" role="img" aria-label="' + esc(ui('budget') + ' ' + n + '/3') + '">' + s + '</span>';
  }

  /* ---------- today's sunset over Casablanca (standard solar formulas) ---------- */

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

  function todaysSunset() {
    var loc = APT.location || {};
    return sunsetOn(new Date(), typeof loc.lat === 'number' ? loc.lat : 33.59, typeof loc.lng === 'number' ? loc.lng : -7.62);
  }

  function stopTime(st) {
    if (typeof st.rel !== 'number') return st.time;
    var t = todaysSunset().getTime() + st.rel * 60000;
    var step = 5 * 60000;
    return fmtTime(new Date(Math.round(t / step) * step));
  }

  /* ---------- links ---------- */

  function aptQuery() { return (APT.location && APT.location.mapsQuery) || 'Bourgogne, Casablanca'; }
  function aptLink() { return (APT.location && APT.location.mapsUrl) || mapsSearch(aptQuery()); }
  function mapsSearch(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function mapsDir(q, mode) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q) + (mode ? '&travelmode=' + mode : '');
  }

  function routeUrl(r) {
    var pts = r.stops.filter(function (s) { return s.maps; }).map(function (s) { return s.maps; });
    var origin = r.fromHome ? aptQuery() : pts.shift();
    var dest = pts.pop() || origin;
    var url = 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(origin) + '&destination=' + encodeURIComponent(dest);
    if (pts.length) url += '&waypoints=' + pts.map(encodeURIComponent).join('%7C');
    if (r.mode) url += '&travelmode=' + r.mode;
    return url;
  }

  function waLink(message) {
    var number = String((APT.host && APT.host.whatsapp) || '').replace(/\D/g, '');
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  function requestLink(what) { return waLink(ui('waRequest') + fill(tr(what))); }
  function ext(href) { return ' href="' + esc(href) + '" target="_blank" rel="noopener"'; }

  /* ---------- index of places, for favourites ---------- */

  var INDEX = {};
  Object.keys(SECTIONS).forEach(function (sid) {
    if (SECTIONS[sid].type !== 'places') return;
    (SECTIONS[sid].items || []).forEach(function (it) {
      if (it.id && !it.kind) INDEX[it.id] = { item: it, sid: sid };
    });
  });

  function isFav(id) { return state.favs.indexOf(id) > -1; }

  function favButton(id) {
    var on = isFav(id);
    return '<button class="fav" type="button" data-fav="' + esc(id) + '" aria-pressed="' + on + '" aria-label="' + esc(ui(on ? 'removeFav' : 'addFav')) + '">' + icon('heart') + '</button>';
  }

  /* ---------- home ---------- */

  function tileData(id) {
    if (id === 'wifi') {
      var n = APT.wifi && APT.wifi.network;
      return n && !isTodo(n) ? '<span dir="ltr">' + esc(n) + '</span>' : '';
    }
    if (id === 'stay') return '<span dir="ltr">' + esc(APT.checkin.time) + ' · ' + esc(APT.checkout.time) + '</span>';
    if (id === 'assistance') return '<span dir="ltr">19 · 15 · 177</span>';
    var s = SECTIONS[id];
    if (s.type === 'routes') return esc(s.items.length + ' ' + ui('routesCount'));
    if (id === 'visit') return esc(s.items.length + ' ' + ui('placesCount'));
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
        return '<a class="tile tile--' + g.id + (wide ? ' tile--wide' : '') + rv + '"' + tintStyle(s.tint, i) + ' href="#' + id + '" data-open="' + id + '">' +
          '<span class="tile__icon">' + icon(s.icon) + '</span>' +
          (g.id === 'city' ? '<span class="tile__art" aria-hidden="true">' + icon(s.icon) + '</span>' : '') +
          '<span class="tile__text"><span class="tile__label">' + esc(tr(s.title)) + '</span>' +
          (data ? '<span class="tile__data">' + data + '</span>' : '') + '</span></a>';
      }).join('');
      var host = g.id === 'home' && APT.welcome ?
        '<p class="host-line"><span class="avatar" aria-hidden="true">' + esc((APT.host.name || '?').charAt(0)) + '</span><span>' + txt(APT.welcome) + '</span></p>' : '';
      return '<section class="group group--' + g.id + '" aria-labelledby="group-' + g.id + '">' +
        '<header class="group__head' + rv + '"><p class="eyebrow">' + txt(g.kicker) + '</p>' +
        '<h2 class="group__title" id="group-' + g.id + '">' + txt(g.title) + '</h2>' + host + '</header>' +
        '<nav class="btns btns--' + g.id + '" aria-labelledby="group-' + g.id + '">' + tiles + '</nav></section>';
    }).join('');
    watch(els.groups);
  }

  function applyLang() {
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = ui(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) { el.setAttribute('aria-label', ui(el.getAttribute('data-i18n-label'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === state.lang)); });
    document.querySelectorAll('[data-host]').forEach(function (el) { el.textContent = APT.host.name; });
    els.wa.href = waLink(ui('waHello'));
    updateThemeButton();
    renderGroups();
    updateClock();
    updateFavCount();
    if (state.current) renderSheet(state.current, true);
    if (state.modal) renderModal(state.modal);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1 || lang === state.lang) return;
    state.lang = lang;
    save('casa.lang', lang);
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
    save('casa.theme', theme);
    updateThemeButton();
  }

  var savedTheme = load('casa.theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.setAttribute('data-theme', savedTheme);
  if (darkQuery) {
    var onSystemTheme = function () { updateThemeButton(); };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemTheme);
    else if (darkQuery.addListener) darkQuery.addListener(onSystemTheme);
  }

  function updateClock() {
    els.clock.textContent = fmtTime(new Date());
    if (els.sunset) els.sunset.textContent = fmtTime(todaysSunset());
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
    });
  }

  /* ---------- video ---------- */

  function reducedMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  function playVideo() {
    if (!els.video || reducedMotion()) return;
    var p = els.video.play();
    if (p && p.catch) p.catch(function () { /* autoplay refused: the drawn scene stays */ });
  }
  function pauseVideo() { if (els.video && !els.video.paused) els.video.pause(); }
  function resumeVideo() { if (els.stage.classList.contains('has-video')) playVideo(); }

  function initVideo() {
    var v = els.video, hero = APT.hero || {};
    if (!v) return;
    if (navigator.connection && navigator.connection.saveData) return;
    // With reduced motion, keep the still scene (or the poster) instead of a frozen frame
    if (reducedMotion() && !hero.poster) return;
    var sources = [];
    if (window.innerHeight > window.innerWidth && hero.videoPortrait) sources.push(hero.videoPortrait);
    if (hero.video) sources.push(hero.video);
    if (!sources.length) return;
    if (hero.poster) v.poster = hero.poster;
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
    v.addEventListener('loadeddata', function () {
      if (reducedMotion()) els.stage.classList.add('has-video');
      else if (!state.current) playVideo();
    });
    next();
  }

  /* ---------- sheet ---------- */

  function sectionMeta(id) { return SECTIONS[id] || SPECIAL[id]; }

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

  function goBack() {
    if (state.openedHere) { state.openedHere = false; window.history.back(); return; }
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
    var h = parseHash();
    if (!sectionMeta(h.sid)) {
      closeModal();
      if (state.current) closeSheet();
      return;
    }
    if (state.current !== h.sid) openSheet(h.sid);
    if (h.iid) openModal(h.sid + '.' + h.iid);
    else closeModal();
  }

  function renderSheet(id, keepScroll) {
    var top = els.scroll.scrollTop;
    var meta = sectionMeta(id);
    var title, kicker, html, extra = '';
    if (id === 'location') { title = ui('locationTitle'); kicker = tr(APT.name); html = viewLocation(); }
    else if (id === 'favorites') { title = ui('favsTitle'); kicker = 'Casa, côté vous'; html = viewFavorites(); }
    else {
      title = tr(meta.title);
      kicker = ['wifi', 'stay', 'house', 'nearby', 'services', 'assistance'].indexOf(id) > -1 ? tr(APT.name) : ui('cityKicker');
      var view = VIEWS[meta.type] || viewPlaces;
      html = view(meta, id);
      if (meta.type === 'routes') extra = '<div class="band__meta"><span class="pill">' + icon('sun') + '<span>' + esc(ui('sunsetToday')) + ' ' + esc(fmtTime(todaysSunset())) + '</span></span></div>';
    }
    els.band.innerHTML = '<header class="band"' + tintStyle(meta.tint) + '>' +
      '<span class="band__art" aria-hidden="true">' + icon(meta.icon) + '</span>' +
      '<div class="band__text"><p class="eyebrow">' + esc(kicker) + '</p>' +
      '<h1 class="band__title" id="sheet-title">' + esc(title) + '</h1>' + extra + '</div></header>';
    els.barTitle.textContent = title;
    els.body.style.setProperty('--tint', meta.tint || '#1D4C49');
    els.body.innerHTML = html;
    if (keepScroll) els.scroll.scrollTop = top;
  }

  function subhead(label, i) { return '<h2 class="s-sub rise"' + d(i) + '>' + esc(label) + '</h2>'; }

  /* places */

  function art(it, iconName) {
    return it.image ? '<img src="' + esc(it.image) + '" alt="" loading="lazy">' : icon(it.icon || iconName);
  }

  function chip(id, label, on) {
    return '<button class="chip" type="button" data-chip="' + esc(id) + '" aria-pressed="' + on + '">' + esc(label) + '</button>';
  }

  function card(it, sid, i) {
    var s = SECTIONS[sid];
    var href = '#' + sid + '.' + it.id;
    if (it.kind === 'placeholder') {
      return '<article class="vcard vcard--soon rise"' + tintStyle(s.tint, i) + '><div class="vcard__link">' +
        '<span class="art">' + icon('star') + '</span>' +
        '<span class="vcard__body"><span class="vcard__name">' + txt(it.name) + '</span>' + todoBadge() + '</span></div></article>';
    }
    var badge = it.near ? '<span class="vcard__badge">' + icon('walk') + esc(ui('onFoot')) + '</span>' :
      it.kind === 'request' ? '<span class="vcard__badge">' + icon('chat') + esc(ui('onRequest')) + '</span>' : '';
    return '<article class="vcard' + (it.kind === 'note' ? ' vcard--note' : '') + ' rise" data-tags="' + esc((it.tags || []).join(' ')) + '"' + tintStyle(s.tint, i) + '>' +
      '<a class="vcard__link" href="' + href + '" data-open-detail>' +
        '<span class="art">' + art(it, it.kind === 'note' ? 'bulb' : s.icon) + badge + '</span>' +
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
    if (it.near) p.push('<span class="pill pill--near">' + icon('walk') + '<span>' + esc(ui('nearHome')) + '</span></span>');
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
    if (it.maps) actions += '<a class="btn btn--go"' + ext(mapsDir(it.maps, it.near ? 'walking' : '')) + '>' + icon('nav') + '<span>' + esc(ui('go')) + '</span></a>';
    if (it.request) actions += '<a class="btn btn--go"' + ext(requestLink(it.request)) + '>' + icon('chat') + '<span>' + esc(ui('askHost')) + '</span></a>';
    if (!it.kind) actions += favButton(it.id);
    return '<div class="art d-art">' + art(it, s.icon) + '</div><div class="d-body">' +
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
      return '<article class="rcard rise"' + tintStyle(s.tint, i) + '><a class="rcard__link" href="#' + sid + '.' + r.id + '" data-open-detail>' +
        '<span class="art">' + routeLine(r.stops.length) + '</span>' +
        '<span class="rcard__body"><span class="rcard__title">' + txt(r.title) + '</span>' + routePills(r) + '</span></a></article>';
    }).join('') + '</div>';
  }

  function detailRoute(r) {
    var stops = r.stops.map(function (st) {
      return '<li' + (typeof st.rel === 'number' && st.rel > -30 && st.rel < 0 ? ' class="is-sunset"' : '') + '><time>' + esc(stopTime(st)) + '</time>' +
        '<div class="stop"><h3 class="stop__title">' + txt(st.title) + '</h3>' + (st.text ? '<p class="stop__text">' + txt(st.text) + '</p>' : '') + '</div>' +
        (st.maps ? '<a class="go-mini"' + ext(mapsDir(st.maps, r.mode)) + ' aria-label="' + esc(ui('directions')) + '">' + icon('nav') + '</a>' : '<span></span>') + '</li>';
    }).join('');
    return '<div class="art d-art">' + routeLine(r.stops.length) + '</div><div class="d-body">' +
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
        out += '<section class="hostcard rise"' + tintStyle(s.tint, 0) + '><div class="hostcard__who"><span class="avatar" aria-hidden="true">' + esc((APT.host.name || '?').charAt(0)) + '</span>' +
          '<div><div class="hostcard__name">' + esc(APT.host.name) + '</div><div class="hostcard__role">' + esc(ui('yourHost')) + '</div></div></div>' +
          '<a class="btn btn--wide"' + ext(waLink(ui('waHello'))) + '>' + icon('chat') + '<span>WhatsApp</span></a></section>';
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

  /* the apartment pages */

  function copyPill(value) {
    return '<button class="copy-pill" type="button" data-copy="' + esc(value) + '">' + icon('copy') + '<span>' + esc(ui('copy')) + '</span></button>';
  }

  function viewWifi() {
    var w = APT.wifi || {};
    var net = w.network;
    return '<section class="wifi-card rise"' + d(0) + '>' +
      '<div class="wifi-row"><div class="wifi-row__text"><span class="eyebrow">' + esc(ui('network')) + '</span>' +
        '<span class="wifi-row__value" dir="ltr">' + txt(net) + '</span></div>' + (net && !isTodo(net) ? copyPill(net) : '') + '</div>' +
      '<div class="wifi-row"><div class="wifi-row__text"><span class="eyebrow">' + esc(ui('password')) + '</span>' +
        (w.password ? '<span class="wifi-row__value" dir="ltr">' + esc(w.password) + '</span>' :
          '<span class="wifi-row__value is-muted">' + icon('card') + '<span>' + esc(ui('wifiOnCard')) + '</span></span>') +
        '</div>' + (w.password ? copyPill(w.password) : '') + '</div></section>';
  }

  function viewStay() {
    var inTab = state.stayTab === 'in';
    var list = inTab ? APT.checkin.steps : APT.checkout.steps;
    var steps = list.map(function (st, i) {
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
    var hs = APT.howto || [];
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
    return '<div class="itiles">' + (APT.nearby || []).map(function (n, i) {
      var inner = '<span class="icircle">' + icon(n.icon || 'pin') + '</span><span><span class="itile__title">' + txt(n.label) + '</span>' +
        '<span class="itile__key">' + txt(n.name) + '</span></span>' +
        (n.walk ? '<span class="near-tile__walk">' + icon('walk') + '<span>' + n.walk + ' min</span></span>' : '');
      return n.maps ? '<a class="itile near-tile rise"' + d(i) + ext(mapsDir(n.maps, 'walking')) + '>' + inner + '</a>' :
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
    return '<section class="address rise"' + d(0) + '>' +
      '<p class="eyebrow">' + esc(ui('address')) + '</p>' +
      '<p class="address__line" lang="fr" dir="ltr">' + txt(addr.fr) + '</p>' +
      (addr.ar && !isTodo(addr.ar) ? '<p class="address__ar" lang="ar" dir="rtl">' + esc(addr.ar) + '</p>' : '') +
      '<p class="address__note">' + icon('lock') + '<span>' + esc(ui('privateNote')) + '</span></p></section>' +
      '<div class="stack rise"' + d(1) + '>' +
      '<a class="btn btn--go btn--wide"' + ext(aptLink()) + '>' + icon('map') + '<span>' + esc(ui('openMaps')) + '</span></a>' +
      (line ? '<button class="btn btn--wide" type="button" data-copy="' + esc(line) + '">' + icon('copy') + '<span>' + esc(ui('copyAddress')) + '</span></button>' : '') +
      '<button class="btn btn--wide" type="button" data-taxi>' + icon('car') + '<span>' + esc(ui('showDriver')) + '</span></button></div>';
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

  function viewFavorites() {
    var items = state.favs.map(function (id) { return INDEX[id]; }).filter(Boolean);
    if (!items.length) {
      return '<div class="empty rise"' + d(0) + '><span class="icircle">' + icon('heart') + '</span><p>' + esc(ui('favsEmpty')) + '</p>' +
        '<a class="btn btn--go" href="#visit" data-open="visit">' + esc(ui('favsBrowse')) + '</a></div>';
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
    if (state.modalHere) { state.modalHere = false; window.history.back(); return; }
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
    save('casa.favs', JSON.stringify(state.favs));
    document.querySelectorAll('[data-fav="' + id + '"]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', ui(on ? 'removeFav' : 'addFav'));
    });
    updateFavCount();
    toast(ui(on ? 'favAdded' : 'favRemoved'));
  }

  function toggleCheck(i) {
    var at = state.done.indexOf(i);
    if (at === -1) state.done.push(i); else state.done.splice(at, 1);
    save('casa.checkout', JSON.stringify(state.done));
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
    }, 1800);
  }

  /* ---------- events ---------- */

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-open],[data-open-detail],[data-modal-close],[data-lang],[data-fav],[data-chip],[data-copy],[data-taxi],[data-tab],[data-check],[data-howto]');
    if (!t) return;
    if (t.hasAttribute('data-open')) { state.openedHere = true; return; }
    if (t.hasAttribute('data-open-detail')) { state.modalHere = true; return; }
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

  byId('theme-btn').addEventListener('click', function () {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  // If the guest has not picked a language, follow a change of the phone's language
  window.addEventListener('languagechange', function () {
    if (!load('casa.lang')) {
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

  if (APT.location && typeof APT.location.lat === 'number') {
    els.coords.textContent = fmtCoord(APT.location.lat, 'N', 'S') + ' · ' + fmtCoord(APT.location.lng, 'E', 'W');
  }
  applyLang();
  watch(document);
  onScroll();
  initVideo();
  route();
  window.setInterval(updateClock, 20000);

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
