/* Mini-testga qo'shimcha: vaqt rejimi, kategoriya, badge va natijalar jadvali.
 * Eski test elementlari va logikasi o'zgartirilmaydi — faqat kuzatiladi va qo'shiladi. */
(function () {
  'use strict';

  var BEST_KEY = 'kali_quiz_best';
  var BADGES_KEY = 'kali_quiz_badges';
  var CAT_KEY = 'kali_quiz_category';

  var QUIZ_I18N = {
    uz: {
      qpTimeLabel: 'Vaqt rejimi',
      qpTimeOff: 'Cheklanmagan',
      qpTime30: '30 soniya',
      qpTime60: '60 soniya',
      qpCategory: 'Kategoriya',
      qpCategoryAll: 'Barchasi',
      qpResults: 'Natijalar jadvali',
      qpTimer: 'Qolgan vaqt',
      qpTimeUp: 'Vaqt tugadi! Eski test javoblarini tanlab tugatishingiz mumkin.',
      qpTimeStarted: 'Vaqt boshlandi',
      qpTimeStopped: 'Vaqt rejimi o‘chirildi.',
      qpCategoryNote: 'Bu test savolida {n} / {total} ta javob tanlandi.',
      qpBadgeLabel: 'Nishon',
      qpBadgeBronze: 'Bronza',
      qpBadgeSilver: 'Kumush',
      qpBadgeGold: 'Oltin',
      qpBestBadge: 'Eng yaxshi nishon:',
      qpNoBadge: 'Hali nishon yo‘q',
      qpResultsMissing: 'Natijalar jadvali yuklanmadi.'
    },
    ru: {
      qpTimeLabel: 'Режим времени',
      qpTimeOff: 'Без ограничений',
      qpTime30: '30 секунд',
      qpTime60: '60 секунд',
      qpCategory: 'Категория',
      qpCategoryAll: 'Все',
      qpResults: 'Таблица результатов',
      qpTimer: 'Осталось',
      qpTimeUp: 'Время вышло! Вы можете завершить тест, выбрав ответы.',
      qpTimeStarted: 'Отсчёт начат',
      qpTimeStopped: 'Режим времени выключен.',
      qpCategoryNote: 'В этом вопросе выбрано {n} / {total} вариантов.',
      qpBadgeLabel: 'Значок',
      qpBadgeBronze: 'Бронза',
      qpBadgeSilver: 'Серебро',
      qpBadgeGold: 'Золото',
      qpBestBadge: 'Лучший значок:',
      qpNoBadge: 'Значков пока нет',
      qpResultsMissing: 'Таблица результатов не загружена.'
    },
    en: {
      qpTimeLabel: 'Time mode',
      qpTimeOff: 'Unlimited',
      qpTime30: '30 seconds',
      qpTime60: '60 seconds',
      qpCategory: 'Category',
      qpCategoryAll: 'All',
      qpResults: 'Leaderboard',
      qpTimer: 'Time left',
      qpTimeUp: 'Time is up! You can still finish the quiz by picking answers.',
      qpTimeStarted: 'Timer started',
      qpTimeStopped: 'Time mode is off.',
      qpCategoryNote: '{n} / {total} options in this question match.',
      qpBadgeLabel: 'Badge',
      qpBadgeBronze: 'Bronze',
      qpBadgeSilver: 'Silver',
      qpBadgeGold: 'Gold',
      qpBestBadge: 'Best badge:',
      qpNoBadge: 'No badges yet',
      qpResultsMissing: 'Leaderboard is not loaded.'
    }
  };

  var root = null;
  var card = null;
  var bar = null;
  var timeSel = null;
  var catSel = null;
  var tableBtn = null;
  var timerBox = null;
  var timerBar = null;
  var timerText = null;
  var timerLabel = null;
  var note = null;
  var bestBadge = null;
  var timerId = null;
  var deadline = 0;
  var mode = 0;
  var lastStep = '';
  var busy = false;
  var pollId = null;

  function byId(id) { return document.getElementById(id); }

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

  function read(key, fallback) {
    try {
      var raw = JSON.parse(localStorage.getItem(key) || '');
      return raw == null ? fallback : raw;
    } catch (e) { return fallback; }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function announce(message) { if (note) note.textContent = message; }

  function badgeOf(pct) {
    if (pct >= 71) return 'gold';
    if (pct >= 41) return 'silver';
    return 'bronze';
  }

  function badgeName(kind) {
    if (kind === 'gold') return t('qpBadgeGold');
    if (kind === 'silver') return t('qpBadgeSilver');
    return t('qpBadgeBronze');
  }

  function buildControls() {
    if (!card || !card.parentNode || byId('quizPlusBar')) return;

    bar = document.createElement('div');
    bar.className = 'quiz-plus-bar';
    bar.id = 'quizPlusBar';
    bar.innerHTML =
      '<label class="qp-control"><span id="qpTimeLabel">' + esc(t('qpTimeLabel')) + '</span>' +
        '<select id="qpTime">' +
          '<option value="0">' + esc(t('qpTimeOff')) + '</option>' +
          '<option value="30">' + esc(t('qpTime30')) + '</option>' +
          '<option value="60">' + esc(t('qpTime60')) + '</option>' +
        '</select></label>' +
      '<label class="qp-control"><span id="qpCategoryLabel">' + esc(t('qpCategory')) + '</span>' +
        '<select id="qpCategory"><option value="all">' + esc(t('qpCategoryAll')) + '</option></select></label>' +
      '<button type="button" class="btn btn--ghost btn--sm" id="qpResults">' + esc(t('qpResults')) + '</button>' +
      '<div class="qp-timer" id="qpTimer" hidden>' +
        '<span id="qpTimerLabel">' + esc(t('qpTimer')) + '</span>' +
        '<div class="qp-timer__track"><div class="qp-timer__bar" id="qpTimerBar"></div></div>' +
        '<b id="qpTimerText">—</b>' +
      '</div>' +
      '<p class="qp-note" id="qpNote" role="status" aria-live="polite"></p>';

    card.parentNode.insertBefore(bar, card);

    timeSel = byId('qpTime');
    catSel = byId('qpCategory');
    tableBtn = byId('qpResults');
    timerBox = byId('qpTimer');
    timerBar = byId('qpTimerBar');
    timerText = byId('qpTimerText');
    timerLabel = byId('qpTimerLabel');
    note = byId('qpNote');
    fillCategories();

    timeSel.addEventListener('change', function () {
      mode = Number(timeSel.value) || 0;
      if (!mode) {
        stopTimer();
        if (timerBox) timerBox.hidden = true;
        announce(t('qpTimeStopped'));
      } else {
        lastStep = '';
        startTimer();
        announce(t('qpTimeStarted'));
      }
    });

    catSel.addEventListener('change', function () {
      try { localStorage.setItem(CAT_KEY, catSel.value); } catch (e) {}
      updateCategoryNote();
    });

    tableBtn.addEventListener('click', function () {
      if (window.KaliLeaderboard && typeof window.KaliLeaderboard.show === 'function') window.KaliLeaderboard.show();
      else announce(t('qpResultsMissing'));
    });

    document.addEventListener('langchange', relabel);
  }

  function fillCategories() {
    if (!catSel) return;
    var selected = catSel.value || 'all';
    var cats = window.CATEGORIES;
    var html = '<option value="all">' + esc(t('qpCategoryAll')) + '</option>';
    if (Array.isArray(cats)) {
      cats.forEach(function (cat) {
        if (!cat || !cat.id || cat.id === 'all') return;
        html += '<option value="' + esc(cat.id) + '">' +
          esc(cat[lang()] || cat.uz || cat.ru || cat.en || cat.id) + '</option>';
      });
    }
    catSel.innerHTML = html;
    try { selected = localStorage.getItem(CAT_KEY) || selected; } catch (e) {}
    catSel.value = selected;
    if (!catSel.value) catSel.value = 'all';
    updateCategoryNote();
  }

  function updateCategoryNote() {
    if (!catSel || !note || !card) return;
    var cat = catSel.value;
    var ids = [];
    card.querySelectorAll('#quizOptions [data-quiz-opt]').forEach(function (btn) {
      ids.push(btn.getAttribute('data-quiz-opt'));
    });
    if (cat === 'all') { note.textContent = ''; return; }
    var commands = Array.isArray(window.LINUX_COMMANDS) ? window.LINUX_COMMANDS : [];
    var hit = ids.filter(function (id) {
      return commands.some(function (cmd) { return cmd && cmd.id === id && cmd.category === cat; });
    }).length;
    note.textContent = t('qpCategoryNote').replace('{n}', String(hit)).replace('{total}', String(ids.length));
  }

  function relabel() {
    var timeLabel = byId('qpTimeLabel');
    var catLabel = byId('qpCategoryLabel');
    if (timeLabel) timeLabel.textContent = t('qpTimeLabel');
    if (catLabel) catLabel.textContent = t('qpCategory');
    if (timeSel) {
      var modeValue = timeSel.value;
      timeSel.innerHTML = '<option value="0">' + esc(t('qpTimeOff')) + '</option>' +
        '<option value="30">' + esc(t('qpTime30')) + '</option>' +
        '<option value="60">' + esc(t('qpTime60')) + '</option>';
      timeSel.value = modeValue;
    }
    if (tableBtn) tableBtn.textContent = t('qpResults');
    if (timerLabel) timerLabel.textContent = t('qpTimer');
    fillCategories();
    renderBestBadge();
  }

  function stopTimer() {
    if (timerId !== null) { clearInterval(timerId); timerId = null; }
  }

  function timeUp() {
    var target = card.querySelector('.quiz-result') || byId('quizFeedback') || card;
    if (target && !target.querySelector('.qp-timeup')) {
      var message = document.createElement('div');
      message.className = 'qp-timeup';
      message.setAttribute('role', 'status');
      message.textContent = t('qpTimeUp');
      target.appendChild(message);
    }
    announce(t('qpTimeUp'));
  }

  function tick() {
    var left = Math.max(0, deadline - Date.now());
    var span = mode * 1000;
    if (timerBar) timerBar.style.width = (span ? Math.max(0, Math.min(100, left / span * 100)) : 0) + '%';
    if (timerText) timerText.textContent = Math.ceil(left / 1000) + 's';
    if (timerBox) timerBox.classList.toggle('is-low', left <= 5000);
    if (left <= 0) { stopTimer(); timeUp(); }
  }

  function startTimer() {
    stopTimer();
    if (!mode || !card) return;
    if (card.querySelector('.quiz-result')) return;
    deadline = Date.now() + mode * 1000;
    if (timerBox) timerBox.hidden = false;
    tick();
    timerId = setInterval(tick, 250);
  }

  function updateBest(pct, score, total) {
    var best = read(BEST_KEY, null);
    if (!best || typeof best !== 'object' || Array.isArray(best) || !isFinite(Number(best.pct)) || pct > Number(best.pct)) {
      write(BEST_KEY, { pct: pct, score: score, total: total });
    }
  }

  function updateBadges(pct, score, total) {
    var data = read(BADGES_KEY, {});
    if (!data || typeof data !== 'object' || Array.isArray(data)) data = {};
    var kind = badgeOf(pct);
    var row = data[kind];
    if (!row || typeof row !== 'object' || !isFinite(Number(row.pct)) || pct > Number(row.pct)) {
      data[kind] = { pct: pct, score: score, total: total, ts: Date.now() };
    }
    write(BADGES_KEY, data);
  }

  function renderBestBadge() {
    if (!root) return;
    var head = root.querySelector('.section__head');
    if (!head) return;
    bestBadge = byId('qpBestBadge');
    if (!bestBadge) {
      bestBadge = document.createElement('span');
      bestBadge.className = 'qp-best-badge';
      bestBadge.id = 'qpBestBadge';
      var anchor = byId('quizBest');
      if (anchor && anchor.parentNode === head) head.insertBefore(bestBadge, anchor.nextSibling);
      else head.appendChild(bestBadge);
    }
    var data = read(BADGES_KEY, {});
    var kinds = ['gold', 'silver', 'bronze'];
    var earned = '';
    for (var i = 0; i < kinds.length; i++) {
      if (data && data[kinds[i]] && typeof data[kinds[i]] === 'object') { earned = kinds[i]; break; }
    }
    bestBadge.className = 'qp-best-badge qp-badge--' + (earned || 'none');
    bestBadge.textContent = t('qpBestBadge') + ' ' + (earned ? badgeName(earned) : t('qpNoBadge'));
  }

  function addResultBadge(result, pct) {
    if (!result || result.querySelector('.qp-result-badge')) return;
    var kind = badgeOf(pct);
    var badge = document.createElement('span');
    badge.className = 'qp-result-badge qp-badge--' + kind;
    badge.textContent = t('qpBadgeLabel') + ': ' + badgeName(kind);
    result.appendChild(badge);
  }

  function checkResult() {
    if (busy || !card) return;
    var result = card.querySelector('.quiz-result');
    if (!result) return;
    busy = true;
    try {
      stopTimer();
      var ofText = '';
      var scoreNode = result.querySelector('.quiz-result__of');
      var pctNode = result.querySelector('.quiz-result__score');
      if (scoreNode) ofText = scoreNode.textContent || '';
      var pctMatch = pctNode ? (pctNode.textContent || '').match(/(\d+)\s*%/) : null;
      var pct = pctMatch ? Number(pctMatch[1]) : NaN;

      /* Eski test matni "4 dan 5" / "4 из 5" yoki "4 / 5" ko'rinishida bo'lishi mumkin. */
      var match = ofText.match(/(\d+)\s*\/\s*(\d+)/) ||
        (result.textContent || '').match(/(\d+)\s*\/\s*(\d+)/) ||
        ofText.match(/(\d+)\s+[^\d\/%]{1,16}\s+(\d+)/);
      var score = match ? Number(match[1]) : NaN;
      var total = match ? Number(match[2]) : NaN;
      var best = read(BEST_KEY, null);
      if ((!isFinite(total) || total <= 0) && best && Number(best.total) > 0) total = Number(best.total);
      if (!isFinite(score) && best && isFinite(Number(best.score))) score = Number(best.score);
      if (!isFinite(total) || total <= 0) total = 5;
      if (!isFinite(score) || score < 0) score = isFinite(pct) ? Math.round(pct / 100 * total) : 0;
      if (score > total) score = total;
      if (!isFinite(pct)) pct = Math.round(score / total * 100);
      pct = Math.max(0, Math.min(100, pct));

      updateBest(pct, score, total);
      updateBadges(pct, score, total);
      renderBestBadge();
      addResultBadge(result, pct);
      if (window.KaliLeaderboard && typeof window.KaliLeaderboard.submit === 'function') {
        window.KaliLeaderboard.submit(score, total);
      }
    } finally {
      busy = false;
    }
  }

  function watch() {
    var step = byId('quizStep');
    var question = byId('quizQuestion');
    function check() {
      checkResult();
      var current = step ? (step.textContent || '') : '';
      if (current !== lastStep) { lastStep = current; startTimer(); }
      updateCategoryNote();
    }
    if (typeof MutationObserver === 'function' && question) {
      var observer = new MutationObserver(check);
      observer.observe(question, { childList: true, subtree: true, characterData: true });
      if (step) observer.observe(step, { childList: true, subtree: true, characterData: true });
      if (byId('quizFeedback')) observer.observe(byId('quizFeedback'), { childList: true, subtree: true, characterData: true });
    } else {
      pollId = setInterval(check, 500);
    }
    check();
  }

  function init() {
    root = byId('quiz');
    if (!root) return;
    card = byId('quizCard');
    if (!card) return;
    buildControls();
    renderBestBadge();
    watch();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
