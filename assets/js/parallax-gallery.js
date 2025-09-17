// Sticky Parallax Gallery behavior (extracted)
(function() {
    const section = document.getElementById('galeria');
    if (!section) return;
    const sticky = section.querySelector('.pg__sticky');
    const cols = Array.from(section.querySelectorAll('.pg__col'));
    const center = section.querySelector('.pg__center h3');
    if (!(sticky && cols.length)) return;

    // Duplicate children inside track to enable seamless looping
    cols.forEach((col) => {
        let track = col.querySelector('.pg__track');
        if (!track) {
            // Backward compat: wrap existing items if track missing
            const items = Array.from(col.children);
            track = document.createElement('div');
            track.className = 'pg__track';
            items.forEach(n => track.appendChild(n));
            col.appendChild(track);
        }
        // Avoid flicker during setup
        track.style.visibility = 'hidden';
        // Initialize base length only once to avoid re-cloning clones
        if (!track.dataset.baseLen) {
            const baseLen = track.children.length;
            track.dataset.baseLen = String(baseLen);
        }
        const baseLen = parseInt(track.dataset.baseLen || '0');
        const originals = Array.from(track.children).slice(0, baseLen);
        // Decide desired repeats: more on mobile for smoother wrap (initial)
        const wantsRepeats = window.matchMedia('(max-width: 680px)').matches ? 3 : 2;
        const initialTarget = Math.max(baseLen * wantsRepeats, baseLen);
        while (track.children.length < initialTarget) {
            originals.forEach(node => {
                if (track.children.length < initialTarget) {
                    track.appendChild(node.cloneNode(true));
                }
            });
        }
        // After initial repeats, ensure segment height comfortably exceeds column height
        const colH = col.clientHeight || col.getBoundingClientRect().height || (window.innerHeight || 800);
        let repeats = wantsRepeats;
        let segmentH = Math.max(1, (track.scrollHeight || 1) / repeats);
        // We want total repeated height to be at least (colH + segmentH) to avoid blank areas at both ends
        let minRepeats = Math.max(repeats, Math.ceil(1 + (colH / segmentH)));
        const finalTarget = baseLen * minRepeats;
        while (track.children.length < finalTarget) {
            originals.forEach(node => {
                if (track.children.length < finalTarget) {
                    track.appendChild(node.cloneNode(true));
                }
            });
        }
        // Save repeats for render calculations
        track.dataset.repeats = String(minRepeats);
    });

    // Compute progress 0..1 of sticky section being in viewport
    const progress = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || 0;
        const wrap = section.querySelector('.pg-wrap');
        const wrapRect = (wrap || section).getBoundingClientRect();
        // "Sticky activo" cuando el sticky llena la pantalla: top≈headerOffset y bottom>vh
        const stickyRect = sticky.getBoundingClientRect();
        const stickyTop = Math.round(stickyRect.top);
        const stickyActive = (stickyTop <= headerOffset + 1) && (wrapRect.bottom >= vh - 1) && (wrapRect.top <= headerOffset + 1);
        if (!stickyActive) return -1; // fuera de la fase pegada
        // Normalizar 0..1 dentro del tramo pegado
        const totalPinned = Math.max(1, wrapRect.height - (vh - headerOffset));
        const traveled = Math.min(totalPinned, Math.max(0, (headerOffset - wrapRect.top)));
        return Math.min(1, Math.max(0, traveled / totalPinned));
    };

    let ticking = false;
    let smoothed = 0; // smoothed progress for easing
    let hasInit = false;
    const render = () => {
        ticking = false;
        const pRaw = progress();
        // Clamp negative progress to 0 so we pre-position before sticky engages
        const p = pRaw < 0 ? 0 : pRaw;
        // Ease progress on mobile to avoid aggressive jumps
        const isMobile = window.matchMedia('(max-width: 680px)').matches;
        const SMOOTH = isMobile ? 0.12 : 0.22;
        const EPS = 0.0015;
        if (!hasInit) { smoothed = p; hasInit = true; }
        smoothed += (p - smoothed) * SMOOTH;
        const sp = smoothed;
        // Columns move with modular wrapping of track content
        cols.forEach((col, idx) => {
            const base = Math.abs(parseFloat(col.getAttribute('data-pg-speed') || '0.8'));
            const speedFactor = isMobile ? 0.55 : 1; // slower on mobile for smoothness
            const speed = base * speedFactor;
            const dir = (idx % 2 === 0) ? -1 : 1; // pares suben, impares bajan
            const track = col.querySelector('.pg__track');
            if (!track) return;
            // Medir altura de un ciclo basado en repeticiones apuntadas
            const repeats = Math.max(1, parseInt(track.dataset.repeats || '2'));
            const cycle = (track.scrollHeight || 1) / repeats;
            const t = (sp - 0.5) * 2; // -1..1 (smoothed)
            const shift = t * speed * dir; // -speed..speed con dirección
            const px = shift * cycle; // traducir a px en el ciclo
            // Aplicar movimiento envolvente usando un modulo manual
            let y = px % cycle;
            if (y > 0) y -= cycle; // mantener en rango (-cycle, 0]
            track.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
            // Reveal track after first transform is applied to avoid jump
            if (track.style.visibility === 'hidden') track.style.visibility = 'visible';
        });

        if (center) {
            // Fade in towards center (p≈0.5) and out towards edges
            const d = Math.abs((sp - 0.5) * 2); // 1 en extremos, 0 en centro
            const a = 1 - Math.min(1, d);
            const ty = (1 - a) * 20; // slight vertical drift
            center.style.setProperty('--pg-center-a', (0.18 + a * 0.72).toFixed(3));
            center.style.setProperty('--pg-center-y', ty.toFixed(1) + 'px');
        }

        // Continue easing until we reach the target progress
        if (Math.abs(p - sp) > EPS) {
            requestAnimationFrame(render);
        }
    };

    const onScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(render);
        }
    };
    const onResize = onScroll;

    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                window.addEventListener('scroll', onScroll, { passive: true });
                window.addEventListener('resize', onResize);
                onScroll();
            } else {
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onResize);
            }
        });
    }, { threshold: [0, 0.2, 0.5, 0.8, 1] });
    io.observe(section);

    // Initial paint (pre-position even before sticky phase)
    render();
})();
