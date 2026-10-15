/*
 * Casa, côté vous — offline mode.
 * Once a guest has opened the guide (on the apartment Wi-Fi, for example),
 * it keeps working without mobile data. The film is not stored: offline,
 * the drawn scene shows instead.
 *
 * Content is fetched fresh whenever there is a connection, so edits to
 * content/*.js reach guests straight away. Change VERSION after renaming
 * or removing files.
 */
var VERSION = 'casa-v1';
var CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/css/style.css',
  'assets/js/app.js',
  'assets/js/icons.js',
  'assets/img/icon.svg',
  'content/ui.js',
  'content/city.js',
  'content/apartment.js'
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
        return Promise.all(keys.filter(function (k) { return k.indexOf('casa-') === 0 && k !== VERSION; })
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

  if (url.origin === self.location.origin) {
    // Our files: network first, the stored copy when offline.
    event.respondWith(
      fetch(request)
        .then(function (response) { return store(request, response); })
        .catch(function () {
          return caches.match(request, { ignoreSearch: true }).then(function (hit) {
            return hit || (request.mode === 'navigate' ? caches.match('index.html') : undefined);
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
