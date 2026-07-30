const CACHE_NAME = 'peach-workbench-v3';
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

// 安装时立即激活，跳过等待
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 响应页面发来的 SKIP_WAITING 消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 激活时清除所有旧版本缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// 网络优先策略：优先拉取最新内容，网络失败才用缓存
self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).then((response) => {
      // 网络成功：返回最新内容，并更新缓存
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        try {
          cache.put(event.request, responseClone);
        } catch (e) {
          // 忽略缓存写入失败
        }
      });
      return response;
    }).catch(() => {
      // 网络失败：尝试从缓存读取
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        // 导航请求降级到缓存首页
        if (event.request.mode === 'navigate') {
          return caches.match('/peach-workbench/index.html');
        }
        return new Response('离线且无缓存', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
