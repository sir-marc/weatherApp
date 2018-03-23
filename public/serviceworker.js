const log = (...args) => console.log('[ServiceWorker]', ...args);
const v = 'v0.4';
const assetsCacheName = 'weather-app-assets-' + v;

const filesToCache = [
  '/',
  '/serviceworker.js',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/assets/styles/style.css',
  '/static/js/bundle.js',
  '/assets/images/clear.png',
  '/assets/images/cloudy-scattered-showers.png',
  '/assets/images/cloudy.png',
  '/assets/images/fog.png',
  '/assets/images/ic_add_white_24px.svg',
  '/assets/images/ic_refresh_white_24px.svg',
  '/assets/images/partly-cloudy.png',
  '/assets/images/rain.png',
  '/assets/images/scattered-showers.png',
  '/assets/images/sleet.png',
  '/assets/images/snow.png',
  '/assets/images/thunderstorm.png',
  '/assets/images/wind.png',
];

self.addEventListener('install', e => {
  log('Install');
  e.waitUntil(
    caches.open(assetsCacheName).then(cache => {
      log('Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('fetch', e => {
  log('Fetch');
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request);
    }),
  );
});
