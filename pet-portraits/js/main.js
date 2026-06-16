/* ==========================================
   DevForge Pet Portraits — Main JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // --- Hero Carousel ---
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    const images = heroCarousel.querySelectorAll('img');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;

    // Create dots
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      images.forEach(img => img.classList.remove('active'));
      dotsContainer.querySelectorAll('span').forEach(d => d.classList.remove('active'));
      images[index].classList.add('active');
      dotsContainer.children[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % images.length;
      goToSlide(next);
    }

    // Auto-rotate every 4 seconds
    setInterval(nextSlide, 4000);
  }

  // --- IntersectionObserver (scroll animations) ---
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to save resources
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('open');
  }

  // --- Gallery Filters ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryGrid = document.getElementById('galleryGrid');

  if (filterBtns.length > 0 && galleryGrid) {
    const items = galleryGrid.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            // Re-trigger fade animation
            item.classList.remove('visible');
            void item.offsetWidth;
            item.classList.add('visible');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxClose) {
    // Open lightbox on gallery item click
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close handlers
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- URL params for pricing (bestill.html?plan=xxx) ---
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  if (planParam && window.location.pathname.includes('bestill')) {
    const productOptions = document.querySelectorAll('.product-option');
    productOptions.forEach(opt => {
      if (opt.dataset.plan === planParam) {
        opt.click();
      }
    });
  }

});
