var CACHE = 'offline-cache';

self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      cache.addAll([
        './manifest.json',
        './icon-512.png',
        './icon-192.png'
      ]);
      return cache.addAll([
        './',
        '../style.css'
      ]);
    })
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(res => {
        if (res) return res;
        return fetch(e.request).then(res => {
          cache.put(e.request, res.clone());
          return res;
        })
      })
    )
  )
);
