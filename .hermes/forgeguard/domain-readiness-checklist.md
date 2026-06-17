# Domain Activation Checklist — devforgelab.eu

Når domenet blir aktivt (pending → active hos Domeneshop), kjør følgende i rekkefølge:

## Fase 1: DNS & HTTPS
- [ ] DNS A-record peker til VPS (72.62.94.245)
- [ ] DNS propagated (sjekk med `dig devforgelab.eu` + `dig www.devforgelab.eu`)
- [ ] SSL-sertifikat installert (Certbot/Let's Encrypt på VPS)
- [ ] HTTP (port 80) redirecter til HTTPS (port 443)
- [ ] `www.devforgelab.eu` redirecter (301) til `https://devforgelab.eu/`
- [ ] Ingen mixed content warnings (alle ressurser over HTTPS)

## Fase 2: Kjør migreringsscript
```bash
cd ~/webdev-site && python migrate-domain.py
```
Scriptet oppdaterer automatisk:
- `js/config.js` — SITE_URL
- Alle HTML-filer — canonical, OG, hreflang, bildereferanser
- `sitemap.xml` — alle lokasjoner
- `pet-portraits/sitemap.xml`
- `robots.txt` — sitemap-peker

## Fase 3: Nginx-oppsett
- [ ] `server_name devforgelab.eu www.devforgelab.eu;` i nginx-config
- [ ] SSL-sertifikat (Certbot: `certbot --nginx -d devforgelab.eu -d www.devforgelab.eu`)
- [ ] nginx test OK (`nginx -t`)
- [ ] nginx reload

## Fase 4: Deploy
- [ ] Commit + push til GitHub
- [ ] Kjør deploy-script på VPS: `/usr/local/bin/deploy-devforgelab`
- [ ] Verifiser at https://devforgelab.eu/ laster

## Fase 5: ForgeGuard
- [ ] ForgeGuard SEO-audit kjører på https://devforgelab.eu/
- [ ] 0 blocking issues
- [ ] 0 warnings (eller dokumenterte unntak)
- [ ] Rapport generert og godkjent

## Fase 6: Cleanup
- [ ] Gamle Netlify-URL-er fjernet fra all HTML/CSS/JS
- [ ] Netlify-site oppdatert (om mulig) eller redirect satt opp
- [ ] Google Search Console oppdatert med nytt domene
- [ ] Eventuelle eksterne referanser oppdatert

## Migreringsverktøy
- **Sentral config:** `js/config.js` — endre `SITE_URL` her
- **Migreringsscript:** `migrate-domain.py` — kjør for å oppdatere alle filer automatisk
- **ForgeGuard:** Ligger i `.hermes/forgeguard/` — rapporter + results
