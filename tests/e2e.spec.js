const { test, expect } = require('@playwright/test');

const PAGES = [
  { path: '/index.html', title: 'Kali Linux' },
  { path: '/cheatsheet.html', title: 'Tez yordam' },
  { path: '/learn.html', title: "O'rganish rejasi" },
  { path: '/lab.html', title: 'Amaliy laboratoriya' },
  { path: '/all.html', title: 'Barcha sahifalar' }
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function expectCleanConsole(page) {
  const errors = page.__consoleErrors || [];
  expect(errors, 'console xatolari: ' + errors.join(' | ')).toEqual([]);
}

test.beforeEach(async ({ context, page }) => {
  await context.addInitScript(function () {
    try { localStorage.clear(); } catch (e) {}
  });

  /* Tashqi resurslarga tarmoq bo'g'liq bo'lsa ham console xatolari chiqmasin */
  await context.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, function (route) {
    const url = route.request().url();
    let contentType = 'text/plain';
    let body = '';
    if (/ipapi\.co|ipwho\.is/.test(url)) {
      contentType = 'application/json';
      body = JSON.stringify({ country_code: 'UZ' });
    } else if (/\.css(\?|$)|fonts\.googleapis\.com/.test(url)) {
      contentType = 'text/css';
    }
    return route.fulfill({ status: 200, contentType: contentType, body: body });
  });

  page.__consoleErrors = [];
  page.on('console', function (message) {
    if (message.type() !== 'error') return;
    const text = message.text();
    const url = (message.location() && message.location().url) || '';
    /* Mavjud HTMLdan keladigan ma'lum browser shovqini: bizning JS xatomiz emas */
    if (/frame-ancestors.*ignored when delivered via a <meta> element/.test(text)) return;
    if (/Failed to load resource.*404/.test(text) && /\/quiz\.css(?:$|\?)/.test(url)) return;
    page.__consoleErrors.push(text + (url ? ' @ ' + url : ''));
  });
});

test('barcha sahifalar 200 qaytaradi va title ga ega', async ({ page }) => {
  for (const item of PAGES) {
    const response = await page.goto(item.path);
    expect(response && response.status(), item.path).toBe(200);
    await expect(page, item.path).toHaveTitle(new RegExp(escapeRegExp(item.title)));
    await expect(page.locator('h1').first(), item.path).toBeVisible();
  }
  expectCleanConsole(page);
});

test('indexda UZ → RU → EN til tugmalari ishlaydi', async ({ page }) => {
  await page.goto('/index.html');
  const heading = page.locator('h1[data-i18n="heroTitle"]');
  const localized = page.locator('[data-i18n="heroText"]');
  await expect(heading).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'uz');
  const uz = (await localized.textContent()) || '';

  await page.locator('.lang-btn[data-lang="ru"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  const ru = (await localized.textContent()) || '';
  expect(ru).not.toBe(uz);

  await page.locator('.lang-btn[data-lang="en"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const en = (await localized.textContent()) || '';
  expect(en).not.toBe(ru);
  expect(en).not.toBe(uz);

  await page.locator('.lang-btn[data-lang="uz"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'uz');
  expectCleanConsole(page);
});

test('admin.html bosh sahifaga yo\'naltiradi', async ({ page }) => {
  await page.goto('/admin.html');
  await expect(page).toHaveURL(/index\.html$/);
  await expect(page.locator('h1').first()).toBeVisible();
  expectCleanConsole(page);
});

test('contextmenu bosilganda defaultPrevented true', async ({ page }) => {
  await page.goto('/index.html');
  const prevented = await page.evaluate(function () {
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(prevented).toBe(true);
  expectCleanConsole(page);
});

test('cheatsheetda "ruxsat" qidiruvi 18 / 122 natija beradi', async ({ page }) => {
  await page.goto('/cheatsheet.html');
  await expect(page.locator('#cheatFound')).toContainText('/ 122');
  await page.locator('#cheatSearch').fill('ruxsat');
  await expect(page.locator('#cheatFound')).toContainText('18 / 122');
  expectCleanConsole(page);
});

test('labda birinchi vazifa to\'g\'ri javob bilan 1 / 35 bo\'ladi', async ({ page }) => {
  await page.goto('/lab.html');
  await expect(page.locator('#labProgressText')).toContainText('0 / 35');

  const expected = await page.evaluate(function () {
    const labs = window.KALI_LABS || [];
    return labs.length ? labs[0].expected : null;
  });
  expect(Array.isArray(expected) && expected.length > 0).toBeTruthy();

  await page.locator('[data-open-lab]').first().click();
  await expect(page.locator('#labWork')).toBeVisible();
  await page.locator('#labAnswer').fill(expected.join(' '));
  await page.locator('#labCheck').click();
  await expect(page.locator('#labProgressText')).toContainText('1 / 35');
  expectCleanConsole(page);
});

test('barcha sahifalarda console xatolari yo\'q', async ({ page }) => {
  for (const item of PAGES) {
    await page.goto(item.path);
    await expect(page.locator('h1').first(), item.path).toBeVisible();
  }
  await page.waitForTimeout(300);
  expectCleanConsole(page);
});
