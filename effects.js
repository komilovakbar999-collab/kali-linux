/* Qo'shimcha jonli effektlar: kun buyrug'i, raqamlar animatsiyasi */
(function () {
  'use strict';

  var store = window.KaliCommon.store;
  function t(k) { return window.I18N ? window.I18N.t(k) : k; }
  function lang() { return window.I18N ? window.I18N.getLang() : 'uz'; }
  function cmds() {
    var v = store('kali_commands');
    return Array.isArray(v) ? v : (window.LINUX_COMMANDS || []);
  }
  function local(o) { return (o && (o[lang()] || o.uz || o.ru)) || ''; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function dayNumber() {
    var d = new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  function renderDay() {
    var host = document.getElementById('dayCard');
    if (!host) return;
    var list = cmds().filter(function (c) { return c && c.name && local(c.desc); });
    if (!list.length) { host.hidden = true; return; }
    host.hidden = false;
    var c = list[dayNumber() % list.length];
    var date = new Date().toLocaleDateString(lang() === 'ru' ? 'ru-RU' : 'uz-UZ',
      { day: 'numeric', month: 'long', year: 'numeric' });
    host.innerHTML =
      '<div class="day-card__head">' +
        '<span class="day-card__kicker">◆ ' + esc(t('dayKicker')) + '</span>' +
        '<span class="day-card__date">' + esc(date) + '</span>' +
      '</div>' +
      '<div class="day-card__main">' +
        '<div><code class="day-card__cmd">' + esc(c.name) + '</code>' +
          '<p class="day-card__desc">' + esc(local(c.desc)) + '</p>' +
          '<code class="day-card__syntax">' + esc(c.syntax || c.name) + '</code></div>' +
        '<div class="day-card__act">' +
          '<button type="button" class="mini-btn mini-btn--red" data-open="' + esc(c.id) + '">' + esc(t('dayOpen')) + '</button>' +
          '<button type="button" class="mini-btn" data-copy="' + esc(c.syntax || c.name) + '">⧉ ' + esc(t('dayCopy')) + '</button>' +
        '</div>' +
      '</div>';
  }

  function renderArchive() {
    var wrap = document.getElementById('dayArchive');
    var host = document.getElementById('archiveGrid');
    if (!wrap || !host) return;
    var list = cmds().filter(function (c) { return c && c.name && local(c.desc); });
    if (!list.length) { wrap.hidden = true; return; }
    wrap.hidden = false;
    var locale = lang() === 'ru' ? 'ru-RU' : (lang() === 'en' ? 'en-US' : 'uz-UZ');
    var today = dayNumber();
    var html = '';
    for (var i = 0; i < 30; i++) {
      var n = today - i;
      var c = list[((n % list.length) + list.length) % list.length];
      var d = new Date(n * 86400000);
      var label = d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
      html += '<button type="button" class="archive-day' + (i === 0 ? ' is-today' : '') +
        '" data-open="' + esc(c.id) + '">' +
        '<span class="archive-day__date">' + esc(label) + '</span>' +
        '<code class="archive-day__cmd">' + esc(c.name) + '</code>' +
        '<span class="archive-day__desc">' + esc(local(c.desc).slice(0, 48)) + '</span>' +
        '</button>';
    }
    host.innerHTML = html;
  }

  function animateCounters() {
    document.querySelectorAll('.stat-cell strong').forEach(function (el) {
      var target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;
      /* Yashirin tablarda rAF to'xtaydi — haqiqiy qiymatni saqlab qolamiz */
      if (document.visibilityState !== 'visible' || !window.requestAnimationFrame) return;
      var start = null, cancelled = false;
      function cancel() { cancelled = true; }
      document.addEventListener('langchange', cancel, { once: true });
      el.textContent = '0';
      var done = function () { if (!cancelled) el.textContent = target; };
      function step(now) {
        if (cancelled) return;
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / 850);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
        else done();
      }
      requestAnimationFrame(step);
      setTimeout(done, 1200);
    });
  }

  /* Katta banner orqasidagi matritsa yomg'iri */
  function matrixRain() {
    var canvas = document.getElementById('heroMatrix');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (motion && motion.matches) return;
    var glyphs = '0123456789ABCDEF<>/{}[]$#@*+-=:⇄⌁◎◈';
    var size = 15, drops = [], w = 1, h = 1, frame = 0, visible = !document.hidden, onScreen = true, resizeTimer = null;
    function resize() {
      var r = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.floor(r.width));
      h = canvas.height = Math.max(1, Math.floor(r.height));
      drops = [];
      for (var x = 0; x < Math.ceil(w / size); x++) drops.push(Math.random() * -40);
    }
    resize();
    window.addEventListener('resize', function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; }, { threshold: 0 })
        .observe(canvas);
    }
    if (motion && motion.addEventListener) {
      motion.addEventListener('change', function (e) { if (e.matches) { onScreen = false; ctx.clearRect(0, 0, w, h); } else onScreen = true; });
    }
    function draw() {
      frame = requestAnimationFrame(draw);
      if (!visible || !onScreen) return;
      ctx.fillStyle = 'rgba(7,7,7,.13)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = size + 'px ui-monospace, monospace';
      for (var i = 0; i < drops.length; i++) {
        var ch = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        ctx.fillStyle = Math.random() > .975 ? 'rgba(255,130,110,.9)' : 'rgba(239,59,44,.22)';
        ctx.fillText(ch, i * size, drops[i] * size);
        if (drops[i] * size > h && Math.random() > .97) drops[i] = 0;
        else drops[i] += 1;
      }
    }
    frame = requestAnimationFrame(draw);
  }

  /* Kartalarda sichqonga qarab yorug'lik */
  function spotlight() {
    var pending = null, raf = 0;
    document.addEventListener('mousemove', function (e) {
      pending = { x: e.clientX, y: e.clientY, target: e.target };
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var e2 = pending; pending = null;
        if (!e2 || !e2.target || !e2.target.closest) return;
        var el = e2.target.closest('.cmd-card, .tool-card, .stat-cell, .stage, .admin-panel');
        if (!el) return;
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e2.x - r.left) / r.width * 100).toFixed(1) + '%');
        el.style.setProperty('--my', ((e2.y - r.top) / r.height * 100).toFixed(1) + '%');
      });
    }, { passive: true });
  }

  function init() {
    renderDay();
    renderArchive();
    matrixRain();
    spotlight();
    document.addEventListener('langchange', function () { renderDay(); renderArchive(); });
    /* Raqamlar app.js tomonidan to'g'ri qiymat bilan chiqariladi — ularni o'zgartirmaymiz */
    if (location.search.indexOf('animate=1') !== -1) {
      window.addEventListener('load', animateCounters, { once: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
