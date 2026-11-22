/* content/*.json -> commands.js va site.config.js.
 * Decap CMS (cms.html) yoki qo'lda JSON tahrirlagandan keyin: node scripts/build-data.js
 * Eski data kontrakti saqlanadi: window.CATEGORIES, window.LINUX_COMMANDS, window.SITE_CONFIG.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const commandsFile = path.join(root, 'commands.js');
const configFile = path.join(root, 'site.config.js');

function readJson(name) {
  const file = path.join(contentDir, name);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error('Xato: ' + file + ': ' + err.message);
    process.exit(1);
  }
}

function list(value, label) {
  if (!Array.isArray(value)) {
    console.error('Xato: content faylidagi "' + label + '" massiv bo\'lishi shart.');
    process.exit(1);
  }
  return value;
}

function text(value) {
  return typeof value === 'string' ? value : (value == null ? '' : String(value));
}

/* UZ/RU/EN uchligi: CMS ba'zan obyekt ichiga bo'sh satrlar yozadi. */
function tr(value) {
  const src = value && typeof value === 'object' ? value : {};
  return { uz: text(src.uz), ru: text(src.ru), en: text(src.en) };
}

function hasText(triple) {
  return !!(triple.uz.trim() || triple.ru.trim() || triple.en.trim());
}

/* CMS list widgeti `fields` bilan ishlaydi: [ { tag: 'ls' }, ... ].
 * Eski kontrakt esa satrlar massivini kutadi — ikkalasini ham qabul qilamiz.
 * Satrlar o'zgarishsiz saqlanadi (ba'zi teglarda boshlang'ich bo'shliq bor). */
function tags(value) {
  return list(value, 'tags').map(function (item) {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object') {
      if (typeof item.tag === 'string') return item.tag;
      return Object.keys(item).map(function (k) { return item[k]; })
        .find(function (v) { return typeof v === 'string'; }) || '';
    }
    return '';
  }).filter(Boolean);
}

function options(value) {
  return list(value, 'options').map(function (o) {
    const row = tr(o);
    return { flag: text(o && o.flag), uz: row.uz, ru: row.ru, en: row.en };
  });
}

function examples(value) {
  return list(value, 'examples').map(function (e) {
    const row = tr(e);
    return { cmd: text(e && e.cmd), uz: row.uz, ru: row.ru, en: row.en };
  });
}

function command(c) {
  const out = {
    id: text(c.id),
    name: text(c.name),
    syntax: text(c.syntax),
    category: text(c.category),
    tags: tags(c.tags || []),
    desc: tr(c.desc),
    options: options(c.options || []),
    examples: examples(c.examples || [])
  };
  const notice = tr(c.notice);
  if (hasText(notice)) out.notice = notice;
  return out;
}

/* Admin paneli va boshqa fayllar ishlatadigan qo'shimcha kalitlarni (adminHash,
 * description, channel, ...) yo'qotmaslik uchun mavjud site.config.js o'qiladi. */
function existingConfig() {
  if (!fs.existsSync(configFile)) return {};
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(configFile, 'utf8'), sandbox, { filename: 'site.config.js' });
    return sandbox.window.SITE_CONFIG || {};
  } catch (err) {
    console.error('Xato: ' + configFile + ': ' + err.message);
    process.exit(1);
  }
}

function assignment(name, value) {
  return 'window.' + name + ' = ' + JSON.stringify(value, null, 2) + ';\n';
}

const categoriesData = readJson('categories.json');
const commandsData = readJson('commands.json');
const siteData = readJson('site.json');

const categories = list(categoriesData.categories, 'categories').map(function (c) {
  return {
    id: text(c.id),
    uz: text(c.uz),
    ru: text(c.ru),
    en: text(c.en),
    icon: text(c.icon)
  };
});
const allCommands = list(commandsData.commands, 'commands').map(command);

const site = Object.assign({}, existingConfig(), {
  siteName: text(siteData.siteName) || 'Kali Linux',
  telegram: text(siteData.telegram),
  statsBucket: text(siteData.statsBucket),
  defaultLang: text(siteData.defaultLang) || 'uz',
  siteUrl: text(siteData.siteUrl),
  /* common.js `data-brand` uchun aynan `brand` ni ishlatadi. */
  brand: text(siteData.siteName) || text(siteData.brand) || 'Kali Linux'
});

const commandsOut =
  "/* LinuxLugat ma'lumotlari — content/*.json dan generatsiya qilingan.\n" +
  ' * Tahrir: cms.html (Decap CMS) yoki content/*.json, keyin node scripts/build-data.js\n' +
  ' */\n\n' +
  assignment('CATEGORIES', categories) + '\n' +
  assignment('LINUX_COMMANDS', allCommands);

const configOut =
  "/* Sayt sozlamalari — content/site.json dan generatsiya qilingan.\n" +
  ' * Tahrir: cms.html (Decap CMS) yoki content/site.json, keyin node scripts/build-data.js\n' +
  ' */\n\n' +
  assignment('SITE_CONFIG', site);

fs.writeFileSync(commandsFile, commandsOut, 'utf8');
fs.writeFileSync(configFile, configOut, 'utf8');

console.log('OK: ' + categories.length + ' kategoriya, ' + allCommands.length + ' buyruq -> commands.js');
console.log('OK: site.config.js (SITE_CONFIG) yangilandi');
