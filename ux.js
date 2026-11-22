/* Kali Linux — UX kengaytmalari: yordam dialogi, terminal avtotoldirish,
 * so'nggi ko'rilganlar, chop etish / QR. Hech qanday tarmoq yoki shaxsiy ma'lumot yig'maydi. */
(function () {
  'use strict';

  if (window.__KALI_UX_LOADED) return;
  window.__KALI_UX_LOADED = true;

  var RECENT_KEY = 'kali_recent';

  /* I18N da yo'q kalitlar uchun zaxira lug'at. "close" kabi umumiy kalitlar I18N dan olinadi. */
  var DICT = {
    uz: {
      helpTitle: 'Yordam va kalitlar',
      helpSub: 'Sahifa bo\'ylab tez harakat qilish uchun qisqa kalitlar',
      helpCtrlK: 'Tezkor qidiruv',
      helpSlash: 'Shpargalka qidiruvi',
      help1234: 'Test javobi (1—4)',
      helpEnter: 'Keyingi savol',
      helpCtrlL: 'Terminalni tozalash',
      helpEsc: 'Yopish',
      helpAdmin: 'Boshqaruv paneli',
      helpArrows: 'Karta tanlash (flashcards bo\'lsa)',
      helpContext: 'O\'ng tugma menyusi o\'chirilgan',
      helpRightClick: 'O\'ng tugma',
      helpFoot: 'Yordamni qayta ochish uchun «?» bosing',
      recentTitle: 'So\'nggi ko\'rilganlar',
      printQr: 'Chop etish / QR',
      qrTitle: 'Chop etish / QR kod',
      qrHint: 'Havolani telefonida ochish yoki chop etish uchun',
      print: 'Chop etish',
      close: 'Yopish',
      qrFail: 'QR kod yuklanmadi — ushbu havoladan foydalaning:'
    },
    ru: {
      helpTitle: 'Помощь и клавиши',
      helpSub: 'Быстрые действия на странице с помощью клавиш',
      helpCtrlK: 'Быстрый поиск',
      helpSlash: 'Поиск по шпаргалке',
      help1234: 'Ответ теста (1—4)',
      helpEnter: 'Следующий вопрос',
      helpCtrlL: 'Очистка терминала',
      helpEsc: 'Закрыть',
      helpAdmin: 'Панель администрирования',
      helpArrows: 'Выбор карточки (если есть flashcards)',
      helpContext: 'Контекстное меню по правой кнопке отключено',
      helpRightClick: 'Правая кнопка',
      helpFoot: 'Нажмите «?», чтобы открыть помощь снова',
      recentTitle: 'Недавно просмотренные',
      printQr: 'Печать / QR',
      qrTitle: 'Печать / QR-код',
      qrHint: 'Откройте ссылку на телефоне или распечатайте страницу',
      print: 'Печать',
      close: 'Закрыть',
      qrFail: 'QR-код не загрузился — используйте эту ссылку:'
    },
    en: {
      helpTitle: 'Help & keyboard shortcuts',
      helpSub: 'Quick actions for navigating the page',
      helpCtrlK: 'Quick search',
      helpSlash: 'Cheat sheet search',
      help1234: 'Quiz answer (1–4)',
      helpEnter: 'Next question',
      helpCtrlL: 'Clear the terminal',
      helpEsc: 'Close',
      helpAdmin: 'Admin panel',
      helpArrows: 'Select a card (if flashcards are present)',
      helpContext: 'Right-click menu is disabled',
      helpRightClick: 'Right click',
      helpFoot: 'Press «?» to open this help again',
      recentTitle: 'Recently viewed',
      printQr: 'Print / QR',
      qrTitle: 'Print / QR code',
      qrHint: 'Open the link on your phone or print the page',
      print: 'Print',
      close: 'Close',
      qrFail: 'QR code failed to load — use this link:'
    }
  };

  var ownLang = 'uz';
  try {
    var savedLang = localStorage.getItem('kali_lang');
    if (savedLang && DICT[savedLang]) ownLang = savedLang;
  } catch (e) {}

  function $ (selector) { return document.querySelector(selector); }

  function esc (value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function lang () {
    return window.I18N && typeof window.I18N.getLang === 'function' ? window.I18N.getLang() : ownLang;
  }

  function t (key) {
    if (window.I18N && typeof window.I18N.t === 'function') {
      var dict = window.I18N.dict && (window.I18N.dict[lang()] || window.I18N.dict.uz);
      if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return window.I18N.t(key);
    }
    var local = DICT[lang()] || DICT.uz;
    if (Object.prototype.hasOwnProperty.call(local, key)) return local[key];
    return Object.prototype.hasOwnProperty.call(DICT.uz, key) ? DICT.uz[key] : key;
  }

  function translate (root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-ux-i18n]');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute('data-ux-i18n'));
  }

  function storeGet (key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function storeSet (key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function isTyping (el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' ||
      el.isContentEditable === true || !!(el.closest && el.closest('[contenteditable="true"], [contenteditable=""]'));
  }

  /* ---------- A) Yordam dialogi ---------- */
  var helpReturnFocus = null;
  var helpOpenState = false;

  var HELP_ROWS = [
    ['kaliHelpRowCtrlK', 'Ctrl+K', 'helpCtrlK'],
    ['kaliHelpRowSlash', '/', 'helpSlash'],
    ['kaliHelpRow1234', '1—4', 'help1234'],
    ['kaliHelpRowEnter', 'Enter', 'helpEnter'],
    ['kaliHelpRowCtrlL', 'Ctrl+L', 'helpCtrlL'],
    ['kaliHelpRowEsc', 'Esc', 'helpEsc'],
    ['kaliHelpRowAdmin', 'Ctrl+Shift+A / ⌘+Shift+A', 'helpAdmin'],
    ['kaliHelpRowArrows', '↑ / ↓', 'helpArrows'],
    ['kaliHelpRowContext', 'helpRightClick', 'helpContext']
  ];

  function buildHelp () {
    var dlg = document.getElementById('kaliHelpDialog');
    if (dlg) {
      translate(dlg);
      return dlg;
    }

    var probe = document.createElement('dialog');
    var native = typeof probe.showModal === 'function';
    dlg = document.createElement(native ? 'dialog' : 'div');
    dlg.id = 'kaliHelpDialog';
    dlg.className = native ? 'kali-help-dialog' : 'kali-help-overlay';
    dlg.setAttribute('aria-labelledby', 'kaliHelpTitle');
    if (!native) {
      dlg.setAttribute('role', 'dialog');
      dlg.setAttribute('aria-modal', 'true');
      dlg.hidden = true;
    }

    var rows = HELP_ROWS.map(function (row) {
      var keyLabel = row[2] === 'helpContext' ? ' data-ux-i18n="' + row[1] + '"' : '';
      return '<li class="kali-help__row" id="' + row[0] + '">' +
        '<kbd id="' + row[0] + 'Key"' + keyLabel + '>' + esc(row[1]) + '</kbd>' +
        '<span id="' + row[0] + 'Text" data-ux-i18n="' + row[2] + '"></span></li>';
    }).join('');

    dlg.innerHTML =
      '<div class="kali-help-box" id="kaliHelpBox">' +
        '<div class="kali-help__head" id="kaliHelpHead">' +
          '<h2 id="kaliHelpTitle" data-ux-i18n="helpTitle"></h2>' +
          '<button type="button" class="kali-help__close" id="kaliHelpClose" title="Esc">' +
            '<span id="kaliHelpCloseText" data-ux-i18n="close"></span></button>' +
        '</div>' +
        '<p class="kali-help__sub" id="kaliHelpSub" data-ux-i18n="helpSub"></p>' +
        '<ul class="kali-help__list" id="kaliHelpList">' + rows + '</ul>' +
        '<p class="kali-help__foot" id="kaliHelpFoot" data-ux-i18n="helpFoot"></p>' +
      '</div>';

    document.body.appendChild(dlg);
    translate(dlg);

    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) closeHelp();
      var closeBtn = e.target && e.target.closest ? e.target.closest('#kaliHelpClose') : null;
      if (closeBtn) { e.preventDefault(); closeHelp(); }
    });

    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var items = focusable(dlg);
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    dlg.addEventListener('close', function () { helpOpenState = false; restoreHelpFocus(); });
    return dlg;
  }

  function focusable (root) {
    var nodes = root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute('aria-hidden') !== 'true') out.push(nodes[i]);
    }
    return out;
  }

  function restoreHelpFocus () {
    if (helpOpenState) return;
    var back = helpReturnFocus;
    helpReturnFocus = null;
    if (back && typeof back.focus === 'function' && document.contains && document.contains(back)) back.focus();
  }

  function openHelp () {
    var dlg = buildHelp();
    if (!dlg || helpOpenState) return;
    helpReturnFocus = document.activeElement;
    translate(dlg);
    try {
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else { dlg.hidden = false; dlg.setAttribute('open', ''); }
    } catch (err) {
      dlg.hidden = false;
      dlg.setAttribute('open', '');
    }
    helpOpenState = true;
    var closeBtn = document.getElementById('kaliHelpClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeHelp () {
    var dlg = document.getElementById('kaliHelpDialog');
    if (!dlg || !helpOpenState) return;
    if (typeof dlg.close === 'function' && dlg.open) dlg.close();
    else { dlg.hidden = true; dlg.removeAttribute('open'); }
    helpOpenState = false;
    restoreHelpFocus();
  }

  /* ---------- D) Chop etish / QR ---------- */
  var printReturnFocus = null;
  var printBuilt = false;

  function pageUrl () { return location.href.split('#')[0]; }

  function buildPrintOverlay () {
    var ov = document.getElementById('uxPrintOverlay');
    if (ov || printBuilt) return ov;
    printBuilt = true;

    ov = document.createElement('div');
    ov.id = 'uxPrintOverlay';
    ov.className = 'print-overlay';
    ov.hidden = true;
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-labelledby', 'uxPrintTitle');
    ov.innerHTML =
      '<div class="print-sheet" id="uxPrintSheet">' +
        '<h2 class="print-sheet__title" id="uxPrintTitle" data-ux-i18n="qrTitle"></h2>' +
        '<p class="print-sheet__hint" id="uxPrintHint" data-ux-i18n="qrHint"></p>' +
        '<div class="print-sheet__qr" id="uxQrBox">' +
          '<img class="print-sheet__img" id="uxQrImage" alt="QR code" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">' +
          '<div class="print-sheet__fallback" id="uxQrFallback" hidden>' +
            '<span id="uxQrFailText" data-ux-i18n="qrFail"></span>' +
            '<code id="uxQrFallbackUrl"></code>' +
          '</div>' +
        '</div>' +
        '<p class="print-sheet__url" id="uxPageUrl"></p>' +
        '<div class="print-actions" id="uxPrintActions">' +
          '<button type="button" class="btn btn--red" id="uxPrintConfirm"><span id="uxPrintConfirmText" data-ux-i18n="print"></span></button>' +
          '<button type="button" class="btn btn--ghost" id="uxPrintClose"><span id="uxPrintCloseText" data-ux-i18n="close"></span></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);

    var url = pageUrl();
    document.getElementById('uxPageUrl').textContent = url;
    document.getElementById('uxQrFallbackUrl').textContent = url;
    var img = document.getElementById('uxQrImage');
    img.onerror = function () {
      img.hidden = true;
      var fallback = document.getElementById('uxQrFallback');
      if (fallback) fallback.hidden = false;
    };

    document.getElementById('uxPrintConfirm').addEventListener('click', function () { window.print(); });
    document.getElementById('uxPrintClose').addEventListener('click', closePrintOverlay);
    ov.addEventListener('click', function (e) { if (e.target === ov) closePrintOverlay(); });
    ov.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var items = focusable(ov);
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    translate(ov);
    return ov;
  }

  function openPrintOverlay () {
    var ov = buildPrintOverlay();
    if (!ov || !ov.hidden) return;
    var img = document.getElementById('uxQrImage');
    if (img) {
      var qr = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(pageUrl());
      if (img.getAttribute('src') !== qr) img.src = qr;
    }
    printReturnFocus = document.activeElement;
    translate(ov);
    ov.hidden = false;
    var closeBtn = document.getElementById('uxPrintClose');
    if (closeBtn) closeBtn.focus();
  }

  function closePrintOverlay () {
    var ov = document.getElementById('uxPrintOverlay');
    if (!ov || ov.hidden) return;
    ov.hidden = true;
    var back = printReturnFocus;
    printReturnFocus = null;
    if (back && typeof back.focus === 'function' && document.contains && document.contains(back)) back.focus();
  }

  function initPrintQr () {
    var path = (location.pathname || '').toLowerCase();
    if (!/(^|\/)(cheatsheet|lab)\.html?$/.test(path) && !$('#printBtn') && !$('#labGrid')) return;

    var btn = document.getElementById('uxPrintQrBtn');
    if (!btn) {
      var host = ($('#printBtn') && $('#printBtn').parentElement) || $('.learn-toolbar') || $('.container') || document.body;
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'uxPrintQrBtn';
      btn.className = 'btn btn--ghost btn--sm ux-print-btn';
      btn.innerHTML = '<span id="uxPrintQrBtnText" data-ux-i18n="printQr"></span>';
      host.appendChild(btn);
    }
    translate(btn);
    if (!btn.getAttribute('data-ux-bound')) {
      btn.setAttribute('data-ux-bound', '1');
      btn.addEventListener('click', openPrintOverlay);
    }
    buildPrintOverlay();
  }

  /* ---------- B) Terminal avtotoldirish ---------- */
  function commandNames () {
    var names = [], seen = {};

    function add (value) {
      var name = String(value == null ? '' : value).trim().toLowerCase();
      if (name && !seen[name]) { seen[name] = true; names.push(name); }
    }

    var list = window.LINUX_COMMANDS;
    if (Array.isArray(list)) {
      list.forEach(function (cmd) { if (cmd) add(cmd.name || cmd.id); });
    }
    var synonyms = window.COMMAND_SYNONYMS;
    if (synonyms && typeof synonyms === 'object') {
      Object.keys(synonyms).forEach(add);
    }
    return names.sort();
  }

  function commonPrefix (items) {
    if (!items.length) return '';
    var prefix = items[0];
    for (var i = 1; i < items.length; i++) {
      while (prefix && items[i].indexOf(prefix) !== 0) prefix = prefix.slice(0, -1);
      if (!prefix) break;
    }
    return prefix;
  }

  function initTerminalAutocomplete () {
    var input = document.getElementById('termInput');
    if (!input || input.getAttribute('data-ux-tab-bound')) return;
    input.setAttribute('data-ux-tab-bound', '1');

    var form = document.getElementById('termForm');
    var suggest = document.getElementById('termSuggest');
    if (!suggest) {
      suggest = document.createElement('div');
      suggest.id = 'termSuggest';
      suggest.className = 'term-suggest';
      suggest.setAttribute('role', 'listbox');
      suggest.hidden = true;
      var anchor = form || input.parentNode;
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(suggest, anchor.nextSibling);
      else document.body.appendChild(suggest);
    }

    function hideSuggest () {
      suggest.hidden = true;
      suggest.innerHTML = '';
      input.removeAttribute('aria-expanded');
    }

    function showSuggest (matches, parts, index) {
      suggest.innerHTML = '';
      var shown = matches.slice(0, 8);
      shown.forEach(function (name, i) {
        var item = document.createElement('button');
        item.type = 'button';
        item.className = 'term-suggest__item';
        item.id = 'termSuggestItem' + i;
        item.setAttribute('role', 'option');
        item.textContent = name;
        item.addEventListener('click', function () {
          parts[index] = name;
          input.value = parts.join(' ') + ' ';
          hideSuggest();
          input.focus();
        });
        suggest.appendChild(item);
      });
      if (matches.length > shown.length) {
        var more = document.createElement('div');
        more.id = 'termSuggestMore';
        more.className = 'term-suggest__more';
        more.textContent = '+' + (matches.length - shown.length);
        suggest.appendChild(more);
      }
      suggest.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      input.setAttribute('aria-controls', 'termSuggest');
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !suggest.hidden) {
        e.stopPropagation();
        hideSuggest();
        return;
      }
      if (e.key !== 'Tab' || e.ctrlKey || e.metaKey || e.altKey) return;

      var parts = input.value.split(/\s+/);
      var index = parts.length - 1;
      var token = parts[index].toLowerCase();
      if (!token) return;

      var matches = commandNames().filter(function (name) {
        return name.indexOf(token) === 0 && name !== token;
      });
      if (!matches.length) return;

      /* Taklif bor: eski Tab handlerini takrorlamaslik uchun voqea to'xtatiladi.
       * Enter va Ctrl+L handlerlari o'zgarishsiz ishlayveradi. */
      e.preventDefault();
      e.stopImmediatePropagation();

      if (matches.length === 1) {
        parts[index] = matches[0];
        input.value = parts.join(' ') + ' ';
        hideSuggest();
        return;
      }

      var prefix = commonPrefix(matches);
      if (prefix.length > token.length) {
        parts[index] = prefix;
        input.value = parts.join(' ');
      }
      showSuggest(matches, parts, index);
    }, true);

    input.addEventListener('input', hideSuggest);
    if (form) form.addEventListener('submit', hideSuggest);
    document.addEventListener('click', function (e) {
      if (suggest.hidden) return;
      if (!e.target || !e.target.closest || !e.target.closest('#termSuggest')) hideSuggest();
    });
  }

  /* ---------- C) So'nggi ko'rilganlar ---------- */
  function commandNameById (id) {
    var list = window.LINUX_COMMANDS;
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i++) {
      var cmd = list[i];
      if (cmd && (cmd.id === id || cmd.name === id)) return cmd.name || cmd.id;
    }
    return null;
  }

  function renderRecent () {
    var saved = storeGet(RECENT_KEY);
    if (!Array.isArray(saved)) saved = [];
    var items = [], seen = {};
    saved.forEach(function (id) {
      var name = commandNameById(id);
      if (name && !seen[name]) { seen[name] = true; items.push({ id: id, name: name }); }
    });

    var current = document.getElementById('recentCommands');
    if (!items.length) {
      if (current && current.parentNode) current.parentNode.removeChild(current);
      return;
    }

    var target = document.getElementById('popularCommands') || document.getElementById('commands');
    if (!target || !target.parentNode) return;

    if (!current) {
      current = document.createElement('div');
      current.id = 'recentCommands';
      current.className = 'recent-commands container';
      var title = document.createElement('div');
      title.id = 'recentCommandsTitle';
      title.className = 'recent-commands__title';
      title.setAttribute('data-ux-i18n', 'recentTitle');
      var list = document.createElement('div');
      list.id = 'recentCommandsList';
      list.className = 'recent-commands__list';
      current.appendChild(title);
      current.appendChild(list);
      target.parentNode.insertBefore(current, target);
    }
    translate(current);

    var listBox = document.getElementById('recentCommandsList');
    listBox.innerHTML = items.map(function (item, i) {
      return '<button type="button" class="recent-chip" id="recentChip' + i + '" data-open="' +
        esc(item.id) + '">' + esc(item.name) + '</button>';
    }).join('');
  }

  function rememberOpened (id) {
    id = String(id == null ? '' : id).trim();
    if (!id) return;
    var saved = storeGet(RECENT_KEY);
    if (!Array.isArray(saved)) saved = [];
    saved = saved.filter(function (item) { return item !== id; });
    saved.unshift(id);
    if (saved.length > 10) saved.length = 10;
    storeSet(RECENT_KEY, saved);
    renderRecent();
  }

  /* ---------- Global voqealar ---------- */
  function onGlobalKeydown (e) {
    var helpVisible = helpOpenState && document.getElementById('kaliHelpDialog');
    var printVisible = !!(document.getElementById('uxPrintOverlay') && !document.getElementById('uxPrintOverlay').hidden);

    if (e.key === 'Escape') {
      if (helpVisible) { e.preventDefault(); e.stopPropagation(); closeHelp(); return; }
      if (printVisible) { e.preventDefault(); e.stopPropagation(); closePrintOverlay(); return; }
      return;
    }
    if (helpVisible || printVisible) return;
    if ((e.key === '?' || (e.key === '/' && e.shiftKey)) &&
        !e.ctrlKey && !e.metaKey && !e.altKey && !isTyping(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      openHelp();
    }
  }

  function init () {
    document.addEventListener('keydown', onGlobalKeydown, true);
    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.closest) return;
      var opened = e.target.closest('[data-open], [data-open-card], [data-open-lab]');
      if (opened) {
        rememberOpened(opened.getAttribute('data-open') || opened.getAttribute('data-open-card') ||
          opened.getAttribute('data-open-lab'));
      }
      if (!window.I18N) {
        var langBtn = e.target.closest('[data-lang]');
        if (langBtn && DICT[langBtn.getAttribute('data-lang')]) {
          ownLang = langBtn.getAttribute('data-lang');
          translate(document);
        }
      }
    });
    document.addEventListener('langchange', function () { translate(document); });

    initTerminalAutocomplete();
    renderRecent();
    initPrintQr();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
