// ═══════════════════════════════════════════════════════
//  St. George Orthodox Church — Main Interactive Logic
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // 1. Header: Scroll state (glass → solid)
    // ─────────────────────────────────────────────
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ─────────────────────────────────────────────
    // 2. Mobile Menu Toggle
    // ─────────────────────────────────────────────
    const menuBtn   = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });

        // Close when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('open'));
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) {
                mobileNav.classList.remove('open');
            }
        });
    }

    // ─────────────────────────────────────────────
    // 3. Scroll Reveal Animation (Intersection Observer)
    // ─────────────────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    // ─────────────────────────────────────────────
    // 4. Staggered reveal for grid children
    // ─────────────────────────────────────────────
    const staggerParents = document.querySelectorAll(
        '.track-grid, .testimonial-slider, .values-grid, .clergy-grid, .services-preview-grid, .quick-links-grid, .about-stat-grid'
    );
    staggerParents.forEach(parent => {
        parent.querySelectorAll(':scope > *').forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.08}s`;
        });
    });

    // ─────────────────────────────────────────────
    // 5. Contact Form Interactivity
    // ─────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn  = contactForm.querySelector('button[type="submit"]');
            const formWrap   = document.getElementById('contact-form-wrap');
            const successBox = document.getElementById('form-success');

            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Sending...';
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                if (formWrap && successBox) {
                    formWrap.style.display = 'none';
                    successBox.classList.add('show');
                } else {
                    alert('Thank you for your message! Our parish team will get back to you within 24 hours. God bless you! 🙏');
                    contactForm.reset();
                }
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ─────────────────────────────────────────────
    // 6. Smooth scroll for anchor links
    // ─────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─────────────────────────────────────────────
    // 7. Active nav link highlighting
    // ─────────────────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ─────────────────────────────────────────────
    // 8. Card hover ripple effect (quick-link cards)
    // ─────────────────────────────────────────────
    document.querySelectorAll('.quick-link-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ─────────────────────────────────────────────
    // 9. Offering page: restore last active tab from hash
    // ─────────────────────────────────────────────
    if (document.getElementById('tab-shop')) {
        if (window.location.hash === '#shop') {
            // switchTab() is defined inline in offering.html
            if (typeof switchTab === 'function') switchTab('shop');
        }
    }

});
