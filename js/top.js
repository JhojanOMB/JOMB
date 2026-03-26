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
  const liberarBoton = () => {
    isScrolling = false;
    backToTop.classList.remove('disabled');
  };

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();

    if (isScrolling) return;
    if (window.scrollY <= 0) {
      // ya estamos arriba
      liberarBoton();
      return;
    }

    isScrolling = true;
    backToTop.classList.add('disabled');

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      let terminado = false;
      const finalizar = () => {
        if (terminado) return;
        terminado = true;
        liberarBoton();
      };

      window.lenis.scrollTo(0, { duration: 1.2 });

      const onScroll = () => {
        if (window.scrollY <= 1) {
          requestAnimationFrame(() => {
            if (window.scrollY <= 1) finalizar();
          });
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      setTimeout(() => {
        window.removeEventListener('scroll', onScroll);
        finalizar();
      }, 1700);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(liberarBoton, 900);
    }
  });

  // Ejecutar una vez para inicializar visibilidad según página cargada
  onScroll();
});
