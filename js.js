function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

// إضافة تأثيرات تفاعلية إضافية
document.addEventListener('DOMContentLoaded', function () {
  const colorItems = document.querySelectorAll('.color-item');

  colorItems.forEach(item => {
    // إضافة تأثير النقر
    item.addEventListener('click', function () {
      const colorName = this.querySelector('.color-name').textContent;
      alert(`تم نسخ اللون: ${colorName}`);

      // نسخ رمز اللون إلى الحافظة (يمكن إضافة هذه الميزة لاحقًا)
      // navigator.clipboard.writeText(colorName);
    });

    // تأثير إضافي عند التمرير
    item.addEventListener('mouseenter', function () {
      this.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', function () {
      this.style.zIndex = '1';
    });
  });
});



function copyHex(hex) {
  if (!hex) return;
  // copy
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(hex);
  } else {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = hex;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  // show toast
  const t = document.getElementById('copyToast');
  t.textContent = `Couleur copiée ${hex}`;
  t.classList.add('show');
  clearTimeout(window._copyTimeout);
  window._copyTimeout = setTimeout(() => t.classList.remove('show'), 1100);
}

// Add keyboard accessibility: Enter on swatches
document.querySelectorAll('.swatch').forEach(el => {
  el.setAttribute('tabindex', '0');
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyHex(el.getAttribute('data-hex'));
    }
  });
});


// === Slider "Avant/Après" ===
function initComparisonSliders() {
  document.querySelectorAll('.comparison-containerr').forEach(containerr => {
    const slider = containerr.querySelector('.slider');
    const handle = containerr.querySelector('.slider-handlered');
    const after = containerr.querySelector('.image-after');
    let dragging = false;

    const update = x => {
      const rect = containerr.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      after.style.width = pos + '%';
      slider.style.left = pos + '%';
    };

    // Gestion de la souris
    handle.addEventListener('mousedown', e => {
      dragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (dragging) update(e.clientX);
    });

    document.addEventListener('mouseup', () => (dragging = false));

    // Gestion du tactile
    handle.addEventListener('touchstart', e => {
      dragging = true;
      e.preventDefault();
    });

    document.addEventListener('touchmove', e => {
      if (dragging && e.touches.length > 0) update(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => (dragging = false));

    // Clic sur l'image pour déplacer le curseur
    containerr.addEventListener('click', e => {
      if (!dragging) {
        update(e.clientX);
      }
    });
  });
}

// === Carousell ===
const slidessContainerr = document.querySelector('.slidess');
const cardsss = document.querySelectorAll('.cardss');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
let interval;

function showSlide(index) {
  // إخفاء جميع الشرائح
  cardsss.forEach(cardss => {
    cardss.classList.remove('active');
  });

  // إزالة النشاط من جميع النقاط
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // إظهار الشريحة المطلوبة
  cardsss[index].classList.add('active');
  dots[index].classList.add('active');

  currentIndex = index;

  // إعادة تهيئة السلايدر للمقارنة - removed to prevent duplicate listeners
  // initComparisonSliders();
}

function nextSlide() {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= cardsss.length) {
    nextIndex = 0;
  }
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = cardsss.length - 1;
  }
  showSlide(prevIndex);
}

// إضافة أحداث النقر للنقاط
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// أحداث النقر للأزرار
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// التنقل باستخدام لوحة المفاتيح
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') prevSlide();
  if (e.key === 'ArrowLeft') nextSlide();
});

// التنقل التلقائي
function startAutoSlide() {
  interval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(interval);
  const section = document.querySelector(".contact-footer");
  const position = section.getBoundingClientRect().top;
  if (position < window.innerHeight - 100) {
    section.classList.add("visible");
  }
};


// Fade-in effect for footer

// إضافة تأثيرات تفاعلية بسيطة
document.addEventListener('DOMContentLoaded', function () {
  // تأثير عند التمرير على عناصر القائمة
  const listItems = document.querySelectorAll('.footer-column ul li');
  listItems.forEach(item => {
    item.addEventListener('mouseover', function () {
      this.style.transform = 'translateX(5px)';
    });

    item.addEventListener('mouseout', function () {
      this.style.transform = 'translateX(0)';
    });
  });


  // تأثير عند النقر على أيقونات وسائل التواصل الاجتماعي
  const socialIcons = document.querySelectorAll('.social-icons a');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  });
});


// clients témoignages slider

const tmCards = document.querySelectorAll('.tm-card');
const tmDots = document.querySelectorAll('.tm-dot');
const tmPrevo = document.getElementById('tm-prevo');
const tmNexti = document.getElementById('tm-nexti');

let tmCurrent = 0;

function showTmSlide(index) {
  tmCards.forEach(c => c.classList.remove('tm-active'));
  tmDots.forEach(d => d.classList.remove('tm-active'));
  tmCards[index].classList.add('tm-active');
  tmDots[index].classList.add('tm-active');
}

tmNexti.addEventListener('click', () => {
  tmCurrent = (tmCurrent + 1) % tmCards.length;
  showTmSlide(tmCurrent);
});

tmPrevo.addEventListener('click', () => {
  tmCurrent = (tmCurrent - 1 + tmCards.length) % tmCards.length;
  showTmSlide(tmCurrent);
});

tmDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    tmCurrent = i;
    showTmSlide(tmCurrent);
  });
});

// Auto défilement
setInterval(() => {
  tmCurrent = (tmCurrent + 1) % tmCards.length;
  showTmSlide(tmCurrent);
}, 7000);

