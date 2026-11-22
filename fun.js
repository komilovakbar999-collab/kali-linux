/* Qo'shimcha o'yinlar: buyruq ruletkasi, "buyruqni top" mini-o'yini va natijani rasm qilib ulashish.
 * Mavjud fayllar o'zgartirilmaydi — hamma narsa yaratiladi va kuzatiladi, xolos. */
(function () {
  'use strict';

  var DICT = {
    uz: {
      funRouletteKicker: 'TASODIFIY TANLOV',
      funRouletteTitle: 'Buyruq ruletkasi',
      funRouletteHint: 'Tugmani bosing — tasodifiy buyruq tanlanadi.',
      funSpin: 'Tasodifiy buyruq',
      funSpinning: 'Tanlanmoqda…',
      funOpen: 'Ochish',
      funSyntax: 'Sintaksis',
      funGameKicker: 'O‘YIN',
      funGameTitle: 'Buyruqni top',
      funGameIntro: 'Tavsifni o‘qing va 5 raundda to‘g‘ri buyruqni tanlang. Har raundga 10 soniya.',
      funGameStart: 'Boshlash',
      funGameStep: 'Raund',
      funGameScore: 'Natija',
      funGameRight: 'To‘g‘ri!',
      funGameWrong: 'Noto‘g‘ri. To‘g‘ri javob: {name}',
      funGameTimeout: 'Vaqt tugadi! To‘g‘ri javob: {name}',
      funGameFinal: 'Natijangiz: {score} / {total}',
      funGameBest: 'Eng yaxshi: {score} / {total}',
      funGameAgain: 'Qayta o‘ynash',
      funGameFew: 'O‘yin uchun kamida 4 ta buyruq kerak.',
      funShare: 'Natijani rasm qilib ulashish',
      funMyResult: 'Natijam',
      funNoResult: 'Hali natija yo‘q',
      funBestQuiz: 'Eng yaxshi natija',
      funShareFail: 'Rasm yaratib bo‘lmadi.'
    },
    ru: {
      funRouletteKicker: 'СЛУЧАЙНЫЙ ВЫБОР',
      funRouletteTitle: 'Рулетка команд',
      funRouletteHint: 'Нажмите кнопку — будет выбрана случайная команда.',
      funSpin: 'Случайная команда',
      funSpinning: 'Выбираем…',
      funOpen: 'Открыть',
      funSyntax: 'Синтаксис',
      funGameKicker: 'ИГРА',
      funGameTitle: 'Найди команду',
      funGameIntro: 'Прочитайте описание и выберите правильную команду за 5 раундов. По 10 секунд на раунд.',
      funGameStart: 'Начать',
      funGameStep: 'Раунд',
      funGameScore: 'Результат',
      funGameRight: 'Верно!',
      funGameWrong: 'Неверно. Правильный ответ: {name}',
      funGameTimeout: 'Время вышло! Правильный ответ: {name}',
      funGameFinal: 'Ваш результат: {score} / {total}',
      funGameBest: 'Лучший: {score} / {total}',
      funGameAgain: 'Играть снова',
      funGameFew: 'Для игры нужно минимум 4 команды.',
      funShare: 'Поделиться результатом (PNG)',
      funMyResult: 'Мой результат',
      funNoResult: 'Результата пока нет',
      funBestQuiz: 'Лучший результат',
      funShareFail: 'Не удалось создать изображение.'
    },
    en: {
      funRouletteKicker: 'RANDOM PICK',
      funRouletteTitle: 'Command roulette',
      funRouletteHint: 'Press the button to pick a random command.',
      funSpin: 'Random command',
      funSpinning: 'Picking…',
      funOpen: 'Open',
      funSyntax: 'Syntax',
      funGameKicker: 'GAME',
      funGameTitle: 'Find the command',
      funGameIntro: 'Read the description and pick the right command in 5 rounds. 10 seconds per round.',
      funGameStart: 'Start',
      funGameStep: 'Round',
      funGameScore: 'Score',
      funGameRight: 'Correct!',
      funGameWrong: 'Wrong. Correct answer: {name}',
      funGameTimeout: 'Time is up! Correct answer: {name}',
      funGameFinal: 'Your score: {score} / {total}',
      funGameBest: 'Best: {score} / {total}',
      funGameAgain: 'Play again',
      funGameFew: 'At least 4 commands are needed.',
      funShare: 'Share result as image',
      funMyResult: 'My result',
      funNoResult: 'No result yet',
      funBestQuiz: 'Best score',
      funShareFail: 'Could not create the image.'
    }
  };

  var BEST_KEY = 'kali_game_best';
  var QUIZ_BEST_KEY = 'kali_quiz_best';
  var SPIN_MS = 1500;
  var ROUND_MS = 10000;
  var TOTAL_ROUNDS = 5;

  var S = {
    spinning: false,
    spinTimer: null,
    spinEnd: 0,
    selected: null,
    openTarget: null,
    gameActive: false,
    round: 0,
    score: 0,
    current: null,
    answered: false,
    tickTimer: null,
    advanceTimer: null,
    deadline: 0,
    feedback: null,
    lastGame: null,
    best: null,
    refs: {},
    langBound: false
  };

  function byId(id) { return document.getElementById(id); }

  function lang() {
    var l = window.I18N && typeof window.I18N.getLang === 'function' ? window.I18N.getLang() : 'uz';
    return Object.prototype.hasOwnProperty.call(DICT, l) ? l : 'uz';
  }

  function t(key, vars) {
    var l = lang();
    var value;
    if (window.I18N && typeof window.I18N.t === 'function' && window.I18N.dict &&
        window.I18N.dict[l] && Object.prototype.hasOwnProperty.call(window.I18N.dict[l], key)) {
      value = window.I18N.t(key, vars);
    } else {
      value = (DICT[l] && Object.prototype.hasOwnProperty.call(DICT[l], key))
        ? DICT[l][key] : (DICT.uz[key] || key);
    }
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        value = String(value).split('{' + k + '}').join(String(vars[k]));
      });
    }
    return value;
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function rand(n) { return Math.floor(Math.random() * n); }

  function shuffled(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = rand(i + 1);
      var tmp = out[i]; out[i] = out[j]; out[j] = tmp;
    }
    return out;
  }

  function commands() {
    return Array.isArray(window.LINUX_COMMANDS) ? window.LINUX_COMMANDS : [];
  }

  function descOf(cmd) {
    if (!cmd || !cmd.desc) return '';
    var l = lang();
    return String(cmd.desc[l] || cmd.desc.uz || cmd.desc.ru || cmd.desc.en || '');
  }

  function reduced() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  function read(key) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw == null ? null : JSON.parse(raw);
    } catch (e) { return null; }
  }

  function write(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function bestGame() {
    if (S.best) return S.best;
    var raw = read(BEST_KEY);
    if (typeof raw === 'number' && isFinite(raw)) raw = { score: raw, total: TOTAL_ROUNDS };
    if (raw && isFinite(Number(raw.score)) && Number(raw.score) >= 0) {
      S.best = { score: Number(raw.score), total: isFinite(Number(raw.total)) && Number(raw.total) > 0 ? Number(raw.total) : TOTAL_ROUNDS };
    } else {
      S.best = null;
    }
    return S.best;
  }

  function saveBest(score, total) {
    var prev = bestGame();
    if (!prev || score > prev.score) {
      S.best = { score: score, total: total };
      write(BEST_KEY, S.best);
    }
    return S.best;
  }

  /* ---------- Umumiy qobiq ---------- */

  function build() {
    if (byId('funZone')) return false;

    var section = byId('quiz');
    var host = section ? (section.querySelector('.container') || section) : document.body;
    if (!host) return false;

    var zone = document.createElement('section');
    zone.className = 'fun-zone';
    zone.id = 'funZone';
    zone.innerHTML =
      '<div class="fun-grid">' +
        '<div class="fun-card fun-roulette" id="funRoulette">' +
          '<div class="fun-card__head">' +
            '<span class="fun-card__kicker" id="funRouletteKicker">' + esc(t('funRouletteKicker')) + '</span>' +
            '<h3 class="fun-card__title" id="funRouletteTitle">' + esc(t('funRouletteTitle')) + '</h3>' +
            '<p class="fun-card__hint" id="funRouletteHint">' + esc(t('funRouletteHint')) + '</p>' +
          '</div>' +
          '<div class="fun-roulette__stage" id="funRouletteStage" aria-live="polite">' +
            '<span class="fun-roulette__name" id="funRouletteName">—</span>' +
          '</div>' +
          '<div class="fun-roulette__info" id="funRouletteInfo" hidden>' +
            '<div class="fun-roulette__syntax"><b id="funSyntaxLabel">' + esc(t('funSyntax')) + ':</b> ' +
              '<code id="funRouletteSyntax"></code></div>' +
            '<p id="funRouletteDesc"></p>' +
          '</div>' +
          '<div class="fun-card__actions">' +
            '<button type="button" class="fun-btn fun-btn--red" id="funRouletteBtn">' +
              '<span aria-hidden="true">🎲</span> <span id="funRouletteBtnText">' + esc(t('funSpin')) + '</span>' +
            '</button>' +
            '<button type="button" class="fun-btn fun-btn--ghost" id="funOpenBtn" hidden>' +
              esc(t('funOpen')) + ' →</button>' +
          '</div>' +
        '</div>' +

        '<div class="fun-card fun-game" id="cmdGame">' +
          '<div class="fun-card__head">' +
            '<span class="fun-card__kicker" id="funGameKicker">' + esc(t('funGameKicker')) + '</span>' +
            '<h3 class="fun-card__title" id="funGameTitle">' + esc(t('funGameTitle')) + '</h3>' +
            '<span class="fun-game__best" id="funGameBest"></span>' +
          '</div>' +
          '<div class="fun-game__intro" id="funGameIntro">' +
            '<p id="funGameIntroText">' + esc(t('funGameIntro')) + '</p>' +
            '<button type="button" class="fun-btn fun-btn--red" id="funGameStart">' +
              esc(t('funGameStart')) + '</button>' +
          '</div>' +
          '<div class="fun-game__round" id="funGameRound" hidden>' +
            '<div class="fun-game__meta">' +
              '<span id="funGameStep">1 / ' + TOTAL_ROUNDS + '</span>' +
              '<span id="funGameScore">0 / ' + TOTAL_ROUNDS + '</span>' +
            '</div>' +
            '<div class="fun-game__track"><div class="fun-game__bar" id="funGameBar"></div></div>' +
            '<p class="fun-game__desc" id="funGameDesc"></p>' +
            '<div class="fun-game__options" id="funGameOptions"></div>' +
            '<div class="fun-game__feedback" id="funGameFeedback" role="status" aria-live="polite"></div>' +
          '</div>' +
          '<div class="fun-game__result" id="funGameResult" hidden>' +
            '<div class="fun-game__result-score" id="funGameFinal"></div>' +
            '<div class="fun-game__result-best" id="funGameFinalBest"></div>' +
            '<button type="button" class="fun-btn fun-btn--ghost" id="funGameAgain">' +
              esc(t('funGameAgain')) + ' ↻</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    host.appendChild(zone);

    S.refs = {
      spinBtn: byId('funRouletteBtn'),
      spinBtnText: byId('funRouletteBtnText'),
      spinName: byId('funRouletteName'),
      spinStage: byId('funRouletteStage'),
      spinInfo: byId('funRouletteInfo'),
      spinSyntax: byId('funRouletteSyntax'),
      spinDesc: byId('funRouletteDesc'),
      syntaxLabel: byId('funSyntaxLabel'),
      openBtn: byId('funOpenBtn'),
      intro: byId('funGameIntro'),
      introText: byId('funGameIntroText'),
      startBtn: byId('funGameStart'),
      round: byId('funGameRound'),
      step: byId('funGameStep'),
      score: byId('funGameScore'),
      bar: byId('funGameBar'),
      desc: byId('funGameDesc'),
      options: byId('funGameOptions'),
      feedback: byId('funGameFeedback'),
      result: byId('funGameResult'),
      final: byId('funGameFinal'),
      finalBest: byId('funGameFinalBest'),
      againBtn: byId('funGameAgain'),
      gameBest: byId('funGameBest')
    };

    S.refs.spinBtn.addEventListener('click', spin);
    S.refs.openBtn.addEventListener('click', openSelected);
    S.refs.startBtn.addEventListener('click', startGame);
    S.refs.againBtn.addEventListener('click', startGame);
    renderGameBest();
    return true;
  }

  /* ---------- 1. Ruletka ---------- */

  function findOpenTarget(id) {
    var nodes = document.querySelectorAll('[data-open]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute('data-open') === id) return nodes[i];
    }
    return null;
  }

  function openSelected() {
    if (!S.selected) return;
    var id = S.selected.id;
    try {
      var target = findOpenTarget(id) || S.openTarget;
      if (target && typeof target.click === 'function') { target.click(); return; }
      /* Hali [data-open] tugmasi render qilinmagan bo'lsa, mavjud delegatsiyadan foydalanamiz. */
      var temp = document.createElement('button');
      temp.type = 'button';
      temp.hidden = true;
      temp.setAttribute('data-open', id);
      document.body.appendChild(temp);
      temp.click();
      document.body.removeChild(temp);
    } catch (e) {}
  }

  function paintSelected() {
    var r = S.refs;
    if (!S.selected || !r.spinName) return;
    r.spinName.textContent = S.selected.name;
    r.spinSyntax.textContent = S.selected.syntax || '—';
    r.spinDesc.textContent = descOf(S.selected);
    r.spinInfo.hidden = false;
    r.openBtn.hidden = false;
    r.openBtn.textContent = t('funOpen') + ' →';
  }

  function finishSpin() {
    if (S.spinTimer !== null) { clearInterval(S.spinTimer); S.spinTimer = null; }
    if (S.spinGuard) { clearTimeout(S.spinGuard); S.spinGuard = null; }
    S.spinning = false;
    S.refs.spinStage.classList.remove('is-spinning');
    S.refs.spinBtn.disabled = false;
    S.refs.spinBtnText.textContent = t('funSpin');

    var list = commands();
    if (!list.length) { S.refs.spinName.textContent = '—'; return; }
    S.selected = list[rand(list.length)];
    S.openTarget = findOpenTarget(S.selected.id);
    paintSelected();
  }

  function spin() {
    if (S.spinning) return;
    var list = commands();
    if (!list.length) return;

    S.spinning = true;
    S.refs.spinBtn.disabled = true;
    S.refs.spinInfo.hidden = true;
    S.refs.openBtn.hidden = true;
    S.refs.spinBtnText.textContent = t('funSpinning');

    if (reduced()) { finishSpin(); return; }

    spinGuard();
    S.spinEnd = Date.now() + SPIN_MS;
    S.refs.spinStage.classList.add('is-spinning');
    S.spinTimer = setInterval(function () {
      var pick = list[rand(list.length)];
      S.refs.spinName.textContent = pick.name;
      if (Date.now() >= S.spinEnd) finishSpin();
    }, 80);
  }

  /* Qo'shimcha himoya: interval ishlamay qolsa ham tugma qulflanib qolmaydi. */
  function spinGuard() {
    if (S.spinGuard) clearTimeout(S.spinGuard);
    S.spinGuard = setTimeout(function () {
      if (S.spinning) finishSpin();
    }, SPIN_MS + 400);
  }

  /* ---------- 2. Mini o'yin ---------- */

  function renderGameBest() {
    if (!S.refs.gameBest) return;
    var b = bestGame();
    S.refs.gameBest.textContent = b
      ? t('funGameBest', { score: b.score, total: b.total })
      : '';
  }

  function stopTick() {
    if (S.tickTimer !== null) { clearInterval(S.tickTimer); S.tickTimer = null; }
  }

  function clearAdvance() {
    if (S.advanceTimer !== null) { clearTimeout(S.advanceTimer); S.advanceTimer = null; }
  }

  function startGame() {
    stopTick();
    clearAdvance();
    var r = S.refs;
    var list = commands();
    if (list.length < 4) {
      r.introText.textContent = t('funGameFew');
      r.intro.hidden = false;
      r.round.hidden = true;
      r.result.hidden = true;
      return;
    }
    r.introText.textContent = t('funGameIntro');
    r.intro.hidden = true;
    r.result.hidden = true;
    r.round.hidden = false;
    S.gameActive = true;
    S.score = 0;
    S.round = 0;
    S.current = null;
    S.feedback = null;
    nextRound();
  }

  function nextRound() {
    clearAdvance();
    stopTick();
    if (!S.gameActive) return;
    if (S.round >= TOTAL_ROUNDS) { finishGame(); return; }

    var list = commands();
    var correct = list[rand(list.length)];
    var pool = shuffled(list.filter(function (c) { return c && c.id !== correct.id; }));
    var options = [correct];
    for (var i = 0; i < 3 && i < pool.length; i++) options.push(pool[i]);
    options = shuffled(options);

    S.current = { correct: correct, options: options };
    S.answered = false;
    S.feedback = null;
    S.round += 1;

    var r = S.refs;
    r.step.textContent = t('funGameStep') + ' ' + S.round + ' / ' + TOTAL_ROUNDS;
    r.score.textContent = t('funGameScore') + ' ' + S.score + ' / ' + TOTAL_ROUNDS;
    r.desc.textContent = descOf(correct) || correct.name;
    r.feedback.textContent = '';
    r.feedback.className = 'fun-game__feedback';
    r.options.innerHTML = '';

    options.forEach(function (cmd, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fun-btn fun-game__opt';
      btn.setAttribute('data-fun-opt', String(index));
      btn.setAttribute('data-fun-id', cmd.id || '');
      btn.textContent = cmd.name;
      btn.addEventListener('click', function () { answer(cmd.id); });
      r.options.appendChild(btn);
    });

    r.bar.style.width = '100%';
    S.deadline = Date.now() + ROUND_MS;
    S.tickTimer = setInterval(function () {
      var left = Math.max(0, S.deadline - Date.now());
      r.bar.style.width = (left / ROUND_MS * 100) + '%';
      if (left <= 0) { stopTick(); timeUp(); }
    }, 100);
  }

  function markAnswers(correctId, chosenId) {
    var buttons = S.refs.options.querySelectorAll('.fun-game__opt');
    buttons.forEach(function (btn) {
      btn.disabled = true;
      var id = btn.getAttribute('data-fun-id');
      if (id === correctId) btn.classList.add('is-correct');
      else if (id === chosenId) btn.classList.add('is-wrong');
    });
  }

  function setFeedback(key, vars, ok) {
    S.feedback = { key: key, vars: vars, ok: ok };
    S.refs.feedback.textContent = t(key, vars);
    S.refs.feedback.className = 'fun-game__feedback ' + (ok ? 'is-ok' : 'is-bad');
  }

  function answer(id) {
    if (!S.gameActive || S.answered || !S.current) return;
    S.answered = true;
    stopTick();
    var ok = id === S.current.correct.id;
    if (ok) S.score += 1;
    markAnswers(S.current.correct.id, ok ? null : id);
    if (ok) setFeedback('funGameRight', null, true);
    else setFeedback('funGameWrong', { name: S.current.correct.name }, false);
    S.refs.score.textContent = t('funGameScore') + ' ' + S.score + ' / ' + TOTAL_ROUNDS;
    S.advanceTimer = setTimeout(nextRound, reduced() ? 250 : 850);
  }

  function timeUp() {
    if (!S.gameActive || S.answered || !S.current) return;
    S.answered = true;
    markAnswers(S.current.correct.id, null);
    setFeedback('funGameTimeout', { name: S.current.correct.name }, false);
    S.advanceTimer = setTimeout(nextRound, reduced() ? 250 : 1100);
  }

  function finishGame() {
    S.gameActive = false;
    S.current = null;
    S.lastGame = { score: S.score, total: TOTAL_ROUNDS };
    saveBest(S.score, TOTAL_ROUNDS);
    var r = S.refs;
    r.round.hidden = true;
    r.result.hidden = false;
    renderFinal();
    renderGameBest();
  }

  function renderFinal() {
    if (!S.lastGame) return;
    S.refs.final.textContent = t('funGameFinal', { score: S.lastGame.score, total: S.lastGame.total });
    var b = bestGame();
    S.refs.finalBest.textContent = b ? t('funGameBest', { score: b.score, total: b.total }) : '';
  }

  /* ---------- 3. Natijani rasm qilib ulashish ---------- */

  function parseQuizResult() {
    var of = document.querySelector('.quiz-result__of') || byId('quizResult');
    var text = of ? String(of.textContent || '') : '';
    var percentEl = document.querySelector('.quiz-result__score');
    var match = text.match(/(\d+)\s*\/\s*(\d+)/) ||
      text.match(/(\d+)\s+[^\d\/%]{1,16}\s+(\d+)/);
    var score = NaN, total = NaN;
    if (match) {
      score = Number(match[1]);
      total = Number(match[2]);
    } else if (percentEl) {
      var pct = Number(String(percentEl.textContent || '').replace(/[^\d]/g, ''));
      if (isFinite(pct)) {
        total = TOTAL_ROUNDS;
        score = Math.round(pct / 100 * total);
      }
    }
    if (!isFinite(total) || total <= 0) return null;
    if (!isFinite(score) || score < 0) return null;
    return { score: Math.min(score, total), total: total, text: text };
  }

  function storedQuizResult() {
    var raw = read(QUIZ_BEST_KEY);
    if (!raw || !isFinite(Number(raw.score))) return null;
    var total = isFinite(Number(raw.total)) && Number(raw.total) > 0 ? Number(raw.total) : TOTAL_ROUNDS;
    return { score: Math.max(0, Math.min(Number(raw.score), total)), total: total, text: '' };
  }

  function resultData(options) {
    var score = NaN, total = NaN, text = '';
    if (typeof options === 'number') {
      score = options; total = TOTAL_ROUNDS;
    } else if (typeof options === 'string') {
      text = options;
    } else if (options && typeof options === 'object') {
      score = Number(options.score);
      total = Number(options.total);
      text = String(options.text || '');
    }

    var found = null;
    if (!isFinite(score) || score < 0) {
      found = parseQuizResult() || S.lastGame || storedQuizResult();
      if (found) { score = found.score; total = found.total; if (!text) text = found.text; }
    }

    var valid = isFinite(score) && score >= 0 && isFinite(total) && total > 0;
    var label = valid ? t('funMyResult') + ': ' + score + ' / ' + total : t('funMyResult');
    var best = bestGame();
    var sub = '';
    if (valid && best) sub = t('funBestQuiz') + ': ' + best.score + ' / ' + best.total;
    else if (valid) sub = Math.round(score / total * 100) + '%';
    return {
      label: label,
      value: valid ? score + ' / ' + total : (text || t('funNoResult')),
      sub: sub
    };
  }

  function fitText(ctx, text, maxWidth) {
    var value = String(text || '');
    if (ctx.measureText(value).width <= maxWidth) return value;
    while (value.length > 1 && ctx.measureText(value + '…').width > maxWidth) {
      value = value.slice(0, -1);
    }
    return value + '…';
  }

  function dateLabel() {
    var locale = lang() === 'ru' ? 'ru-RU' : (lang() === 'en' ? 'en-US' : 'uz-UZ');
    try { return new Date().toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch (e) { return new Date().toLocaleDateString(); }
  }

  function card(options) {
    try {
      var canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 315;
      var ctx = canvas.getContext && canvas.getContext('2d');
      if (!ctx) return '';

      var data = resultData(options);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 600, 315);
      ctx.fillStyle = '#ef3b2c';
      ctx.fillRect(0, 0, 600, 8);
      ctx.fillStyle = '#1c1c1c';
      ctx.fillRect(0, 294, 600, 21);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ff5a45';
      ctx.font = '700 13px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText('LINUX LUG\'AT / QUIZ', 36, 46);

      ctx.fillStyle = '#f5f5f5';
      ctx.font = '800 50px Arial, Helvetica, sans-serif';
      ctx.fillText(fitText(ctx, 'KALI LINUX', 520), 34, 104);
      ctx.fillStyle = '#ef3b2c';
      ctx.fillRect(36, 122, 118, 4);

      ctx.fillStyle = '#a5a5a5';
      ctx.font = '600 19px Arial, Helvetica, sans-serif';
      ctx.fillText(fitText(ctx, data.label, 528), 36, 172);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 34px Arial, Helvetica, sans-serif';
      ctx.fillText(fitText(ctx, data.value, 528), 36, 218);

      if (data.sub) {
        ctx.fillStyle = '#7ac74f';
        ctx.font = '600 15px Arial, Helvetica, sans-serif';
        ctx.fillText(fitText(ctx, data.sub, 528), 36, 250);
      }

      ctx.fillStyle = '#9a9a9a';
      ctx.font = '500 15px Arial, Helvetica, sans-serif';
      ctx.fillText(fitText(ctx, dateLabel(), 280), 36, 283);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#ff5a45';
      ctx.font = '700 16px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText('@LinuxCoreX', 564, 283);
      ctx.textAlign = 'left';

      return canvas.toDataURL('image/png');
    } catch (e) { return ''; }
  }

  function download() {
    var url = card();
    if (!url) return false;
    try {
      var a = document.createElement('a');
      a.href = url;
      a.download = 'kali-natijam.png';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    } catch (e) { return false; }
  }

  function buildShareButton() {
    if (byId('shareResultBtn')) return;
    var anchor = byId('quizResult') || byId('qpResults') ||
      document.querySelector('.quiz-result') || byId('funRoulette');
    if (!anchor || !anchor.parentNode) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'shareResultBtn';
    btn.className = 'fun-btn fun-share-btn';
    btn.textContent = '⬇ ' + t('funShare');
    btn.addEventListener('click', function () {
      if (!download()) {
        try { btn.textContent = '⚠ ' + t('funShareFail'); } catch (e) {}
      }
    });
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);
    S.refs.shareBtn = btn;
  }

  /* ---------- 4. Til va ishga tushirish ---------- */

  function relabel() {
    var r = S.refs;
    var ids = {
      funRouletteKicker: 'funRouletteKicker',
      funRouletteTitle: 'funRouletteTitle',
      funRouletteHint: 'funRouletteHint',
      funRouletteBtnText: 'funSpin',
      funSyntaxLabel: 'funSyntax',
      funGameKicker: 'funGameKicker',
      funGameTitle: 'funGameTitle',
      funGameIntroText: 'funGameIntro'
    };
    Object.keys(ids).forEach(function (id) {
      var el = byId(id);
      if (el) el.textContent = t(ids[id]);
    });
    if (r.openBtn) r.openBtn.textContent = t('funOpen') + ' →';
    if (r.startBtn) r.startBtn.textContent = t('funGameStart');
    if (r.againBtn) r.againBtn.textContent = t('funGameAgain') + ' ↻';
    if (r.shareBtn) r.shareBtn.textContent = '⬇ ' + t('funShare');

    if (S.selected) paintSelected();
    if (S.feedback) {
      r.feedback.textContent = t(S.feedback.key, S.feedback.vars);
      r.feedback.className = 'fun-game__feedback ' + (S.feedback.ok ? 'is-ok' : 'is-bad');
    }
    if (S.current && S.gameActive) {
      r.desc.textContent = descOf(S.current.correct) || S.current.correct.name;
      r.step.textContent = t('funGameStep') + ' ' + S.round + ' / ' + TOTAL_ROUNDS;
      r.score.textContent = t('funGameScore') + ' ' + S.score + ' / ' + TOTAL_ROUNDS;
    }
    if (S.lastGame) renderFinal();
    renderGameBest();
  }

  function init() {
    try { build(); } catch (e) { return; }
    try { buildShareButton(); } catch (e) {}

    window.KaliShareResult = {
      card: function (options) { return card(options); },
      download: function () { return download(); }
    };

    if (!S.langBound) {
      document.addEventListener('langchange', function () {
        try { relabel(); } catch (e) {}
      });
      S.langBound = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
