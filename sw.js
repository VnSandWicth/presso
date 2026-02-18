const CACHE_NAME = 'folkpresso-app-v5';
const ASSETS = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'f-app.json',
    'img/logo-white.png',
    '/app',
    '/app/'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
