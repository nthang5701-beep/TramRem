document.addEventListener('DOMContentLoaded', function () {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const promoButtons = document.querySelectorAll('[data-promo-target]');
  const promoPanels = document.querySelectorAll('[data-promo-panel]');
  const popup = document.querySelector('.popup');
  const popupClose = document.querySelector('.popup-close');
  const popupForm = document.querySelector('.popup form');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });
  }

  promoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      promoButtons.forEach((btn) => btn.classList.remove('active'));
      promoPanels.forEach((panel) => panel.hidden = true);
      button.classList.add('active');
      const target = button.dataset.promoTarget;
      document.querySelector(`[data-promo-panel="${target}"]`).hidden = false;
    });
  });

  function openPopup() {
    if (popup) {
      popup.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  if (popupClose) {
    popupClose.addEventListener('click', () => {
      popup.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  setTimeout(openPopup, 4500);

  const slides = document.querySelectorAll('.slider-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const slideInterval = 5000;

  function updateSlider(index) {
    slides.forEach((slide, idx) => {
      slide.style.opacity = idx === index ? '1' : '0';
      slide.style.zIndex = idx === index ? '1' : '0';
    });
    sliderDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    updateSlider(next);
  }

  if (slides.length && sliderDots.length) {
    sliderDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => updateSlider(idx));
    });
    setInterval(nextSlide, slideInterval);
    updateSlider(0);
  }

  if (popupForm) {
    popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.');
      popup.classList.remove('open');
      document.body.style.overflow = '';
      popupForm.reset();
    });
  }
});
