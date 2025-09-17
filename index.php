<?php require __DIR__ . '/includes/lang.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($lang); ?>">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo htmlspecialchars($tr['title']); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($tr['desc']); ?>" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/styles.css" />
    <link rel="canonical" href="/" />
</head>
<body>
    <?php include __DIR__ . '/includes/header.php'; ?>

    <main>
        <!-- Hero_section -->
        <section id="inicio" class="section hero hero--bg">
            <div class="container hero__content">
                <div class="hero__text reveal">
                    <h1 class="hero__title">
                        <?php if (($lang ?? 'es') === 'es'): ?>
                            Recupera tu confianza con un cabello más
                            <span class="typed-wrapper">
                                <span id="typedWord" class="typed-word" aria-live="polite">saludable</span>
                                <span class="typed-cursor" aria-hidden="true">_</span>
                            </span>
                        <?php else: ?>
                            Restore your confidence with hair that's
                            <span class="typed-wrapper">
                                <span id="typedWord" class="typed-word" aria-live="polite">healthy</span>
                                <span class="typed-cursor" aria-hidden="true">_</span>
                            </span>
                        <?php endif; ?>
                    </h1>
                    <div class="hero__cta">
                        <a href="#contacto" class="btn btn--primary"><?php echo htmlspecialchars($tr['cta1']); ?></a>
                        <a href="#servicios" class="btn btn--ghost"><?php echo htmlspecialchars($tr['cta2']); ?></a>
                    </div>
                    <div class="hero__badges">
                        <span class="badge"><span class="badge__dot"></span><?php echo htmlspecialchars($tr['badge1']); ?></span>
                        <span class="badge"><span class="badge__dot"></span><?php echo htmlspecialchars($tr['badge2']); ?></span>
                        <span class="badge"><span class="badge__dot"></span><?php echo htmlspecialchars($tr['badge3']); ?></span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Ribbon under hero -->
        <section class="ribbon reveal" aria-label="Aviso destacado">
            <div class="container ribbon__inner">
                <div class="ribbon__glow" aria-hidden="true"></div>
                <div id="ribbonText" class="ribbon__chars" aria-label="LISTO PARA TU CAMBIO?"></div>
            </div>
        </section>

        <!-- Sección Comparador Antes/Después -->
    <section id="comparador" class="section section--xl reveal">
            <div class="container compare">
                <div class="compare__text">
                    <h2 class="section__title"><?php echo htmlspecialchars($tr['comparador_h2'] ?? 'Tratamiento y resultados'); ?></h2>
                    <p class="muted"><?php echo htmlspecialchars($tr['comparador_p'] ?? 'Abordamos la caída capilar con un plan integral: evaluamos la causa, definimos la técnica adecuada y acompañamos tu recuperación.'); ?></p>
                    <ul class="list">
                        <li><?php echo htmlspecialchars($tr['comparador_li1'] ?? 'Evaluación y diagnóstico precisos de la alopecia'); ?></li>
                        <li><?php echo htmlspecialchars($tr['comparador_li2'] ?? 'Solución personalizada (FUE/DHI, PRP y terapias combinadas)'); ?></li>
                        <li><?php echo htmlspecialchars($tr['comparador_li3'] ?? 'Beneficios: mayor densidad, naturalidad y confianza'); ?></li>
                    </ul>
                </div>
                <div class="compare__media">
                    <div class="ba" data-compare aria-label="Comparador de resultados">
                        <span class="ba__tag ba__tag--before"><?php echo htmlspecialchars($tr['antes'] ?? 'Antes'); ?></span>
                        <span class="ba__tag ba__tag--after"><?php echo htmlspecialchars($tr['despues'] ?? 'Después'); ?></span>
                        <img class="ba__img ba__img--after" src="assets/img/img5.webp" alt="Después" />
                        <img class="ba__img ba__img--before" src="assets/img/logoC.png" alt="Antes" />
                        <div class="ba__divider" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-label="Divisor del comparador"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Galería Parallax Sticky -->
        <section id="galeria" class="section parallax-gallery reveal" aria-label="Galería con paralaje">
            <div class="pg-wrap">
                <div class="pg__sticky">
                    <!-- Mensaje centrado -->
                    <div class="pg__center" aria-hidden="false">
                        <h3>¡Aquí inicia tu cambio!</h3>
                    </div>

                    <!-- Columnas de imágenes con diferentes velocidades -->
                    <div class="pg" role="group" aria-label="Galería de imágenes en columnas">
                        <div class="pg__col" data-pg-speed="0.8">
                            <div class="pg__track">
                                <figure class="pg__item" aria-label="Galería 1">
                                    <img src="assets/img/seccion2/img4.png" alt="Tratamiento capilar — imagen 1" loading="lazy" />
                                </figure>
                                <figure class="pg__item" aria-label="Galería 2">
                                    <img src="assets/img/seccion2/img5.png" alt="Tratamiento capilar — imagen 2" loading="lazy" />
                                </figure>
                            </div>
                        </div>

                        <div class="pg__col" data-pg-speed="0.6">
                            <div class="pg__track">
                                <figure class="pg__item" aria-label="Galería 3">
                                    <img src="assets/img/seccion2/img6.png" alt="Tratamiento capilar — imagen 3" loading="lazy" />
                                </figure>
                                <figure class="pg__item" aria-label="Galería 4">
                                    <img src="assets/img/seccion2/img7.png" alt="Tratamiento capilar — imagen 4" loading="lazy" />
                                </figure>
                            </div>
                        </div>

                        <div class="pg__col" data-pg-speed="1.0">
                            <div class="pg__track">
                                <figure class="pg__item" aria-label="Galería 5">
                                    <img src="assets/img/seccion2/img8.png" alt="Tratamiento capilar — imagen 5" loading="lazy" />
                                </figure>
                                <figure class="pg__item" aria-label="Galería 6">
                                    <img src="assets/img/seccion2/img15.png" alt="Tratamiento capilar — imagen 6" loading="lazy" />
                                </figure>
                            </div>
                        </div>

                        <div class="pg__col" data-pg-speed="0.9">
                            <div class="pg__track">
                                <figure class="pg__item" aria-label="Galería 7">
                                    <img src="assets/img/seccion2/img6 (1).png" alt="Tratamiento capilar — imagen 7" loading="lazy" />
                                </figure>
                                <figure class="pg__item" aria-label="Galería 8">
                                    <img src="assets/img/seccion2/img4.png" alt="Tratamiento capilar — imagen 8" loading="lazy" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        

        <!-- Resultados -->
    <section id="resultados" class="section section--alt reveal">
            <div class="container">
                <h2 class="section__title"><?php echo htmlspecialchars($tr['resultados_h2']); ?></h2>
                <div class="grid gallery">
                    <div class="gallery__item" aria-label="<?php echo htmlspecialchars(($tr['gallery_case'] ?? 'Caso') . ' 1'); ?>"></div>
                    <div class="gallery__item" aria-label="<?php echo htmlspecialchars(($tr['gallery_case'] ?? 'Caso') . ' 2'); ?>"></div>
                    <div class="gallery__item" aria-label="<?php echo htmlspecialchars(($tr['gallery_case'] ?? 'Caso') . ' 3'); ?>"></div>
                    <div class="gallery__item" aria-label="<?php echo htmlspecialchars(($tr['gallery_case'] ?? 'Caso') . ' 4'); ?>"></div>
                    <div class="gallery__item" aria-label="<?php echo htmlspecialchars(($tr['gallery_case'] ?? 'Caso') . ' 5'); ?>"></div>
                    <div class="gallery__item" aria-label="<?php echo htmlspecialchars(($tr['gallery_case'] ?? 'Caso') . ' 6'); ?>"></div>
                </div>
            </div>
        </section>

        <!-- Testimonios -->
    <section id="testimonios" class="section reveal">
            <div class="container">
                <h2 class="section__title"><?php echo htmlspecialchars($tr['testimonios_h2']); ?></h2>
                <div class="testimonials">
                    <blockquote class="testimonial">
                        <p><?php echo htmlspecialchars($tr['test1']); ?></p>
                        <footer>— Carlos R.</footer>
                    </blockquote>
                    <blockquote class="testimonial">
                        <p><?php echo htmlspecialchars($tr['test2']); ?></p>
                        <footer>— Andrea T.</footer>
                    </blockquote>
                </div>
            </div>
        </section>

        <!-- Equipo -->
        <section id="equipo" class="section section--alt reveal">
            <div class="container">
                <h2 class="section__title"><?php echo htmlspecialchars($tr['equipo_h2']); ?></h2>
                <p class="muted" style="margin-bottom:18px"><?php echo htmlspecialchars($tr['equipo_p']); ?></p>
                <div class="grid team">
                    <article class="member">
                        <div class="member__media">
                            <img src="assets/img/equipo1.jpg" alt="Dr. Nombre Apellido — Cirujano capilar" loading="lazy" />
                        </div>
                        <div class="member__body">
                            <h3 class="member__name">Dr. Nombre Apellido</h3>
                            <p class="member__role muted"><?php echo htmlspecialchars($tr['role1'] ?? 'Cirujano capilar · CMP 123456'); ?></p>
                            <ul class="member__tags">
                                <li>FUE/DHI</li>
                                <li><?php echo htmlspecialchars($tr['tag_cases800'] ?? '+800 casos'); ?></li>
                                <li><?php echo htmlspecialchars($tr['tag_trichology'] ?? 'Tricología'); ?></li>
                            </ul>
                            <p class="member__bio" data-collapsible>
                                Experiencia en técnicas de injerto capilar con enfoque en densidad y línea frontal natural. Miembro de sociedades internacionales.
                            </p>
                            <button class="btn btn--ghost member__toggle" type="button"><?php echo htmlspecialchars($tr['perfil_ver']); ?></button>
                        </div>
                    </article>

                    <article class="member">
                        <div class="member__media">
                            <img src="assets/img/equipo2.jpg" alt="Dra. Nombre Apellido — Médica tricóloga" loading="lazy" />
                        </div>
                        <div class="member__body">
                            <h3 class="member__name">Dra. Nombre Apellido</h3>
                            <p class="member__role muted"><?php echo htmlspecialchars($tr['role2'] ?? 'Médica tricóloga · CMP 654321'); ?></p>
                            <ul class="member__tags">
                                <li>PRP</li>
                                <li><?php echo htmlspecialchars($tr['tag_combined'] ?? 'Terapias combinadas'); ?></li>
                                <li><?php echo htmlspecialchars($tr['tag_years5'] ?? '+5 años'); ?></li>
                            </ul>
                            <p class="member__bio" data-collapsible>
                                Especialista en diagnóstico y tratamiento médico de alopecias, personalizando protocolos para cada caso.
                            </p>
                            <button class="btn btn--ghost member__toggle" type="button"><?php echo htmlspecialchars($tr['perfil_ver']); ?></button>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Servicios (movido más abajo) -->
    <section id="servicios" class="section reveal">
            <div class="container">
                <h2 class="section__title"><?php echo htmlspecialchars($tr['servicios_h2']); ?></h2>
                <div class="grid cards">
                    <article class="card">
                        <div class="card__icon" aria-hidden="true">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </div>
                        <h3><?php echo htmlspecialchars($tr['serv1']); ?></h3>
                        <p><?php echo htmlspecialchars($tr['serv1_p']); ?></p>
                    </article>
                    <article class="card">
                        <div class="card__icon" aria-hidden="true">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </div>
                        <h3><?php echo htmlspecialchars($tr['serv2']); ?></h3>
                        <p><?php echo htmlspecialchars($tr['serv2_p']); ?></p>
                    </article>
                    <article class="card">
                        <div class="card__icon" aria-hidden="true">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </div>
                        <h3><?php echo htmlspecialchars($tr['serv3']); ?></h3>
                        <p><?php echo htmlspecialchars($tr['serv3_p']); ?></p>
                    </article>
                </div>
            </div>
        </section>

        <!-- Contacto -->
    <section id="contacto" class="section section--accent reveal">
            <div class="container contact">
                <div class="contact__info">
                    <h2 class="section__title section__title--light"><?php echo htmlspecialchars($tr['contacto_h2']); ?></h2>
                    <p class="muted"><?php echo htmlspecialchars($tr['contacto_p']); ?></p>
                    <ul class="list">
                        <li><?php echo htmlspecialchars($tr['li1']); ?></li>
                        <li><?php echo htmlspecialchars($tr['li2']); ?></li>
                        <li><?php echo htmlspecialchars($tr['li3']); ?></li>
                    </ul>
                </div>
                <form id="contactForm" class="form" method="post" action="contacto.php" novalidate>
                    <div class="form__row">
                        <div class="form__field">
                            <label for="nombre"><?php echo htmlspecialchars($tr['nombre']); ?></label>
                            <input type="text" id="nombre" name="nombre" placeholder="<?php echo htmlspecialchars($tr['placeholder_nombre']); ?>" required />
                        </div>
                        <div class="form__field">
                            <label for="email"><?php echo htmlspecialchars($tr['email']); ?></label>
                            <input type="email" id="email" name="email" placeholder="tu@email.com" required />
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="form__field">
                            <label for="telefono"><?php echo htmlspecialchars($tr['tel']); ?></label>
                            <input type="tel" id="telefono" name="telefono" placeholder="<?php echo htmlspecialchars($tr['placeholder_tel']); ?>" />
                        </div>
                        <div class="form__field">
                            <label for="servicio"><?php echo htmlspecialchars($tr['serv_interes']); ?></label>
                            <select id="servicio" name="servicio">
                                <option value="<?php echo htmlspecialchars($tr['serv1']); ?>"><?php echo htmlspecialchars($tr['serv1']); ?></option>
                                <option value="<?php echo htmlspecialchars($tr['serv2']); ?>"><?php echo htmlspecialchars($tr['serv2']); ?></option>
                                <option value="<?php echo htmlspecialchars($tr['serv3']); ?>"><?php echo htmlspecialchars($tr['serv3']); ?></option>
                                <option value="<?php echo htmlspecialchars($tr['otro'] ?? 'Otro'); ?>"><?php echo htmlspecialchars($tr['otro'] ?? 'Otro'); ?></option>
                            </select>
                        </div>
                    </div>
                    <div class="form__field">
                        <label for="mensaje"><?php echo htmlspecialchars($tr['msg']); ?></label>
                        <textarea id="mensaje" name="mensaje" rows="4" placeholder="<?php echo htmlspecialchars($tr['placeholder_msg']); ?>" required></textarea>
                    </div>
                    <!-- Honeypot -->
                    <input type="text" name="empresa" id="empresa" class="hidden" tabindex="-1" autocomplete="off" />
                    <div class="form__actions">
                        <label class="checkbox">
                            <input type="checkbox" name="acepto" id="acepto" required />
                            <span><?php echo htmlspecialchars($tr['priv']); ?></span>
                        </label>
                        <button type="submit" class="btn btn--primary"><?php echo htmlspecialchars($tr['enviar']); ?></button>
                    </div>
                    <p id="formStatus" class="form__status" role="status" aria-live="polite"></p>
                </form>
            </div>
        </section>
    </main>

    <?php include __DIR__ . '/includes/footer.php'; ?>

    <script src="assets/js/theme.js"></script>
    <script src="assets/js/nav_header.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/parallax-gallery.js"></script>
    <script src="assets/js/utils.js"></script>
    <script src="assets/js/compare.js"></script>
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Doctor Cabello",
            "url": "https://doctorcabello.pe/",
            "image": "https://doctorcabello.pe/assets/img/doctor.jpg",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lima",
                "addressCountry": "PE"
            },
            "medicalSpecialty": ["Trichology", "CosmeticSurgery"],
            "employee": [
                {
                    "@type": "Person",
                    "name": "Dr. Nombre Apellido",
                    "jobTitle": "Cirujano capilar"
                },
                {
                    "@type": "Person",
                    "name": "Dra. Nombre Apellido",
                    "jobTitle": "Médica tricóloga"
                }
            ]
        }
        </script>
    <a class="fab" href="https://wa.me/51999999999" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="#0b0f14" d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.003C.122 5.281 5.403 0 12.057 0 18.71 0 24 5.281 24 11.834c0 6.552-5.29 11.833-11.943 11.833a11.95 11.95 0 01-6.002-1.62L.057 24z"/><path fill="#25D366" d="M20.52 17.352c-.297.835-1.472 1.528-2.04 1.627-.546.097-1.255.137-2.023-.127-.467-.154-1.068-.347-1.84-.675-3.239-1.395-5.345-4.655-5.507-4.873-.162-.217-1.316-1.75-1.316-3.34 0-1.59.835-2.377 1.13-2.704.296-.326.651-.408.869-.408.217 0 .434.002.625.012.201.01.469-.076.734.56.297.718 1.013 2.476 1.103 2.656.09.18.15.39.03.626-.12.236-.181.39-.356.601-.182.217-.38.487-.543.655-.177.177-.361.37-.156.726.206.355.916 1.508 1.97 2.44 1.354 1.166 2.496 1.53 2.852 1.708.356.177.563.148.773-.089.21-.236.89-1.035 1.13-1.39.237-.355.474-.296.792-.178.319.117 2.01.948 2.357 1.12.347.177.579.266.666.415.087.148.087.86-.21 1.696z"/></svg>
    </a>
    </body>
    </html>
