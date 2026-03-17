const CACHE_NAME = 'flash-calc-v1';
// 需要缓存的文件列表
const urlsToCache = [
  './',
  './index.html'
];

// 安装阶段：把文件存入缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 抓取阶段：断网时直接从缓存读取文件
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存里有，就直接返回缓存（离线可用）
        if (response) {
          return response;
        }
        // 如果没有，再去请求网络
        return fetch(event.request);
      })
  );
});
