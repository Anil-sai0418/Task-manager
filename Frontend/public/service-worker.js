const CACHE_NAME = "task-manager-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/TM.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Check if it's an API request (cross-origin or specific path)
  const url = new URL(event.request.url);
  const isApiRequest = url.pathname.startsWith('/api') ||
    url.hostname.includes('onrender.com') ||
    url.hostname.includes('localhost');

  if (isApiRequest) {
    // For API requests, try network only, don't fallback to index.html
    return;
  }

  // For navigation requests (loading pages), use network first, then cache, then offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match("/index.html");
        })
    );
    return;
  }

  // For other assets (images, css, js), use cache first, then network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
      );
    })
  );
});