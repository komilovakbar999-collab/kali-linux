/* Gamify qo'shimchasi: konfetti, progress halqalari, yutuq nishonlari, faollik xaritasi.
 * Mavjud fayllar o'zgartirilmaydi — barcha elementlar dinamik ravishda qo'shiladi. */
(function () {
  'use strict';

  var LANGS = ['uz', 'ru', 'en'];

  var T = {
    uz: {
      badgeTitle: 'Yutuq nishonlari',
      lab1: 'Birinchi lab', lab5: '5 ta lab', lab20: '20 ta lab',
      cards10: '10 ta karta', quiz100: '100% test',
      labs: 'lab', cards: 'karta', quiz: 'test',
      heatTitle: 'Faollik xaritasi', visit: 'tashrif', visits: 'tashrif'
    },
    ru: {
      badgeTitle: 'Значки достижений',
      lab1: 'Первая лаборатория', lab5: '5 лабораторий', lab20: '20 лабораторий',
      cards10: '10 карточек', quiz100: '100% тест',
      labs: 'лаб.', cards: 'карточек', quiz: 'тест',
      heatTitle: 'Карта активности', visit: 'посещение', visits: 'посещений'
    },
    en: {
      badgeTitle: 'Achievement badges',
      lab1: 'First lab', lab5: '5 labs', lab20: '20 labs',
      cards10: '10 cards', quiz100: '100% quiz',
      labs: 'labs', cards: 'cards', quiz: 'quiz',
      heatTitle: 'Activity map', visit: 'visit', visits: 'visits'
    }
  };

  function byId(id) { return document.getElementById(id); }
  function one(selector) {
    try { return document.querySelector(selector); } catch (e) { return null; }
  }
  function all(selector) {
    try { return document.querySelectorAll(selector); } catch (e) { return []; }
  }
  function node(tag, className) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    return n;
  }
  function setText(n, value) {
    if (n) n.textContent = String(value == null ? '' : value);
  }
  /* XSS: dinamik matn faqat textContent / setAttribute orqali, HTML satrlari esc bilan */
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
  function clamp(value) {
    var n = Math.round(Number(value));
    if (!isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }
  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) { return fallback; }
  }
  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function pageName() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return p || 'index.html';
  }
  function isIndexOrLab() { return /^(index|lab)\.html$/.test(pageName()); }

  var raf = window.requestAnimationFrame || function (cb) {
    return window.setTimeout(function () { cb(Date.now()); }, 16);
  };
  var caf = window.cancelAnimationFrame || function (id) { window.clearTimeout(id); };

  /* ==========================================================
     1) KONFETTI — qizil / oq / oltin, 1.6 s, ikki chaqiruvdan ko'p emas
     ========================================================== */
  var MAX_BURSTS = 2;
  var COOLDOWN = 1800;
  var DURATION = 1600;
  var COLORS = ['#ef3b2c', '#ff5a45', '#ffffff', '#f5b942', '#ffd97a'];

  var burstCount = 0;
  var lastBurstAt = -Infinity;
  var signatures = {};
  var canvas = null;
  var ctx = null;
  var particles = [];
  var rafId = 0;
  var burstStart = 0;
  var viewW = 0;
  var viewH = 0;
  var resizeBound = false;

  function resizeCanvas() {
    if (!canvas) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    viewW = window.innerWidth || 1;
    viewH = window.innerHeight || 1;
    canvas.width = Math.max(1, Math.round(viewW * dpr));
    canvas.height = Math.max(1, Math.round(viewH * dpr));
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeCanvas() {
    if (canvas || !document.body) return;
    canvas = node('canvas', 'gamify-confetti');
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    ctx = canvas.getContext ? canvas.getContext('2d') : null;
    resizeCanvas();
    if (!resizeBound) {
      window.addEventListener('resize', resizeCanvas, { passive: true });
      resizeBound = true;
    }
  }

  function launch() {
    if (reduceMotion()) return;
    makeCanvas();
    if (!ctx) return;
    particles = [];
    var i, count = 90;
    for (i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * viewW,
        y: -20 - Math.random() * viewH * 0.45,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 1.6 + Math.random() * 3.4,
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.28,
        phase: Math.random() * 1000,
        round: Math.random() > 0.72,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
    burstStart = 0;
    if (rafId) caf(rafId);
    rafId = raf(frame);
  }

  function frame(ts) {
    if (!ctx || !canvas) return;
    if (!burstStart) burstStart = ts;
    var elapsed = ts - burstStart;
    var t = elapsed / DURATION;
    if (t >= 1) { finishBurst(); return; }

    ctx.clearRect(0, 0, viewW, viewH);
    var fade = t <= 0.55 ? 1 : Math.max(0, 1 - (t - 0.55) / 0.45);
    var i, p;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      p.vy += 0.09;
      p.x += p.vx + Math.sin((elapsed + p.phase) / 240) * 0.4;
      p.y += p.vy;
      p.rot += p.spin;
      if (p.y > viewH + 24) p.y = -20;
      ctx.globalAlpha = fade;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    rafId = raf(frame);
  }

  function finishBurst() {
    if (rafId) { caf(rafId); rafId = 0; }
    if (ctx) ctx.clearRect(0, 0, viewW, viewH);
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    canvas = null;
    ctx = null;
    particles = [];
    burstStart = 0;
  }

  function fire(reason, signature) {
    if (!signature || burstCount >= MAX_BURSTS) return;
    if (signatures[reason] === signature) return;
    var now = Date.now();
    if (now - lastBurstAt < COOLDOWN) return;
    signatures[reason] = signature;
    burstCount += 1;
    lastBurstAt = now;
    launch();
  }

  /* ==========================================================
     2) PROGRESS HALQALARI — eski barlar saqlanadi, 300 ms da yangilanadi
     ========================================================== */
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var RING_R = 18;
  var RING_C = 2 * Math.PI * RING_R;

  var RINGS = [
    { id: 'lab', bar: '#labProgressBar', text: '#labProgressText', host: '#labProgressText' },
    { id: 'learn', bar: '#progressBar', text: '#progressText', alt: '#progressCount', host: '#progressText' },
    { id: 'learnAlt', bar: '#learnProgress, .progress', text: '#learnProgressText', host: '#learnProgressText, .progress' },
    { id: 'quiz', bar: '#quizBar', text: '#quizStep', host: '.quiz-label' },
    { id: 'flash', bar: '#fcProgressBar', text: '#fcProgressText', host: '.fc-progress__top' }
  ];
  var ringStates = [];

  function svgEl(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }

  function makeRing(cfg, bar) {
    var host = one(cfg.host) ||
      (bar && bar.parentNode && bar.parentNode.parentNode) ||
      (bar && bar.parentNode);
    if (!host || host.querySelector('.gamify-ring-wrap')) return null;
    if (bar) bar.setAttribute('data-gamify-ring-for', cfg.id);

    var wrap = node('span', 'gamify-ring-wrap');
    wrap.setAttribute('aria-hidden', 'true');
    var svg = svgEl('svg', {
      'class': 'gamify-ring', viewBox: '0 0 44 44', focusable: 'false', 'aria-hidden': 'true'
    });
    svg.appendChild(svgEl('circle', {
      'class': 'gamify-ring__track', cx: 22, cy: 22, r: RING_R
    }));
    var progress = svgEl('circle', {
      'class': 'gamify-ring__progress', cx: 22, cy: 22, r: RING_R,
      'stroke-dasharray': RING_C.toFixed(2), 'stroke-dashoffset': RING_C.toFixed(2)
    });
    svg.appendChild(progress);
    var label = svgEl('text', {
      'class': 'gamify-ring__text', x: 22, y: 22, 'text-anchor': 'middle', dy: '.35em'
    });
    label.textContent = '0%';
    svg.appendChild(label);
    wrap.appendChild(svg);
    host.appendChild(wrap);

    return {
      id: cfg.id,
      bar: bar,
      text: one(cfg.text),
      alt: cfg.alt ? one(cfg.alt) : null,
      progress: progress,
      label: label,
      pct: 0,
      last: -1
    };
  }

  function buildRings() {
    RINGS.forEach(function (cfg) {
      var bar = one(cfg.bar);
      if (!bar || bar.getAttribute('data-gamify-ring-for')) return;
      var state = makeRing(cfg, bar);
      if (state) ringStates.push(state);
    });
  }

  function parseRatio(text) {
    var m = String(text || '').match(/(\d+(?:\.\d+)?)\s*[\/\u0447]\s*(\d+(?:\.\d+)?)/);
    if (!m) return NaN;
    var a = Number(m[1]), b = Number(m[2]);
    if (!isFinite(a) || !isFinite(b) || b <= 0) return NaN;
    return a / b * 100;
  }

  function ringPercent(state) {
    var value = NaN;
    if (state.bar && state.bar.style && /%$/.test(state.bar.style.width || '')) {
      value = parseFloat(state.bar.style.width);
    }
    if (!isFinite(value) && state.bar && state.bar.getAttribute) {
      var now = state.bar.getAttribute('aria-valuenow');
      if (now !== null) value = Number(now);
    }
    var text = state.text ? state.text.textContent : '';
    if (!isFinite(value)) {
      var m = String(text).match(/(\d+(?:\.\d+)?)\s*%/);
      if (m) value = Number(m[1]);
    }
    if (!isFinite(value)) value = parseRatio(text);
    if (!isFinite(value)) value = parseRatio(state.alt ? state.alt.textContent : '');
    return clamp(value);
  }

  function updateRings() {
    ringStates.forEach(function (state) {
      var pct = ringPercent(state);
      state.pct = pct;
      if (pct === state.last) return;
      state.last = pct;
      state.progress.setAttribute('stroke-dashoffset', (RING_C * (1 - pct / 100)).toFixed(2));
      state.label.textContent = pct + '%';
    });
  }

  /* ==========================================================
     3) YUTUQ NISHONLARI
     ========================================================== */
  function countLabs() {
    var data = readJSON('kali_lab_progress', {});
    var total = 0;
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      Object.keys(data).forEach(function (k) {
        var e = data[k];
        if (e && typeof e === 'object' && e.solved) total += 1;
      });
    }
    return total;
  }
  function countCards() {
    var data = readJSON('kali_flash_progress', {});
    var total = 0;
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      Object.keys(data).forEach(function (k) {
        var e = data[k];
        if (e && typeof e === 'object' && (Number(e.reps) > 0 || Number(e.box) > 0)) total += 1;
      });
    }
    return total;
  }
  function quizPercent() {
    var best = readJSON('kali_quiz_best', null);
    if (!best || typeof best !== 'object' || Array.isArray(best)) return 0;
    return clamp(best.pct);
  }

  var BADGES = [
    { icon: '\uD83C\uDFAF', key: 'lab1', goal: 1, unit: 'labs', value: countLabs },
    { icon: '\uD83C\uDFC5', key: 'lab5', goal: 5, unit: 'labs', value: countLabs },
    { icon: '\uD83D\uDC51', key: 'lab20', goal: 20, unit: 'labs', value: countLabs },
    { icon: '\uD83D\uDCDA', key: 'cards10', goal: 10, unit: 'cards', value: countCards },
    { icon: '\u2B50', key: 'quiz100', goal: 100, unit: 'quiz', value: quizPercent }
  ];
  var badgePanel = null;
  var badgeHeading = null;

  function buildBadges() {
    if (byId('gamifyBadges') || !isIndexOrLab()) return;
    var panel = node('section', 'gamify-panel gamify-badges');
    panel.id = 'gamifyBadges';
    badgeHeading = node('h2', 'gamify-panel__title');
    badgeHeading.textContent = tr('badgeTitle');
    var list = node('div', 'gamify-badges__list');
    list.innerHTML = BADGES.map(function (b) {
      return '<div class="gamify-badge is-locked" data-goal="' + Number(b.goal) + '">' +
        '<span class="gamify-badge__icon">' + b.icon + '</span>' +
        '<span class="gamify-badge__name">' + esc(tr(b.key)) + '</span>' +
        '<span class="gamify-badge__meta"></span></div>';
    }).join('');
    panel.appendChild(badgeHeading);
    panel.appendChild(list);

    var nodes = list.querySelectorAll('.gamify-badge');
    BADGES.forEach(function (b, i) {
      b.node = nodes[i] || null;
      b.metaNode = b.node ? b.node.querySelector('.gamify-badge__meta') : null;
      b.nameNode = b.node ? b.node.querySelector('.gamify-badge__name') : null;
    });

    var anchor = one('.progress-panel') || one('.stats-strip') || one('.stats-grid');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(panel, anchor.nextSibling);
    else {
      var main = byId('main') || one('main');
      if (main) main.appendChild(panel);
    }
    badgePanel = panel;
  }

  function updateBadges() {
    if (!badgePanel) return;
    if (badgeHeading) badgeHeading.textContent = tr('badgeTitle');
    BADGES.forEach(function (b) {
      var value = clamp(Math.max(0, Math.floor(Number(b.value()) || 0)));
      var earned = value >= b.goal;
      if (b.nameNode) b.nameNode.textContent = tr(b.key);
      if (b.metaNode) b.metaNode.textContent = value + ' / ' + b.goal + ' ' + tr(b.unit);
      if (b.node) {
        b.node.classList.toggle('is-earned', earned);
        b.node.classList.toggle('is-locked', !earned);
        b.node.setAttribute('title', tr(b.key) + ' — ' + value + ' / ' + b.goal + ' ' + tr(b.unit));
      }
    });
  }

  /* ==========================================================
     4) FAOLLIK XARITASI — 12 hafta × 7 kun
     ========================================================== */
  var heatGrid = null;
  var heatHeading = null;
  var heatDays = null;

  function isoDay(date) { return date.toISOString().slice(0, 10); }

  function buildHeatmap() {
    if (byId('gamifyHeatmap')) return;
    var page = pageName();
    if (page !== 'index.html' && page !== 'admin.html') return;

    var panel = node('section', 'gamify-panel gamify-heat');
    panel.id = 'gamifyHeatmap';
    heatHeading = node('h2', 'gamify-panel__title');
    heatHeading.textContent = tr('heatTitle');
    var grid = node('div', 'gamify-heat__grid');
    grid.setAttribute('role', 'img');
    grid.setAttribute('aria-label', tr('heatTitle'));

    var now = new Date();
    var today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    var start = new Date(today.getTime() - (today.getUTCDay() + 77) * 864e5);
    var col, row;
    for (col = 0; col < 12; col++) {
      var column = node('div', 'gamify-heat__col');
      for (row = 0; row < 7; row++) {
        var date = new Date(start.getTime() + (col * 7 + row) * 864e5);
        var key = isoDay(date);
        var cell = node('i', 'gamify-heat__cell gamify-heat__cell--l0');
        cell.setAttribute('data-date', key);
        cell.setAttribute('title', key + ': 0 ' + tr('visits'));
        if (date.getTime() > today.getTime()) cell.classList.add('is-future');
        column.appendChild(cell);
      }
      grid.appendChild(column);
    }
    panel.appendChild(heatHeading);
    panel.appendChild(grid);

    var anchor = one('#gamifyBadges') || one('.dash-grid') || one('.stats-strip') || one('.stats-grid');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(panel, anchor.nextSibling);
    else {
      var main = byId('main') || one('main');
      if (main) main.appendChild(panel);
    }
    heatGrid = grid;
  }

  function fillHeatmap(days) {
    if (!heatGrid) return;
    if (days !== null && days !== undefined) heatDays = days;
    days = heatDays;
    var map = {};
    if (days && typeof days === 'object' && !Array.isArray(days)) {
      Object.keys(days).forEach(function (k) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) return;
        if (k === '__proto__' || k === 'constructor' || k === 'prototype') return;
        var n = Math.floor(Number(days[k]));
        if (isFinite(n) && n > 0) map[k] = n;
      });
    }
    var cells = heatGrid.querySelectorAll('.gamify-heat__cell');
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var key = cell.getAttribute('data-date') || '';
      var count = map[key] || 0;
      var level = count === 0 ? 0 : (count < 3 ? 1 : (count < 6 ? 2 : (count < 11 ? 3 : 4)));
      var cls = 'gamify-heat__cell gamify-heat__cell--l' + level;
      if (cell.classList.contains('is-future')) cls += ' is-future';
      cell.className = cls;
      cell.setAttribute('title', key + ': ' + count + ' ' + tr(count === 1 ? 'visit' : 'visits'));
    }
  }

  function loadHeatmap() {
    if (!heatGrid) return;
    var api = window.KaliVisits;
    if (!api || typeof api.getStats !== 'function') return;
    var result = null;
    try { result = api.getStats(); } catch (e) { return; }
    if (!result) return;
    if (typeof result.then !== 'function') {
      if (typeof result === 'object') fillHeatmap(result.days);
      return;
    }
    result.then(function (stats) {
      fillHeatmap(stats && typeof stats === 'object' ? stats.days : null);
    }).catch(function () { /* API bo'lmasa bo'sh xarita qoladi */ });
  }

  /* ==========================================================
     KUZATISH: MutationObserver + IntersectionObserver + 300 ms poll
     ========================================================== */
  var lastLabSig = '';
  var lastQuizSig = '';
  var perfectSeen = {};

  function currentLabSig() {
    var status = byId('labStatus');
    var text = status ? (status.textContent || '') : '';
    var correct = /\bto\s*['\u2019`]?\s*g\s*['\u2019`]?\s*ri\b|\bcorrect\b|\u0432\u0435\u0440\u043d\u043e|tugallandi|complete|ajoyib/i.test(text);
    return countLabs() + '|' + (correct ? text.slice(0, 60) : '');
  }

  function currentQuizSig() {
    var result = one('.quiz-result') || byId('quizResult');
    return result ? String(result.textContent || '').slice(0, 80) : '';
  }

  function evaluate() {
    var labSig = currentLabSig();
    if (labSig !== lastLabSig) {
      var nowParts = labSig.split('|');
      var oldParts = lastLabSig.split('|');
      if (Number(nowParts[0]) > Number(oldParts[0]) || (nowParts[1] && nowParts[1] !== oldParts[1])) {
        fire('lab', labSig);
      }
      lastLabSig = labSig;
    }

    var quizSig = currentQuizSig();
    if (quizSig && quizSig !== lastQuizSig) fire('quiz', quizSig);
    lastQuizSig = quizSig;

    ringStates.forEach(function (state) {
      if (state.pct >= 100 && !perfectSeen[state.id]) {
        perfectSeen[state.id] = true;
        fire('perfect-' + state.id, 'perfect-' + state.id);
      }
    });
  }

  function watch() {
    var targets = [
      byId('labStatus'), byId('labProgressText'), byId('progressText'),
      byId('quizStep'), byId('quizQuestion'), byId('fcProgressText')
    ].filter(Boolean);

    if ('MutationObserver' in window && targets.length) {
      var mo = new MutationObserver(function () { evaluate(); });
      targets.forEach(function (target) {
        mo.observe(target, {
          childList: true, subtree: true, characterData: true,
          attributes: true, attributeFilter: ['style', 'class']
        });
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        var hit = false;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-gamify-inview', '1');
            hit = true;
            io.unobserve(entry.target);
          }
        });
        if (hit) evaluate();
      }, { threshold: 0.25 });
      ['.progress-panel', '.quiz-card', '.stats-strip', '.fc-progress'].forEach(function (sel) {
        all(sel).forEach(function (target) { io.observe(target); });
      });
    }
  }

  function init() {
    buildRings();
    buildBadges();
    buildHeatmap();

    updateRings();
    ringStates.forEach(function (state) {
      if (state.pct >= 100) perfectSeen[state.id] = true;
    });
    updateBadges();
    loadHeatmap();

    lastLabSig = currentLabSig();
    lastQuizSig = currentQuizSig();
    watch();

    window.setInterval(function () {
      updateRings();
      updateBadges();
      evaluate();
    }, 300);

    document.addEventListener('langchange', function () {
      if (heatHeading) heatHeading.textContent = tr('heatTitle');
      if (heatGrid) heatGrid.setAttribute('aria-label', tr('heatTitle'));
      updateBadges();
      fillHeatmap(heatDays);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
