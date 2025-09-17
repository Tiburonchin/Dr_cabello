(function() {
    const root = document.querySelector('[data-compare]');
    if (!root) return;
    const divider = root.querySelector('.ba__divider');
    if (!divider) return;

    let active = false;
    const rect = () => root.getBoundingClientRect();
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const setPos = (p) => {
        root.style.setProperty('--pos', String(p));
        divider.style.left = `${p}%`;
        divider.setAttribute('aria-valuenow', String(Math.round(p)));
    };
    setPos(50);

    const posFromEvent = (e) => {
        const r = rect();
        const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        const x = clamp(clientX - r.left, 0, r.width);
        return (x / r.width) * 100;
    };

    const onDown = (e) => { active = true; divider.classList.add('is-dragging'); setPos(posFromEvent(e)); e.preventDefault(); };
    const onMove = (e) => { if (!active) return; setPos(posFromEvent(e)); e.preventDefault(); };
    const onUp = () => { active = false; divider.classList.remove('is-dragging'); };

    divider.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);

    divider.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    // Click-to-move on track
    root.addEventListener('click', (e) => {
        if (e.target === divider) return; // avoid double handling
        setPos(posFromEvent(e));
    });

    // Keyboard accessibility
    divider.addEventListener('keydown', (e) => {
        const step = (e.shiftKey ? 10 : 2);
        const current = parseFloat(getComputedStyle(root).getPropertyValue('--pos')) || 50;
        if (e.key === 'ArrowLeft') { setPos(clamp(current - step, 0, 100)); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setPos(clamp(current + step, 0, 100)); e.preventDefault(); }
        if (e.key === 'Home') { setPos(0); e.preventDefault(); }
        if (e.key === 'End') { setPos(100); e.preventDefault(); }
    });
})();
