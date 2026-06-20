/* ==========================================
 * DevForge — Main JavaScript
 * Performance-optimized with accessibility
 * ========================================== */

(function() {
  'use strict';

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  /* ===== HIGHLIGHT ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not([href*="contact"])').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ===== SCROLL EFFECT (passive listener) ===== */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ===== MOBILE MENU ===== */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Focus trap: trap focus inside mobile menu when open
    navLinks.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = navLinks.querySelectorAll('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ===== SCROLL ANIMATIONS (IntersectionObserver) ===== */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // one-time
      }
    });
  }, observerOptions);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeFadeElements);
  } else {
    observeFadeElements();
  }

  function observeFadeElements() {
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  /* ===== SCROLL REVEAL (sections) ===== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeReveal);
  } else {
    observeReveal();
  }

  function observeReveal() {
    document.querySelectorAll('.section-reveal, .stagger-grid').forEach(el => {
      revealObserver.observe(el);
    });
  }

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    // Set initial state
    button.setAttribute('aria-expanded', 'false');
  });

  /* ===== CONTACT FORM (Netlify Forms) ===== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '⏳ Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        if (response.ok) {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
          // Focus success message for screen readers
          formSuccess.setAttribute('tabindex', '-1');
          formSuccess.focus();
        } else {
          // Fallback: try plain HTML form submission
          contactForm.submit();
        }
      } catch (err) {
        // Fallback: let the browser submit normally
        contactForm.submit();
      }

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  }

  /* ===== COUNTER ANIMATION (subtle) ===== */
  function animateCounter(element, target, suffix = '') {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      element.textContent = suffix ? current + suffix : current;
      if (current >= target) clearInterval(timer);
    }, 20);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
  });

  /* ===== LOG (dev only) ===== */
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 DevForge loaded');
  }
})();

/* ===== COOKIE CONSENT BANNER ===== */
(function() {
  'use strict';

  if (localStorage.getItem('cookieConsent')) return;
  document.body.classList.add('has-cookie-banner');

  var banner = document.createElement('div');
  banner.id = 'cookie-banner';

  var text = document.createElement('span');
  var isNO = window.location.pathname.indexOf('-no.') !== -1 || window.location.pathname === '/index-no.html';
  text.textContent = isNO
    ? 'Denne nettsiden bruker skrifttyper som lastes lokalt. Ingen tredjeparts informasjonskapsler benyttes.'
    : 'This site uses locally hosted fonts. No third-party cookies are used.';

  var btnDiv = document.createElement('div');
  btnDiv.className = 'cookie-btn-group';

  var acceptBtn = document.createElement('button');
  acceptBtn.textContent = 'OK';
  acceptBtn.className = 'cookie-btn';
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.remove();
    document.body.classList.remove('has-cookie-banner');
  });

  btnDiv.appendChild(acceptBtn);
  banner.appendChild(text);
  banner.appendChild(btnDiv);
  document.body.appendChild(banner);
})();

/* ===== LANGUAGE SWITCHER DROPDOWN ===== */
(function() {
  'use strict';
  var btn = document.getElementById('langBtn');
  var dropdown = document.getElementById('langDropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', function() {
    dropdown.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
})();

/* ==========================================
 * HERO ANIMATIONS — Particle system +
 * scroll parallax (standalone, no deps)
 * ========================================== */
(function() {
  'use strict';

  /* ---- Constants ---- */
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return; // No hero canvas on this page

  // Guard: skip particles on reduced motion
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm.matches) { canvas.style.display = 'none'; return; }

  var COLORS = ['#6366f1', '#06b6d4'];
  var MAX_PARTICLES = window.innerWidth < 768 ? 0
    : window.innerWidth <= 1024 ? 15
    : 22;
  if (MAX_PARTICLES === 0) { canvas.style.display = 'none'; return; }

  /* ---- Canvas setup ---- */
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    var w = canvas.parentElement.offsetWidth;
    var h = canvas.parentElement.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();

  /* ---- Debounced resize ---- */
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      resizeCanvas();
      // Recalculate particle positions proportionally
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x = p.x * (canvas.width / dpr) / (prevW || 1);
        p.y = p.y * (canvas.height / dpr) / (prevH || 1);
      }
      prevW = canvas.width / dpr;
      prevH = canvas.height / dpr;
    }, 250);
  });
  var prevW = canvas.width / dpr;
  var prevH = canvas.height / dpr;

  /* ---- Particle system ---- */
  var particles = [];
  var w = canvas.width / dpr;
  var h = canvas.height / dpr;

  function createParticle(respawn) {
    return {
      x: respawn ? Math.random() * w : Math.random() * w,
      y: respawn ? -5 : Math.random() * h,
      size: 1 + Math.random() * 2,        // 1–3px
      speed: 0.15 + Math.random() * 0.25,  // vary float speed
      opacity: 0.15 + Math.random() * 0.15, // 0.15–0.30
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: Math.random() * Math.PI * 2    // horizontal drift offset
    };
  }

  for (var i = 0; i < MAX_PARTICLES; i++) {
    particles.push(createParticle(false));
  }

  function updateParticles() {
    w = canvas.width / dpr;
    h = canvas.height / dpr;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y -= p.speed;
      p.x += Math.sin(p.phase + Date.now() * 0.0005) * 0.15; // slight drift
      // Respawn when out of top
      if (p.y < -5) {
        var np = createParticle(true);
        p.x = np.x;
        p.y = h + 5;
        p.size = np.size;
        p.speed = np.speed;
        p.opacity = np.opacity;
        p.color = np.color;
        p.phase = np.phase;
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ---- Animation loop ---- */
  var running = true;

  function loop() {
    if (!running) return;
    updateParticles();
    drawParticles();
    requestAnimationFrame(loop);
  }

  /* ---- Page Visibility API ---- */
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      running = false;
    } else {
      running = true;
      loop();
    }
  });

  /* ---- Start ---- */
  loop();

  /* Mark canvas as loaded (triggers CSS fade-in) */
  canvas.classList.add('loaded');

  /* ---- Clear entrance transition-delay after intro (so scroll-parallax isn't sticky) ---- */
  setTimeout(function() {
    if (hero) hero.classList.add('parallax-ready');
  }, 1500); // after all staggered entrance animations have finished

  /* ==========================================
   * SCROLL PARALLAX
   * ========================================== */
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var heroBadge = hero.querySelector('.hero-badge');
  var heroLogo = hero.querySelector('.hero-logo-area') || hero.querySelector('h1');
  var heroTagline = hero.querySelector('.hero-tagline');
  var heroActions = hero.querySelector('.hero-actions');
  var heroProof = hero.querySelector('.hero-proof');

  // Collect elements that exist
  var parallaxTargets = [];
  function addTarget(el, startOffset, endOffset) {
    if (el) parallaxTargets.push({ el: el, start: startOffset, end: endOffset, progress: 0 });
  }

  // badge fades 0-30%, tagline 10-50%, logo 20-100%, CTA 40-100%, proof 40-100%
  addTarget(heroBadge, 0, 0.30);
  addTarget(heroTagline, 0.10, 0.50);
  addTarget(heroLogo, 0.20, 1.0);
  addTarget(heroActions, 0.40, 1.0);
  addTarget(heroProof, 0.40, 1.0);

  var mm = window.matchMedia('(max-width: 767px)');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');

  function scrollParallax() {
    if (mm.matches || rm.matches) {
      // Reset to default state
      for (var i = 0; i < parallaxTargets.length; i++) {
        var t = parallaxTargets[i];
        t.el.style.opacity = '';
        t.el.style.transform = '';
      }
      return;
    }

    var heroRect = hero.getBoundingClientRect();
    var heroH = heroRect.height;
    var scrollRange = heroH * 1.5;
    var scrollProgress = Math.min(1, Math.max(0, (-heroRect.top) / scrollRange));

    for (var i = 0; i < parallaxTargets.length; i++) {
      var t = parallaxTargets[i];
      var localProgress = (scrollProgress - t.start) / (t.end - t.start);
      localProgress = Math.min(1, Math.max(0, localProgress));
      // ease-out quadratic
      var eased = 1 - Math.pow(1 - localProgress, 2);
      var opacity = 1 - eased;
      var scale = t.el === heroLogo ? 1 - (eased * 0.10) : 1;
      t.el.style.opacity = Math.max(0, opacity);
      t.el.style.transform = scale !== 1 ? 'scale(' + scale + ')' : '';
    }
  }

  /* ---- Scroll listener with RAF ---- */
  var tickingP = false;
  window.addEventListener('scroll', function() {
    if (!tickingP) {
      requestAnimationFrame(function() {
        scrollParallax();
        tickingP = false;
      });
      tickingP = true;
    }
  }, { passive: true });

  /* Initial call */
  scrollParallax();

})();

/* ===== STICKY-STACKING PROJECT CARDS ===== */
(function() {
  'use strict';
  var cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  var totalCards = cards.length;

  function updateScales() {
    var windowCenter = window.scrollY + window.innerHeight * 0.3;
    cards.forEach(function(card) {
      var index = parseInt(card.getAttribute('data-index'));
      var rect = card.getBoundingClientRect();
      var cardTop = rect.top + window.scrollY;
      var progress = (window.scrollY + window.innerHeight - cardTop) / (window.innerHeight * 1.5);
      progress = Math.max(0, Math.min(1, progress));
      var targetScale = 1 - (totalCards - 1 - index) * 0.03;
      var scale = 1 - (1 - targetScale) * progress;
      card.style.transform = 'scale(' + scale + ')';
    });
  }

  var tickingS = false;
  window.addEventListener('scroll', function() {
    if (!tickingS) {
      requestAnimationFrame(function() {
        updateScales();
        tickingS = false;
      });
      tickingS = true;
    }
  }, { passive: true });

  updateScales();
})();

/* ===== MAGNET BUTTON EFFECT ===== */
(function() {
  'use strict';
  var magnets = document.querySelectorAll('[data-magnet]');
  if (!magnets.length) return;

  magnets.forEach(function(el) {
    var padding = parseInt(el.getAttribute('data-magnet-padding')) || 80;
    var strength = parseInt(el.getAttribute('data-magnet-strength')) || 3;

    function onMove(e) {
      var rect = el.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var distX = e.clientX - centerX;
      var distY = e.clientY - centerY;
      var dist = Math.sqrt(distX * distX + distY * distY);
      var maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDist) {
        el.classList.add('magnet-active');
        var x = distX / strength;
        var y = distY / strength;
        el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      } else {
        el.classList.remove('magnet-active');
        el.style.transform = '';
      }
    }

    function onLeave() {
      el.classList.remove('magnet-active');
      el.style.transform = '';
    }

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
})();
