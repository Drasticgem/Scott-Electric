/* ═══════════════════════════════════════════════════════════
   SCOTT ELECTRIC GROUP — Main JS
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM Ready ── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initNavShrink();
  }


  /* ══════════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════════ */
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav__hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', function () {
      const isOpen = menu.classList.contains('is-open');
      menu.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close when clicking a link
    menu.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', function () {
        menu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  /* ══════════════════════════════════════
     SMOOTH SCROLL
     ══════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // Account for sticky nav height
        var navHeight = document.querySelector('.nav')?.offsetHeight || 64;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      });
    });
  }


  /* ══════════════════════════════════════
     SCROLL REVEAL — IntersectionObserver
     ══════════════════════════════════════ */
  function initScrollReveal() {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ══════════════════════════════════════
     NAV SHRINK ON SCROLL
     ══════════════════════════════════════ */
  function initNavShrink() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var scrolled = false;

    function onScroll() {
      var shouldShrink = window.scrollY > 40;
      if (shouldShrink !== scrolled) {
        scrolled = shouldShrink;
        nav.style.boxShadow = scrolled ? '0 2px 16px rgba(15,32,64,0.25)' : 'none';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

})();
