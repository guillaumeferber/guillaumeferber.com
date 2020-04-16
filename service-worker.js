const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  '/index.html',
  '/index-fr.html',
  '/style.min.css',
  '/assets/images/main.webp',
  '/assets/images/logos/cms.svg',
  '/assets/images/logos/design.svg',
  '/assets/images/logos/email.svg',
  '/assets/images/logos/github.svg',
  '/assets/images/logos/next.svg',
  '/assets/images/logos/phone.svg',
  '/assets/fonts/bebasneuebold-webfont.woff',
  '/assets/fonts/bebasneuebold-webfont.woff2',
  '/assets/fonts/fa-brands-400.eot',
  '/assets/fonts/fa-brands-400.svg',
  '/assets/fonts/fa-brands-400.ttf',
  '/assets/fonts/fa-brands-400.woff',
  '/assets/fonts/fa-brands-400.woff2',
  '/assets/fonts/opensans-light-webfont.woff',
  '/assets/fonts/opensans-light-webfont.woff2'
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
