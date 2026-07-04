<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="preloader">
  <svg viewBox="0 0 100 100" class="preloader-logo">
    <defs>
      <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#7B3FF2"/><stop offset="1" stop-color="#2D7CFF"/>
      </linearGradient>
    </defs>
    <rect x="15" y="15" width="70" height="18" rx="9" fill="url(#pgrad)" class="z-bar z-bar-1"/>
    <polygon points="61,33 85,33 39,67 15,67" fill="url(#pgrad)" class="z-bar z-bar-2"/>
    <rect x="15" y="67" width="70" height="18" rx="9" fill="url(#pgrad)" class="z-bar z-bar-3"/>
  </svg>
</div>

<div class="bg-fx" aria-hidden="true">
  <canvas id="bg-canvas"></canvas>
  <div class="bg-glow" id="bg-glow"></div>
  <div class="bg-blob blob-1"></div>
  <div class="bg-blob blob-2"></div>
  <div class="bg-blob blob-3"></div>
  <div class="bg-grid"></div>
</div>

<header class="nav" id="nav">
  <div class="container">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="navgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A689FF"/><stop offset="1" stop-color="#2D7CFF"/></linearGradient></defs>
        <rect x="15" y="15" width="70" height="18" rx="9" fill="url(#navgrad)"/>
        <polygon points="61,33 85,33 39,67 15,67" fill="url(#navgrad)"/>
        <rect x="15" y="67" width="70" height="18" rx="9" fill="url(#navgrad)"/>
      </svg>
      <span class="brand-text"><strong>ZETLEAN</strong><span>BUSINESS</span></span>
    </a>
    <nav class="nav-links" id="navLinks">
      <a href="#inicio" class="active">Inicio</a>
      <a href="#servicios">Servicios</a>
      <a href="#proceso">Proceso</a>
      <a href="#calculadora">Calculadora</a>
      <a href="#planes">Planes</a>
      <a href="#preguntas">Preguntas</a>
      <a href="#contacto">Contacto</a>
    </nav>
    <div class="nav-actions">
      <a href="#contacto" class="btn btn-primary btn-sm">
        <span class="btn-label">Cotiza tu proyecto</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <button class="nav-burger" id="navBurger" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<div class="nav-scrim" id="navScrim"></div>
<main id="main">
