const CACHE_NAME = 'submission-1';
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/product.html",
  "/pages/sale.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png",
  "/icon-1.png",
  "/images/home.jpg",
  "/images/product/coklat-chip.jpg",
  "/images/product/coklat-mede.jpg",
  "/images/product/kastengel.jpg",
  "/images/product/lidah-kucing.jpg",
  "/images/product/nastar-keju.jpg",
  "/images/product/putri-salju-keju.jpg",
  "/images/sale/mede-cheese.jpg",
  "/images/sale/mix.jpg",
  "/images/sale/red-valvet.jpg",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
