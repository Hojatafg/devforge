/* ==========================================
 * DevForge — Project Estimator
 * Interactive cost calculator
 * Matches DevForge's actual pricing
 * ========================================== */
(function() {
  'use strict';

  /* ---- DevForge real pricing ---- */
  var PRICES = {
    // Base: Kickstart landing page
    base: 1500,
    // Platform add-ons
    platform: { web: 0, mobile: 1500, both: 3500 },
    // Scale: MVP = Kickstart, Growth = Standard, Enterprise = Premium
    scale: { 0: 0, 1: 1500, 2: 3500 },
    // Feature add-ons
    features: { auth: 800, payments: 1200, ai: 2000, cms: 1500 }
  };

  var TIMELINE = ['1-2 Months', '2-3 Months', '4-6 Months'];
  var TEAM = ['2 Engineers', '3-4 Engineers', '5+ Engineers'];
  var SUPPORT = ['1 Month Priority', '3 Months Priority', '6 Months Priority'];

  /* ---- DOM refs ---- */
  var platformBtns = document.querySelectorAll('#platformGroup .platform-btn');
  var scaleSlider = document.getElementById('scaleSlider');
  var sliderFill = document.getElementById('sliderFill');
  var featureBtns = document.querySelectorAll('#featuresGrid .feature-btn');
  var scaleLabels = document.querySelectorAll('.scale-labels span');

  var resultBudget = document.getElementById('resultBudget');
  var resultTimeline = document.getElementById('resultTimeline');
  var resultTeam = document.getElementById('resultTeam');
  var resultSupport = document.getElementById('resultSupport');

  if (!resultBudget) return; // not on estimator page

  /* ---- State ---- */
  var state = {
    platform: 'web',
    scale: 1,
    features: { auth: true, payments: false, ai: false, cms: false }
  };

  /* ---- Calculate ---- */
  function calculate() {
    var base = PRICES.base;
    var platformCost = PRICES.platform[state.platform] || 0;
    var scaleCost = PRICES.scale[state.scale] || 0;
    var featuresCost = 0;

    for (var key in state.features) {
      if (state.features[key]) {
        featuresCost += PRICES.features[key] || 0;
      }
    }

    var total = base + platformCost + scaleCost + featuresCost;
    resultBudget.textContent = '$' + total.toLocaleString();

    resultTimeline.textContent = TIMELINE[state.scale];
    resultTeam.textContent = TEAM[state.scale];
    resultSupport.textContent = SUPPORT[state.scale];

    // Update slider fill
    var fillPct = ((state.scale / 2) * 100) + '%';
    sliderFill.style.width = fillPct;
  }

  /* ---- Platform buttons ---- */
  platformBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      platformBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      state.platform = btn.getAttribute('data-value');
      calculate();
    });
  });

  /* ---- Scale slider ---- */
  scaleSlider.addEventListener('input', function() {
    state.scale = parseInt(this.value);
    scaleLabels.forEach(function(label, i) {
      label.classList.toggle('active-label', i === state.scale);
    });
    calculate();
  });

  /* ---- Feature buttons ---- */
  featureBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.getAttribute('data-value');
      state.features[key] = !state.features[key];
      btn.classList.toggle('active');
      btn.setAttribute('aria-pressed', state.features[key]);
      calculate();
    });
  });

  /* ---- Initial calculation ---- */
  calculate();
})();
