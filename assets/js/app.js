/*
 * Casa, côté vous — guest guide.
 * Plain JavaScript, no build step: content comes from content/*.js.
 */
(function () {
  'use strict';

  var C = window.CASA || {};
  var APT = C.apartment || {};
  var SECTIONS = (C.city && C.city.sections) || {};
  var UI = C.ui || {};
  var ICONS = C.icons || {};

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var LANGS = ['fr', 'en', 'ar', 'es'];
  var LOCALES = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-MA', es: 'es-ES' };
  var MENU = ['apartment', 'visit', 'restaurants', 'cafes', 'nightlife', 'shopping', 'beaches', 'family', 'itineraries', 'transport', 'experiences', 'assistance'];

  function byId(id) { return document.getElementById(id); }
  var els = {
    stage: byId('stage'),
    video: byId('hero-video'),
    topbar: byId('topbar'),
    clock: byId('clock'),
    coords: byId('coords'),
    cue: byId('scroll-cue'),
    menu: byId('menu'),
    tiles: byId('tiles'),
    sheet: byId('sheet'),
    scroll: byId('sheet-scroll'),
    bar: byId('sheet-bar'),
    barTitle: byId('sheet-bar-title'),
    back: byId('sheet-back'),
    body: byId('sheet-body'),
    wa: byId('dock-wa'),
    favCount: byId('fav-count'),
    toast: byId('toast')
  };

  /* ---------- storage: optional, the guide works without it ---------- */

  function load(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ } }

  var state = {
    lang: initialLang(),
    favs: initialFavs(),
    current: null,
    openedHere: false,
    lastFocus: null
  };

  function initialLang() {
    var saved = load('casa.lang');
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) > -1) return code;
    }
    return 'en';
  }

  function initialFavs() {
    try {
      var v = JSON.parse(load('casa.favs') || '[]');
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
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
    if (state.lang === 'fr') s = s.replace(/« /g, '«\u00a0').replace(/ ([»;:?!])/g, '\u00a0$1');
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
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
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
    var a = Math.abs(v), d = Math.floor(a), m = Math.round((a - d) * 60);
    if (m === 60) { d += 1; m = 0; }
    return d + '°' + (m < 10 ? '0' : '') + m + '′ ' + (v >= 0 ? pos : neg);
  }

  function budgetMarks(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
    return '<span class="budget" role="img" aria-label="' + esc(ui('budget') + ' ' + n + '/3') + '">' + s + '</span>';
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

  /* ---------- favourites index ---------- */

  var INDEX = {};
  Object.keys(SECTIONS).forEach(function (sid) {
    (SECTIONS[sid].items || []).forEach(function (it) {
      if (it.id && !it.kind && !it.stops) INDEX[it.id] = it;
    });
  });

  function isFav(id) { return state.favs.indexOf(id) > -1; }

  function favButton(id) {
    var on = isFav(id);
    return '<button class="fav" type="button" data-fav="' + esc(id) + '" aria-pressed="' + on + '" aria-label="' + esc(ui(on ? 'removeFav' : 'addFav')) + '">' + icon('heart') + '</button>';
  }

  /* ---------- home ---------- */

  function sectionSub(id) {
    var s = SECTIONS[id];
    if (s.sub) return tr(s.sub);
    var n = (s.items || []).filter(function (it) { return it.kind !== 'note' && it.kind !== 'placeholder'; }).length;
    return n + ' ' + ui(s.type === 'routes' ? 'routesCount' : 'placesCount');
  }

  function renderTiles() {
    var seen = !!els.tiles.querySelector('.reveal.is-in');
    els.tiles.innerHTML = MENU.filter(function (id) { return SECTIONS[id]; }).map(function (id, i) {
      var s = SECTIONS[id];
      return '<a class="tile reveal' + (seen ? ' is-in' : '') + '" style="--i:' + i + '" href="#' + id + '" data-open="' + id + '">' +
        '<span class="tile__icon">' + icon(s.icon) + '</span>' +
        '<span class="tile__go">' + icon('go', 'flip-rtl') + '</span>' +
        '<span class="tile__text"><span class="tile__label">' + esc(tr(s.title)) + '</span>' +
        '<span class="tile__sub">' + esc(sectionSub(id)) + '</span></span></a>';
    }).join('');
    watch(els.tiles);
  }

  function applyLang() {
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = ui(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) { el.setAttribute('aria-label', ui(el.getAttribute('data-i18n-label'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === state.lang)); });
    document.querySelectorAll('[data-host]').forEach(function (el) { el.textContent = APT.host.name; });
    els.wa.href = waLink(ui('waHello'));
    renderTiles();
    updateClock();
    updateFavCount();
    if (state.current) renderSheet(state.current, true);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1 || lang === state.lang) return;
    state.lang = lang;
    save('casa.lang', lang);
    applyLang();
  }

  function updateClock() {
    try {
      els.clock.textContent = new Intl.DateTimeFormat(LOCALES[state.lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Casablanca' }).format(new Date());
    } catch (e) {
      els.clock.textContent = '';
    }
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
    if (p && p.catch) p.catch(function () { /* autoplay refused: the still frame stays */ });
  }
  function pauseVideo() { if (els.video && !els.video.paused) els.video.pause(); }
  function resumeVideo() { if (els.stage.classList.contains('has-video')) playVideo(); }

  function initVideo() {
    var v = els.video, hero = APT.hero || {};
    if (!v) return;
    if (navigator.connection && navigator.connection.saveData) return;
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
    v.addEventListener('loadeddata', function () {
      els.stage.classList.add('has-video');
      if (!state.current) playVideo();
    });
    next();
  }

  /* ---------- sheet ---------- */

  function openSheet(id) {
    var wasOpen = !!state.current;
    state.current = id;
    renderSheet(id);
    els.scroll.scrollTop = 0;
    els.bar.classList.remove('is-stuck', 'show-title');
    if (!wasOpen) {
      state.lastFocus = document.activeElement;
      els.sheet.hidden = false;
      document.body.classList.add('is-locked');
      els.sheet.getBoundingClientRect();
      els.sheet.classList.add('is-open');
      pauseVideo();
    }
    window.setTimeout(function () { try { els.back.focus({ preventScroll: true }); } catch (e) { els.back.focus(); } }, 60);
  }

  function closeSheet() {
    if (!state.current) return;
    state.current = null;
    els.sheet.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    window.setTimeout(function () { if (!state.current) { els.sheet.hidden = true; els.body.innerHTML = ''; } }, 700);
    resumeVideo();
    if (state.lastFocus && state.lastFocus.focus) {
      try { state.lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }

  function goBack() {
    if (state.openedHere) { state.openedHere = false; window.history.back(); return; }
    closeSheet();
    try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) { /* sandboxed frame */ }
  }

  function route() {
    var id = (window.location.hash || '').replace(/^#/, '');
    if (SECTIONS[id] || id === 'location' || id === 'favorites') openSheet(id);
    else if (state.current) closeSheet();
  }

  function renderSheet(id, keepScroll) {
    var top = els.scroll.scrollTop;
    var html, title;
    if (id === 'location') { html = viewLocation(); title = ui('locationTitle'); }
    else if (id === 'favorites') { html = viewFavorites(); title = ui('favsTitle'); }
    else {
      var s = SECTIONS[id];
      title = tr(s.title);
      html = s.type === 'apartment' ? viewApartment(s) : s.type === 'routes' ? viewRoutes(s) : s.type === 'info' ? viewInfo(s) : viewPlaces(s);
    }
    els.barTitle.textContent = title;
    els.body.innerHTML = html;
    if (keepScroll) els.scroll.scrollTop = top;
  }

  function head(iconName, title, lede, kicker) {
    return '<header class="s-head rise" style="--i:0">' +
      '<span class="s-head__icon">' + icon(iconName) + '</span>' +
      '<p class="eyebrow">' + esc(kicker) + '</p>' +
      '<h1 class="s-title" id="sheet-title">' + esc(title) + '</h1>' +
      (lede ? '<p class="s-lede">' + lede + '</p>' : '') +
      '</header>';
  }

  function sectionHead(s, kicker) { return head(s.icon, tr(s.title), s.intro ? txt(s.intro) : '', kicker || ui('cityKicker')); }

  function subhead(label, i) { return '<h2 class="s-sub rise" style="--i:' + i + '">' + esc(label) + '</h2>'; }

  function d(i) { return ' style="--i:' + Math.min(i, 9) + '"'; }

  /* places */

  function viewPlaces(s) {
    var out = sectionHead(s);
    if (s.filters && s.filters.length) {
      out += '<div class="chips rise" style="--i:1" role="group" aria-label="' + esc(ui('filter')) + '">' +
        chip('all', ui('all'), true) +
        s.filters.map(function (f) { return chip(f.id, tr(f.label), false); }).join('') + '</div>';
    }
    out += '<ol class="list">' + s.items.map(function (it, i) { return card(it, i + 2); }).join('') + '</ol>';
    return out;
  }

  function chip(id, label, on) {
    return '<button class="chip" type="button" data-chip="' + esc(id) + '" aria-pressed="' + on + '">' + esc(label) + '</button>';
  }

  function card(it, i) {
    if (it.kind === 'note') return noteCard(it, i);
    if (it.kind === 'placeholder') {
      return '<li class="slot rise"' + d(i) + '>' +
        '<span class="slot__icon">' + icon('star') + '</span>' +
        '<div class="slot__text"><h3 class="slot__title">' + txt(it.name) + '</h3><p>' + txt(it.desc) + '</p>' + todoBadge() + '</div></li>';
    }

    var facts = [];
    if (it.duration) facts.push('<li>' + icon('clock') + '<span>' + esc(fmtDuration(it.duration)) + '</span></li>');
    var price = fmtPrice(it);
    if (price) facts.push('<li>' + icon('coins') + '<span>' + esc(price) + '</span></li>');
    if (it.budget) facts.push('<li>' + icon('coins') + budgetMarks(it.budget) + '</li>');
    if (it.near) facts.push('<li class="is-near">' + icon('walk') + '<span>' + esc(ui('nearHome')) + '</span></li>');

    var actions = '';
    if (it.maps) actions += '<a class="btn"' + ext(mapsDir(it.maps, it.near ? 'walking' : '')) + '>' + icon('nav') + '<span>' + esc(ui('directions')) + '</span></a>';
    if (it.request) actions += '<a class="btn btn--solid"' + ext(requestLink(it.request)) + '>' + icon('chat') + '<span>' + esc(ui('askHost')) + '</span></a>';

    return '<li class="place rise" data-tags="' + esc((it.tags || []).join(' ')) + '"' + d(i) + '>' +
      '<div class="place__top"><div class="place__heading">' +
        (it.area ? '<p class="place__meta">' + txt(it.area) + '</p>' : '') +
        '<h3 class="place__name">' + txt(it.name) + '</h3></div>' +
        (it.kind === 'request' ? '' : favButton(it.id)) +
      '</div>' +
      (it.desc ? '<p class="place__desc">' + txt(it.desc) + '</p>' : '') +
      (it.tip ? '<p class="place__tip"><b>' + esc(ui('goodToKnow')) + '</b><span>' + txt(it.tip) + '</span></p>' : '') +
      (facts.length ? '<ul class="facts">' + facts.join('') + '</ul>' : '') +
      (actions ? '<div class="actions">' + actions + '</div>' : '') +
      '</li>';
  }

  function noteCard(it, i) {
    var list = (it.list || []).map(function (l) {
      return '<li>' + (l.term ? '<b>' + esc(tr(l.term)) + '</b>' : '') + '<span>' + txt(l.text) + '</span></li>';
    }).join('');
    return '<li class="note rise"' + d(i) + '>' +
      '<p class="eyebrow">' + esc(ui('goodToKnow')) + '</p>' +
      '<h3 class="note__title">' + txt(it.name) + '</h3>' +
      (it.desc ? '<p class="note__desc">' + txt(it.desc) + '</p>' : '') +
      (list ? '<ul class="note__list' + (it.list[0].term ? ' has-terms' : '') + '">' + list + '</ul>' : '') +
      '</li>';
  }

  /* routes */

  function viewRoutes(s) {
    var out = sectionHead(s);
    out += s.items.map(function (r, i) {
      var stops = r.stops.map(function (st) {
        return '<li><time>' + esc(st.time) + '</time><div class="stop">' +
          '<h4 class="stop__title">' + txt(st.title) + '</h4>' +
          (st.text ? '<p class="stop__text">' + txt(st.text) + '</p>' : '') +
          (st.maps ? '<a class="link"' + ext(mapsDir(st.maps, r.mode)) + '>' + icon('nav') + '<span>' + esc(ui('directions')) + '</span></a>' : '') +
          '</div></li>';
      }).join('');
      return '<details class="route rise"' + d(i + 1) + (i === 0 ? ' open' : '') + '>' +
        '<summary><span class="route__meta">' + txt(r.duration) + ' · ' + r.stops.length + ' ' + esc(ui('stepsCount')) + '</span>' +
        '<span class="route__title">' + txt(r.title) + '</span>' +
        '<span class="route__chev">' + icon('chevron') + '</span></summary>' +
        '<div class="route__body">' +
          (r.intro ? '<p class="route__intro">' + txt(r.intro) + '</p>' : '') +
          '<ol class="timeline">' + stops + '</ol>' +
          '<p class="route__note">' + esc(ui('approxTimes')) + '</p>' +
          '<a class="btn btn--solid"' + ext(routeUrl(r)) + '>' + icon('map') + '<span>' + esc(ui('openRoute')) + '</span></a>' +
        '</div></details>';
    }).join('');
    return out;
  }

  /* practical info */

  function rows(list) {
    return '<ul class="rows">' + list.map(function (r) {
      return '<li><span class="rows__label">' + txt(r.label) + '</span><span class="rows__value">' + txt(r.value) + '</span>' +
        (r.maps ? '<a class="icon-link"' + ext(mapsDir(r.maps, 'walking')) + ' aria-label="' + esc(ui('directions')) + '">' + icon('nav') + '</a>' : '') +
        '</li>';
    }).join('') + '</ul>';
  }

  function viewInfo(s) {
    var out = sectionHead(s);
    out += s.blocks.map(function (b, i) {
      var h = '<section class="block rise"' + d(i + 1) + '><h2 class="block__title">' + txt(b.title) + '</h2>';
      if (b.body) h += '<p class="block__body">' + txt(b.body) + '</p>';
      if (b.list) h += '<ul class="ticks">' + b.list.map(function (li) { return '<li>' + txt(li) + '</li>'; }).join('') + '</ul>';
      if (b.rows) h += rows(b.rows);
      if (b.phones) {
        h += '<div class="phones">' + b.phones.map(function (p) {
          return '<a class="phone" href="tel:' + esc(p.number) + '"><span class="phone__num">' + esc(p.number) + '</span><span class="phone__label">' + txt(p.label) + '</span></a>';
        }).join('') + '</div>';
      }
      if (b.phrases) {
        h += '<dl class="phrases">' + b.phrases.map(function (p) {
          return '<div class="phrase"><dt><span class="phrase__latin" lang="fr" dir="ltr">' + esc(p.latin) + '</span><span class="phrase__ar" lang="ar" dir="rtl">' + esc(p.ar) + '</span></dt><dd>' + txt(p.meaning) + '</dd></div>';
        }).join('') + '</dl>';
      }
      if (b.action === 'whatsapp') {
        h += '<div class="actions"><a class="btn btn--solid"' + ext(waLink(ui('waHello'))) + '>' + icon('chat') + '<span>WhatsApp</span></a></div>';
      }
      if (b.request) {
        h += '<div class="actions"><a class="btn"' + ext(requestLink(b.request)) + '>' + icon('chat') + '<span>' + esc(ui('askHost')) + '</span></a></div>';
      }
      return h + '</section>';
    }).join('');
    return out;
  }

  /* the apartment */

  function steps(list, start) {
    return '<ol class="steps rise"' + d(start) + '>' + list.map(function (st) {
      return '<li><span>' + txt(st) + '</span>' + (st.todo ? ' ' + todoBadge() : '') + '</li>';
    }).join('') + '</ol>';
  }

  function keyfact(label, hint, time) {
    return '<div class="keyfact"><span class="eyebrow">' + esc(label) + '</span>' +
      '<span class="keyfact__hint">' + esc(hint) + '</span>' +
      '<span class="keyfact__time">' + (isTodo(time) ? todoBadge() : esc(time)) + '</span></div>';
  }

  function copyButton(value) {
    return '<button class="copy" type="button" data-copy="' + esc(value) + '" aria-label="' + esc(ui('copy')) + '">' + icon('copy') + '</button>';
  }

  function viewApartment(s) {
    var A = APT;
    var wifi = A.wifi || {};
    var out = head(s.icon, tr(s.title), '', tr(A.name));

    out += '<figure class="welcome rise"' + d(1) + '><p class="eyebrow">' + esc(ui('welcomeKicker')) + '</p>' +
      '<blockquote>' + txt(A.welcome) + '</blockquote><figcaption>' + esc(A.host.name) + '</figcaption></figure>';

    out += '<div class="keyfacts rise"' + d(2) + '>' +
      keyfact(ui('checkin'), ui('from'), A.checkin.time) +
      keyfact(ui('checkout'), ui('before'), A.checkout.time) + '</div>';

    out += '<section class="wifi rise"' + d(3) + '>' +
      '<p class="wifi__head">' + icon('wifi') + '<span class="eyebrow">' + esc(ui('wifi')) + '</span></p>' +
      '<div class="wifi__row"><span class="wifi__label">' + esc(ui('network')) + '</span><span class="wifi__value">' + txt(wifi.network) + '</span>' +
        (wifi.network && !isTodo(wifi.network) ? copyButton(wifi.network) : '') + '</div>' +
      '<div class="wifi__row"><span class="wifi__label">' + esc(ui('password')) + '</span>' +
        (wifi.password ? '<span class="wifi__value">' + esc(wifi.password) + '</span>' + copyButton(wifi.password)
                       : '<span class="wifi__value is-muted">' + esc(ui('wifiOnCard')) + '</span>') + '</div>' +
      '</section>';

    out += subhead(ui('arrival'), 4) + steps(A.checkin.steps, 4);
    out += subhead(ui('departure'), 5) + steps(A.checkout.steps, 5);
    out += subhead(ui('rules'), 6) + '<ul class="ticks rise"' + d(6) + '>' + A.rules.map(function (r) { return '<li>' + txt(r) + '</li>'; }).join('') + '</ul>';
    out += subhead(ui('howto'), 7) + '<div class="howtos rise"' + d(7) + '>' + A.howto.map(function (h) {
      return '<details class="howto"><summary><span>' + txt(h.title) + '</span>' + icon('chevron') + '</summary><div class="howto__body">' + txt(h.body) + '</div></details>';
    }).join('') + '</div>';
    out += subhead(ui('nearby'), 8) + '<div class="rise"' + d(8) + '>' + rows(A.nearby) + '</div>';
    out += subhead(ui('services'), 9) + '<ul class="services rise"' + d(9) + '>' + A.services.map(function (sv) {
      return '<li><div class="services__text"><h3>' + txt(sv.title) + '</h3><p>' + txt(sv.text) + '</p></div>' +
        '<a class="btn"' + ext(requestLink(sv.request)) + '>' + icon('chat') + '<span>' + esc(ui('request')) + '</span></a></li>';
    }).join('') + '</ul>';
    return out;
  }

  /* location */

  function viewLocation() {
    var addr = (APT.location && APT.location.address) || {};
    var line = addr.fr && !isTodo(addr.fr) ? addr.fr : '';
    var out = head('pin', ui('locationTitle'), esc(ui('locationLede')), tr(APT.name));
    out += '<section class="address rise"' + d(1) + '>' +
      '<p class="eyebrow">' + esc(ui('address')) + '</p>' +
      '<p class="address__line" lang="fr" dir="ltr">' + txt(addr.fr) + '</p>' +
      (addr.ar && !isTodo(addr.ar) ? '<p class="address__ar" lang="ar" dir="rtl">' + esc(addr.ar) + '</p>' : '') +
      '<p class="address__note">' + icon('lock') + '<span>' + esc(ui('privateNote')) + '</span></p>' +
      '</section>';
    out += '<div class="stack rise"' + d(2) + '>' +
      '<a class="btn btn--solid btn--wide"' + ext(aptLink()) + '>' + icon('map') + '<span>' + esc(ui('openMaps')) + '</span></a>' +
      (line ? '<button class="btn btn--wide" type="button" data-copy="' + esc(line) + '">' + icon('copy') + '<span>' + esc(ui('copyAddress')) + '</span></button>' : '') +
      '<button class="btn btn--wide" type="button" data-taxi>' + icon('car') + '<span>' + esc(ui('showDriver')) + '</span></button>' +
      '</div>';
    return out;
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
    var out = head('heart', ui('favsTitle'), esc(ui('favsLede')), 'Casa, côté vous');
    if (!items.length) {
      return out + '<div class="empty rise"' + d(1) + '>' + icon('heart') + '<p>' + esc(ui('favsEmpty')) + '</p>' +
        '<a class="btn" href="#visit" data-open="visit">' + esc(ui('favsBrowse')) + '</a></div>';
    }
    return out + '<ol class="list">' + items.map(function (it, i) { return card(it, i + 1); }).join('') + '</ol>';
  }

  /* ---------- actions ---------- */

  function applyFilter(id) {
    els.body.querySelectorAll('[data-chip]').forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-chip') === id)); });
    els.body.querySelectorAll('.list > li').forEach(function (li) {
      var tags = (li.getAttribute('data-tags') || '').split(' ');
      li.hidden = id !== 'all' && tags.indexOf(id) === -1;
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
    var t = e.target.closest && e.target.closest('[data-open],[data-lang],[data-fav],[data-chip],[data-copy],[data-taxi]');
    if (!t) return;
    if (t.hasAttribute('data-open')) { state.openedHere = true; return; }
    if (t.hasAttribute('data-lang')) setLang(t.getAttribute('data-lang'));
    else if (t.hasAttribute('data-fav')) toggleFav(t.getAttribute('data-fav'));
    else if (t.hasAttribute('data-chip')) applyFilter(t.getAttribute('data-chip'));
    else if (t.hasAttribute('data-copy')) copyText(t.getAttribute('data-copy'));
    else if (t.hasAttribute('data-taxi')) showTaxi();
  });

  els.back.addEventListener('click', goBack);

  els.cue.addEventListener('click', function (e) {
    e.preventDefault();
    els.menu.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  });

  els.scroll.addEventListener('scroll', function () {
    var y = els.scroll.scrollTop;
    els.bar.classList.toggle('is-stuck', y > 8);
    els.bar.classList.toggle('show-title', y > 150);
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var taxi = document.querySelector('.taxi');
    if (taxi) closeTaxi(taxi);
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
