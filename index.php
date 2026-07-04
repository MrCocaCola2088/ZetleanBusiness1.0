<?php get_header(); ?>
<div style="padding:140px 28px 80px;text-align:center;color:#fff;font-family:'Montserrat',sans-serif;">
  <h1 style="font-size:2rem;margin:0 0 16px;">Bienvenido a Zetlean Business</h1>
  <p style="color:#9099BD;max-width:500px;margin:0 auto 28px;line-height:1.6;">
    Para ver el sitio completo, ve a:<br>
    <strong>Ajustes → Lectura → Tu página de inicio muestra → Una página estática</strong><br>
    y selecciona cualquier página como "Página de inicio".
  </p>
  <a href="<?php echo esc_url(home_url('/')); ?>" style="display:inline-flex;align-items:center;gap:10px;padding:15px 30px;background:linear-gradient(115deg,#7B3FF2,#2D7CFF);color:#fff;border-radius:100px;font-weight:700;text-decoration:none;">
    Ir al inicio
  </a>
</div>
<?php get_footer(); ?>
