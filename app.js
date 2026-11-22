/* Kali Linux — asosiy sahifa: kartalar, arsenal, qidiruv va tafsilot oynasi */
(function () {
  'use strict';

  var POPULAR = ['ls', 'grep', 'find', 'chmod', 'tar', 'curl', 'ps', 'df', 'nmap', 'systemctl'];
  var TOOL_ICONS = {
    nmap: '◎', msfconsole: '◈', hydra: 'ⓗ', john: '⚿', hashcat: '#',
    'aircrack-ng': '≈', gobuster: '⌕', nikto: '△', sqlmap: '⌁',
    tcpdump: '≋', tshark: '⌁', nc: '⇄', 'nc (netcat)': '⇄', dig: '?', whois: 'ⓘ'
  };
  var COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>';
  var CATS = window.CATEGORIES || [];
  var state = { q: '', cat: 'all', sort: 'default', favOnly: false };
  var QUIZ_IDS = ['ls', 'grep', 'find', 'chmod', 'tar', 'curl', 'ps', 'df', 'nmap', 'systemctl', 'hydra', 'sqlmap', 'tcpdump', 'dig'];
  var quiz = { questions: [], index: 0, score: 0, answered: false, picked: null, wrong: [] };
  var termHistory = [], termIndex = 0, termCwd = '~';
  var paletteItems = [], paletteIndex = 0;
  var currentModalId = null;
  var TERM_BUILTINS = ['help', '?', 'clear', 'cls', 'history', 'echo', 'date', 'whoami', 'pwd', 'cd', 'ls',
    'cat', 'uname', 'neofetch', 'nmap', 'hydra', 'sqlmap', 'gobuster', 'nikto', 'tcpdump', 'dig', 'who', 'id', 'curl', 'which', 'whois'];
  var TERM_CHIPS = ['help', 'ls -lah', 'whoami', 'pwd', 'nmap -sV scanme.nmap.org', 'neofetch', 'history'];

  var $ = function (s) { return document.querySelector(s); };
  var t = function (k, v) { return window.I18N ? window.I18N.t(k, v) : k; };

  function store(key, value) {
    try {
      if (value === undefined) { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (e) { return null; }
  }

  function getArray(key, fallback) {
    var v = store(key);
    return Array.isArray(v) ? v : (fallback || []);
  }
  function getObject(key, fallback) {
    var v = store(key);
    return v && typeof v === 'object' && !Array.isArray(v) ? v : (fallback || {});
  }
  function commands() {
    var v = store('kali_commands');
    return Array.isArray(v) ? v : (window.LINUX_COMMANDS || []);
  }
  function lang() { return window.I18N ? window.I18N.getLang() : 'uz'; }
  function local(obj) { return (obj && (obj[lang()] || obj.uz || obj.ru)) || ''; }
  function catById(id) { return CATS.filter(function (c) { return c.id === id; })[0] || CATS[0]; }
  function byId(id, list) { return (list || commands()).filter(function (c) { return c.id === id; })[0]; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function mark(text, query) {
    var safe = esc(text);
    if (!query) return safe;
    try {
      var needle = esc(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return safe.replace(new RegExp('(' + needle + ')', 'gi'), '<mark style="background:rgba(239,59,44,.25);color:#fff">$1</mark>');
    } catch (e) { return safe; }
  }

  function colorCode(code) {
    code = String(code == null ? '' : code);
    var re = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$\{?[A-Za-z_]\w*\}?)|(\|{1,2}|&&|;|>>?|<<<?)|(-{1,2}[\w][\w-]*)|(\d+(?:\.\d+)*)|([A-Za-z_][\w.-]*)/g;
    var out = '', last = 0, first = true;
    code.replace(re, function (m, str, variable, op, flag, num, word, offset) {
      out += esc(code.slice(last, offset));
      var cls = str ? 's-str' : variable ? 's-var' : op ? 's-op' : flag ? 's-flag' : num ? 's-num' : (word && first ? 's-cmd' : 's-word');
      out += '<span class="' + cls + '">' + esc(m) + '</span>';
      if (word && first) first = false;
      last = offset + m.length;
      return m;
    });
    return out + esc(code.slice(last));
  }

  function toast(message) {
    var wrap = $('#toastWrap');
    if (!wrap) return;
    var el = document.createElement('div');
    el.className = 'toast'; el.textContent = message;
    wrap.appendChild(el);
    setTimeout(function () { el.remove(); }, 1800);
  }

  function copy(text, message) {
    function done() { toast(message || t('copied')); }
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast(t('copyFail')); }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(fallback);
    else fallback();
  }

  /* Bir nechta oynalar ustma-ust ochilganda fon faqat bir marta qulflanadi */
  function overlayOpen() {
    return ['#palette', '#favDrawer', '#examplesDrawer', '#modal'].some(function (s) {
      var n = $(s);
      return n && !n.hidden;
    });
  }
  function syncBodyLock() { document.body.style.overflow = overlayOpen() ? 'hidden' : ''; }
  var lastFocus = null;
  function rememberFocus() {
    if (overlayOpen()) return;
    var a = document.activeElement;
    if (a && a !== document.body && a.focus) lastFocus = a;
  }
  function restoreFocus() {
    if (overlayOpen() || !lastFocus) return;
    var node = lastFocus; lastFocus = null;
    if (node.isConnected && node.focus) node.focus();
  }
  function closeOverlays() {
    if (!$('#palette').hidden) closePalette();
    if (!$('#favDrawer').hidden) closeFavDrawer();
    if (!$('#examplesDrawer').hidden) closeExamples();
  }

  /* ---------- Render ---------- */
  function renderStats() {
    var cmds = commands();
    $('#statCommands').textContent = cmds.length;
    $('#statTools').textContent = cmds.filter(function (c) { return c.category === 'kali'; }).length;
    $('#statExamples').textContent = cmds.reduce(function (n, c) { return n + ((c.examples || []).length); }, 0);
  }

  function renderPopular() {
    var cmds = commands();
    $('#popularGrid').innerHTML = POPULAR.map(function (id, i) { return byId(id, cmds) ? { c: byId(id, cmds), i: i } : null; })
      .filter(Boolean).map(function (o) {
        var c = o.c;
        return '<article class="cmd-card" data-open-card="' + esc(c.id) + '" tabindex="0" role="button">' +
          '<span class="cmd-card__num">' + String(o.i + 1).padStart(2, '0') + '</span>' +
          '<code class="cmd-card__name">' + esc(c.name) + '</code>' +
          '<p class="cmd-card__desc">' + esc(local(c.desc)) + '</p>' +
          '<div class="cmd-card__syntax">' + esc(c.syntax || c.name) + '</div>' +
          '<div class="cmd-card__actions">' +
            '<button type="button" class="mini-btn mini-btn--red" data-open="' + esc(c.id) + '">' + esc(t('details')) + '</button>' +
            '<button type="button" class="mini-btn" data-copy="' + esc(c.syntax || c.name) + '">' + esc(t('copy')) + '</button>' +
          '</div></article>';
      }).join('');
  }

  function renderTools() {
    var tools = commands().filter(function (c) { return c.category === 'kali'; });
    $('#toolGrid').innerHTML = tools.map(function (c) {
      var cat = catById(c.category);
      return '<article class="tool-card" data-open-card="' + esc(c.id) + '" tabindex="0" role="button">' +
        '<div class="tool-card__icon">' + esc(TOOL_ICONS[c.name] || '⚙') + '</div>' +
        '<h3 class="tool-card__name">' + esc(c.name) + '</h3>' +
        '<p class="tool-card__desc">' + esc(local(c.desc)) + '</p>' +
        '<div class="tool-card__foot">' +
          '<span class="tool-card__tag">' + esc(cat[lang()] || cat.uz) + '</span>' +
          '<button type="button" class="tool-card__link" data-open="' + esc(c.id) + '">→ ' + esc(t('details')) + '</button>' +
        '</div></article>';
    }).join('');
  }

  function renderPills() {
    var cmds = commands();
    var items = [{ id: 'all', icon: '◆' }].concat(CATS.filter(function (c) { return c.id !== 'all'; }));
    $('#catPills').innerHTML = items.map(function (cat) {
      var count = cat.id === 'all' ? cmds.length : cmds.filter(function (c) { return c.category === cat.id; }).length;
      return '<button type="button" class="pill' + (state.cat === cat.id ? ' active' : '') + '" data-cat="' + esc(cat.id) + '">' +
        (cat.icon ? esc(cat.icon) + ' ' : '') + esc(cat[lang()] || cat.uz || t('showAll')) +
        '<span>' + count + '</span></button>';
    }).join('');
  }

  function filtered() {
    var q = state.q.trim();
    var favs = getArray('kali_favs', []);
    var score = window.KaliCommon && window.KaliCommon.commandScore;
    var scored = commands().map(function (c) {
      return { c: c, s: q && score ? score(c, q) : 1 };
    }).filter(function (x) {
      if (x.s <= 0) return false;
      if (state.cat !== 'all' && x.c.category !== state.cat) return false;
      if (state.favOnly && favs.indexOf(x.c.id) === -1) return false;
      return true;
    });
    if (q && state.sort === 'default') {
      scored.sort(function (a, b) { return b.s - a.s || a.c.name.localeCompare(b.c.name); });
    }
    if (state.sort === 'name') scored.sort(function (a, b) { return a.c.name.localeCompare(b.c.name); });
    if (state.sort === 'cat') scored.sort(function (a, b) {
      var ca = catById(a.c.category)[lang()] || '', cb = catById(b.c.category)[lang()] || '';
      return ca.localeCompare(cb) || a.c.name.localeCompare(b.c.name);
    });
    return scored.map(function (x) { return x.c; });
  }

  function renderList() {
    var list = filtered();
    var favs = getArray('kali_favs', []);
    $('#cmdCount').textContent = list.length + ' / ' + commands().length;
    $('#favOnly').classList.toggle('active', state.favOnly);
    $('#favOnly').setAttribute('aria-pressed', state.favOnly ? 'true' : 'false');
    $('#cmdList').innerHTML = list.length ? list.map(function (c) {
      var cat = catById(c.category);
      var isFav = favs.indexOf(c.id) !== -1;
      return '<div class="cmd-row">' +
        '<code class="cmd-row__name">' + mark(c.name, state.q) + '</code>' +
        '<div class="cmd-row__mid">' +
          '<code class="cmd-row__syntax">' + esc(c.syntax || c.name) + '</code>' +
          '<span class="cmd-row__desc">' + esc(cat[lang()] || cat.uz) + ' · ' + mark(local(c.desc), state.q) + '</span>' +
        '</div>' +
        '<div class="cmd-row__actions">' +
          '<button type="button" class="mini-btn' + (isFav ? ' is-fav' : '') + '" data-fav="' + esc(c.id) + '" title="' + esc(t('save')) + '">' + (isFav ? '★' : '☆') + '</button>' +
          '<button type="button" class="mini-btn" data-copy="' + esc(c.syntax || c.name) + '" title="' + esc(t('copy')) + '">⧉</button>' +
          '<button type="button" class="mini-btn mini-btn--red" data-open="' + esc(c.id) + '">' + esc(t('details')) + '</button>' +
        '</div></div>';
    }).join('') : '<div class="cmd-empty">' + esc(t('noResults')) + '</div>';
  }

  function renderLearn() {
    var titles = [
      'Terminal bilan tanishish', 'Fayl va papkalar', 'Matnni qayta ishlash', 'Foydalanuvchi va ruxsatlar',
      'Jarayonlar va tizim', 'Tarmoq asoslari', 'Kali Linux vositalari', 'Avtomatlashtirish'
    ];
    var ru = [
      'Знакомство с терминалом', 'Файлы и папки', 'Обработка текста', 'Пользователи и права',
      'Процессы и система', 'Основы сети', 'Инструменты Kali Linux', 'Автоматизация'
    ];
    var arr = lang() === 'ru' ? ru : titles;
    $('#learnGrid').innerHTML = arr.map(function (title, i) {
      return '<a href="learn.html#stage=' + (i + 1) + '" class="learn-mini"><b>' + String(i + 1).padStart(2, '0') + '</b><span>' + esc(title) + '</span><i>→</i></a>';
    }).join('');
  }

  /* ---------- Misollar brauzeri ---------- */
  function allExamples() {
    var out = [];
    commands().forEach(function (c) {
      (c.examples || []).forEach(function (ex) {
        out.push({ id: c.id, name: c.name, cat: c.category, cmd: ex.cmd, uz: ex.uz, ru: ex.ru });
      });
    });
    return out;
  }

  function renderExamples() {
    var input = $('#examplesSearch'), sel = $('#examplesCat');
    if (!input || !sel) return [];
    var q = input.value.trim().toLocaleLowerCase();
    var cat = sel.value;
    var total = allExamples();
    var list = total.filter(function (e) {
      if (cat !== 'all' && e.cat !== cat) return false;
      if (!q) return true;
      return [e.name, e.cmd, e.uz, e.ru, catById(e.cat)[lang()]].join(' ').toLocaleLowerCase().indexOf(q) !== -1;
    });
    var count = $('#examplesCount');
    if (count) count.textContent = list.length + ' / ' + total.length + ' ' + t('examplesCount');
    var badge = $('#examplesBadge');
    if (badge) badge.textContent = '(' + total.length + ')';
    $('#examplesList').innerHTML = list.length ? list.map(function (e) {
      var c = catById(e.cat);
      var desc = (lang() === 'ru' ? e.ru : e.uz) || e.uz || '';
      return '<div class="example-row">' +
        '<div class="example-row__top"><code>' + colorCode(e.cmd) + '</code>' +
          '<span class="example-row__cat">' + esc(c[lang()] || c.uz) + '</span></div>' +
        (desc ? '<p>' + esc(desc) + '</p>' : '') +
        '<div class="example-row__act">' +
          '<button type="button" class="mini-btn" data-example-copy="' + esc(e.cmd) + '">⧉ ' + esc(t('copy')) + '</button>' +
          '<button type="button" class="mini-btn mini-btn--red" data-open="' + esc(e.id) + '">' + esc(t('examplesOpen')) + ': ' + esc(e.name) + '</button>' +
        '</div></div>';
    }).join('') : '<div class="fav-empty"><b>⌕</b>' + esc(t('examplesEmpty')) + '</div>';
    return list;
  }

  function renderExampleCats() {
    var sel = $('#examplesCat');
    if (!sel) return;
    var prev = sel.value || 'all';
    var cats = CATS.filter(function (c) { return c.id !== 'all'; });
    sel.innerHTML = '<option value="all">' + esc(t('examplesAll')) + '</option>' + cats.map(function (c) {
      return '<option value="' + esc(c.id) + '">' + esc(c[lang()] || c.uz) + '</option>';
    }).join('');
    sel.value = (prev === 'all' || cats.some(function (c) { return c.id === prev; })) ? prev : 'all';
  }
  function openExamples() {
    rememberFocus();
    renderExampleCats();
    $('#examplesDrawer').hidden = false;
    syncBodyLock();
    renderExamples();
    $('#examplesSearch').focus();
  }
  function closeExamples() {
    $('#examplesDrawer').hidden = true;
    syncBodyLock();
    restoreFocus();
  }

  /* ---------- Mini-test ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function buildQuiz() {
    var pool = commands().filter(function (c) { return c && c.name && local(c.desc); });
    var chosen = [];
    QUIZ_IDS.forEach(function (id) {
      if (chosen.length < 5) { var c = byId(id, pool); if (c) chosen.push(c); }
    });
    pool.forEach(function (c) {
      if (chosen.length < 5 && chosen.indexOf(c) === -1) chosen.push(c);
    });

    quiz.questions = chosen.map(function (c) {
      var others = shuffle(pool.filter(function (x) { return x.id !== c.id && x.name !== c.name; })).slice(0, 3);
      return {
        correct: c.id,
        correctName: c.name,
        question: local(c.desc),
        options: shuffle([c].concat(others)).map(function (o) { return { id: o.id, name: o.name }; })
      };
    });
    quiz.index = 0; quiz.score = 0; quiz.answered = false; quiz.picked = null; quiz.wrong = [];
    renderQuiz();
  }

  function refreshQuizLang() {
    if (!quiz.questions.length) { buildQuiz(); return; }
    quiz.questions.forEach(function (q) {
      var c = byId(q.correct);
      if (c) { q.question = local(c.desc); q.correctName = c.name; }
      q.options.forEach(function (o) { var oc = byId(o.id); if (oc) o.name = oc.name; });
    });
    renderQuiz();
  }

  function renderQuiz() {
    var card = $('#quizCard');
    if (!card) return;
    var step = $('#quizStep'), bar = $('#quizBar'), qEl = $('#quizQuestion');
    var opts = $('#quizOptions'), fb = $('#quizFeedback'), next = $('#quizNext');

    if (!quiz.questions.length) {
      step.textContent = '—'; bar.style.width = '0'; qEl.textContent = t('noResults');
      opts.innerHTML = ''; fb.textContent = ''; next.hidden = true;
      return;
    }
    next.hidden = false;

    if (quiz.index >= quiz.questions.length) {
      var pct = Math.round(quiz.score / quiz.questions.length * 100);
      saveQuizBest(pct);
      var msg = pct === 100 ? t('quizPerfect') : (pct >= 60 ? t('quizGood') : t('quizLow'));
      var openId = quiz.wrong[0] || quiz.questions[0].correct;
      step.textContent = t('quizResult');
      bar.style.width = '100%';
      qEl.innerHTML = '<div class="quiz-result">' +
        '<div class="quiz-result__score">' + pct + '%</div>' +
        '<div class="quiz-result__of">' + esc(t('quizResult')) + ' · ' + quiz.score + ' ' + esc(t('quizOf')) + ' ' + quiz.questions.length + '</div>' +
        '<p class="quiz-result__msg">' + esc(msg) + '</p>' +
        '<div class="quiz-result__actions">' +
          '<button type="button" class="btn btn--ghost" data-quiz-restart>' + esc(t('quizRestart')) + '</button>' +
          '<button type="button" class="btn btn--red" data-open="' + esc(openId) + '">' + esc(t('quizSeeCmd')) + '</button>' +
        '</div></div>';
      opts.innerHTML = ''; fb.textContent = ''; fb.className = 'quiz-feedback'; next.hidden = true;
      return;
    }

    var q = quiz.questions[quiz.index];
    var isLast = quiz.index === quiz.questions.length - 1;
    step.textContent = (quiz.index + 1) + ' / ' + quiz.questions.length;
    bar.style.width = (quiz.index / quiz.questions.length * 100) + '%';
    qEl.textContent = q.question || q.correctName;
    next.textContent = t(isLast ? 'quizFinish' : 'quizNext');
    next.disabled = !quiz.answered;

    opts.innerHTML = q.options.map(function (o, i) {
      var cls = 'quiz-opt';
      if (quiz.answered) {
        if (o.id === q.correct) cls += ' correct';
        else if (o.id === quiz.picked) cls += ' wrong';
        else cls += ' dim';
      }
      return '<button type="button" class="' + cls + '" data-quiz-opt="' + esc(o.id) + '"' + (quiz.answered ? ' disabled' : '') + '>' +
        '<span class="quiz-opt__key">' + (i + 1) + '</span><span>' + esc(o.name) + '</span></button>';
    }).join('');

    fb.className = 'quiz-feedback' + (quiz.answered ? (quiz.picked === q.correct ? ' ok' : ' bad') : '');
    fb.textContent = quiz.answered
      ? (quiz.picked === q.correct ? t('quizCorrect') : t('quizWrong') + ' — ' + q.correctName)
      : '';
  }

  /* ---------- Live terminal simulator ---------- */
  function termPrompt() { return 'kali@localhost:' + termCwd + '$'; }

  function termLine(html, cls) {
    var body = $('#termBody');
    if (!body) return;
    var line = document.createElement('div');
    line.className = 'term-line' + (cls ? ' ' + cls : '');
    line.innerHTML = html;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }
  function termText(text, cls) { termLine(esc(text).replace(/\n/g, '<br>'), cls); }
  function termPre(text, cls) { termLine('<pre>' + esc(text) + '</pre>', cls); }

  function termBanner() {
    termPre('  ╔═╗┌─┐┬ ┬┌┬┐   ╔╦╗┌─┐┬  ┌─┐┌┬┐\n  ║ ╦├─┤│ │ ││    ║║║├─┤│  ├┤  ││\n  ╚═╝┴ ┴└─┘─┴┘   ╩ ╩┴ ┴┴─┘└─┘─┴┘', 'accent');
    termText(t('terminalWelcome'), 'ok');
    termText(t('terminalHint'), 'dim');
  }

  function commonPrefix(arr) {
    if (!arr.length) return '';
    var p = arr[0];
    arr.forEach(function (s) {
      while (p && s.indexOf(p) !== 0) p = p.slice(0, -1);
    });
    return p;
  }

  function runTerm(raw) {
    var value = String(raw || '').trim();
    if (!value) return;
    termLine('<span class="term-prompt">' + esc(termPrompt()) + '</span> ' + colorCode(value), 'cmd');
    termHistory.push(value);
    termIndex = termHistory.length;

    var parts = value.split(/\s+/);
    var base = parts[0].toLowerCase();
    var arg = parts.slice(1).join(' ');

    if (base === 'clear' || base === 'cls') { $('#termBody').innerHTML = ''; return; }

    if (base === 'help' || base === '?') {
      termText(t('terminalHelp1'), 'accent');
      termPre(TERM_BUILTINS.join('  ') + '\n  + ' + commands().length + ' commands');
      termText(t('terminalHelp2'), 'dim');
      return;
    }
    if (base === 'history') {
      var past = termHistory.slice(0, -1);
      if (!past.length) termText(t('terminalHistoryEmpty'), 'dim');
      else past.forEach(function (h, i) { termText('  ' + String(i + 1).padStart(3, ' ') + '  ' + h, i === past.length - 1 ? 'ok' : ''); });
      return;
    }
    if (base === 'echo') { termText(arg); return; }
    if (base === 'date') { termText(new Date().toString(), 'ok'); return; }
    if (base === 'whoami' || base === 'who') { termText('kali', 'ok'); return; }
    if (base === 'id') { termText('uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)', 'ok'); return; }
    if (base === 'pwd') { termText(termCwd === '~' ? '/home/kali' : '/home/kali/' + termCwd, 'ok'); return; }
    if (base === 'cd') {
      if (!arg || arg === '~') { termCwd = '~'; }
      else if (arg === '..') {
        if (termCwd === '~') { termLine('bash: cd: ..: No such file or directory', 'error'); return; }
        termCwd = '~';
      }
      else if (/^(Desktop|Documents|Downloads|Tools)$/.test(arg)) { termCwd = arg; }
      else { termLine('bash: cd: ' + esc(arg) + ': No such file or directory', 'error'); return; }
      $('#termPrompt').textContent = termPrompt();
      return;
    }
    if (base === 'ls') {
      if (/(^|\s)-[\w]*[la]/.test(arg)) {
        termPre('total 28\ndrwxr-xr-x 2 kali kali 4096 Desktop\ndrwxr-xr-x 2 kali kali 4096 Downloads\ndrwxr-xr-x 2 kali kali 4096 Tools\n-rw-r--r-- 1 kali kali  512 readme.txt');
      } else {
        termLine('<span class="term-info">Desktop  Downloads  Tools  readme.txt</span>');
      }
      return;
    }
    if (base === 'cat') {
      if (/readme/.test(arg)) {
        termText('Kali Linux command reference', 'accent');
        termText(t('termReadme'));
      } else termLine('cat: ' + esc(arg || '') + ': No such file or directory', 'error');
      return;
    }
    if (base === 'uname') {
      termText(/-a/.test(arg) ? 'Linux kali 6.8.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux', 'ok');
      return;
    }
    if (base === 'neofetch') {
      termPre('         -`                    kali@localhost\n        .o+`                   ---------------\n       `ooo/                   OS: Kali Linux rolling\n      `+oooo:                  Kernel: 6.8.0-kali3-amd64\n     `+oooooo:                 Shell: bash 5.2.21\n     -+oooooo+:                DE: Xfce\n   `/:-:++oooo+:               Commands: ' + commands().length + '\n  `/++++/+++++++:             Theme: Black & Red\n `/++++++++++++++:            Lang: ' + lang().toUpperCase() + '\n', 'accent');
      return;
    }
    if (base === 'nmap') {
      termText('Starting Nmap 7.94 ( https://nmap.org )', 'dim');
      termPre('Nmap scan report for ' + (arg.replace(/-[a-zA-Z0-9]+/g, '').trim() || 'scanme.nmap.org') + '\nPORT      STATE SERVICE\n22/tcp    open  ssh\n80/tcp    open  http\n443/tcp   open  https\n8080/tcp  open  http-proxy');
      termText('Nmap done: 1 IP address scanned in 3.21 seconds', 'ok');
      termText(t('terminalTip'), 'dim');
      return;
    }
    if (base === 'hydra' || base === 'sqlmap' || base === 'gobuster' || base === 'nikto' || base === 'tcpdump' || base === 'dig' || base === 'curl') {
      termText('[' + base + '] ' + t('termDemo'), 'accent');
      termPre((base === 'dig' ? ';; ANSWER SECTION:\nscanme.nmap.org.  300  IN  A  45.33.32.156' :
        base === 'tcpdump' ? 'listening on eth0, link-type EN10MB\n12:00:01.220 IP 192.168.1.10.54321 > 45.33.32.156.80: Flags [S]' :
        base === 'curl' ? 'HTTP/1.1 200 OK\nContent-Type: text/html\n<h1>Kali command reference</h1>' :
        '[+] target: ' + (arg || 'demo.local') + '\n[+] scanning...\n[+] ' + t('termResults', { n: 4 })));
      termText(t('terminalTip'), 'dim');
      return;
    }

    var found = commands().filter(function (c) { return c.name === base; })[0] || byId(base);
    if (found) {
      termLine('<span class="term-badge">' + esc(t('details')) + '</span> <b>' + esc(found.name) + '</b> — ' + esc(local(found.desc)), 'ok');
      termLine('<span class="term-info">' + esc(t('termSyntax')) + '</span> ' + colorCode(found.syntax || found.name));
      if (found.examples && found.examples.length) {
        termLine('<span class="term-info">' + esc(t('termExample')) + '</span> ' + colorCode(found.examples[0].cmd));
      }
      termLine('<button type="button" class="term-open" data-open="' + esc(found.id) + '">' + esc(t('details')) + ' →</button>');
      return;
    }

    termLine('bash: ' + esc(base) + ': command not found', 'error');
    var guess = commands().filter(function (c) { return c.name.indexOf(base.slice(0, 2)) === 0; }).slice(0, 3);
    termText(t('terminalNotFound') + (guess.length ? ' → ' + guess.map(function (c) { return c.name; }).join(', ') : ''), 'dim');
  }

  function termComplete() {
    var input = $('#termInput');
    if (!input || !input.value.trim()) return;
    var parts = input.value.split(/\s+/);
    var last = parts[parts.length - 1].toLowerCase();
    var names = TERM_BUILTINS.concat(commands().map(function (c) { return c.name; }));
    if (names.indexOf(last) !== -1) { input.value = parts.join(' ') + ' '; return; }
    var matches = names.filter(function (n) { return n.indexOf(last) === 0; });
    if (!matches.length) return;
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      input.value = parts.join(' ') + ' ';
    } else {
      termLine('<span class="term-info">' + esc(matches.slice(0, 14).join('   ')) + '</span>', 'dim');
      var prefix = commonPrefix(matches);
      if (prefix.length > last.length) { parts[parts.length - 1] = prefix; input.value = parts.join(' '); }
    }
  }

  function initTerminal() {
    var form = $('#termForm'), input = $('#termInput'), chips = $('#termChips');
    if (!form || !input) return;
    termBanner();
    chips.innerHTML = TERM_CHIPS.map(function (c) {
      return '<button type="button" class="terminal-chip" data-term-run="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = input.value;
      if (!value.trim()) return;
      runTerm(value);
      input.value = '';
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (termHistory.length) { termIndex = Math.max(0, termIndex - 1); input.value = termHistory[termIndex] || ''; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        termIndex = Math.min(termHistory.length, termIndex + 1);
        input.value = termHistory[termIndex] || '';
      } else if (e.key === 'Tab') {
        e.preventDefault(); termComplete();
      } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault(); $('#termBody').innerHTML = ''; termBanner();
      }
    });

    $('#termBody').addEventListener('click', function (e) {
      if (!e.target.closest('button')) input.focus();
    });
    $('#termClear').addEventListener('click', function () { $('#termBody').innerHTML = ''; termBanner(); input.focus(); });
  }

  /* ---------- Command palette ---------- */
  function openPalette() {
    var el = $('#palette');
    if (!el) return;
    rememberFocus();
    el.hidden = false;
    var input = $('#paletteInput');
    input.value = '';
    renderPalette('');
    input.focus();
    syncBodyLock();
  }
  function closePalette() {
    var el = $('#palette');
    if (!el) return;
    el.hidden = true;
    syncBodyLock();
    restoreFocus();
  }
  function renderPalette(query) {
    var q = String(query || '').trim();
    var score = window.KaliCommon && window.KaliCommon.commandScore;
    paletteItems = commands().map(function (c) {
      return { c: c, s: q && score ? score(c, q) : 1 };
    }).filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s || a.c.name.localeCompare(b.c.name); })
      .slice(0, 8).map(function (x) { return x.c; });
    paletteIndex = 0;
    var res = $('#paletteResults');
    if (!res) return;
    res.innerHTML = paletteItems.length ? paletteItems.map(function (c, i) {
      var cat = catById(c.category);
      return '<button type="button" class="palette-item' + (i === 0 ? ' active' : '') + '" data-palette-id="' + esc(c.id) + '" data-index="' + i + '">' +
        '<span class="palette-item__icon">' + esc((c.name || '?').slice(0, 2).toUpperCase()) + '</span>' +
        '<span class="palette-item__mid"><code>' + esc(c.name) + '</code><span>' + esc(local(c.desc)) + '</span></span>' +
        '<span class="palette-item__cat">' + esc(cat[lang()] || cat.uz || '') + '</span></button>';
    }).join('') : '<div class="palette-empty">' + esc(t('paletteEmpty')) + '</div>';
  }
  function movePalette(step) {
    if (!paletteItems.length) return;
    paletteIndex = (paletteIndex + step + paletteItems.length) % paletteItems.length;
    document.querySelectorAll('.palette-item').forEach(function (el, i) {
      el.classList.toggle('active', i === paletteIndex);
      if (i === paletteIndex) el.scrollIntoView({ block: 'nearest' });
    });
  }

  /* ---------- Favorites ---------- */
  function renderFavs() {
    var ids = getArray('kali_favs', []);
    var cmds = commands();
    var favs = ids.map(function (id) { return byId(id, cmds); }).filter(Boolean);
    var badge = $('#favCount');
    if (badge) { badge.textContent = favs.length; badge.hidden = !favs.length; }
    var list = $('#favList');
    if (list) {
      list.innerHTML = favs.length ? favs.map(function (c) {
        return '<div class="fav-row">' +
          '<div class="fav-row__mid"><code>' + esc(c.name) + '</code><span>' + esc(local(c.desc)) + '</span></div>' +
          '<div class="fav-row__act">' +
            '<button type="button" class="mini-btn" data-copy="' + esc(c.syntax || c.name) + '" title="' + esc(t('copy')) + '">⧉</button>' +
            '<button type="button" class="mini-btn mini-btn--red" data-open="' + esc(c.id) + '">' + esc(t('savedOpen')) + '</button>' +
            '<button type="button" class="mini-btn danger" data-fav-remove="' + esc(c.id) + '" title="' + esc(t('savedRemove')) + '">×</button>' +
          '</div></div>';
      }).join('') : '<div class="fav-empty"><b>☆</b>' + esc(t('savedEmpty')) + '</div>';
    }
    var modalFav = document.querySelector('#modal [data-fav]');
    if (modalFav) {
      var active = ids.indexOf(modalFav.getAttribute('data-fav')) !== -1;
      modalFav.textContent = (active ? '★' : '☆') + ' ' + t('save');
    }
  }
  function toggleFav(id) {
    var favs = getArray('kali_favs', []);
    var pos = favs.indexOf(id);
    if (pos === -1) { favs.push(id); toast(t('savedAdded')); }
    else { favs.splice(pos, 1); toast(t('savedRemoved')); }
    store('kali_favs', favs);
    renderFavs();
    renderList();
  }
  function openFavDrawer() { rememberFocus(); renderFavs(); $('#favDrawer').hidden = false; syncBodyLock(); $('#favClose').focus(); }
  function closeFavDrawer() { $('#favDrawer').hidden = true; syncBodyLock(); restoreFocus(); }

  /* ---------- Quiz best score ---------- */
  function renderQuizBest() {
    var best = getObject('kali_quiz_best', null);
    var el = $('#quizBest');
    if (!el) return;
    if (!best || typeof best !== 'object' || !isFinite(Number(best.pct))) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = esc(t('quizBest')) + ': <b>' + esc(Number(best.pct)) + '%</b> · ' +
      esc(Number(best.score) || 0) + '/' + esc(Number(best.total) || 0);
  }
  function saveQuizBest(pct) {
    var best = getObject('kali_quiz_best', null);
    if (!isFinite(Number(best.pct)) || pct > Number(best.pct)) store('kali_quiz_best', { pct: pct, score: quiz.score, total: quiz.questions.length });
    renderQuizBest();
  }

  function renderAll() {
    renderStats(); renderPopular(); renderTools(); renderPills(); renderList(); renderLearn();
    refreshQuizLang(); renderFavs(); renderQuizBest(); renderExamples();
  }

  /* ---------- Detail modal ---------- */
  function openModal(id) {
    var c = byId(id);
    if (!c) return;
    rememberFocus();
    closeOverlays();
    rememberFocus();
    currentModalId = c.id;
    var cat = catById(c.category);
    var syntax = c.syntax || c.name;
    $('#modalTitle').textContent = c.name;
    $('#modalLead').textContent = cat[lang()] + ' · ' + local(c.desc);
    var favs = getArray('kali_favs', []);
    var isFav = favs.indexOf(c.id) !== -1;

    var html = '<h3>' + esc(t('detailSynopsis')) + '</h3>' +
      '<div class="modal__syn"><code>' + colorCode(syntax) + '</code>' +
      '<button type="button" class="mini-btn" data-copy="' + esc(syntax) + '">' + esc(t('copy')) + '</button></div>' +

      '<h3>' + esc(t('detailDesc')) + '</h3><p>' + esc(local(c.desc)) + '</p>' +

      '<h3>' + esc(t('detailOptions')) + '</h3>' +
      ((c.options && c.options.length) ? '<table class="modal__opts"><tbody>' + c.options.map(function (o) {
        return '<tr><td>' + esc(o.flag) + '</td><td>' + esc(local(o)) + '</td></tr>';
      }).join('') + '</tbody></table>' : '<p>' + esc(t('noOptions')) + '</p>') +

      '<h3>' + esc(t('detailExamples')) + '</h3>' +
      ((c.examples && c.examples.length) ? c.examples.map(function (e) {
        return '<div class="modal__ex"><pre><code>' + colorCode(e.cmd) + '</code></pre>' +
          '<p>' + esc(local(e)) + '</p>' +
          '<div style="padding:0 14px 12px"><button type="button" class="mini-btn" data-copy="' + esc(e.cmd) + '">' + esc(t('copy')) + '</button></div></div>';
      }).join('') : '<p>' + esc(t('noOptions')) + '</p>') +

      (c.notice ? '<h3>' + esc(t('ethicsTitle')) + '</h3><div class="modal__notice">' + esc(local(c.notice)) + '</div>' : '') +

      (c.tags && c.tags.length ? '<h3>' + esc(t('detailTags')) + '</h3><p style="color:var(--dim);font:11px var(--mono)">' + c.tags.map(esc).join(' · ') + '</p>' : '') +

      '<div class="modal-actions">' +
        '<button type="button" class="btn btn--ghost" data-copy-link="' + esc(c.id) + '" title="' + esc(t('copyLink')) + '">🔗 ' + esc(t('copyLink')) + '</button>' +
        '<button type="button" class="btn btn--ghost" data-fav="' + esc(c.id) + '">' + (isFav ? '★' : '☆') + ' ' + esc(t('save')) + '</button>' +
        '<button type="button" class="btn btn--red" data-copy="' + esc(syntax) + '">' + COPY_ICON + ' ' + esc(t('copy')) + '</button>' +
      '</div>';

    $('#modalBody').innerHTML = html;
    $('#modal').hidden = false;
    syncBodyLock();
    $('#modalClose').focus();
    if (location.hash !== '#cmd=' + encodeURIComponent(c.id)) {
      history.replaceState(null, '', '#cmd=' + encodeURIComponent(c.id));
    }
  }

  function closeModal() {
    $('#modal').hidden = true;
    currentModalId = null;
    syncBodyLock();
    restoreFocus();
    if (location.hash.indexOf('#cmd=') === 0) history.replaceState(null, '', location.pathname + location.search);
  }

  function handleHash() {
    var match = location.hash.match(/^#cmd=(.+)$/);
    var id = null;
    if (match) { try { id = decodeURIComponent(match[1]); } catch (e) { id = null; } }
    if (id && byId(id)) {
      if ($('#modal').hidden || currentModalId !== id) openModal(id);
    } else if (!$('#modal').hidden) closeModal();
  }

  /* ---------- Events ---------- */
  function init() {
    var params = new URLSearchParams(location.search);
    var preset = params.get('q');
    if (preset) { state.q = preset.trim(); $('#cmdSearch').value = state.q; }
    renderExampleCats();
    renderAll();
    initTerminal();
    if (preset) {
      var h = location.hash.replace(/^#/, '');
      if (!h || h === 'commands') {
        var target = $('#commands');
        if (target) target.scrollIntoView({ behavior: (window.KaliCommon && window.KaliCommon.reduceMotion()) ? 'auto' : 'smooth' });
      }
    }

    var search = $('#cmdSearch');
    search.addEventListener('input', function () {
      state.q = this.value.trim();
      renderList();
    });

    $('#catPills').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cat]');
      if (!btn) return;
      state.cat = btn.getAttribute('data-cat');
      renderPills(); renderList();
    });

    /* Tezkor qidiruv */
    $('#paletteOpen').addEventListener('click', openPalette);
    $('#paletteInline').addEventListener('click', openPalette);
    var pInput = $('#paletteInput');
    pInput.addEventListener('input', function () { renderPalette(this.value); });
    pInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); movePalette(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); movePalette(-1); }
      else if (e.key === 'Enter') {
        var item = paletteItems[paletteIndex];
        if (item) { e.preventDefault(); closePalette(); openModal(item.id); }
      }
    });
    $('#palette').addEventListener('click', function (e) { if (e.target === this) closePalette(); });

    /* Saqlanganlar */
    $('#favBtn').addEventListener('click', openFavDrawer);
    $('#favClose').addEventListener('click', closeFavDrawer);
    $('#favDrawer').addEventListener('click', function (e) { if (e.target === this) closeFavDrawer(); });
    $('#favClear').addEventListener('click', function () {
      store('kali_favs', []);
      renderFavs(); renderList();
      toast(t('savedCleared'));
    });
    $('#userExport').addEventListener('click', function () {
      if (window.KaliUserData) { window.KaliUserData.export(); toast(t('exportData')); }
    });
    $('#userImportBtn').addEventListener('click', function () { $('#userImportFile').click(); });
    $('#userImportFile').addEventListener('change', function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          if (!window.KaliUserData) throw new Error('no helper');
          window.KaliUserData.import(String(reader.result || ''));
          toast(t('dataImported'));
          window.I18N.apply();
          renderAll();
        } catch (err) { toast(t('dataImportFail')); }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    /* Statistika — har bir klikka ishlaydi */
    document.querySelectorAll('[data-stat]').forEach(function (cell) {
      cell.addEventListener('click', function () {
        var kind = cell.getAttribute('data-stat');
        if (kind === 'commands') {
          state.q = ''; state.cat = 'all'; state.sort = 'default'; state.favOnly = false;
          $('#cmdSearch').value = ''; $('#cmdSort').value = 'default';
          renderPills(); renderList();
          $('#commands').scrollIntoView({ behavior: (window.KaliCommon && window.KaliCommon.reduceMotion()) ? 'auto' : 'smooth' });
        } else if (kind === 'tools') {
          $('#arsenal').scrollIntoView({ behavior: (window.KaliCommon && window.KaliCommon.reduceMotion()) ? 'auto' : 'smooth' });
        } else if (kind === 'examples') {
          openExamples();
        } else {
          window.I18N.setLang(lang() === 'uz' ? 'ru' : 'uz');
        }
      });
    });

    /* Misollar brauzeri va qidiruv vositalari */
    $('#examplesOpen').addEventListener('click', openExamples);
    $('#examplesClose').addEventListener('click', closeExamples);
    $('#examplesDrawer').addEventListener('click', function (e) { if (e.target === this) closeExamples(); });
    $('#examplesSearch').addEventListener('input', renderExamples);
    $('#examplesCat').addEventListener('change', renderExamples);
    $('#examplesCopyAll').addEventListener('click', function () {
      var cmds = renderExamples().map(function (e) { return e.cmd; });
      if (cmds.length) copy(cmds.join('\n'));
    });
    $('#cmdSort').addEventListener('change', function () { state.sort = this.value; renderList(); });
    $('#favOnly').addEventListener('click', function () { state.favOnly = !state.favOnly; renderList(); });
    $('#clearFilters').addEventListener('click', function () {
      state.q = ''; state.cat = 'all'; state.sort = 'default'; state.favOnly = false;
      $('#cmdSearch').value = ''; $('#cmdSort').value = 'default';
      renderPills(); renderList();
      toast(t('clearFilters'));
    });

    document.addEventListener('click', function (e) {
      var exCopy = e.target.closest('[data-example-copy]');
      if (exCopy) { copy(exCopy.getAttribute('data-example-copy')); return; }

      var cardOpen = e.target.closest('[data-open-card]');
      if (cardOpen && !e.target.closest('button, a')) { openModal(cardOpen.getAttribute('data-open-card')); return; }
      var pItem = e.target.closest('[data-palette-id]');
      if (pItem) { closePalette(); openModal(pItem.getAttribute('data-palette-id')); return; }

      var termRun = e.target.closest('[data-term-run]');
      if (termRun) {
        var runCmd = termRun.getAttribute('data-term-run');
        runTerm(runCmd);
        $('#termInput').focus();
        return;
      }

      var favRemove = e.target.closest('[data-fav-remove]');
      if (favRemove) { toggleFav(favRemove.getAttribute('data-fav-remove')); return; }

      var copyLink = e.target.closest('[data-copy-link]');
      if (copyLink) {
        copy(location.href.split('#')[0] + '#cmd=' + encodeURIComponent(copyLink.getAttribute('data-copy-link')), t('linkCopied'));
        return;
      }

      var opt = e.target.closest('[data-quiz-opt]');
      if (opt) {
        if (quiz.answered) return;
        var current = quiz.questions[quiz.index];
        if (!current) return;
        quiz.picked = opt.getAttribute('data-quiz-opt');
        quiz.answered = true;
        if (quiz.picked === current.correct) quiz.score++;
        else quiz.wrong.push(current.correct);
        renderQuiz();
        return;
      }

      var qNext = e.target.closest('#quizNext');
      if (qNext) {
        if (!quiz.answered || qNext.hidden) return;
        quiz.index++; quiz.answered = false; quiz.picked = null;
        renderQuiz();
        return;
      }

      var qRestart = e.target.closest('[data-quiz-restart]');
      if (qRestart) { buildQuiz(); return; }

      var copyBtn = e.target.closest('[data-copy]');
      if (copyBtn) { copy(copyBtn.getAttribute('data-copy')); return; }

      var open = e.target.closest('[data-open]');
      if (open) {
        closeOverlays();
        openModal(open.getAttribute('data-open'));
        return;
      }

      var fav = e.target.closest('[data-fav]');
      if (fav) { toggleFav(fav.getAttribute('data-fav')); return; }

      if (e.target.id === 'modal' || e.target.closest('#modalClose')) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!$('#palette').hidden) { closePalette(); return; }
        if (overlayOpen()) return;
        openPalette();
        return;
      }
      if (e.key === 'Escape') {
        if (!$('#palette').hidden) closePalette();
        else if (!$('#examplesDrawer').hidden) closeExamples();
        else if (!$('#favDrawer').hidden) closeFavDrawer();
        else if (!$('#modal').hidden) closeModal();
        return;
      }
      if (overlayOpen()) return;
      var activeCard = e.target.closest && e.target.closest('[data-open-card]');
      if (activeCard && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault(); openModal(activeCard.getAttribute('data-open-card')); return;
      }
      if (/input|textarea|select/i.test(e.target.tagName)) return;

      if (quiz.questions.length && quiz.index < quiz.questions.length) {
        if (/^[1-4]$/.test(e.key)) {
          var btn = document.querySelectorAll('.quiz-opt')[Number(e.key) - 1];
          if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
          return;
        }
        if (e.key === 'Enter' && quiz.answered && !$('#quizNext').hidden) {
          e.preventDefault(); $('#quizNext').click(); return;
        }
      }

      if (e.key === '/') { e.preventDefault(); search.focus(); }
    });

    document.addEventListener('langchange', function () { renderExampleCats(); renderAll(); });
    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
