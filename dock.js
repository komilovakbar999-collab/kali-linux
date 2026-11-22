/* Kali Linux — qo'shimcha UX: suzuvchi panel, 3D egilish,
 * kun buyruqlari karuseli va sintaksis ranglari.
 * Mavjud elementlarga faqat xatti-harakat qo'shadi, ularni o'zgartirmaydi. */
'use strict';

(function () {
  if (window.__KALI_DOCK_LOADED) return;
  window.__KALI_DOCK_LOADED = true;

  var TILT_SELECTOR = '.cmd-card, .tool-card, .hub-card, .stage';
  var MAX_TILT = 8;

  var LABELS = {
    uz: {
      dock: 'Tezkor panel',
      search: 'Tezkor qidiruv (Ctrl+K)',
      saved: 'Saqlangan buyruqlar',
      help: 'Yordam (?)',
      top: 'Yuqoriga',
      install: "Ilovani o'rnatish",
      prev: 'Oldingi',
      next: 'Keyingi',
      prevLabel: '‹ Oldingi',
      nextLabel: 'Keyingi ›',
      day: 'Kun buyrug\'i'
    },
    ru: {
      dock: 'Быстрая панель',
      search: 'Быстрый поиск (Ctrl+K)',
      saved: 'Избранные команды',
      help: 'Помощь (?)',
      top: 'Наверх',
      install: 'Установить приложение',
      prev: 'Предыдущий',
      next: 'Следующий',
      prevLabel: '‹ Назад',
      nextLabel: 'Вперёд ›',
      day: 'Команда дня'
    },
    en: {
      dock: 'Quick dock',
      search: 'Quick search (Ctrl+K)',
      saved: 'Saved commands',
      help: 'Help (?)',
      top: 'Back to top',
      install: 'Install app',
      prev: 'Previous',
      next: 'Next',
      prevLabel: '‹ Previous',
      nextLabel: 'Next ›',
      day: 'Command of the day'
    }
  };

  var ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    saved: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.4 9.1a2.7 2.7 0 1 1 4.2 2.3c-.9.6-1.6 1.1-1.6 2.3"/><circle cx="12" cy="17.2" r="1" fill="currentColor" stroke="none"/></svg>',
    top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>'
  };

  function ready (fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  function lang () {
    try {
      if (window.I18N && typeof window.I18N.getLang === 'function') {
        var code = window.I18N.getLang();
        if (LABELS[code]) return code;
      }
    } catch (e) {}
    var htmlLang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    return LABELS[htmlLang] ? htmlLang : 'uz';
  }

  function t (key) {
    var pack = LABELS[lang()] || LABELS.uz;
    return pack[key] || LABELS.uz[key] || key;
  }

  function reducedMotion () {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ---------- 1) Suzuvchi tezkor panel ---------- */
  var dock = null;

  function makeDockButton (action) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dock-btn dock-btn--' + action;
    btn.setAttribute('data-dock', action);
    btn.setAttribute('aria-label', t(action));
    btn.setAttribute('title', t(action));
    btn.setAttribute('data-tip', t(action));
    btn.innerHTML = ICONS[action];
    return btn;
  }

  function updateDockLabels () {
    if (!dock) return;
    var buttons = dock.querySelectorAll('[data-dock]');
    for (var i = 0; i < buttons.length; i++) {
      var action = buttons[i].getAttribute('data-dock');
      var label = t(action);
      buttons[i].setAttribute('aria-label', label);
      buttons[i].setAttribute('title', label);
      buttons[i].setAttribute('data-tip', label);
    }
  }

  function fireHelp () {
    var ev;
    try {
      ev = new KeyboardEvent('keydown', { key: '?', bubbles: true, cancelable: true });
    } catch (err) {
      ev = document.createEvent('Event');
      ev.initEvent('keydown', true, true);
      ev.key = '?';
    }
    document.dispatchEvent(ev);
  }

  function activate (action) {
    if (action === 'search') {
      var paletteBtn = document.getElementById('paletteOpen');
      if (paletteBtn) { paletteBtn.click(); return; }
      var keyEv;
      try {
        keyEv = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true, cancelable: true });
      } catch (err) {
        keyEv = document.createEvent('Event');
        keyEv.initEvent('keydown', true, true);
        keyEv.key = 'k';
        keyEv.ctrlKey = true;
      }
      document.dispatchEvent(keyEv);
      var input = document.querySelector('#paletteInput, input[type="search"]');
      if (input && !document.getElementById('palette')) input.focus();
      return;
    }
    if (action === 'saved') {
      var fav = document.getElementById('favBtn');
      if (fav) { fav.click(); return; }
      var favAlternative = document.querySelector('[data-fav-open], [data-dock-fav]');
      if (favAlternative) favAlternative.click();
      return;
    }
    if (action === 'help') { fireHelp(); return; }
    if (action === 'top') {
      try {
        window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
      } catch (err) {
        window.scrollTo(0, 0);
      }
      return;
    }
    if (action === 'install') {
      var install = document.getElementById('installBtn');
      if (install) install.click();
    }
  }

  function initDock () {
    if (document.getElementById('quickDock')) {
      dock = document.getElementById('quickDock');
    } else {
      dock = document.createElement('div');
      dock.id = 'quickDock';
      dock.className = 'quick-dock';
      dock.setAttribute('role', 'toolbar');
      dock.setAttribute('aria-label', t('dock'));

      var actions = ['search', 'saved', 'help', 'top'];
      if (document.getElementById('installBtn')) actions.push('install');
      for (var i = 0; i < actions.length; i++) dock.appendChild(makeDockButton(actions[i]));
      document.body.appendChild(dock);
    }

    dock.addEventListener('click', function (e) {
      var node = e.target;
      while (node && node !== dock && !(node.nodeType === 1 && node.hasAttribute('data-dock'))) node = node.parentNode;
      if (!node || node === dock) return;
      activate(node.getAttribute('data-dock'));
    });
  }

  /* ---------- 2) Kartalarda 3D egilish va yorug'lik ---------- */
  function initTilt () {
    var coarse = window.matchMedia &&
      (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches);
    var touch = coarse || ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;
    if (touch || reducedMotion()) return;

    var active = null;

    function reset (node) {
      if (!node) return;
      node.classList.remove('is-tilting');
      node.style.removeProperty('--dock-rx');
      node.style.removeProperty('--dock-ry');
      node.style.removeProperty('--dock-glow-x');
      node.style.removeProperty('--dock-glow-y');
    }

    function prepare (node) {
      if (node.__dockTiltReady) return;
      node.__dockTiltReady = true;
      if (window.getComputedStyle(node).position === 'static') node.style.position = 'relative';
      var glow = document.createElement('span');
      glow.className = 'dock-tilt-glow';
      glow.setAttribute('aria-hidden', 'true');
      node.appendChild(glow);
    }

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var node = e.target && e.target.closest ? e.target.closest(TILT_SELECTOR) : null;
      if (node && !document.body.contains(node)) node = null;
      if (node !== active) {
        reset(active);
        active = node;
        if (node) prepare(node);
      }
      if (!node) return;

      var rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      node.style.setProperty('--dock-rx', ((0.5 - py) * 2 * MAX_TILT).toFixed(2) + 'deg');
      node.style.setProperty('--dock-ry', ((px - 0.5) * 2 * MAX_TILT).toFixed(2) + 'deg');
      node.style.setProperty('--dock-glow-x', (px * 100).toFixed(1) + '%');
      node.style.setProperty('--dock-glow-y', (py * 100).toFixed(1) + '%');
      node.classList.add('is-tilting');
    }, { passive: true });

    document.addEventListener('pointerleave', function () { reset(active); active = null; });
    window.addEventListener('blur', function () { reset(active); active = null; });
  }

  /* ---------- 3) Kun buyruqlari karuseli ---------- */
  function initCarousel () {
    var archive = document.getElementById('dayArchive');
    if (!archive || document.getElementById('dayPrev')) return;

    var controls = document.createElement('div');
    controls.className = 'day-carousel';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', t('day'));
    controls.innerHTML =
      '<button type="button" class="day-carousel__btn" id="dayPrev">' +
        '<span aria-hidden="true">‹</span> <span class="day-carousel__label" data-day-label="prev"></span>' +
      '</button>' +
      '<span class="day-carousel__index" id="dayIndex" aria-live="polite">0 / 0</span>' +
      '<button type="button" class="day-carousel__btn" id="dayNext">' +
        '<span class="day-carousel__label" data-day-label="next"></span> <span aria-hidden="true">›</span>' +
      '</button>';

    var head = archive.querySelector('.day-archive__head');
    if (head) head.appendChild(controls);
    else archive.insertBefore(controls, archive.firstChild);

    var prev = document.getElementById('dayPrev');
    var next = document.getElementById('dayNext');
    var indexLabel = document.getElementById('dayIndex');
    var index = 0;

    function days () { return archive.querySelectorAll('.archive-day'); }

    function paint () {
      var list = days();
      if (index > list.length - 1) index = Math.max(0, list.length - 1);
      if (index < 0) index = 0;
      indexLabel.textContent = (list.length ? index + 1 : 0) + ' / ' + list.length;
      prev.disabled = !list.length || index === 0;
      next.disabled = !list.length || index === list.length - 1;
      prev.setAttribute('aria-label', t('prev'));
      prev.setAttribute('title', t('prev'));
      next.setAttribute('aria-label', t('next'));
      next.setAttribute('title', t('next'));
      controls.setAttribute('aria-label', t('day'));
      var prevText = controls.querySelector('[data-day-label="prev"]');
      var nextText = controls.querySelector('[data-day-label="next"]');
      if (prevText) prevText.textContent = t('prevLabel');
      if (nextText) nextText.textContent = t('nextLabel');
      for (var i = 0; i < list.length; i++) list[i].classList.toggle('is-current', i === index);
    }

    function move (step) {
      var list = days();
      if (!list.length) return;
      index = Math.max(0, Math.min(list.length - 1, index + step));
      list[index].click();
      paint();
    }

    prev.addEventListener('click', function () { move(-1); });
    next.addEventListener('click', function () { move(1); });
    archive.addEventListener('click', function (e) {
      var node = e.target;
      while (node && node !== archive && !(node.nodeType === 1 && node.classList && node.classList.contains('archive-day'))) node = node.parentNode;
      if (!node || node === archive) return;
      var list = days();
      var i = Array.prototype.indexOf.call(list, node);
      if (i >= 0) { index = i; paint(); }
    });
    document.addEventListener('langchange', function () { setTimeout(paint, 0); });
    paint();
  }

  /* ---------- 4) Sintaksis ranglari ---------- */
  var TOKEN_RE = /(~?\/[^\s"'`<>|;,&]+)|(--?[A-Za-z][A-Za-z0-9_-]*)/g;

  function escapeHtml (value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function paintSyntax (node) {
    if (!node || node.getAttribute('data-dock-syntax') === '1') return;
    var text = node.textContent;
    if (!text) return;
    var html = '';
    var last = 0;
    var match;
    TOKEN_RE.lastIndex = 0;
    while ((match = TOKEN_RE.exec(text)) !== null) {
      html += escapeHtml(text.slice(last, match.index));
      html += '<span class="' + (match[1] ? 'syntax-path' : 'syntax-flag') + '">' +
        escapeHtml(match[0]) + '</span>';
      last = match.index + match[0].length;
    }
    html += escapeHtml(text.slice(last));
    node.innerHTML = html;
    node.setAttribute('data-dock-syntax', '1');
  }

  var SYNTAX_SELECTOR = '.cmd-card__syntax, .cmd-row__syntax';
  function isSyntaxNode (node) {
    return !!(node && node.classList &&
      (node.classList.contains('cmd-card__syntax') || node.classList.contains('cmd-row__syntax')));
  }
  function paintAllSyntax (root) {
    var scope = root || document;
    if (scope.nodeType === 1 && isSyntaxNode(scope)) paintSyntax(scope);
    var nodes = scope.querySelectorAll ? scope.querySelectorAll(SYNTAX_SELECTOR) : [];
    for (var i = 0; i < nodes.length; i++) paintSyntax(nodes[i]);
  }

  function initSyntax () {
    paintAllSyntax(document);
    document.addEventListener('langchange', function () { setTimeout(function () { paintAllSyntax(document); }, 0); });
    if (typeof MutationObserver === 'function') {
      var observer = new MutationObserver(function (records) {
        var found = [];
        for (var i = 0; i < records.length; i++) {
          if (records[i].type !== 'childList') continue;
          var added = records[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            var node = added[j];
            if (node.nodeType !== 1) continue;
            if (isSyntaxNode(node)) found.push(node);
            if (node.querySelectorAll) {
              var nested = node.querySelectorAll(SYNTAX_SELECTOR);
              for (var k = 0; k < nested.length; k++) found.push(nested[k]);
            }
          }
        }
        for (var n = 0; n < found.length; n++) paintSyntax(found[n]);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  ready(function () {
    initDock();
    initTilt();
    initCarousel();
    initSyntax();
    document.addEventListener('langchange', function () {
      updateDockLabels();
      var dockLabel = t('dock');
      if (dock) dock.setAttribute('aria-label', dockLabel);
    });
  });
})();
