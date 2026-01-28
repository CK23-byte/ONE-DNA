/**
 * ONE-DNA™ Norway Site - Main JavaScript
 * Handles navigation, language switching, and UI interactions
 */

(function() {
    'use strict';

    // ===== Mobile Menu =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') &&
                !e.target.closest('.nav') &&
                !e.target.closest('.menu-toggle')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== Language Switcher =====
    const langButtons = document.querySelectorAll('.lang-switch__btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            const currentPath = window.location.pathname;

            // Determine new path based on language
            let newPath;
            if (lang === 'no') {
                newPath = currentPath.replace(/\/(sv|en)\//, '/no/');
                if (!newPath.includes('/no/')) {
                    newPath = '/no/';
                }
            } else if (lang === 'sv') {
                newPath = currentPath.replace(/\/(no|en)\//, '/sv/');
                if (!newPath.includes('/sv/')) {
                    newPath = '/sv/';
                }
            }

            if (newPath && newPath !== currentPath) {
                window.location.href = newPath;
            }
        });
    });

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash without jumping
                    history.pushState(null, '', href);
                }
            }
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Optional: hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // ===== Current Year in Footer =====
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== Video Lazy Loading =====
    const videoContainers = document.querySelectorAll('.video-container[data-src]');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const iframe = container.querySelector('iframe');
                const src = container.dataset.src;

                if (iframe && src) {
                    iframe.src = src;
                }

                videoObserver.unobserve(container);
            }
        });
    }, { rootMargin: '100px' });

    videoContainers.forEach(container => {
        videoObserver.observe(container);
    });

    // ===== Print Friendly =====
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('details').forEach(d => d.open = true);
    });

    // ===== Accessibility: Reduce Motion =====
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    }

    // ===== Form Handling (if forms exist) =====
    const forms = document.querySelectorAll('form[data-ajax]');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn?.textContent;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sender...';
            }

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    form.reset();
                    alert('Takk for din henvendelse!');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Beklager, noe gikk galt. Prøv igjen senere.');
                console.error('Form error:', error);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    });

    // ===== Cookie Consent (Simple) =====
    const COOKIE_CONSENT_KEY = 'onedna_cookie_consent';

    function showCookieConsent() {
        if (localStorage.getItem(COOKIE_CONSENT_KEY)) return;

        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    function acceptCookies() {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    // Expose to global scope for onclick handlers
    window.acceptCookies = acceptCookies;

    // Show cookie consent after page load
    window.addEventListener('load', showCookieConsent);

})();
