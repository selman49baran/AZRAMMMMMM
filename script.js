/**
 * ═══════════════════════════════════════════════════════════════
 * SELMAN & AZRA — Premium Romantic Website
 * Main JavaScript — Password, Timer, Gallery, Effects & Surprise
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ─── Configuration ─── */
  const CONFIG = {
    password: '3849',
    wrongPasswordMsg: '❤️ Yanlış şifre sevgilim :)',
    relationshipStart: new Date('2026-01-23T00:00:00'),
    galleryImages: [
      'assets/photo1.jpg',
      'assets/photo2.jpg',
      'assets/photo3.jpg'
    ]
  };

  /* ─── DOM References ─── */
  const passwordScreen = document.getElementById('password-screen');
  const passwordForm = document.getElementById('password-form');
  const passwordInput = document.getElementById('password-input');
  const passwordError = document.getElementById('password-error');
  const mainSite = document.getElementById('main-site');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const surpriseBtn = document.getElementById('surprise-btn');
  const surpriseOverlay = document.getElementById('surprise-overlay');

  /* ═══════════════════════════════════════════════════════════════
     PASSWORD SCREEN
     ═══════════════════════════════════════════════════════════════ */

  /**
   * Validates password and unlocks the main website with cinematic intro
   */
  function initPasswordScreen() {
    // Render stars on password screen
    initStarsCanvas('password-stars');

    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = passwordInput.value.trim();

      if (entered === CONFIG.password) {
        unlockWebsite();
      } else {
        showPasswordError();
      }
    });

    // Auto-focus password input
    passwordInput.focus();
  }

  /**
   * Shows wrong password error with shake animation
   */
  function showPasswordError() {
    passwordError.textContent = CONFIG.wrongPasswordMsg;
    passwordInput.value = '';
    passwordInput.classList.add('shake');
    passwordInput.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      passwordInput.style.animation = '';
      passwordInput.focus();
    }, 500);
  }

  /**
   * Unlocks main site with fade-out transition and cinematic overlay
   */
  function unlockWebsite() {
    passwordError.textContent = '';
    passwordScreen.classList.add('fade-out');

    setTimeout(() => {
      passwordScreen.style.display = 'none';
      mainSite.classList.remove('hidden');
      mainSite.setAttribute('aria-hidden', 'false');

      // Trigger reflow then show
      requestAnimationFrame(() => {
        mainSite.classList.add('visible');
      });

      // Initialize all main site features
      initMainSite();
    }, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════
     MAIN SITE INITIALIZATION
     ═══════════════════════════════════════════════════════════════ */

  function initMainSite() {
    initStarsCanvas('stars-canvas');
    initFloatingHearts();
    initSparkles();
    initSakuraPetals();
    initRelationshipTimer();
    initGallery();
    initDarkMode();
    initScrollReveal();
    initSurprise();
    removeCinematicOverlay();
  }

  /**
   * Removes cinematic overlay after animation completes
   */
  function removeCinematicOverlay() {
    const overlay = document.getElementById('cinematic-overlay');
    setTimeout(() => {
      if (overlay) overlay.remove();
    }, 4000);
  }

  /* ═══════════════════════════════════════════════════════════════
     ANIMATED STARS — Canvas particle system
     ═══════════════════════════════════════════════════════════════ */

  /**
   * Creates twinkling star field on a canvas element
   * @param {string} canvasId - ID of the canvas element
   */
  function initStarsCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    }

    function createStars() {
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.phase += star.speed;
        const twinkle = (Math.sin(star.phase) + 1) / 2;
        const alpha = star.opacity * (0.3 + twinkle * 0.7);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Pink tint on some stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 45, 117, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(drawStars);
    }

    resize();
    drawStars();
    window.addEventListener('resize', resize);

    // Store cleanup reference
    canvas._cleanup = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }

  /* ═══════════════════════════════════════════════════════════════
     FLOATING HEARTS
     ═══════════════════════════════════════════════════════════════ */

  function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const hearts = ['❤️', '💕', '💗', '💖', '💘'];

    function spawnHeart() {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '-40px';
      heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
      heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
      container.appendChild(heart);

      heart.addEventListener('animationend', () => heart.remove());
    }

    // Spawn hearts periodically
    setInterval(spawnHeart, 2000);
    // Initial batch
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnHeart, i * 400);
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     SPARKLES
     ═══════════════════════════════════════════════════════════════ */

  function initSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;

    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      sparkle.style.animationDelay = (Math.random() * 3) + 's';
      container.appendChild(sparkle);
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     SAKURA PETALS
     ═══════════════════════════════════════════════════════════════ */

  function initSakuraPetals() {
    const container = document.getElementById('sakura-container');
    if (!container) return;

    function spawnPetal() {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (Math.random() * 6 + 8) + 's';
      petal.style.width = (Math.random() * 8 + 8) + 'px';
      petal.style.height = petal.style.width;
      container.appendChild(petal);

      petal.addEventListener('animationend', () => petal.remove());
    }

    setInterval(spawnPetal, 800);
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnPetal, i * 200);
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     RELATIONSHIP TIMER — Live countdown since 23 Jan 2026
     ═══════════════════════════════════════════════════════════════ */

  function initRelationshipTimer() {
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');

    if (!daysEl) return;

    let prevSeconds = -1;

    function updateTimer() {
      const now = new Date();
      const diff = now - CONFIG.relationshipStart;

      if (diff < 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        secondsEl.textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = days;
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');

      // Tick animation on seconds change
      if (seconds !== prevSeconds) {
        secondsEl.classList.add('tick');
        setTimeout(() => secondsEl.classList.remove('tick'), 300);
        prevSeconds = seconds;
      }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════
     GALLERY LIGHTBOX — Fullscreen with arrow nav & ESC close
     ═══════════════════════════════════════════════════════════════ */

  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.remove('hidden');
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => lightbox.classList.add('hidden'), 400);
    }

    function updateLightboxImage() {
      lightboxImage.src = CONFIG.galleryImages[currentIndex];
      lightboxCounter.textContent = `${currentIndex + 1} / ${CONFIG.galleryImages.length}`;
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % CONFIG.galleryImages.length;
      updateLightboxImage();
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + CONFIG.galleryImages.length) % CONFIG.galleryImages.length;
      updateLightboxImage();
    }

    // Click gallery items to open
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        openLightbox(parseInt(item.dataset.index, 10));
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     DARK MODE — Toggle with localStorage persistence
     ═══════════════════════════════════════════════════════════════ */

  function initDarkMode() {
    const saved = localStorage.getItem('selman-azra-dark-mode');

    if (saved === 'true') {
      document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('selman-azra-dark-mode', isDark);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SCROLL REVEAL — Animate sections on scroll
     ═══════════════════════════════════════════════════════════════ */

  function initScrollReveal() {
    const sections = document.querySelectorAll('.section');

    sections.forEach((section) => {
      section.classList.add('reveal');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ═══════════════════════════════════════════════════════════════
     SURPRISE — Fireworks + Heart Rain + Final Message
     ═══════════════════════════════════════════════════════════════ */

  function initSurprise() {
    let surpriseActive = false;

    surpriseBtn.addEventListener('click', () => {
      if (surpriseActive) return;
      surpriseActive = true;

      surpriseOverlay.classList.remove('hidden');
      surpriseOverlay.setAttribute('aria-hidden', 'false');

      requestAnimationFrame(() => {
        surpriseOverlay.classList.add('active');
      });

      initFireworks();
      initHeartRain();

      // Close surprise on click after 8 seconds or on second click
      setTimeout(() => {
        surpriseOverlay.addEventListener('click', closeSurprise, { once: true });
      }, 3000);
    });

    function closeSurprise() {
      surpriseOverlay.classList.remove('active');
      setTimeout(() => {
        surpriseOverlay.classList.add('hidden');
        surpriseOverlay.setAttribute('aria-hidden', 'true');
        surpriseActive = false;
        document.getElementById('heart-rain').innerHTML = '';
      }, 600);
    }
  }

  /**
   * Canvas fireworks animation
   */
  function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff2d75', '#ff6b9d', '#ff9ec4', '#ffffff', '#ffd700'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += 0.05;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function createBurst(x, y) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const count = Math.floor(Math.random() * 40 + 30);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    let frameCount = 0;
    let animationId;

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch new fireworks periodically
      frameCount++;
      if (frameCount % 20 === 0) {
        createBurst(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.5
        );
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createBurst(
          canvas.width * (0.2 + Math.random() * 0.6),
          canvas.height * (0.2 + Math.random() * 0.4)
        );
      }, i * 300);
    }

    animate();

    // Stop after 12 seconds
    setTimeout(() => cancelAnimationFrame(animationId), 12000);
  }

  /**
   * Heart rain effect for surprise overlay
   */
  function initHeartRain() {
    const container = document.getElementById('heart-rain');
    if (!container) return;

    const hearts = ['❤️', '💕', '💗', '💖'];

    function spawnRainHeart() {
      const heart = document.createElement('span');
      heart.className = 'rain-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
      heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
      container.appendChild(heart);

      heart.addEventListener('animationend', () => heart.remove());
    }

    const rainInterval = setInterval(spawnRainHeart, 150);

    for (let i = 0; i < 30; i++) {
      setTimeout(spawnRainHeart, i * 100);
    }

    setTimeout(() => clearInterval(rainInterval), 10000);
  }

  /* ═══════════════════════════════════════════════════════════════
     BOOTSTRAP — Start the application
     ═══════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', () => {
    initPasswordScreen();
  });

})();
