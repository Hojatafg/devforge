# Plan: Oppgrader hjemmeside-design

## Mål: Match referansebildene brukeren viste

### Endringer:

1. **Hero-seksjon** — helt ny toppseksjon
   - "Open for new projects" badge (grønn dot + tekst)
   - "We build **modern** websites that grow with **you**" med gradienttekst
   - Gradient: blå (#6366f1) → lilla (#a855f7)
   - Subtilt prikk-mønster/grid bakgrunn

2. **Navigasjon** — oppdatert
   - NO/EN toggle i header
   - Contact-knapp med gradient
   - Logo + Dev/Forge tekst

3. **CTA-knapper**
   - "Get in touch" — gradient bakgrunn
   - "See our services →" — outlined stil
   - "Check out DevForge Pet Portraits 🐾" — ny knapp

4. **Cookie-banner** — ny stil
   - "This site uses locally hosted fonts. No third-party cookies are used."
   - OK-knapp med gradient

5. **Behold** eksisterende:
   - Footer med Telegram, privacy links
   - Dark theme (navy/almost black)
   - Inter font

### Tekniske detaljer:
- Background: subtle dot grid via CSS radial-gradient
- Gradient text: CSS background-clip: text
- Resterende sider (services, portfolio, etc.) beholder nåværende design
