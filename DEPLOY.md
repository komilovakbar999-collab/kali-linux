# Deploy (GitHub Pages)

## 1. Reponi yaratish va fayllarni yuklash

1. GitHub da yangi repository yarating (masalan, `linux-lugat`).
2. Barcha fayllarni (`.github` papkasi bilan birga) push qiling:

```bash
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2. GitHub Pages ni yoqish

Repository → **Settings** → **Pages** → *Build and deployment* bo'limida:

- **Source:** `Deploy from a branch`
- **Branch:** `main` / `/(root)`

Saqlang. Sayt `` manzilida ochiladi (bir necha daqiqa kutish mumkin).

> `.nojekyll` fayli allaqachon bor — u Jekyll qayta ishlashini o'chiradi, o'zgartirish shart emas.

## 3. Sitemap va robots dagi manzilni almashtirish

`sitemap.xml` va `robots.txt` ichidagi **YOUR_GITHUB_USERNAME** va **REPO** ni o'zingiznikiga almashtiring:

```text
  →  https://sizning-username.github.io/sizning-repo/
```

Masalan, ` YOUR_GITHUB_USERNAME=alice`, `REPO=linux-lugat` bo'lsa:

- `sitemap.xml` da `https://alice.github.io/linux-lugat/`
- `robots.txt` da `Sitemap: https://alice.github.io/linux-lugat/sitemap.xml`

Bu qadam shart: placeholder bilan qoldirilsa, qidiruv tizimlari noto'g'ri URL larni oladi.

## 4. Tashrif hisoblagichi (ixtiyoriy)

`site.config.js` da `statsBucket` ni kvdb.io bucket ID bilan to'ldiring:

```js
statsBucket: 'YOUR_BUCKET_ID',
```

Bucket ID ni [kvdb.io](https://kvdb.io) da yaratib oling. Bo'sh qoldirilsa, hisoblagich o'chirilgan bo'ladi — sayt ishlavermaydi.

## 5. Admin paroli haqida

`admin.html` da `<meta name="robots" content="noindex, nofollow">` bor, shuning uchun u `sitemap.xml` ga kiritilmagan (lekin `robots.txt` da `Disallow` ham yo'q — ziddiyat bo'lmasligi uchun).

Bu **statik sayt**: barcha fayllar (jumladan `site.config.js` dagi `adminHash` SHA-256 qiymati) brauzerga yuklanadi va har kim ko'ra oladi. Shuning uchun:

- parol faqat kichik qulaylik (tasodifiy o'zgartirishlardan himoya) sifatida ishlaydi, haqiqiy xavfsizlik emas;
- maxfiy parol, token yoki API kalitini hech qaerga yozmang;
- admin panel orqali kiritilgan o'zgarishlar faqat shu brauzerning `localStorage` da saqlanadi, GitHub dagi fayllarni o'zgartirmaydi.

## 6. Lokal tekshirish

```bash
python3 -m http.server 4175
```

Keyin `http://localhost:4175/` ni oching. `file://` orqali ochish ba'zi funksiyalarni (xotira, fetch) ishlamay qoldiradi.

## 7. Avtomatik tekshiruv

`.github/workflows/check.yml` har `push` va `pull_request` da ishlaydi: JS sintaksisi, i18n (uz/ru/en) simmetriyasi, dataset butunligi, taqiqlangan satrlar va HTML dagi manifest havolasi tekshiriladi. Xato bo'lsa, CI fail bo'ladi va xato xabari logda ko'rinadi.

> `labs.js`, `synonyms.js` va `feedback.js` ham CI tekshiruviga kiritilgan. `i18n.js` dagi `uz/ru/en` kalitlari soni teng bo'lishi shart; aks holda CI xato xabari bilan to'xtaydi.

## 8. GitHub bilan kontent boshqaruvi (Decap CMS)

`cms.html` — mustaqil Decap CMS sahifasi, `config.yml` esa uning sozlamalari.

1. `config.yml` dagi `YOUR_GITHUB_USERNAME/YOUR_REPO` ni o'zingiznikiga almashtiring (`site_url` va `display_url` dagi manzil ham).
2. GitHub OAuth App yoki GitHub App yarating:
   - **Homepage URL:** ``
   - **Authorization callback URL:** `cms.html`
   
   GitHub App ishlatsangiz, uning `app_id` qiymatini `backend` bo'limiga qo'shing. Autentifikatsiya `auth_type: pkce` bilan amalga oshiriladi.
3. `cms.html` ni ochib **Login with GitHub** orqali kiring. Sayt sozlamalari, kategoriyalar va buyruqlar to'g'ridan-to'g'ri `content/*.json` da tahrirlanadi; har bir saqlash **pull request** yaratadi. PR ni merge qilgach, o'zgarish saytga chiqadi.
4. JSON tahrirlangach JS ma'lumotlarini qayta generatsiya qiling:

   ```bash
   node scripts/build-data.js
   ```

   Bu buyruq `content/*.json` dan `commands.js` (`window.CATEGORIES`, `window.LINUX_COMMANDS`) va `site.config.js` (`window.SITE_CONFIG`) ni yozadi, eski data kontrakti saqlanadi. Bu qadamni mahalliy ravishda yoki GitHub Actions da bajaring.
5. Eski `admin.html` paneli qoladi — u faqat shu brauzerning `localStorage` da tezkor mahalliy tahrir uchun ishlaydi va GitHub dagi fayllarni o'zgartirmaydi.

> **Statik sayt cheklovi:** GitHub Pages faqat tayyor fayllarni xizmat qiladi, serverda yozish imkoni yo'q. Shuning uchun haqiqiy kontent boshqaruvi faqat GitHub (PKCE + PR) orqali ishlaydi, generatsiyani esa qo'lda yoki CI da ishga tushurish kerak. Shuningdek, `site.config.js` dagi barcha qiymatlar (jumladan `adminHash`) brauzerga ko'rinadi — u yerga maxfiy token yozmang.
