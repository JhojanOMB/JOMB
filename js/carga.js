(() => {
  const DEFAULT_PAGE = 'paginas/inicio.html';
  const PAGE_KEY = 'ultimaPagina';
  const FETCH_TIMEOUT = 8000;

  async function cargarVista(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    } finally {
      clearTimeout(timeout);
    }
  }

  function inicializarModulos() {
    try { window.inicializarFormContacto?.(); } catch (error) { console.warn('Contacto:', error); }
    try { window.appInicio?.renderProyectos(); } catch (error) { console.warn('Inicio:', error); }
    try { window.appServicios?.renderServicios(); } catch (error) { console.warn('Servicios:', error); }
    try { window.appPortafolio?.renderPortafolio(); window.appPortafolio?.setupPortafolioControls(); } catch (error) { console.warn('Portafolio:', error); }
    try { window.appNosotros?.inicializarNosotros(); } catch (error) { console.warn('Nosotros:', error); }
    try { window.appFaq?.renderFAQ(); } catch (error) { console.warn('FAQ:', error); }
  }

  async function cargarContenido(url = DEFAULT_PAGE) {
    const main = document.getElementById('content');
    if (!main) return;
    const destino = typeof url === 'string' && url.trim() ? url.trim() : DEFAULT_PAGE;
    try {
      main.innerHTML = await cargarVista(destino);
      localStorage.setItem(PAGE_KEY, destino);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      inicializarModulos();
    } catch (error) {
      console.error('No se pudo cargar la vista:', error);
      if (destino !== DEFAULT_PAGE) {
        try {
          main.innerHTML = await cargarVista(DEFAULT_PAGE);
          localStorage.setItem(PAGE_KEY, DEFAULT_PAGE);
          inicializarModulos();
          return;
        } catch (fallbackError) {
          error = fallbackError;
        }
      }
      main.innerHTML = `<div class="p-8 text-center text-red-600">No se pudo cargar la página: ${String(error.message || error)}</div>`;
    }
  }

  function configurarNavegacion() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest?.('a');
      if (!link) return;
      const href = link.getAttribute('href');
      const requestedPage = link.dataset.load || link.dataset.cargar;
      const localPage = href && href.includes('paginas/') && !href.startsWith('http') && !href.startsWith('//');
      if (requestedPage || localPage) {
        event.preventDefault();
        cargarContenido(requestedPage || href);
      } else if (href === '' || href === '#') {
        event.preventDefault();
      }
    }, true);
  }

  window.cargarContenido = cargarContenido;
  window.appCarga = { cargarContenido };

  document.addEventListener('DOMContentLoaded', () => {
    configurarNavegacion();
    cargarContenido(localStorage.getItem(PAGE_KEY) || DEFAULT_PAGE);
  });
})();
