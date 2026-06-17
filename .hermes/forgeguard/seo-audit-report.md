# ForgeGuard SEO-audit – DevForge

| Metadata | Verdi |
|----------|-------|
| **Rapport** | ForgeGuard SEO Audit |
| **Timestamp** | 2026-06-17T13:32:58Z |
| **Commit** | `be7ae96` |
| **Deploy URL** | http://72.62.94.245/ |
| **Sider funnet** | 23 |
| **Sider sjekket** | 23 |
| **Sider bestått** | **1** (kun 404.html) |
| **Blocking issues** | **8** 🚫 |
| **Warnings** | **7** ⚠️ |

---

## Oppsummering

ForgeGuard har gjennomgått 23 sider live på VPS. **0 av 23 innholdssider består fullt ut.** Hovedårsaken er at alle canonical, og hreflang peker til Netlify (devforgelab.netlify.app) i stedet for VPS-produksjonen. Dette må løses før videre Codex-review.

---

## 🚫 Blocking Issues

### B1 — Canonical peker til Netlify (19 sider)
Hver eneste hovedside har `<link rel="canonical" href="https://devforgelab.netlify.app/...">`. Dette forteller Google at Netlify-URL-en er den autoritative versjonen, ikke VPS-en.

**Påvirket:** `/`, `/index-no.html`, `/services.html`, `/services-no.html`, `/portfolio.html`, `/about.html`, `/contact.html`, `/contact-no.html`, `/blog.html`, 4 bloggposter, `/privacy.html`, `/personvern.html`, `/terms.html`, `/vilkar.html`

### B2 — og:url peker til Netlify (12 sider)
Samme problem som canonical — alle Open Graph-URL-er bruker Netlify-domene.

### B3 — Hreflang peker til Netlify (14 sider)
Alle språk-alternater bruker `devforgelab.netlify.app`.

### B4 — Sitemap.xml bruker Netlify-URL-er
Alle 22 oppføringer i sitemap.xml lister `https://devforgelab.netlify.app/...`

### B5 — Robots.txt peker til Netlify-sitemap
`Sitemap: https://devforgelab.netlify.app/sitemap.xml`

### B6 — structured-data.js hardkoder Netlify BASE_URL
```js
const BASE_URL = 'https://devforgelab.netlify.app';
```
Dette påvirker Organization, WebSite, Service, BreadcrumbList og FAQ-schemas.

### B7 — Hreflang NO-sider returnerer 404 (3 sider)
Følgende sider er lenket i hreflang men finnes ikke:
- `/portfolio-no.html` → 404
- `/about-no.html` → 404
- `/blog-no.html` → 404

### B8 — Bloggposter mangler alle OG-tags (4 sider)
Ingen `og:title`, `og:description`, `og:url`, `og:image` eller `twitter:card` på noen bloggpost:
- `/blog/website-cost-norway-2026.html`
- `/blog/signs-need-new-website.html`
- `/blog/website-vs-social-media.html`
- `/blog/nettside-kostnad-norge-2026.html`

---

## ⚠️ Warnings

| # | Issue | Sider |
|---|-------|-------|
| W1 | Pet-portraits mangler canonical-tag | 4 |
| W2 | Pet-portraits bestill/galleri/faq/takk mangler OG-tags | 4 |
| W3 | takk.html mangler meta description | 1 |
| W4 | JSON-LD er JS-injisert (structured-data.js), ikke inline HTML | 19 |
| W5 | terms.html og vilkar.html mangler OG-tags | 2 |
| W6 | Pet-portraits og:image bruker relativ sti `/images/...` | 1 |
| W7 | HTML-innhold inneholder netlify.app-referanser (1-9 per side) | 22 |

---

## Side-for-side-resultater

| Side | HTTP | Canonical | OG | Hreflang | JSON-LD | Pass? |
|------|------|-----------|----|----------|---------|-------|
| `/` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/index-no.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/services.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/services-no.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/portfolio.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ 404-NO | ⚠️ JS | ❌ |
| `/about.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ 404-NO | ⚠️ JS | ❌ |
| `/contact.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/contact-no.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/blog.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ 404-NO | ⚠️ JS | ❌ |
| Bloggposter (4) | ✅ 200 | ❌ Netlify | ❌ Mangler | ❌ Mangler | ⚠️ JS | ❌ |
| `/privacy.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/personvern.html` | ✅ 200 | ❌ Netlify | ❌ Netlify | ❌ Netlify | ⚠️ JS | ❌ |
| `/terms.html` | ✅ 200 | ❌ Netlify | ❌ Mangler | ❌ Netlify | ⚠️ JS | ❌ |
| `/vilkar.html` | ✅ 200 | ❌ Netlify | ❌ Mangler | ❌ Netlify | ⚠️ JS | ❌ |
| `/404.html` | ✅ 200 | — | — | — | — | ✅ |
| `/pet-portraits/` | ✅ 200 | ❌ Mangler | ⚠️ Relativ | — | ❌ | ❌ |
| `/pet-portraits/bestill.html` | ✅ 200 | ❌ Mangler | ❌ Mangler | — | ❌ | ❌ |
| `/pet-portraits/galleri.html` | ✅ 200 | ❌ Mangler | ❌ Mangler | — | ❌ | ❌ |
| `/pet-portraits/faq.html` | ✅ 200 | ❌ Mangler | ❌ Mangler | — | ❌ | ❌ |
| `/pet-portraits/takk.html` | ✅ 200 | ❌ Mangler | ❌ Mangler | — | ❌ | ❌ |

---

## Kjente begrensninger

1. **Netlify credits er oppbrukt** — kan ikke deployere til devforgelab.netlify.app. VPS (72.62.94.245) er midlertidig produksjon til domene/Netlify er løst.
2. **JSON-LD er JS-injisert** — curl ser det ikke, men Google kan tolke det. Bør flyttes til inline HTML for sikkerhets skyld.
3. **Samme OG-bilde for alle sider** — og-image.png (1200×630) brukes overalt. Ikke kritisk, men svekker social sharing.

---

## Anbefalt rekkefølge

1. 🔴 Fiks at canonical, OG og hreflang peker til VPS fremfor Netlify (B1-B6)
2. 🔴 Opprett manglende NO-sider eller fjern hreflang-lenker (B7)
3. 🔴 Legg til OG-tags på bloggposter (B8)
4. 🟡 Legg til canonical + OG på pet-portraits (W1, W2)
5. 🟡 Flytt JSON-LD til inline HTML (W4)
