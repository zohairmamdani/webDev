(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Counter animation
  const counterEls = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.counter || 0);
    const duration = 1300;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    counterEls.forEach((el) => counterObserver.observe(el));
  } else {
    counterEls.forEach((el) => { el.textContent = el.dataset.counter || '0'; });
  }

  // Parallax motion
  if (!prefersReducedMotion) {
    const parallaxTargets = document.querySelectorAll('.orb');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxTargets.forEach((el, idx) => {
        const speed = (idx + 1) * 0.05;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    }, { passive: true });
  }

  // Testimonial slider
  const slides = document.getElementById('slides');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if (slides && prev && next) {
    const total = slides.children.length;
    let index = 0;
    let timer;

    const goTo = (i) => {
      index = (i + total) % total;
      slides.style.transform = `translateX(${-index * 100}%)`;
    };

    const auto = () => {
      if (prefersReducedMotion) return;
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 4600);
    };

    prev.addEventListener('click', () => { goTo(index - 1); auto(); });
    next.addEventListener('click', () => { goTo(index + 1); auto(); });

    goTo(0);
    auto();
  }
})();
