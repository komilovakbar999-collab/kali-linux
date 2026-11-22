/* Tashrif hisoblagichi: umumiy sonlar, mamlakat kodi, kunlar va sahifalar */
(function () {
  'use strict';

  var LOCAL_KEY = 'kali_visit_local';
  var COUNTRY_KEY = 'kali_visit_country';
  var PENDING_KEY = 'kali_visit_pending';
  var SEEN_KEY = 'kali_visit_seen_';
  var API = 'https://kvdb.io/';

  function store(key, value) {
    try {
      if (value === undefined) {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (e) { return null; }
  }

  function config() {
    var c = store('kali_config');
    var override = c && typeof c === 'object' && !Array.isArray(c) ? c : {};
    return Object.assign({}, window.SITE_CONFIG || {}, override);
  }
  function bucket() { return config().statsBucket || ''; }
  function localOnly() { return !bucket(); }

  function blank() {
    return {
      total: 0, days: {}, countries: {}, pages: {},
      searches: {}, devices: {}, refHosts: {},
      adminOk: 0, adminFail: 0, updated: 0
    };
  }
  function num(value) {
    var n = Math.floor(Number(value));
    return isFinite(n) && n > 0 ? n : 0;
  }
  function numMap(value, limit) {
    var out = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) return out;
    Object.keys(value).slice(0, limit || 100).forEach(function (k) {
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') return;
      var n = num(value[k]);
      if (n) out[k] = n;
    });
    return out;
  }
  function normalize(s) {
    s = s && typeof s === 'object' && !Array.isArray(s) ? s : {};
    return {
      total: num(s.total),
      days: numMap(s.days, 60),
      countries: numMap(s.countries, 50),
      pages: numMap(s.pages, 50),
      searches: numMap(s.searches, 50),
      devices: numMap(s.devices, 20),
      refHosts: numMap(s.refHosts, 20),
      adminOk: num(s.adminOk),
      adminFail: num(s.adminFail),
      updated: num(s.updated)
    };
  }
  function trim(s) {
    var days = Object.keys(s.days).sort();
    if (days.length > 30) {
      var keepDays = {}; days.slice(-30).forEach(function (k) { keepDays[k] = s.days[k]; });
      s.days = keepDays;
    }
    function top(obj, limit) {
      var keys = Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a]; });
      if (keys.length <= limit) return obj;
      var out = {}; keys.slice(0, limit).forEach(function (k) { out[k] = obj[k]; });
      return out;
    }
    s.countries = top(s.countries, 25);
    s.pages = top(s.pages, 15);
    s.searches = top(s.searches, 25);
    s.devices = top(s.devices, 10);
    s.refHosts = top(s.refHosts, 15);
    s.updated = Date.now();
  }

  function localStats() { return normalize(store(LOCAL_KEY)); }
  function pending() {
    var p = store(PENDING_KEY);
    if (!Array.isArray(p)) return [];
    return p.slice(-200).filter(function (d) { return d && typeof d === 'object' && !Array.isArray(d); }).map(function (d) {
      return {
        total: num(d.total), days: numMap(d.days, 60), countries: numMap(d.countries, 50),
        pages: numMap(d.pages, 50), searches: numMap(d.searches, 50),
        devices: numMap(d.devices, 20), refHosts: numMap(d.refHosts, 20),
        adminOk: num(d.adminOk), adminFail: num(d.adminFail)
      };
    });
  }
  function applyDelta(s, d) {
    if (!d) return s;
    s.total += d.total || 0;
    Object.keys(d.days || {}).forEach(function (k) { s.days[k] = (s.days[k] || 0) + d.days[k]; });
    Object.keys(d.countries || {}).forEach(function (k) { s.countries[k] = (s.countries[k] || 0) + d.countries[k]; });
    Object.keys(d.pages || {}).forEach(function (k) { s.pages[k] = (s.pages[k] || 0) + d.pages[k]; });
    ['searches', 'devices', 'refHosts'].forEach(function (field) {
      if (!s[field] || typeof s[field] !== 'object' || Array.isArray(s[field])) s[field] = {};
      Object.keys(d[field] || {}).forEach(function (k) { s[field][k] = (s[field][k] || 0) + d[field][k]; });
    });
    s.adminOk += d.adminOk || 0; s.adminFail += d.adminFail || 0;
    return s;
  }

  function readStats() {
    var b = bucket();
    if (!b) return Promise.resolve(localStats());
    return fetch(API + encodeURIComponent(b) + '/stats', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('get failed'); return r.text(); })
      .then(function (text) {
        var s;
        try { s = normalize(JSON.parse(text)); } catch (e) { s = blank(); }
        return pending().reduce(applyDelta, s);
      })
      .catch(function () { return localStats(); });
  }

  function writeStats(s, delta) {
    trim(s);
    var b = bucket();
    if (!b) { store(LOCAL_KEY, s); return Promise.resolve(s); }
    return fetch(API + encodeURIComponent(b) + '/stats', { method: 'PUT', body: JSON.stringify(s) })
      .then(function (r) { if (!r.ok) throw new Error('put failed'); if (delta) store(PENDING_KEY, []); return s; })
      .catch(function () {
        if (delta) { var p = pending(); p.push(delta); store(PENDING_KEY, p.slice(-200)); }
        store(LOCAL_KEY, s);
        return s;
      });
  }

  function getJson(url, ms) {
    return new Promise(function (resolve, reject) {
      var timer = null, ctrl = null;
      function clear() { if (timer) { clearTimeout(timer); timer = null; } }
      try {
        if (window.AbortController) {
          ctrl = new AbortController();
          timer = setTimeout(function () { ctrl.abort(); reject(new Error('timeout')); }, ms);
        } else timer = setTimeout(function () { reject(new Error('timeout')); }, ms);
        var opts = { cache: 'no-store' };
        if (ctrl) opts.signal = ctrl.signal;
        fetch(url, opts).then(function (r) {
          clear();
          if (!r.ok) throw new Error('http');
          return r.json();
        }).then(resolve, function (e) { clear(); reject(e); });
      } catch (e) { clear(); reject(e); }
    });
  }

  function countryCode(done) {
    var cached = store(COUNTRY_KEY);
    var ttl = cached && cached.ttl ? cached.ttl : 7 * 864e5;
    if (cached && cached.code && Date.now() - cached.at < ttl) { done(cached.code); return; }
    function finish(code) {
      var valid = /^[A-Z]{2}$/.test(code || '');
      code = valid ? code : 'XX';
      /* XX vaqtinchalik: keyingi tashrifda qayta aniqlashga harakat qilamiz */
      store(COUNTRY_KEY, { code: code, at: Date.now(), ttl: valid ? 7 * 864e5 : 6e5 });
      done(code);
    }
    function fallback() {
      getJson('https://ipwho.is/', 5000).then(function (j) {
        finish(j && (j.country_code || j.country));
      }).catch(function () { finish('XX'); });
    }
    getJson('https://ipapi.co/json/', 5000).then(function (j) {
      var code = j && (j.country_code || j.country);
      if (/^[A-Z]{2}$/.test(code || '')) finish(code); else fallback();
    }).catch(fallback);
  }

  function pageKey() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!p || p === 'index.html') return 'index';
    if (p.indexOf('cheat') !== -1) return 'cheat';
    if (p.indexOf('learn') !== -1) return 'learn';
    if (p.indexOf('admin') !== -1) return 'admin';
    return p.replace(/\.[^.]+$/, '');
  }

  /* Bir nechta tab bir vaqtda yozganda hisob yo'qolmasligi uchun navbat */
  function localLock(fn) {
    var key = 'kali_visit_lock';
    var token = Date.now() + '-' + Math.random();
    function attempt(n) {
      var current = null;
      try { current = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) {}
      if (!current || Date.now() - current.at > 3000) {
        try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), token: token })); } catch (e) {}
        var mine = null;
        try { mine = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) {}
        if (mine && mine.token === token) {
          return Promise.resolve().then(fn).then(function (value) {
            try { localStorage.removeItem(key); } catch (e) {}
            return value;
          }, function (err) {
            try { localStorage.removeItem(key); } catch (e) {}
            throw err;
          });
        }
      }
      if (n <= 0) return Promise.reject(new Error('lock timeout'));
      return new Promise(function (resolve) { setTimeout(function () { resolve(attempt(n - 1)); }, 120); });
    }
    return attempt(25);
  }

  function withLock(fn) {
    if (navigator.locks && navigator.locks.request) return navigator.locks.request('kali_visits_stats', fn);
    return localLock(fn);
  }

  /* Qo'shimcha (anonim) maydonlarni ham xavfsiz delta shakliga keltirish */
  function extraDelta(delta) {
    if (!delta || typeof delta !== 'object' || Array.isArray(delta)) return null;
    var out = {
      total: num(delta.total), adminOk: num(delta.adminOk), adminFail: num(delta.adminFail),
      days: numMap(delta.days, 60), countries: numMap(delta.countries, 50), pages: numMap(delta.pages, 50),
      searches: numMap(delta.searches, 50), devices: numMap(delta.devices, 20), refHosts: numMap(delta.refHosts, 20)
    };
    var has = out.total || out.adminOk || out.adminFail;
    ['days', 'countries', 'pages', 'searches', 'devices', 'refHosts'].forEach(function (f) {
      if (Object.keys(out[f]).length) has = true;
    });
    return has ? out : null;
  }

  /* Qidiruv yoki boshqa qo'shimcha hodisani bitta delta bilan yozish */
  function recordExtra(delta) {
    var d = extraDelta(delta);
    if (!d) return Promise.resolve(null);
    return withLock(function () {
      return readStats().then(function (s) {
        return writeStats(applyDelta(s, d), d);
      });
    }).catch(function () { return null; });
  }

  function deviceType(ua) {
    var s = String(ua || '').toLowerCase();
    if (/ipad|tablet|kindle|silk|playbook|tablet pc/.test(s) || (/android/.test(s) && !/mobile/.test(s))) return 'tablet';
    if (/iphone|ipod|mobile|windows phone|blackberry|opera mini|iemobile/.test(s)) return 'mobile';
    return 'desktop';
  }

  /* Faqat host qoldiriladi: yo'l, so'rov va to'liq referrer saqlanmaydi */
  function referrerHost(ref) {
    var raw = String(ref || '');
    if (!raw) return 'direct';
    var host = '';
    try { host = new URL(raw, location.href).hostname || ''; } catch (e) { return 'direct'; }
    host = host.toLowerCase().replace(/^www\./, '');
    return /^[a-z0-9.-]{1,60}$/.test(host) ? host : 'direct';
  }

  function visitContext() {
    var ua = '', ref = '';
    try { ua = navigator.userAgent || ''; } catch (e) {}
    try { ref = document.referrer || ''; } catch (e) {}
    var extra = { devices: {}, refHosts: {} };
    extra.devices[deviceType(ua)] = 1;
    extra.refHosts[referrerHost(ref)] = 1;
    return extra;
  }

  function recordVisit(code, extra) {
    var today = new Date().toISOString().slice(0, 10);
    var page = pageKey();
    var delta = { total: 1, days: {}, countries: {}, pages: {}, searches: {}, devices: {}, refHosts: {} };
    delta.days[today] = 1; delta.countries[code] = 1; delta.pages[page] = 1;
    applyDelta(delta, extraDelta(extra));
    withLock(function () {
      return readStats().then(function (s) {
        return writeStats(applyDelta(s, delta), delta);
      });
    }).catch(function () {});
  }

  function adminEvent(type) {
    var delta = type === 'ok' ? { adminOk: 1 } : { adminFail: 1 };
    withLock(function () {
      return readStats().then(function (s) {
        return writeStats(applyDelta(s, delta), delta);
      });
    }).catch(function () {});
  }

  function createBucket(email) {
    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'email=' + encodeURIComponent(email)
    }).then(function (r) {
      if (!r.ok) throw new Error('bucket');
      return r.text();
    }).then(function (text) {
      var id = (text || '').trim();
      if (!/^[A-Za-z0-9]{10,40}$/.test(id)) throw new Error('bucket');
      var saved = store('kali_config');
      var cfg = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
      cfg.statsBucket = id;
      store('kali_config', cfg);
      if (window.SITE_CONFIG) window.SITE_CONFIG.statsBucket = id;
      return id;
    });
  }

  var COUNTRY_NAMES = {
    UZ: ['O\'zbekiston', 'Узбекистан'], RU: ['Rossiya', 'Россия'], KZ: ['Qozog\'iston', 'Казахстан'],
    TJ: ['Tojikiston', 'Таджикистан'], KG: ['Qirg\'iziston', 'Кыргызстан'], TM: ['Turkmaniston', 'Туркменистан'],
    AZ: ['Ozarbayjon', 'Азербайджан'], AM: ['Armaniston', 'Армения'], GE: ['Gruziya', 'Грузия'],
    TR: ['Turkiya', 'Турция'], IR: ['Eron', 'Иран'], IQ: ['Iroq', 'Ирак'], AE: ['BAA', 'ОАЭ'],
    SA: ['Saudiya Arabistoni', 'Саудовская Аравия'], IL: ['Isroil', 'Израиль'], PK: ['Pokiston', 'Пакистан'],
    IN: ['Hindiston', 'Индия'], CN: ['Xitoy', 'Китай'], JP: ['Yaponiya', 'Япония'], KR: ['Koreya', 'Корея'],
    US: ['AQSh', 'США'], CA: ['Kanada', 'Канада'], GB: ['Buyuk Britaniya', 'Великобритания'],
    DE: ['Germaniya', 'Германия'], FR: ['Fransiya', 'Франция'], IT: ['Italiya', 'Италия'],
    ES: ['Ispaniya', 'Испания'], NL: ['Niderlandiya', 'Нидерланды'], PL: ['Polsha', 'Польша'],
    UA: ['Ukraina', 'Украина'], BY: ['Belarus', 'Беларусь'], MD: ['Moldova', 'Молдова'],
    LT: ['Litva', 'Литва'], LV: ['Latviya', 'Латвия'], EE: ['Estoniya', 'Эстония'],
    BR: ['Braziliya', 'Бразилия'], AU: ['Avstraliya', 'Австралия'], EG: ['Misr', 'Египет'],
    NG: ['Nigeriya', 'Нигерия'], ZA: ['Janubiy Afrika', 'ЮАР'], XX: ['Noma\'lum', 'Не определена']
  };

  function flag(code) {
    if (!/^[A-Z]{2}$/.test(code || '')) return '🏳️';
    return String.fromCodePoint.apply(null, code.split('').map(function (c) { return 127397 + c.charCodeAt(0); }));
  }
  function countryName(code, lang) {
    var row = COUNTRY_NAMES[code];
    if (!row) return code;
    return row[lang === 'ru' ? 1 : 0];
  }
  function countryInfo(code, lang) {
    return { code: code || 'XX', flag: flag(code), name: countryName(code, lang) };
  }

  window.KaliVisits = {
    getStats: readStats,
    bucket: bucket,
    localOnly: localOnly,
    countryCode: countryCode,
    countryInfo: countryInfo,
    adminEvent: adminEvent,
    createBucket: createBucket,
    pageKey: pageKey,
    recordExtra: recordExtra,
    pageView: track
  };

  function track() {
    var page = pageKey();
    /* Admin sahifasini faqat ega ochganda hisobla */
    if (page === 'admin') {
      var owner = location.hash.replace(/^#/, '') === (window.KALI_OWNER_TOKEN || 'kali-owner');
      try { owner = owner || !!sessionStorage.getItem('kali_admin_auth'); } catch (e) {}
      if (!owner) return;
    }
    var key = SEEN_KEY + page;
    try {
      var last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last < 30000) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch (e) {}
    var extra = visitContext();
    countryCode(function (code) { recordVisit(code, extra); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', track);
  else track();
})();
