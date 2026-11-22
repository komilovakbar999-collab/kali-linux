/* Ikkinchi sahifalar uchun umumiy boshqaruvlar */
(function () {
  'use strict';

  function store(key, value) {
    try {
      if (value === undefined) { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (e) { return null; }
  }

  function getArray(key, fallback) {
    var value = store(key);
    return Array.isArray(value) ? value : (fallback || []);
  }
  function getObject(key, fallback) {
    var value = store(key);
    return value && typeof value === 'object' && !Array.isArray(value) ? value : (fallback || {});
  }
  function safeUrl(value, fallback) {
    var url = String(value || '').trim();
    if (/^https?:\/\/[^\s]+$/i.test(url)) return url;
    return fallback || '';
  }
  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* Aqlli qidiruv: sinonimlar, transliteratsiya va kichik yozilish xatolari */
  function normalize(value) {
    return String(value == null ? '' : value)
      .replace(/[’`´]/g, '')
      .toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();
  }
  function unique(list) {
    var seen = {}, out = [];
    list.forEach(function (x) { if (x && !seen[x]) { seen[x] = 1; out.push(x); } });
    return out;
  }
  function expandQuery(query) {
    var words = normalize(query).split(/\s+/).filter(Boolean);
    var syn = window.SEARCH_SYNONYMS || {};
    var out = words.slice();
    Object.keys(syn).forEach(function (key) {
      var k = normalize(key);
      if (!k) return;
      var hit = words.some(function (w) { return w === k || w.indexOf(k) === 0 || k.indexOf(w) === 0; });
      if (hit) (Array.isArray(syn[key]) ? syn[key] : []).forEach(function (s) { out.push(normalize(s)); });
    });
    return unique(out).filter(Boolean);
  }
  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur[0] = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      }
      prev = cur; cur = [];
    }
    return prev[b.length];
  }
  function wordScore(token, word) {
    if (token === word) return 4;
    if (word.indexOf(token) === 0) return 3;
    if (word.indexOf(token) !== -1) return 2;
    if (token.length >= 4 && editDistance(token, word) <= 1) return 1;
    return 0;
  }
  function commandScore(cmd, query) {
    var tokens = expandQuery(query);
    if (!tokens.length) return 1;
    var aliases = (window.COMMAND_SYNONYMS && window.COMMAND_SYNONYMS[cmd.id]) || [];
    var parts = [cmd.name, cmd.syntax, cmd.category];
    ['uz', 'ru', 'en'].forEach(function (l) {
      if (cmd.desc && cmd.desc[l]) parts.push(cmd.desc[l]);
      if (cmd.notice && cmd.notice[l]) parts.push(cmd.notice[l]);
    });
    (cmd.tags || []).forEach(function (x) { parts.push(x); });
    (cmd.options || []).forEach(function (o) {
      parts.push(o.flag);
      ['uz', 'ru', 'en'].forEach(function (l) { if (o[l]) parts.push(o[l]); });
    });
    (cmd.examples || []).forEach(function (e) {
      parts.push(e.cmd);
      ['uz', 'ru', 'en'].forEach(function (l) { if (e[l]) parts.push(e[l]); });
    });
    aliases.forEach(function (a) { parts.push(a); });
    var hay = normalize(parts.join(' '));
    var words = hay.split(/\s+/).filter(Boolean);
    var full = normalize(query);
    var score = (full && hay.indexOf(full) !== -1) ? 12 : 0;
    tokens.forEach(function (token) {
      var best = 0;
      for (var i = 0; i < words.length; i++) {
        var s = wordScore(token, words[i]);
        if (s > best) best = s;
        if (best === 4) break;
      }
      score += best;
    });
    return score;
  }

  /* Accessibility: theme, contrast and font-size controls */
  function a11y() {
    var root = document.documentElement;
    var theme = store('kali_theme') === 'light' ? 'light' : 'dark';
    var contrast = store('kali_view') === 'high';
    var font = Number(store('kali_font'));
    if (!isFinite(font) || font < 90 || font > 130) font = 100;

    var bar = document.createElement('div');
    bar.className = 'a11y-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('data-a11y-bar', '');
    bar.innerHTML =
      '<button type="button" class="a11y-btn" data-a11y="theme"><span aria-hidden="true">◐</span></button>' +
      '<button type="button" class="a11y-btn" data-a11y="contrast"><span aria-hidden="true">◑</span></button>' +
      '<button type="button" class="a11y-btn a11y-btn--text" data-a11y="fontMinus" aria-hidden="true">A−</button>' +
      '<button type="button" class="a11y-btn a11y-btn--text" data-a11y="fontReset" aria-hidden="true">A</button>' +
      '<button type="button" class="a11y-btn a11y-btn--text" data-a11y="fontPlus" aria-hidden="true">A+</button>';
    document.body.appendChild(bar);

    function t(key) { return window.I18N ? window.I18N.t(key) : key; }
    function labels() {
      bar.setAttribute('aria-label', t('a11yPanel'));
      var b = bar.querySelector('[data-a11y="theme"]');
      var label = theme === 'light' ? t('themeToDark') : t('themeToLight');
      b.setAttribute('aria-label', label); b.setAttribute('title', label);
      b.firstElementChild.textContent = theme === 'light' ? '☾' : '☀';
      b = bar.querySelector('[data-a11y="contrast"]');
      label = contrast ? t('contrastOff') : t('contrastOn');
      b.setAttribute('aria-label', label); b.setAttribute('title', label);
      b.firstElementChild.textContent = contrast ? '◉' : '◎';
      [['fontMinus', 'fontMinus'], ['fontReset', 'fontReset'], ['fontPlus', 'fontPlus']].forEach(function (x) {
        var el = bar.querySelector('[data-a11y="' + x[0] + '"]');
        el.removeAttribute('aria-hidden');
        el.setAttribute('aria-label', t(x[1]));
        el.setAttribute('title', t(x[1]));
      });
    }
    function apply() {
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-contrast', contrast ? 'high' : 'normal');
      root.setAttribute('data-font', String(font));
      labels();
    }
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y]');
      if (!btn) return;
      var action = btn.getAttribute('data-a11y');
      if (action === 'theme') { theme = theme === 'dark' ? 'light' : 'dark'; store('kali_theme', theme); }
      else if (action === 'contrast') { contrast = !contrast; store('kali_view', contrast ? 'high' : 'normal'); }
      else if (action === 'fontMinus') { font = Math.max(90, font - 10); store('kali_font', font); }
      else if (action === 'fontPlus') { font = Math.min(130, font + 10); store('kali_font', font); }
      else if (action === 'fontReset') { font = 100; store('kali_font', font); }
      apply();
    });
    document.addEventListener('langchange', labels);
    apply();
  }

  window.KaliCommon = {
    store: store, getArray: getArray, getObject: getObject, safeUrl: safeUrl,
    reduceMotion: reduceMotion, normalize: normalize, expandQuery: expandQuery,
    commandScore: commandScore, a11y: a11y
  };
  window.KALI_OWNER_TOKEN = (function () {
    try { return localStorage.getItem('kali_owner_token') || 'kali-owner'; } catch (e) { return 'kali-owner'; }
  })();

  function init() {
    document.documentElement.setAttribute('data-theme', 'dark');
    a11y();

    /* Sayt sozlamalarini sahifaga qo'llash */
    function applyConfig() {
      var base = window.SITE_CONFIG || {};
      var cfg = Object.assign({}, base, getObject('kali_config', {}));
      var telegram = safeUrl(cfg.telegram, safeUrl(base.telegram, 'https://t.me/LinuxCoreX'));
      var github = safeUrl(cfg.github, safeUrl(base.github, ''));
      if (telegram) document.querySelectorAll('[data-tg]').forEach(function (a) { a.href = telegram; });
      document.querySelectorAll('[data-channel]').forEach(function (el) { el.textContent = cfg.channel || base.channel || ''; });
      document.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = cfg.brand || base.brand || 'Kali Linux'; });
      if (github) document.querySelectorAll('[data-github]').forEach(function (a) { a.href = github; a.hidden = false; });
      var meta = document.querySelector('meta[name="description"]');
      var desc = cfg.description || base.description;
      if (meta && desc && typeof desc === 'object') {
        var d = desc[window.I18N.getLang()] || desc.uz || desc.ru;
        if (d) meta.setAttribute('content', d);
      }
    }
    applyConfig();

    function syncLangButtons() {
      document.querySelectorAll('.lang-btn').forEach(function (b) {
        var active = b.getAttribute('data-lang') === window.I18N.getLang();
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }
    syncLangButtons();
    var mainNav = document.querySelector('.main-nav');
    function navLabel() {
      var l = window.I18N.getLang();
      return l === 'ru' ? 'Главное меню' : (l === 'en' ? 'Main menu' : 'Asosiy menyu');
    }
    if (mainNav) mainNav.setAttribute('aria-label', navLabel());
    document.addEventListener('langchange', function () {
      syncLangButtons();
      if (mainNav) mainNav.setAttribute('aria-label', navLabel());
      applyConfig();
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { window.I18N.setLang(this.getAttribute('data-lang')); });
    });

    var menuBtn = document.getElementById('menuBtn');
    var nav = document.querySelector('.main-nav');
    function closeMenu() {
      if (!nav) return;
      nav.classList.remove('open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
    if (menuBtn && nav) menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      this.setAttribute('aria-expanded', String(open));
    });
    if (nav) nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('click', function (e) { if (nav && nav.classList.contains('open') && !e.target.closest('.main-nav, #menuBtn')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

    /* Ega kirishi: ommaviy qisqa tugma olib tashlandi. */

    var toTop = document.getElementById('toTop');
    if (toTop) {
      window.addEventListener('scroll', function () { toTop.classList.toggle('show', window.scrollY > 500); }, { passive: true });
      toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' }); });
    }

    /* Scroll-spy: menyu ichidagi faol bo'lim */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.main-nav a[href^="#"]'));
    if (navLinks.length && 'IntersectionObserver' in window) {
      var visible = {}, lastActive = navLinks[0];
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) visible[en.target.id] = true;
          else delete visible[en.target.id];
        });
        var current = navLinks.filter(function (a) { return visible[a.getAttribute('href').slice(1)]; })[0];
        /* Bo'limlararo (popular, learn) oxirgi faol havola saqlanadi */
        if (!current) current = lastActive;
        else lastActive = current;
        navLinks.forEach(function (a) { a.classList.toggle('active', a === current); });
      }, { rootMargin: '-18% 0px -72% 0px' });
      navLinks.forEach(function (a) {
        var sec = document.querySelector(a.getAttribute('href'));
        if (sec) spy.observe(sec);
      });
    }

    document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    pwa();
    window.I18N.apply();
  }

  /* Foydalanuvchi shaxsiy ma'lumotlarini eksport/import qilish */
  var USER_KEYS = ['kali_favs', 'kali_progress', 'kali_notes', 'kali_quiz_best',
    'kali_lab_progress', 'kali_lang', 'kali_view', 'kali_theme', 'kali_font'];
  window.KaliUserData = {
    keys: USER_KEYS,
    export: function () {
      var data = { version: 1, exportedAt: new Date().toISOString() };
      USER_KEYS.forEach(function (k) {
        var v = store(k);
        if (v !== null && v !== undefined) data[k] = v;
      });
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'kali-user-data.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      return data;
    },
    import: function (raw) {
      var data = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('bad');
      USER_KEYS.forEach(function (k) {
        if (!(k in data)) return;
        var v = data[k];
        if (/progress|favs|lab_progress/.test(k) && !Array.isArray(v)) return;
        if (/notes|quiz_best/.test(k) && (!v || typeof v !== 'object' || Array.isArray(v))) return;
        store(k, v);
      });
      return true;
    }
  };

  /* PWA: offline kesh va o'rnatish tugmasi */
  function pwa() {
    var deferred = null;
    var buttons = Array.prototype.slice.call(document.querySelectorAll('#installBtn'));
    var local = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if ('serviceWorker' in navigator && local) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').catch(function () {});
      });
    }
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferred = e;
      buttons.forEach(function (b) { b.hidden = false; });
    });
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        if (!deferred) {
          var old = b.textContent;
          b.textContent = window.I18N.t('installHint');
          setTimeout(function () { b.textContent = old; }, 2600);
          return;
        }
        deferred.prompt();
        deferred.userChoice.then(function () { deferred = null; b.hidden = true; }).catch(function () {});
      });
    });
    window.addEventListener('appinstalled', function () {
      buttons.forEach(function (b) {
        b.hidden = false;
        b.textContent = window.I18N.t('offlineReady');
      });
    });
  }

  /* Zamonaviy mikro-interaktsiyalar: progress va paydo bo'lish */
  function modern() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    var items = Array.prototype.slice.call(document.querySelectorAll(
      '.cmd-card, .tool-card, .learn-mini, .stat-cell, .section__head, .cheat-group, .stage, .admin-panel, .quiz-card'
    ));
    if (!items.length) return;
    items.forEach(function (el) { el.classList.add('reveal'); });
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    items.forEach(function (el) { io.observe(el); });
    setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 1800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  if (document.readyState === 'complete') modern();
  else window.addEventListener('load', modern);
})();
