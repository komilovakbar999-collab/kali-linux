# Serverga joylash (ommaviy)

## Eng oson: Cloudflare Pages
1. Kodni GitHub repo’ga push qiling.
2. Cloudflare Pages’da repo’ni ulang.
3. Build command: bo‘sh, output directory: `.`.
4. Domen ulang (masalan `kali.example.uz`).
5. `site.config.js` dagi `siteUrl` ni real domen bilan to‘ldiring.
6. `sitemap.xml` va `robots.txt` dagi `https://YOUR_DOMAIN/` ni real domen bilan almashtiring.
7. Google Search Console’da domenni tasdiqlang va sitemap yuboring.

## GitHub Pages
1. `.github/workflows/deploy-pages.yml` bor.
2. GitHub repo Settings → Pages → Source: GitHub Actions.
3. `main` ga push qiling.
4. Domen sozlangach `siteUrl/sitemap/robots` ni yangilang.

## VPS + Docker + Nginx
```bash
docker build -t kali-linux-site .
docker run -d --restart unless-stopped -p 80:80 --name kali-linux-site kali-linux-site
```

Domen + HTTPS uchun Caddy yoki Nginx+Certbot qo‘shing.

## Google’da chiqishi uchun
- Real domen bo‘lishi shart.
- `siteUrl`, `sitemap.xml`, `robots.txt` real domen bo‘lsin.
- Google Search Console: property qo‘shing, `sitemap.xml` yuboring, URL Inspection → Request indexing.
- Telegram/IT jamoalarda sifatli havola tarqating (spam emas).
- Indekslash vaqt oladi (kunlar/haftalar), kafolat yo‘q.
