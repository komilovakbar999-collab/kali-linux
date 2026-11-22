/* Anonim qo'shimcha statistika: qidiruvlar, qurilmalar va manba hostlari.
 * Shaxsga oid ma'lumot (IP, ism, to'liq referrer) hech qaerga yozilmaydi. */
(function () {
  'use strict';

  var SEARCH_FIELDS = ['cmdSearch', 'cheatSearch', 'paletteInput', 'labSearch', 'termInput'];
  var SENT_KEY = 'kali_stats_plus_sent';
  var MAX_SEARCHES = 200;
  var DEBOUNCE_MS = 350;
  var seen = {};
  var sent = 0;

  function visits() { return window.KaliVisits || null; }

  function tr(key, fallback) {
    if (window.I18N && typeof window.I18N.t === 'function') {
      var value = window.I18N.t(key);
      if (value && value !== key) return value;
    }
    return fallback;
  }

  function count() {
    if (sent) return sent;
    try { sent = Math.max(0, Number(sessionStorage.getItem(SENT_KEY)) || 0); } catch (e) { sent = 0; }
    return sent;
  }

  function bump() {
    sent = count() + 1;
    try { sessionStorage.setItem(SENT_KEY, String(sent)); } catch (e) {}
  }

  /* kichik harf, faqat [a-z0-9 uz kirill] va bo'shliq, 2..40 belgi */
  function cleanQuery(raw) {
    var s = String(raw == null ? '' : raw).toLowerCase();
    s = s.replace(/[^a-z0-9\u0400-\u052f ]+/g, ' ').replace(/\s+/g, ' ').trim();
    s = s.slice(0, 40).trim();
    return s.length >= 2 ? s : '';
  }

  function record(raw) {
    var api = visits();
    if (!api || typeof api.recordExtra !== 'function') return;
    var q = cleanQuery(raw);
    if (!q || seen[q] || count() >= MAX_SEARCHES) return;
    seen[q] = 1;
    bump();
    var delta = { searches: {} };
    delta.searches[q] = 1;
    try {
      var result = api.recordExtra(delta);
      if (result && typeof result.catch === 'function') result.catch(function () {});
    } catch (e) {}
  }

  function bindSearch(id) {
    var node = document.getElementById(id);
    if (!node || node.dataset.kaliStatsPlus) return;
    node.dataset.kaliStatsPlus = '1';
    var timer = null;
    node.addEventListener('input', function () {
      if (timer) clearTimeout(timer);
      var value = this.value;
      timer = setTimeout(function () { timer = null; record(value); }, DEBOUNCE_MS);
    });
  }

  function num(value) {
    var n = Math.floor(Number(value));
    return isFinite(n) && n > 0 ? n : 0;
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = String(text);
    return node;
  }

  function row(name, value, max) {
    var wrap = element('div', 'country-row');
    var bar = element('div', 'stat-bar');
    var head = element('div', 'stat-bar__head');
    head.appendChild(element('code', '', name));
    head.appendChild(element('span', 'stat-bar__name', name));
    head.appendChild(element('b', '', value));
    bar.appendChild(head);
    var track = element('div', 'stat-bar__track');
    var fill = element('i');
    fill.style.width = Math.max(4, Math.round(value / Math.max(1, max) * 100)) + '%';
    track.appendChild(fill);
    bar.appendChild(track);
    wrap.appendChild(bar);
    return wrap;
  }

  function fillList(host, map, limit) {
    if (!host) return;
    host.textContent = '';
    var entries = [];
    if (map && typeof map === 'object' && !Array.isArray(map)) {
      Object.keys(map).forEach(function (k) {
        if (k === '__proto__' || k === 'constructor' || k === 'prototype') return;
        var value = num(map[k]);
        if (value) entries.push([k, value]);
      });
    }
    entries.sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0]); });
    if (!entries.length) {
      host.appendChild(element('p', 'admin-note', tr('spNoData', 'Hozircha ma\'lumot yo\'q.')));
      return;
    }
    var max = entries[0][1];
    entries.slice(0, limit).forEach(function (pair) { host.appendChild(row(pair[0], pair[1], max)); });
  }

  function renderPanel(panel, stats) {
    if (!panel || !stats) return;
    fillList(panel.querySelector('[data-sp="searches"]'), stats.searches, 10);
    fillList(panel.querySelector('[data-sp="devices"]'), stats.devices, 10);
    fillList(panel.querySelector('[data-sp="refHosts"]'), stats.refHosts, 10);
  }

  function buildPanel() {
    var panel = element('section', 'admin-panel stats-plus');
    panel.id = 'statsPlusPanel';
    var head = element('div', 'admin-panel__head');
    head.appendChild(element('h2', '', tr('spTitle', 'Anonim statistika')));
    head.appendChild(element('span', 'admin-note', tr('spNote', 'Faqat anonim ma\'lumotlar: so\'zlar, qurilma turi va manba hosti.')));
    panel.appendChild(head);
    [
      ['searches', 'spSearches', 'Qidiruvlar'],
      ['devices', 'spDevices', 'Qurilmalar'],
      ['refHosts', 'spSources', 'Manbalar']
    ].forEach(function (cfg) {
      var col = element('div', 'sp-col');
      col.appendChild(element('h3', '', tr(cfg[1], cfg[2])));
      var list = element('div', 'stat-bars');
      list.setAttribute('data-sp', cfg[0]);
      col.appendChild(list);
      panel.appendChild(col);
    });
    return panel;
  }

  function injectPanel() {
    var api = visits();
    if (!api || typeof api.getStats !== 'function') return;
    var host = document.querySelector('main') || document.body;
    if (!host) return;
    var anchor = document.querySelector('#statsDashboard, .admin-stats, .admin-dashboard, .dash-grid');
    var panel = buildPanel();
    if (anchor && anchor.parentNode && host.contains(anchor)) anchor.parentNode.insertBefore(panel, anchor.nextSibling);
    else host.insertBefore(panel, host.firstChild);
    var done = function (stats) { renderPanel(panel, stats && typeof stats === 'object' ? stats : null); };
    try {
      var result = api.getStats();
      if (result && typeof result.then === 'function') result.then(done, function () {});
      else done(result);
    } catch (e) {}
  }

  function init() {
    SEARCH_FIELDS.forEach(bindSearch);
    if (/\/admin\.html(?:$|[?#])/i.test(location.pathname)) injectPanel();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
