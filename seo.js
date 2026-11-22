/* SEO: canonical, hreflang va JSON-LD. HTML fayllariga tegish shart emas. */
(function () {
  'use strict';

  var LANGS = ['uz', 'ru', 'en'];
  var PAGES = {
    index:      { file: '',               key: 'navHome',  label: 'Bosh sahifa' },
    cheatsheet: { file: 'cheatsheet.html', key: 'navCheat', label: 'Tez yordam' },
    learn:      { file: 'learn.html',      key: 'navLearn', label: "O'rganish rejasi" },
    lab:        { file: 'lab.html',        key: 'navLab',   label: 'Laboratoriya' },
    all:        { file: 'all.html',        key: '',         label: 'Barcha sahifalar' },
  };

  /* FAQPage UZ bo'lishi shart: i18n faqat uz holatida va kalit mavjud bo'lsa ishlatiladi. */
  function t(key, fallback) {
    try {
      var I = window.I18N;
      if (I && typeof I.t === 'function' && I.getLang && I.getLang() === 'uz') {
        var value = I.t(key);
        if (value && value !== key) return value;
      }
    } catch (e) {}
    return fallback;
  }

  function baseUrl() {
    try {
      var cfg = window.SITE_CONFIG;
      var raw = cfg && typeof cfg.siteUrl === 'string' && cfg.siteUrl.trim();
      if (raw && raw.indexOf('YOUR_DOMAIN') === -1 && raw.indexOf('USERNAME') === -1) {
        if (!/^https?:\/\//i.test(raw)) {
          var u = new URL(raw, window.location.href);
          u.search = ''; u.hash = '';
          raw = u.href;
        }
        raw = raw.split('?')[0].split('#')[0];
        return raw.charAt(raw.length - 1) === '/' ? raw : raw + '/';
      }
    } catch (e) {}
    try {
      var loc = new URL(window.location.href);
      loc.search = ''; loc.hash = '';
      var path = loc.pathname || '/';
      var name = (path.split('/').pop() || '').toLowerCase();
      if (/\.[a-z0-9]+$/i.test(name)) path = path.slice(0, path.length - name.length);
      else if (path.charAt(path.length - 1) !== '/') path += '/';
      loc.pathname = path;
      return loc.href;
    } catch (e2) { return '/'; }
  }

  function pageName() {
    var path = '';
    try { path = window.location.pathname || ''; } catch (e) {}
    var name = (path.split('/').pop() || 'index.html').toLowerCase().replace(/\.html?$/, '');
    return name || 'index';
  }

  function currentLang() {
    try {
      var I = window.I18N;
      if (I && typeof I.getLang === 'function' && LANGS.indexOf(I.getLang()) !== -1) return I.getLang();
    } catch (e) {}
    try {
      if (LANGS.indexOf(document.documentElement.lang) !== -1) return document.documentElement.lang;
    } catch (e) {}
    return 'uz';
  }

  function metaDescription() {
    try {
      var m = document.querySelector('meta[name="description"]');
      if (m && m.getAttribute('content') && m.getAttribute('content').trim()) return m.getAttribute('content').trim();
    } catch (e) {}
    try {
      var d = window.SITE_CONFIG && window.SITE_CONFIG.description;
      if (typeof d === 'string' && d) return d;
      if (d && d.uz) return d.uz;
    } catch (e) {}
    return "Linux va Kali Linux buyruqlarining ko'p tilli ma'lumotnomasi.";
  }

  function commandCount() {
    try {
      var list = window.LINUX_COMMANDS;
      if (Object.prototype.toString.call(list) === '[object Array]' && list.length) return list.length;
    } catch (e) {}
    return 81;
  }

  function upsertLink(id, selector, attrs) {
    var el = document.getElementById(id);
    if (!el || el.tagName !== 'LINK') {
      var found = document.head.querySelectorAll(selector);
      el = found.length ? found[0] : document.createElement('link');
      el.id = id;
    }
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (el.parentNode !== document.head) document.head.appendChild(el);
    return el;
  }

  function dedupeLinks() {
    var canonical = document.getElementById('kali-seo-canonical');
    Array.prototype.forEach.call(document.head.querySelectorAll('link[rel="canonical"]'), function (el) {
      if (el !== canonical && el.parentNode) el.parentNode.removeChild(el);
    });
    Array.prototype.forEach.call(document.head.querySelectorAll('link[rel="alternate"][hreflang]'), function (el) {
      var hreflang = el.getAttribute('hreflang');
      var keepId = 'kali-seo-alt-' + hreflang;
      if (hreflang !== 'x-default' && LANGS.indexOf(hreflang) === -1) return;
      if (el.id !== keepId && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  function init() {
    try {
      var base = baseUrl();
      var name = pageName();
      var info = PAGES[name] || { file: name + '.html', key: '', label: name };
      var pageUrl = base + info.file;
      var lang = currentLang();
      var langUrl = function (l) { return pageUrl + '?lang=' + encodeURIComponent(l); };
      var siteName = 'Kali Linux';
      try { siteName = (window.SITE_CONFIG && window.SITE_CONFIG.brand) || siteName; } catch (e) {}
      var description = metaDescription();
      var homeName = t('navHome', 'Bosh sahifa');
      var pageLabel = info.key ? t(info.key, info.label) : info.label;

      upsertLink('kali-seo-canonical', 'link[rel="canonical"]', { rel: 'canonical', href: langUrl(lang) });
      LANGS.forEach(function (l) {
        upsertLink('kali-seo-alt-' + l, 'link[rel="alternate"][hreflang="' + l + '"]', {
          rel: 'alternate', hreflang: l, href: langUrl(l)
        });
      });
      upsertLink('kali-seo-alt-x-default', 'link[rel="alternate"][hreflang="x-default"]', {
        rel: 'alternate', hreflang: 'x-default', href: langUrl('uz')
      });
      dedupeLinks();

      var labName = t('navLab', 'Laboratoriya');
      var adminName = t('adminGateTitle', 'Admin kirish');
      var faq = [
        {
          q: "Saytda nechta buyruq bor?",
          a: "Ma'lumotnomada " + commandCount() + " ta Linux va Kali Linux buyrugi mavjud. Har biri uchun qisqa tavsif, sintaksis va ishlatish misollari keltirilgan."
        },
        {
          q: "Qaysi tillar qo'llab-quvvatlanadi?",
          a: "Sayt o'zbek (uz), rus (ru) va ingliz (en) tillarida mavjud. Tilni sahifa ustidagi UZ / RU / EN tugmalari bilan almashtirish mumkin."
        },
        {
          q: labName + " rejimi nima?",
          a: "Lab — lokal va xavfsiz muhitda bajariladigan amaliy vaziyatli mashqlar rejimi. Unda maslahat, yechim, tushuntirish, ball va saqlanadigan jarayon mavjud."
        },
        {
          q: "Saytni oflayn ishlatsa bo'ladimi?",
          a: "Ha. PWA va Service Worker o'rnatilgach, asosiy sahifalar va buyruqlar bazasi oflayn rejimda ham ochiladi."
        }
      ];

      var data = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': base + '#website',
            name: siteName,
            description: description,
            url: base,
            inLanguage: 'uz'
          },
          {
            '@type': 'BreadcrumbList',
            '@id': pageUrl + '#breadcrumb',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: homeName, item: base },
              { '@type': 'ListItem', position: 2, name: pageLabel, item: langUrl(lang) }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': pageUrl + '#faq',
            mainEntity: faq.map(function (item) {
              return {
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a }
              };
            })
          }
        ]
      };

      var script = document.getElementById('kali-seo-jsonld');
      if (!script || script.tagName !== 'SCRIPT') {
        script = document.createElement('script');
        script.id = 'kali-seo-jsonld';
        document.head.appendChild(script);
      }
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
