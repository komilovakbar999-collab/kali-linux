/* Anonim fikr/buyruq so'rovi. Ism, IP yoki shaxsiy identifikator yig'maydi. */
(function () {
  'use strict';

  var KEY = 'kali_requests';
  var API = 'https://kvdb.io/';
  var LIMIT = 50;

  function t(k) { return window.I18N ? window.I18N.t(k) : k; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function all() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(v) ? v.filter(function (x) { return x && typeof x.text === 'string'; }).slice(0, LIMIT) : [];
    } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, LIMIT))); } catch (e) {}
  }
  function bucket() {
    return (window.SITE_CONFIG && window.SITE_CONFIG.statsBucket) || '';
  }
  function pushRemote(item) {
    var b = bucket();
    if (!b || !window.fetch) return Promise.resolve(false);
    var current = [];
    return fetch(API + encodeURIComponent(b) + '/requests', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (data) { if (Array.isArray(data)) current = data; })
      .catch(function () {})
      .then(function () {
        current.push(item);
        return fetch(API + encodeURIComponent(b) + '/requests', {
          method: 'PUT',
          body: JSON.stringify(current.slice(-LIMIT))
        });
      })
      .then(function (r) { return !!(r && r.ok); })
      .catch(function () { return false; });
  }

  window.KaliFeedback = {
    key: KEY,
    all: all,
    save: save,
    clear: function () { save([]); },
    loadRemote: function () {
      var b = bucket();
      if (!b || !window.fetch) return Promise.resolve(all());
      return fetch(API + encodeURIComponent(b) + '/requests', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (data) {
          var remote = Array.isArray(data) ? data.filter(function (x) { return x && typeof x.text === 'string'; }) : [];
          var localAll = all().concat(remote);
          var seen = {}, unique = [];
          localAll.sort(function (a, b2) { return (b2.at || 0) - (a.at || 0); });
          localAll.forEach(function (x) {
            var key = String(x.at || '') + '|' + x.text;
            if (!seen[key]) { seen[key] = 1; unique.push(x); }
          });
          return unique.slice(0, LIMIT);
        })
        .catch(function () { return all(); });
    },
    send: function (message) {
      var text = String(message || '').trim().slice(0, 500);
      if (text.length < 5) return Promise.resolve(false);
      var item = { at: Date.now(), text: text };
      var list = all();
      list.unshift(item);
      save(list);
      return pushRemote(item);
    },
    escape: esc
  };

  function init() {
    var form = document.getElementById('feedbackForm');
    if (!form) return;
    var input = document.getElementById('feedbackText');
    var status = document.getElementById('feedbackStatus');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (text.length < 5) {
        status.textContent = t('feedbackFail');
        input.focus();
        return;
      }
      status.textContent = t('feedbackSend');
      window.KaliFeedback.send(text).then(function () {
        status.textContent = t('feedbackSent');
        input.value = '';
      }).catch(function () {
        status.textContent = t('feedbackSent');
        input.value = '';
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
