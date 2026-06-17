/* ==========================================
 * DevForge — Project Estimator
 * Interactive cost calculator
 * ========================================== */
(function() {
  'use strict';

  /* ---- Pricing matrix ---- */
  var PRICES = {
    platform: { web: 0, mobile: 1500, both: 3500 },
    scale: { 0: 0, 1: 2500, 2: 6000 },
    features: { auth: 800, payments: 1200, ai: 2500, cms: 2000 }
  };

  var TIMELINE = ['1-2 Months', '2-3 Months', '4-6 Months'];
  var TEAM = ['2 Engineers', '4 Engineers', '6+ Engineers'];
  var SUPPORT = ['1 Month Priority', '3 Months Priority', '6 Months Priority'];

  /* ---- DOM refs ---- */
  var platformBtns = document.querySelectorAll('#platformGroup .platform-btn');
  var scaleSlider = document.getElementById('scaleSlider');
  var featureBtns = document.querySelectorAll('#featuresGrid .feature-btn');
  var scaleLabels = document.querySelectorAll('.scale-labels span');

  var resultBudget = document.getElementById('resultBudget');
  var resultTimeline = document.getElementById('resultTimeline');
  var resultTeam = document.getElementById('resultTeam');
  var resultSupport = document.getElementById('resultSupport');
  var resultNote = document.getElementById('resultNote');

  if (!resultBudget) return; // not on estimator page

  /* ---- State ---- */
  var state = {
    platform: 'web',
    scale: 1,
    features: { auth: true, payments: false, ai: false, cms: false }
  };

  /* ---- Calculate ---- */
  function calculate() {
    var base = 1500; // Starting price
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

    if (total <= 3000) resultNote.textContent = 'Starting at this range';
    else if (total <= 8000) resultNote.textContent = 'Mid-range project estimate';
    else resultNote.textContent = 'Enterprise-grade investment';
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
