/* Tez yordam — qidiruv, filtr, saralash, saqlanganlar, eksport va nusxalash */
(function () {
  'use strict';

  var store = window.KaliCommon.store;
  function t(k, v) { return window.I18N.t(k, v); }
  function lang() { return window.I18N.getLang(); }
  function el(id) { return document.getElementById(id); }

  function getCommands() {
    var v = store('kali_commands');
    return Array.isArray(v) ? v : (window.LINUX_COMMANDS || []);
  }
  function favs() {
    var v = store('kali_favs');
    return Array.isArray(v) ? v : [];
  }
  function cats() { return (window.CATEGORIES || []).filter(function (c) { return c.id !== 'all'; }); }
  function state() { return { q: '', cat: 'all', sort: 'default', favOnly: false, collapsed: {} }; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function local(o) { return (o && (o[lang()] || o.uz || o.ru)) || ''; }

  function toast(message) {
    var wrap = el('toastWrap');
    if (!wrap) {
      wrap = document.createElement('div'); wrap.id = 'toastWrap'; wrap.className = 'toast-wrap';
      wrap.setAttribute('aria-live', 'polite'); document.body.appendChild(wrap);
    }
    var node = document.createElement('div'); node.className = 'toast'; node.textContent = message;
    wrap.appendChild(node);
    setTimeout(function () { node.remove(); }, 1800);
  }

  function copy(text, message) {
    function done() { toast(message || t('copied')); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast(t('copyFail')); }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(fallback);
    else fallback();
  }

  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var S = state();

  /* Kategoriya hisoblagichlari tanlangan pillga qaramay to'g'ri bo'lishi uchun */
  function matchesQuery(cmd) {
    if (S.favOnly && favs().indexOf(cmd.id) === -1) return false;
    if (!S.q) return true;
    var score = window.KaliCommon && window.KaliCommon.commandScore;
    return score ? score(cmd, S.q) > 0 : true;
  }
  function relevance(cmd) {
    var score = window.KaliCommon && window.KaliCommon.commandScore;
    return S.q && score ? score(cmd, S.q) : 0;
  }
  function matching(cmd) {
    if (S.cat !== 'all' && cmd.category !== S.cat) return false;
    return matchesQuery(cmd);
  }

  function fillCatSelect() {
    var sel = el('cheatCat');
    if (!sel) return;
    var catIds = cats().map(function (c) { return c.id; });
    var restore = sel.value && sel.value !== 'all' && catIds.indexOf(sel.value) !== -1 ? sel.value : S.cat;
    var cmds = getCommands();
    sel.innerHTML = '<option value="all">' + esc(t('cheatAll')) + '</option>' + cats().map(function (c) {
      var n = cmds.filter(function (x) { return x.category === c.id; }).length;
      return '<option value="' + esc(c.id) + '">' + esc(c[lang()] || c.uz) + ' (' + n + ')</option>';
    }).join('');
    if (catIds.indexOf(restore) === -1) restore = 'all';
    S.cat = restore;
    sel.value = restore;
  }

  function renderPills() {
    var host = el('cheatPills');
    if (!host) return;
    var cmds = getCommands();
    host.innerHTML = cats().map(function (c) {
      var n = cmds.filter(function (x) { return x.category === c.id && matchesQuery(x); }).length;
      return '<button type="button" class="cheat-pill' + (S.cat === c.id ? ' active' : '') +
        '" data-cheat-cat="' + esc(c.id) + '">' + esc(c[lang()] || c.uz) +
        ' <b>' + n + '</b></button>';
    }).join('');
  }

  function visibleRows() {
    var wrap = el('cheatContent');
    if (!wrap) return [];
    return Array.prototype.slice.call(wrap.querySelectorAll('[data-cheat-copy]'))
      .filter(function (tr) {
        var g = tr.closest('.cheat-group');
        return g && !g.classList.contains('is-hidden') && !g.classList.contains('collapsed');
      });
  }

  function render() {
    var wrap = el('cheatContent');
    if (!wrap) return;
    fillCatSelect();
    var L = lang(), total = getCommands();
    var html = '', shown = 0;

    cats().forEach(function (c) {
      var items = total.filter(function (x) { return x.category === c.id && matching(x); });
      var allInCat = total.filter(function (x) { return x.category === c.id; });
      if (!allInCat.length) return;
      if (!items.length && (S.q || S.favOnly)) return;
      if (S.cat !== 'all' && S.cat !== c.id) return;
      if (S.q && S.sort === 'default') {
        items.sort(function (a, b) { return relevance(b) - relevance(a) || a.name.localeCompare(b.name); });
      }
      if (S.sort === 'name') items.sort(function (a, b) { return a.name.localeCompare(b.name); });
      shown += items.length;

      html += '<div class="cheat-group' + (S.collapsed[c.id] ? ' collapsed' : '') + '" data-group="' + esc(c.id) + '"><h2>' + esc(c[L] || c.uz) +
        ' <span class="cheat-group__count">' + items.length + '</span></h2>' +
        '<table class="cheat-table"><tbody>';
      items.forEach(function (cmd) {
        var desc = local(cmd.desc);
        var example = (cmd.examples && cmd.examples[0]) ? cmd.examples[0].cmd : (cmd.syntax || cmd.name);
        var isFav = favs().indexOf(cmd.id) !== -1;
        html += '<tr data-cheat-copy="' + esc(example) + '">' +
          '<td class="cheat-table__name"><code>' + esc(cmd.name) + '</code>' +
            '<button type="button" class="cheat-star' + (isFav ? ' active' : '') + '" data-cheat-fav="' +
            esc(cmd.id) + '" title="' + esc(t('save')) + '">' + (isFav ? '★' : '☆') + '</button>' +
            '<a class="cheat-open" href="index.html#cmd=' + encodeURIComponent(cmd.id) + '" title="' +
            esc(t('dayOpen')) + '">↗</a></td>' +
          '<td><span>' + esc(desc) + '</span><br><code class="cheat-example">' + esc(example) + '</code></td></tr>';
      });
      html += '</tbody></table></div>';
    });

    wrap.innerHTML = html || '<div class="cmd-empty">' + esc(t('cheatEmpty')) + '</div>';
    var found = el('cheatFound');
    if (found) found.textContent = shown + ' / ' + total.length + ' ' + t('cheatFound');
    el('cheatFavOnly').classList.toggle('active', S.favOnly);
    el('cheatFavOnly').setAttribute('aria-pressed', S.favOnly ? 'true' : 'false');
    renderPills();
  }

  function reset() {
    S.q = ''; S.cat = 'all'; S.sort = 'default'; S.favOnly = false;
    el('cheatSearch').value = ''; el('cheatCat').value = 'all'; el('cheatSort').value = 'default';
    render();
  }

  function init() {
    fillCatSelect();
    render();
    el('cheatSearch').addEventListener('input', function () { S.q = this.value.trim().toLocaleLowerCase(); render(); });
    el('cheatCat').addEventListener('change', function () { S.cat = this.value; render(); });
    el('cheatSort').addEventListener('change', function () { S.sort = this.value; render(); });
    el('cheatFavOnly').addEventListener('click', function () { S.favOnly = !S.favOnly; render(); });
    el('cheatClear').addEventListener('click', reset);

    el('cheatPills').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cheat-cat]');
      if (!b) return;
      S.cat = b.getAttribute('data-cheat-cat');
      el('cheatCat').value = S.cat;
      render();
      var group = el('cheatContent').querySelector('[data-group="' + S.cat + '"]');
      if (group) group.scrollIntoView({ block: 'start', behavior: (window.KaliCommon && window.KaliCommon.reduceMotion()) ? 'auto' : 'smooth' });
    });

    el('cheatCopyAll').addEventListener('click', function () {
      var rows = visibleRows().map(function (r) { return r.getAttribute('data-cheat-copy'); });
      if (rows.length) copy(rows.join('\n'), t('cheatCopyAll'));
    });
    el('cheatCopyDesc').addEventListener('click', function () {
      var lines = visibleRows().map(function (r) {
        return r.querySelector('code').textContent + ' — ' + r.querySelector('td:nth-child(2) span').textContent +
          '\n    ' + r.getAttribute('data-cheat-copy');
      });
      if (lines.length) copy(lines.join('\n'), t('cheatCopyDesc'));
    });
    el('cheatExport').addEventListener('click', function () {
      var lines = ['# Kali Linux — ' + t('cheatTitle'), ''];
      visibleRows().forEach(function (r) {
        lines.push(r.querySelector('code').textContent + ' — ' + r.querySelector('td:nth-child(2) span').textContent);
        lines.push('  ' + r.getAttribute('data-cheat-copy'));
        lines.push('');
      });
      download('kali-cheatsheet.txt', lines.join('\n'));
    });

    el('cheatContent').addEventListener('click', function (e) {
      var h = e.target.closest('.cheat-group h2');
      if (h) {
        var id = h.parentElement.getAttribute('data-group');
        S.collapsed[id] = !S.collapsed[id];
        h.parentElement.classList.toggle('collapsed', !!S.collapsed[id]);
        return;
      }
      var star = e.target.closest('[data-cheat-fav]');
      if (star) {
        var id = star.getAttribute('data-cheat-fav'), list = favs(), pos = list.indexOf(id);
        if (pos === -1) list.push(id); else list.splice(pos, 1);
        store('kali_favs', list); render(); return;
      }
      if (e.target.closest('.cheat-open')) return;
      var row = e.target.closest('[data-cheat-copy]');
      if (row) copy(row.getAttribute('data-cheat-copy'));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey &&
          !/input|textarea|select/i.test(e.target.tagName) && !e.target.isContentEditable) {
        e.preventDefault(); el('cheatSearch').focus();
      }
      if (e.key === 'Escape' && document.activeElement === el('cheatSearch')) { el('cheatSearch').blur(); reset(); }
    });

    document.addEventListener('langchange', function () {
      var saved = { q: S.q, cat: S.cat, sort: S.sort, favOnly: S.favOnly, collapsed: S.collapsed };
      fillCatSelect();
      S.q = saved.q; S.cat = saved.cat; S.sort = saved.sort; S.favOnly = saved.favOnly; S.collapsed = saved.collapsed;
      el('cheatSearch').value = saved.q;
      el('cheatSort').value = saved.sort;
      render();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
