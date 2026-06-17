/* ==========================================
 * DevForge — Central Site Configuration
 *
 * Change SITE_URL here when domain is live.
 * All other files read from this single source.
 * ========================================== */
(function() {
  'use strict';

  window.DEVFORGE_CONFIG = {
    /* ---- Change this when domain is ready ---- */
    SITE_URL: 'https://devforgelab.netlify.app',

    /* ---- Derived URLs (computed automatically) ---- */
    get BASE_URL()   { return this.SITE_URL; },
    get OG_IMAGE()   { return this.SITE_URL + '/images/og-image.png'; },
    get SITEMAP()    { return this.SITE_URL + '/sitemap.xml'; },

    /* ---- Site metadata ---- */
    SITE_NAME: 'DevForge',
    DEFAULT_LOCALE: 'en_US',
    TWITTER_HANDLE: '',  /* set when available */
    OG_IMAGE_W: 1200,
    OG_IMAGE_H: 630,
    OG_IMAGE_ALT: 'DevForge — Modern Web Development Agency'
  };
})();
