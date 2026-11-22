(function () {
  'use strict';

  var DICT = {
    uz: {
      manSearchLabel: 'Buyruq qidirish',
      manSearchPh: 'ls, grep, nmap…',
      manRandom: 'Tasodifiy',
      manNotFound: 'Buyruq topilmadi',
      manNotFoundHint: 'ID noto\'g\'ri yoki buyruq bazada yo\'q. Quyidagi qidiruvdan foydalaning.',
      manBackAll: 'Barcha buyruqlar',
      manPrev: 'Oldingi',
      manNext: 'Keyingi',
      manName: 'NOMI',
      manSynopsis: 'SINTAKSIS',
      manDesc: 'TAVSIF',
      manOptions: 'OPSIYALAR',
      manExamples: 'MISOLLAR',
      manCategory: 'KATEGORIYA',
      manSeeAlso: 'SHUNINGDEK',
      manCopy: 'Nusxalash',
      manCopied: 'Nusxalandi',
      manNoOptions: 'Bu buyruq uchun alohida opsiyalar ko\'rsatilmagan.',
      manNoExamples: 'Misollar mavjud emas.',
      manFullPage: 'To\'liq man sahifa ↗',
      manOpen: 'Ochish',
      manFlag: 'Bayroq',
      manMeaning: 'Ma\'nosi'
    },
    ru: {
      manSearchLabel: 'Поиск команды',
      manSearchPh: 'ls, grep, nmap…',
      manRandom: 'Случайная',
      manNotFound: 'Команда не найдена',
      manNotFoundHint: 'ID неверный или команды нет в базе. Используйте поиск ниже.',
      manBackAll: 'Все команды',
      manPrev: 'Предыдущая',
      manNext: 'Следующая',
      manName: 'ИМЯ',
      manSynopsis: 'СИНТАКСИС',
      manDesc: 'ОПИСАНИЕ',
      manOptions: 'ОПЦИИ',
      manExamples: 'ПРИМЕРЫ',
      manCategory: 'КАТЕГОРИЯ',
      manSeeAlso: 'СМОТРИТЕ ТАКЖЕ',
      manCopy: 'Копировать',
      manCopied: 'Скопировано',
      manNoOptions: 'Для этой команды отдельные опции не указаны.',
      manNoExamples: 'Примеры отсутствуют.',
      manFullPage: 'Полная man-страница ↗',
      manOpen: 'Открыть',
      manFlag: 'Флаг',
      manMeaning: 'Значение'
    },
    en: {
      manSearchLabel: 'Search command',
      manSearchPh: 'ls, grep, nmap…',
      manRandom: 'Random',
      manNotFound: 'Command not found',
      manNotFoundHint: 'The ID is invalid or the command is not in the database. Use the search below.',
      manBackAll: 'All commands',
      manPrev: 'Previous',
      manNext: 'Next',
      manName: 'NAME',
      manSynopsis: 'SYNOPSIS',
      manDesc: 'DESCRIPTION',
      manOptions: 'OPTIONS',
      manExamples: 'EXAMPLES',
      manCategory: 'CATEGORY',
      manSeeAlso: 'SEE ALSO',
      manCopy: 'Copy',
      manCopied: 'Copied',
      manNoOptions: 'No specific options are listed for this command.',
      manNoExamples: 'No examples available.',
      manFullPage: 'Full man page ↗',
      manOpen: 'Open',
      manFlag: 'Flag',
      manMeaning: 'Meaning'
    }
  };

  function lang() {
    try { return (window.I18N && window.I18N.getLang && window.I18N.getLang()) || 'uz'; }
    catch (e) { return 'uz'; }
  }

  function t(key) {
    var l = lang();
    return (DICT[l] && DICT[l][key]) || (DICT.uz[key]) || key;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function local(obj) {
    if (!obj) return '';
    var l = lang();
    return obj[l] || obj.uz || obj.ru || obj.en || '';
  }

  function reduceMotion() {
    try {
      if (window.KaliCommon && window.KaliCommon.reduceMotion) return window.KaliCommon.reduceMotion();
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { return false; }
  }

  function commands() {
    return Array.isArray(window.LINUX_COMMANDS) ? window.LINUX_COMMANDS : [];
  }

  function categories() {
    return Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
  }

  function catById(id) {
    var list = categories();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return { uz: id || '', ru: id || '', en: id || '', icon: '' };
  }

  function getIdFromUrl() {
    try {
      var sp = new URLSearchParams(window.location.search || '');
      var id = sp.get('id') || sp.get('cmd') || '';
      id = String(id || '').trim();
      return id;
    } catch (e) { return ''; }
  }

  function findCmd(id) {
    var list = commands();
    var needle = String(id || '').toLowerCase();
    if (!needle) return null;
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id || '').toLowerCase() === needle || String(list[i].name || '').toLowerCase() === needle) return list[i];
    }
    return null;
  }

  function commandUrl(id) {
    return 'command.html?id=' + encodeURIComponent(String(id || ''));
  }

  function copyText(text) {
    var val = String(text == null ? '' : text);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(val).then(function () { return true; }).catch(function () { return fallbackCopy(val); });
    }
    return Promise.resolve(fallbackCopy(val));
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return !!ok;
    } catch (e) { return false; }
  }

  function showToast(msg) {
    try {
      var wrap = document.getElementById('toastWrap');
      if (!wrap) return;
      var el = document.createElement('div');
      el.className = 'toast';
      el.textContent = String(msg || '');
      wrap.appendChild(el);
      setTimeout(function () { el.classList.add('toast--out'); }, 1400);
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1800);
    } catch (e) { /* no-op */ }
  }

  function highlightCode(text) {
    var s = esc(text);
    // Simple highlighting: flags, pipes, strings, comments
    s = s.replace(/(^|\s)(--?[A-Za-z0-9][A-Za-z0-9._-]*)/g, '$1<span class="man-tok-flag">$2</span>');
    s = s.replace(/(\||&amp;&amp;|&gt;|&lt;|2&gt;&amp;1)/g, '<span class="man-tok-op">$1</span>');
    s = s.replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="man-tok-str">$1</span>');
    return s;
  }

  function scoreCmd(cmd, query) {
    try {
      if (window.KaliCommon && window.KaliCommon.commandScore) return window.KaliCommon.commandScore(cmd, query);
    } catch (e) { /* fallback */ }
    var q = String(query || '').toLowerCase().trim();
    if (!q) return 0;
    var name = String(cmd.name || '').toLowerCase();
    var id = String(cmd.id || '').toLowerCase();
    var desc = (local(cmd.desc) || '').toLower();
    var tags = (cmd.tags || []).join(' ').toLowerCase();
    var score = 0;
    if (id === q || name === q) score += 100;
    else if (name.indexOf(q) === 0 || id.indexOf(q) === 0) score += 40;
    else if (name.indexOf(q) !== -1 || id.indexOf(q) !== -1) score += 20;
    if (tags.indexOf(q) !== -1) score += 10;
    if (desc.indexOf(q) !== -1) score += 5;
    return score;
  }

  function searchCmds(query, limit) {
    var q = String(query || '').trim();
    var list = commands();
    if (!q) return list.slice(0, limit || 8);
    var scored = [];
    for (var i = 0; i < list.length; i++) {
      var s = scoreCmd(list[i], q);
      if (s > 0) scored.push({ cmd: list[i], score: s });
    }
    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return String(a.cmd.name || '').localeCompare(String(b.cmd.name || ''));
    });
    var out = [];
    var max = limit || 8;
    for (var j = 0; j < scored.length && out.length < max; j++) out.push(scored[j].cmd);
    return out;
  }

  function updateMeta(cmd) {
    try {
      var name = cmd ? cmd.name : t('manNotFound');
      var desc = cmd ? (local(cmd.desc) || '') : t('manNotFoundHint');
      var title = (cmd ? (name + ' — ') : '') + 'Kali Linux man';
      document.title = title;
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', desc.slice(0, 160));
      var ogt = document.querySelector('meta[property="og:title"]');
      if (ogt) ogt.setAttribute('content', title);
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) ogd.setAttribute('content', desc.slice(0, 160));
    } catch (e) { /* no-op */ }
  }

  function renderNotFound(container, query) {
    var q = String(query || '').trim();
    var results = searchCmds(q, 12);
    var html = '';
    html += '<div class="man-notfound">';
    html += '<div class="man-kicker">404</div>';
    html += '<h1 class="man-title">' + esc(t('manNotFound')) + '</h1>';
    html += '<p class="man-lead">' + esc(t('manNotFoundHint')) + '</p>';
    html += '<div class="man-notfound-search">';
    html += '<input id="manNotFoundSearch" class="man-search" type="search" autocomplete="off" spellcheck="false" placeholder="' + esc(t('manSearchPh')) + '" value="' + esc(q) + '">';
    html += '</div>';
    html += '<div class="man-notfound-list" id="manNotFoundList">';
    html += renderResultList(results);
    html += '</div>';
    html += '<p style="margin-top:18px"><a class="btn btn--ghost btn--sm" href="index.html#commands">' + esc(t('manBackAll')) + '</a></p>';
    html += '</div>';
    container.innerHTML = html;
    bindNotFoundSearch();
  }

  function renderResultList(list) {
    if (!list || !list.length) return '<div class="man-empty">' + esc(t('manNotFound')) + '</div>';
    var html = '<ul class="man-result-list">';
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      var cat = catById(c.category);
      html += '<li><a class="man-result-item" href="' + esc(commandUrl(c.id)) + '">';
      html += '<span class="man-result-name">' + esc(c.name) + '</span>';
      html += '<span class="man-result-desc">' + esc(local(c.desc)) + '</span>';
      html += '<span class="man-result-cat">' + esc(cat[lang()] || cat.uz || '') + '</span>';
      html += '</a></li>';
    }
    html += '</ul>';
    return html;
  }

  function bindNotFoundSearch() {
    var input = document.getElementById('manNotFoundSearch');
    var list = document.getElementById('manNotFoundList');
    if (!input || !list) return;
    input.addEventListener('input', function () {
      list.innerHTML = renderResultList(searchCmds(input.value, 12));
    });
  }

  function renderNav(cmd) {
    var list = commands();
    var idx = -1;
    for (var i = 0; i < list.length; i++) { if (list[i].id === cmd.id) { idx = i; break; } }
    var prev = idx > 0 ? list[idx - 1] : null;
    var next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
    var html = '';
    if (prev) {
      html += '<a class="btn btn--ghost btn--sm man-nav-btn" href="' + esc(commandUrl(prev.id)) + '" aria-label="' + esc(t('manPrev')) + '">← ' + esc(prev.name) + '</a>';
    } else {
      html += '<span class="btn btn--ghost btn--sm man-nav-btn is-disabled" aria-disabled="true">← ' + esc(t('manPrev')) + '</span>';
    }
    if (next) {
      html += '<a class="btn btn--ghost btn--sm man-nav-btn" href="' + esc(commandUrl(next.id)) + '" aria-label="' + esc(t('manNext')) + '">' + esc(next.name) + ' →</a>';
    } else {
      html += '<span class="btn btn--ghost btn--sm man-nav-btn is-disabled" aria-disabled="true">' + esc(t('manNext')) + ' →</span>';
    }
    return html;
  }

  function renderSeeAlso(cmd) {
    var list = commands();
    var sameCat = [];
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (c.id === cmd.id) continue;
      if (c.category === cmd.category) sameCat.push(c);
    }
    // deterministic but varied: pick around current index
    var idx = -1;
    for (var j = 0; j < list.length; j++) { if (list[j].id === cmd.id) { idx = j; break; } }
    var picks = [];
    // neighbors in same category
    for (var k = 0; k < sameCat.length && picks.length < 6; k++) picks.push(sameCat[k]);
    // if not enough, add neighbors globally
    if (picks.length < 4) {
      for (var n = 1; n < list.length && picks.length < 6; n++) {
        var a = list[(idx + n) % list.length];
        var b = list[(idx - n + list.length) % list.length];
        if (a.id !== cmd.id && !containsId(picks, a.id)) picks.push(a);
        if (picks.length < 6 && b.id !== cmd.id && !containsId(picks, b.id)) picks.push(b);
      }
    }
    picks = picks.slice(0, 6);
    if (!picks.length) return '';
    var html = '<div class="man-seealso">';
    for (var p = 0; p < picks.length; p++) {
      html += '<a class="man-seealso-link" href="' + esc(commandUrl(picks[p].id)) + '">' + esc(picks[p].name) + '</a>';
    }
    html += '</div>';
    return html;
  }

  function containsId(list, id) {
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return true; }
    return false;
  }

  function renderCommand(container, cmd) {
    var cat = catById(cmd.category);
    var syntax = cmd.syntax || cmd.name || '';
    var opts = Array.isArray(cmd.options) ? cmd.options : [];
    var exs = Array.isArray(cmd.examples) ? cmd.examples : [];
    var seeAlso = renderSeeAlso(cmd);

    var html = '';
    html += '<header class="man-head">';
    html += '<div class="man-kicker">MAN(1) · ' + esc((cat[lang()] || cat.uz || '').toUpperCase()) + '</div>';
    html += '<h1 class="man-title">' + esc(cmd.name) + '</h1>';
    html += '<p class="man-lead">' + esc(local(cmd.desc)) + '</p>';
    html += '<div class="man-head-actions">';
    html += '<a class="btn btn--ghost btn--sm" href="index.html#cmd=' + esc(encodeURIComponent(cmd.id)) + '">' + esc(t('manBackAll')) + '</a>';
    html += '<button type="button" class="btn btn--ghost btn--sm" data-copy="' + esc(syntax) + '">' + esc(t('manCopy')) + '</button>';
    html += '</div>';
    html += '</header>';

    html += section('manName', function () {
      return '<div class="man-block"><span class="man-name-cmd">' + esc(cmd.name) + '</span> — ' + esc(local(cmd.desc)) + '</div>';
    });

    html += section('manSynopsis', function () {
      return '<div class="man-block man-codeblock"><pre><code>' + highlightCode(syntax) + '</code></pre>' +
        '<button type="button" class="mini-btn man-copy-btn" data-copy="' + esc(syntax) + '" aria-label="' + esc(t('manCopy')) + '">' + esc(t('manCopy')) + '</button></div>';
    });

    html += section('manDesc', function () {
      return '<div class="man-block"><p>' + esc(local(cmd.desc)) + '</p></div>';
    });

    html += section('manOptions', function () {
      if (!opts.length) return '<div class="man-block"><p class="man-muted">' + esc(t('manNoOptions')) + '</p></div>';
      var out = '<div class="man-block"><div class="man-options">';
      for (var i = 0; i < opts.length; i++) {
        var o = opts[i] || {};
        var flag = String(o.flag || '');
        var meaning = local(o);
        out += '<div class="man-opt">';
        out += '<div class="man-opt-flag"><code>' + esc(flag) + '</code></div>';
        out += '<div class="man-opt-desc">' + esc(meaning) + '</div>';
        out += '<div class="man-opt-action"><button type="button" class="mini-btn man-copy-btn" data-copy="' + esc(flag) + '" aria-label="' + esc(t('manCopy')) + '">' + esc(t('manCopy')) + '</button></div>';
        out += '</div>';
      }
      out += '</div></div>';
      return out;
    });

    html += section('manExamples', function () {
      if (!exs.length) return '<div class="man-block"><p class="man-muted">' + esc(t('manNoExamples')) + '</p></div>';
      var out = '<div class="man-block man-examples">';
      for (var i = 0; i < exs.length; i++) {
        var ex = exs[i] || {};
        var cmdline = String(ex.cmd || '');
        out += '<div class="man-ex">';
        out += '<div class="man-ex-cmd"><pre><code>' + highlightCode(cmdline) + '</code></pre>';
        out += '<button type="button" class="mini-btn man-copy-btn" data-copy="' + esc(cmdline) + '" aria-label="' + esc(t('manCopy')) + '">' + esc(t('manCopy')) + '</button></div>';
        out += '<p class="man-ex-desc">' + esc(local(ex)) + '</p>';
        out += '</div>';
      }
      out += '</div>';
      return out;
    });

    html += section('manCategory', function () {
      var c = catById(cmd.category);
      return '<div class="man-block"><p><span class="man-cat-badge">' + esc(c.icon || '') + ' ' + esc(c[lang()] || c.uz || cmd.category || '') + '</span></p></div>';
    });

    html += section('manSeeAlso', function () {
      return '<div class="man-block">' + (seeAlso || '<p class="man-muted">—</p>') + '</div>';
    });

    container.innerHTML = html;
  }

  function section(key, innerFn) {
    var title = t(key);
    return '<section class="man-section">' +
      '<h2 class="man-section-title"><span>' + esc(title) + '</span></h2>' +
      innerFn() +
      '</section>';
  }

  function renderTopbar(cmd) {
    var nav = document.getElementById('manNavBtns');
    if (nav) nav.innerHTML = cmd ? renderNav(cmd) : '';
    var randomBtn = document.getElementById('manRandom');
    if (randomBtn && !randomBtn.__manBound) {
      randomBtn.__manBound = true;
      randomBtn.addEventListener('click', function () {
        var list = commands();
        if (!list.length) return;
        var pick = list[Math.floor(Math.random() * list.length)];
        if (pick && pick.id) window.location.href = commandUrl(pick.id);
      });
    }
  }

  function bindSearch() {
    var input = document.getElementById('manSearch');
    var results = document.getElementById('manResults');
    if (!input || !results || input.__manBound) return;
    input.__manBound = true;

    function close() { results.hidden = true; results.innerHTML = ''; input.setAttribute('aria-expanded', 'false'); }
    function open(list) {
      if (!list.length) { close(); return; }
      var html = '<ul class="man-result-list man-result-list--drop">';
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        html += '<li><a class="man-result-item" href="' + esc(commandUrl(c.id)) + '" data-man-result="' + esc(c.id) + '">';
        html += '<span class="man-result-name">' + esc(c.name) + '</span>';
        html += '<span class="man-result-desc">' + esc(local(c.desc)) + '</span>';
        html += '</a></li>';
      }
      html += '</ul>';
      results.innerHTML = html;
      results.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    input.addEventListener('input', function () {
      var q = String(input.value || '').trim();
      if (!q) { close(); return; }
      open(searchCmds(q, 8));
    });
    input.addEventListener('focus', function () {
      var q = String(input.value || '').trim();
      if (q) open(searchCmds(q, 8));
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); input.blur(); return; }
      if (e.key === 'Enter') {
        var q = String(input.value || '').trim();
        if (!q) return;
        var first = results.querySelector('[data-man-result]');
        var list = searchCmds(q, 8);
        if (first) {
          e.preventDefault();
          window.location.href = commandUrl(first.getAttribute('data-man-result'));
          return;
        }
        if (list.length) {
          e.preventDefault();
          window.location.href = commandUrl(list[0].id);
        }
      }
    });
    document.addEventListener('click', function (e) {
      if (results.hidden) return;
      if (e.target === input || results.contains(e.target)) return;
      close();
    });
  }

  function bindCopy(container) {
    if (!container || container.__manCopyBound) return;
    container.__manCopyBound = true;
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-copy]');
      if (!btn) return;
      var text = btn.getAttribute('data-copy') || '';
      copyText(text).then(function (ok) {
        if (ok) showToast(t('manCopied'));
      });
    });
  }

  function renderPage() {
    var container = document.getElementById('manPage');
    if (!container) return false;
    var id = getIdFromUrl();
    var cmd = findCmd(id);
    renderTopbar(cmd);
    bindSearch();
    bindCopy(container);
    if (!cmd) {
      updateMeta(null);
      renderNotFound(container, id);
      return true;
    }
    updateMeta(cmd);
    renderCommand(container, cmd);
    // update search input value to current command name for convenience
    var input = document.getElementById('manSearch');
    if (input && !input.value) input.value = cmd.name;
    return true;
  }

  // Inject "Full man page" link into existing modal
  function getModalCommandId() {
    try {
      var modal = document.getElementById('modal');
      if (!modal || modal.hidden) return '';
      // Prefer current hash #cmd=
      var m = String(window.location.hash || '').match(/^#cmd=(.+)$/);
      if (m) return decodeURIComponent(m[1]);
      // Fallback: data-copy-link or data-fav in modal
      var el = modal.querySelector('[data-copy-link], [data-fav]');
      if (el) return el.getAttribute('data-copy-link') || el.getAttribute('data-fav') || '';
      return '';
    } catch (e) { return ''; }
  }

  function ensureModalLink() {
    try {
      var modal = document.getElementById('modal');
      if (!modal) return;
      var body = modal.querySelector('#modalBody');
      if (!body) return;
      var id = getModalCommandId();
      var existing = body.querySelector('[data-man-link]');
      if (!id) {
        if (existing) existing.remove();
        return;
      }
      var href = commandUrl(id);
      if (existing) {
        existing.setAttribute('href', href);
        existing.textContent = t('manFullPage');
        return;
      }
      var actions = body.querySelector('.modal-actions');
      var link = document.createElement('a');
      link.className = 'btn btn--ghost man-modal-link';
      link.setAttribute('data-man-link', '1');
      link.setAttribute('href', href);
      link.setAttribute('target', '_self');
      link.textContent = t('manFullPage');
      if (actions) {
        actions.insertBefore(link, actions.firstChild);
      } else {
        var wrap = document.createElement('div');
        wrap.className = 'modal-actions';
        wrap.appendChild(link);
        body.appendChild(wrap);
      }
    } catch (e) { /* no-op */ }
  }

  function observeModal() {
    try {
      var modal = document.getElementById('modal');
      if (!modal || modal.__manObserved) return;
      modal.__manObserved = true;
      var schedule = function () {
        setTimeout(ensureModalLink, 0);
      };
      schedule();
      if (typeof MutationObserver !== 'undefined') {
        var mo = new MutationObserver(function () { schedule(); });
        mo.observe(modal, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
      } else {
        setInterval(schedule, 500);
      }
      window.addEventListener('hashchange', schedule);
      document.addEventListener('langchange', function () { schedule(); });
    } catch (e) { /* no-op */ }
  }

  function initI18nLabels() {
    try {
      // If global I18N exists, add our keys so data-i18n elements on command.html get translated
      if (window.I18N && window.I18N.dict) {
        var d = window.I18N.dict;
        ['uz', 'ru', 'en'].forEach(function (lc) {
          if (!d[lc]) return;
          if (!d[lc].manSearchLabel) d[lc].manSearchLabel = DICT[lc].manSearchLabel;
          if (!d[lc].manSearchPh) d[lc].manSearchPh = DICT[lc].manSearchPh;
          if (!d[lc].manRandom) d[lc].manRandom = DICT[lc].manRandom;
          if (!d[lc].navAll) d[lc].navAll = lc === 'ru' ? 'Все страницы' : (lc === 'en' ? 'All pages' : 'Barcha sahifalar');
        });
        if (window.I18N.apply) window.I18N.apply();
      }
    } catch (e) { /* no-op */ }
  }

  function init() {
    try {
      initI18nLabels();
      var isManPage = !!document.getElementById('manPage');
      if (isManPage) {
        renderPage();
        document.addEventListener('langchange', function () {
          initI18nLabels();
          renderPage();
        });
      }
      observeModal();
    } catch (e) { /* no-op */ }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
