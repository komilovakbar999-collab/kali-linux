/* Kali Linux — buyruq quruvchisi, xavfsizlik darajasi va o'xshash buyruqlar.
 * Mavjud fayllar o'zgartirilmaydi — barcha elementlar dinamik ravishda qo'shiladi. */
(function () {
  'use strict';

  if (window.__KALI_BUILDER_LOADED) return;
  window.__KALI_BUILDER_LOADED = true;

  var LANGS = ['uz', 'ru', 'en'];
  var HIGH_CATS = ['network', 'kali', 'tools'];
  var MID_CATS = ['perms', 'users', 'processes', 'system'];
  var ICONS = { high: '\u{1F534}', mid: '\u{1F7E1}', low: '\u{1F7E2}' };
  var SAFETY_SELECTOR = '.cmd-card__name, .cmd-row__name, #modal code';

  /* I18N.t da kalit bo'lmasa ishlatiladigan o'z lug'at */
  var T = {
    uz: {
      builderTitle: 'Buyruq quruvchisi',
      builderSub: 'Buyruq, bayroqlar va nishonni tanlang — tayyor satr pastda ko\'rinadi.',
      cmdLabel: 'Buyruq',
      flagsLabel: 'Bayroqlar',
      targetLabel: 'Nishon / parametr',
      targetPh: 'Masalan: 192.168.1.10 yoki fayl.txt',
      outputLabel: 'Tayyor buyruq',
      copy: 'Nusxalash',
      clear: 'Tozalash',
      noFlags: 'Bu buyruqda bayroq yo\'q',
      safetyHigh: 'Yuqori xavf: tarmoq yoki Kali vositalari — faqat ruxsat olingan tizimlarda ishlating',
      safetyMid: 'O\'rta xavf: ruxsatlar, foydalanuvchilar, jarayonlar yoki tizim — ehtiyot bo\'ling',
      safetyLow: 'Past xavf: odatda xavfsiz, lekin ma\'lumotlarni tekshiring',
      similarTitle: 'O\'xshash buyruqlar',
      similarSub: 'Bir kategoriyadagi boshqa buyruqlar',
      copyFail: 'Nusxalab bo\'lmadi'
    },
    ru: {
      builderTitle: 'Конструктор команд',
      builderSub: 'Выберите команду, флаги и цель — готовая строка появится ниже.',
      cmdLabel: 'Команда',
      flagsLabel: 'Флаги',
      targetLabel: 'Цель / параметр',
      targetPh: 'Например: 192.168.1.10 или file.txt',
      outputLabel: 'Готовая команда',
      copy: 'Копировать',
      clear: 'Очистить',
      noFlags: 'У этой команды нет флагов',
      safetyHigh: 'Высокий риск: сеть или инструменты Kali — используйте только на разрешённых системах',
      safetyMid: 'Средний риск: права, пользователи, процессы или система — будьте осторожны',
      safetyLow: 'Низкий риск: обычно безопасно, но проверяйте данные',
      similarTitle: 'Похожие команды',
      similarSub: 'Другие команды из той же категории',
      copyFail: 'Не удалось скопировать'
    },
    en: {
      builderTitle: 'Command builder',
      builderSub: 'Pick a command, flags and a target — the ready line appears below.',
      cmdLabel: 'Command',
      flagsLabel: 'Flags',
      targetLabel: 'Target / parameter',
      targetPh: 'For example: 192.168.1.10 or file.txt',
      outputLabel: 'Ready command',
      copy: 'Copy',
      clear: 'Clear',
      noFlags: 'This command has no flags',
      safetyHigh: 'High risk: network or Kali tools — use only on authorized systems',
      safetyMid: 'Medium risk: permissions, users, processes or system — use with care',
      safetyLow: 'Low risk: usually safe, but double-check the data',
      similarTitle: 'Similar commands',
      similarSub: 'Other commands from the same category',
      copyFail: 'Could not copy'
    }
  };

  var ui = {};
  var msgTimer = null;
  var safetyPending = false;

  function has(obj, key) { return Object.prototype.hasOwnProperty.call(obj || {}, key); }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function one(selector, root) {
    try { return (root || document).querySelector(selector); } catch (e) { return null; }
  }

  function all(selector, root) {
    try { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); } catch (e) { return []; }
  }

  function node(tag, className) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  function setText(el, value) {
    if (el) el.textContent = String(value == null ? '' : value);
  }

  function lang() {
    try {
      var value = window.I18N && typeof window.I18N.getLang === 'function' ? window.I18N.getLang() : 'uz';
      return LANGS.indexOf(value) !== -1 ? value : 'uz';
    } catch (e) { return 'uz'; }
  }

  function tr(key) {
    try {
      if (window.I18N && typeof window.I18N.t === 'function') {
        var dict = window.I18N.dict;
        if (!dict || !dict[lang()] || has(dict[lang()], key)) return window.I18N.t(key);
      }
    } catch (e) {}
    var row = T[lang()] || T.uz;
    return has(row, key) ? row[key] : (T.uz[key] || key);
  }

  function local(obj) {
    var code = lang();
    return String((obj && (obj[code] || obj.uz || obj.ru || obj.en)) || '');
  }

  function commands() {
    try {
      if (window.KaliCommon && typeof window.KaliCommon.store === 'function') {
        var stored = window.KaliCommon.store('kali_commands');
        if (Array.isArray(stored) && stored.length) return stored;
      }
    } catch (e) {}
    return Array.isArray(window.LINUX_COMMANDS) ? window.LINUX_COMMANDS : [];
  }

  function byId(id, list) {
    var rows = list || commands();
    for (var i = 0; i < rows.length; i++) { if (rows[i] && rows[i].id === id) return rows[i]; }
    return null;
  }

  function byName(name, list) {
    var rows = list || commands();
    for (var i = 0; i < rows.length; i++) { if (rows[i] && rows[i].name === name) return rows[i]; }
    return null;
  }

  function favIds() {
    try {
      var raw = window.localStorage.getItem('kali_favs');
      var value = raw ? JSON.parse(raw) : [];
      return Array.isArray(value) ? value : [];
    } catch (e) { return []; }
  }

  function levelOf(category) {
    if (HIGH_CATS.indexOf(category) !== -1) return 'high';
    if (MID_CATS.indexOf(category) !== -1) return 'mid';
    return 'low';
  }

  function safetyKey(level) {
    return level === 'high' ? 'safetyHigh' : (level === 'mid' ? 'safetyMid' : 'safetyLow');
  }

  function selectedCommand() {
    try {
      var id = ui.cmd ? ui.cmd.value : '';
      return byId(id, commands()) || commands()[0] || null;
    } catch (e) { return null; }
  }

  function normalizeFlag(flag) {
    return String(flag || '').split(',')[0].trim();
  }

  /* ---------- 1. Buyruq quruvchisi ---------- */
  function buildBuilder() {
    try {
      if (one('#commandBuilder')) return;
      var listHost = one('#cmdList');
      var parent = listHost && listHost.parentNode ? listHost.parentNode : null;
      var main = one('#main');
      if (!parent && !main) return;

      var section = node('section', 'cmd-builder');
      section.id = 'commandBuilder';
      section.setAttribute('data-builder-ready', '1');
      section.setAttribute('aria-labelledby', 'builderTitle');
      section.innerHTML =
        '<div class="cmd-builder__card">' +
          '<header class="cmd-builder__head">' +
            '<div>' +
              '<h2 class="cmd-builder__title" id="builderTitle"></h2>' +
              '<p class="cmd-builder__sub" id="builderSub"></p>' +
            '</div>' +
            '<span class="cmd-builder__mark" aria-hidden="true">$</span>' +
          '</header>' +
          '<div class="cmd-builder__grid">' +
            '<label class="cmd-builder__field" for="builderCmd">' +
              '<span class="cmd-builder__label" id="builderCmdLabel"></span>' +
              '<select id="builderCmd" aria-labelledby="builderCmdLabel"></select>' +
            '</label>' +
            '<label class="cmd-builder__field" for="builderTarget">' +
              '<span class="cmd-builder__label" id="builderTargetLabel"></span>' +
              '<input type="text" id="builderTarget" autocomplete="off" spellcheck="false" aria-labelledby="builderTargetLabel">' +
            '</label>' +
          '</div>' +
          '<div class="cmd-builder__flags-wrap">' +
            '<span class="cmd-builder__label" id="builderFlagsLabel"></span>' +
            '<div class="cmd-builder__flags" id="builderFlags" aria-labelledby="builderFlagsLabel"></div>' +
          '</div>' +
          '<div class="cmd-builder__output">' +
            '<div class="cmd-builder__output-head">' +
              '<span class="cmd-builder__label" id="builderOutputLabel"></span>' +
              '<div class="cmd-builder__actions">' +
                '<button type="button" class="cmd-builder__btn cmd-builder__btn--copy" id="builderCopy"></button>' +
                '<button type="button" class="cmd-builder__btn" id="builderClear"></button>' +
              '</div>' +
            '</div>' +
            '<code id="builderOutput" aria-live="polite"></code>' +
            '<span class="cmd-builder__msg" id="builderMsg" role="status" aria-live="polite"></span>' +
          '</div>' +
        '</div>';

      if (parent) parent.insertBefore(section, listHost.nextSibling);
      else main.appendChild(section);

      ui.root = section;
      ui.title = one('#builderTitle', section);
      ui.sub = one('#builderSub', section);
      ui.cmd = one('#builderCmd', section);
      ui.cmdLabel = one('#builderCmdLabel', section);
      ui.flags = one('#builderFlags', section);
      ui.flagsLabel = one('#builderFlagsLabel', section);
      ui.target = one('#builderTarget', section);
      ui.targetLabel = one('#builderTargetLabel', section);
      ui.output = one('#builderOutput', section);
      ui.outputLabel = one('#builderOutputLabel', section);
      ui.copy = one('#builderCopy', section);
      ui.clear = one('#builderClear', section);
      ui.msg = one('#builderMsg', section);
      if (!ui.cmd || !ui.flags || !ui.target || !ui.output || !ui.copy || !ui.clear) return;

      var fragment = document.createDocumentFragment();
      commands().forEach(function (command) {
        if (!command) return;
        var option = document.createElement('option');
        option.value = String(command.id || '');
        option.textContent = String(command.name || command.id || '');
        fragment.appendChild(option);
      });
      ui.cmd.appendChild(fragment);

      ui.cmd.addEventListener('change', function () { try { renderFlags(); updateOutput(); } catch (e) {} });
      ui.flags.addEventListener('change', function () { try { updateOutput(); } catch (e) {} });
      ui.target.addEventListener('input', function () { try { updateOutput(); } catch (e) {} });
      ui.copy.addEventListener('click', function () { try { copyOutput(); } catch (e) {} });
      ui.clear.addEventListener('click', function () { try { clearBuilder(); } catch (e) {} });

      localizeBuilder();
      renderFlags();
      updateOutput();
    } catch (e) {}
  }

  function flagText(option, index) {
    var flag = String((option && option.flag) || '');
    var desc = local(option);
    return flag + (desc ? ' \u2014 ' + desc : '');
  }

  function renderFlags() {
    try {
      if (!ui.flags) return;
      ui.flags.textContent = '';
      var options = (selectedCommand() && selectedCommand().options) || [];
      if (!options.length) {
        var empty = node('span', 'cmd-builder__empty');
        empty.textContent = tr('noFlags');
        ui.flags.appendChild(empty);
        return;
      }
      options.forEach(function (option, index) {
        var label = node('label', 'cmd-builder__flag');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'cmd-builder__flag-input';
        checkbox.id = 'builderFlag_' + index;
        checkbox.setAttribute('data-flag-index', String(index));
        checkbox.setAttribute('data-flag', String((option && option.flag) || ''));
        var box = node('span', 'cmd-builder__flag-box');
        box.setAttribute('aria-hidden', 'true');
        box.textContent = '\u2713';
        var text = node('span', 'cmd-builder__flag-text');
        text.textContent = flagText(option, index);
        label.appendChild(checkbox);
        label.appendChild(box);
        label.appendChild(text);
        ui.flags.appendChild(label);
      });
    } catch (e) {}
  }

  function updateFlagLabels() {
    try {
      if (!ui.flags) return;
      var options = (selectedCommand() && selectedCommand().options) || [];
      all('.cmd-builder__flag', ui.flags).forEach(function (label) {
        var checkbox = one('input', label);
        var text = one('.cmd-builder__flag-text', label);
        var index = checkbox ? Number(checkbox.getAttribute('data-flag-index')) : -1;
        if (text && options[index]) text.textContent = flagText(options[index], index);
      });
      var empty = one('.cmd-builder__empty', ui.flags);
      if (empty && !options.length) empty.textContent = tr('noFlags');
    } catch (e) {}
  }

  function updateOutput() {
    try {
      var command = selectedCommand();
      var parts = [command ? String(command.name || '') : ''];
      all('input[type="checkbox"]:checked', ui.flags).forEach(function (checkbox) {
        var flag = normalizeFlag(checkbox.getAttribute('data-flag'));
        if (flag) parts.push(flag);
      });
      var target = ui.target ? String(ui.target.value || '').trim() : '';
      if (target) parts.push(target);
      ui.output.textContent = parts.filter(function (part) { return !!part; }).join(' ');
    } catch (e) {}
  }

  function showMessage(text) {
    try {
      if (!ui.msg) return;
      ui.msg.textContent = String(text || '');
      ui.msg.classList.toggle('is-visible', !!text);
      if (msgTimer) { clearTimeout(msgTimer); msgTimer = null; }
      if (text) {
        msgTimer = setTimeout(function () {
          try {
            if (!ui.msg) return;
            ui.msg.textContent = '';
            ui.msg.classList.remove('is-visible');
          } catch (e) {}
        }, 1800);
      }
    } catch (e) {}
  }

  function copyOutput() {
    try {
      var value = ui.output ? ui.output.textContent : '';
      if (!value) return;
      function done() { showMessage(tr('copied')); }
      function fallback() {
        try {
          var area = document.createElement('textarea');
          area.value = value;
          area.setAttribute('readonly', 'readonly');
          area.style.position = 'fixed';
          area.style.top = '-1000px';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          try { document.execCommand('copy'); done(); }
          catch (err) { showMessage(tr('copyFail')); }
          area.parentNode.removeChild(area);
        } catch (err) { showMessage(tr('copyFail')); }
      }
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(value).then(done).catch(fallback);
      } else {
        fallback();
      }
    } catch (e) {}
  }

  function clearBuilder() {
    try {
      if (ui.cmd && ui.cmd.options.length) ui.cmd.selectedIndex = 0;
      all('input[type="checkbox"]', ui.flags).forEach(function (checkbox) { checkbox.checked = false; });
      if (ui.target) ui.target.value = '';
      renderFlags();
      updateOutput();
    } catch (e) {}
  }

  function localizeBuilder() {
    try {
      if (!ui.root || !ui.root.isConnected) return;
      setText(ui.title, tr('builderTitle'));
      setText(ui.sub, tr('builderSub'));
      setText(ui.cmdLabel, tr('cmdLabel'));
      setText(ui.flagsLabel, tr('flagsLabel'));
      setText(ui.targetLabel, tr('targetLabel'));
      setText(ui.outputLabel, tr('outputLabel'));
      setText(ui.copy, '\u29C9 ' + tr('copy'));
      setText(ui.clear, '\u2715 ' + tr('clear'));
      if (ui.target) ui.target.setAttribute('placeholder', tr('targetPh'));
      updateFlagLabels();
      updateOutput();
    } catch (e) {}
  }

  /* ---------- 2. Xavfsizlik darajasi belgisi ---------- */
  function currentModalId(modal) {
    try {
      var link = one('[data-copy-link]', modal);
      if (link) return link.getAttribute('data-copy-link');
      var match = /^#cmd=(.+)$/.exec(location.hash || '');
      if (match) {
        try { return decodeURIComponent(match[1]); } catch (err) { return match[1]; }
      }
      var title = one('#modalTitle', modal);
      if (title) {
        var command = byName(String(title.textContent || '').trim(), commands());
        return command ? command.id : null;
      }
    } catch (e) {}
    return null;
  }

  function ownerId(el, rows) {
    try {
      if (!el || !el.closest) return null;
      var card = el.closest('[data-open-card]');
      if (card) return card.getAttribute('data-open-card');
      var row = el.closest('.cmd-row');
      if (row) {
        var button = one('[data-open]', row);
        if (button) return button.getAttribute('data-open');
      }
      var modal = el.closest('#modal');
      if (modal) return currentModalId(modal);
      return null;
    } catch (e) { return null; }
  }

  function decorateOne(el, rows) {
    try {
      if (!el || !el.setAttribute || el.getAttribute('data-safety-done') === '1') return;
      if (el.closest && el.closest('#commandBuilder, #similarCommands')) return;
      if (one('.safety-badge', el)) { el.setAttribute('data-safety-done', '1'); return; }
      var id = ownerId(el, rows);
      var command = id ? byId(id, rows) : null;
      if (!command) command = byName(String(el.textContent || '').trim(), rows);
      if (!command) return;

      var level = levelOf(command.category);
      var hint = tr(safetyKey(level));
      var badge = node('span', 'safety-badge');
      badge.setAttribute('data-level', level);
      badge.setAttribute('role', 'img');
      badge.setAttribute('title', hint);
      badge.setAttribute('aria-label', hint);
      badge.textContent = ICONS[level];
      el.setAttribute('data-safety-done', '1');
      el.appendChild(badge);
    } catch (e) {}
  }

  function decorateSafety() {
    try {
      var rows = commands();
      all(SAFETY_SELECTOR).forEach(function (el) { decorateOne(el, rows); });
    } catch (e) {}
  }

  function localizeSafety() {
    try {
      all('.safety-badge').forEach(function (badge) {
        var hint = tr(safetyKey(badge.getAttribute('data-level')));
        badge.setAttribute('title', hint);
        badge.setAttribute('aria-label', hint);
      });
    } catch (e) {}
  }

  /* ---------- 3. O'xshash buyruqlar ---------- */
  function syncSimilar() {
    try {
      var modal = one('#modal');
      if (!modal) return;
      var existing = one('#similarCommands', modal);
      if (modal.hidden || modal.hasAttribute('hidden')) {
        if (existing && existing.parentNode && existing.getAttribute('data-similar-ready') === '1') {
          existing.parentNode.removeChild(existing);
        }
        return;
      }

      var id = currentModalId(modal);
      if (!id) return;
      var rows = commands();
      var command = byId(id, rows);
      if (!command) return;
      if (existing && existing.getAttribute('data-cmd-id') === id) return;

      var favs = favIds();
      var pool = rows.filter(function (item) {
        return item && item.category === command.category && item.id !== command.id;
      });
      pool.sort(function (a, b) {
        var first = favs.indexOf(a.id) !== -1 ? 0 : 1;
        var second = favs.indexOf(b.id) !== -1 ? 0 : 1;
        return first - second;
      });
      var picks = pool.slice(0, 3);
      if (!picks.length) return;

      var html = '<section class="similar-commands" id="similarCommands" data-similar-ready="1" data-cmd-id="' + esc(command.id) + '" aria-labelledby="similarTitle">' +
        '<h3 class="similar-commands__title" id="similarTitle">' + esc(tr('similarTitle')) + '</h3>' +
        '<p class="similar-commands__sub">' + esc(tr('similarSub')) + '</p>' +
        '<div class="similar-commands__grid">' + picks.map(function (item) {
          return '<button type="button" class="similar-commands__item" data-open="' + esc(item.id) + '">' +
            '<code class="similar-commands__name">' + esc(item.name || item.id) + '</code>' +
            '<span class="similar-commands__desc">' + esc(local(item.desc)) + '</span>' +
            '</button>';
        }).join('') + '</div></section>';

      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      var holder = document.createElement('div');
      holder.innerHTML = html;
      var block = holder.firstChild;
      if (!block) return;
      var body = one('#modalBody', modal) || modal;
      body.appendChild(block);
    } catch (e) {}
  }

  function refreshSimilar() {
    try {
      var modal = one('#modal');
      var block = modal ? one('#similarCommands', modal) : null;
      if (block && block.parentNode && block.getAttribute('data-similar-ready') === '1') {
        block.parentNode.removeChild(block);
      }
      syncSimilar();
    } catch (e) {}
  }

  /* ---------- Kuzatish va til almashinuvi ---------- */
  function initObservers() {
    try {
      var body = document.body || document.documentElement;
      if (!('MutationObserver' in window)) { decorateSafety(); syncSimilar(); return; }

      var safetyObserver = new MutationObserver(function () {
        if (safetyPending) return;
        safetyPending = true;
        setTimeout(function () {
          safetyPending = false;
          decorateSafety();
        }, 20);
      });
      try {
        safetyObserver.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
      } catch (e) {}

      var modal = one('#modal');
      if (modal) {
        var similarObserver = new MutationObserver(function () { try { syncSimilar(); } catch (e) {} });
        try {
          similarObserver.observe(modal, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
        } catch (e) {}
      }
    } catch (e) {}
  }

  function boot() {
    try {
      buildBuilder();
      decorateSafety();
      syncSimilar();
      initObservers();
      document.addEventListener('langchange', function () {
        try { localizeBuilder(); } catch (e) {}
        try { localizeSafety(); } catch (e) {}
        try { refreshSimilar(); } catch (e) {}
      });
    } catch (e) {}
  }

  try {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
    else boot();
  } catch (e) {}
})();
