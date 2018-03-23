const log = (...args) => console.log('[ServiceWorker]', ...args);
const v = 'v0.4';
const assetsCacheName = 'weather-app-assets-' + v;
const dataCacheName = 'weather-app-data-' + v;

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

self.addEventListener('activate', e => {
  log('Activate');
  e.waitUntil(
    caches.keys().then(keyList => {
      if (key !== assetsCacheName && key !== dataCacheName) {
        log('Removing old cache');
        return caches.delete(key);
      }
    }),
  );
});

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
  const { request } = e;
  log('Fetch');
  const dataUrl = 'https://query.yahooapis.com/v1/public/yql';

  if (request.url.indexOf(dataUrl) > -1) {
    // fresh weather data
    e.respondWith(
      caches.open(dataCacheName).then(cache =>
        fetch(request)
          .then(resp => {
            cache.put(request.url, resp.clone());
            return resp;
          })
          .catch(console.error),
      ),
    );
  } else {
    // app shell
    e.respondWith(
      caches.match(request).then(resp => {
        return resp || fetch(request);
      }),
    );
  }
});
