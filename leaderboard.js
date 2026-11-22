/* Anonim leaderboard: faqat {score, total, ts, country}. Ism, IP yoki boshqa identifikator yo'q. */
(function () {
  'use strict';

  var API = 'https://kvdb.io/';
  var KEY = 'leaderboard';
  var LOCAL_KEY = 'kali_leaderboard_local';
  var SENT_KEY = 'kali_leaderboard_sent';
  var TOP = 10;
  var TIMEOUT = 4000;

  var QUIZ_I18N = {
    uz: {
      lbTitle: 'Natijalar jadvali',
      lbSubtitle: 'Faqat eng yaxshi natijalar · anonim',
      lbRank: 'O‘rin',
      lbScore: 'Ball',
      lbCountry: 'Mamlakat',
      lbBest: 'Sizning eng yaxshi:',
      lbBestNone: 'Sizning eng yaxshi: —',
      lbEmpty: 'Hali natija yo‘q.',
      lbClose: 'Yopish',
      lbLoading: 'Yuklanmoqda...',
      lbLocal: 'Mahalliy rejim',
      lbAnon: 'Jadvalga faqat ball va mamlakat kodi yoziladi — ism yoki IP saqlanmaydi.',
      lbBadgeBronze: 'Bronza',
      lbBadgeSilver: 'Kumush',
      lbBadgeGold: 'Oltin',
      lbDialogLabel: 'Natijalar jadvali oynasi'
    },
    ru: {
      lbTitle: 'Таблица результатов',
      lbSubtitle: 'Только лучшие результаты · анонимно',
      lbRank: 'Место',
      lbScore: 'Баллы',
      lbCountry: 'Страна',
      lbBest: 'Ваш лучший:',
      lbBestNone: 'Ваш лучший: —',
      lbEmpty: 'Результатов пока нет.',
      lbClose: 'Закрыть',
      lbLoading: 'Загрузка...',
      lbLocal: 'Локальный режим',
      lbAnon: 'В таблицу записываются только баллы и код страны — имя и IP не сохраняются.',
      lbBadgeBronze: 'Бронза',
      lbBadgeSilver: 'Серебро',
      lbBadgeGold: 'Золото',
      lbDialogLabel: 'Окно таблицы результатов'
    },
    en: {
      lbTitle: 'Leaderboard',
      lbSubtitle: 'Best results only · anonymous',
      lbRank: 'Rank',
      lbScore: 'Score',
      lbCountry: 'Country',
      lbBest: 'Your best:',
      lbBestNone: 'Your best: —',
      lbEmpty: 'No results yet.',
      lbClose: 'Close',
      lbLoading: 'Loading...',
      lbLocal: 'Local mode',
      lbAnon: 'Only the score and country code are stored — no name or IP address.',
      lbBadgeBronze: 'Bronze',
      lbBadgeSilver: 'Silver',
      lbBadgeGold: 'Gold',
      lbDialogLabel: 'Leaderboard dialog'
    }
  };

  var currentModal = null;
  var previousFocus = null;
  var onKey = null;

  function lang() {
    var l = window.I18N && typeof window.I18N.getLang === 'function' ? window.I18N.getLang() : 'uz';
    return Object.prototype.hasOwnProperty.call(QUIZ_I18N, l) ? l : 'uz';
  }

  function t(key) {
    var l = lang();
    if (window.I18N && typeof window.I18N.t === 'function' && window.I18N.dict &&
        window.I18N.dict[l] && Object.prototype.hasOwnProperty.call(window.I18N.dict[l], key)) {
      return window.I18N.t(key);
    }
    var row = QUIZ_I18N[l] || QUIZ_I18N.uz;
    if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
    return Object.prototype.hasOwnProperty.call(QUIZ_I18N.uz, key) ? QUIZ_I18N.uz[key] : key;
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function readJson(key, fallback) {
    try {
      var raw = JSON.parse(localStorage.getItem(key) || '');
      return raw == null ? fallback : raw;
    } catch (e) { return fallback; }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function cleanRecord(row) {
    if (!row || typeof row !== 'object') return null;
    var score = Math.floor(Number(row.score));
    var total = Math.floor(Number(row.total));
    var ts = Number(row.ts);
    if (!isFinite(score) || score < 0 || !isFinite(total) || total <= 0 || !isFinite(ts) || ts <= 0) return null;
    if (score > total) score = total;
    return {
      score: score,
      total: total,
      ts: ts,
      country: /^[A-Z]{2}$/.test(row.country || '') ? row.country : 'XX'
    };
  }

  function compare(a, b) {
    return (b.score / b.total) - (a.score / a.total) || (b.ts - a.ts);
  }

  function unique(list) {
    var seen = {}, out = [];
    list.forEach(function (row) {
      var rec = cleanRecord(row);
      if (!rec) return;
      var key = rec.score + '/' + rec.total + '/' + rec.ts + '/' + rec.country;
      if (seen[key]) return;
      seen[key] = 1;
      out.push(rec);
    });
    return out.sort(compare);
  }

  function localRecords() {
    var raw = readJson(LOCAL_KEY, []);
    return Array.isArray(raw) ? unique(raw).slice(0, TOP) : [];
  }

  function saveLocal(list) {
    writeJson(LOCAL_KEY, unique(list).slice(0, TOP));
  }

  function sentBest() {
    var raw = readJson(SENT_KEY, null);
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : null;
  }

  function percent(rec) { return Math.round(rec.score / rec.total * 100); }

  function badge(pct) {
    if (pct >= 71) return 'gold';
    if (pct >= 41) return 'silver';
    return 'bronze';
  }

  function bucket() {
    var value = (window.SITE_CONFIG && window.SITE_CONFIG.statsBucket) || '';
    if (!value) {
      var cfg = readJson('kali_config', null);
      if (cfg && typeof cfg === 'object' && !Array.isArray(cfg)) value = cfg.statsBucket || '';
    }
    return String(value || '').replace(/[^A-Za-z0-9_-]/g, '');
  }

  function countryCode() {
    var cached = readJson('kali_visit_country', null);
    if (cached && typeof cached === 'object' && /^[A-Z]{2}$/.test(cached.code || '')) return cached.code;
    var visits = window.KaliVisits;
    if (visits && typeof visits.countryInfo === 'function') {
      try {
        var info = visits.countryInfo();
        if (info && /^[A-Z]{2}$/.test(info.code || '')) return info.code;
      } catch (e) {}
    }
    return 'XX';
  }

  function fetchTimeout(url, options) {
    if (!window.fetch) return Promise.reject(new Error('unsupported'));
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var opts = Object.assign({ cache: 'no-store' }, options || {});
    if (controller) opts.signal = controller.signal;
    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        if (controller) { try { controller.abort(); } catch (e) {} }
        reject(new Error('timeout'));
      }, TIMEOUT);
      window.fetch(url, opts).then(function (res) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(res);
      }, function (err) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  function endpoint() {
    var id = bucket();
    return id ? API + encodeURIComponent(id) + '/' + KEY : '';
  }

  function loadRemote() {
    var url = endpoint();
    if (!url) return Promise.reject(new Error('no bucket'));
    return fetchTimeout(url).then(function (res) {
      if (!res || !res.ok) throw new Error('http');
      return res.json();
    }).then(function (data) {
      if (!Array.isArray(data)) throw new Error('shape');
      return unique(data).slice(0, TOP);
    });
  }

  function saveRemote(list) {
    var url = endpoint();
    if (!url) return Promise.reject(new Error('no bucket'));
    return fetchTimeout(url, { method: 'PUT', body: JSON.stringify(unique(list).slice(0, 20)) })
      .then(function (res) {
        if (!res || !res.ok) throw new Error('http');
        return true;
      });
  }

  function load() {
    return loadRemote().then(function (rows) {
      return rows.length ? rows : localRecords();
    }, function () {
      return localRecords();
    });
  }

  function submit(score, total) {
    var s = Math.floor(Number(score));
    var n = Math.floor(Number(total));
    if (!isFinite(s) || !isFinite(n) || s < 0 || n <= 0) return Promise.resolve(false);
    if (s > n) s = n;
    var pct = Math.round(s / n * 100);
    var sent = sentBest();
    if (sent && isFinite(Number(sent.pct)) && pct <= Number(sent.pct)) return Promise.resolve(false);

    var rec = { score: s, total: n, ts: Date.now(), country: countryCode() };
    var local = localRecords();
    local.push(rec);
    saveLocal(local);
    writeJson(SENT_KEY, { pct: pct, score: s, total: n, ts: rec.ts });

    return load().then(function (rows) {
      rows.push(rec);
      return saveRemote(rows);
    }).then(function () {
      return true;
    }, function () {
      /* Tarmoq ishlamasa mahalliy nusxa saqlanadi — foydalanuvchiga xato ko'rsatilmaydi. */
      return true;
    });
  }

  function badgeName(kind) {
    if (kind === 'gold') return t('lbBadgeGold');
    if (kind === 'silver') return t('lbBadgeSilver');
    return t('lbBadgeBronze');
  }

  function bestLine() {
    var best = sentBest();
    if (!best || !isFinite(Number(best.score)) || !isFinite(Number(best.total))) return t('lbBestNone');
    return t('lbBest') + ' ' + Number(best.score) + '/' + Number(best.total);
  }

  function renderList(target, rows, offline) {
    if (!rows.length) {
      target.innerHTML = '<p class="lb-empty">' + esc(t('lbEmpty')) + '</p>';
      return;
    }
    var html = '<ol class="lb-list">' + rows.map(function (row, index) {
      var pct = percent(row);
      var kind = badge(pct);
      return '<li class="lb-row">' +
        '<span class="lb-rank">' + (index + 1) + '</span>' +
        '<span class="lb-row__score">' + esc(row.score) + ' / ' + esc(row.total) + '</span>' +
        '<span class="lb-row__pct">' + pct + '%</span>' +
        '<span class="lb-badge lb-badge--' + kind + '">' + esc(badgeName(kind)) + '</span>' +
        '<span class="lb-row__country">' + esc(row.country) + '</span>' +
        '</li>';
    }).join('') + '</ol>';
    if (offline) html += '<p class="lb-note">' + esc(t('lbLocal')) + '</p>';
    target.innerHTML = html;
  }

  function close() {
    if (!currentModal) return;
    if (onKey) document.removeEventListener('keydown', onKey, true);
    var modal = currentModal;
    currentModal = null;
    onKey = null;
    if (modal.parentNode) modal.parentNode.removeChild(modal);
    if (previousFocus && typeof previousFocus.focus === 'function') {
      try { previousFocus.focus(); } catch (e) {}
    }
    previousFocus = null;
  }

  function show() {
    if (currentModal) close();
    previousFocus = document.activeElement;

    var backdrop = document.createElement('div');
    backdrop.className = 'lb-backdrop';
    var modal = document.createElement('div');
    modal.className = 'lb-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'lbTitle');
    modal.setAttribute('aria-describedby', 'lbSubtitle');
    modal.setAttribute('tabindex', '-1');
    modal.innerHTML =
      '<div class="lb-head">' +
        '<div><h2 id="lbTitle">' + esc(t('lbTitle')) + '</h2>' +
        '<p id="lbSubtitle">' + esc(t('lbSubtitle')) + '</p></div>' +
        '<button type="button" class="lb-close" data-lb-close aria-label="' + esc(t('lbClose')) + '">✕</button>' +
      '</div>' +
      '<div class="lb-body">' +
        '<p class="lb-best">' + esc(bestLine()) + '</p>' +
        '<div class="lb-content" role="status" aria-live="polite">' + esc(t('lbLoading')) + '</div>' +
      '</div>' +
      '<div class="lb-foot"><span>' + esc(t('lbAnon')) + '</span>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-lb-close>' + esc(t('lbClose')) + '</button>' +
      '</div>';
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    currentModal = backdrop;
    modal.setAttribute('aria-label', t('lbDialogLabel'));

    var content = modal.querySelector('.lb-content');
    var closeButtons = modal.querySelectorAll('[data-lb-close]');
    closeButtons.forEach(function (btn) { btn.addEventListener('click', close); });
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });

    onKey = function (e) {
      if (!currentModal) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var focusable = modal.querySelectorAll('button, [href], select, input, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    closeButtons[0].focus();

    load().then(function (rows) {
      if (!currentModal || !content) return;
      renderList(content, rows, !endpoint());
    }, function () {
      if (!currentModal || !content) return;
      renderList(content, localRecords(), true);
    });
  }

  window.KaliLeaderboard = { submit: submit, show: show };
})();
