# Revidert plan: Profesjonalitet — 10/10 mål

## Endringer basert på subagent-feedback:

### 🔴 Kritisk #1: Google Fonts — self-host (ikke tredjepart)
- Last ned Inter-fonten og legg i `fonts/` katalogen
- Ingen request til Google = ingen cookie-consent nødvendig
- Fjern preconnect/preload til fonts.googleapis.com

### 🔴 Kritisk #2: Kontaktskjema — samtykke
- Legg til checkbox i alle kontaktskjema (EN + NO):
  "I agree to the processing of my data as described in the [Privacy Policy]"
- Lenke til privacy.html / personvern.html

### 🔴 Høy #3: Norske juridiske sider
- privacy.html (EN)
- personvern.html (NO)
- terms.html (EN)
- vilkar.html (NO)

### 🔴 Høy #4: Cookie-banner
- Vises nederst på siden
- Knapper: "Godta" / "Avvis"
- Lagrer valg i localStorage
- Ingen cookie wall — siden fungerer uten samtykke
- Mulighet for å trekke samtykke (lenke i footer)

### 🟡 Medium #5: Privacy Policy detaljer
- Dataoppbevaringstid
- Netlify som databehandler
- Rettigheter (innsyn, retting, sletting)
- Kontaktinfo
- Internasjonale dataoverføringer

### 🟡 Medium #6: Footer på ALLE sider
- EN footer: Privacy + Terms
- NO footer: Personvern + Vilkår
- Inkludert på: index, services, about, contact, portfolio, blog (EN) + index-no, services-no, contact-no (NO)
