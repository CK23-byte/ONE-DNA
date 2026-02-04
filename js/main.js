/**
 * ONE-DNA™ Knowledge Platform
 * Main JavaScript - Navigation, Language, and UI Interactions
 */

(function() {
    'use strict';

    // ================================
    // Mobile Menu
    // ================================
    window.toggleMobileMenu = function() {
        const mobileNav = document.getElementById('mobile-nav');
        const navToggle = document.querySelector('.nav__toggle');

        if (mobileNav && navToggle) {
            const isOpen = mobileNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            mobileNav.setAttribute('aria-hidden', !isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    };

    // Close mobile menu on link click
    document.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-nav a')) {
            const mobileNav = document.getElementById('mobile-nav');
            const navToggle = document.querySelector('.nav__toggle');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                navToggle.classList.remove('active');
                mobileNav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileNav = document.getElementById('mobile-nav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
            // Also close language dropdown
            const langDropdown = document.querySelector('.lang-dropdown');
            if (langDropdown && langDropdown.classList.contains('active')) {
                langDropdown.classList.remove('active');
            }
        }
    });

    // ================================
    // Language Dropdown
    // ================================
    window.toggleLangDropdown = function() {
        const dropdown = document.querySelector('.lang-dropdown');
        if (dropdown) {
            const isOpen = dropdown.classList.toggle('active');
            const toggle = dropdown.querySelector('.lang-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', isOpen);
            }
        }
    };

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.lang-dropdown');
        if (dropdown && !e.target.closest('.lang-dropdown')) {
            dropdown.classList.remove('active');
            const toggle = dropdown.querySelector('.lang-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ================================
    // Language Change
    // ================================
    window.changeLanguage = function(lang) {
        // Update current language display
        const currentLang = document.getElementById('currentLang');
        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
        }

        // Store preference
        localStorage.setItem('preferredLanguage', lang);

        // Update URL parameter
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);

        // Update page content if translations available
        if (typeof translations !== 'undefined' && translations[lang]) {
            updatePageLanguage(lang);
        }

        // Close dropdown
        const dropdown = document.querySelector('.lang-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    };

    function updatePageLanguage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;

        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = t[key];
                } else {
                    el.innerHTML = t[key];
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Initialize language on page load
    function initLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        let lang = urlParams.get('lang');

        // Fall back to localStorage
        if (!lang) {
            lang = localStorage.getItem('preferredLanguage');
        }

        // Fall back to browser language
        if (!lang) {
            const browserLang = navigator.language.split('-')[0];
            const supportedLangs = ['en', 'nl', 'de', 'sv', 'no', 'es', 'it', 'pt'];
            lang = supportedLangs.includes(browserLang) ? browserLang : 'en';
        }

        // Update display and translate
        const currentLang = document.getElementById('currentLang');
        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
        }

        if (typeof translations !== 'undefined' && translations[lang]) {
            updatePageLanguage(lang);
        }
    }

    // ================================
    // Header Scroll Effect
    // ================================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScroll = window.pageYOffset;

                    if (currentScroll > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }

                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ================================
    // Smooth Scroll
    // ================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or an onclick handler exists
                if (href === '#' || this.onclick) return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without triggering scroll
                    history.pushState(null, '', href);
                }
            });
        });
    }

    // Handle initial hash on page load
    function handleInitialHash() {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(function() {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // ================================
    // Scroll Reveal Animation
    // ================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ================================
    // Lazy Loading Images
    // ================================
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                img.src = img.dataset.src;
                img.loading = 'lazy';
            });
        } else {
            // Fallback with IntersectionObserver
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ================================
    // Blog Article Functions (Legacy)
    // ================================
    window.openArticle = function(articleId) {
        const blogList = document.querySelector('.blog-list');
        const blogFeatured = document.getElementById('blog-featured');
        const pageHeader = document.querySelector('.page-header--blog');
        const articleView = document.getElementById('article-view');
        const allArticles = document.querySelectorAll('.article-content');
        const targetArticle = document.getElementById('article-' + articleId);

        if (blogList && articleView && targetArticle) {
            blogList.style.display = 'none';
            if (blogFeatured) blogFeatured.style.display = 'none';
            if (pageHeader) pageHeader.style.display = 'none';
            articleView.style.display = 'block';

            allArticles.forEach(function(article) {
                article.style.display = 'none';
            });
            targetArticle.style.display = 'block';

            history.pushState(null, '', '#' + articleId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    window.closeArticle = function() {
        const blogList = document.querySelector('.blog-list');
        const blogFeatured = document.getElementById('blog-featured');
        const pageHeader = document.querySelector('.page-header--blog');
        const articleView = document.getElementById('article-view');

        if (blogList && articleView) {
            blogList.style.display = 'block';
            if (blogFeatured) blogFeatured.style.display = 'block';
            if (pageHeader) pageHeader.style.display = 'block';
            articleView.style.display = 'none';
            history.pushState(null, '', window.location.pathname);

            const articlesGrid = document.querySelector('.articles-grid');
            if (articlesGrid) {
                articlesGrid.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    function handleHashOnLoad() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById('article-' + hash)) {
            openArticle(hash);
        }
    }

    // ================================
    // Blog Filter Functions (Legacy)
    // ================================
    function initBlogFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const articles = document.querySelectorAll('.article-card[data-category]');

        if (filterBtns.length === 0) return;

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;

                filterBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');

                articles.forEach(function(article) {
                    if (filter === 'all' || article.dataset.category === filter) {
                        article.style.display = 'block';
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        });
    }

    // Handle back/forward navigation
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById('article-' + hash)) {
            openArticle(hash);
        } else {
            closeArticle();
        }
    });

    // ================================
    // Cookie Consent
    // ================================
    window.acceptCookies = function() {
        localStorage.setItem('cookieConsent', 'true');
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.style.display = 'none';
        }
    };

    function initCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            const banner = document.getElementById('cookie-consent');
            if (banner) {
                banner.style.display = 'block';
            }
        }
    }

    // ================================
    // Active Navigation Link
    // ================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href) {
                const linkPath = href.split('/').pop().split('#')[0];
                if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // ================================
    // Initialize Everything
    // ================================
    document.addEventListener('DOMContentLoaded', function() {
        initLanguage();
        initHeaderScroll();
        initSmoothScroll();
        handleInitialHash();
        initScrollReveal();
        initLazyLoading();
        initBlogFilters();
        handleHashOnLoad();
        initCookieConsent();
        setActiveNavLink();
    });

})();
