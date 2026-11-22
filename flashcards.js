/* Kartalar bilan takrorlash: soddalashtirilgan SM-2, filtrlar va qidiruv.
 * Hech qanday shaxsiy ma'lumot yig'maydi — faqat localStorage progress. */
(function () {
  'use strict';

  var KEY = 'kali_flash_progress';
  var DAY = 864e5;
  var MINUTE = 6e4;
  var INTERVALS = [1, 2, 4, 7, 15, 30];
  var LIMIT = 81;

  var QUIZ_I18N = {
    uz: {
      allPages: 'Barcha sahifalar',
      skipLink: 'Asosiy qismga o‘tish',
      footerText: '© 2026 Kali Linux — buyruqlar va vositalar',
      pageTitle: 'Kartalar bilan takrorlash',
      pageLead: 'Kartani bosing — tavsif va misollar ochiladi. Keyin “Bilaman” yoki “Bilmayman” bilan baholang.',
      progressTitle: 'O‘zlashtirish',
      filterCategory: 'Kategoriya',
      filterStatus: 'Holat',
      statusAll: 'Barchasi',
      statusNew: 'Yangi',
      statusLearning: 'O‘rganilmoqda',
      statusKnown: 'Bilaman',
      searchTitle: 'Qidiruv',
      searchPh: 'Buyruq, tavsif yoki misol...',
      tapToFlip: 'Tavsifni ochish uchun bosing',
      syntaxLabel: 'Sintaksis',
      btnKnow: 'Bilaman',
      btnDontKnow: 'Bilmayman',
      cardHint: 'Bo‘sh joy / Enter — ochish · 1 — bilaman · 2 — bilmayman',
      btnShuffle: 'Aralashtirish',
      btnReset: 'Qayta boshlash',
      btnHome: 'Asosiy sahifaga',
      descLabel: 'Tavsif',
      examplesLabel: 'Misollar',
      rateLabel: 'Kartani baholash',
      msgKnow: 'Yaxshi! Keyingi takrorlash 1 kundan keyin.',
      msgAgain: 'Hech qisi yo‘q — 1 daqiqadan so‘ng yana chiqadi.',
      emptyTitle: 'Kartalar topilmadi',
      emptyText: 'Filtr yoki qidiruvni o‘zgartirib ko‘ring.',
      resetConfirm: 'Barcha kartalarning progressi o‘chirilsinmi?',
      resetDone: 'Progress tozalandi. Boshidan boshlaymiz.',
      shuffleDone: 'Kartalar aralashtirildi.',
      countCards: 'Tanlangan: {n} ta karta',
      noCommands: 'Buyruqlar ma’lumoti topilmadi.',
      boxLabel: 'Bosqich',
      dueLabel: 'Keyingi takrorlash',
      todayLabel: 'bugun',
      minutesLabel: 'dqiq'
    },
    ru: {
      allPages: 'Все страницы',
      skipLink: 'Перейти к основному содержанию',
      footerText: '© 2026 Kali Linux — команды и инструменты',
      pageTitle: 'Повторение по карточкам',
      pageLead: 'Нажмите на карточку — откроются описание и примеры. Затем оцените: «Знаю» или «Не знаю».',
      progressTitle: 'Прогресс',
      filterCategory: 'Категория',
      filterStatus: 'Статус',
      statusAll: 'Все',
      statusNew: 'Новые',
      statusLearning: 'Изучаются',
      statusKnown: 'Знаю',
      searchTitle: 'Поиск',
      searchPh: 'Команда, описание или пример...',
      tapToFlip: 'Нажмите, чтобы открыть описание',
      syntaxLabel: 'Синтаксис',
      btnKnow: 'Знаю',
      btnDontKnow: 'Не знаю',
      cardHint: 'Пробел / Enter — открыть · 1 — знаю · 2 — не знаю',
      btnShuffle: 'Перемешать',
      btnReset: 'Начать заново',
      btnHome: 'На главную',
      descLabel: 'Описание',
      examplesLabel: 'Примеры',
      rateLabel: 'Оценка карточки',
      msgKnow: 'Отлично! Следующее повторение через 1 день.',
      msgAgain: 'Ничего страшного — вернёмся через 1 минуту.',
      emptyTitle: 'Карточки не найдены',
      emptyText: 'Измените фильтр или запрос.',
      resetConfirm: 'Удалить прогресс всех карточек?',
      resetDone: 'Прогресс очищен. Начинаем заново.',
      shuffleDone: 'Карточки перемешаны.',
      countCards: 'Выбрано: {n} карточек',
      noCommands: 'Данные о командах не найдены.',
      boxLabel: 'Уровень',
      dueLabel: 'Следующее повторение',
      todayLabel: 'сегодня',
      minutesLabel: 'мин'
    },
    en: {
      allPages: 'All pages',
      skipLink: 'Skip to main content',
      footerText: '© 2026 Kali Linux — commands and tools',
      pageTitle: 'Flashcard revision',
      pageLead: 'Tap the card to reveal the description and examples. Then rate it: “Know” or “Don’t know”.',
      progressTitle: 'Progress',
      filterCategory: 'Category',
      filterStatus: 'Status',
      statusAll: 'All',
      statusNew: 'New',
      statusLearning: 'Learning',
      statusKnown: 'Known',
      searchTitle: 'Search',
      searchPh: 'Command, description or example...',
      tapToFlip: 'Tap to reveal the description',
      syntaxLabel: 'Syntax',
      btnKnow: 'Know',
      btnDontKnow: 'Don’t know',
      cardHint: 'Space / Enter — reveal · 1 — know · 2 — don’t know',
      btnShuffle: 'Shuffle',
      btnReset: 'Start over',
      btnHome: 'Back to home',
      descLabel: 'Description',
      examplesLabel: 'Examples',
      rateLabel: 'Rate this card',
      msgKnow: 'Nice! Next review in 1 day.',
      msgAgain: 'No problem — it will return in 1 minute.',
      emptyTitle: 'No cards found',
      emptyText: 'Try changing the filter or search query.',
      resetConfirm: 'Clear progress for all cards?',
      resetDone: 'Progress cleared. Starting over.',
      shuffleDone: 'Cards shuffled.',
      countCards: 'Selected: {n} cards',
      noCommands: 'Command data not found.',
      boxLabel: 'Box',
      dueLabel: 'Next review',
      todayLabel: 'today',
      minutesLabel: 'min'
    }
  };

  var ownLang = 'uz';
  var all = [];
  var pool = [];
  var progress = {};
  var current = null;
  var flipped = false;
  var nodes = {};

  function byId(id) { return document.getElementById(id); }

  function lang() {
    var l = window.I18N && typeof window.I18N.getLang === 'function' ? window.I18N.getLang() : ownLang;
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

  function normalize(value) {
    return String(value == null ? '' : value)
      .replace(/[’`´]/g, '').toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  function readProgress() {
    var raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { raw = null; }
    var out = {};
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
    Object.keys(raw).forEach(function (id) {
      if (id === '__proto__' || id === 'constructor' || id === 'prototype') return;
      var rec = raw[id];
      if (!rec || typeof rec !== 'object') return;
      var box = Math.floor(Number(rec.box));
      var due = Number(rec.due);
      var reps = Math.floor(Number(rec.reps));
      out[id] = {
        box: isFinite(box) ? Math.max(0, Math.min(5, box)) : 0,
        due: isFinite(due) && due > 0 ? due : 0,
        reps: isFinite(reps) && reps >= 0 ? reps : 0
      };
    });
    return out;
  }

  function saveProgress() {
    try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) {}
  }

  function categoryLabel(id) {
    var cats = window.CATEGORIES;
    if (Array.isArray(cats)) {
      for (var i = 0; i < cats.length; i++) {
        if (cats[i] && cats[i].id === id) {
          return cats[i][lang()] || cats[i].uz || cats[i].ru || cats[i].en || id;
        }
      }
    }
    return id || '—';
  }

  function statusOf(id) {
    var rec = progress[id];
    if (!rec) return 'new';
    return rec.box >= 3 ? 'known' : 'learning';
  }

  function say(message) {
    if (nodes.live) nodes.live.textContent = message;
  }

  function matches(cmd, query) {
    if (!query) return true;
    var parts = [cmd.name, cmd.syntax, cmd.category, categoryLabel(cmd.category)];
    ['uz', 'ru', 'en'].forEach(function (code) {
      if (cmd.desc && cmd.desc[code]) parts.push(cmd.desc[code]);
    });
    (cmd.tags || []).forEach(function (x) { parts.push(x); });
    (window.COMMAND_SYNONYMS && window.COMMAND_SYNONYMS[cmd.id] || []).forEach(function (x) { parts.push(x); });
    (cmd.examples || []).forEach(function (ex) {
      if (!ex) return;
      parts.push(ex.cmd);
      ['uz', 'ru', 'en'].forEach(function (code) { if (ex[code]) parts.push(ex[code]); });
    });
    return normalize(parts.join(' ')).indexOf(query) !== -1;
  }

  function refreshPool() {
    var cat = nodes.category ? nodes.category.value : 'all';
    var status = nodes.status ? nodes.status.value : 'all';
    var query = normalize(nodes.search ? nodes.search.value : '');
    var now = Date.now();
    var list = all.filter(function (cmd) {
      if (cat !== 'all' && cmd.category !== cat) return false;
      if (status !== 'all' && statusOf(cmd.id) !== status) return false;
      return matches(cmd, query);
    });
    /* Avval muddati yetganlar (eskidan yangisiga), keyin yangi kartalar, so'ngra kutilayotganlar. */
    pool = list.map(function (cmd, i) {
      return { cmd: cmd, i: i, rec: progress[cmd.id], due: progress[cmd.id] ? Number(progress[cmd.id].due) : 0 };
    }).sort(function (a, b) {
      var ad = a.rec && a.due <= now;
      var bd = b.rec && b.due <= now;
      if (ad && bd) return (a.due - b.due) || (a.i - b.i);
      if (ad) return -1;
      if (bd) return 1;
      if (!a.rec && !b.rec) return a.i - b.i;
      if (!a.rec) return -1;
      if (!b.rec) return 1;
      return (a.due - b.due) || (a.i - b.i);
    }).map(function (row) { return row.cmd; });
    return pool;
  }

  function fillCategories() {
    if (!nodes.category) return;
    var selected = nodes.category.value || 'all';
    var cats = window.CATEGORIES;
    if (!Array.isArray(cats) || !cats.length) {
      var seen = {}, derived = [{ id: 'all' }];
      all.forEach(function (cmd) {
        var id = cmd.category || 'other';
        if (id !== 'all' && !seen[id]) { seen[id] = 1; derived.push({ id: id }); }
      });
      cats = derived;
    }
    var html = '';
    cats.forEach(function (cat) {
      if (!cat || !cat.id) return;
      var label = cat[lang()] || cat.uz || cat.ru || cat.en || cat.id;
      html += '<option value="' + esc(cat.id) + '">' + esc(label) + '</option>';
    });
    if (!/^<option value="all"/.test(html)) {
      html = '<option value="all">' + esc(t('statusAll')) + '</option>' + html;
    }
    nodes.category.innerHTML = html;
    nodes.category.value = selected;
    if (!nodes.category.value) nodes.category.value = 'all';
  }

  function applyStatic() {
    document.querySelectorAll('[data-qi18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-qi18n'));
    });
    document.querySelectorAll('[data-qi18n-ph]').forEach(function (node) {
      node.setAttribute('placeholder', t(node.getAttribute('data-qi18n-ph')));
    });
    document.documentElement.lang = lang();
  }

  function renderProgress() {
    var known = all.filter(function (cmd) { return statusOf(cmd.id) === 'known'; }).length;
    var total = all.length;
    var pct = total ? Math.round(known / total * 100) : 0;
    if (nodes.progressText) nodes.progressText.textContent = known + ' / ' + total + ' · ' + pct + '%';
    if (nodes.progressBar) nodes.progressBar.style.width = pct + '%';
    if (nodes.counter) nodes.counter.textContent = t('countCards').replace('{n}', String(pool.length));
  }

  function setFlipped(value) {
    flipped = !!value && !!current;
    if (!nodes.front || !nodes.back || !nodes.card) return;
    nodes.front.hidden = flipped;
    nodes.back.hidden = !flipped;
    nodes.card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
  }

  function renderCard() {
    if (!nodes.card) return;
    var flipHint = nodes.card.querySelector('.fc-card__flip');
    var rateGroup = nodes.card.querySelector('.fc-rate');

    if (!current) {
      nodes.num.textContent = '—';
      nodes.name.textContent = t('emptyTitle');
      nodes.categoryEl.textContent = t('emptyText');
      nodes.backName.textContent = '—';
      nodes.backCategory.textContent = '—';
      nodes.syntax.textContent = '—';
      nodes.desc.innerHTML = '';
      nodes.examples.innerHTML = '';
      if (flipHint) flipHint.hidden = true;
      if (rateGroup) rateGroup.hidden = true;
      setFlipped(false);
      return;
    }

    if (flipHint) flipHint.hidden = false;
    if (rateGroup) rateGroup.hidden = false;
    nodes.num.textContent = String(all.indexOf(current) + 1);
    nodes.name.textContent = current.name || '—';
    nodes.categoryEl.textContent = categoryLabel(current.category);
    nodes.backName.textContent = current.name || '—';
    nodes.backCategory.textContent = categoryLabel(current.category);
    nodes.syntax.textContent = current.syntax || '—';

    var l = lang();
    nodes.desc.innerHTML = '<div class="fc-block__label">' + esc(t('descLabel')) + '</div>' +
      ['uz', 'ru', 'en'].map(function (code) {
        var text = current.desc && current.desc[code] ? current.desc[code] : '—';
        return '<div class="fc-desc__row"><b>' + esc(code.toUpperCase()) + '</b><span>' + esc(text) + '</span></div>';
      }).join('');

    var examples = (current.examples || []).slice(0, 2);
    nodes.examples.innerHTML = '<div class="fc-block__label">' + esc(t('examplesLabel')) + '</div>' +
      (examples.length
        ? examples.map(function (ex) {
            return '<div class="fc-example"><code>' + esc(ex.cmd) + '</code><span>' +
              esc(ex[l] || ex.uz || ex.ru || ex.en || '') + '</span></div>';
          }).join('')
        : '<span class="fc-muted">—</span>');

    var rec = progress[current.id];
    if (rec && flipHint) {
      flipHint.textContent = t('tapToFlip') + ' · ' + t('boxLabel') + ' ' + (rec.box + 1);
    } else if (flipHint) {
      flipHint.textContent = t('tapToFlip');
    }
    setFlipped(flipped);
  }

  function pickFirst() {
    current = pool.length ? pool[0] : null;
    flipped = false;
    renderCard();
  }

  function rate(kind) {
    if (!current) return;
    var now = Date.now();
    var rec = progress[current.id] || { box: 0, due: 0, reps: 0 };
    if (kind === 'know') {
      var box = Math.min(5, rec.box + 1);
      rec = { box: box, due: now + INTERVALS[box] * DAY, reps: rec.reps + 1 };
    } else {
      rec = { box: 0, due: now + MINUTE, reps: rec.reps + 1 };
    }
    progress[current.id] = rec;
    saveProgress();
    say(kind === 'know' ? t('msgKnow') : t('msgAgain'));

    var previous = current.id;
    refreshPool();
    var index = -1;
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].id === previous) { index = i; break; }
    }
    current = pool.length ? pool[(index + 1) % pool.length] : null;
    flipped = false;
    renderCard();
    renderProgress();
  }

  function bind() {
    if (nodes.card) {
      nodes.card.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest ? e.target.closest('[data-rate]') : null;
        if (btn) { rate(btn.getAttribute('data-rate')); return; }
        setFlipped(!flipped);
      });
    }
    if (nodes.know) nodes.know.addEventListener('click', function () { rate('know'); });
    if (nodes.dont) nodes.dont.addEventListener('click', function () { rate('again'); });
    if (nodes.shuffle) nodes.shuffle.addEventListener('click', function () {
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      pickFirst();
      renderProgress();
      say(t('shuffleDone'));
    });
    if (nodes.reset) nodes.reset.addEventListener('click', function () {
      if (!window.confirm(t('resetConfirm'))) return;
      progress = {};
      saveProgress();
      refreshPool();
      pickFirst();
      renderProgress();
      say(t('resetDone'));
    });

    [nodes.category, nodes.status].forEach(function (select) {
      if (select) select.addEventListener('change', function () {
        refreshPool(); pickFirst(); renderProgress();
      });
    });
    if (nodes.search) nodes.search.addEventListener('input', function () {
      refreshPool(); pickFirst(); renderProgress();
    });

    document.addEventListener('keydown', function (e) {
      var target = e.target;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName || ''))) return;
      if (e.key === '1') { e.preventDefault(); rate('know'); }
      else if (e.key === '2') { e.preventDefault(); rate('again'); }
      else if ((e.key === 'Enter' || e.key === ' ') && nodes.card && nodes.card.contains(target)) {
        e.preventDefault();
        setFlipped(!flipped);
      }
    });

    document.querySelectorAll('[data-quiz-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-quiz-lang');
        if (window.I18N && typeof window.I18N.setLang === 'function') window.I18N.setLang(next);
        else {
          ownLang = Object.prototype.hasOwnProperty.call(QUIZ_I18N, next) ? next : 'uz';
          document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: ownLang } }));
        }
      });
    });

    document.addEventListener('langchange', function (e) {
      var detailLang = e && e.detail ? e.detail.lang : null;
      if (detailLang && Object.prototype.hasOwnProperty.call(QUIZ_I18N, detailLang)) ownLang = detailLang;
      else if (window.I18N && typeof window.I18N.getLang === 'function') ownLang = lang();
      document.querySelectorAll('[data-quiz-lang]').forEach(function (btn) {
        var active = btn.getAttribute('data-quiz-lang') === lang();
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      var rateGroup = nodes.card ? nodes.card.querySelector('.fc-rate') : null;
      if (rateGroup) rateGroup.setAttribute('aria-label', t('rateLabel'));
      applyStatic();
      fillCategories();
      refreshPool();
      renderCard();
      renderProgress();
    });
  }

  function init() {
    nodes = {
      card: byId('fcCard'), front: byId('fcFront'), back: byId('fcBack'),
      num: byId('fcCardNum'), name: byId('fcCardName'), categoryEl: byId('fcCardCategory'),
      backName: byId('fcBackName'), backCategory: byId('fcBackCategory'), syntax: byId('fcSyntax'),
      desc: byId('fcDesc'), examples: byId('fcExamples'),
      progressText: byId('fcProgressText'), progressBar: byId('fcProgressBar'), counter: byId('fcCounter'),
      category: byId('fcCategory'), status: byId('fcStatus'), search: byId('fcSearch'),
      know: byId('fcKnow'), dont: byId('fcDontKnow'), shuffle: byId('fcShuffle'),
      reset: byId('fcReset'), live: byId('fcLive')
    };
    if (!nodes.card) return;

    var source = window.LINUX_COMMANDS;
    all = Array.isArray(source) ? source.slice(0, LIMIT).filter(function (cmd) {
      return cmd && cmd.id && cmd.name;
    }) : [];
    progress = readProgress();
    applyStatic();

    if (!all.length && nodes.name) {
      nodes.name.textContent = t('noCommands');
      return;
    }

    fillCategories();
    bind();
    refreshPool();
    pickFirst();
    renderProgress();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
