const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ── Icon rendering ──
const { FaLaptopCode, FaShoppingCart, FaCogs, FaSearch, FaPalette, FaSyncAlt, FaArrowRight, FaStar, FaCheckCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Colors ──
const C = {
  darkBg: "0F172A",
  darkBg2: "1E293B",
  primary: "6366F1",
  primaryLight: "818CF8",
  cyan: "06B6D4",
  white: "F1F5F9",
  muted: "94A3B8",
  cardBg: "1E293B",
  cardBorder: "334155",
  green: "22C55E",
  accent: "F59E0B",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.25 });

// ── Helpers ──
function addFooter(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.15, w: 10, h: 0.475,
    fill: { color: C.darkBg2 },
  });
  slide.addText("DevForge — Moderne webutvikling", {
    x: 0.5, y: 5.18, w: 5, h: 0.4,
    fontSize: 9, color: C.muted, fontFace: "Arial",
    valign: "middle",
  });
  slide.addText("www.devforge.no", {
    x: 7.5, y: 5.18, w: 2, h: 0.4,
    fontSize: 9, color: C.primaryLight, fontFace: "Arial",
    align: "right", valign: "middle",
  });
}

function addSlideNumber(slide, pres, num) {
  slide.addText(String(num), {
    x: 9.3, y: 5.18, w: 0.5, h: 0.4,
    fontSize: 9, color: C.muted, fontFace: "Arial",
    align: "center", valign: "middle",
  });
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "DevForge";
  pres.title = "DevForge – Moderne webutvikling";

  // Pre-render icons
  const icons = {};
  const iconList = [
    ["laptop", FaLaptopCode, "#818CF8"],
    ["cart", FaShoppingCart, "#818CF8"],
    ["cogs", FaCogs, "#818CF8"],
    ["search", FaSearch, "#818CF8"],
    ["palette", FaPalette, "#818CF8"],
    ["sync", FaSyncAlt, "#818CF8"],
    ["arrow", FaArrowRight, "#6366F1"],
    ["star", FaStar, "#F59E0B"],
    ["check", FaCheckCircle, "#22C55E"],
    ["envelope", FaEnvelope, "#818CF8"],
    ["phone", FaPhoneAlt, "#818CF8"],
    ["marker", FaMapMarkerAlt, "#818CF8"],
  ];
  for (const [key, comp, color] of iconList) {
    icons[key] = await iconToBase64Png(comp, color);
  }
  const iconWhite = {};
  for (const [key, comp] of iconList) {
    iconWhite[key] = await iconToBase64Png(comp, "#FFFFFF");
  }

  // ══════════════════════════════════════════
  // SLIDE 1: TITLE
  // ══════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkBg };

    // Decorative gradient circles
    slide.addShape(pres.shapes.OVAL, {
      x: 6.5, y: -1.5, w: 5, h: 5,
      fill: { color: C.primary, transparency: 85 },
    });
    slide.addShape(pres.shapes.OVAL, {
      x: -1.5, y: 3, w: 4, h: 4,
      fill: { color: C.cyan, transparency: 85 },
    });

    // Logo bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 0.5, w: 0.55, h: 0.55,
      fill: { color: C.primary },
    });
    slide.addText("</>", {
      x: 0.7, y: 0.5, w: 0.55, h: 0.55,
      fontSize: 18, color: C.white, fontFace: "Arial Black",
      align: "center", valign: "middle",
    });
    slide.addText("DevForge", {
      x: 1.4, y: 0.5, w: 3, h: 0.55,
      fontSize: 16, color: C.white, fontFace: "Arial",
      valign: "middle", bold: true,
    });

    // Main title
    slide.addText("Moderne webutvikling\nfor din bedrift", {
      x: 0.7, y: 1.4, w: 7.5, h: 2,
      fontSize: 40, color: C.white, fontFace: "Arial Black",
      valign: "middle",
    });

    // Subtitle
    slide.addText("Jeg bygger nettsider som ser bra ut, fungerer feilfritt\nog gir resultater – fra enkle landingssider til avanserte webapplikasjoner.", {
      x: 0.7, y: 3.2, w: 6.5, h: 1.2,
      fontSize: 14, color: C.muted, fontFace: "Arial",
      lineSpacingMultiple: 1.5,
    });

    // CTA bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 4.3, w: 3.2, h: 0.5,
      fill: { color: C.primary },
    });
    slide.addText("  Book gratis konsultasjon →", {
      x: 0.7, y: 4.3, w: 3.2, h: 0.5,
      fontSize: 12, color: C.white, fontFace: "Arial",
      bold: true, valign: "middle",
    });

    addFooter(slide, pres);
    addSlideNumber(slide, pres, 1);
  }

  // ══════════════════════════════════════════
  // SLIDE 2: HVA ER DEVFORGE?
  // ══════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkBg };

    // Section label
    slide.addText("OM MEG", {
      x: 0.7, y: 0.4, w: 3, h: 0.3,
      fontSize: 10, color: C.primaryLight, fontFace: "Arial",
      bold: true, charSpacing: 3,
    });

    // Title
    slide.addText("Hva er DevForge?", {
      x: 0.7, y: 0.8, w: 8, h: 0.7,
      fontSize: 30, color: C.white, fontFace: "Arial Black",
    });

    // Content columns
    // Left: description
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.7, w: 4.2, h: 3.0,
      fill: { color: C.cardBg },
      shadow: makeShadow(),
    });
    slide.addText([
      { text: "Hei! Jeg er en norsk webutvikler", options: { bold: true, fontSize: 14, color: C.white, breakLine: true } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "med over 5 års erfaring innen webutvikling. Jeg hjelper bedrifter med å skape en digital tilstedeværelse som skiller seg ut.", options: { fontSize: 12, color: C.muted, breakLine: true } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "Min filosofi er enkel: tett samarbeid, tydelig kommunikasjon, og et sluttresultat som overgår forventningene.", options: { fontSize: 12, color: C.muted } },
    ], {
      x: 1.0, y: 1.9, w: 3.6, h: 2.6,
      fontFace: "Arial", valign: "top",
      lineSpacingMultiple: 1.3,
    });

    // Right: key stats
    const stats = [
      { num: "50+", label: "Fullførte prosjekter" },
      { num: "30+", label: "Fornøyde kunder" },
      { num: "5+", label: "Års erfaring" },
    ];
    stats.forEach((stat, i) => {
      const yPos = 1.7 + i * 1.0;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 5.3, y: yPos, w: 4.0, h: 0.8,
        fill: { color: C.cardBg },
      });
      slide.addText(stat.num, {
        x: 5.5, y: yPos, w: 1.2, h: 0.8,
        fontSize: 24, color: C.primaryLight, fontFace: "Arial Black",
        valign: "middle",
      });
      slide.addText(stat.label, {
        x: 6.7, y: yPos, w: 2.4, h: 0.8,
        fontSize: 12, color: C.muted, fontFace: "Arial",
        valign: "middle",
      });
    });

    addFooter(slide, pres);
    addSlideNumber(slide, pres, 2);
  }

  // ══════════════════════════════════════════
  // SLIDE 3: TJENESTER (CORE SLIDE)
  // ══════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkBg };

    slide.addText("TJENESTER", {
      x: 0.7, y: 0.4, w: 3, h: 0.3,
      fontSize: 10, color: C.primaryLight, fontFace: "Arial",
      bold: true, charSpacing: 3,
    });
    slide.addText("Hva kan du kontakte meg for?", {
      x: 0.7, y: 0.8, w: 8, h: 0.6,
      fontSize: 28, color: C.white, fontFace: "Arial Black",
    });

    const services = [
      { icon: "laptop", title: "Nettsider & Landingssider", desc: "Moderne, responsive nettsider bygget med de nyeste teknologiene." },
      { icon: "cart", title: "Nettbutikker", desc: "E-handelsløsninger med betaling, lagerstyring og ordrehåndtering." },
      { icon: "cogs", title: "Webapplikasjoner", desc: "Avanserte løsninger med databaser, brukeradmin og sanntidsdata." },
      { icon: "search", title: "SEO & Ytelse", desc: "Optimalisering for søkemotorer og lynraske lastetider." },
      { icon: "palette", title: "Responsivt & Tilgjengelig", desc: "Fungerer på alle enheter – desktop, nettbrett og mobil." },
      { icon: "sync", title: "Vedlikehold & Support", desc: "Løpende oppdateringer, sikkerhet og teknisk support." },
    ];

    const cols = 3;
    const cardW = 2.7;
    const cardH = 1.9;
    const startX = 0.7;
    const startY = 1.65;
    const gapX = 0.25;
    const gapY = 0.2;

    for (let i = 0; i < services.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      // Card background
      slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w: cardW, h: cardH,
        fill: { color: C.cardBg },
      });
      // Left accent border
      slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 0.06, h: cardH,
        fill: { color: C.primary },
      });

      // Icon
      slide.addImage({
        data: icons[services[i].icon],
        x: x + 0.2, y: y + 0.2, w: 0.35, h: 0.35,
      });

      // Title
      slide.addText(services[i].title, {
        x: x + 0.2, y: y + 0.65, w: cardW - 0.4, h: 0.4,
        fontSize: 13, color: C.white, fontFace: "Arial",
        bold: true, valign: "top",
      });
      // Description
      slide.addText(services[i].desc, {
        x: x + 0.2, y: y + 1.05, w: cardW - 0.4, h: 0.7,
        fontSize: 10, color: C.muted, fontFace: "Arial",
        valign: "top", lineSpacingMultiple: 1.3,
      });
    }

    addFooter(slide, pres);
    addSlideNumber(slide, pres, 3);
  }

  // ══════════════════════════════════════════
  // SLIDE 4: PROSESS
  // ══════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkBg };

    slide.addText("PROSESS", {
      x: 0.7, y: 0.4, w: 3, h: 0.3,
      fontSize: 10, color: C.primaryLight, fontFace: "Arial",
      bold: true, charSpacing: 3,
    });
    slide.addText("Slik jobber jeg", {
      x: 0.7, y: 0.8, w: 8, h: 0.6,
      fontSize: 28, color: C.white, fontFace: "Arial Black",
    });

    const steps = [
      { num: "01", title: "Kartlegging", desc: "Vi blir kjent med dine behov, mål og budsjett. Du får en tydelig plan og fastpris." },
      { num: "02", title: "Design", desc: "Jeg lager designskisser og en teknisk plan. Du gir tilbakemelding underveis." },
      { num: "03", title: "Utvikling", desc: "Jeg bygger nettsiden. Du får løpende oppdateringer og en demo å følge med på." },
      { num: "04", title: "Lansering", desc: "Nettsiden settes i produksjon. Jeg følger opp og sørger for at alt fungerer." },
    ];

    const stepW = 2.0;
    const stepGap = 0.35;
    const startX = 0.7;

    steps.forEach((step, i) => {
      const x = startX + i * (stepW + stepGap);

      // Number circle
      slide.addShape(pres.shapes.OVAL, {
        x: x + (stepW - 0.6) / 2, y: 1.7, w: 0.6, h: 0.6,
        fill: { color: C.primary },
      });
      slide.addText(step.num, {
        x: x + (stepW - 0.6) / 2, y: 1.7, w: 0.6, h: 0.6,
        fontSize: 14, color: C.white, fontFace: "Arial Black",
        align: "center", valign: "middle",
      });

      // Arrow between steps (except last)
      if (i < steps.length - 1) {
        slide.addImage({
          data: icons["arrow"],
          x: x + stepW + 0.05, y: 1.85, w: 0.25, h: 0.25,
        });
      }

      // Card
      slide.addShape(pres.shapes.RECTANGLE, {
        x, y: 2.55, w: stepW, h: 2.2,
        fill: { color: C.cardBg },
      });

      // Title
      slide.addText(step.title, {
        x: x + 0.15, y: 2.7, w: stepW - 0.3, h: 0.4,
        fontSize: 13, color: C.white, fontFace: "Arial",
        bold: true,
      });
      // Description
      slide.addText(step.desc, {
        x: x + 0.15, y: 3.15, w: stepW - 0.3, h: 1.4,
        fontSize: 10, color: C.muted, fontFace: "Arial",
        valign: "top", lineSpacingMultiple: 1.4,
      });
    });

    addFooter(slide, pres);
    addSlideNumber(slide, pres, 4);
  }

  // ══════════════════════════════════════════
  // SLIDE 5: PRISER
  // ══════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkBg };

    slide.addText("PRISER", {
      x: 0.7, y: 0.4, w: 3, h: 0.3,
      fontSize: 10, color: C.primaryLight, fontFace: "Arial",
      bold: true, charSpacing: 3,
    });
    slide.addText("Enkle og forutsigbare priser", {
      x: 0.7, y: 0.8, w: 8, h: 0.6,
      fontSize: 28, color: C.white, fontFace: "Arial Black",
    });

    const plans = [
      {
        name: "Kickstart", price: "15 000", period: "engangspris",
        features: ["1 side (one-pager)", "Responsivt design", "Grunnleggende SEO", "Kontaktskjema", "1 runde revisjoner"],
        featured: false,
      },
      {
        name: "Standard", price: "30 000", period: "engangspris",
        features: ["Opptil 5 sider", "Responsivt + SEO", "CMS (enkelt å oppdatere)", "Kontaktskjema & Maps", "2 runder revisjoner", "3 mnd gratis hosting"],
        featured: true,
      },
      {
        name: "Premium", price: "50 000+", period: "fra pris",
        features: ["Ubegrenset antall sider", "Tilpasset funksjonalitet", "Avansert SEO & ytelse", "Database & brukeradmin", "Betaling & e-handel", "6 mnd gratis hosting"],
        featured: false,
      },
    ];

    const planW = 2.7;
    const planGap = 0.3;
    const startX = 0.7;

    plans.forEach((plan, i) => {
      const x = startX + i * (planW + planGap);
      const yBase = 1.65;

      // Card
      slide.addShape(pres.shapes.RECTANGLE, {
        x, y: yBase, w: planW, h: 3.25,
        fill: { color: plan.featured ? C.cardBg : C.cardBg },
      });

      // If featured, add top accent and border
      if (plan.featured) {
        slide.addShape(pres.shapes.RECTANGLE, {
          x, y: yBase, w: planW, h: 0.06,
          fill: { color: C.primary },
        });
        // Featured badge
        slide.addShape(pres.shapes.RECTANGLE, {
          x: x + planW - 1.4, y: yBase + 0.08, w: 1.3, h: 0.25,
          fill: { color: C.primary },
        });
        slide.addText("MEST POPULÆR", {
          x: x + planW - 1.4, y: yBase + 0.08, w: 1.3, h: 0.25,
          fontSize: 7, color: C.white, fontFace: "Arial",
          bold: true, align: "center", valign: "middle", charSpacing: 1,
        });
      }

      // Plan name
      slide.addText(plan.name, {
        x: x + 0.2, y: yBase + 0.35, w: planW - 0.4, h: 0.3,
        fontSize: 14, color: C.white, fontFace: "Arial",
        bold: true,
      });

      // Price
      slide.addText([
        { text: "kr ", options: { fontSize: 14, color: C.primaryLight } },
        { text: plan.price, options: { fontSize: 24, color: C.white, bold: true } },
      ], {
        x: x + 0.2, y: yBase + 0.65, w: planW - 0.4, h: 0.5,
        fontFace: "Arial", valign: "middle",
      });
      slide.addText(plan.period, {
        x: x + 0.2, y: yBase + 1.1, w: planW - 0.4, h: 0.2,
        fontSize: 9, color: C.muted, fontFace: "Arial",
      });

      // Divider
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.2, y: yBase + 1.4, w: planW - 0.4, h: 0.02,
        fill: { color: C.cardBorder },
      });

      // Features
      const featTexts = plan.features.map((f, fi) => ({
        text: f,
        options: {
          bullet: true,
          fontSize: 9.5,
          color: C.muted,
          breakLine: fi < plan.features.length - 1,
          paraSpaceAfter: 4,
        },
      }));
      slide.addText(featTexts, {
        x: x + 0.15, y: yBase + 1.55, w: planW - 0.3, h: 1.5,
        fontFace: "Arial", valign: "top",
      });
    });

    addFooter(slide, pres);
    addSlideNumber(slide, pres, 5);
  }

  // ══════════════════════════════════════════
  // SLIDE 6: KONTAKT
  // ══════════════════════════════════════════
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkBg };

    // Decorative circle
    slide.addShape(pres.shapes.OVAL, {
      x: 3, y: -2, w: 6, h: 6,
      fill: { color: C.primary, transparency: 90 },
    });

    slide.addText("KONTAKT", {
      x: 0.7, y: 0.4, w: 3, h: 0.3,
      fontSize: 10, color: C.primaryLight, fontFace: "Arial",
      bold: true, charSpacing: 3,
    });

    slide.addText("La oss snakkes!", {
      x: 0.7, y: 0.8, w: 8, h: 0.7,
      fontSize: 32, color: C.white, fontFace: "Arial Black",
    });

    slide.addText("Har du et prosjekt i tankene? \nBook en gratis og uforpliktende konsultasjon.", {
      x: 0.7, y: 1.5, w: 5.5, h: 0.8,
      fontSize: 13, color: C.muted, fontFace: "Arial",
      lineSpacingMultiple: 1.5,
    });

    // Contact methods
    const contacts = [
      { icon: "envelope", label: "E-post", value: "hei@devforge.no" },
      { icon: "phone", label: "Telefon", value: "+47 000 00 000" },
      { icon: "marker", label: "Lokasjon", value: "Oslo, Norge" },
    ];

    contacts.forEach((c, i) => {
      const yPos = 2.55 + i * 0.85;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.7, y: yPos, w: 5.5, h: 0.7,
        fill: { color: C.cardBg },
      });
      slide.addImage({
        data: icons[c.icon],
        x: 0.9, y: yPos + 0.15, w: 0.4, h: 0.4,
      });
      slide.addText(c.label, {
        x: 1.5, y: yPos + 0.05, w: 2, h: 0.3,
        fontSize: 10, color: C.muted, fontFace: "Arial",
        valign: "middle",
      });
      slide.addText(c.value, {
        x: 1.5, y: yPos + 0.32, w: 4, h: 0.3,
        fontSize: 13, color: C.white, fontFace: "Arial",
        bold: true, valign: "middle",
      });
    });

    // Big CTA button on right
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 6.8, y: 2.55, w: 2.5, h: 1.8,
      fill: { color: C.primary },
      shadow: makeShadow(),
    });
    slide.addText("Book gratis\nkonsultasjon\n🚀", {
      x: 6.8, y: 2.55, w: 2.5, h: 1.8,
      fontSize: 16, color: C.white, fontFace: "Arial Black",
      align: "center", valign: "middle",
      lineSpacingMultiple: 1.3,
    });

    // Bottom text
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 4.6, w: 8.6, h: 0.4,
      fill: { color: C.cardBg },
    });
    slide.addText("✨ Jeg svarer vanligvis innen 24 timer", {
      x: 0.7, y: 4.6, w: 8.6, h: 0.4,
      fontSize: 11, color: C.muted, fontFace: "Arial",
      align: "center", valign: "middle",
    });

    addFooter(slide, pres);
    addSlideNumber(slide, pres, 6);
  }

  // ══════════════════════════════════════════
  // WRITE FILE
  // ══════════════════════════════════════════
  await pres.writeFile({ fileName: "C:\\Users\\affai\\webdev-site\\DevForge-presentasjon.pptx" });
  console.log("✅ PPTX created successfully!");
}

main().catch(err => { console.error(err); process.exit(1); });
