/* Imtihon rejimi: 20 savol, 45 daqiqa, tahlil va PNG sertifikat. */
(function () {
  'use strict';

  var EXAM_MINUTES = 45;
  var EXAM_SECONDS = EXAM_MINUTES * 60;
  var QUESTION_COUNT = 20;
  var BEST_KEY = 'kali_exam_best';
  var GRADE_A_PLUS = 95;
  var GRADE_A = 85;
  var GRADE_B = 70;
  var GRADE_C = 55;
  var GRADE_D = 0;

  var DICT = {
    uz: {
      skipLink: 'Asosiy qismga o‘tish',
      allPages: 'Barcha sahifalar',
      pageTitle: 'Imtihon rejimi',
      pageLead: '20 ta savol, 45 daqiqa. Har kategoriyadan savollar, batafsil tahlil va sertifikat.',
      timerLabel: 'Qolgan vaqt',
      progressLabel: 'Jarayon',
      scoreLabel: 'Natija',
      navTitle: 'Savollar',
      legendCurrent: 'Joriy',
      legendAnswered: 'Javob',
      legendFlagged: 'Belgi',
      flagBtn: 'Tekshirish uchun belgilash',
      flaggedBtn: 'Belgilangan',
      prevBtn: 'Oldingi',
      nextBtn: 'Keyingi',
      submitBtn: 'Imtihonni yakunlash',
      submitConfirm: 'Imtihonni yakunlaysizmi? Javob berilmagan savollar noto‘g‘ri hisoblanadi.',
      questionStep: 'Savol {n} / {total}',
      promptPick: 'Bu tavsifga mos buyruqni tanlang',
      promptWhat: 'Bu buyruq nima qiladi? → {desc}',
      typeDesc: 'Tavsif bo‘yicha buyruqni aniqlang',
      answeredCount: 'Javob berilgan: {n} / {total}',
      bestNone: 'Eng yaxshi natija: hali yo‘q',
      bestLabel: 'Eng yaxshi natija: {score}/{total} · {date}',
      resultKicker: 'NATIJA',
      resultTitle: 'Imtihon yakunlandi',
      resultSummary: 'Siz {total} ta savoldan {score} tasiga to‘g‘ri javob berdingiz. Baho: {grade}.',
      statScore: 'Ball',
      statPercent: 'Foiz',
      statGrade: 'Baho',
      statTime: 'Vaqt',
      restartBtn: 'Qayta boshlash',
      ctaBtn: '@LinuxCoreX',
      certTitle: 'PNG sertifikat',
      certLead: 'Ismingizni kiriting va sertifikatni yuklab oling.',
      certNameLabel: 'Ism',
      certNamePlaceholder: 'Kali User',
      certDownload: 'Sertifikatni yuklab olish',
      certReady: 'Sertifikat tayyor. Yuklab olish boshlandi.',
      certFail: 'Sertifikatni yaratib bo‘lmadi.',
      analysisTitle: 'Javoblar tahlili',
      analysisLead: 'Har bir savol bo‘yicha tanlovingiz va to‘g‘ri javob.',
      correct: 'To‘g‘ri',
      wrong: 'Noto‘g‘ri',
      yourAnswer: 'Sizning javob:',
      correctAnswer: 'To‘g‘ri javob:',
      noAnswer: 'Javob berilmagan',
      explanation: 'Izoh:',
      timeUp: 'Vaqt tugadi! Imtihon avtomatik yakunlandi.',
      footerText: '© 2026 Kali Linux — buyruqlar va vositalar',
      certExam: 'KALI LINUX — EXAM',
      certCertifies: 'SERTIFIKAT',
      certName: 'Ishtirokchi',
      certDate: 'Sana',
      certScore: 'Natija',
      certGrade: 'Baho',
      certChannel: '@LinuxCoreX'
    },
    ru: {
      skipLink: 'Перейти к основному содержанию',
      allPages: 'Все страницы',
      pageTitle: 'Режим экзамена',
      pageLead: '20 вопросов, 45 минут. Вопросы из каждой категории, подробный разбор и сертификат.',
      timerLabel: 'Осталось времени',
      progressLabel: 'Прогресс',
      scoreLabel: 'Результат',
      navTitle: 'Вопросы',
      legendCurrent: 'Текущий',
      legendAnswered: 'Ответ',
      legendFlagged: 'Метка',
      flagBtn: 'Отметить для проверки',
      flaggedBtn: 'Отмечено',
      prevBtn: 'Назад',
      nextBtn: 'Далее',
      submitBtn: 'Завершить экзамен',
      submitConfirm: 'Завершить экзамен? Неотвеченные вопросы будут засчитаны как неверные.',
      questionStep: 'Вопрос {n} / {total}',
      promptPick: 'Выберите команду, подходящую к этому описанию',
      promptWhat: 'Что делает эта команда? → {desc}',
      typeDesc: 'Определите команду по описанию',
      answeredCount: 'Отвечено: {n} / {total}',
      bestNone: 'Лучший результат: пока нет',
      bestLabel: 'Лучший результат: {score}/{total} · {date}',
      resultKicker: 'РЕЗУЛЬТАТ',
      resultTitle: 'Экзамен завершён',
      resultSummary: 'Вы ответили правильно на {score} из {total} вопросов. Оценка: {grade}.',
      statScore: 'Баллы',
      statPercent: 'Процент',
      statGrade: 'Оценка',
      statTime: 'Время',
      restartBtn: 'Начать заново',
      ctaBtn: '@LinuxCoreX',
      certTitle: 'PNG-сертификат',
      certLead: 'Введите имя и скачайте сертификат.',
      certNameLabel: 'Имя',
      certNamePlaceholder: 'Kali User',
      certDownload: 'Скачать сертификат',
      certReady: 'Сертификат готов. Загрузка началась.',
      certFail: 'Не удалось создать сертификат.',
      analysisTitle: 'Разбор ответов',
      analysisLead: 'Ваш выбор и правильный ответ по каждому вопросу.',
      correct: 'Верно',
      wrong: 'Неверно',
      yourAnswer: 'Ваш ответ:',
      correctAnswer: 'Правильный ответ:',
      noAnswer: 'Нет ответа',
      explanation: 'Пояснение:',
      timeUp: 'Время вышло! Экзамен завершён автоматически.',
      footerText: '© 2026 Kali Linux — команды и инструменты',
      certExam: 'KALI LINUX — EXAM',
      certCertifies: 'СЕРТИФИКАТ',
      certName: 'Участник',
      certDate: 'Дата',
      certScore: 'Результат',
      certGrade: 'Оценка',
      certChannel: '@LinuxCoreX'
    },
    en: {
      skipLink: 'Skip to main content',
      allPages: 'All pages',
      pageTitle: 'Exam mode',
      pageLead: '20 questions, 45 minutes. Questions from every category, detailed analysis, and a certificate.',
      timerLabel: 'Time left',
      progressLabel: 'Progress',
      scoreLabel: 'Score',
      navTitle: 'Questions',
      legendCurrent: 'Current',
      legendAnswered: 'Answered',
      legendFlagged: 'Flagged',
      flagBtn: 'Flag for review',
      flaggedBtn: 'Flagged',
      prevBtn: 'Previous',
      nextBtn: 'Next',
      submitBtn: 'Finish exam',
      submitConfirm: 'Finish the exam? Unanswered questions will be counted as incorrect.',
      questionStep: 'Question {n} / {total}',
      promptPick: 'Choose the command that matches this description',
      promptWhat: 'What does this command do? → {desc}',
      typeDesc: 'Identify the command from its description',
      answeredCount: 'Answered: {n} / {total}',
      bestNone: 'Best score: none yet',
      bestLabel: 'Best score: {score}/{total} · {date}',
      resultKicker: 'RESULT',
      resultTitle: 'Exam finished',
      resultSummary: 'You answered {score} out of {total} questions correctly. Grade: {grade}.',
      statScore: 'Score',
      statPercent: 'Percent',
      statGrade: 'Grade',
      statTime: 'Time',
      restartBtn: 'Restart',
      ctaBtn: '@LinuxCoreX',
      certTitle: 'PNG certificate',
      certLead: 'Enter your name and download the certificate.',
      certNameLabel: 'Name',
      certNamePlaceholder: 'Kali User',
      certDownload: 'Download certificate',
      certReady: 'Certificate is ready. Download started.',
      certFail: 'Could not create the certificate.',
      analysisTitle: 'Answer analysis',
      analysisLead: 'Your choice and the correct answer for each question.',
      correct: 'Correct',
      wrong: 'Wrong',
      yourAnswer: 'Your answer:',
      correctAnswer: 'Correct answer:',
      noAnswer: 'No answer',
      explanation: 'Explanation:',
      timeUp: 'Time is up! The exam was finished automatically.',
      footerText: '© 2026 Kali Linux — commands and tools',
      certExam: 'KALI LINUX — EXAM',
      certCertifies: 'CERTIFICATE',
      certName: 'Participant',
      certDate: 'Date',
      certScore: 'Score',
      certGrade: 'Grade',
      certChannel: '@LinuxCoreX'
    }
  };

  var state = {
    lang: 'uz',
    questions: [],
    current: 0,
    answers: {}, // qid -> optionId
    flagged: {},
    remaining: EXAM_SECONDS,
    timerId: null,
    startedAt: 0,
    finished: false,
    finishReason: '',
    result: null
  };

  var els = {};

  function byId(id) { return document.getElementById(id); }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getLang() {
    try {
      if (window.I18N && typeof window.I18N.getLang === 'function') {
        var l = window.I18N.getLang();
        if (DICT[l]) return l;
      }
    } catch (e) {}
    return DICT[state.lang] ? state.lang : 'uz';
  }

  function t(key, vars) {
    var lang = getLang();
    var dict = DICT[lang] || DICT.uz;
    var str = Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : (DICT.uz[key] || key);
    if (vars && typeof vars === 'object') {
      Object.keys(vars).forEach(function (k) {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), String(vars[k]));
      });
    }
    return str;
  }

  function textOf(obj, lang) {
    if (!obj) return '';
    var l = lang || getLang();
    return obj[l] || obj.uz || obj.ru || obj.en || '';
  }

  function reduceMotion() {
    try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (e) { return false; }
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function sample(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  function fmtTime(sec) {
    var s = Math.max(0, sec | 0);
    var m = Math.floor(s / 60);
    var r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  }

  function fmtDate(ts) {
    try {
      var d = new Date(ts);
      var y = d.getFullYear();
      var m = d.getMonth() + 1;
      var day = d.getDate();
      return y + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
    } catch (e) { return ''; }
  }

  function gradeOf(pct) {
    if (pct >= GRADE_A_PLUS) return 'A+';
    if (pct >= GRADE_A) return 'A';
    if (pct >= GRADE_B) return 'B';
    if (pct >= GRADE_C) return 'C';
    return 'D';
  }

  function loadBest() {
    try {
      var raw = localStorage.getItem(BEST_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || typeof obj !== 'object') return null;
      if (typeof obj.score !== 'number' || typeof obj.total !== 'number') return null;
      return obj;
    } catch (e) { return null; }
  }

  function saveBest(score, total) {
    try {
      var prev = loadBest();
      var next = { score: score, total: total, date: fmtDate(Date.now()) };
      if (!prev || score > prev.score || (score === prev.score && total >= prev.total)) {
        localStorage.setItem(BEST_KEY, JSON.stringify(next));
        return next;
      }
      return prev;
    } catch (e) { return null; }
  }

  function getCommands() {
    var list = window.LINUX_COMMANDS;
    return Array.isArray(list) ? list.filter(function (c) { return c && c.id && c.name; }) : [];
  }

  function getCategories() {
    var cats = window.CATEGORIES;
    if (!Array.isArray(cats)) return [];
    return cats.filter(function (c) { return c && c.id && c.id !== 'all'; });
  }

  function buildQuestions() {
    var commands = getCommands();
    var categories = getCategories();
    if (!commands.length || !categories.length) return [];

    var byCat = {};
    categories.forEach(function (c) { byCat[c.id] = []; });
    commands.forEach(function (cmd) {
      if (byCat[cmd.category]) byCat[cmd.category].push(cmd);
    });
    var catIds = categories.map(function (c) { return c.id; }).filter(function (id) { return byCat[id] && byCat[id].length; });
    if (!catIds.length) return [];

    var selected = [];
    var usedIds = {};

    // At least one per category
    shuffle(catIds).forEach(function (catId) {
      if (selected.length >= QUESTION_COUNT) return;
      var pool = byCat[catId].filter(function (c) { return !usedIds[c.id]; });
      if (!pool.length) return;
      var pick = pool[Math.floor(Math.random() * pool.length)];
      selected.push(pick);
      usedIds[pick.id] = true;
    });

    // Fill remaining
    var rest = shuffle(commands.filter(function (c) { return !usedIds[c.id]; }));
    for (var i = 0; i < rest.length && selected.length < QUESTION_COUNT; i++) {
      selected.push(rest[i]);
      usedIds[rest[i].id] = true;
    }

    selected = shuffle(selected).slice(0, QUESTION_COUNT);

    return selected.map(function (cmd, idx) {
      var wrongPool = commands.filter(function (c) { return c.id !== cmd.id; });
      var wrongs = sample(wrongPool, 3);
      var options = shuffle([cmd].concat(wrongs)).map(function (c, oi) {
        return { id: c.id, name: c.name, correct: c.id === cmd.id, key: String.fromCharCode(65 + oi) };
      });
      options.forEach(function (o, oi) { o.key = String.fromCharCode(65 + oi); });
      var qType = idx % 2 === 0 ? 'desc-to-cmd' : 'cmd-to-desc';
      return {
        qid: 'q' + (idx + 1),
        index: idx,
        command: cmd,
        options: options,
        type: qType
      };
    });
  }

  function currentQuestion() {
    return state.questions[state.current] || null;
  }

  function answeredCount() {
    var n = 0;
    state.questions.forEach(function (q) { if (state.answers[q.qid]) n++; });
    return n;
  }

  function setStatus(msg) {
    if (els.status) els.status.textContent = msg || '';
  }

  function updateBestBadge() {
    if (!els.bestBadge) return;
    var best = loadBest();
    els.bestBadge.textContent = best ? t('bestLabel', { score: best.score, total: best.total, date: best.date || '-' }) : t('bestNone');
  }

  function updateProgress() {
    var total = state.questions.length || QUESTION_COUNT;
    var answered = answeredCount();
    if (els.progressText) els.progressText.textContent = answered + ' / ' + total;
    if (els.progressTrack) {
      els.progressTrack.setAttribute('aria-valuenow', String(answered));
      els.progressTrack.setAttribute('aria-valuemax', String(total));
    }
    if (els.progressBar) {
      var pct = total ? (answered / total * 100) : 0;
      els.progressBar.style.width = pct + '%';
    }
  }

  function updateTimerUI() {
    if (els.timerValue) els.timerValue.textContent = fmtTime(state.remaining);
    if (els.timer) {
      var danger = !state.finished && state.remaining <= 300;
      els.timer.classList.toggle('is-danger', danger);
    }
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function startTimer() {
    stopTimer();
    state.startedAt = Date.now();
    updateTimerUI();
    state.timerId = setInterval(function () {
      if (state.finished) { stopTimer(); return; }
      state.remaining -= 1;
      if (state.remaining <= 0) {
        state.remaining = 0;
        updateTimerUI();
        finishExam('time');
        return;
      }
      updateTimerUI();
    }, 1000);
  }

  function renderNav() {
    if (!els.navGrid) return;
    var html = '';
    state.questions.forEach(function (q, i) {
      var cls = 'exam-nav-btn';
      if (i === state.current) cls += ' is-current';
      if (state.answers[q.qid]) cls += ' is-answered';
      if (state.flagged[q.qid]) cls += ' is-flagged';
      var label = String(i + 1);
      html += '<button type="button" class="' + cls + '" data-qindex="' + i + '" aria-label="' + esc(t('questionStep', { n: i + 1, total: state.questions.length })) + '"' + (i === state.current ? ' aria-current="step"' : '') + '>' + label + '</button>';
    });
    els.navGrid.innerHTML = html;
  }

  function renderQuestion() {
    var q = currentQuestion();
    if (!q) return;
    var lang = getLang();
    var total = state.questions.length;
    var desc = textOf(q.command.desc, lang);

    if (els.step) els.step.textContent = t('questionStep', { n: q.index + 1, total: total });
    if (els.type) els.type.textContent = q.type === 'cmd-to-desc' ? t('promptPick') : t('typeDesc');

    if (q.type === 'cmd-to-desc') {
      if (els.question) els.question.textContent = t('promptWhat', { desc: desc });
      if (els.questionDesc) els.questionDesc.textContent = '';
      if (els.questionDesc) els.questionDesc.style.display = 'none';
    } else {
      if (els.question) els.question.textContent = t('promptPick');
      if (els.questionDesc) {
        els.questionDesc.textContent = desc;
        els.questionDesc.style.display = '';
      }
    }

    if (els.options) {
      var selected = state.answers[q.qid] || '';
      var html = '';
      q.options.forEach(function (opt) {
        var isSel = selected === opt.id;
        html += '<button type="button" class="exam-option' + (isSel ? ' is-selected' : '') + '" data-qid="' + esc(q.qid) + '" data-opt="' + esc(opt.id) + '" role="radio" aria-checked="' + (isSel ? 'true' : 'false') + '">';
        html += '<span class="exam-option__key">' + esc(opt.key) + '</span>';
        html += '<span class="exam-option__text">' + esc(opt.name) + '</span>';
        html += '</button>';
      });
      els.options.innerHTML = html;
    }

    if (els.flagBtn) {
      var flagged = !!state.flagged[q.qid];
      els.flagBtn.setAttribute('aria-pressed', flagged ? 'true' : 'false');
      var label = els.flagBtn.querySelector('[data-exam-i18n="flagBtn"]');
      if (label) label.textContent = flagged ? t('flaggedBtn') : t('flagBtn');
      els.flagBtn.classList.toggle('is-flagged', flagged);
    }

    if (els.prevBtn) els.prevBtn.disabled = state.current === 0;
    if (els.nextBtn) els.nextBtn.disabled = state.current >= total - 1;

    renderNav();
    updateProgress();
    setStatus(t('answeredCount', { n: answeredCount(), total: total }));
  }

  function goTo(index) {
    if (state.finished) return;
    var i = Math.max(0, Math.min(state.questions.length - 1, index));
    state.current = i;
    renderQuestion();
    if (!reduceMotion() && els.card) {
      try { els.card.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
    }
  }

  function selectOption(qid, optId) {
    if (state.finished) return;
    state.answers[qid] = optId;
    renderQuestion();
  }

  function toggleFlag() {
    if (state.finished) return;
    var q = currentQuestion();
    if (!q) return;
    if (state.flagged[q.qid]) delete state.flagged[q.qid];
    else state.flagged[q.qid] = true;
    renderQuestion();
  }

  function computeResult() {
    var total = state.questions.length;
    var correct = 0;
    var items = state.questions.map(function (q) {
      var selectedId = state.answers[q.qid] || '';
      var correctOpt = null;
      var selectedOpt = null;
      q.options.forEach(function (o) {
        if (o.correct) correctOpt = o;
        if (o.id === selectedId) selectedOpt = o;
      });
      var ok = !!(selectedOpt && selectedOpt.correct);
      if (ok) correct++;
      return {
        q: q,
        selected: selectedOpt,
        correct: correctOpt,
        ok: ok
      };
    });
    var pct = total ? Math.round(correct / total * 100) : 0;
    var grade = gradeOf(pct);
    var spent = Math.max(0, EXAM_SECONDS - state.remaining);
    return { total: total, correct: correct, pct: pct, grade: grade, spent: spent, items: items };
  }

  function renderAnalysis(result) {
    if (!els.analysisList) return;
    var lang = getLang();
    var html = '';
    result.items.forEach(function (item, idx) {
      var q = item.q;
      var desc = textOf(q.command.desc, lang);
      var your = item.selected ? item.selected.name : t('noAnswer');
      var corr = item.correct ? item.correct.name : '-';
      var cls = 'exam-review ' + (item.ok ? 'is-correct' : 'is-wrong');
      html += '<article class="' + cls + '">';
      html += '<div class="exam-review__head">';
      html += '<p class="exam-review__q"><strong>' + (idx + 1) + '.</strong> ' + esc(desc) + '</p>';
      html += '<span class="exam-review__badge">' + esc(item.ok ? t('correct') : t('wrong')) + '</span>';
      html += '</div>';
      html += '<div class="exam-review__meta">';
      html += '<div><b>' + esc(t('yourAnswer')) + '</b><span class="' + (item.ok ? 'ok' : 'bad') + '">' + esc(your) + '</span></div>';
      html += '<div><b>' + esc(t('correctAnswer')) + '</b><span class="ok">' + esc(corr) + '</span></div>';
      html += '<div><b>' + esc(t('explanation')) + '</b><span>' + esc(corr + ' — ' + desc) + '</span></div>';
      html += '</div></article>';
    });
    els.analysisList.innerHTML = html;
  }

  function updateResultUI() {
    var r = state.result;
    if (!r) return;
    if (els.resultSummary) {
      els.resultSummary.textContent = t('resultSummary', { score: r.correct, total: r.total, grade: r.grade });
    }
    if (els.statScore) els.statScore.textContent = r.correct + '/' + r.total;
    if (els.statPercent) els.statPercent.textContent = r.pct + '%';
    if (els.statGrade) els.statGrade.textContent = r.grade;
    if (els.statTime) els.statTime.textContent = fmtTime(r.spent);
    if (els.scorePill) {
      els.scorePill.hidden = false;
      if (els.scorePillValue) els.scorePillValue.textContent = r.correct + '/' + r.total;
    }
    renderAnalysis(r);
    drawCertificate();
  }

  function finishExam(reason) {
    if (state.finished) return;
    state.finished = true;
    state.finishReason = reason || 'manual';
    stopTimer();
    state.result = computeResult();
    saveBest(state.result.correct, state.result.total);
    updateBestBadge();

    if (els.shell) els.shell.hidden = true;
    if (els.result) els.result.hidden = false;
    updateResultUI();

    if (reason === 'time') setStatus(t('timeUp'));
    else setStatus('');

    if (!reduceMotion() && els.result) {
      try { els.result.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
    }
  }

  function drawCertificate() {
    var canvas = els.certCanvas;
    var r = state.result;
    if (!canvas || !r) return;
    var ctx = null;
    try { ctx = canvas.getContext('2d'); } catch (e) { ctx = null; }
    if (!ctx) return;

    var W = canvas.width;
    var H = canvas.height;
    var name = (els.nameInput && els.nameInput.value ? els.nameInput.value : '').trim() || t('certNamePlaceholder');
    var date = fmtDate(Date.now());

    // Background
    ctx.clearRect(0, 0, W, H);
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0a0a0a');
    bg.addColorStop(0.5, '#111111');
    bg.addColorStop(1, '#160808');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Red glow
    var glow = ctx.createRadialGradient(W * 0.8, H * 0.2, 20, W * 0.8, H * 0.2, 360);
    glow.addColorStop(0, 'rgba(239,59,44,0.22)');
    glow.addColorStop(1, 'rgba(239,59,44,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Border
    ctx.strokeStyle = 'rgba(239,59,44,0.75)';
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, W - 60, H - 60);

    // Top bar
    var bar = ctx.createLinearGradient(40, 0, W - 40, 0);
    bar.addColorStop(0, 'rgba(239,59,44,0)');
    bar.addColorStop(0.2, 'rgba(239,59,44,0.9)');
    bar.addColorStop(0.8, 'rgba(239,59,44,0.9)');
    bar.addColorStop(1, 'rgba(239,59,44,0)');
    ctx.fillStyle = bar;
    ctx.fillRect(40, 52, W - 80, 2);

    // Title
    ctx.fillStyle = '#f8f8f8';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(t('certExam'), 50, 86);
    ctx.fillStyle = '#ef3b2c';
    ctx.font = '800 44px "Space Grotesk", Arial, sans-serif';
    ctx.fillText(t('certCertifies'), 50, 138);

    // Name
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText(t('certName').toUpperCase(), 50, 190);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 38px "Space Grotesk", Arial, sans-serif';
    var displayName = name.length > 28 ? name.slice(0, 28) + '…' : name;
    ctx.fillText(displayName, 50, 232);

    // Score box
    ctx.fillStyle = 'rgba(239,59,44,0.1)';
    ctx.strokeStyle = 'rgba(239,59,44,0.45)';
    ctx.lineWidth = 1;
    roundRect(ctx, 50, 270, 360, 110, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(t('certScore').toUpperCase(), 70, 300);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "JetBrains Mono", monospace';
    ctx.fillText(r.correct + ' / ' + r.total + '  (' + r.pct + '%)', 70, 338);

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(t('certGrade').toUpperCase(), 70, 362);
    ctx.fillStyle = '#ef3b2c';
    ctx.font = '800 24px "JetBrains Mono", monospace';
    ctx.fillText(r.grade, 130, 362);

    // Date & channel
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(t('certDate').toUpperCase(), 450, 300);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillText(date, 450, 330);

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('CHANNEL', 450, 362);
    ctx.fillStyle = '#ff6a5f';
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillText(t('certChannel'), 450, 388);

    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '500 12px "Space Grotesk", Arial, sans-serif';
    ctx.fillText('linux-lugat / Kali Linux Exam Mode', 50, H - 44);
    ctx.fillStyle = '#ef3b2c';
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillText('@LinuxCoreX', W - 160, H - 44);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function downloadCertificate() {
    var canvas = els.certCanvas;
    if (!canvas || !state.result) return;
    try {
      drawCertificate();
      var link = document.createElement('a');
      link.download = 'kali-exam-sertifikat.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (els.certNote) els.certNote.textContent = t('certReady');
    } catch (e) {
      if (els.certNote) els.certNote.textContent = t('certFail');
    }
  }

  function applyI18nStatic() {
    document.querySelectorAll('[data-exam-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-exam-i18n');
      if (key) el.textContent = t(key);
    });
    if (els.nameInput) els.nameInput.placeholder = t('certNamePlaceholder');
    // Lang buttons aria/active
    var lang = getLang();
    document.querySelectorAll('[data-exam-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-exam-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function onLangChange() {
    state.lang = getLang();
    applyI18nStatic();
    updateBestBadge();
    updateTimerUI();
    if (state.finished) {
      updateResultUI();
    } else {
      renderQuestion();
    }
  }

  function bindEvents() {
    if (els.navGrid) {
      els.navGrid.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest ? e.target.closest('[data-qindex]') : null;
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-qindex'), 10);
        if (!isNaN(idx)) goTo(idx);
      });
    }

    if (els.options) {
      els.options.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest ? e.target.closest('[data-opt]') : null;
        if (!btn) return;
        selectOption(btn.getAttribute('data-qid'), btn.getAttribute('data-opt'));
      });
    }

    if (els.prevBtn) els.prevBtn.addEventListener('click', function () { goTo(state.current - 1); });
    if (els.nextBtn) els.nextBtn.addEventListener('click', function () { goTo(state.current + 1); });
    if (els.flagBtn) els.flagBtn.addEventListener('click', toggleFlag);

    if (els.submitBtn) {
      els.submitBtn.addEventListener('click', function () {
        if (state.finished) return;
        var ok = window.confirm(t('submitConfirm'));
        if (ok) finishExam('manual');
      });
    }

    if (els.restartBtn) {
      els.restartBtn.addEventListener('click', function () {
        resetExam();
      });
    }

    if (els.certBtn) els.certBtn.addEventListener('click', downloadCertificate);
    if (els.nameInput) {
      els.nameInput.addEventListener('input', function () {
        if (state.finished) drawCertificate();
      });
    }

    document.querySelectorAll('[data-exam-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-exam-lang');
        if (!DICT[next]) return;
        if (window.I18N && typeof window.I18N.setLang === 'function') {
          window.I18N.setLang(next);
        } else {
          state.lang = next;
          onLangChange();
        }
      });
    });

    document.addEventListener('langchange', onLangChange);
  }

  function resetExam() {
    stopTimer();
    state.questions = buildQuestions();
    state.current = 0;
    state.answers = {};
    state.flagged = {};
    state.remaining = EXAM_SECONDS;
    state.startedAt = 0;
    state.finished = false;
    state.finishReason = '';
    state.result = null;

    if (els.shell) els.shell.hidden = false;
    if (els.result) els.result.hidden = true;
    if (els.scorePill) els.scorePill.hidden = true;
    if (els.certNote) els.certNote.textContent = '';
    if (els.nameInput) els.nameInput.value = '';

    applyI18nStatic();
    updateBestBadge();
    renderQuestion();
    updateTimerUI();
    startTimer();
  }

  function cacheEls() {
    els.shell = byId('examShell');
    els.result = byId('examResult');
    els.timer = byId('examTimer');
    els.timerValue = byId('examTimerValue');
    els.progressText = byId('examProgressText');
    els.progressTrack = byId('examProgressTrack');
    els.progressBar = byId('examProgressBar');
    els.scorePill = byId('examScorePill');
    els.scorePillValue = byId('examScorePillValue');
    els.navGrid = byId('examNavGrid');
    els.card = byId('examCard');
    els.step = byId('examStep');
    els.type = byId('examType');
    els.question = byId('examQuestion');
    els.questionDesc = byId('examQuestionDesc');
    els.options = byId('examOptions');
    els.flagBtn = byId('examFlagBtn');
    els.prevBtn = byId('examPrevBtn');
    els.nextBtn = byId('examNextBtn');
    els.submitBtn = byId('examSubmitBtn');
    els.status = byId('examStatus');
    els.bestBadge = byId('examBestBadge');
    els.resultSummary = byId('examResultSummary');
    els.statScore = byId('examStatScore');
    els.statPercent = byId('examStatPercent');
    els.statGrade = byId('examStatGrade');
    els.statTime = byId('examStatTime');
    els.restartBtn = byId('examRestartBtn');
    els.nameInput = byId('examNameInput');
    els.certBtn = byId('examCertBtn');
    els.certCanvas = byId('examCertCanvas');
    els.certNote = byId('examCertNote');
    els.analysisList = byId('examAnalysisList');
  }

  function init() {
    cacheEls();
    if (!els.shell || !els.options) return;
    state.lang = getLang();
    bindEvents();
    resetExam();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
