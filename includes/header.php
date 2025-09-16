<?php
// Cabecera principal con topbar de redes y navegación
?>
<header class="site-header" id="top">
    <div class="header__top">
        <div class="container top__bar">
            <ul class="social" aria-label="<?php echo isset($tr['socials_aria']) ? htmlspecialchars($tr['socials_aria']) : 'Redes sociales'; ?>">
                <li>
                    <a href="#" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/></svg>
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.5 21v-7h2.5l.5-3.5h-3V8.6c0-1 .3-1.7 1.8-1.7H16V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V10H7v3.5h2.6V21h3.9z" fill="currentColor"/></svg>
                    </a>
                </li>
                <li>
                    <a href="mailto:contacto@doctorcabello.pe" aria-label="<?php echo isset($tr['email_aria']) ? htmlspecialchars($tr['email_aria']) : 'Correo'; ?>">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/>
                            <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </li>
            </ul>
            <div class="top__info"><?php echo isset($tr['brand_tag']) ? htmlspecialchars($tr['brand_tag']) : 'Centro Médico Especializado en transplante Capilar'; ?></div>
            <div class="top__controls">
                <div class="top__lang" aria-label="Selector de idioma">
                    <button id="langToggle" class="lang__toggle" aria-haspopup="listbox" aria-expanded="false">
                        <span class="lang__icon" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                        </span>
                        <span id="langLabel" class="lang__label"><?php echo (isset($lang) && strtolower($lang)==='en') ? 'English' : 'Español'; ?></span>
                        <span class="lang__caret" aria-hidden="true">▾</span>
                    </button>
                    <ul id="langMenu" class="lang__menu" role="listbox" aria-activedescendant="lang-es">
                        <li><button class="lang__option" id="lang-es" role="option" aria-selected="true" data-lang="es" data-label="Español">Español</button></li>
                        <li><button class="lang__option" id="lang-en" role="option" aria-selected="false" data-lang="en" data-label="English">English</button></li>
                    </ul>
                </div>
                <button class="theme-toggle" id="themeToggle" title="Toggle light/dark theme" aria-label="Toggle light/dark theme">
                    <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
            </div>
        </div>
    </div>
    <div class="container header__bar">
    <a href="index.php?lang=<?php echo htmlspecialchars(isset($lang)?$lang:'es'); ?>" class="brand" aria-label="<?php echo isset($tr['brand_home_aria']) ? htmlspecialchars($tr['brand_home_aria']) : 'Doctor Cabello inicio'; ?>">
            <img class="brand__img" src="assets/img/logoA.webp" alt="Doctor Cabello" />
        </a>
    <nav class="nav" aria-label="<?php echo isset($tr['nav_aria']) ? htmlspecialchars($tr['nav_aria']) : 'Principal'; ?>">
            <button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu"><?php echo isset($tr['menu']) ? htmlspecialchars($tr['menu']) : 'Menú'; ?></button>
            <ul id="navMenu" class="nav__list">
                <li><a href="#inicio"><?php echo isset($tr['nav_inicio']) ? htmlspecialchars($tr['nav_inicio']) : 'Inicio'; ?></a></li>
                <li><a href="#servicios"><?php echo isset($tr['nav_servicios']) ? htmlspecialchars($tr['nav_servicios']) : 'Servicios'; ?></a></li>
                <li><a href="#equipo"><?php echo isset($tr['nav_equipo']) ? htmlspecialchars($tr['nav_equipo']) : 'Equipo'; ?></a></li>
                <li><a href="#resultados"><?php echo isset($tr['nav_resultados']) ? htmlspecialchars($tr['nav_resultados']) : 'Resultados'; ?></a></li>
                <li><a href="#testimonios"><?php echo isset($tr['nav_testimonios']) ? htmlspecialchars($tr['nav_testimonios']) : 'Testimonios'; ?></a></li>
                <li><a href="#contacto" class="btn btn--contact"><?php echo isset($tr['nav_contacto']) ? htmlspecialchars($tr['nav_contacto']) : 'Contáctanos'; ?></a></li>
            </ul>
        </nav>
    </div>
</header>