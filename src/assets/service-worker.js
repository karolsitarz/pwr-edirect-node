var CACHE = 'offline-cache';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
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
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(e.request).then(function(res) {
        return res || fetch(e.request).then(function(res) {
          cache.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
});
