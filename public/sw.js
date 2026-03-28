// Vaultwright Service Worker — offline shell cache
// NOTE: SHELL only caches '/' — the JS entry point is hashed at build time
// and can't be hardcoded here. Network-first for everything else.
const CACHE = 'vaultwright-v2';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.add('/').catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Never intercept API calls — always go to network
  if (e.request.url.includes('/api/')) return;
  // Network-first: return cached shell only when offline
  e.respondWith(
    fetch(e.request).catch(() => caches.match('/'))
  );
});
