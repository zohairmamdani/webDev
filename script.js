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

<<<<<<< HEAD
=======
  // Sticky quote CTA after hero
  const stickyQuote = document.getElementById('stickyQuote');
  const hero = document.querySelector('.hero');
  if (stickyQuote && hero) {
    const updateSticky = () => {
      const trigger = hero.offsetHeight * 0.65;
      stickyQuote.classList.toggle('visible', window.scrollY > trigger);
    };
    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
  }

>>>>>>> 22c0e0a (Replace results section with contact form UX enhancements)
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
<<<<<<< HEAD
=======


  // Contact form UX states
  const quoteForm = document.getElementById('quoteForm');
  const formStatus = document.getElementById('formStatus');
  if (quoteForm && formStatus) {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1') {
      formStatus.hidden = false;
      formStatus.className = 'form-status is-success';
      formStatus.textContent = 'Thanks! Your quote request was submitted successfully. We will follow up as soon as possible.';
    }

    quoteForm.addEventListener('submit', (event) => {
      const fields = quoteForm.querySelectorAll('input, textarea, select');
      fields.forEach((field) => field.classList.remove('field-invalid'));

      if (!quoteForm.checkValidity()) {
        event.preventDefault();
        formStatus.hidden = false;
        formStatus.className = 'form-status is-error';
        formStatus.textContent = 'Please review the highlighted fields and complete all required details before submitting.';

        fields.forEach((field) => {
          if (!field.checkValidity()) field.classList.add('field-invalid');
        });

        const firstInvalid = quoteForm.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
      }
    });

    quoteForm.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) field.classList.remove('field-invalid');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Case-study modal
  const modal = document.getElementById('caseModal');
  const caseTitle = document.getElementById('caseTitle');
  const caseSummary = document.getElementById('caseSummary');
  const caseResult = document.getElementById('caseResult');
  document.querySelectorAll('.case-trigger').forEach((card) => {
    card.addEventListener('click', () => {
      if (!modal) return;
      caseTitle.textContent = card.dataset.title || 'Case Study';
      caseSummary.textContent = card.dataset.summary || '';
      caseResult.textContent = card.dataset.result || '';
      modal.showModal();
    });
  });
>>>>>>> 22c0e0a (Replace results section with contact form UX enhancements)
})();
