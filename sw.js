self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                "index.html",
                "app.js",
                "sw.js",
                "https://unpkg.com/onsenui/css/onsenui.css",
                "https://unpkg.com/onsenui/css/onsen-css-components.min.css",
                "https://unpkg.com/onsenui/js/onsenui.min.js",
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('v')
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
        }
    }));
});
self.addEventListener('messsage',event => {
    console.log("SW Received Message: " + event.data);
    event.ports[0].postMessage('private msg back');
})



