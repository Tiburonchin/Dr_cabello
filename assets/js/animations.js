// Intersection reveal
(function() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// Parallax elements
(function() {
    const els = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;
    const parallax = () => {
        const vh = window.innerHeight;
        els.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.06');
            const rect = el.getBoundingClientRect();
            const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
            const y = -progress * speed * 100;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
        });
    };
    window.addEventListener('scroll', parallax, { passive: true });
    window.addEventListener('resize', parallax);
    parallax();
})();

// Ribbon scroll-based text animation
(function() {
    const container = document.getElementById('ribbonText');
    if (!container) return;
    const phrase = 'LISTO PARA TU CAMBIO?';
    const chars = Array.from(phrase);
    container.innerHTML = '';
    chars.forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'ribbon__char';
        span.textContent = ch;
        if (ch === ' ') span.style.width = '0.5em';
        container.appendChild(span);
    });

    const elements = Array.from(container.children);
    const centerIndex = Math.floor(elements.length / 2);

    let smoothed = 0, lastTarget = 0, momentum = 0, active = false, running = false;
    const SMOOTH = 0.12, INJECT = 0.6, MOMENTUM_DAMP = 0.965, EPS = 0.0003;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const rawProgress = () => {
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const start = vh * 0.15;
        const mid = vh * 0.5;
        let prog = (mid - rect.top) / (mid - start);
        return Math.min(1, Math.max(0, prog));
    };

    const render = (p) => {
        elements.forEach((el, index) => {
            const dist = index - centerIndex;
            const x = (1 - p) * dist * 110;
            const y = (1 - p) * Math.sign(dist) * Math.min(Math.abs(dist) * 12, 48);
            const rotZ = (1 - p) * dist * 18;
            const rotX = (1 - p) * (index % 2 === 0 ? 12 : -8);
            const rotY = (1 - p) * (dist * 2);
            const scale = 0.78 + p * 0.22;
            el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotate(${rotZ}deg) scale(${scale})`;
            el.style.opacity = String(p);
        });
    };

    const tick = () => {
        const target = rawProgress();
        const v = target - lastTarget;
        lastTarget = target;
        momentum = momentum * MOMENTUM_DAMP + v * INJECT;
        let targetWithMomentum = target + momentum;
        if (targetWithMomentum < 0) targetWithMomentum = 0;
        if (targetWithMomentum > 1) targetWithMomentum = 1;
        smoothed += (targetWithMomentum - smoothed) * SMOOTH;
        const p = easeOutCubic(smoothed);
        render(p);
        if (active || Math.abs(target - smoothed) > EPS || Math.abs(momentum) > EPS) {
            requestAnimationFrame(tick);
        } else {
            running = false;
        }
    };

    const start = () => {
        if (running) return;
        running = true;
        requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            active = e.isIntersecting;
            if (active) start();
        });
    }, { threshold: [0, 0.15, 0.5, 1] });
    obs.observe(container);

    start();
})();

// Hero typing effect for dynamic word (ES/EN)
(function() {
    const el = document.getElementById('typedWord');
    const cursor = document.querySelector('.typed-cursor');
    if (!el) return;

    const lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
    const words = lang.startsWith('en')
        ? ['strong', 'natural', 'youthful', 'healthy']
        : ['fuerte', 'natural', 'juvenil', 'saludable'];

    const typeSpeed = 140; // ms per character when typing (ligeramente más lento)
    const deleteSpeed = 90; // ms per character when deleting
    const holdTime = 1300; // ms to hold full word before deleting
    let wordIndex = 0;
    let charIndex = 0;
    let typing = true;

    const setText = (t) => { el.textContent = t; };

    const next = () => (wordIndex = (wordIndex + 1) % words.length);

    const tick = () => {
        const current = words[wordIndex];
        if (typing) {
            charIndex++;
            setText(current.slice(0, charIndex));
            if (charIndex < current.length) {
                setTimeout(tick, typeSpeed);
            } else {
                typing = false;
                setTimeout(tick, holdTime);
            }
        } else {
            charIndex--;
            setText(current.slice(0, Math.max(0, charIndex)));
            if (charIndex > 0) {
                setTimeout(tick, deleteSpeed);
            } else {
                typing = true;
                next();
                setTimeout(tick, typeSpeed);
            }
        }
    };

    // Small initial delay for nicer entrance
    setTimeout(tick, 350);

    // Blink cursor if present
    if (cursor) {
        cursor.classList.add('is-blinking');
    }
})();
