<?php
/**
 * Zetlean Business — functions.php
 */
defined('ABSPATH') || exit;

/* ----------------------------------------------------------
   SETUP DEL TEMA
   ---------------------------------------------------------- */
function zetlean_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['script','style','search-form']);
    add_theme_support('custom-logo');
    register_nav_menus(['primary' => 'Menú principal']);
}
add_action('after_setup_theme', 'zetlean_setup');

/* ----------------------------------------------------------
   ENCOLAR CSS Y JS
   ---------------------------------------------------------- */
function zetlean_assets() {
    $uri = get_template_directory_uri();
    $v   = '1.0.0';

    // Google Fonts
    wp_enqueue_style('zetlean-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap',
        [], null
    );

    // CSS principal
    wp_enqueue_style('zetlean-css',
        $uri . '/assets/css/zetlean.css',
        ['zetlean-fonts'], $v
    );

    // JS principal (footer)
    wp_enqueue_script('zetlean-js',
        $uri . '/assets/js/zetlean.js',
        [], $v, true
    );

    // Variable PHP → JS con la URL de assets
    wp_localize_script('zetlean-js', 'zetleanVars', [
        'assetsUrl' => $uri . '/assets/',
    ]);
}
add_action('wp_enqueue_scripts', 'zetlean_assets');

/* ----------------------------------------------------------
   ELIMINAR ESTILOS DE WORDPRESS QUE INTERFIEREN
   ---------------------------------------------------------- */
function zetlean_remove_wp_styles() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('classic-theme-styles');
    wp_dequeue_style('global-styles');
}
add_action('wp_enqueue_scripts', 'zetlean_remove_wp_styles', 100);

// Eliminar inline global styles de Gutenberg
add_action('wp_enqueue_scripts', function() {
    remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
}, 1);
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

/* ----------------------------------------------------------
   PRECONNECT FONTS (performance)
   ---------------------------------------------------------- */
add_action('wp_head', function() { ?>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230D132B'/%3E%3Crect x='17' y='16' width='66' height='17' rx='8.5' fill='%237B3FF2'/%3E%3Cpolygon points='62,33 84,33 38,67 16,67' fill='%232D7CFF'/%3E%3Crect x='17' y='67' width='66' height='17' rx='8.5' fill='%237B3FF2'/%3E%3C/svg%3E">
<?php }, 1);

/* ----------------------------------------------------------
   META SEO BÁSICO (solo si no hay Yoast / RankMath)
   ---------------------------------------------------------- */
add_action('wp_head', function() {
    if (is_front_page() && !defined('WPSEO_VERSION') && !defined('RANK_MATH_VERSION')) { ?>
<meta name="description" content="Zetlean Business — Agencia de publicidad y marketing digital. 4 años, 80+ empresas en Bolivia y EE.UU. Campañas Ads, branding, contenido y desarrollo web.">
<meta property="og:title" content="Zetlean Business | Publicidad que Impulsa Resultados">
<meta property="og:description" content="Expertos en FB·IG Ads, creación de marcas y posicionamiento digital. CPA promedio menor a Bs 1.00.">
<meta property="og:type" content="website">
<?php }
});

/* ----------------------------------------------------------
   CLASE EN BODY PARA LA HOME
   ---------------------------------------------------------- */
add_filter('body_class', function($classes) {
    if (is_front_page() || is_home()) $classes[] = 'zetlean-page';
    return $classes;
});
