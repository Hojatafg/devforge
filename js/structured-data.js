/* ==========================================
 * DevForge — JSON-LD Structured Data
 * Advanced SEO: Organization, LocalBusiness,
 * Service, FAQ, BreadcrumbList schemas
 * ========================================== */

(function() {
  'use strict';

  /* Read base URL from central config, with fallback */
  var cfg = window.DEVFORGE_CONFIG || {};
  var BASE_URL = cfg.SITE_URL || 'https://devforgelab.eu';
  var SITE_NAME = cfg.SITE_NAME || 'DevForge';

  /* ---------- Organization + LocalBusiness ---------- */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": BASE_URL + "/#organization",
    "name": SITE_NAME,
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": BASE_URL + "/images/og-image.png",
      "width": 1200,
      "height": 630
    },
    "description": "Modern web development agency based in Norway. We build websites, e-commerce solutions, and web applications that deliver results.",
    "foundingDate": "2026",
    "founders": [{
      "@type": "Person",
      "name": "Hajo",
      "jobTitle": "Founder & Lead Developer"
    }],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Norway",
      "addressRegion": "Østfold",
      "addressCountry": "NO"
    },
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "post@devforgelab.eu",
      "availableLanguage": ["English", "Norwegian"],
      "url": BASE_URL + "/contact.html"
    },
    "areaServed": {
      "@type": "City",
      "name": "Norway"
    },
    "priceRange": "$500 – $10,000+"
  };

  /* ---------- WebSite schema ---------- */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": BASE_URL + "/#website",
    "url": BASE_URL,
    "name": SITE_NAME,
    "description": "Modern web development for businesses that want to stand out. We build websites that deliver results.",
    "inLanguage": "en",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": BASE_URL + "/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  /* ---------- BreadcrumbList (page-aware) ---------- */
  function getBreadcrumbSchema() {
    const path = window.location.pathname;
    let items = [
      { name: 'Home', url: BASE_URL + '/' }
    ];

    if (path.includes('services')) {
      items.push({ name: 'Services', url: BASE_URL + '/services.html' });
    } else if (path.includes('about')) {
      items.push({ name: 'About', url: BASE_URL + '/about.html' });
    } else if (path.includes('contact')) {
      items.push({ name: 'Contact', url: BASE_URL + '/contact.html' });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": BASE_URL + "/#breadcrumb",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  /* ---------- Service schemas (for services page) ---------- */
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": BASE_URL + "/services.html#website",
      "name": "Websites & Landing Pages",
      "description": "Modern, responsive websites and landing pages built with the latest technologies.",
      "provider": { "@id": BASE_URL + "/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "1500",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": BASE_URL + "/services.html#ecommerce",
      "name": "E-Commerce Development",
      "description": "Full-featured online stores with payment solutions, inventory management, and responsive design.",
      "provider": { "@id": BASE_URL + "/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "3000",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": BASE_URL + "/services.html#webapp",
      "name": "Web Applications",
      "description": "Custom web applications with dashboards, user management, and API integrations.",
      "provider": { "@id": BASE_URL + "/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "5000",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": BASE_URL + "/services.html#seo",
      "name": "SEO & Performance Optimization",
      "description": "Technical SEO audits, Core Web Vitals optimization, and structured data implementation.",
      "provider": { "@id": BASE_URL + "/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "800",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31"
      }
    }
  ];

  /* ---------- FAQ schema (for services page) ---------- */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": BASE_URL + "/services.html#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on complexity. A simple landing page can be ready in 1-2 weeks, while an e-commerce site or web app typically takes 3-6 weeks. We'll give you a clear timeline before starting."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a website cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The price depends on size and functionality. A simple site starts at $1,500, e-commerce from $3,000, and advanced web apps from $5,000. We always provide a fixed price upfront — no hidden costs."
        }
      },
      {
        "@type": "Question",
        "name": "Can I update the website myself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We include a user-friendly CMS so you can easily update text, images, and content without technical knowledge. If you'd rather let us handle updates, we have maintenance plans available."
        }
      },
      {
        "@type": "Question",
        "name": "Will my website work on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Every website we build is responsive — it adapts perfectly to mobile, tablet, and desktop. Over 60% of web traffic comes from mobile, so this is a standard feature in all our projects."
        }
      },
      {
        "@type": "Question",
        "name": "Do you include hosting and domain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We help you set up hosting and a domain, and include free hosting for 3-6 months in most packages. After that, you pay a reasonable monthly rate directly to the hosting provider."
        }
      }
    ]
  };

  /* ---------- Inject all schemas ---------- */
  function injectSchema(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  function initStructuredData() {
    injectSchema(organizationSchema);
    injectSchema(websiteSchema);
    injectSchema(getBreadcrumbSchema());

    const path = window.location.pathname;
    if (path.includes('services')) {
      serviceSchemas.forEach(s => injectSchema(s));
      injectSchema(faqSchema);
    }
  }

  /* Run early — before DOMContentLoaded if possible */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStructuredData);
  } else {
    initStructuredData();
  }
})();
