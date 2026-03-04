document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Sticky header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    // Burger menu
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');

    burger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        burger.classList.toggle('active');
        burger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    window.closeMobile = function () {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    // Catalogue cards — scroll to CTA
    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form submission
    const form = document.getElementById('ctaForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (form.querySelector('input[name="website"]').value) return;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляем...';

        setTimeout(() => {
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        }, 800);
    });
});
