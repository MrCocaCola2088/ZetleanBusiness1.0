/* ============================================================
   ZETLEAN BUSINESS — MAIN JAVASCRIPT
   ============================================================ */

/* --- PRELOADER --- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
    document.body.style.overflow = '';
  }, 900);
});
document.body.style.overflow = 'hidden';

/* --- CANVAS PARTICLE BACKGROUND --- */
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const COUNT = 72;
  const COLORS = ['rgba(123,63,242,', 'rgba(45,124,255,', 'rgba(166,137,255,'];

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function rand(a, b){ return Math.random() * (b - a) + a; }

  for(let i = 0; i < COUNT; i++){
    particles.push({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(1.2, 3.6),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.18, 0.18),
      c: COLORS[Math.floor(rand(0, 3))],
      a: rand(0.25, 0.65)
    });
  }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // update glow
    const g = document.getElementById('bg-glow');
    const px = (e.clientX / window.innerWidth * 100).toFixed(1);
    const py = (e.clientY / window.innerHeight * 100).toFixed(1);
    g.style.setProperty('--mx', px + '%');
    g.style.setProperty('--my', py + '%');
    g.style.background = `radial-gradient(420px circle at ${px}% ${py}%, rgba(123,63,242,.16), transparent 60%)`;
  });

  function drawLine(p1, p2, dist){
    const alpha = (1 - dist / 140) * 0.22;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(123,63,242,${alpha})`;
    ctx.lineWidth = 0.7;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function loop(){
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      // repel from mouse
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 90){
        const force = (90 - dist) / 90 * 0.6;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = W; if(p.x > W) p.x = 0;
      if(p.y < 0) p.y = H; if(p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = p.c + p.a + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    // connections
    for(let i = 0; i < particles.length; i++){
      for(let j = i+1; j < particles.length; j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < 140) drawLine(particles[i], particles[j], d);
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* --- CUSTOM CURSOR --- */
(function(){
  const ring = document.getElementById('cursorRing');
  if(!ring) return;
  let rx = 0, ry = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  document.addEventListener('mousedown', () => ring.classList.add('clicked'));
  document.addEventListener('mouseup', () => ring.classList.remove('clicked'));
  function animateCursor(){
    rx += (tx - rx) * 0.16;
    ry += (ty - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.addEventListener('mouseleave', () => ring.style.opacity = '0');
  document.addEventListener('mouseenter', () => ring.style.opacity = '1');
})();

/* --- NAV SCROLL & MOBILE --- */
(function(){
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  const scrim = document.getElementById('navScrim');
  let open = false;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  function toggleMenu(){
    open = !open;
    burger.classList.toggle('open', open);
    links.classList.toggle('open', open);
    scrim.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', toggleMenu);
  scrim.addEventListener('click', toggleMenu);
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if(open) toggleMenu(); }));

  // active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAs = links.querySelectorAll('a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        navAs.forEach(a => a.classList.remove('active'));
        const active = links.querySelector(`a[href="#${e.target.id}"]`);
        if(active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach(s => io.observe(s));
})();

/* --- REVEAL ON SCROLL --- */
(function(){
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  if(!revealEls.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
})();

/* --- COUNTER ANIMATION --- */
(function(){
  const counterEls = document.querySelectorAll('[data-count]');
  function animCount(el){
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dec = parseInt(el.dataset.decimals || '0');
    const dur = 1800;
    const start = performance.now();
    function step(now){
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = target * ease;
      el.textContent = (dec ? val.toFixed(dec) : Math.round(val)) + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ animCount(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  counterEls.forEach(el => io.observe(el));
})();

/* --- CHART ANIMATION --- */
(function(){
  const wrap = document.getElementById('chartWrap');
  const budgetFill = document.getElementById('budgetFill');
  if(!wrap) return;
  const io = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      wrap.classList.add('drawn');
      if(budgetFill) setTimeout(() => { budgetFill.style.width = '72%'; }, 400);
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(wrap);
})();

/* --- SERVICES TABS --- */
(function(){
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if(panel) panel.classList.add('active');
    });
  });
})();

/* --- PRICING CAROUSEL + CATEGORY TABS --- */
(function(){
  const allCards = [...document.querySelectorAll('.plan-card[data-cat]')];
  const cardsTrack = document.getElementById('planCards');
  const prevBtn = document.getElementById('prevPlan');
  const nextBtn = document.getElementById('nextPlan');
  const dotsEl = document.getElementById('ccDots');
  const planTabs = document.querySelectorAll('.plan-tab[data-category]');
  let currentCat = 'ads';
  let offset = 0;
  let visibleCards = [];

  function getPerPage(){
    const w = window.innerWidth;
    if(w < 640) return 1;
    if(w < 980) return 2;
    return 3;
  }

  function filterAndRender(cat){
    currentCat = cat;
    offset = 0;
    // show/hide cards
    visibleCards = allCards.filter(c => c.dataset.cat === cat);
    allCards.forEach(c => c.style.display = c.dataset.cat === cat ? 'flex' : 'none');
    buildDots();
    applyOffset();
  }

  function buildDots(){
    const perPage = getPerPage();
    const total = Math.ceil(visibleCards.length / perPage);
    dotsEl.innerHTML = '';
    for(let i = 0; i < total; i++){
      const d = document.createElement('span');
      d.className = 'cc-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => { offset = i; applyOffset(); });
      dotsEl.appendChild(d);
    }
  }

  function applyOffset(){
    const perPage = getPerPage();
    const maxOffset = Math.max(0, Math.ceil(visibleCards.length / perPage) - 1);
    offset = Math.max(0, Math.min(offset, maxOffset));
    const cardW = visibleCards.length ? visibleCards[0].offsetWidth : 0;
    const gap = 22;
    // determine shift: jump by 'perPage' cards
    const shift = offset * perPage * (cardW + gap);
    cardsTrack.style.transform = `translateX(-${shift}px)`;
    // dots
    dotsEl.querySelectorAll('.cc-dot').forEach((d, i) => d.classList.toggle('active', i === offset));
  }

  prevBtn.addEventListener('click', () => { offset--; applyOffset(); });
  nextBtn.addEventListener('click', () => { offset++; applyOffset(); });
  window.addEventListener('resize', () => { buildDots(); applyOffset(); });

  planTabs.forEach(t => {
    t.addEventListener('click', () => {
      planTabs.forEach(tt => tt.classList.remove('active'));
      t.classList.add('active');
      filterAndRender(t.dataset.category);
    });
  });

  filterAndRender('ads');
})();

/* --- CPA CALCULATOR --- */
(function(){
  const budget = document.getElementById('calcBudget');
  const cpm    = document.getElementById('calcCPM');
  const ctr    = document.getElementById('calcCTR');
  const conv   = document.getElementById('calcConv');
  const sector = document.getElementById('calcSector');
  const cpmV   = document.getElementById('cpmVal');
  const ctrV   = document.getElementById('ctrVal');
  const convV  = document.getElementById('convVal');

  function updateRangeTrack(input){
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const val = parseFloat(input.value);
    const pct = ((val - min) / (max - min) * 100).toFixed(1);
    input.style.setProperty('--val', pct + '%');
  }

  function calc(){
    const b = parseFloat(budget.value) || 850;
    const cpmVal = parseFloat(cpm.value) || 12;
    const ctrVal = parseFloat(ctr.value) || 4.6;
    const convVal = parseFloat(conv.value) || 8;
    const sectorMult = parseFloat(sector.value) || 1;

    const impressions = Math.round((b / cpmVal) * 1000);
    const clicks = Math.round(impressions * (ctrVal / 100));
    const conversions = Math.round(clicks * (convVal / 100) * sectorMult);
    const cpa = conversions > 0 ? (b / conversions) : 0;
    const roas = cpa > 0 ? (4.5 / cpa).toFixed(1) : '∞';

    document.getElementById('resImpr').textContent = impressions.toLocaleString('es-BO');
    document.getElementById('resClics').textContent = clicks.toLocaleString('es-BO');
    document.getElementById('resConv').textContent = conversions.toLocaleString('es-BO');
    document.getElementById('resROAS').textContent = roas + 'x';

    const cpaEl = document.getElementById('resCPA');
    const cpaTag = document.getElementById('resCPATag');
    cpaEl.textContent = cpa > 0 ? cpa.toFixed(2) : '—';
    if(cpa > 0 && cpa < 1){
      cpaTag.textContent = '✅ Dentro del objetivo (< Bs 1.00)';
      cpaTag.className = 'result-cpa-tag good';
    } else if(cpa >= 1){
      cpaTag.textContent = '⚠️ Por encima del objetivo — ajusta los parámetros';
      cpaTag.className = 'result-cpa-tag warn';
    } else {
      cpaTag.textContent = '—';
      cpaTag.className = 'result-cpa-tag';
    }
  }

  [budget, cpm, ctr, conv, sector].forEach(el => {
    if(!el) return;
    el.addEventListener('input', () => {
      if(el === cpm){ cpmV.textContent = cpm.value; updateRangeTrack(cpm); }
      if(el === ctr){ ctrV.textContent = parseFloat(ctr.value).toFixed(1); updateRangeTrack(ctr); }
      if(el === conv){ convV.textContent = parseFloat(conv.value).toFixed(1); updateRangeTrack(conv); }
      calc();
    });
    if(el.type === 'range') updateRangeTrack(el);
  });
  calc();
})();

/* --- FAQ ACCORDION --- */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

/* --- CONTACT FORM SUBMIT --- */
function submitForm(){
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const service = document.getElementById('fservice').value;
  if(!name || !phone || !service){
    alert('Por favor completa al menos tu nombre, teléfono y servicio de interés.');
    return;
  }
  // Build WhatsApp deep-link as CTA (no backend needed)
  const msg = encodeURIComponent(
    `Hola Zetlean Business! Mi nombre es ${name}.\n` +
    `Empresa: ${document.getElementById('fcompany').value || '—'}\n` +
    `Teléfono: ${phone}\n` +
    `Interesado en: ${service}\n` +
    `Mensaje: ${document.getElementById('fmsg').value || '—'}`
  );
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  setTimeout(() => {
    window.open(`https://wa.me/59170000000?text=${msg}`, '_blank');
  }, 800);
}
window.submitForm = submitForm;

/* --- SMOOTH SCROLL OFFSET (for sticky nav) --- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* --- CARD HOVER GLOW TILT --- */
document.querySelectorAll('.plan-card, .step-card, .glass').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    const tiltX = (y / r.height * 10).toFixed(2);
    const tiltY = (-x / r.width * 10).toFixed(2);
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
