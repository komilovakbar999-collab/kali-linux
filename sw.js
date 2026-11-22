/* Kali Linux — offline service worker. Shaxsiy ma'lumot yig'maydi. */
'use strict';

var CACHE = 'kali-linux-v19';
var ASSETS = [
  './index.html',
  './cheatsheet.html',
  './learn.html',
  './lab.html',
  './all.html',
  './flashcards.html',
  './cms.html',
  './styles.css',
  './fonts.css',
  './extras.css',
  './quiz.css',
  './visuals.css',
  './gamify.css',
  './dock.css',
  './builder.css',
  './goals.css',
  './fun.css',
  './topcopy.css',
  './fonts/inter-latin.woff2',
  './fonts/jetbrains-mono-latin.woff2',
  './site.config.js',
  './commands.js',
  './synonyms.js',
  './labs.js',
  './i18n.js',
  './common.js',
  './visits.js',
  './feedback.js',
  './effects.js',
  './app.js',
  './cheatsheet.js',
  './learn.js',
  './lab.js',
  './protect.js',
  './seo.js',
  './stats-plus.js',
  './ux.js',
  './flashcards.js',
  './quiz-plus.js',
  './leaderboard.js',
  './visuals.js',
  './gamify.js',
  './dock.js',
  './builder.js',
  './goals.js',
  './fun.js',
  './topcopy.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './404.html',
  './command.html',
  './cmd.html',
  './exam.html',
  './tools.html',
  './man.css',
  './man.js',
  './exam.css',
  './exam.js',
  './tools.css',
  './tools.js',
  './terminal-pro.css',
  './terminal-pro.js',
  './page-meta.js',
  './og-index.png',
  './og-cheatsheet.png',
  './og-learn.png',
  './og-lab.png',
  './og-flashcards.png',
  './og-all.png',
  './og-exam.png',
  './og-tools.png',
  './og-command.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(ASSETS).catch(function () { return cache.add('./index.html'); });
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Sahifalar: tarmoq birinchi, bo'lmaganda kesh, oxirida bosh sahifa */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match('./index.html'); });
    }));
    return;
  }

  /* Statik fayllar: keshdan tez ko'rsatib, fonda yangilash */
  e.respondWith(caches.match(req).then(function (cached) {
    var network = fetch(req).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () { return cached; });
    return cached || network;
  }));
});
