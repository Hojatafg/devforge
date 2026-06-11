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
