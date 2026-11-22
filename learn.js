/* Bosqichma-bosqich o'rganish rejasi — bosqichlar, havolalar, eslatmalar, jarayon */
(function () {
  'use strict';

  var STAGES = [
    {
      uz: { title: 'Terminal bilan tanishish', meta: '1-bosqich · asoslar', items: ['pwd, cd, ls buyruqlari', 'Yo\'llar: mutlaq va nisbiy', 'man va --help yordamidan foydalanish', 'Ctrl+C, Ctrl+L, Tab kiritmalari'] },
      ru: { title: 'Знакомство с терминалом', meta: 'Этап 1 · основы', items: ['команды pwd, cd, ls', 'абсолютные и относительные пути', 'использование man и --help', 'горячие клавиши Ctrl+C, Ctrl+L, Tab'] }
    },
    {
      uz: { title: 'Fayl va papkalar bilan ishlash', meta: '2-bosqich · fayl tizimi', items: ['touch, cp, mv, rm', 'mkdir, rmdir, tree', 'cat, head, tail', 'find bilan qidirish'] },
      ru: { title: 'Работа с файлами и папками', meta: 'Этап 2 · файловая система', items: ['touch, cp, mv, rm', 'mkdir, rmdir, tree', 'cat, head, tail', 'поиск через find'] }
    },
    {
      uz: { title: 'Matnni qayta ishlash', meta: '3-bosqich · quvurlar', items: ['grep, sort, uniq, wc', 'sed va awk asoslari', '| quvuri, > va >> yo\'naltirish', 'tee bilan natijani saqlash'] },
      ru: { title: 'Обработка текста', meta: 'Этап 3 · конвейеры', items: ['grep, sort, uniq, wc', 'основы sed и awk', 'конвейер |, перенаправление > и >>', 'сохранение результата через tee'] }
    },
    {
      uz: { title: 'Foydalanuvchilar va ruxsatlar', meta: '4-bosqich · xavfsizlik asoslari', items: ['whoami, id, useradd, passwd', 'chmod, chown', 'sudo va uning xavfsizligi', 'r-x, rwx va 755 kabi belgilar'] },
      ru: { title: 'Пользователи и права', meta: 'Этап 4 · основы безопасности', items: ['whoami, id, useradd, passwd', 'chmod, chown', 'sudo и безопасность', 'обозначения r-x, rwx, 755'] }
    },
    {
      uz: { title: 'Jarayonlar va tizim', meta: '5-bosqich · boshqaruv', items: ['ps, top/htop, kill', 'systemctl bilan xizmatlar', 'df, du, free, uptime', 'journalctl loglari'] },
      ru: { title: 'Процессы и система', meta: 'Этап 5 · управление', items: ['ps, top/htop, kill', 'службы через systemctl', 'df, du, free, uptime', 'логи journalctl'] }
    },
    {
      uz: { title: 'Tarmoq asoslari', meta: '6-bosqich · ulanishlar', items: ['ip, ss, ping', 'curl va DNS (dig, whois)', 'ssh va scp', 'tcpdump bilan paketlarni ko\'rish'] },
      ru: { title: 'Основы сети', meta: 'Этап 6 · соединения', items: ['ip, ss, ping', 'curl и DNS (dig, whois)', 'ssh и scp', 'пакеты через tcpdump'] }
    },
    {
      uz: { title: 'Kali Linux vositalari', meta: '7-bosqich · amaliyot', items: ['nmap bilan tarmoqni skanerlash', 'gobuster va nikto', 'metasploit konsoli', 'Faqat o\'z laboratoriyangizda mashq qiling'] },
      ru: { title: 'Инструменты Kali Linux', meta: 'Этап 7 · практика', items: ['сканирование сети через nmap', 'gobuster и nikto', 'консоль metasploit', 'практикуйтесь только в своей лаборатории'] }
    },
    {
      uz: { title: 'Avtomatlashtirish', meta: '8-bosqich · keyingi qadam', items: ['Bash skriptlari va o\'zgaruvchilar', 'if, for, while', 'crontab bilan vazifalar', 'Git va GitHub Pages'] },
      ru: { title: 'Автоматизация', meta: 'Этап 8 · следующий шаг', items: ['Bash-скрипты и переменные', 'if, for, while', 'задачи через crontab', 'Git и GitHub Pages'] }
    }
  ];

  function lang() { return window.I18N.getLang(); }
  function t(k) { return window.I18N.t(k); }
  function el(id) { return document.getElementById(id); }
  function st(key, value) { return window.KaliCommon.store(key, value); }

  function getDone() { return window.KaliCommon.getArray('kali_progress', []); }
  function getNotes() { return window.KaliCommon.getObject('kali_notes', {}); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var view = { filter: 'all', q: '', collapsed: {} };
  var noteTimer = {}, noteDraft = {};

  function getCommands() {
    var saved = st('kali_commands');
    return Array.isArray(saved) && saved.length ? saved : (window.LINUX_COMMANDS || []);
  }

  var NAMES = getCommands().map(function (c) { return c.name; })
    .filter(function (n) { return /^[a-zA-Z0-9_.-]+$/.test(n); })
    .sort(function (a, b) { return b.length - a.length; });

  function findNames(text) {
    var found = [];
    NAMES.forEach(function (n) {
      var re = new RegExp('\\b' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (re.test(text) && found.indexOf(n) === -1) found.push(n);
    });
    return found;
  }

  function mark(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    try {
      var needle = esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return safe.replace(new RegExp('(' + needle + ')', 'gi'), '<mark>$1</mark>');
    } catch (e) { return safe; }
  }

  function linkify(text) {
    if (!NAMES.length) return esc(text);
    var re = new RegExp('\\b(' + NAMES.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')\\b', 'gi');
    var out = '', last = 0, m;
    while ((m = re.exec(text)) !== null) {
      out += esc(text.slice(last, m.index));
      out += '<a href="index.html?q=' + encodeURIComponent(m[1]) + '#commands">' + esc(m[1]) + '</a>';
      last = m.index + m[1].length;
    }
    return out + esc(text.slice(last));
  }

  function renderFilters() {
    var host = el('stageFilters');
    if (!host) return;
    var done = getDone();
    var counts = {
      all: STAGES.length,
      done: done.length,
      todo: STAGES.length - done.length
    };
    host.innerHTML = [['all', 'learnAll'], ['done', 'learnDoneFilter'], ['todo', 'learnTodoFilter']].map(function (o) {
      return '<button type="button" class="learn-filter' + (view.filter === o[0] ? ' active' : '') +
        '" data-filter="' + o[0] + '">' + esc(t(o[1])) + ' <b>' + counts[o[0]] + '</b></button>';
    }).join('');
  }

  function visibleIndex(i) {
    var done = getDone().indexOf(i) !== -1;
    if (view.filter === 'done' && !done) return false;
    if (view.filter === 'todo' && done) return false;
    if (view.q) {
      var s = STAGES[i][lang()] || STAGES[i].uz;
      if ([s.title, s.meta, s.items.join(' ')].join(' ').toLocaleLowerCase().indexOf(view.q) === -1) return false;
    }
    return true;
  }

  function render() {
    var wrap = el('stages');
    if (!wrap) return;
    var L = lang(), done = getDone(), notes = getNotes();
    var html = '';
    STAGES.forEach(function (stage, i) {
      if (!visibleIndex(i)) return;
      var s = stage[L] || stage.uz;
      var checked = done.indexOf(i) !== -1;
      var names = findNames(s.items.join(' '));
      var openHref = 'index.html' + (names.length ? '?q=' + encodeURIComponent(names[0]) : '') + '#commands';
      var collapsed = !!view.collapsed[i];
      var note = (i in noteDraft) ? noteDraft[i] : (notes[i] || '');
      var q = view.q;

      html += '<article class="stage' + (checked ? ' done' : '') + (collapsed ? ' collapsed' : '') +
        '" id="stage-' + (i + 1) + '">' +
        '<div class="stage-top">' +
          '<button type="button" class="stage-num" data-toggle="' + i + '" title="' + esc(t('learnCollapse')) + '">' +
            String(i + 1).padStart(2, '0') + '</button>' +
          '<div class="stage-body">' +
            '<h2>' + mark(s.title, q) + '</h2>' +
            '<div class="stage-meta">' + mark(s.meta, q) + '</div>' +
            '<div class="stage-detail">' +
              '<ul>' + s.items.map(function (item) {
                return '<li>' + (q ? mark(item, q) : linkify(item)) + '</li>';
              }).join('') + '</ul>' +
              '<div class="stage-actions">' +
                '<a class="mini-btn mini-btn--red" href="' + openHref + '">' + esc(t('learnOpenCommands')) + '</a>' +
                '<a class="mini-btn" href="index.html#terminal">⌨ ' + esc(t('navTerminal')) + '</a>' +
                '<a class="mini-btn" href="index.html#quiz">✦ ' + esc(t('navQuiz')) + '</a>' +
                '<button type="button" class="mini-btn" data-note-toggle="' + i + '">✎ ' + esc(t('learnNotes')) +
                  (note ? ' •' : '') + '</button>' +
              '</div>' +
              '<div class="stage-note' + (note ? ' open' : '') + '" id="note-' + i + '"' + (note ? '' : ' hidden') + '>' +
                '<textarea data-note="' + i + '" rows="2" placeholder="' + esc(t('learnNotesPh')) + '">' + esc(note) + '</textarea>' +
                '<span class="note-status" id="noteStatus-' + i + '"></span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<label class="stage-check" data-i18n-title="learnDone" title="' + esc(t('learnDone')) + '">' +
            '<input type="checkbox" data-stage="' + i + '"' + (checked ? ' checked' : '') + '>' +
          '</label>' +
        '</div></article>';
    });

    wrap.innerHTML = html || '<div class="cmd-empty">' + esc(t('paletteEmpty')) + '</div>';
    updateProgress();
    renderFilters();
  }

  function updateProgress() {
    var done = getDone();
    var pct = Math.round(done.length / STAGES.length * 100);
    var text = el('progressText'), count = el('progressCount'), bar = el('progressBar');
    if (text) text.textContent = pct + '%';
    if (count) count.textContent = done.length + ' / ' + STAGES.length;
    if (bar) bar.style.width = pct + '%';
    var next = el('progressNext');
    if (next) {
      if (done.length === STAGES.length) next.textContent = '✓ ' + t('learnFinished');
      else {
        var i = 0; while (done.indexOf(i) !== -1) i++;
        next.innerHTML = esc(t('learnNext')) + ': <a href="#stage=' + (i + 1) + '">' +
          esc((STAGES[i][lang()] || STAGES[i].uz).title) + ' →</a>';
      }
    }
  }

  function goToStage() {
    var m = location.hash.match(/^#stage=(\d+)$/);
    if (!m) return;
    var card = el('stage-' + Number(m[1]));
    if (!card) return;
    setTimeout(function () {
      card.scrollIntoView({ block: 'center', behavior: (window.KaliCommon && window.KaliCommon.reduceMotion()) ? 'auto' : 'smooth' });
      card.classList.add('flash');
      setTimeout(function () { card.classList.remove('flash'); }, 2200);
    }, 120);
  }

  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function init() {
    render();
    goToStage();

    el('stageSearch').addEventListener('input', function () { view.q = this.value.trim().toLocaleLowerCase(); render(); });
    el('stageFilters').addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      view.filter = b.getAttribute('data-filter'); render();
    });

    el('stages').addEventListener('change', function (e) {
      var cb = e.target.closest('[data-stage]');
      if (!cb) return;
      var idx = Number(cb.getAttribute('data-stage'));
      var done = getDone(), pos = done.indexOf(idx);
      if (cb.checked && pos === -1) done.push(idx);
      if (!cb.checked && pos !== -1) done.splice(pos, 1);
      st('kali_progress', done);
      cb.closest('.stage').classList.toggle('done', cb.checked);
      updateProgress(); renderFilters();
    });

    el('stages').addEventListener('click', function (e) {
      var toggle = e.target.closest('[data-toggle]');
      if (toggle) {
        var i = Number(toggle.getAttribute('data-toggle'));
        view.collapsed[i] = !view.collapsed[i];
        toggle.closest('.stage').classList.toggle('collapsed', view.collapsed[i]);
        return;
      }
      var noteToggle = e.target.closest('[data-note-toggle]');
      if (noteToggle) {
        var box = noteToggle.closest('.stage').querySelector('.stage-note');
        box.hidden = !box.hidden;
        box.classList.toggle('open', !box.hidden);
        if (!box.hidden) box.querySelector('textarea').focus();
      }
    });

    el('stages').addEventListener('input', function (e) {
      var ta = e.target.closest('[data-note]');
      if (!ta) return;
      var i = ta.getAttribute('data-note');
      noteDraft[i] = ta.value;
      clearTimeout(noteTimer[i]);
      noteTimer[i] = setTimeout(function () {
        var value = (i in noteDraft) ? noteDraft[i] : '';
        var notes = getNotes(); notes[i] = value.trim(); st('kali_notes', notes);
        var status = el('noteStatus-' + i);
        if (status) { status.textContent = '✓ ' + t('learnNotesSaved'); setTimeout(function () { status.textContent = ''; }, 1400); }
        var live = document.querySelector('[data-note="' + i + '"]');
        var stage = live && live.closest('.stage');
        var toggle = stage && stage.querySelector('[data-note-toggle]');
        if (toggle) toggle.innerHTML = '✎ ' + esc(t('learnNotes')) + (notes[i] ? ' •' : '');
      }, 350);
    });

    el('exportProgress').addEventListener('click', function () {
      var done = getDone();
      download('kali-progress.json', JSON.stringify({
        completed: done.map(function (i) { return { stage: i + 1, title: (STAGES[i][lang()] || STAGES[i].uz).title }; }),
        percent: Math.round(done.length / STAGES.length * 100),
        notes: getNotes(), exportedAt: new Date().toISOString()
      }, null, 2));
    });
    el('importProgressBtn').addEventListener('click', function () { el('importProgressFile').click(); });
    el('importProgressFile').addEventListener('change', function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          if (!window.KaliUserData) throw new Error('no helper');
          window.KaliUserData.import(String(reader.result || ''));
          view.filter = 'all'; view.q = '';
          el('stageSearch').value = '';
          render();
        } catch (err) { /* noto'g'ri fayl: jim qoldiramiz */ }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
    el('printPlan').addEventListener('click', function () { window.print(); });

    /* Keyingi bosqich havolasi filtr/qidiruv ichida yashirinib qolmasligi uchun */
    var progressNext = el('progressNext');
    if (progressNext) progressNext.addEventListener('click', function (e) {
      if (!e.target.closest('a[href^="#stage="]')) return;
      view.filter = 'all'; view.q = '';
      var input = el('stageSearch'); if (input) input.value = '';
      render();
    });

    el('resetProgress').addEventListener('click', function () {
      if (!confirm(t('learnReset') + '?')) return;
      st('kali_progress', []); st('kali_notes', {}); view.collapsed = {};
      Object.keys(noteTimer).forEach(function (i) { clearTimeout(noteTimer[i]); });
      noteTimer = {}; noteDraft = {}; render();
    });

    window.addEventListener('hashchange', goToStage);
    document.addEventListener('langchange', render);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
