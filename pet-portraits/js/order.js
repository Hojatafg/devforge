/* ==========================================
   DevForge Pet Portraits — Order Form Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('orderForm');
  if (!form) return;

  // Elements
  const styleOptions = document.querySelectorAll('.style-option');
  const productOptions = document.querySelectorAll('.product-option');
  const fileInput = document.getElementById('fileInput');
  const fileUpload = document.getElementById('fileUpload');
  const filePreview = document.getElementById('filePreview');
  const previewImg = document.getElementById('previewImg');
  const customTextGroup = document.getElementById('customTextGroup');
  const totalPrice = document.getElementById('totalPrice');
  const orderSummary = document.getElementById('orderSummary');
  const loadingOverlay = document.getElementById('loadingOverlay');

  // State
  let selectedStyle = null;
  let selectedProduct = null;
  let uploadedFile = null;

  // --- Style Selection ---
  styleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      styleOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedStyle = opt.dataset.style;
      document.getElementById('styleError').classList.remove('visible');
      updateSummary();
    });
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
    });
  });

  // --- Product Selection ---
  productOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      productOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedProduct = opt.dataset.plan;
      document.getElementById('productError').classList.remove('visible');

      // Show custom text field only for Premium
      customTextGroup.style.display = selectedProduct === 'premium' ? 'block' : 'none';

      updateSummary();
    });
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
    });
  });

  // --- File Upload ---
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndPreview(file);
    }
  });

  // Drag and drop
  fileUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUpload.classList.add('dragover');
  });

  fileUpload.addEventListener('dragleave', () => {
    fileUpload.classList.remove('dragover');
  });

  fileUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUpload.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      validateAndPreview(file);
    }
  });

  function validateAndPreview(file) {
    // Validate type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      showError('fileError', 'Kun JPEG og PNG er tillatt');
      return;
    }

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showError('fileError', 'Filen er for stor. Maks 10 MB.');
      return;
    }

    // Validate resolution (minimum 800x800)
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        if (img.width < 800 || img.height < 800) {
          showError('fileError', `Bildet er for lite. Minst 800×800 px (ditt er ${img.width}×${img.height})`);
          return;
        }

        // All good!
        uploadedFile = file;
        previewImg.src = e.target.result;
        filePreview.style.display = 'block';
        fileUpload.querySelector('p').textContent = file.name;
        document.getElementById('fileError').classList.remove('visible');
        updateSummary();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
      el.classList.add('visible');
    }
  }

  // --- Order Summary ---
  function updateSummary() {
    let summaryHTML = '';
    let total = 0;

    // Style
    if (selectedStyle) {
      const styleNames = { renaissance: 'Renaissance Royal', knight: 'Ridder & Uniform', victorian: 'Victorian Akvarell' };
      const petName = document.getElementById('petName')?.value || 'Ditt kjæledyr';
      summaryHTML += `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border);">
        <span>Stil: ${styleNames[selectedStyle] || selectedStyle}</span>
      </div>`;
    }

    // Product
    if (selectedProduct) {
      const productPrices = { digital: 249, canvas: 599, premium: 999 };
      const productNames = { digital: 'Digital fil', canvas: 'Canvas 30×40 cm', premium: 'Premium innrammet 50×70 cm' };
      total += productPrices[selectedProduct] || 0;
      summaryHTML += `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border);">
        <span>${productNames[selectedProduct] || selectedProduct}</span>
        <span>${productPrices[selectedProduct]} kr</span>
      </div>`;
    }

    // Custom text
    const customText = document.getElementById('customText')?.value;
    if (selectedProduct === 'premium' && customText) {
      total += 99;
      summaryHTML += `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border);">
        <span>Custom tekst</span>
        <span>99 kr</span>
      </div>`;
    }

    // File
    if (uploadedFile) {
      summaryHTML += `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border);">
        <span>📸 Bilde lastet opp</span>
        <span style="color:var(--cyan);">✓</span>
      </div>`;
    }

    if (!summaryHTML) {
      summaryHTML = `<div style="color:var(--text-muted); font-size:0.9rem; padding:20px 0; text-align:center;">
        Velg stil, last opp bilde og velg produkt for å se sammendraget her.
      </div>`;
    }

    orderSummary.innerHTML = summaryHTML;
    totalPrice.textContent = total > 0 ? `${total} kr` : '— kr';
  }

  // Listen for name/pet name changes
  document.getElementById('petName')?.addEventListener('input', updateSummary);
  document.getElementById('customText')?.addEventListener('input', updateSummary);

  // --- Form Validation ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate style
    if (!selectedStyle) {
      document.getElementById('styleError').classList.add('visible');
      isValid = false;
    }

    // Validate name
    const name = document.getElementById('name').value.trim();
    if (!name) {
      document.getElementById('name').classList.add('error');
      document.getElementById('nameError').classList.add('visible');
      isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById('email').classList.add('error');
      document.getElementById('emailError').classList.add('visible');
      isValid = false;
    }

    // Validate file
    if (!uploadedFile) {
      document.getElementById('fileError').classList.add('visible');
      isValid = false;
    }

    // Validate product
    if (!selectedProduct) {
      document.getElementById('productError').classList.add('visible');
      isValid = false;
    }

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.form-error.visible, .error');
      if (firstError) {
        firstError.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // All valid! Show loading overlay
    loadingOverlay.classList.add('active');

    // Collect order data
    const orderData = {
      style: selectedStyle,
      product: selectedProduct,
      name: name,
      email: email,
      petName: document.getElementById('petName').value.trim(),
      petType: document.getElementById('petType').value.trim(),
      customText: document.getElementById('customText').value.trim(),
      // File will be uploaded separately
    };

    try {
      // First upload image to get a URL
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('upload_preset', 'devforge_pet'); // Cloudinary upload preset

      // Start with creating Stripe checkout
      const checkoutRes = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: selectedProduct,
          petName: document.getElementById('petName').value.trim(),
          customText: document.getElementById('customText').value.trim()
        })
      });

      if (!checkoutRes.ok) {
        throw new Error('Kunne ikke opprette betaling');
      }

      const checkoutData = await checkoutRes.json();

      // Redirect to Stripe Checkout
      window.location.href = checkoutData.url;

    } catch (err) {
      console.error('Order error:', err);
      loadingOverlay.classList.remove('active');
      alert('Beklager, noe gikk galt. Vennligst prøv igjen: ' + err.message);
    }
  });

  // --- Remove error on input ---
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = document.getElementById(input.id + 'Error');
      if (errorEl) errorEl.classList.remove('visible');
    });
  });

  // Handle URL plan param
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  if (planParam) {
    productOptions.forEach(opt => {
      if (opt.dataset.plan === planParam) {
        setTimeout(() => opt.click(), 100);
      }
    });
  }

});
