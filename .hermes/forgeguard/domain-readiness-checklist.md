# Domain Activation Checklist — devforgelab.eu

## ✅ Fase 1: DNS & HTTPS — FULLFØRT
- [x] DNS A-record peker til VPS (72.62.94.245)
- [x] DNS propagated
- [x] SSL-sertifikat installert (Certbot/Let's Encrypt)
- [x] HTTP (port 80) redirecter til HTTPS (port 443)
- [x] `www.devforgelab.eu` redirecter (301) til `https://devforgelab.eu/`
- [x] Ingen mixed content warnings

## ✅ Fase 2: Migreringsscript — FULLFØRT i går
- [x] `js/config.js` — SITE_URL = `https://devforgelab.eu`
- [x] Alle HTML-filer — canonical, OG, hreflang oppdatert
- [x] `sitemap.xml` — alle lokasjoner
- [x] `robots.txt` — sitemap-peker

## ✅ Fase 3: Nginx-oppsett — FULLFØRT
- [x] `server_name devforgelab.eu www.devforgelab.eu`
- [x] SSL-sertifikat via Certbot
- [x] nginx test OK
- [x] HTTP → HTTPS redirect

## ✅ Fase 4: Deploy — FULLFØRT
- [x] Commit + push til GitHub
- [x] VPS deploy via git pull
- [x] `https://devforgelab.eu/` laster ✅

## ⏳ Fase 5: ForgeGuard — GJENSTÅR
- [ ] ForgeGuard SEO-audit på https://devforgelab.eu/
- [ ] 0 blocking issues
- [ ] Rapport generert

## ⏳ Fase 6: Cleanup — GJENSTÅR
- [x] Gamle Netlify-URL-er fjernet
- [ ] Netlify redirect (om mulig)
- [ ] Google Search Console oppdatert med nytt domene
- [ ] Google Workspace: MX-poster + custom email
