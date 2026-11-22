/* Kali Linux — qo'shimcha jonli vizuallar: terminal, statistika, soat va maslahat.
 * Yangi fayl: mavjud skriptlar (app.js, effects.js, i18n.js) o'zgartirilmaydi. */
(function () {
  'use strict';

  var TYPE_MS = 25;
  var TERM_MS = 3500;
  var TIP_MS = 5000;
  var COUNT_MS = 900;

  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reduced() { return !!(motionQuery && motionQuery.matches); }

  function lang() {
    return (window.I18N && typeof window.I18N.getLang === 'function') ? window.I18N.getLang() : 'uz';
  }
  function safe(fn) { try { fn(); } catch (e) {} }

  function commandsData() {
    var list = window.LINUX_COMMANDS;
    if (window.KaliCommon && typeof window.KaliCommon.store === 'function') {
      var stored = window.KaliCommon.store('kali_commands');
      if (Array.isArray(stored)) list = stored;
    }
    return Array.isArray(list) ? list : [];
  }

  /* Faqat xavfsiz, ma'lumotnomadagi buyruqlar va ularning misollari. */
  var SCENARIOS = [
    {
      id: 'nmap', fallback: 'nmap -sV 192.168.1.10',
      lines: [
        { cls: 'hdim', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
        { cls: 'hdim', text: 'Nmap scan report for 192.168.1.10' },
        { cls: 'hok', text: '[+] 22/tcp open  ssh' },
        { cls: 'hok', text: '[+] 80/tcp open  http' }
      ]
    },
    {
      id: 'ls', fallback: 'ls -lah',
      lines: [
        { cls: 'hdim', text: 'total 28' },
        { cls: 'hdim', text: 'drwxr-xr-x 2 kali kali 4096 Desktop' },
        { cls: 'hdim', text: '-rw-r--r-- 1 kali kali  512 readme.txt' },
        { cls: 'hok', text: '[+] 4 entries · 2 dirs · 1 file' }
      ]
    },
    {
      id: 'ping', fallback: 'ping -c 4 google.com',
      lines: [
        { cls: 'hdim', text: 'PING google.com (142.250.185.78) 56(84) bytes of data.' },
        { cls: 'hok', text: '64 bytes from 142.250.185.78: icmp_seq=1 ttl=117 time=12.4 ms' },
        { cls: 'hok', text: '64 bytes from 142.250.185.78: icmp_seq=2 ttl=117 time=11.8 ms' },
        { cls: 'hdim', text: '4 packets transmitted, 4 received, 0% packet loss' }
      ]
    },
    {
      id: 'find', fallback: 'find /var/log -name "*.log" -mtime -7',
      lines: [
        { cls: 'hdim', text: 'Searching /var/log ...' },
        { cls: 'hok', text: '/var/log/syslog' },
        { cls: 'hok', text: '/var/log/auth.log' },
        { cls: 'hdim', text: '3 files found · last 7 days' }
      ]
    },
    {
      id: 'grep', fallback: 'grep -rn "error" /var/log/',
      lines: [
        { cls: 'hdim', text: 'Scanning log files ...' },
        { cls: 'hok', text: '/var/log/syslog:42: failed to load module' },
        { cls: 'hok', text: '/var/log/auth.log:108: invalid user' },
        { cls: 'hdim', text: '2 matches in 2 files' }
      ]
    },
    {
      id: 'whoami', fallback: 'whoami',
      lines: [
        { cls: 'hok', text: 'kali' },
        { cls: 'hdim', text: 'uid=1000(kali) gid=1000(kali)' },
        { cls: 'hdim', text: 'groups=1000(kali),27(sudo)' },
        { cls: 'hok', text: '[+] session: kali@localhost' }
      ]
    }
  ];

  /* ---------- 1) Jonli terminal ---------- */
  function initTerminal() {
    var body = document.querySelector('.hero-term__body');
    if (!body) return;
    var all = body.querySelectorAll('.hline');
    if (all.length < 4) return;

    var cmdLine = null, typeEl = null, cmdIndex = -1;
    for (var i = 0; i < all.length; i++) {
      var found = all[i].querySelector('.htype');
      if (found) { cmdLine = all[i]; typeEl = found; cmdIndex = i; break; }
    }
    if (!cmdLine || !typeEl || cmdIndex < 0) return;

    /* Oxirgi ikki .hline (natija + prompt/caret) saqlanadi, ularga tegmaymiz. */
    var out = [];
    for (var j = cmdIndex + 1; j < all.length - 2; j++) out.push(all[j]);
    if (!out.length) return;

    body.classList.add('is-visual');

    var index = 0, interval = null, timers = [], stopped = false;

    function clearTimers() {
      for (var k = 0; k < timers.length; k++) clearTimeout(timers[k]);
      timers = [];
    }
    function commandOf(scene) {
      var list = commandsData();
      for (var n = 0; n < list.length; n++) {
        var c = list[n];
        if (c && c.id === scene.id && c.examples && c.examples.length) {
          var cmd = c.examples[0] && c.examples[0].cmd;
          if (typeof cmd === 'string' && cmd) return cmd;
        }
      }
      return scene.fallback;
    }
    function applyOutput(scene) {
      for (var k = 0; k < out.length; k++) {
        (function (node, spec, pos) {
          timers.push(setTimeout(function () {
            if (stopped) return;
            node.className = 'hline' + (spec && spec.cls ? ' ' + spec.cls : '');
            node.textContent = spec ? spec.text : '';
            if (!reduced()) {
              node.classList.remove('is-updated');
              void node.offsetWidth;
              node.classList.add('is-updated');
            }
          }, pos * 70));
        })(out[k], scene.lines[k], k);
      }
    }
    function typeText(text, done) {
      clearTimers();
      typeEl.textContent = '';
      cmdLine.classList.add('is-typing');
      var n = 0;
      (function step() {
        if (stopped) return;
        n++;
        typeEl.textContent = text.slice(0, n);
        if (n < text.length) timers.push(setTimeout(step, TYPE_MS));
        else {
          cmdLine.classList.remove('is-typing');
          if (done) done();
        }
      })();
    }
    function render(next, animate) {
      index = ((next % SCENARIOS.length) + SCENARIOS.length) % SCENARIOS.length;
      var scene = SCENARIOS[index];
      var text = commandOf(scene);
      if (animate && !reduced()) typeText(text, function () { applyOutput(scene); });
      else {
        clearTimers();
        typeEl.textContent = text;
        cmdLine.classList.remove('is-typing');
        applyOutput(scene);
      }
    }
    function start() {
      if (reduced() || interval) return;
      interval = setInterval(function () {
        if (document.hidden) return;
        render(index + 1, true);
      }, TERM_MS);
    }
    function stop() {
      if (interval) { clearInterval(interval); interval = null; }
      clearTimers();
      cmdLine.classList.remove('is-typing');
    }

    render(0, false);
    if (!reduced()) start();

    if (motionQuery) {
      function onMotion() {
        if (reduced()) { stop(); render(0, false); }
        else { render(index + 1, true); start(); }
      }
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotion);
      else if (motionQuery.addListener) motionQuery.addListener(onMotion);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearTimers(); cmdLine.classList.remove('is-typing'); }
      else { render(index, false); }
    });
  }

  /* ---------- 2) Count-up statistika ---------- */
  function initStats() {
    /* Haqiqatdan 3 til bor: uz / ru / en (app.js bu katakchani to'ldirmaydi). */
    var langCell = document.querySelector('.stat-cell[data-stat="langs"] strong');
    if (langCell) langCell.textContent = '3';

    var specs = [
      { id: 'statCommands', kind: 'commands' },
      { id: 'statTools', kind: 'tools' },
      { id: 'statExamples', kind: 'examples' }
    ];

    function targetOf(el, kind) {
      var raw = parseInt(String(el.textContent || '').replace(/[^\d]/g, ''), 10);
      if (isFinite(raw) && raw > 0) return raw;
      var list = commandsData();
      if (kind === 'commands') return list.length;
      if (kind === 'tools') {
        return list.filter(function (c) { return c && c.category === 'kali'; }).length;
      }
      if (kind === 'examples') {
        return list.reduce(function (n, c) {
          return n + ((c && c.examples && c.examples.length) || 0);
        }, 0);
      }
      return (isFinite(raw) && raw > 0) ? raw : 0;
    }
    function animate(el, cell, target) {
      if (!isFinite(target) || target < 0) return;
      if (reduced() || document.hidden || !window.requestAnimationFrame) {
        el.textContent = String(target);
        return;
      }
      cell.classList.add('is-counting');
      var start = null;
      function step(now) {
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / COUNT_MS);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
        else { el.textContent = String(target); cell.classList.remove('is-counting'); }
      }
      requestAnimationFrame(step);
    }

    var items = [];
    specs.forEach(function (spec) {
      var el = document.getElementById(spec.id);
      if (!el) return;
      var cell = el.closest ? el.closest('.stat-cell') : el.parentNode;
      if (!cell) return;
      items.push({ el: el, cell: cell, target: targetOf(el, spec.kind) });
    });
    if (!items.length) return;

    if (!window.IntersectionObserver) {
      items.forEach(function (item) { animate(item.el, item.cell, item.target); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        items.forEach(function (item) {
          if (item.cell === entry.target) animate(item.el, item.cell, item.target);
        });
      });
    }, { threshold: 0.25 });
    items.forEach(function (item) { observer.observe(item.cell); });
  }

  /* ---------- 3) Jonli soat ---------- */
  var SHORT_MONTH = {
    uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyun', 'iyul', 'avg', 'sen', 'okt', 'noy', 'dek'],
    ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  var FULL_MONTH = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  function initClock() {
    var right = document.querySelector('.k-header__right');
    if (!right || document.getElementById('kaliClock')) return;
    var switcher = right.querySelector('.lang-switch');
    var clock = document.createElement('span');
    clock.id = 'kaliClock';
    clock.className = 'kali-clock';
    if (switcher) right.insertBefore(clock, switcher);
    else right.appendChild(clock);

    function pad(n) { return n < 10 ? '0' + n : String(n); }
    var TZ = 'Asia/Tashkent';
    var fmt = null;
    try {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false,
        day: '2-digit', month: 'numeric', year: 'numeric'
      });
    } catch (e) { fmt = null; }
    function update() {
      var l = lang();
      var short = SHORT_MONTH[l] || SHORT_MONTH.uz;
      var full = FULL_MONTH[l] || FULL_MONTH.uz;
      var parts;
      if (fmt && typeof fmt.formatToParts === 'function') {
        parts = {};
        var raw = fmt.formatToParts(new Date());
        for (var i = 0; i < raw.length; i++) parts[raw[i].type] = raw[i].value;
      } else {
        var d = new Date();
        parts = { hour: pad(d.getHours()), minute: pad(d.getMinutes()), day: pad(d.getDate()), month: String(d.getMonth() + 1), year: String(d.getFullYear()) };
      }
      var hour = parts.hour === '24' ? '00' : parts.hour;
      var day = parseInt(parts.day, 10);
      var month = parseInt(parts.month, 10) - 1;
      clock.textContent = hour + ':' + parts.minute + ' · ' + day + ' ' + (short[month] || '');
      clock.setAttribute('title', day + ' ' + (full[month] || '') + ' ' + parts.year + ' · Toshkent');
    }
    update();
    setInterval(update, 1000);
    document.addEventListener('langchange', update);
  }

  /* ---------- 4) Aylanadigan maslahat ---------- */
  var TIPS = {
    uz: [
      'Faqat o\'zingizga tegishli yoki ruxsat olingan tizimlarni skanerlang.',
      'Kali vositalarini ishga solishdan oldin ruxsatnomangiz borligini tekshiring.',
      'Sinov uchun alohida lab muhitidan foydalaning — ishlab chiqarish tizimiga tegmang.',
      'Topilgan natijalarni yozib boring: buyruq, vaqt va maqsadni qayd eting.',
      'Parollarni hech qachon oddiy matnda saqlamang va maxfiy ma\'lumotlar bilan almashmang.',
      'Bilimingizni sinab ko\'ring: kundalik 5 daqiqalik mashq natija beradi.'
    ],
    ru: [
      'Сканируйте только свои системы или системы с письменного разрешения.',
      'Перед запуском инструментов Kali убедитесь, что у вас есть разрешение.',
      'Используйте отдельную лабораторную среду — не трогайте рабочие системы.',
      'Записывайте результаты: команду, время и цель каждой проверки.',
      'Никогда не храните пароли в открытом виде и не делитесь секретами.',
      'Проверяйте себя: пять минут практики каждый день дают результат.'
    ],
    en: [
      'Scan only systems you own or have explicit permission to test.',
      'Make sure you have authorization before running any Kali tool.',
      'Use an isolated lab environment — never touch production systems.',
      'Keep notes: record the command, time and target of every test.',
      'Never store passwords in plain text and never share secrets.',
      'Test yourself: five minutes of practice a day makes a difference.'
    ]
  };

  function initTips() {
    var note = document.querySelector('.hero__note');
    if (!note || document.getElementById('heroTip')) return;
    var tip = document.createElement('p');
    tip.id = 'heroTip';
    tip.className = 'hero-tip';
    if (note.parentNode) note.parentNode.insertBefore(tip, note.nextSibling);
    else document.body.appendChild(tip);

    var index = 0, timer = null;

    function render(next, animate) {
      var arr = TIPS[lang()] || TIPS.uz;
      index = ((next % arr.length) + arr.length) % arr.length;
      tip.textContent = arr[index];
      if (animate && !reduced()) {
        tip.classList.remove('is-switching');
        void tip.offsetWidth;
        tip.classList.add('is-switching');
      }
    }
    function start() {
      if (reduced() || timer) return;
      timer = setInterval(function () {
        if (document.hidden) return;
        render(index + 1, true);
      }, TIP_MS);
    }
    render(0, false);
    if (!reduced()) start();

    document.addEventListener('langchange', function () { render(index, false); });

    if (motionQuery) {
      function onMotion() {
        if (reduced()) {
          if (timer) { clearInterval(timer); timer = null; }
          tip.classList.remove('is-switching');
          render(0, false);
        } else {
          start();
        }
      }
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotion);
      else if (motionQuery.addListener) motionQuery.addListener(onMotion);
    }
  }

  function boot() {
    safe(initTerminal);
    safe(initStats);
    safe(initClock);
    safe(initTips);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
