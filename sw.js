/*
 * Darna Collection — offline mode.
 * Once a guest has opened their guide (on the place's Wi-Fi, for example),
 * it keeps working without mobile data. The film itself is not stored:
 * offline, its still frame shows instead.
 *
 * Content is fetched fresh whenever there is a connection, so edits to
 * content/ reach guests straight away. A place's own files (its city, its
 * page) are stored the first time it is opened, and so is each photo the
 * first time it shows (photos never change under the same address: a new
 * one gets a new ?v=). Change VERSION, and this
 * list, after renaming or removing files: a missing file stops the update.
 */
var VERSION = 'atlas-v6';
var CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/css/style.css',
  'assets/js/app.js',
  'assets/js/icons.js',
  'assets/img/icon.svg',
  'assets/img/icon-192.png',
  'content/ui.js',
  'content/brand.js',
  'content/photos.js',
  'content/morocco.js',
  // Each place's short link (the one in the Airbnb message and on the QR card), and the old ones
  'bourgogne/', 'b-suites/', 'pestana/', 'dar-bouazza/', 'marrakech/', 'martil-bay/',
  'bourgogne-133/', 'casa-b-suites/', 'ocean-21/', 'darb-inn/', 'dar-baba/', 'casa-azul/'
];
var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION)
      .then(function (cache) { return cache.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return (k.indexOf('casa-') === 0 || k.indexOf('atlas-') === 0) && k !== VERSION; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

function store(request, response) {
  if (response && (response.ok || response.type === 'opaque')) {
    var copy = response.clone();
    caches.open(VERSION).then(function (cache) { cache.put(request, copy); });
  }
  return response;
}

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;
  var url = new URL(request.url);

  // The film is large and streamed in ranges: always from the network.
  if (request.destination === 'video' || /\.(mp4|webm|mov)$/i.test(url.pathname)) return;

  if (url.origin === self.location.origin && url.pathname.indexOf('/assets/img/photos/') > -1) {
    // Photos: the stored copy first. Offline, a large photo never stored falls back to
    // its small version when that one is stored (the guide stores them for later).
    event.respondWith(
      caches.match(request).then(function (hit) {
        return hit || fetch(request).then(function (response) { return store(request, response); }).catch(function () {
          var small = request.url.replace(/(-sm)?\.jpg(\?|$)/, '-sm.jpg$2');
          return caches.match(small).then(function (alt) { return alt || Response.error(); });
        });
      })
    );
    return;
  }

  if (url.origin === self.location.origin) {
    // Our files: network first, the stored copy when offline.
    event.respondWith(
      fetch(request)
        .then(function (response) { return store(request, response); })
        .catch(function () {
          return caches.match(request, { ignoreSearch: true }).then(function (hit) {
            if (hit || request.mode !== 'navigate') return hit;
            // A page never stored: a place's link (…/pestana/) opens its guide; anything else, the home.
            // (index.html must be served at the site's root, or its relative paths break.)
            var scope = new URL(self.registration.scope);
            var rest = url.pathname.slice(scope.pathname.length);
            var id = /^([a-z0-9-]+)\/?$/i.exec(rest);
            return Response.redirect(scope.href + (id ? '?stay=' + id[1].toLowerCase() : ''), 302);
          });
        })
    );
    return;
  }

  if (FONT_HOSTS.indexOf(url.hostname) > -1) {
    // Fonts never change: stored copy first.
    event.respondWith(
      caches.match(request).then(function (hit) {
        return hit || fetch(request).then(function (response) { return store(request, response); });
      })
    );
  }
});
