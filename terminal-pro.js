/* Terminal Pro - enhanced terminal UX, safe simulation only */
(function () {
  'use strict';
  try {
    if (document.documentElement.getAttribute('data-termpro-ready') === '1') return;
    document.documentElement.setAttribute('data-termpro-ready', '1');

    var HISTORY_KEY = 'kali_term_history';
    var FS_KEY = 'kali_term_fs';
    var FS_ROOT = '/tmp/kali-demo';
    var MAX_HISTORY = 100;
    var I18N = {
      uz: { fullscreen: "To'liq ekran", exitFullscreen: 'Chiqish', copy: 'Nusxalash', copied: 'Nusxalandi', copyFail: 'Nusxalanmadi', cmds: 'buyruq', session: 'Bu sessiyada', sim: 'SIMULYATSIYA', search: 'Tarix qidiruvi', searchPh: 'tarixdan qidirish...', noMatch: 'Mos buyruq topilmadi', danger: 'XAVF: Bu buyruq simulyatsiyada ham bajarilmaydi. Haqiqiy tizimga zarar yetkazishi mumkin!', manMissing: "Qo'llanma topilmadi", manOpen: "To'liq sahifani ochish" },
      ru: { fullscreen: 'Полный экран', exitFullscreen: 'Выход', copy: 'Копировать', copied: 'Скопировано', copyFail: 'Не удалось', cmds: 'команд', session: 'В этой сессии', sim: 'СИМУЛЯЦИЯ', search: 'Поиск по истории', searchPh: 'поиск в истории...', noMatch: 'Совпадений нет', danger: 'ОПАСНО: Эта команда не выполняется даже в симуляции. Она может повредить реальную систему!', manMissing: 'Справка не найдена', manOpen: 'Открыть полную страницу' },
      en: { fullscreen: 'Fullscreen', exitFullscreen: 'Exit', copy: 'Copy', copied: 'Copied', copyFail: 'Copy failed', cmds: 'commands', session: 'This session', sim: 'SIMULATION', search: 'History search', searchPh: 'search history...', noMatch: 'No matching command', danger: 'DANGER: This command is not executed even in simulation. It could damage a real system!', manMissing: 'Manual not found', manOpen: 'Open full page' }
    };

    function lang() {
      try { return (window.I18N && window.I18N.getLang && window.I18N.getLang()) || document.documentElement.lang || 'uz'; } catch (e) { return 'uz'; }
    }
    function tr(key) {
      var l = lang();
      var d = I18N[l] || I18N.en;
      return d[key] || I18N.en[key] || key;
    }
    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function $(sel, root) { return (root || document).querySelector(sel); }
    function storeGet(key, fallback) {
      try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
    }
    function storeSet(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
    }
    function termBody() { return $('#termBody'); }
    function termInput() { return $('#termInput'); }
    function termForm() { return $('#termForm'); }
    function termPrompt() { return $('#termPrompt'); }
    function commands() { return Array.isArray(window.LINUX_COMMANDS) ? window.LINUX_COMMANDS : []; }
    function localText(obj) {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      var l = lang();
      return obj[l] || obj.uz || obj.en || obj.ru || '';
    }
    function addLine(html, cls) {
      var body = termBody();
      if (!body) return;
      var line = document.createElement('div');
      line.className = 'term-line' + (cls ? ' ' + cls : '');
      line.innerHTML = html;
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
    }
    function addText(text, cls) { addLine(esc(text).replace(/\n/g, '<br>'), cls); }
    function addPre(text, cls) { addLine('<pre>' + esc(text) + '</pre>', cls); }
    function promptHtml() {
      var p = termPrompt();
      return '<span class="term-prompt">' + esc(p ? p.textContent : 'kali@localhost:~$') + '</span> ';
    }

    var pHistory = storeGet(HISTORY_KEY, []);
    if (!Array.isArray(pHistory)) pHistory = [];
    pHistory = pHistory.filter(function (x) { return typeof x === 'string' && x.trim(); }).slice(-MAX_HISTORY);
    var pIndex = pHistory.length;
    var sessionCount = 0;
    var ghost = null;
    var ghostItems = [];
    var ghostIndex = -1;
    var ghostOpen = false;
    var searchOverlay = null;
    var searchInput = null;
    var searchList = null;
    var searchMatches = [];
    var searchIndex = 0;

    function saveHistory() { storeSet(HISTORY_KEY, pHistory.slice(-MAX_HISTORY)); }
    function pushHistory(cmd) {
      var v = String(cmd || '').trim();
      if (!v) return;
      if (pHistory.length && pHistory[pHistory.length - 1] === v) { pIndex = pHistory.length; return; }
      pHistory.push(v);
      if (pHistory.length > MAX_HISTORY) pHistory = pHistory.slice(-MAX_HISTORY);
      pIndex = pHistory.length;
      saveHistory();
    }

    function loadFS() {
      var fs = storeGet(FS_KEY, null);
      if (fs && typeof fs === 'object' && !Array.isArray(fs)) return fs;
      fs = {};
      fs[FS_ROOT] = { type: 'dir' };
      fs[FS_ROOT + '/readme.txt'] = { type: 'file', content: 'Kali Linux command reference\nThis is a safe browser simulation.\n' };
      fs[FS_ROOT + '/notes.txt'] = { type: 'file', content: 'Try: ls, cat readme.txt, mkdir test, touch a.txt\n' };
      storeSet(FS_KEY, fs);
      return fs;
    }
    function saveFS(fs) { storeSet(FS_KEY, fs); }
    function normPath(p) {
      var s = String(p || '').replace(/\\/g, '/');
      if (!s) return FS_ROOT;
      if (s.indexOf('~') === 0) s = FS_ROOT + s.slice(1);
      if (s.charAt(0) !== '/') s = FS_ROOT + '/' + s;
      var parts = s.split('/');
      var out = [];
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (!part || part === '.') continue;
        if (part === '..') { out.pop(); continue; }
        out.push(part);
      }
      var res = '/' + out.join('/');
      if (res.indexOf(FS_ROOT) !== 0) return null;
      return res || FS_ROOT;
    }
    function fsEntry(fs, p) { return fs[p]; }
    function ensureDir(fs, p) { if (!fs[p]) fs[p] = { type: 'dir' }; }
    function parentDir(p) {
      if (p === FS_ROOT) return FS_ROOT;
      var idx = p.lastIndexOf('/');
      return idx <= 0 ? FS_ROOT : p.slice(0, idx);
    }
    function baseName(p) { var i = p.lastIndexOf('/'); return i < 0 ? p : p.slice(i + 1); }
    function listDir(fs, dir) {
      var names = [];
      var prefix = dir === '/' ? '/' : dir + '/';
      Object.keys(fs).forEach(function (k) {
        if (k === dir) return;
        if (k.indexOf(prefix) !== 0) return;
        var rest = k.slice(prefix.length);
        if (!rest || rest.indexOf('/') !== -1) return;
        names.push(rest);
      });
      names.sort();
      return names;
    }
    function resolveArg(arg, cwd) {
      var a = String(arg || '').trim();
      if (!a) return normPath(cwd || FS_ROOT);
      if (a === '~' || a.indexOf('~/') === 0 || a.charAt(0) === '/') return normPath(a);
      return normPath((cwd || FS_ROOT) + '/' + a);
    }
    function inSandbox(p) { return typeof p === 'string' && p.indexOf(FS_ROOT) === 0; }

    function getCommandNames() {
      var names = [];
      var seen = {};
      function add(n) {
        var v = String(n || '').trim().toLowerCase();
        if (!v || seen[v]) return;
        seen[v] = true; names.push(v);
      }
      ['help','?','clear','cls','history','echo','date','whoami','id','pwd','cd','ls','cat','uname','neofetch','nmap','hydra','sqlmap','gobuster','nikto','tcpdump','dig','curl','who','which','whois',
       'grep','awk','sed','find','wc','head','tail','sort','uniq','cut','tr','tee','mkdir','touch','rm','cp','mv','chmod','chown','df','du','free','ps','top','kill','ping','ss','ip','ifconfig','nslookup','man','python3','git','tar','unzip','zip','service','crontab','uptime','env','export','alias']
        .forEach(add);
      commands().forEach(function (c) { if (c) add(c.name || c.id); });
      var syn = window.COMMAND_SYNONYMS;
      if (syn && typeof syn === 'object') Object.keys(syn).forEach(add);
      return names.sort();
    }

    function tokenize(raw) {
      var s = String(raw || '').trim();
      var out = [];
      var re = /"([^"]*)"|'([^']*)'|(\S+)/g;
      var m;
      while ((m = re.exec(s))) out.push(m[1] || m[2] || m[3] || '');
      return out;
    }
    function hasDanger(raw) {
      var s = String(raw || '').toLowerCase();
      if (!s.trim()) return false;
      var pats = [
        /\brm\s+(-[^\s]*\s+)*(-rf|-fr|--no-preserve-root)\s+(\/|\/\*|\~|\$home|\.\.)\b/,
        /\brm\s+(-[^\s]*\s+)*\/(\s|$)/,
        /:\(\)\s*\{\s*:\|:\&\s*\};:/,
        /\bmkfs(\.| )/,
        /\bdd\s+.*\bof=\/dev\//,
        /\b(shutdown|reboot|halt|poweroff|init\s+[06])\b/,
        />\s*\/dev\/sd[a-z]/,
        /\bchmod\s+(-[^\s]*\s+)*777\s+\/(\s|$)/,
        /\bchown\s+(-[^\s]*\s+)*.*\s+\/(\s|$)/
      ];
      for (var i = 0; i < pats.length; i++) if (pats[i].test(s)) return true;
      return false;
    }

    function fmtBytes(n) {
      if (n < 1024) return n + 'B';
      if (n < 1024 * 1024) return (n / 1024).toFixed(1) + 'K';
      return (n / (1024 * 1024)).toFixed(1) + 'M';
    }
    function nowStr() { return new Date().toString(); }

    function findCommand(name) {
      var n = String(name || '').toLowerCase();
      var list = commands();
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (!c) continue;
        if (String(c.name || '').toLowerCase() === n) return c;
        if (String(c.id || '').toLowerCase() === n) return c;
      }
      return null;
    }
    function openCommandPage(name) {
      var c = findCommand(name);
      var id = c ? (c.id || c.name) : name;
      if (!id) return null;
      return 'index.html#cmd=' + encodeURIComponent(id);
    }

    function printHelp() {
      var names = getCommandNames();
      addText(tr('session') + ': help, man, history, clear, Ctrl+R, Ctrl+L', 'accent');
      addPre(names.join('  '));
    }

    function handleMan(arg) {
      var name = String(arg || '').trim().split(/\s+/)[0];
      if (!name) { addText('man: missing operand', 'error'); return; }
      var c = findCommand(name);
      if (!c) { addLine('<span class="term-info">man:</span> ' + esc(tr('manMissing')) + ': ' + esc(name), 'error'); return; }
      var desc = localText(c.desc);
      var syntax = c.syntax || c.name || name;
      var href = openCommandPage(c.name || name);
      addLine('<span class="term-badge">MAN</span> <b>' + esc(c.name || name) + '</b>', 'ok');
      addText(desc || '(no description)');
      addLine('<span class="term-info">SYNOPSIS</span> ' + esc(syntax));
      if (c.examples && c.examples[0]) addLine('<span class="term-info">EXAMPLE</span> ' + esc(c.examples[0].cmd));
      if (href) addLine('<a class="term-open term-pro-manlink" href="' + esc(href) + '" data-open="' + esc(c.id || c.name || name) + '">' + esc(tr('manOpen')) + ' →</a>');
    }

    function handleSimCommand(raw) {
      var tokens = tokenize(raw);
      if (!tokens.length) return true;
      var base = tokens[0].toLowerCase();
      var args = tokens.slice(1);
      var argStr = raw.slice(raw.indexOf(tokens[0]) + tokens[0].length).trim();
      var fs = loadFS();

      function ensureSandboxTarget(p, op) {
        if (!p || !inSandbox(p)) { addLine(esc(op + ': ') + esc(String(argStr || '')) + ': Permission denied (simulation sandbox: ' + esc(FS_ROOT) + ')', 'error'); return false; }
        return true;
      }

      if (base === 'man') { handleMan(argStr); return true; }
      if (base === 'help' && argStr) { handleMan(argStr); return true; }
      if (base === 'mkdir') {
        if (!args.length) { addText('mkdir: missing operand', 'error'); return true; }
        for (var mi = 0; mi < args.length; mi++) {
          var mArg = args[mi]; if (mArg.charAt(0) === '-') continue;
          var mp = resolveArg(mArg, FS_ROOT);
          if (!ensureSandboxTarget(mp, 'mkdir')) continue;
          ensureDir(fs, mp); ensureDir(fs, parentDir(mp));
        }
        saveFS(fs); return true;
      }
      if (base === 'touch') {
        if (!args.length) { addText('touch: missing file operand', 'error'); return true; }
        args.forEach(function (a) {
          if (a.charAt(0) === '-') return;
          var p = resolveArg(a, FS_ROOT);
          if (!ensureSandboxTarget(p, 'touch')) return;
          ensureDir(fs, parentDir(p));
          if (!fs[p]) fs[p] = { type: 'file', content: '' };
        });
        saveFS(fs); return true;
      }
      if (base === 'ls') {
        var la = args.filter(function (a) { return a.charAt(0) !== '-'; });
        var target = resolveArg(la[0] || FS_ROOT, FS_ROOT);
        if (!ensureSandboxTarget(target, 'ls')) return true;
        var ent = fs[target];
        if (!ent) { addLine('ls: cannot access ' + esc(la[0] || FS_ROOT) + ': No such file or directory', 'error'); return true; }
        if (ent.type === 'file') { addText(baseName(target)); return true; }
        var items = listDir(fs, target);
        var longFmt = args.some(function (a) { return a.indexOf('l') !== -1 && a.charAt(0) === '-'; });
        if (longFmt) {
          var lines = ['total ' + (items.length * 4)];
          items.forEach(function (name) {
            var p = target + '/' + name;
            var e2 = fs[p] || { type: 'file', content: '' };
            var isDir = e2.type === 'dir';
            var size = isDir ? 4096 : String(e2.content || '').length;
            lines.push((isDir ? 'drwxr-xr-x 2' : '-rw-r--r-- 1') + ' kali kali ' + String(size).padStart(5, ' ') + ' Nov 22 12:00 ' + name + (isDir ? '/' : ''));
          });
          addPre(lines.join('\n'));
        } else {
          addLine('<span class="term-info">' + esc(items.map(function (n) { return fs[target + '/' + n] && fs[target + '/' + n].type === 'dir' ? n + '/' : n; }).join('  ')) + '</span>');
        }
        return true;
      }
      if (base === 'cat') {
        var files = args.filter(function (a) { return a.charAt(0) !== '-'; });
        if (!files.length) { addText('cat: missing file operand', 'error'); return true; }
        files.forEach(function (f) {
          var p = resolveArg(f, FS_ROOT);
          if (!ensureSandboxTarget(p, 'cat')) return;
          var e3 = fs[p];
          if (!e3) { addLine('cat: ' + esc(f) + ': No such file or directory', 'error'); return; }
          if (e3.type === 'dir') { addLine('cat: ' + esc(f) + ': Is a directory', 'error'); return; }
          addText(e3.content || '');
        });
        return true;
      }
      if (base === 'rm') {
        var targets = args.filter(function (a) { return a.charAt(0) !== '-'; });
        if (!targets.length) { addText('rm: missing operand', 'error'); return true; }
        targets.forEach(function (tgt) {
          var p = resolveArg(tgt, FS_ROOT);
          if (!ensureSandboxTarget(p, 'rm')) return;
          if (p === FS_ROOT) { addLine('rm: refusing to remove sandbox root', 'error'); return; }
          if (!fs[p]) { addLine('rm: cannot remove ' + esc(tgt) + ': No such file or directory', 'error'); return; }
          if (fs[p].type === 'dir') {
            var kids = listDir(fs, p);
            var recursive = args.some(function (a) { return a.charAt(0) === '-' && a.indexOf('r') !== -1; });
            if (kids.length && !recursive) { addLine('rm: cannot remove ' + esc(tgt) + ': Is a directory', 'error'); return; }
            Object.keys(fs).forEach(function (k) { if (k === p || k.indexOf(p + '/') === 0) delete fs[k]; });
          } else {
            delete fs[p];
          }
        });
        saveFS(fs); return true;
      }
      if (base === 'cp' || base === 'mv') {
        var ops = args.filter(function (a) { return a.charAt(0) !== '-'; });
        if (ops.length < 2) { addText(base + ': missing file operand', 'error'); return true; }
        var src = resolveArg(ops[0], FS_ROOT);
        var dst = resolveArg(ops[1], FS_ROOT);
        if (!ensureSandboxTarget(src, base) || !ensureSandboxTarget(dst, base)) return true;
        if (!fs[src]) { addLine(base + ': cannot stat ' + esc(ops[0]) + ': No such file or directory', 'error'); return true; }
        if (fs[dst] && fs[dst].type === 'dir') dst = dst + '/' + baseName(src);
        ensureDir(fs, parentDir(dst));
        if (fs[src].type === 'dir') {
          var copyKeys = Object.keys(fs).filter(function (k) { return k === src || k.indexOf(src + '/') === 0; });
          copyKeys.forEach(function (k) {
            var rel = k.slice(src.length);
            fs[dst + rel] = JSON.parse(JSON.stringify(fs[k]));
          });
          if (base === 'mv') copyKeys.forEach(function (k) { delete fs[k]; });
        } else {
          fs[dst] = JSON.parse(JSON.stringify(fs[src]));
          if (base === 'mv') delete fs[src];
        }
        saveFS(fs); return true;
      }
      if (base === 'grep') {
        var pat = ''; var gFile = null;
        for (var gi = 1; gi < tokens.length; gi++) {
          var gt = tokens[gi];
          if (gt.charAt(0) === '-') continue;
          if (!pat) pat = gt; else if (!gFile) gFile = gt;
        }
        if (!pat) { addText('grep: missing pattern', 'error'); return true; }
        var content = '';
        if (gFile) {
          var gp = resolveArg(gFile, FS_ROOT);
          if (!ensureSandboxTarget(gp, 'grep')) return true;
          if (!fs[gp] || fs[gp].type === 'dir') { addLine('grep: ' + esc(gFile) + ': No such file or directory', 'error'); return true; }
          content = fs[gp].content || '';
        } else {
          content = 'readme.txt: Kali Linux command reference\nnotes.txt: Try: ls, cat readme.txt\n';
        }
        try {
          var re = new RegExp(pat, 'i');
          var lines = content.split(/\n/).filter(function (ln) { return re.test(ln); });
          if (lines.length) addPre(lines.join('\n')); else addText('(no matches)', 'dim');
        } catch (e) { addText('grep: invalid pattern', 'error'); }
        return true;
      }
      if (base === 'find') {
        var fDir = FS_ROOT;
        for (var fi = 1; fi < tokens.length; fi++) { if (tokens[fi].charAt(0) !== '-') { fDir = resolveArg(tokens[fi], FS_ROOT) || FS_ROOT; break; } }
        if (!ensureSandboxTarget(fDir, 'find')) return true;
        var nameIdx = tokens.indexOf('-name');
        var needle = nameIdx !== -1 ? tokens[nameIdx + 1] : null;
        var fOut = [];
        Object.keys(fs).forEach(function (k) {
          if (k.indexOf(fDir) !== 0) return;
          var bn = baseName(k);
          if (!needle) { fOut.push(k); return; }
          var rx = new RegExp('^' + String(needle).replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
          if (rx.test(bn)) fOut.push(k);
        });
        fOut.sort();
        addPre(fOut.join('\n') || '(no results)');
        return true;
      }
      if (base === 'wc') {
        var wFile = args.filter(function (a) { return a.charAt(0) !== '-'; })[0];
        if (!wFile) { addText('0 0 0', 'dim'); return true; }
        var wp = resolveArg(wFile, FS_ROOT);
        if (!ensureSandboxTarget(wp, 'wc')) return true;
        if (!fs[wp] || fs[wp].type === 'dir') { addLine('wc: ' + esc(wFile) + ': No such file or directory', 'error'); return true; }
        var txt = fs[wp].content || '';
        var lns = txt ? txt.split(/\n/).length : 0;
        var words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
        addText('  ' + lns + '  ' + words + ' ' + txt.length + ' ' + wFile);
        return true;
      }
      if (base === 'head' || base === 'tail') {
        var nLines = 10;
        var hFile = null;
        for (var hi = 1; hi < tokens.length; hi++) {
          if (tokens[hi] === '-n' && tokens[hi + 1]) { nLines = parseInt(tokens[hi + 1], 10) || 10; hi++; continue; }
          if (tokens[hi].charAt(0) !== '-') hFile = tokens[hi];
        }
        if (!hFile) { addText(base + ': missing file operand', 'error'); return true; }
        var hp = resolveArg(hFile, FS_ROOT);
        if (!ensureSandboxTarget(hp, base)) return true;
        if (!fs[hp] || fs[hp].type === 'dir') { addLine(base + ': ' + esc(hFile) + ': No such file or directory', 'error'); return true; }
        var hLines = String(fs[hp].content || '').split(/\n/);
        var slice = base === 'head' ? hLines.slice(0, nLines) : hLines.slice(-nLines);
        addPre(slice.join('\n'));
        return true;
      }
      if (base === 'sort' || base === 'uniq') {
        var sFile = args.filter(function (a) { return a.charAt(0) !== '-'; })[0];
        if (!sFile) { addText(base + ': missing file operand', 'error'); return true; }
        var sp = resolveArg(sFile, FS_ROOT);
        if (!ensureSandboxTarget(sp, base)) return true;
        if (!fs[sp] || fs[sp].type === 'dir') { addLine(base + ': ' + esc(sFile) + ': No such file or directory', 'error'); return true; }
        var arr = String(fs[sp].content || '').split(/\n/);
        if (base === 'sort') arr.sort();
        if (base === 'uniq') { var u = []; arr.forEach(function (x) { if (!u.length || u[u.length - 1] !== x) u.push(x); }); arr = u; }
        addPre(arr.join('\n'));
        return true;
      }
      if (base === 'echo') { addText(argStr.replace(/^['"]|['"]$/g, '')); return true; }
      if (base === 'whoami' || base === 'who') { addText('kali', 'ok'); return true; }
      if (base === 'id') { addText('uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)', 'ok'); return true; }
      if (base === 'pwd') { addText(FS_ROOT, 'ok'); return true; }
      if (base === 'date') { addText(nowStr(), 'ok'); return true; }
      if (base === 'uname') { addText(args.indexOf('-a') !== -1 ? 'Linux kali 6.8.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux', 'ok'); return true; }
      if (base === 'uptime') { addText(' 12:00:00 up  2:14,  1 user,  load average: 0.08, 0.03, 0.01', 'ok'); return true; }
      if (base === 'df') { addPre('Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1       51475068 8241532  40594920  17% /'); return true; }
      if (base === 'du') { addPre('4\t./notes.txt\n4\t./readme.txt\n8\t.'); return true; }
      if (base === 'free') { addPre('              total        used        free      shared  buff/cache   available\nMem:        8045632     2143320     3892112      102400     2010200     5630448\nSwap:       2097148           0     2097148'); return true; }
      if (base === 'ps') { addPre('  PID TTY          TIME CMD\n 1337 pts/0    00:00:00 bash\n 1450 pts/0    00:00:00 ps'); return true; }
      if (base === 'top') { addPre('top - 12:00:00 up 2:14,  1 user,  load average: 0.08, 0.03, 0.01\nTasks: 123 total,   1 running, 122 sleeping\n%Cpu(s):  2.0 us,  1.0 sy,  0.0 ni, 97.0 id\nMiB Mem :   7857.1 total,   3801.0 free,   2093.1 used'); return true; }
      if (base === 'env') { addPre('USER=kali\nHOME=/home/kali\nSHELL=/bin/bash\nLANG=en_US.UTF-8\nPATH=/usr/local/bin:/usr/bin:/bin'); return true; }
      if (base === 'which') { var w = argStr.trim().split(/\s+/)[0]; if (!w) { addText('which: missing argument', 'error'); } else if (getCommandNames().indexOf(w.toLowerCase()) !== -1) addText('/usr/bin/' + w, 'ok'); else addLine(w + ' not found', 'error'); return true; }
      if (base === 'ip') { addPre('1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 192.168.1.10/24 brd 192.168.1.255 scope global eth0'); return true; }
      if (base === 'ifconfig') { addPre('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.10  netmask 255.255.255.0  broadcast 192.168.1.255\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0'); return true; }
      if (base === 'ss') { addPre('Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port\ntcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*'); return true; }
      if (base === 'ping') { var host = argStr.trim().split(/\s+/)[0] || '127.0.0.1'; addPre('PING ' + host + ' (127.0.0.1) 56(84) bytes of data.\n64 bytes from ' + host + ': icmp_seq=1 ttl=64 time=0.034 ms\n64 bytes from ' + host + ': icmp_seq=2 ttl=64 time=0.031 ms\n--- ' + host + ' ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss'); return true; }
      if (base === 'nslookup' || base === 'whois') { addPre(base === 'nslookup' ? 'Server:\t127.0.0.53\nAddress:\t127.0.0.53#53\n\nNon-authoritative answer:\nName:\texample.com\nAddress: 93.184.216.34' : 'Domain Name: EXAMPLE.COM\nRegistrar: IANA\nCreation Date: 1995-08-14T04:00:00Z\n(simulated output)'); return true; }
      if (base === 'python3') { addText('Python 3.11.9 (simulation). Interactive REPL not available in browser.', 'dim'); return true; }
      if (base === 'git') { addPre('git version 2.45.2 (simulation)\nusage: git [--version] [--help] <command> [<args>]'); return true; }
      if (base === 'tar' || base === 'zip' || base === 'unzip') { addText(base + ': simulated archive operation completed in ' + FS_ROOT, 'ok'); return true; }
      if (base === 'service') { addText(argStr ? 'service ' + argStr + ' (simulated): done' : 'Usage: service <name> <start|stop|status>', argStr ? 'ok' : 'dim'); return true; }
      if (base === 'crontab') { addPre('# simulation: no crontab for kali\n# use crontab -e to edit'); return true; }
      if (base === 'chmod' || base === 'chown') { addText(base + ': permissions updated (simulation, no real filesystem)', 'ok'); return true; }
      if (base === 'kill') { addText(argStr ? 'kill: (' + argStr.trim() + ') - Terminated (simulation)' : 'kill: usage: kill [-s sigspec | -n signum | -sigspec] pid', argStr ? 'ok' : 'error'); return true; }
      if (base === 'cut' || base === 'tr' || base === 'tee' || base === 'awk' || base === 'sed') { addText(base + ': simulated text operation (no real stdin/file pipeline in browser)', 'dim'); return true; }
      if (base === 'export' || base === 'alias') { addText(base + ': set in current simulated session only', 'dim'); return true; }
      return false;
    }

    var HANDLED = {};
    ['grep','awk','sed','find','wc','head','tail','sort','uniq','cut','tr','tee','mkdir','touch','rm','cp','mv','chmod','chown','df','du','free','ps','top','kill','ping','ss','ip','ifconfig','whois','nslookup','man','python3','git','tar','unzip','zip','service','crontab','uptime','env','export','alias','clear','help','?','history'].forEach(function (k) { HANDLED[k] = true; });

    function isHandled(raw) {
      var tks = tokenize(raw);
      if (!tks.length) return false;
      var base = tks[0].toLowerCase();
      if (HANDLED[base]) return true;
      // also intercept dangerous-looking commands to warn
      if (hasDanger(raw)) return true;
      return false;
    }

    function runHandled(raw) {
      var value = String(raw || '').trim();
      if (!value) return;
      addLine(promptHtml() + esc(value), 'cmd');
      pushHistory(value);
      sessionCount += 1;
      updateCount();

      if (hasDanger(value)) {
        addLine('<span class="term-badge" style="background:rgba(239,59,44,.25);color:#ff7b7b">⚠</span> ' + esc(tr('danger')), 'error');
        return;
      }

      var tokens = tokenize(value);
      var base = (tokens[0] || '').toLowerCase();
      if (base === 'clear' || base === 'cls') {
        var body = termBody();
        if (body) body.innerHTML = '';
        return;
      }
      if (base === 'help' || base === '?') { printHelp(); return; }
      if (base === 'history') {
        if (!pHistory.length) { addText('(empty history)', 'dim'); return; }
        pHistory.forEach(function (h, i) { addText('  ' + String(i + 1) + '  ' + h, i === pHistory.length - 1 ? 'ok' : ''); });
        return;
      }

      var ok = handleSimCommand(value);
      if (!ok) {
        addLine('bash: ' + esc(base) + ': command not found', 'error');
      }
    }

    function updateCount() {
      var el = document.getElementById('termProCount');
      if (el) el.textContent = tr('session') + ': ' + sessionCount + ' ' + tr('cmds');
    }

    function ensureGhost() {
      if (ghost) return ghost;
      var row = document.querySelector('.terminal-input-row');
      if (!row) return null;
      row.style.position = 'relative';
      ghost = document.createElement('div');
      ghost.className = 'term-pro-ghost';
      ghost.hidden = true;
      row.appendChild(ghost);
      return ghost;
    }
    function closeGhost() { ghostOpen = false; ghostIndex = -1; ghostItems = []; if (ghost) { ghost.hidden = true; ghost.innerHTML = ''; } }
    function openGhost(matches, token) {
      ensureGhost();
      if (!ghost) return;
      ghostItems = matches.slice(0, 6);
      ghostIndex = -1;
      ghost.innerHTML = '';
      ghostItems.forEach(function (name, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'term-pro-ghost__item';
        btn.setAttribute('data-idx', String(i));
        btn.innerHTML = '<span class="term-pro-ghost__name">' + esc(name) + '</span>';
        btn.addEventListener('mousedown', function (e) { e.preventDefault(); applyGhost(i); });
        ghost.appendChild(btn);
      });
      ghost.hidden = ghostItems.length === 0;
      ghostOpen = !ghost.hidden;
      positionGhost();
    }
    function positionGhost() {
      var input = termInput();
      var row = document.querySelector('.terminal-input-row');
      if (!ghost || !input || !row || ghost.hidden) return;
      try {
        var rowRect = row.getBoundingClientRect();
        var inRect = input.getBoundingClientRect();
        ghost.style.left = Math.max(8, inRect.left - rowRect.left) + 'px';
        ghost.style.right = '12px';
      } catch (e) { ghost.style.left = '12px'; ghost.style.right = '12px'; }
    }
    function renderGhostActive() {
      if (!ghost) return;
      var items = ghost.querySelectorAll('.term-pro-ghost__item');
      for (var i = 0; i < items.length; i++) {
        if (i === ghostIndex) items[i].classList.add('is-active');
        else items[i].classList.remove('is-active');
      }
    }
    function applyGhost(idx) {
      var input = termInput();
      if (!input || !ghostItems.length) return;
      var name = ghostItems[idx < 0 ? 0 : idx];
      if (!name) return;
      var parts = String(input.value).split(/\s+/);
      if (parts.length === 0) parts = [''];
      parts[parts.length - 1] = name;
      input.value = parts.join(' ') + ' ';
      closeGhost();
      input.focus();
    }
    function updateGhost() {
      var input = termInput();
      if (!input) return;
      var val = input.value;
      if (!val || /\s$/.test(val)) { closeGhost(); return; }
      var parts = val.split(/\s+/);
      if (parts.length !== 1) { closeGhost(); return; } // only first token
      var token = parts[0].toLowerCase();
      if (!token) { closeGhost(); return; }
      var names = getCommandNames();
      var matches = names.filter(function (n) { return n.indexOf(token) === 0 && n !== token; });
      if (!matches.length) { closeGhost(); return; }
      openGhost(matches, token);
    }

    function ensureSearch() {
      if (searchOverlay) return searchOverlay;
      var shell = document.querySelector('.terminal-card');
      if (!shell) return null;
      searchOverlay = document.createElement('div');
      searchOverlay.className = 'term-pro-search';
      searchOverlay.hidden = true;
      searchOverlay.innerHTML =
        '<div class="term-pro-search__box" role="dialog" aria-label="History search">' +
          '<div class="term-pro-search__head"><span class="term-pro-search__title"></span><span class="term-pro-search__hint">Enter · Esc</span></div>' +
          '<input type="text" class="term-pro-search__input" spellcheck="false">' +
          '<div class="term-pro-search__list"></div>' +
        '</div>';
      shell.appendChild(searchOverlay);
      searchInput = searchOverlay.querySelector('.term-pro-search__input');
      searchList = searchOverlay.querySelector('.term-pro-search__list');
      searchOverlay.addEventListener('click', function (e) { if (e.target === searchOverlay) closeSearch(); });
      searchInput.addEventListener('input', function () { renderSearch(this.value); });
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); closeSearch(); termInput() && termInput().focus(); return; }
        if (e.key === 'ArrowDown') { e.preventDefault(); moveSearch(1); return; }
        if (e.key === 'ArrowUp') { e.preventDefault(); moveSearch(-1); return; }
        if (e.key === 'Enter') { e.preventDefault(); pickSearch(); return; }
      });
      return searchOverlay;
    }
    function openSearch() {
      ensureSearch();
      if (!searchOverlay) return;
      searchOverlay.querySelector('.term-pro-search__title').textContent = tr('search');
      searchInput.placeholder = tr('searchPh');
      searchInput.value = '';
      searchIndex = 0;
      renderSearch('');
      searchOverlay.hidden = false;
      setTimeout(function () { searchInput && searchInput.focus(); }, 0);
    }
    function closeSearch() { if (searchOverlay) searchOverlay.hidden = true; }
    function renderSearch(q) {
      var query = String(q || '').toLowerCase().trim();
      var src = pHistory.slice().reverse();
      searchMatches = query ? src.filter(function (h) { return h.toLowerCase().indexOf(query) !== -1; }) : src.slice(0, 30);
      searchMatches = searchMatches.slice(0, 20);
      if (searchIndex >= searchMatches.length) searchIndex = Math.max(0, searchMatches.length - 1);
      if (!searchList) return;
      searchList.innerHTML = '';
      if (!searchMatches.length) {
        var empty = document.createElement('div');
        empty.className = 'term-pro-search__empty';
        empty.textContent = tr('noMatch');
        searchList.appendChild(empty);
        return;
      }
      searchMatches.forEach(function (cmd, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'term-pro-search__item' + (i === searchIndex ? ' is-active' : '');
        btn.textContent = cmd;
        btn.addEventListener('mousedown', function (e) { e.preventDefault(); searchIndex = i; pickSearch(); });
        searchList.appendChild(btn);
      });
    }
    function moveSearch(dir) {
      if (!searchMatches.length) return;
      searchIndex = (searchIndex + dir + searchMatches.length) % searchMatches.length;
      renderSearch(searchInput ? searchInput.value : '');
    }
    function pickSearch() {
      var cmd = searchMatches[searchIndex];
      closeSearch();
      var input = termInput();
      if (input && cmd) { input.value = cmd; input.focus(); input.setSelectionRange(cmd.length, cmd.length); }
    }

    function wireUI() {
      var bar = document.querySelector('.terminal-bar');
      var shell = document.querySelector('.term-shell') || document.querySelector('.terminal-card');
      var input = termInput();
      var form = termForm();
      var body = termBody();
      if (!bar || !input || !form || !body) return;

      // Count
      var count = document.createElement('span');
      count.className = 'term-pro-count';
      count.id = 'termProCount';
      updateCount();
      bar.appendChild(count);

      // Fullscreen
      var fsBtn = document.createElement('button');
      fsBtn.type = 'button';
      fsBtn.className = 'terminal-clear term-pro-fsbtn';
      fsBtn.setAttribute('aria-pressed', 'false');
      fsBtn.textContent = '⛶ ' + tr('fullscreen');
      bar.appendChild(fsBtn);

      // Copy
      var copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'terminal-clear term-pro-copybtn';
      copyBtn.textContent = '⧉ ' + tr('copy');
      bar.appendChild(copyBtn);

      function setFs(on) {
        if (!shell) return;
        if (on) { shell.classList.add('term-pro-fullscreen'); fsBtn.textContent = '⛶ ' + tr('exitFullscreen'); fsBtn.setAttribute('aria-pressed', 'true'); }
        else { shell.classList.remove('term-pro-fullscreen'); fsBtn.textContent = '⛶ ' + tr('fullscreen'); fsBtn.setAttribute('aria-pressed', 'false'); }
      }
      fsBtn.addEventListener('click', function () { setFs(!shell.classList.contains('term-pro-fullscreen')); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && shell && shell.classList.contains('term-pro-fullscreen')) {
          setFs(false);
        }
      }, true);

      copyBtn.addEventListener('click', function () {
        var lines = body.querySelectorAll('.term-line');
        var slice = [];
        for (var i = Math.max(0, lines.length - 20); i < lines.length; i++) slice.push(lines[i].textContent || '');
        var txt = slice.join('\n');
        function done(ok) {
          copyBtn.textContent = (ok ? '✓ ' : '✕ ') + (ok ? tr('copied') : tr('copyFail'));
          setTimeout(function () { copyBtn.textContent = '⧉ ' + tr('copy'); }, 1400);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(function () { done(true); }, function () { fallbackCopy(txt, done); });
        } else fallbackCopy(txt, done);
      });
      function fallbackCopy(text, cb) {
        try {
          var ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(ta); cb(ok);
        } catch (e) { cb(false); }
      }

      // Sim badge
      var tip = document.querySelector('.terminal-tip');
      if (tip && !tip.querySelector('.term-pro-sim')) {
        var sim = document.createElement('span');
        sim.className = 'term-pro-sim';
        sim.innerHTML = '<span class="term-pro-sim__dot" aria-hidden="true"></span>' + esc(tr('sim'));
        tip.insertBefore(sim, tip.firstChild);
      } else if (!tip) {
        var card = document.querySelector('.terminal-card');
        if (card) {
          var badge = document.createElement('div');
          badge.className = 'terminal-tip term-pro-tip';
          badge.innerHTML = '<span class="term-pro-sim"><span class="term-pro-sim__dot" aria-hidden="true"></span>' + esc(tr('sim')) + '</span>';
          card.appendChild(badge);
        }
      }

      // Search overlay
      ensureSearch();

      // Ghost
      ensureGhost();

      // Submit: intercept handled commands
      form.addEventListener('submit', function (e) {
        var val = input.value;
        if (!val.trim()) return;
        if (isHandled(val)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          closeGhost();
          input.value = '';
          runHandled(val);
          return;
        }
        closeGhost();
        // let app.js handle; record in bubble phase
      }, true);

      // Record history for commands app.js handles
      form.addEventListener('submit', function () {
        var val = input.value;
        // app.js clears input after submit; capture value before? too late in bubble.
      }, false);
      // Better: capture submit value early
      var lastSubmitVal = '';
      form.addEventListener('submit', function () { lastSubmitVal = input.value; }, true);
      form.addEventListener('submit', function () {
        // after app.js ran (bubble), if we didn't handle it, record
        if (lastSubmitVal && !isHandled(lastSubmitVal)) {
          pushHistory(lastSubmitVal);
          sessionCount += 1;
          updateCount();
        }
        lastSubmitVal = '';
      }, false);

      input.addEventListener('input', function () { updateGhost(); });
      window.addEventListener('resize', function () { if (ghostOpen) positionGhost(); });

      function moveWord(inp, forward) {
        var v = inp.value;
        var pos = inp.selectionStart || 0;
        if (forward) {
          var re = /\s*\S+/g; re.lastIndex = pos;
          var m = re.exec(v);
          pos = m ? re.lastIndex : v.length;
        } else {
          var left = v.slice(0, pos);
          var m2 = left.match(/\s*\S+\s*$/);
          pos = m2 ? pos - m2[0].length : 0;
        }
        inp.setSelectionRange(pos, pos);
      }

      // Document capture: runs before ux.js/input capture handlers, so we can safely preempt conflicts.
      document.addEventListener('keydown', function (e) {
        var t = e.target;
        var inTerm = t === input;
        var k = e.key;
        var ctrl = e.ctrlKey || e.metaKey;
        var alt = e.altKey;

        if (k === 'Escape' && ghostOpen) { e.preventDefault(); e.stopImmediatePropagation(); closeGhost(); return; }

        if (!inTerm) return;

        // Ctrl+R search
        if (ctrl && !alt && String(k).toLowerCase() === 'r') {
          e.preventDefault(); e.stopImmediatePropagation(); closeGhost(); openSearch(); return;
        }

        // Ghost navigation / selection
        if (ghostOpen) {
          if (k === 'ArrowDown') { e.preventDefault(); e.stopImmediatePropagation(); ghostIndex = Math.min(ghostItems.length - 1, ghostIndex + 1); renderGhostActive(); return; }
          if (k === 'ArrowUp') { e.preventDefault(); e.stopImmediatePropagation(); ghostIndex = Math.max(0, ghostIndex - 1); renderGhostActive(); return; }
          if (k === 'Enter' || k === 'Tab') {
            if (ghostIndex >= 0 || ghostItems.length) { e.preventDefault(); e.stopImmediatePropagation(); applyGhost(ghostIndex >= 0 ? ghostIndex : 0); return; }
          }
          if (k === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closeGhost(); return; }
        }

        // Editing shortcuts
        if (ctrl && !alt && String(k).toLowerCase() === 'a') { e.preventDefault(); e.stopImmediatePropagation(); input.setSelectionRange(0, 0); return; }
        if (ctrl && !alt && String(k).toLowerCase() === 'e') { e.preventDefault(); e.stopImmediatePropagation(); var le = input.value.length; input.setSelectionRange(le, le); return; }
        if (ctrl && !alt && String(k).toLowerCase() === 'u') { e.preventDefault(); e.stopImmediatePropagation(); var su = input.selectionStart || 0; input.value = input.value.slice(su); input.setSelectionRange(0, 0); return; }
        if (ctrl && !alt && String(k).toLowerCase() === 'k') { e.preventDefault(); e.stopImmediatePropagation(); var pk = input.selectionStart || 0; input.value = input.value.slice(0, pk); input.setSelectionRange(pk, pk); return; }
        if (ctrl && !alt && String(k).toLowerCase() === 'w') { e.preventDefault(); e.stopImmediatePropagation(); var pw = input.selectionStart || 0; var before = input.value.slice(0, pw); var after = input.value.slice(input.selectionEnd || pw); var trimmed = before.replace(/\s*\S+\s*$/, ''); input.value = trimmed + after; var np2 = trimmed.length; input.setSelectionRange(np2, np2); return; }
        if (alt && (k === 'ArrowLeft' || k === 'ArrowRight')) { e.preventDefault(); e.stopImmediatePropagation(); moveWord(input, k === 'ArrowRight'); return; }

        // Persistent history navigation
        if (!ctrl && !alt && k === 'ArrowUp') {
          e.preventDefault(); e.stopImmediatePropagation();
          if (!pHistory.length) return;
          if (pIndex > 0) pIndex -= 1;
          input.value = pHistory[pIndex] || '';
          setTimeout(function () { input.setSelectionRange(input.value.length, input.value.length); }, 0);
          closeGhost();
          return;
        }
        if (!ctrl && !alt && k === 'ArrowDown') {
          e.preventDefault(); e.stopImmediatePropagation();
          if (!pHistory.length) return;
          if (pIndex < pHistory.length) pIndex += 1;
          input.value = pHistory[pIndex] || '';
          setTimeout(function () { input.setSelectionRange(input.value.length, input.value.length); }, 0);
          closeGhost();
          return;
        }
      }, true);

      // Man links in terminal
      body.addEventListener('click', function (e) {
        var a = e.target.closest('a.term-pro-manlink[data-open]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (href && href.indexOf('#cmd=') !== -1) {
          // let default hash navigation work; also open modal if on index
          var id = a.getAttribute('data-open');
          if (id && typeof window.openModal === 'function') {
            // no global; app.js has openModal in closure. Fall back to hash.
          }
        }
      });

      // Langchange
      document.addEventListener('langchange', function () {
        updateCount();
        fsBtn.textContent = (shell && shell.classList.contains('term-pro-fullscreen') ? '⛶ ' + tr('exitFullscreen') : '⛶ ' + tr('fullscreen'));
        copyBtn.textContent = '⧉ ' + tr('copy');
        var simEl = document.querySelector('.term-pro-sim');
        if (simEl) simEl.innerHTML = '<span class="term-pro-sim__dot" aria-hidden="true"></span>' + esc(tr('sim'));
        if (searchOverlay && !searchOverlay.hidden) {
          searchOverlay.querySelector('.term-pro-search__title').textContent = tr('search');
          searchInput.placeholder = tr('searchPh');
          renderSearch(searchInput.value);
        }
      });
    }

    function init() {
      try {
        var form = termForm();
        var input = termInput();
        var body = termBody();
        if (!form || !input || !body) return;
        wireUI();
      } catch (e) { /* section fail silently */ }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  } catch (e) { /* top-level guard */ }
})();
