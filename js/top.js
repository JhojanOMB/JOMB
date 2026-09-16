document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  // Throttle via rAF para el scroll
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (window.scrollY > 300) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
      ticking = false;
    });
  }

  // Listener de scroll (passive para mejor perf)
  window.addEventListener('scroll', onScroll, { passive: true });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Ejecutar una vez para inicializar visibilidad según página cargada
  onScroll();
});
