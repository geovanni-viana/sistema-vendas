const CACHE_NAME = "sv-cache-v1";
const ARQUIVOS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/storage.js",
    "./js/app.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((chaves) =>
            Promise.all(
                chaves
                    .filter((chave) => chave !== CACHE_NAME)
                    .map((chave) => caches.delete(chave))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((respostaCache) => {
            return respostaCache || fetch(event.request);
        })
    );
});
