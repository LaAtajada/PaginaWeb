// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Hero glitch al cargar (300ms)
(function(){
  const el = document.getElementById('hero-glitch');
  if (!el) return;
  el.classList.add('glitch');
  setTimeout(()=> el.classList.remove('glitch'), 300);
})();


// Lightbox para galería
(function(){
  const grid = document.getElementById('gallery-grid');
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close');
  if (!grid || !box || !img || !close) return;

  const open = (src, alt) => {
    img.src = src; img.alt = alt || '';
    box.classList.remove('hidden'); box.classList.add('flex');
  };
  const hide = () => {
    box.classList.add('hidden'); box.classList.remove('flex');
    img.src = ''; img.alt = '';
  };

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gal-item');
    if (!item) return;
    open(item.dataset.src, item.dataset.alt);
  });
  close.addEventListener('click', hide);
  box.addEventListener('click', (e) => { if (e.target === box) hide(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hide(); });
})();

// FAQ: solo un <details> abierto a la vez
(function(){
  const wrap = document.getElementById('faq-accordion');
  if (!wrap) return;
  const items = Array.from(wrap.querySelectorAll('details'));
  items.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        items.forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });
})();



// Menú mobile: estado robusto, sin clases de Tailwind
(function(){
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  const iBurger = document.getElementById('iconBurger');
  const iClose  = document.getElementById('iconClose');
  if (!header || !toggle || !menu) return;

  // Estado cerrado forzado (por si el CSS/SSR lo deja “abierto”)
  function setOpen(isOpen){
    if (isOpen) {
      header.classList.add('open');
      menu.classList.remove('pointer-events-none','opacity-0','-translate-y-2');
      toggle.setAttribute('aria-expanded','true');
      if (iBurger) iBurger.classList.add('hide');
      if (iClose)  iClose.classList.remove('hide');
    } else {
      header.classList.remove('open');
      menu.classList.add('pointer-events-none','opacity-0','-translate-y-2');
      toggle.setAttribute('aria-expanded','false');
      if (iBurger) iBurger.classList.remove('hide');
      if (iClose)  iClose.classList.add('hide');
    }
  }

  // Cerrar al cargar (clave para tu caso)
  document.addEventListener('DOMContentLoaded', () => setOpen(false));

  const isOpen = () => header.classList.contains('open');
  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Cierra al hacer click en un link dentro del menú
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) setOpen(false);
  });

  // Cierra con Escape y al click fuera
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) setOpen(false);
  });
})();


