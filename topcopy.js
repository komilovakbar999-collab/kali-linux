/* Nusxalash hisobi va TOP-10 paneli.
 * Faqat mahalliy, anonim hisob: IP, ism yoki boshqa shaxsiy ma'lumot yozilmaydi. */
(function () {
  'use strict';

  if (window.__kaliTopCopyReady) return;
  window.__kaliTopCopyReady = true;

  var STORE_KEY = 'kali_copy_counts';
  var MAX_KEYS = 100;
  var TOP = 10;

  var LOCAL = {
    uz: {
      title: "Eng ko'p nusxalangan buyruqlar",
      empty: 'Hali nusxalash yo\'q — buyruqlarni nusxalashni boshlang',
      badge: 'TOP 10'
    },
    ru: {
      title: 'Чаще всего копируемые команды',
      empty: 'Пока нет копирований — начните копировать команды',
      badge: 'ТОП 10'
    },
    en: {
      title: 'Most copied commands',
      empty: 'No copies yet — start copying commands',
      badge: 'TOP 10'
    }
  };
  var I18N_KEYS = { title: 'topCopyTitle', empty: 'topCopyEmpty', badge: 'topCopyBadge' };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function lang() {
    var code = '';
    try {
      if (window.I18N && typeof window.I18N.getLang === 'function') code = window.I18N.getLang();
    } catch (e) {}
    code = String(code || (document.documentElement && document.documentElement.lang) || 'uz').toLowerCase().slice(0, 2);
    return LOCAL[code] ? code : 'uz';
  }

  /* I18N.t mavjud bo'lsa undan foydalanamiz; bizning kalitlar lug'atda yo'q bo'lsa,
     o'z UZ/RU/EN lug'atiga qaytamiz (I18N.t noma'lum kalitni UZ qaytaradi). */
  function word(name) {
    var code = lang();
    try {
      if (window.I18N && typeof window.I18N.t === 'function' && window.I18N.dict &&
          window.I18N.dict[code] && Object.prototype.hasOwnProperty.call(window.I18N.dict[code], I18N_KEYS[name])) {
        return window.I18N.t(I18N_KEYS[name]);
      }
    } catch (e) {}
    return LOCAL[code][name];
  }

  function readCounts() {
    var out = {};
    try {
      var raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
      Object.keys(raw).forEach(function (key) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
        var value = Math.floor(Number(raw[key]));
        if (isFinite(value) && value > 0) out[key] = value;
      });
    } catch (e) {}
    return out;
  }

  function writeCounts(map) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(map)); } catch (e) {}
  }

  /* Anonim umumiy hisob: mavjud bo'lsa KaliVisits orqali yozishga harakat qilamiz. */
  function recordGlobal(key) {
    var api = window.KaliVisits;
    if (!api || typeof api.recordExtra !== 'function') return;
    try {
      var delta = { searches: {} };
      delta.searches['copy:' + key] = 1;
      var result = api.recordExtra(delta);
      if (result && typeof result.catch === 'function') result.catch(function () {});
    } catch (e) {}
  }

  function onClick(event) {
    var target = event && event.target;
    if (target && target.nodeType === 3) target = target.parentNode;
    if (!target || typeof target.closest !== 'function') return;
    var button = target.closest('[data-copy]');
    if (!button) return;

    var key = String(button.getAttribute('data-copy') == null ? '' : button.getAttribute('data-copy')).slice(0, 160).trim();
    if (!key) return;

    try {
      var map = readCounts();
      map[key] = (map[key] || 0) + 1;
      var keys = Object.keys(map);
      if (keys.length > MAX_KEYS) {
        keys.sort(function (a, b) { return map[a] - map[b] || a.localeCompare(b); });
        keys.slice(0, keys.length - MAX_KEYS).forEach(function (old) { delete map[old]; });
      }
      writeCounts(map);
    } catch (e) {}

    recordGlobal(key);
    render();
  }

  function render() {
    var panel = document.getElementById('topCopyPanel');
    if (!panel) return;

    var map = readCounts();
    var entries = Object.keys(map).map(function (key) { return [key, map[key]]; });
    entries.sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0]); });
    var top = entries.slice(0, TOP);
    var max = top.length ? top[0][1] : 1;

    var html = '<div class="topcopy-panel__head">' +
        '<h2 class="topcopy-panel__title" id="topCopyTitle">' + esc(word('title')) + '</h2>' +
        '<span class="topcopy-panel__badge">' + esc(word('badge')) + '</span>' +
      '</div>';

    if (!top.length) {
      html += '<p class="topcopy-empty">' + esc(word('empty')) + '</p>';
    } else {
      html += '<ol class="topcopy-list">';
      top.forEach(function (pair, index) {
        var width = Math.max(4, Math.round(pair[1] / Math.max(1, max) * 100));
        html += '<li class="topcopy-row">' +
            '<span class="topcopy-row__rank">' + ('0' + (index + 1)).slice(-2) + '</span>' +
            '<div class="topcopy-row__body">' +
              '<div class="topcopy-row__meta">' +
                '<code class="topcopy-row__cmd">' + esc(pair[0]) + '</code>' +
                '<b class="topcopy-row__count">' + pair[1] + '</b>' +
              '</div>' +
              '<span class="topcopy-row__track" aria-hidden="true">' +
                '<i class="topcopy-row__bar" style="width:' + width + '%"></i>' +
              '</span>' +
            '</div>' +
          '</li>';
      });
      html += '</ol>';
    }

    try { panel.innerHTML = html; } catch (e) {}
  }

  function isIndexPage() {
    var name = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return !name || name === 'index.html' || !!document.getElementById('cmdList');
  }

  function isAdminPage() {
    var name = (location.pathname.split('/').pop() || '').toLowerCase();
    return name === 'admin.html' || !!document.querySelector('.admin-dashboard, #statsDashboard');
  }

  function makePanel() {
    var panel = document.createElement('section');
    panel.className = 'topcopy-panel';
    panel.id = 'topCopyPanel';
    panel.setAttribute('aria-labelledby', 'topCopyTitle');
    return panel;
  }

  function injectPanel() {
    if (document.getElementById('topCopyPanel')) { render(); return; }
    if (!isIndexPage() && !isAdminPage()) return;

    var main = document.querySelector('main') || document.body;
    if (!main) return;

    var panel = makePanel();
    if (isIndexPage()) {
      var list = document.getElementById('cmdList');
      if (list && list.parentNode) list.parentNode.insertBefore(panel, list);
      else main.appendChild(panel);
    } else {
      var dash = document.querySelector('.admin-dashboard') || document.getElementById('statsDashboard');
      if (dash) dash.appendChild(panel);
      else main.insertBefore(panel, main.firstChild);
    }
    render();
  }

  function init() {
    try {
      document.addEventListener('click', onClick, false);
      window.addEventListener('storage', function (event) {
        if (!event || event.key === STORE_KEY || event.key === 'kali_lang' || event.key === null) render();
      }, false);
      document.addEventListener('langchange', function () { render(); }, false);
      injectPanel();
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
