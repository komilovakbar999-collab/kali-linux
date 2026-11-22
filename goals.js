/* Kunlik maqsadlar + streak, scroll progress va offline indikatori.
 * Mavjud fayllar o'zgartirilmaydi — barcha elementlar dinamik ravishda qo'shiladi. */
(function () {
  'use strict';

  var STORE_KEY = 'kali_goals';
  var LANGS = ['uz', 'ru', 'en'];
  var GOALS = [
    { key: 'commands', goal: 5, label: 'commands' },
    { key: 'labs', goal: 1, label: 'labs' },
    { key: 'quiz', goal: 1, label: 'quiz' }
  ];

  var T = {
    uz: {
      title: 'Kunlik maqsadlar',
      streakHint: 'Ketma-ket kunlar',
      streakDays: 'kun ketma-ket',
      commands: "Buyruqlar ko'rilgan",
      labs: 'Lab yechilgan',
      quiz: 'Test ishlatilgan',
      online: 'ONLINE — kesh ishlaydi',
      offline: 'OFFLINE — kesh ishlaydi'
    },
    ru: {
      title: 'Ежедневные цели',
      streakHint: 'Дни подряд',
      streakDays: 'дней подряд',
      commands: 'Просмотрено команд',
      labs: 'Решено лабораторий',
      quiz: 'Пройдено тестов',
      online: 'ONLINE — кэш работает',
      offline: 'OFFLINE — кэш работает'
    },
    en: {
      title: 'Daily goals',
      streakHint: 'Consecutive days',
      streakDays: 'day streak',
      commands: 'Commands viewed',
      labs: 'Labs solved',
      quiz: 'Quizzes taken',
      online: 'ONLINE — cache works',
      offline: 'OFFLINE — cache works'
    }
  };

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var RING_R = 20;
  var RING_C = 2 * Math.PI * RING_R;

  var state = null;
  var goalNodes = {};
  var streakNum = null;
  var scrollBar = null;
  var scrollQueued = false;
  var badge = null;
  var badgeText = null;
  var labArmed = true;
  var countedQuiz = null;

  var raf = window.requestAnimationFrame || function (cb) {
    return window.setTimeout(function () { cb(Date.now()); }, 16);
  };

  function byId(id) { return document.getElementById(id); }
  function one(selector) {
    try { return document.querySelector(selector); } catch (e) { return null; }
  }
  function node(tag, className) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    return n;
  }
  function svgEl(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  /* XSS: HTML satrlariga faqat esc() orqali o'tkazilgan matn qo'shiladi. */
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function lang() {
    var l = window.I18N && typeof window.I18N.getLang === 'function' ? window.I18N.getLang() : 'uz';
    return LANGS.indexOf(l) !== -1 ? l : 'uz';
  }
  function tr(key) {
    var row = T[lang()] || T.uz;
    return Object.prototype.hasOwnProperty.call(row, key) ? row[key] : (T.uz[key] || key);
  }
  function pageName() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase() || 'index.html';
  }
  function nonneg(value) {
    var n = Math.floor(Number(value));
    return isFinite(n) && n > 0 ? n : 0;
  }
  function pct(value) {
    var n = Math.round(Number(value));
    if (!isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }
  function iso(date) {
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }
  function prevDay(key) {
    var parts = String(key || '').split('-');
    if (parts.length !== 3) return '';
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]) - 1);
    return iso(d);
  }

  /* ==========================================================
     SAQLASH: kali_goals = { days, streak, lastDate }
     ========================================================== */
  function blank() { return { days: {}, streak: 0, lastDate: '' }; }

  function load() {
    var out = blank();
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return out;
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || Array.isArray(data)) return out;

      if (data.days && typeof data.days === 'object' && !Array.isArray(data.days)) {
        Object.keys(data.days).forEach(function (key) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
          if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
          var row = data.days[key];
          if (!row || typeof row !== 'object' || Array.isArray(row)) return;
          out.days[key] = {
            commands: nonneg(row.commands),
            labs: nonneg(row.labs),
            quiz: nonneg(row.quiz)
          };
        });
      }
      out.streak = nonneg(data.streak);
      out.lastDate = typeof data.lastDate === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(data.lastDate) ? data.lastDate : '';
    } catch (e) { return blank(); }
    return out;
  }

  function save() {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify({
        days: state.days,
        streak: state.streak,
        lastDate: state.lastDate
      }));
    } catch (e) { /* kesh o'chirilgan yoki to'la bo'lsa hisob faqat xotirada */ }
  }

  function syncDay() {
    var today = iso(new Date());
    if (state.lastDate === today) return false;
    if (state.lastDate === prevDay(today)) state.streak = nonneg(state.streak) + 1;
    else state.streak = 1;
    state.lastDate = today;
    if (!state.days[today]) state.days[today] = { commands: 0, labs: 0, quiz: 0 };
    return true;
  }

  function record(kind) {
    if (kind !== 'commands' && kind !== 'labs' && kind !== 'quiz') return;
    syncDay();
    var today = iso(new Date());
    var row = state.days[today];
    if (!row || typeof row !== 'object') {
      row = { commands: 0, labs: 0, quiz: 0 };
      state.days[today] = row;
    }
    row[kind] = nonneg(row[kind]) + 1;
    save();
    paintPanel();
  }

  /* ==========================================================
     1) KUNLIK MAQSADLAR PANELI — faqat bosh sahifada
     ========================================================== */
  function buildPanel() {
    if (byId('goalsPanel') || pageName() !== 'index.html') return;
    var main = byId('main') || one('main');
    var anchor = one('.stats-strip') || one('.stats-grid') || one('.stat-cell');
    if (!main && !anchor) return;
    if (anchor && anchor.closest) anchor = anchor.closest('.stats-strip, .stats-grid') || anchor;

    var panel = node('section', 'goals-panel');
    panel.id = 'goalsPanel';
    panel.setAttribute('aria-labelledby', 'goalsPanelTitle');
    panel.innerHTML =
      '<div class="goals-panel__head">' +
        '<h2 class="goals-panel__title" id="goalsPanelTitle">' + esc(tr('title')) + '</h2>' +
        '<div class="goals-streak" id="goalsStreak" title="' + esc(tr('streakHint')) + '">' +
          '<span aria-hidden="true">🔥</span><b>0</b>' +
          '<span class="goals-streak__label">' + esc(tr('streakDays')) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="goals-grid">' +
        GOALS.map(function (g) {
          return '<div class="goal" data-goal="' + esc(g.key) + '">' +
            '<div class="goal__ring" data-ring-for="' + esc(g.key) + '"></div>' +
            '<div class="goal__meta">' +
              '<strong class="goal__label">' + esc(tr(g.label)) + '</strong>' +
              '<span class="goal__count">0 / ' + g.goal + '</span>' +
            '</div></div>';
        }).join('') +
      '</div>';

    GOALS.forEach(function (g) {
      var host = panel.querySelector('[data-ring-for="' + g.key + '"]');
      if (!host) return;
      var svg = svgEl('svg', {
        'class': 'goals-ring', viewBox: '0 0 48 48', focusable: 'false', 'aria-hidden': 'true'
      });
      svg.appendChild(svgEl('circle', { 'class': 'goals-ring__track', cx: 24, cy: 24, r: RING_R }));
      var progress = svgEl('circle', {
        'class': 'goals-ring__progress', cx: 24, cy: 24, r: RING_R,
        'stroke-dasharray': RING_C.toFixed(2), 'stroke-dashoffset': RING_C.toFixed(2)
      });
      svg.appendChild(progress);
      var label = svgEl('text', {
        'class': 'goals-ring__text', x: 24, y: 24, 'text-anchor': 'middle', dy: '.35em'
      });
      label.textContent = '0%';
      svg.appendChild(label);
      host.appendChild(svg);

      var cell = panel.querySelector('.goal[data-goal="' + g.key + '"]');
      goalNodes[g.key] = {
        cell: cell,
        progress: progress,
        text: label,
        count: cell ? cell.querySelector('.goal__count') : null
      };
    });
    streakNum = panel.querySelector('#goalsStreak b');

    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(panel, anchor.nextSibling);
    else main.insertBefore(panel, main.firstChild);
  }

  function paintPanel() {
    if (!state) return;
    var row = state.days[iso(new Date())] || { commands: 0, labs: 0, quiz: 0 };
    GOALS.forEach(function (g) {
      var n = goalNodes[g.key];
      if (!n) return;
      var value = nonneg(row[g.key]);
      var done = pct(value / g.goal * 100);
      n.progress.setAttribute('stroke-dashoffset', (RING_C * (1 - done / 100)).toFixed(2));
      n.text.textContent = done + '%';
      if (n.count) n.count.textContent = value + ' / ' + g.goal;
      if (n.cell) n.cell.classList.toggle('is-done', value >= g.goal);
    });
    if (streakNum) streakNum.textContent = String(nonneg(state.streak));
  }

  function relabel() {
    var title = byId('goalsPanelTitle');
    if (title) title.textContent = tr('title');
    var streak = byId('goalsStreak');
    if (streak) {
      streak.setAttribute('title', tr('streakHint'));
      var label = streak.querySelector('.goals-streak__label');
      if (label) label.textContent = tr('streakDays');
    }
    GOALS.forEach(function (g) {
      var label = one('.goal[data-goal="' + g.key + '"] .goal__label');
      if (label) label.textContent = tr(g.label);
    });
    updateBadge();
  }

  /* ==========================================================
     2) SCROLL PROGRESS — #scrollProgress
     ========================================================== */
  function updateScroll() {
    if (!scrollBar) return;
    var doc = document.documentElement || document.body;
    var max = Math.max(0, (doc.scrollHeight || 0) - (window.innerHeight || 0));
    var y = window.pageYOffset || doc.scrollTop || 0;
    var width = (max > 0 ? pct(y / max * 100) : 0) + '%';
    if (scrollBar.style.width !== width) scrollBar.style.width = width;
  }

  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    raf(function () { scrollQueued = false; updateScroll(); });
  }

  function buildScroll() {
    if (byId('scrollProgress') || !document.body) return;
    scrollBar = node('div');
    scrollBar.id = 'scrollProgress';
    scrollBar.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(scrollBar, document.body.firstChild);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScroll();
  }

  /* ==========================================================
     3) OFFLINE INDIKATORI — #offlineBadge
     ========================================================== */
  function updateBadge() {
    if (!badge || !badgeText) return;
    var online = navigator.onLine !== false;
    badge.classList.toggle('is-online', online);
    badge.classList.toggle('is-offline', !online);
    badgeText.textContent = tr(online ? 'online' : 'offline');
    badge.setAttribute('title', tr(online ? 'online' : 'offline'));
    badge.setAttribute('aria-label', tr(online ? 'online' : 'offline'));
  }

  function buildBadge() {
    if (byId('offlineBadge')) return;
    var right = one('.k-header__right');
    if (!right) return;
    badge = node('span', 'offline-badge');
    badge.id = 'offlineBadge';
    badge.setAttribute('role', 'status');
    badge.setAttribute('aria-live', 'polite');
    badge.innerHTML = '<i class="offline-badge__dot" aria-hidden="true"></i>' +
      '<span class="offline-badge__text"></span>';
    badgeText = badge.querySelector('.offline-badge__text');

    var clock = byId('kaliClock');
    var switcher = right.querySelector('.lang-switch');
    if (clock && clock.parentNode === right) right.insertBefore(badge, clock.nextSibling);
    else if (switcher) right.insertBefore(badge, switcher);
    else right.appendChild(badge);
    updateBadge();
  }

  /* ==========================================================
     KUZATISH: click delegation + MutationObserver
     ========================================================== */
  function onClick(e) {
    if (!e || !e.target || !e.target.closest) return;
    var hit = null;
    try { hit = e.target.closest('[data-open], [data-open-card], [data-copy]'); }
    catch (err) { return; }
    if (hit) record('commands');
  }

  function checkLab() {
    var status = byId('labStatus');
    if (!status) { labArmed = true; return; }
    var text = status.textContent || '';
    var negative = /not\s+correct|incorrect|\u043d\u0435\u0432\u0435\u0440\u043d\u043e|\u043d\u0435\s+\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e|noto\s*['\u2019`]?\s*g\s*['\u2019`]?\s*ri/i.test(text);
    var correct = !negative && /to\s*['\u2019`]?\s*g\s*['\u2019`]?\s*ri|correct|\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e|\u0432\u0435\u0440\u043d\u043e/i.test(text);
    if (correct) {
      if (labArmed) { labArmed = false; record('labs'); }
    } else {
      labArmed = true;
    }
  }

  function checkQuiz() {
    var result = byId('quizResult') || one('.quiz-result');
    if (!result) { countedQuiz = null; return; }
    if (result !== countedQuiz) { countedQuiz = result; record('quiz'); }
  }

  function watch() {
    var check = function () { checkLab(); checkQuiz(); };
    try {
      if ('MutationObserver' in window) {
        var mo = new MutationObserver(check);
        mo.observe(document.body || document.documentElement, {
          childList: true, subtree: true, characterData: true
        });
        return;
      }
    } catch (e) { /* observer ishlamasa poll ishlaydi */ }
    window.setInterval(check, 600);
  }

  function init() {
    state = load();
    syncDay(); /* faqat xotirada yangilanadi; yozish faqat hodisada */
    buildPanel();
    buildBadge();
    buildScroll();
    paintPanel();

    document.addEventListener('click', onClick);
    document.addEventListener('langchange', relabel);
    window.addEventListener('online', updateBadge);
    window.addEventListener('offline', updateBadge);

    checkLab();
    checkQuiz();
    watch();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
