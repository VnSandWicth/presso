const CACHE_NAME = 'folkpresso-app-v4';
const ASSETS = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'f-app.json',
    'img/logo.png',
    '/app',
    '/app/index.html'
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
