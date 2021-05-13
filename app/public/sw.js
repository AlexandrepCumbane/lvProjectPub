let CACHE_NAME = "lv-version-1";

let urlsToCache = [
  "/main.1a9ea17324db7656a358.hot-update.js",
  "/oidc-client.min.js",
  "/manifest.json",
  "/static/media/feather.3d2fa2e5.woff",
  "/static/js/bundle.js",
  "/static/js/bundle.js.map",
  "/static/js/main.chunk.js",
  "/static/js/main.chunk.js.map",
  "/index.html",
  "/",
  "/home",
  "/lvforms",
  "/tasks",
  "/import",
  "/reports",
  "/articles",
  "/users",
  "/clusteragencys",
  "/clusterregions",
];

this.addEventListener("install", (event) => {
  for (var i = 0; i <= 12; i++) {
    urlsToCache.push(`/static/js/${i}.chunk.js`);
    urlsToCache.push(`/static/js/${i}.chunk.js.map`);
  }
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine)
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) return resp;
      })
    );
});
