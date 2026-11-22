# Kali Linux — buyruqlar va vositalar

Kali rasmiy sayti uslubida yasalgan uch tilli (o'zbek / rus / ingliz) qo'llanma: qora fon, qizil aksent, katta banner, Kali vositalari kartalari, to'liq buyruq ma'lumotnomasi, amaliy laboratoriya va o'rnatiladigan offline ilova.

## Sahifalar

| Fayl | Vazifasi |
| --- | --- |
| `index.html` | Asosiy sahifa: banner, bosiladigan statistika, **kun buyrug'i**, asosiy buyruqlar, Kali arsenal, qidiruv + tartiblash + saqlanganlar filtri, **misollar brauzeri**, jonli terminal, interaktiv mini-test, o'rganish rejasi, Telegram CTA |
| `cheatsheet.html` | Tez yordam: qidiruv, kategoriya filtri + tez tugmalar, tartiblash, saqlanganlar filtri, nusxalash ( tavsif bilan ), TXT eksport, guruhlarni yig'ish, chop etish / PDF |
| `learn.html` | 8 bosqichli reja: chuqur havola (`#stage=N`), bosqich ichida qidiruv, holat filtrlari, yig'ish, eslatmalar, jarayon eksporti/importi, chop etish |
| `lab.html` | 20 ta amaliy lab: vaziyat, bosqichlar, maslahat, yechim, tushuntirish, xavfsizlik eslatmasi, ball va saqlanadigan jarayon |
| `flashcards.html` | 81 buyruq uchun kartalar: SM-2 takrorlash, kategoriya/holat filtri, qidiruv va progress |
| `all.html` | **Barcha sahifalar bitta linkda**: 7 ta karta (asosiy, tez yordam, reja, lab, kartalar, CMS, admin) |
| `cms.html` | Decap CMS: GitHub bilan haqiqiy kirish va kontentni to'g'ridan-to'g'ri repo'da tahrirlash |
| `admin.html` | Parolli boshqaruv: dashboard, **tashriflar bo'limi va grafiklari**, qidiruvlar/qurilmalar/manbalar, foydalanuvchi so'rovlari, faoliyat jurnali, qidiruv + kategoriya/saralash, sahifalash, ko'p tanlab o'chirish, bekor qilish (undo), to'liq zaxira/tiklash, JSON nusxalash |
| `visits.js` | Tashrif hisoblagichi: umumiy son, bugun, mamlakat, sahifalar, qidiruvlar, qurilma turi, manba hosti, admin kirishlari |
| `stats-plus.js` | Qidiruvlarni anonim yig'ish va admin paneliga qo'shimcha ko'rsatkichlar |
| `feedback.js` | Anonim fikr/buyruq so'rovlari: ism va IP yozilmaydi |
| `synonyms.js` | Aqlli qidiruv uchun 81 buyruq sinonimi va 89 so'z guruhi |
| `labs.js` / `lab.js` | Amaliy lab ma'lumotlari va logikasi |
| `commands.js` | 81 buyruq ma'lumotlari (asosiy fayl) |
| `site.config.js` | Sayt nomi, Telegram havolasi va `statsBucket` |
| `i18n.js` | Uch tilli matnlar (UZ / RU / EN) |
| `common.js` | Menyu, til tugmalari, aqlli qidiruv, PWA, accessibility va shaxsiy ma'lumot import/eksporti |
| `sw.js` / `manifest.webmanifest` | Offline kesh va «Install app» imkoni |
| `protect.js` | O'ng tugma kontekst menyusini o'chirish |
| `seo.js` / `fonts.css` / `fonts/` | JSON-LD, canonical, hreflang va self-host fontlar |
| `ux.js` / `extras.css` | `?` yordam dialogi, terminal Tab-takliflari, so'nggi ko'rilganlar, chop etish/QR |
| `quiz-plus.js` / `leaderboard.js` / `flashcards.js` | Vaqtli test, anonim natijalar jadvali, kartalar |
| `config.yml` / `content/*.json` / `scripts/build-data.js` | GitHub CMS manbalari va JSON → JS generatsiyasi |
| `tests/e2e.spec.js` / `.github/workflows/check.yml` | Playwright E2E va Lighthouse CI |
| `styles.css` | Kali uslubidagi dizayn (qora / qizil), light/contrast rejimlari, print stillari |
| `visuals.js` / `visuals.css` | Jonli terminal, raqamlarning sanalishi, soat va aylanadigan maslahatlar |
| `gamify.js` / `gamify.css` | Konfetti, progress halqalari, yutuq nishonlari, faollik xaritasi |
| `dock.js` / `dock.css` | Suzuvchi tezkor panel, 3D karta egilishi, kunlar karuseli, sintaksis ranglari |
| `builder.js` / `builder.css` | Buyruq quruvchisi, xavfsizlik belgisi, o'xshash buyruqlar |
| `goals.js` / `goals.css` | Kunlik maqsad, streak, scroll progress, offline indikatori |
| `fun.js` / `fun.css` | Tasodifiy buyruq ruletkasi, mini o'yin, natijani PNG qilib ulashish |
| `topcopy.js` / `topcopy.css` | Eng ko'p nusxalangan buyruqlar TOP-10 (anonim) |

## Imkoniyatlar

- 81 ta buyruq, 14 ta Kali Linux vositasi, 134 ta misol, 20 ta amaliy lab
- Uch til: UZ / RU / EN (bir bosishda almashinadi)
- Qidiruv va 15 kategoriya bo'yicha filtr + nomi/kategoriyasi bo'yicha **tartiblash** va **faqat saqlanganlar** rejimi
- **Statistika katakchalari bosiladi**: buyruqlar ro'yxati, Kali arsenal, misollar brauzeri yoki til almashinuvi
- **Kun buyrug'i** kartasi: har kuni yangi buyruq, ochish va nusxalash tugmalari
- **Misollar brauzeri**: 134 ta misol, qidiruv + kategoriya, natijalarni nusxalash
- Kartalarning butun yuzasi bosiladi (faqat "Batafsil" tugmasi emas)
- Menyu bo'ylab **scroll-spy** (faol bo'lim avtomatik belgilanadi) va **yuqoriga qaytish** tugmasi
- `?q=nmap#commands` kabi qidiruv bilan keladigan havolalar
- **Tez yordam**: qidiruv (`/`), kategoriya tugmalari, natija soni, tartiblash, saqlanganlar filtri, qatorga yoki butun natijaga yulduzcha qo'yish, tavsif bilan nusxalash, TXT eksport, guruhlarni yig'ish
- **O'rganish rejasi**: har bosqichga `learn.html#stage=N`, bosqich ichida qidiruv va ajratib ko'rsatish, «bajarilgan/qolgan» filtrlari, bosqichlarni yig'ish, saqlanadigan eslatmalar (`kali_notes`), jarayonni JSON eksport qilish va rejani chop etish
- Buyruq tafsiloti oynasi: sintaksis, parametrlar, misollar, xavfsizlik eslatmasi
- Sintaksis bo'yicha ranglangan kod
- Interaktiv mini-test: 5 savol, darhol natija, eng yaxshi natija (`kali_quiz_best`) va noto'g'ri buyruqni ochish
- **Jonli Kali terminali**: `help`, `ls`, `cd`, `history`, `neofetch`, `nmap` va 81 ta buyruq bo'yicha ma'lumot; `↑/↓` tarix, `Tab` to'ldirish, `Ctrl+L` tozalash. Faqat simulyatsiya — haqiqiy tizim buyrug'i bajarilmaydi
- **Tezkor qidiruv palitrasi**: `Ctrl+K` / `⌘K` yoki qidiruv maydonidagi `Ctrl K`, `↑↓` + `Enter` bilan buyruq ochish
- **Saqlanganlar paneli**: headerdagi ☆ tugmasi, bir bosishda ochish/nusxalash/olib tashlash
- `#cmd=ls` kabi **chuqur havolalar** — buyruq oynasini to'g'ridan-to'g'ri ochadi va `🔗` bilan nusxalanadi
- Bir bosishda nusxalash, saqlanganlar (favorites)
- `/` tugmasi bilan qidiruvga o'tish
- **Parolli admin panel** (SHA-256 hash, sessiya bilan kirish, 5 xato urinishdan keyin 30 s qulflash, egalik haqida ogohlantirish)
- **Tashriflar statistikasi**: jami/bugun, **mamlakatlar (bayroq + nom)**, sahifalar, admin kirishlari, oxirgi 7 kun grafigi. Barcha tashrifchilar uchun umumiy hisoblagich (`kvdb.io`), sozlashsiz esa faqat shu brauzer
- Telegram kanaliga ulangan CTA va footer havolalari
- **Aqlli qidiruv**: sinonimlar, UZ/RU/EN so'zlar va kichik yozilish xatolariga chidamli (`por scan`, `ruxsat`, `права`)
- **Amaliy laboratoriya**: 20 ta xavfsiz vazifa, maslahat, yechim, ball, tushuntirish va saqlanadigan jarayon
- **Kun buyruqlari arxivi**: oxirgi 30 kun ichidagi tanlangan buyruqlar
- **PWA / offline**: service worker, manifest va ilovani o'rnatish tugmasi
- **Accessibility paneli**: light/dark mavzu, yuqori kontrast, shrift o'lchami (90–130%)
- **Shaxsiy ma'lumot import/eksporti**: saqlanganlar, jarayon, eslatmalar va lab natijalari
- **Anonim fikr formasi** va admin panelida so'rovlar ro'yxati
- **Admin grafiklari**: kunlik dinamika, sahifalar bo'yicha barlar, admin ok/fail nisbati, so'rovlar charti
- **SEO**: `sitemap.xml` (hreflang bilan), `robots.txt`, JSON-LD, canonical, OpenGraph image, self-host fontlar, CSP
- **Yordam va qulaylik**: `?` tugmasi bilan barcha kalitlar ro'yxati, terminalda `Tab` bilan buyruq taklifi, so'nggi ko'rilganlar, chop etish/QR
- **Vaqtli test va kartalar**: 30/60 soniyalik rejim, kategoriya bo'yicha test, anonim natijalar jadvali, 81 buyruq uchun flashcard
- **Haqiqiy admin**: Decap CMS + GitHub OAuth — tahrirlar PR orqali repo'ga yoziladi (`cms.html`)
- **Buyruq quruvchisi**: bayroqlarni tanlab tayyor buyruq yaratish va nusxalash
- **Kunlik maqsad va streak**: buyruqlar / lab / test bo'yicha 3 ta halqa, ketma-ket kunlar zanjiri
- **Qo'shimcha**: xavfsizlik darajasi belgisi, o'xshash buyruqlar, ruletka, mini o'yin, natijani rasm qilib yuklash, TOP-10 nusxalash, scroll progress va offline indikatori
- **GitHub Actions**: JS sintaksisi, i18n simmetriyasi, dataset, Playwright E2E (7 test) va Lighthouse CI (5 sahifa)

## Mahalliy ishga tushirish

```bash
cd linux-lugat
python3 -m http.server 4175
```

Keyin `http://127.0.0.1:4175/all.html` manzilini oching — barcha sahifalar bitta linkda.

## GitHub Pages ga yuklash

1. GitHub da repository yarating (masalan `kali-lugat`).
2. Papkadagi barcha fayllarni yuklang:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/kali-lugat.git
git push -u origin main
```

3. **Settings → Pages → Source: Deploy from a branch → main / root** ni tanlang. `.nojekyll` fayli qo'shilgan.
4. Sayt manzili: `https://<YOUR_GITHUB_USERNAME>.github.io/kali-lugat/`.
5. `sitemap.xml`, `robots.txt` va OG meta teglaridagi `YOUR_GITHUB_USERNAME` / `REPO` ni o'zingiznikiga almashtiring.

`.github/workflows/check.yml` esa har push/pull request da avtomatik tekshiruv o'tkazadi; u deploy qilmaydi.

## Admin panel

**Admin panel faqat sizniki.** Oddiy sayt havolalarida «Boshqaruv» yo'q — tashrifchilar hech qanday admin havolasini ko'rmaydi. Agar birov `admin.html` ni to'g'ridan-to'g'ri ochsa, «404 — sahifa topilmadi» degan oddiy xabar chiqadi, kirish oynasi umuman ko'rinmaydi.

Siz kirish uchun ikki usuldan birini ishlating:

- istalgan sahifada **Ctrl+Shift+A** (Mac: **⌘+Shift+A**) bosing — panel maxfiy havola bilan ochiladi;
- yoki manzil satriga `admin.html#kali-owner` yozing.

Keyin parol so'raladi. `site.config.js` dagi `adminHash` — SHA-256 hash. Birinchi kirishda panel sizni **parolni o'zgartirishga** undaydi (sariq ogohlantirish ko'rinadi). **Sayt sozlamalari → Yangi parol** bilan o'zingiznikini qo'ying — hash ko'rsatiladi va uni `site.config.js` ga ko'chirib qo'ysangiz, barcha brauzerlarda kuchga ega bo'ladi. Ketma-ket 5 marta xato parol kiritilsa, kirish 30 soniyaga qulflanadi. **Chiqish** sessiyani tozalaydi.

Panel ichida buyruq qo'shing / tahrirlang / o'chiring. Parametr va misollarni `flag | o'zbekcha | ruscha` formatida yozing (har qator bitta). **Boshqaruv paneli** buyruqlar/kategoriyalar/misollar/o'zgartirishlar sonini ko'rsatadi; **Faoliyat jurnali** har bir o'zgarishni vaqt bilan yozib boradi. Ro'yxat kategoriya bo'yicha filtrlanadi, nomi/kategoriyasi bo'yicha tartiblanadi va 20 tadan sahifalarga bo'linadi. Katakchalarni belgilab bir nechta buyruqni bir vaqtda o'chirish, **Oxirgi o'zgarishni bekor qilish** (`kali_admin_undo`) va **To'liq zaxira yuklab olish / Zaxiradan tiklash** orqali butun holatni (buyruqlar + sozlamalar + jarayon + eslatmalar + saqlanganlar) saqlash/tiklash mumkin.

O'zgarishlar brauzerda `localStorage` ga saqlanadi. Saytga doimiy o'zgartirish kiritish uchun **「commands.js yuklab olish」** tugmasi bilan faylni olib, repository dagi `commands.js` o'rniga yuklang.

Telegram havolasini `site.config.js` ichida yoki admin panelning **Sayt sozlamalari** bo'limida almashtiring.

## Tashriflar va mamlakatlar

Admin panelidagi **Tashriflar** bo'limida jami tashrif, bugungi tashrif, mamlakatlar soni, admin kirishlari, mamlakatlar bo'yicha sonlar (bayroq + nom), sahifalar kesimi va oxirgi 7 kun grafigi ko'rsatiladi. «Sizning mamlakatingiz» kartasi tashrifchining mamlakatini `ipapi.co` / `ipwho.is` orqali aniqlaydi va 7 kun davomida brauzerda saqlaydi.

Boshqa odamlarning ham tashriflari hisoblanishi uchun:

1. Admin panel → **Tashriflar** → emailingizni yozing → **Hisoblagich yaratish**.
2. Chiqqan `statsBucket: '...'` satrini nusxalab, `site.config.js` ichidagi `statsBucket: ''` o'rniga qo'ying.
3. `site.config.js` ni GitHub repositoryga yuklang — endi barcha tashrifchilar umumiy hisoblagichga yoziladi.

Hisoblagich bepul `kvdb.io` xizmatida; akkaunt, karta yoki server kerak emas. Faqat **yig'indi sonlar** saqlanadi — IP manzil, ism yoki shaxsiy ma'lumot yozilmaydi. Bucket identifikatori ochiq bo'lgani uchun bu himoyalangan analitika emas; raqamni qasddan o'zgartirish mumkin. Sozlanmagan holatda panel «Faqat shu brauzer» rejimida ishlaydi.

> Eslatma: bu statik sayt. Parol brauzer/hash orqali kirishni cheklaydi, lekin server tomonidagi autentifikatsiya emas. Kontentni doimiy o'zgartirish huquqi GitHub repository egasida. `crypto.subtle` ishlamagan http://LAN manzillarida ham SHA-256 hisoblash uchun ichki zaxira realizatsiya mavjud.

## Xavfsizlik eslatmasi

Kali Linux vositalari faqat o'zingizga tegishli yoki yozma ruxsat olingan tizimlarda ishlatilishi kerak.
