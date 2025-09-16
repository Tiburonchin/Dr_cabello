// Smooth scroll for internal links with header offset compensation
(function() {
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el) {
            e.preventDefault();
            const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || 0;
            const rect = el.getBoundingClientRect();
            const absoluteY = rect.top + window.scrollY;
            const targetY = Math.max(absoluteY - headerOffset + 1, 0);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    });
})();

// Language selector handling
(function() {
    const btn = document.getElementById('langToggle');
    const menu = document.getElementById('langMenu');
    const labelEl = document.getElementById('langLabel');
    if (!(btn && menu && labelEl)) return;

    const options = Array.from(menu.querySelectorAll('.lang__option'));
    const getLangFromQuery = () => new URLSearchParams(window.location.search).get('lang');
    const getStoredLang = () => window.localStorage.getItem('lang');
    const applyLang = (lang) => {
        if (!lang) return;
        document.documentElement.setAttribute('lang', lang);
        try { window.localStorage.setItem('lang', lang); } catch {}
        document.cookie = `lang=${lang}; path=/; max-age=${60*60*24*180}`;
    };
    const setActive = (lang, label) => {
        options.forEach(o => o.setAttribute('aria-selected', String(o.dataset.lang === lang)));
        labelEl.textContent = label || (lang === 'en' ? 'English' : 'Español');
    };
    const goToLang = (lang) => {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang || 'es');
        window.location.href = url.toString();
    };
    const closeMenu = () => {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', onDocClick);
        document.removeEventListener('keydown', onKey);
    };
    const onDocClick = (e) => { if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu(); };
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };

    const initial = (getLangFromQuery() || getStoredLang() || document.documentElement.lang || 'es').toLowerCase();
    const normalized = initial === 'en' ? 'en' : 'es';
    const initialLabel = normalized === 'en' ? 'English' : 'Español';
    applyLang(normalized);
    setActive(normalized, initialLabel);

    btn.addEventListener('click', () => {
        const open = !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (open) {
            setTimeout(() => {
                document.addEventListener('click', onDocClick, { once: false });
                document.addEventListener('keydown', onKey, { once: false });
            }, 0);
        } else {
            closeMenu();
        }
    });

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.dataset.lang;
            const label = opt.dataset.label;
            applyLang(lang);
            setActive(lang, label);
            closeMenu();
            goToLang(lang);
        });
    });
})();

// Footer year
(function() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Contact form AJAX
(function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');
    const htmlLang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
    const TEXT = htmlLang === 'en' ? {
        SENDING: 'Sending…',
        REQUIRED: 'Please complete the required fields.',
        SENT: 'Message sent! We will contact you soon.',
        FAIL: 'Could not send. Please try again.',
        NETERR: 'Network error. Please try again.'
    } : {
        SENDING: 'Enviando…',
        REQUIRED: 'Completa los campos obligatorios.',
        SENT: '¡Mensaje enviado! Te contactaremos pronto.',
        FAIL: 'No se pudo enviar. Intenta nuevamente.',
        NETERR: 'Error de red. Intenta nuevamente.'
    };
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.className = 'form__status';
        status.textContent = TEXT.SENDING;
        const fd = new FormData(form);
        const nombre = (fd.get('nombre') || '').toString().trim();
        const email = (fd.get('email') || '').toString().trim();
        const mensaje = (fd.get('mensaje') || '').toString().trim();
        const acepto = fd.get('acepto');
        if (!nombre || !email || !mensaje || !acepto) {
            status.textContent = TEXT.REQUIRED;
            status.classList.add('form__status--err');
            return;
        }
        try {
            const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.ok) {
                status.textContent = data.message || TEXT.SENT;
                status.classList.add('form__status--ok');
                form.reset();
            } else {
                status.textContent = (data && data.message) || TEXT.FAIL;
                status.classList.add('form__status--err');
            }
        } catch (err) {
            status.textContent = TEXT.NETERR;
            status.classList.add('form__status--err');
        }
    });
})();

// Toggle member bio
(function() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.member__toggle');
        if (!btn) return;
        const card = btn.closest('.member');
        if (!card) return;
        const bio = card.querySelector('[data-collapsible]');
        if (!bio) return;
        const open = bio.classList.toggle('is-open');
        const htmlLang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
        const labelShow = htmlLang === 'en' ? 'View profile' : 'Ver perfil';
        const labelHide = htmlLang === 'en' ? 'Hide' : 'Ocultar';
        btn.textContent = open ? labelHide : labelShow;
    });
})();

// Mark DOM as loaded to start CSS entrance animations
(function() { document.documentElement.classList.add('loaded'); })();
