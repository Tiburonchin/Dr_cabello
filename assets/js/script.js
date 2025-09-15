// Navegación móvil
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
	navToggle.addEventListener('click', () => {
		const open = navMenu.classList.toggle('is-open');
		navToggle.setAttribute('aria-expanded', String(open));
	});
}

	// Header shrink on scroll + fixed header offset handling
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
		// If class might change height, update offset soon after
		if (changed) {
			// microtask + next frame to ensure computed height
			requestAnimationFrame(() => setHeaderOffset());
		}
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', setHeaderOffset);
	// initial calc after fonts settle
	window.addEventListener('load', () => setTimeout(setHeaderOffset, 0));
	setHeaderOffset();
	onScroll();

	// Recalc after topbar transition ends to keep offset in sync
	const topbar = document.querySelector('.header__top');
	if (topbar) {
		topbar.addEventListener('transitionend', (ev) => {
			if (ev.propertyName === 'max-height' || ev.propertyName === 'opacity' || ev.propertyName === 'transform') {
				setHeaderOffset();
			}
		});
		// Fallback safety after scroll trigger
		let scrollTimer;
		window.addEventListener('scroll', () => {
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(setHeaderOffset, 200);
		}, { passive: true });
	}

	// Intersection Observer for reveal animations
	const io = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				io.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	document.querySelectorAll('.reveal').forEach(el => io.observe(el));

	// Parallax effect for elements with [data-parallax]
	const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
	const parallax = () => {
		const vh = window.innerHeight;
		parallaxEls.forEach(el => {
			const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.06');
			const rect = el.getBoundingClientRect();
			const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // center-based
			const y = -progress * speed * 100; // translate in px
			el.style.transform = `translate3d(0, ${y}px, 0)`;
		});
	};
	window.addEventListener('scroll', parallax, { passive: true });
	window.addEventListener('resize', parallax);
	parallax();

	// Ribbon scroll-based text animation (vanilla JS)
	(function() {
		const container = document.getElementById('ribbonText');
		if (!container) return;
		const phrase = 'LISTO PARA TU CAMBIO?';
		const chars = Array.from(phrase);
		container.innerHTML = '';
		chars.forEach((ch, i) => {
			const span = document.createElement('span');
			span.className = 'ribbon__char';
			span.textContent = ch;
			// add spacing for spaces
			if (ch === ' ') span.style.width = '0.5em';
			container.appendChild(span);
		});

		const elements = Array.from(container.children);
		const centerIndex = Math.floor(elements.length / 2);

		// Progress smoothing with rAF + momentum for fluid wheel scrolling
		let smoothed = 0; // smoothed progress 0..1
		let lastTarget = 0;
		let momentum = 0;
		let active = false;
		let running = false;

		const SMOOTH = 0.12;       // lower = more smoothing (slower to target)
		const INJECT = 0.6;        // how much new velocity feeds momentum
		const MOMENTUM_DAMP = 0.965; // closer to 1 = longer inertia
		const EPS = 0.0003;

		const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

		const rawProgress = () => {
			const rect = container.getBoundingClientRect();
			const vh = window.innerHeight || document.documentElement.clientHeight;
			const start = vh * 0.15; // begin slightly below top
			const mid = vh * 0.5;    // peak at middle of viewport
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

			// update momentum from input velocity and decay it
			momentum = momentum * MOMENTUM_DAMP + v * INJECT;

			// target plus momentum tail
			let targetWithMomentum = target + momentum;
			if (targetWithMomentum < 0) targetWithMomentum = 0;
			if (targetWithMomentum > 1) targetWithMomentum = 1;

			// smooth towards momentum-adjusted target
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

		// Observe visibility to avoid unnecessary work
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				active = e.isIntersecting;
				if (active) start();
			});
		}, { threshold: [0, 0.15, 0.5, 1] });
		obs.observe(container);

		// Kick off initial render
		start();
	})();

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
	const a = e.target.closest('a[href^="#"]');
	if (!a) return;
	const id = a.getAttribute('href');
	const el = document.querySelector(id);
	if (el) {
		e.preventDefault();
		// Smooth scroll with header offset compensation
		const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || 0;
		const rect = el.getBoundingClientRect();
		const absoluteY = rect.top + window.scrollY;
		const targetY = Math.max(absoluteY - headerOffset + 1, 0);
		window.scrollTo({ top: targetY, behavior: 'smooth' });
		if (navMenu) navMenu.classList.remove('is-open');
	}
});

	// Language selector handling
	(function() {
		const btn = document.getElementById('langToggle');
		const menu = document.getElementById('langMenu');
		const labelEl = document.getElementById('langLabel');
		if (!btn || !menu || !labelEl) return;

		const options = Array.from(menu.querySelectorAll('.lang__option'));
		const getLangFromQuery = () => new URLSearchParams(window.location.search).get('lang');
		const getStoredLang = () => window.localStorage.getItem('lang');
		const applyLang = (lang) => {
			if (!lang) return;
			document.documentElement.setAttribute('lang', lang);
			try { window.localStorage.setItem('lang', lang); } catch {}
			// set cookie for PHP to read
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
		const onDocClick = (e) => {
			if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
		};
		const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };

		// Initialize from query/localStorage/html
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
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form AJAX
const form = document.getElementById('contactForm');
if (form) {
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

		// simple validation
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
			const res = await fetch(form.action, {
				method: 'POST',
				body: fd,
				headers: { 'X-Requested-With': 'XMLHttpRequest' }
			});
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
}

	// Toggle member bio
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