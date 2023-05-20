import {clientsClaim} from "workbox-core";
import {precacheAndRoute} from "workbox-precaching";
import {registerRoute} from "workbox-routing";
import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {ExpirationPlugin} from "workbox-expiration";
import {CacheableResponsePlugin} from "workbox-cacheable-response";

clientsClaim();
// Service Worker завершил активацию active
self.skipWaiting();
// Service Worker приступает к работе

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(({url}) => url.origin === "https://fonts.googleapis.com",
    new StaleWhileRevalidate({cacheName: 'google-fonts-stylesheets',}));

registerRoute(
    ({url}) => url.origin === "https://fonts.gstatic.com/",
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);
registerRoute(
    ({request}) => request.destination === "image",
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 60,
            }),
        ],
    }),
);

registerRoute(
    ({request}) => request.destination === "script" ||
        request.destination === "style",
    new StaleWhileRevalidate({
        cacheName: "static-resources",
    })
);