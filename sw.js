const CACHE_NAME = 'bijo-v1';
const urlsToCache = [
  '/',
  '/home.html',
  '/Login.html',
  '/style.css',
  '/main.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // فقط درخواست‌های هم‌مبدأ (فایل‌های خودِ اپ) رو کش کن.
  // درخواست‌های به سرورهای دیگه (مثل بک‌اند رو Render) رو دست‌نخورده
  // مستقیم بذار برن شبکه، وگرنه POST/PUT به API خراب میشه.
  if (url.origin !== self.location.origin) {
    return;
  }

  // فقط GET رو کش کن (POST/PUT/DELETE اصلاً نباید کش بشن)
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});