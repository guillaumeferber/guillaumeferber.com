const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'index-fr.html',
  'style.min.css',
  'assets/images/main.webp',
  'assets/images/logo/cms.svg',
  'assets/images/logo/design.svg',
  'assets/images/logo/email.svg',
  'assets/images/logo/github.svg',
  'assets/images/logo/next.svg',
  'assets/images/logo/phone.svg'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});
