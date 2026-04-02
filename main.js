// Main Interactive Logic for Faith Community Church Website

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------
    // 1. Header: Scroll state (glass → solid shadow)
    // ----------------------------------------------------------------
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ----------------------------------------------------------------
    // 2. Scroll Reveal Animation (Intersection Observer)
    // ----------------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // animate once
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    // ----------------------------------------------------------------
    // 3. Staggered reveal for child elements (track-cards, etc.)
    // ----------------------------------------------------------------
    document.querySelectorAll('.track-grid, .testimonial-slider').forEach(grid => {
        const children = grid.querySelectorAll('.track-card, .testimonial-card');
        children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`;
        });
    });

    // ----------------------------------------------------------------
    // 4. Offering Page Interactivity
    // ----------------------------------------------------------------
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountGroup = document.getElementById('custom-amount-group');
    const customAmountInput = document.getElementById('custom-amount');
    const proceedBtn = document.getElementById('proceed-btn');

    if (amountButtons.length > 0) {
        amountButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                amountButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.dataset.amount === 'other') {
                    customAmountGroup.style.display = 'block';
                    customAmountInput.focus();
                } else {
                    customAmountGroup.style.display = 'none';
                    customAmountInput.value = '';
                }
            });
        });

        if (proceedBtn) {
            proceedBtn.addEventListener('click', () => {
                const category = document.getElementById('category').value;
                const activeButton = document.querySelector('.amount-btn.active');
                let amount = activeButton ? activeButton.dataset.amount : '';

                if (amount === 'other') {
                    amount = customAmountInput.value;
                }

                const frequency = document.querySelector('input[name="frequency"]:checked')?.value;

                if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
                    alert('Please enter a valid donation amount.');
                    return;
                }

                const confirmationMessage = `Thank you for choosing to support us!\n\nCategory: ${category.charAt(0).toUpperCase() + category.slice(1)}\nAmount: ₹${amount}\nFrequency: ${frequency?.replace('-', ' ') || 'one-time'}\n\nRedirecting to secure payment portal...`;

                console.log('Donation Data:', { category, amount, frequency });
                alert(confirmationMessage);
            });
        }
    }

    // ----------------------------------------------------------------
    // 5. Contact Form Interactivity
    // ----------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Contact Form Submission:', data);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! Our team will get back to you shortly.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

});

