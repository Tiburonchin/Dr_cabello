// Navigation toggle
(function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!(navToggle && navMenu)) return;
    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close on in-page anchor click
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        if (navMenu.contains(a)) navMenu.classList.remove('is-open');
    });
})();

// Header shrink and offset management
(function() {
    const header = document.querySelector('.site-header');
    const setHeaderOffset = () => {
        if (!header) return;
        const h = header.offsetHeight;
        document.documentElement.style.setProperty('--header-offset', h + 'px');
        document.body.style.paddingTop = h + 'px';
    };
    const onScroll = () => {
        if (!header) return;
        const scrolled = window.scrollY > 12;
        const changed = header.classList.toggle('site-header--shrink', scrolled);
        if (changed) requestAnimationFrame(setHeaderOffset);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setHeaderOffset);
    window.addEventListener('load', () => setTimeout(setHeaderOffset, 0));
    setHeaderOffset();
    onScroll();

    const topbar = document.querySelector('.header__top');
    if (topbar) {
        topbar.addEventListener('transitionend', (ev) => {
            if (['max-height','opacity','transform'].includes(ev.propertyName)) setHeaderOffset();
        });
        let t;
        window.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(setHeaderOffset, 200); }, { passive: true });
    }
})();
