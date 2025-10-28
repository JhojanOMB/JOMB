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

  // Manejo del click: evita dobles clicks y soporta Lenis si está presente
  let isScrolling = false;
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    if (isScrolling) return;
    isScrolling = true;
    backToTop.classList.add('disabled');

    // Si existe Lenis (tu smooth-scroller), usar su API
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      try {
        // Lenis acepta scrollTo(y, options) en versiones recientes
        window.lenis.scrollTo(0, { duration: 1.2 });
        // liberamos el botón poco después (no siempre sabemos cuándo termina)
        setTimeout(() => { isScrolling = false; backToTop.classList.remove('disabled'); }, 1300);
      } catch (err) {
        // fallback si lenis falla
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; backToTop.classList.remove('disabled'); }, 800);
      }
    } else {
      // fallback nativo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // no hay API para 'end of smooth', estimamos tiempo
      setTimeout(() => { isScrolling = false; backToTop.classList.remove('disabled'); }, 800);
    }
  });

  // Ejecutar una vez para inicializar visibilidad según página cargada
  onScroll();
});
