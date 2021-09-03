const staticCacheName = "site-static-v4";
const dynamicCacheName = "site-dynamic-v4";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/css/faculty.css",
  "/css/index.css",
  "/icons/favicon.ico",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/main-icon.png",
  "/images/principal 2.jpg",
  "/images/principal.jpg",
  "/images/sdc.jpg",
  "/images/secratary.jpg",
  "/pages/courses.html",
  "/pages/home.html",
  "/pages/faculty attendence.html",
  "/pages/gallary.html",
  "/pages/library.html",
  "/pages/principal1.html",
  "/pages/secretary1.html",
  "/pages/student attendence.html",
  "/Script/main.js",
  "/Script/qrcode.js",
  "/Script/qrcode.min.js",
];
// cache limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
//install serviceWorker
self.addEventListener("install", (evt) => {
  console.log("serviceworker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
      console.log("cached all assets");
    })
  );
});
//activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
//fetch events
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then(async (fetchRes) => {
          const cache = await caches.open(dynamicCacheName);
          if (evt.request.url.indexOf("http") !== -1)
            cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, 30);
          return fetchRes;
        })
      );
    })
  );
});
