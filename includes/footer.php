<?php
// Pie de página con información de contacto
?>
<footer class="site-footer">
    <div class="container footer__grid">
        <div>
            <a href="#top" class="brand brand--invert">
                <span class="brand__logo" aria-hidden="true">DC</span>
                <span class="brand__name">Doctor Cabello</span>
            </a>
            <p class="muted"><?php echo isset($tr['desc']) ? htmlspecialchars($tr['desc']) : 'Especialistas en salud capilar e injerto de cabello.'; ?></p>
        </div>
        <div>
            <h4><?php echo htmlspecialchars($tr['footer_contact'] ?? 'Contacto'); ?></h4>
            <ul class="list list--plain">
                <li><a href="tel:+51999999999">+51 999 999 999</a></li>
                <li><a href="mailto:contacto@doctorcabello.pe">contacto@doctorcabello.pe</a></li>
                <li><?php echo htmlspecialchars($tr['footer_location'] ?? 'Lima, Perú'); ?></li>
            </ul>
        </div>
        <div>
            <h4><?php echo htmlspecialchars($tr['footer_social'] ?? 'Redes'); ?></h4>
            <ul class="list list--plain">
                <li><a href="#" rel="noopener">Instagram</a></li>
                <li><a href="#" rel="noopener">Facebook</a></li>
                <li><a href="#" rel="noopener">YouTube</a></li>
            </ul>
        </div>
    </div>
    <div class="container footer__legal">
    <small>© <span id="year"></span> Doctor Cabello. <?php echo htmlspecialchars($tr['footer_rights'] ?? 'Todos los derechos reservados.'); ?></small>
    <a class="muted" href="#"><?php echo htmlspecialchars($tr['footer_privacy'] ?? 'Política de privacidad'); ?></a>
    </div>
</footer>