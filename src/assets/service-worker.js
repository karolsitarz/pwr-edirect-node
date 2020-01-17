var CACHE = 'network-or-cache';

self.addEventListener('install', function(evt) {
  evt.waitUntil(precache());
});
self.addEventListener('fetch', function(evt) {
  evt.respondWith(fromCache(evt.request));
});
function precache() {
  return caches.open(CACHE).then(function(cache) {
    return cache.addAll(['./', '../style.css']);
  });
}
function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
