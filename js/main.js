document.addEventListener('DOMContentLoaded', () => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    const focusableSelector = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

    function openMobile() {
        mobileNav.classList.add('open');
        burger.classList.add('active');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        const firstFocusable = mobileNav.querySelector(focusableSelector);
        if (firstFocusable) firstFocusable.focus();

        document.addEventListener('keydown', trapFocus);
    }

    function closeMobile() {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        document.removeEventListener('keydown', trapFocus);
        burger.focus();
    }

    function trapFocus(e) {
        if (e.key === 'Escape') {
            closeMobile();
            return;
        }

        if (e.key !== 'Tab') return;

        const focusables = [...mobileNav.querySelectorAll(focusableSelector)];
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    burger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
            closeMobile();
        } else {
            openMobile();
        }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobile);
    });

    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
        });
    });

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

    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > window.innerHeight);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
