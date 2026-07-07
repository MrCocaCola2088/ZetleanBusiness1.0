<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="brand">
          <svg viewBox="0 0 100 100" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="fgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A689FF"/><stop offset="1" stop-color="#2D7CFF"/></linearGradient></defs>
            <rect x="15" y="15" width="70" height="18" rx="9" fill="url(#fgrad)"/>
            <polygon points="61,33 85,33 39,67 15,67" fill="url(#fgrad)"/>
            <rect x="15" y="67" width="70" height="18" rx="9" fill="url(#fgrad)"/>
          </svg>
          <span class="brand-text"><strong>ZETLEAN</strong><span>BUSINESS</span></span>
        </a>
        <p>Publicidad que impulsa resultados. 4 años transformando marcas en Bolivia y EE.UU.</p>
        <div class="footer-socials">
          <a href="https://www.facebook.com/zetlean/?locale=es_LA" class="fs-ic" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="https://www.instagram.com/zetlean_business.m/" class="fs-ic" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="https://www.tiktok.com/@zetlean.business?_r=1&_t=ZS-97oneksoeG4" class="fs-ic" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 12.67 0V8.6a8.15 8.15 0 0 0 4.77 1.52V6.67a4.85 4.85 0 0 1-1-.02z"/></svg></a>
          <a href="https://wa.me/59175264049" class="fs-ic" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.875-1.418A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Servicios</h5>
        <ul>
          <li><a href="#servicios">Campañas FB · IG Ads</a></li>
          <li><a href="#servicios">Identidad de Marca</a></li>
          <li><a href="#servicios">Gestión de RRSS</a></li>
          <li><a href="#servicios">Desarrollo Web</a></li>
          <li><a href="#servicios">Diseño Creativo</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Empresa</h5>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#proceso">Proceso</a></li>
          <li><a href="#planes">Planes y precios</a></li>
          <li><a href="#preguntas">Preguntas frecuentes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Herramientas</h5>
        <ul>
          <li><a href="#calculadora">Calculadora CPA</a></li>
          <li><a href="#planes">Comparar planes</a></li>
        </ul>
        <h5 style="margin-top:24px">Legal</h5>
        <ul>
          <li><a href="<?php echo esc_url(get_privacy_policy_url() ?: '#'); ?>">Política de privacidad</a></li>
          <li><a href="#">Términos de servicio</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <?php echo date('Y'); ?> Zetlean Business. Todos los derechos reservados.</span>
      <span>Hecho con ❤ en Bolivia para el mundo</span>
    </div>
  </div>
</footer>
<div class="cursor-ring" id="cursorRing"></div>
</main>
<?php wp_footer(); ?>
</body>
</html>
