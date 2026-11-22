(function () {
  'use strict';

  var READY_ATTR = 'data-page-meta-ready';
  if (document.documentElement.getAttribute(READY_ATTR) === '1') return;
  document.documentElement.setAttribute(READY_ATTR, '1');

  var LANGS = ['uz', 'ru', 'en'];
  var LOCALE = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US' };

  var PAGE_META = {
    index: {
      title: { uz: 'Kali Linux — buyruqlar va vositalar', ru: 'Kali Linux — команды и инструменты', en: 'Kali Linux — Commands and Tools' },
      image: 'og-index.png'
    },
    all: {
      title: { uz: 'Barcha sahifalar — Kali Linux', ru: 'Все страницы — Kali Linux', en: 'All Pages — Kali Linux' },
      image: 'og-all.png'
    },
    cheatsheet: {
      title: { uz: 'Tez yordam — Kali Linux', ru: 'Шпаргалка — Kali Linux', en: 'Cheatsheet — Kali Linux' },
      image: 'og-cheatsheet.png'
    },
    learn: {
      title: { uz: "O'rganish rejasi — Kali Linux", ru: 'План обучения — Kali Linux', en: 'Learning Plan — Kali Linux' },
      image: 'og-learn.png'
    },
    lab: {
      title: { uz: 'Amaliy laboratoriya — Kali Linux', ru: 'Практическая лаборатория — Kali Linux', en: 'Practice Lab — Kali Linux' },
      image: 'og-lab.png'
    },
    flashcards: {
      title: { uz: 'Kartalar bilan takrorlash — Kali Linux', ru: 'Повторение карточками — Kali Linux', en: 'Flashcards Review — Kali Linux' },
      image: 'og-flashcards.png'
    },
    exam: {
      title: { uz: 'Imtihon — Kali Linux', ru: 'Экзамен — Kali Linux', en: 'Exam — Kali Linux' },
      image: 'og-exam.png'
    },
    tools: {
      title: { uz: 'Vositalar — Kali Linux', ru: 'Инструменты — Kali Linux', en: 'Tools — Kali Linux' },
      image: 'og-tools.png'
    },
    command: {
      title: { uz: 'Buyruq — Kali Linux', ru: 'Команда — Kali Linux', en: 'Command — Kali Linux' },
      image: 'og-command.png'
    }
  };

  function safeGetLang() {
    try {
      if (window.I18N && typeof window.I18N.getLang === 'function') {
        var lang = window.I18N.getLang();
        if (LANGS.indexOf(lang) !== -1) return lang;
      }
    } catch (e) {}
    try {
      var htmlLang = (document.documentElement.lang || '').toLowerCase();
      if (LANGS.indexOf(htmlLang) !== -1) return htmlLang;
    } catch (e2) {}
    return 'uz';
  }

  function pageName() {
    var path = '';
    try { path = window.location.pathname || ''; } catch (e) {}
    var name = (path.split('/').pop() || 'index.html').toLowerCase();
    name = name.replace(/\.html?$/, '');
    if (!name) name = 'index';
    if (name === 'index' || name === 'home') return 'index';
    return name;
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

  function pageUrl(name) {
    var base = baseUrl();
    if (name === 'index') return base;
    return base + name + '.html';
  }

  function metaForPage(name) {
    if (name === 'command') {
      try {
        if (/[?&]id=/.test(window.location.search || '')) return PAGE_META.command;
      } catch (e) {}
    }
    return PAGE_META[name] || null;
  }

  function upsertMeta(attr, key, content) {
    var selector = 'meta[' + attr + '="' + key + '"]';
    var el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function removeMeta(attr, key) {
    var selector = 'meta[' + attr + '="' + key + '"]';
    var nodes = document.head.querySelectorAll(selector);
    for (var i = 1; i < nodes.length; i++) {
      if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
    }
  }

  function setTitle(meta, lang) {
    try {
      var title = meta && meta.title ? (meta.title[lang] || meta.title.uz || meta.title.en || meta.title.ru) : '';
      if (!title) return;
      document.title = title;
      upsertMeta('property', 'og:title', title);
      upsertMeta('name', 'twitter:title', title);
    } catch (e) {}
  }

  function apply() {
    try {
      var lang = safeGetLang();
      document.documentElement.lang = lang;

      var name = pageName();
      var meta = metaForPage(name);
      if (!meta) return;

      setTitle(meta, lang);

      var imageUrl = baseUrl() + meta.image;
      var url = pageUrl(name);

      upsertMeta('property', 'og:image', imageUrl);
      upsertMeta('name', 'twitter:image', imageUrl);
      upsertMeta('property', 'og:url', url);
      upsertMeta('property', 'og:locale', LOCALE[lang] || LOCALE.uz);
      upsertMeta('name', 'twitter:card', 'summary_large_image');

      removeMeta('property', 'og:image');
      removeMeta('name', 'twitter:image');
      removeMeta('property', 'og:url');
      removeMeta('property', 'og:locale');
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  document.addEventListener('langchange', function () {
    apply();
  });
})();
