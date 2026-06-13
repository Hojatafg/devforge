# Revidert plan: Norsk språk + Telegram — 10/10 mål

## Endringer basert på subagent-feedback:

### 1. Telegram ❌ Ikke floating knapp
- ✅ Footer "Connect"-seksjon: Telegram-ikon + lenke
- ✅ Kontaktsiden: Telegramknapp ved siden av skjema
- Ingen floating fixed knapp

### 2. Norske sider (prioritert rekkefølge)
1. `index-no.html` — Hjemmeside på norsk med NOK-priser
2. `services-no.html` — Tjenester på norsk med NOK-priser (fra 15.000 kr)
3. `contact-no.html` — Kontakt på norsk med Telegram
4. `blog/nettside-kostnad-norge-2026.html` — Artikkel om priser på norsk

### 3. Språktoggle i navbar
- "NO" / "EN" som tekst (ikke flagg — tydeligere på mobil)
- localStorage lagrer valg
- Sjekker navigator.language ved første besøk → automatisk NO hvis norsk nettleser

### 4. hreflang tags i <head>
```html
<link rel="alternate" hreflang="en" href="https://devforgelab.netlify.app/index.html">
<link rel="alternate" hreflang="no" href="https://devforgelab.netlify.app/index-no.html">
<link rel="alternate" hreflang="x-default" href="https://devforgelab.netlify.app/index.html">
```

### 5. Footer Connect-seksjon
- Telegram: @hajo101378
- E-post: hojat10@icloud.com
- (LinkedIn/GitHub når kontoer opprettes)

### 6. NOK-priser på norske sider
- $1,500 → fra 15.000 kr
- $3,000 → fra 30.000 kr
- $5,000 → fra 50.000 kr

### 7. Oppdater sitemap.xml
- Legg til norske side-URLer
