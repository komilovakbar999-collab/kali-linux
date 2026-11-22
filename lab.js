/* Amaliy lab rejimi: vazifalar, filtrlar, jarayon, yordam va yechimlar */
(function () {
  'use strict';

  var KEY = 'kali_lab_progress';
  var LANGS = ['uz', 'ru', 'en'];
  var LEVELS = ['all', 'beginner', 'intermediate', 'advanced'];
  var labs = Array.isArray(window.KALI_LABS) ? window.KALI_LABS : [];
  var cats = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
  var view = {
    cat: 'all', diff: 'all', q: '', open: null,
    showHint: false, showSolution: false, showWhy: false,
    status: '', statusKind: ''
  };

  function el(id) { return document.getElementById(id); }
  function t(key) { return window.I18N ? window.I18N.t(key) : key; }
  function lang() { return window.I18N ? window.I18N.getLang() : 'uz'; }
  function store(key, value) {
    if (window.KaliCommon && typeof window.KaliCommon.store === 'function') {
      return window.KaliCommon.store(key, value);
    }
    try {
      if (value === undefined) { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (e) { return null; }
  }
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function norm(value) {
    var raw = String(value == null ? '' : value);
    if (window.KaliCommon && typeof window.KaliCommon.normalize === 'function') {
      return window.KaliCommon.normalize(raw);
    }
    return raw.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  }
  function loc(field, l) {
    if (!field) return '';
    var code = l || lang();
    var value = field[code] || field.uz || field.ru || field.en || '';
    return typeof value === 'string' ? value : '';
  }
  function reduceMotion() {
    return !!(window.KaliCommon && typeof window.KaliCommon.reduceMotion === 'function' && window.KaliCommon.reduceMotion());
  }
  function truncate(text, limit) {
    var s = String(text || '');
    return s.length > limit ? s.slice(0, limit).trim() + '…' : s;
  }
  function setText(id, value) { var node = el(id); if (node) node.textContent = String(value == null ? '' : value); }
  function setVisible(node, on) {
    if (!node) return;
    node.hidden = !on;
    node.style.display = on ? '' : 'none';
  }
  function catLabel(id) {
    var found = cats.filter(function (c) { return c.id === id; })[0];
    return found ? (loc(found) || id) : id;
  }
  function diffLabel(id) {
    var map = { beginner: 'labBeginner', intermediate: 'labIntermediate', advanced: 'labAdvanced' };
    return map[id] ? t(map[id]) : id;
  }
  function find(id) {
    for (var i = 0; i < labs.length; i++) {
      if (labs[i].id === id) return labs[i];
    }
    return null;
  }
  function getProgress() {
    var data = store(KEY);
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  }
  function saveProgress(data) { store(KEY, data); }
  function entry(id) {
    var e = getProgress()[id];
    return e && typeof e === 'object' && !Array.isArray(e) ? e : null;
  }
  function isSolved(lab) { var e = entry(lab.id); return !!(e && e.solved); }
  function totalScore() {
    var data = getProgress(), sum = 0;
    labs.forEach(function (lab) {
      var e = data[lab.id];
      if (e && e.solved) sum += Number(e.score) || Number(lab.points) || 0;
    });
    return sum;
  }
  function nextLab(lab) {
    var start = labs.indexOf(lab);
    var i, n = labs.length;
    for (i = start + 1; i < n; i++) if (!isSolved(labs[i])) return labs[i];
    for (i = 0; i < start; i++) if (!isSolved(labs[i])) return labs[i];
    return null;
  }

  /* Qidiruv: mavjud bo'lsa KaliCommon.commandScore, aks holda oddiy moslik */
  function asCommand(lab) {
    var desc = {};
    LANGS.forEach(function (l) {
      desc[l] = loc(lab.title, l) + ' ' + loc(lab.scenario, l) + ' ' + loc(lab.hint, l);
    });
    return {
      id: lab.id, name: lab.command || lab.id, syntax: lab.command || '',
      category: lab.category, desc: desc,
      tags: (lab.tags || []).concat([lab.id, lab.difficulty])
    };
  }
  function matchesSearch(lab) {
    if (!view.q) return true;
    var common = window.KaliCommon;
    if (common && typeof common.commandScore === 'function') {
      return common.commandScore(asCommand(lab), view.q) > 0;
    }
    var hay = [
      lab.id, lab.category, lab.difficulty, lab.command,
      loc(lab.title), loc(lab.scenario), (lab.tags || []).join(' ')
    ].join(' ');
    return norm(hay).indexOf(norm(view.q)) !== -1;
  }
  function visible(lab) {
    if (view.cat !== 'all' && lab.category !== view.cat) return false;
    if (view.diff !== 'all' && lab.difficulty !== view.diff) return false;
    return matchesSearch(lab);
  }
  function matchesAnswer(answer, expected) {
    var given = norm(answer);
    if (!given || !Array.isArray(expected) || !expected.length) return false;
    for (var i = 0; i < expected.length; i++) {
      var part = norm(expected[i]);
      if (!part || given.indexOf(part) === -1) return false;
    }
    return true;
  }

  function fillSelects() {
    var cat = el('labCat');
    if (cat) {
      var catValue = view.cat;
      var options = ['<option value="all">' + esc(t('showAll')) + '</option>'];
      cats.forEach(function (c) {
        if (c.id === 'all') return;
        options.push('<option value="' + esc(c.id) + '">' + esc(loc(c) || c.id) + '</option>');
      });
      cat.innerHTML = options.join('');
      cat.value = catValue;
    }
    var diff = el('labDifficulty');
    if (diff) {
      var diffValue = view.diff;
      diff.innerHTML = LEVELS.map(function (level) {
        var key = level === 'all' ? 'labAllLevels' :
          (level === 'beginner' ? 'labBeginner' : (level === 'intermediate' ? 'labIntermediate' : 'labAdvanced'));
        return '<option value="' + level + '">' + esc(t(key)) + '</option>';
      }).join('');
      diff.value = diffValue;
    }
  }

  function render() {
    fillSelects();
    var grid = el('labGrid');
    if (!grid) return;

    var solved = 0;
    labs.forEach(function (lab) { if (isSolved(lab)) solved++; });
    var percent = labs.length ? Math.round(solved / labs.length * 100) : 0;
    setText('labProgressText', solved + ' / ' + labs.length + ' · ' + percent + '%');
    var bar = el('labProgressBar');
    if (bar) bar.style.width = percent + '%';
    setText('labScore', t('labScore') + ': ' + totalScore());

    var html = '';
    labs.forEach(function (lab, i) {
      if (!visible(lab)) return;
      var done = isSolved(lab);
      var rec = entry(lab.id);
      var attempts = rec && rec.attempts ? Number(rec.attempts) : 0;
      var number = String(i + 1).length < 2 ? '0' + (i + 1) : String(i + 1);
      html += '<article class="stage' + (done ? ' done' : '') + (view.open === lab.id ? ' flash' : '') + '">' +
        '<div class="stage-top">' +
          '<button type="button" class="stage-num" data-open-lab="' + esc(lab.id) + '"' +
            ' aria-label="' + esc(number + ' — ' + t('labStart') + ': ' + loc(lab.title)) + '">' + esc(number) + '</button>' +
          '<div class="stage-body">' +
            '<h2>' + esc(loc(lab.title)) + '</h2>' +
            '<div class="stage-meta">' + esc(catLabel(lab.category)) +
              ' <span class="pill">' + esc(diffLabel(lab.difficulty)) + '</span></div>' +
            '<p class="cmd-card__desc">' + esc(truncate(loc(lab.scenario), 110)) + '</p>' +
            '<div class="stage-meta">' + esc(t('labScore') + ': ' + (Number(lab.points) || 0)) +
              ' · ' + esc(done ? '✓ ' + t('labCorrect') : (attempts ? t('labTryAgain') + ' (' + attempts + ')' : t('labStart'))) +
            '</div>' +
            '<div class="stage-actions">' +
              '<button type="button" class="mini-btn mini-btn--red" data-open-lab="' + esc(lab.id) + '">' +
                esc(done ? t('labSolution') : t('labStart')) + ' →</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
    });
    grid.innerHTML = html || '<div class="cmd-empty">' + esc(t('labEmpty')) + '</div>';
  }

  function setStatus(message, kind) {
    view.status = message || '';
    view.statusKind = kind || '';
    var node = el('labStatus');
    if (!node) return;
    node.textContent = view.status;
    node.className = 'quiz-feedback' + (kind === 'ok' ? ' ok' : (kind === 'bad' ? ' bad' : ''));
  }

  function renderWork() {
    var work = el('labWork');
    if (!work) return;
    var lab = find(view.open);
    if (!lab) { setVisible(work, false); return; }
    setVisible(work, true);

    var steps = (lab.steps && (lab.steps[lang()] || lab.steps.uz)) || [];
    var stepsNode = el('labStageSteps');
    if (stepsNode) {
      stepsNode.innerHTML = '<ol>' + (Array.isArray(steps) ? steps : []).map(function (s) {
        return '<li>' + esc(s) + '</li>';
      }).join('') + '</ol>';
    }

    setText('labStageTitle', loc(lab.title));
    setText('labStageMeta', catLabel(lab.category) + ' · ' + diffLabel(lab.difficulty) + ' · ' +
      t('labScore') + ': ' + (Number(lab.points) || 0));
    setText('labStageScenario', loc(lab.scenario));
    setText('labHint', t('labHint') + ': ' + loc(lab.hint));
    setText('labSolution', t('labSolution') + ': ' + loc(lab.solution));
    setText('labWhy', t('labWhy') + ': ' + loc(lab.why));
    setText('labSafety', t('labSafety') + ': ' + loc(lab.safety));

    setVisible(el('labHint'), view.showHint);
    setVisible(el('labSolution'), view.showSolution);
    setVisible(el('labWhy'), view.showWhy);
    setVisible(el('labSafety'), true);

    var next = isSolved(lab) ? nextLab(lab) : null;
    var nextBtn = el('labNext');
    if (nextBtn) {
      setVisible(nextBtn, !!next);
      if (next) {
        nextBtn.setAttribute('data-next-lab', next.id);
        nextBtn.textContent = t('labNext') + ': ' + loc(next.title);
      }
    }
    setStatus(view.status, view.statusKind);
  }

  function openLab(id, focus) {
    var lab = find(id);
    if (!lab) return;
    var rec = entry(lab.id);
    var attempts = rec && rec.attempts ? Number(rec.attempts) : 0;
    view.open = lab.id;
    view.showHint = attempts >= 2;
    view.showSolution = !!(rec && rec.solved);
    view.showWhy = !!(rec && rec.solved);
    view.status = '';
    view.statusKind = '';
    var input = el('labAnswer');
    if (input) input.value = '';
    render();
    renderWork();
    try {
      if (location.hash !== '#lab=' + encodeURIComponent(lab.id)) {
        history.replaceState(null, '', '#lab=' + encodeURIComponent(lab.id));
      }
    } catch (e) { /* chuqur havola majburiy emas */ }
    if (focus) {
      var work = el('labWork');
      if (work && work.scrollIntoView) {
        work.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' });
      }
      if (input) setTimeout(function () { input.focus(); }, reduceMotion() ? 0 : 160);
    }
  }

  function checkAnswer() {
    var lab = find(view.open);
    var input = el('labAnswer');
    if (!lab || !input) return;
    var data = getProgress();
    var rec = data[lab.id] || { solved: false, attempts: 0, score: 0 };
    rec.attempts = Number(rec.attempts) || 0;

    if (matchesAnswer(input.value, lab.expected)) {
      rec.attempts += 1;
      rec.solved = true;
      rec.score = Number(lab.points) || 0;
      data[lab.id] = rec;
      saveProgress(data);
      view.showHint = true;
      view.showSolution = true;
      view.showWhy = true;
      var next = nextLab(lab);
      setStatus(t('labCorrect') + ' · ' + t('labProgressSaved') +
        (next ? ' · ' + t('labNext') + ': ' + loc(next.title) : ' · ' + t('labComplete')), 'ok');
      render();
      renderWork();
      var nextBtn = el('labNext');
      if (next && nextBtn) setTimeout(function () { nextBtn.focus(); }, 60);
      else if (input) input.focus();
    } else {
      rec.attempts += 1;
      if (!rec.solved) rec.score = 0;
      data[lab.id] = rec;
      saveProgress(data);
      view.showWhy = true;
      if (rec.attempts >= 2) view.showHint = true;
      setStatus(t('labWrong') + ': ' + t('labTryAgain') +
        (rec.attempts >= 2 ? ' · ' + t('labHint') : ''), 'bad');
      render();
      renderWork();
      input.focus();
      if (input.select) input.select();
    }
  }

  function cmdName(command) {
    var first = String(command || '').trim().split(/\s+/)[0] || '';
    return first.replace(/[^a-zA-Z0-9_.-]/g, '').toLowerCase();
  }
  function copyText(text) {
    function finish(ok) { setStatus(t(ok ? 'copied' : 'copyFail'), ok ? 'ok' : 'bad'); }
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = String(text || '');
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = !!document.execCommand('copy'); } catch (e) { ok = false; }
      ta.parentNode.removeChild(ta);
      finish(ok);
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(String(text || '')).then(function () { finish(true); }, legacy);
    } else legacy();
  }
  function hashLab() {
    var m = location.hash.match(/^#lab=(.+)$/);
    if (!m) return null;
    try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; }
  }

  function init() {
    if (!el('labGrid')) return;
    render();
    var deep = hashLab();
    if (deep && find(deep)) openLab(deep, false);

    var search = el('labSearch');
    if (search) search.addEventListener('input', function () {
      view.q = this.value.trim();
      render();
    });
    var cat = el('labCat');
    if (cat) cat.addEventListener('change', function () { view.cat = this.value; render(); });
    var diff = el('labDifficulty');
    if (diff) diff.addEventListener('change', function () { view.diff = this.value; render(); });

    var grid = el('labGrid');
    grid.addEventListener('click', function (e) {
      var button = e.target.closest('[data-open-lab]');
      if (button) openLab(button.getAttribute('data-open-lab'), true);
    });

    var check = el('labCheck');
    if (check) check.addEventListener('click', checkAnswer);
    var answer = el('labAnswer');
    if (answer) answer.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); checkAnswer(); }
    });

    var hintBtn = el('labHintBtn');
    if (hintBtn) hintBtn.addEventListener('click', function () {
      view.showHint = true;
      renderWork();
      var hint = el('labHint');
      if (hint) hint.focus();
    });
    var solutionBtn = el('labSolutionBtn');
    if (solutionBtn) solutionBtn.addEventListener('click', function () {
      view.showSolution = true;
      view.showWhy = true;
      renderWork();
      var solution = el('labSolution');
      if (solution) solution.focus();
    });

    var copyBtn = el('labCopyCmd');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var lab = find(view.open);
      if (lab) copyText(lab.command);
    });
    var openCmd = el('labOpenCmd');
    if (openCmd) openCmd.addEventListener('click', function () {
      var lab = find(view.open);
      if (lab) location.href = 'index.html#cmd=' + encodeURIComponent(cmdName(lab.command));
    });
    var nextBtn = el('labNext');
    if (nextBtn) nextBtn.addEventListener('click', function () {
      var id = this.getAttribute('data-next-lab');
      if (id) openLab(id, true);
    });

    var reset = el('labReset');
    if (reset) reset.addEventListener('click', function () {
      if (!confirm(t('labClearProgress'))) return;
      saveProgress({});
      view.cat = 'all'; view.diff = 'all'; view.q = '';
      var field = el('labSearch'); if (field) field.value = '';
      view.showHint = false; view.showSolution = false; view.showWhy = false;
      setStatus(t('labClearProgress'), '');
      render();
      renderWork();
    });

    window.addEventListener('hashchange', function () {
      var id = hashLab();
      if (id && id !== view.open && find(id)) openLab(id, true);
    });
    document.addEventListener('langchange', function () {
      fillSelects();
      render();
      renderWork();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
