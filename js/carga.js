(() => {
  const DEFAULT_PAGE = 'paginas/inicio.html';
  const PAGE_KEY = 'ultimaPagina';
  const FETCH_TIMEOUT = 8000;
  const TRANSITION_MS = 240;
  let latestRequest = 0;
  let enterTimer = null;
  let navbarTimer = null;

  function readStoredPage() {
    try {
      return localStorage.getItem(PAGE_KEY) || DEFAULT_PAGE;
    } catch (error) {
      console.warn('No se pudo leer la última página:', error);
      return DEFAULT_PAGE;
    }
  }

  function saveStoredPage(page) {
    try {
      localStorage.setItem(PAGE_KEY, page);
    } catch (error) {
      console.warn('No se pudo guardar la última página:', error);
    }
  }

  function normalizePage(url) {
    if (typeof url !== 'string') return null;
    const page = url.trim().split(/[?#]/, 1)[0];
    if (!page.startsWith('paginas/') || page.includes('..') || page.includes('\\')) return null;
    return page;
  }

  async function cargarVista(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } finally {
      clearTimeout(timeout);
    }
  }

  function inicializarModulos() {
    const modules = [
      ['Contacto', () => window.inicializarFormContacto?.()],
      ['Inicio', () => window.appInicio?.renderProyectos()],
      ['Servicios', () => window.appServicios?.renderServicios()],
      ['Portafolio', () => {
        window.appPortafolio?.renderPortafolio();
        window.appPortafolio?.setupPortafolioControls();
      }],
      ['Nosotros', () => window.appNosotros?.inicializarNosotros()],
      ['FAQ', () => window.appFaq?.renderFAQ()]
    ];

    modules.forEach(([name, initialize]) => {
      try {
        initialize();
      } catch (error) {
        console.error(`No se pudo inicializar el módulo ${name}:`, error);
      }
    });
  }

  function actualizarNavegacion(page) {
    const section = page.startsWith('paginas/portafolio') ? 'paginas/portafolio.html' : page;
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const active = link.dataset.load === section;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function animarNavbar() {
    const navbar = document.getElementById('site-nav');
    if (!navbar || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (navbarTimer !== null) window.clearTimeout(navbarTimer);
    navbar.classList.remove('nav-arriving');
    void navbar.offsetWidth;
    navbar.classList.add('nav-arriving');
    navbarTimer = window.setTimeout(() => {
      navbar.classList.remove('nav-arriving');
      navbarTimer = null;
    }, 500);
  }

  function renderizarPagina(main, html, page) {
    main.innerHTML = html;
    main.setAttribute('aria-busy', 'false');
    if (enterTimer !== null) window.clearTimeout(enterTimer);
    main.classList.remove('is-leaving', 'is-entering');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void main.offsetWidth;
      main.classList.add('is-entering');
      enterTimer = window.setTimeout(() => {
        main.classList.remove('is-entering');
        enterTimer = null;
      }, 650);
    }
    saveStoredPage(page);
    actualizarNavegacion(page);
    animarNavbar();
    inicializarModulos();
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }

  async function cargarContenido(url = DEFAULT_PAGE) {
    const main = document.getElementById('content');
    if (!main) return;

    const destino = normalizePage(url);
    if (!destino) {
      console.error('Se rechazó una ruta de página no válida:', url);
      return;
    }

    const requestId = ++latestRequest;
    main.setAttribute('aria-busy', 'true');

    try {
      const html = await cargarVista(destino);
      if (requestId !== latestRequest) return;

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        main.classList.add('is-leaving');
        await new Promise((resolve) => window.setTimeout(resolve, TRANSITION_MS));
      }
      if (requestId !== latestRequest) return;

      renderizarPagina(main, html, destino);
    } catch (error) {
      if (requestId !== latestRequest) return;
      console.error(`No se pudo cargar ${destino}:`, error);

      if (destino !== DEFAULT_PAGE) {
        try {
          const fallbackHtml = await cargarVista(DEFAULT_PAGE);
          if (requestId !== latestRequest) return;
          renderizarPagina(main, fallbackHtml, DEFAULT_PAGE);
          return;
        } catch (fallbackError) {
          error = fallbackError;
          console.error('Tampoco se pudo cargar la página de inicio:', fallbackError);
        }
      }

      main.replaceChildren();
      const message = document.createElement('p');
      message.className = 'load-error';
      message.textContent = `No se pudo cargar la página. ${error.message || 'Inténtalo de nuevo.'}`;
      main.appendChild(message);
      main.setAttribute('aria-busy', 'false');
    }
  }

  function configurarNavegacion() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      const link = target instanceof Element ? target.closest('a') : null;
      if (!link) return;

      const requestedPage = link.dataset.load || link.dataset.cargar;
      const href = link.getAttribute('href') || '';
      const localPage = href.startsWith('paginas/');
      if (requestedPage || localPage) {
        event.preventDefault();
        cargarContenido(requestedPage || href);
        window.closeMobileMenu?.();
      } else if (href === '#') {
        event.preventDefault();
      }
    });
  }

  window.cargarContenido = cargarContenido;
  window.appCarga = { cargarContenido };

  document.addEventListener('DOMContentLoaded', () => {
    configurarNavegacion();
    cargarContenido(normalizePage(readStoredPage()) || DEFAULT_PAGE);
  });
})();
