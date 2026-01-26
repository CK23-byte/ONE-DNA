/**
 * ONE-DNA™ Kenniscentrum - Main JavaScript
 * Handles navigation, blog functionality, and UI interactions
 */

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (nav && nav.classList.contains('active') && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-toggle')) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// Blog Article Functions
function openArticle(articleId) {
    const blogList = document.querySelector('.blog-list');
    const articleView = document.getElementById('article-view');
    const allArticles = document.querySelectorAll('.article-content');
    const targetArticle = document.getElementById('article-' + articleId);

    if (blogList && articleView && targetArticle) {
        // Hide list, show article view
        blogList.style.display = 'none';
        articleView.style.display = 'block';

        // Hide all articles, show target
        allArticles.forEach(article => article.style.display = 'none');
        targetArticle.style.display = 'block';

        // Update URL hash
        history.pushState(null, '', '#' + articleId);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function closeArticle() {
    const blogList = document.querySelector('.blog-list');
    const articleView = document.getElementById('article-view');

    if (blogList && articleView) {
        blogList.style.display = 'block';
        articleView.style.display = 'none';

        // Clear URL hash
        history.pushState(null, '', window.location.pathname);

        // Scroll to article cards
        const articlesGrid = document.querySelector('.articles-grid');
        if (articlesGrid) {
            articlesGrid.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Handle URL hash on page load
function handleHashOnLoad() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById('article-' + hash)) {
        openArticle(hash);
    }
}

// Blog filter functionality
function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter articles
            articles.forEach(article => {
                if (filter === 'all' || article.dataset.category === filter) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip if it's a blog article link
            if (href.length > 1 && !this.onclick) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    handleHashOnLoad();
    initBlogFilters();
    initSmoothScroll();
    initHeaderScroll();
});
