const CACHE_NAME = 'peach-workbench-v1';
const ASSETS_TO_CACHE = [
  '/peach-workbench/',
  '/peach-workbench/index.html',
  '/peach-workbench/manifest.json',
  '/peach-workbench/icons/icon-192.png',
  '/peach-workbench/icons/icon-256.png',
  '/peach-workbench/icons/icon-384.png',
  '/peach-workbench/icons/icon-512.png',
  '/peach-workbench/icons/apple-touch-icon.png',
  '/peach-workbench/icons/maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(() => {
      // 忽略图标缓存失败，确保核心页面可用
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        // 不缓存动态请求，只缓存静态资源
        return response;
      }).catch(() => {
        // 离线时返回缓存首页
        if (event.request.mode === 'navigate') {
          return caches.match('/peach-workbench/index.html');
        }
      });
    })
  );
});
