// js/carga.js — Versión final, idempotente y compatible con tu HTML
(() => {
  // Evitar doble inicialización si el script se carga más de una vez
  if (window.appCarga && window.appCarga._initialized) return;
  const MODULE = {};

  // ---------- Config ----------
  const DEFAULT_PAGE = "paginas/inicio.html";
  const STORAGE_KEYS = {
    ULTIMA_PAGINA: "ultimaPagina",
    ULTIMA_POS_Y: "ultimaPosY",
  };
  const FETCH_TIMEOUT = 8000; // ms

  // ---------- Helpers ----------
  const $ = (sel, root = document) => (root || document).querySelector(sel);
  const $$ = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));
  const clearChildren = (el) => { if (!el) return; while (el.firstChild) el.removeChild(el.firstChild); };
  const create = (tag, props = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v);
    });
    (children || []).forEach(c => el.appendChild(c));
    return el;
  };
  const debounce = (fn, ms = 200) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  async function safeFetch(url, timeout = FETCH_TIMEOUT) {
    // No usar file:// — prueba en servidor local si desarrollas.
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } finally {
      clearTimeout(id);
    }
  }

  // ---------- Data ----------
  const servicios = [
    { titulo: "Diseño Web Profesional", icono: "bi bi-globe2", resumen: "Sitios modernos, rápidos y adaptables.", detalles: "Optimización móvil, SEO básico y diseño visual atractivo." },
    { titulo: "Gestión de Computadores", icono: "bi bi-pc-display-horizontal", resumen: "Equipos seguros y corporativos.", detalles: "Instalación, limpieza, bloqueo de accesos y más." },
    { titulo: "Software Legal", icono: "bi bi-download", resumen: "Instalación de todo tu software.", detalles: "Office, Adobe, antivirus, navegadores y más." },
    { titulo: "Mantenimiento y Soporte", icono: "bi bi-tools", resumen: "Respaldo y monitoreo continuo.", detalles: "Actualizaciones, parches de seguridad y asistencia 24/7." },
    { titulo: "Consultoría Tecnológica", icono: "bi bi-people", resumen: "Estrategia para tu infraestructura.", detalles: "Diagnóstico, optimización de procesos y roadmap tecnológico." },
    { titulo: "Apps Móviles", icono: "bi bi-phone", resumen: "iOS y Android nativas o híbridas.", detalles: "Diseño UX/UI, integración con tu backend y publicación en tiendas." },
    { titulo: "Integración de APIs", icono: "bi bi-plug", resumen: "Conecta tus sistemas.", detalles: "REST, GraphQL, servicios de terceros (pagos, mapas, mensajería...)." },
    { titulo: "SEO y Rendimiento", icono: "bi bi-speedometer2", resumen: "Mejora tu visibilidad en Google.", detalles: "Auditoría SEO, Core Web Vitals y optimización de carga." },
  ];

  const proyectosData = [
    { nombre: 'App de Ventas', descripcion: 'Dashboard comercial con filtros avanzados y gráficos, además de generación de facturas electrónicas DIAN, PDF y QR.' },
    { nombre: 'Tienda Online', descripcion: 'E-commerce con pasarela de pagos y carrito dinámico.' },
  ];

  const portafolioData = [
    { nombre: 'Tienda Online', descripcion: 'E-commerce con carrito dinámico y pasarela de pagos.', imagen: 'img/JOMB.webp', live: "http://217.196.48.97/", category: 'web', tech: ['Django', 'Bootstrap', 'Tailwind', 'Chart.js'] },
    { nombre: 'Masivos OLÉ! Logistics', descripcion: 'Sistema de gestión logistico con gráficos para manejo de cotizaciones de transporte.', imagen: 'img/JOMB.webp', live: "https://masivosolelogistics.com/", category: 'web', tech: ['Django', 'Bootstrap', 'Chart.js'] },
    { nombre: 'Finanworld', descripcion: 'Sistema de créditos de libranza pensados para pensionados.', imagen: 'img/JOMB.webp', live: "https://jhojanomb.github.io/Finanworld/", category: 'web', tech: ['Django', 'Tailwind'] },
    { nombre: 'Youtube-JOMB', descripcion: 'Aplicativo para descargar videos y audios de YouTube en múltiples formatos, sirve para Windows y Linux.', imagen: 'img/JOMB.webp', download: "https://github.com/JhojanOMB/Youtube-JOMB/releases/latest", category: 'movil', tech: ['Python', 'Tkinter', 'Pytube'] },
  ];

  const faqs = [
    { pregunta: "¿Cómo puedo solicitar un servicio?", respuesta: "Puedes usar el formulario de contacto o escribirnos directamente a WhatsApp." },
    { pregunta: "¿Trabajan de forma remota?", respuesta: "Sí, ofrecemos soporte remoto y presencial según el caso." },
    { pregunta: "¿Aceptan pagos en línea?", respuesta: "Sí, aceptamos transferencias, tarjetas y plataformas digitales." },
    { pregunta: "¿Qué tiempo tardan en responder?", respuesta: "Generalmente respondemos en menos de 24 horas." }
  ];

  // ---------- Renderers (mantengo tus implementaciones) ----------
  function renderServicios() {
    const container = document.getElementById("contenedor-servicios");
    if (!container) return;
    clearChildren(container);
    const frag = document.createDocumentFragment();

    servicios.forEach((s, i) => {
      const card = create('div', { class: 'flip-card w-full max-w-sm h-80', 'data-aos': 'fade-up', 'data-aos-delay': `${(i+1)*100}` });
      const inner = create('div', { class: 'flip-card-inner relative w-full h-full' });

      const front = create('div', { class: 'flip-card-front bg-[#e0e0e0] rounded-2xl p-6 flex flex-col items-center justify-center shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff]' });
      const circle = create('div', { class: 'mb-4 w-20 h-20 rounded-full flex items-center justify-center bg-[#e0e0e0] overflow-hidden shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]' });
      const icon = create('i', { class: `${s.icono} text-indigo-600 text-3xl block leading-none` });
      circle.appendChild(icon);
      front.appendChild(circle);
      front.appendChild(create('h3', { class: 'text-lg font-semibold text-center text-gray-800 mb-2', text: s.titulo }));
      front.appendChild(create('p', { class: 'text-gray-600 text-center', text: s.resumen }));

      const back = create('div', { class: 'flip-card-back bg-[#e0e0e0] rounded-2xl p-6 flex flex-col items-center justify-center shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]' });
      back.appendChild(create('h4', { class: 'text-indigo-700 text-lg font-medium mb-2', text: 'Detalles' }));
      back.appendChild(create('hr', { class: 'w-1/2 border-indigo-300 mb-3' }));
      back.appendChild(create('p', { class: 'text-center text-gray-700', text: s.detalles }));

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      frag.appendChild(card);
    });

    container.appendChild(frag);
  }

  function renderProyectos() {
    const grid = document.getElementById('proyectos-grid');
    if (!grid) return;
    clearChildren(grid);
    const frag = document.createDocumentFragment();

    proyectosData.forEach((app, idx) => {
      const card = create('div', { class: 'relative rounded-2xl overflow-hidden p-8 neumorph hover:neumorph-inset transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]', 'data-aos': 'fade-up', 'data-aos-delay': `${200 + idx * 100}` });
      const badge = create('div', { class: 'neumorph-bg absolute right-4 top-4 bg-indigo-600 w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md', html: '<i class="bi bi-star-fill text-xl"></i>' });
      card.appendChild(badge);
      card.appendChild(create('h5', { class: 'text-xl font-semibold text-gray-800 mb-4', text: app.nombre }));
      card.appendChild(create('p', { class: 'text-gray-700 text-sm mb-6', text: app.descripcion }));
      const a = create('a', { href: '#', class: 'btn-neumorph inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors px-5' });
      a.innerHTML = 'Ver más <i class="bi bi-arrow-right-short text-2xl"></i>';
      card.appendChild(a);
      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  function renderPortafolio(items = portafolioData) {
    const grid = document.getElementById('portafolio-grid');
    const tpl = document.getElementById('portafolio-card-template');
    if (!grid || !tpl) return;
    clearChildren(grid);

    const frag = document.createDocumentFragment();
    items.forEach((app, i) => {
      const clone = tpl.content.cloneNode(true);
      const img = clone.querySelector('img');
      if (img) {
        img.src = app.imagen || '';
        img.alt = app.nombre || '';
        img.onerror = () => { img.src = 'img/placeholder.webp'; };
      }
      const title = clone.querySelector('[data-role="title"]');
      const desc = clone.querySelector('[data-role="desc"]');
      const tags = clone.querySelector('[data-role="tags"]');
      const action = clone.querySelector('[data-role="action"]');

      if (title) title.textContent = app.nombre;
      if (desc) desc.textContent = app.descripcion;
      if (tags) {
        tags.innerHTML = '';
        (app.tech || []).forEach(t => {
          const span = create('span', { class: 'text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full neumorph-bg', text: t });
          tags.appendChild(span);
        });
      }
      if (action) {
        action.innerHTML = '';
        if (app.live) {
          const a = create('a', { href: app.live, target: '_blank', class: 'w-10 h-10 flex items-center justify-center text-white text-lg bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all' });
          a.innerHTML = '<i class="bi bi-box-arrow-up-right"></i>';
          action.appendChild(a);
        } else if (app.download) {
          const a = create('a', { href: app.download, download: '', class: 'w-10 h-10 flex items-center justify-center text-white text-lg bg-green-600 hover:bg-green-700 rounded-full transition-all' });
          a.innerHTML = '<i class="bi bi-download"></i>';
          action.appendChild(a);
        } else {
          const span = create('span', { class: 'w-10 h-10 flex items-center justify-center text-white text-lg bg-gray-500 rounded-full', html: '<i class="bi bi-lock-fill"></i>' });
          action.appendChild(span);
        }
      }

      const card = clone.querySelector('.group');
      if (card) card.setAttribute('data-aos-delay', `${100 + i * 100}`);

      frag.appendChild(clone);
    });

    grid.appendChild(frag);
  }

  function setupPortafolioControls() {
    const input = document.getElementById('portafolio-search');
    const buttons = document.querySelectorAll('.btn-neumorph[data-cat]');
    if (!input || !buttons) return;

    // Remove duplicate listeners by cloning input and buttons (simple way)
    const inputClone = input.cloneNode(true);
    input.parentNode.replaceChild(inputClone, input);

    let cat = 'all';
    let query = '';

    const applyFilter = () => {
      const filtered = portafolioData
        .filter(p => cat === 'all' || p.category === cat)
        .filter(p => p.nombre.toLowerCase().includes(query));
      renderPortafolio(filtered);
      if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
    };

    inputClone.addEventListener('input', debounce((e) => {
      query = e.target.value.trim().toLowerCase();
      applyFilter();
    }, 220));

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('bg-indigo-100');
          b.classList.remove('text-indigo-700');
          b.classList.add('bg-transparent');
          b.classList.add('text-gray-600');
        });
        btn.classList.remove('bg-transparent');
        btn.classList.remove('text-gray-600');
        btn.classList.add('bg-indigo-100');
        btn.classList.add('text-indigo-700');

        cat = btn.dataset.cat || 'all';
        applyFilter();
      });
    });

    applyFilter();
  }

  function renderFAQ() {
    const contenedor = document.getElementById("contenedor-faq");
    if (!contenedor) return;
    contenedor.innerHTML = '';
    const frag = document.createDocumentFragment();

    faqs.forEach((f, i) => {
      const wrapper = create('div', { class: 'border border-gray-200 rounded-lg overflow-hidden neumorph', 'data-aos': 'fade-up', 'data-aos-delay': `${(i+1)*100}` });
      const btn = create('button', { type: 'button', class: 'faq-toggle w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition focus:outline-none' });
      btn.innerHTML = `<div class="flex items-center space-x-2"><i class="fa-solid fa-question-circle text-indigo-600"></i><span class="font-medium text-gray-800">${f.pregunta}</span></div><i class="fa-solid fa-chevron-down text-gray-600"></i>`;

      const answer = create('div', { class: 'faq-answer max-h-0 overflow-hidden px-4 bg-white text-gray-700 border-t border-gray-200 transition-all duration-300' });
      answer.innerHTML = `<p class="py-3">${f.respuesta}</p>`;

      btn.addEventListener('click', () => {
        const icon = btn.querySelector('i.fa-chevron-down, i.fa-chevron-up');
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
        if (isOpen) {
          answer.style.maxHeight = '0px';
          if (icon) { icon.classList.remove('fa-chevron-up'); icon.classList.add('fa-chevron-down'); }
        } else {
          // cerrar otros (comportamiento tipo accordion)
          contenedor.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
          contenedor.querySelectorAll('.faq-toggle i.fa-chevron-up').forEach(ic => { ic.classList.remove('fa-chevron-up'); ic.classList.add('fa-chevron-down'); });

          answer.style.maxHeight = answer.scrollHeight + 'px';
          if (icon) { icon.classList.remove('fa-chevron-down'); icon.classList.add('fa-chevron-up'); }
        }
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(answer);
      frag.appendChild(wrapper);
    });

    contenedor.appendChild(frag);
    if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
  }

  function inicializadoresPostCarga() {
    try { if (typeof inicializarFormContacto === "function") inicializarFormContacto(); } catch (err) { console.warn("Error en inicializarFormContacto:", err); }
    try { renderServicios(); } catch (err) { console.warn("Error renderServicios:", err); }
    try { renderProyectos(); } catch (err) { console.warn("Error renderProyectos:", err); }
    try { renderPortafolio(portafolioData); setupPortafolioControls(); } catch (err) { console.warn("Error portafolio:", err); }
    try { renderFAQ(); } catch (err) { console.warn("Error FAQs:", err); }
    if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
  }

  // ---------- Cargar contenido ----------
  async function cargarContenido(url) {
    const main = document.getElementById('content') || document.querySelector('main');
    if (!main) {
      console.error("Elemento <main> o #content no encontrado en el DOM");
      return;
    }

    try {
      // pequeña normalización de url
      const target = (typeof url === 'string' && url.trim()) ? url.trim() : DEFAULT_PAGE;
      const html = await safeFetch(target);
      main.innerHTML = html;
      window.scrollTo({ top: 0, behavior: "smooth" });
      localStorage.setItem(STORAGE_KEYS.ULTIMA_PAGINA, target);
      inicializadoresPostCarga();
    } catch (err) {
      console.error("Error al cargar contenido:", err);
      const fallback = (url !== DEFAULT_PAGE) ? DEFAULT_PAGE : null;
      if (fallback) {
        try {
          const html = await safeFetch(fallback);
          main.innerHTML = html;
          window.scrollTo({ top: 0, behavior: "auto" });
          localStorage.setItem(STORAGE_KEYS.ULTIMA_PAGINA, fallback);
          inicializadoresPostCarga();
        } catch (err2) {
          main.innerHTML = `<div class="alert alert-danger">Error crítico: no se pudo cargar la página. Detalle: ${String(err2.message || err.message)}</div>`;
        }
      } else {
        main.innerHTML = `<div class="alert alert-danger">Error: ${String(err.message)}</div>`;
      }
    }
  }

  // ---------- Manejo de enlaces (idempotente) ----------
  function initNavHandlers() {
    if (MODULE._navInitialized) return;
    MODULE._navInitialized = true;

    // Interceptar enlaces con data-load, data-cargar o href que apunten a 'paginas/'
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;

      const dataLoad = a.dataset && (a.dataset.load || a.dataset.cargar);
      if (dataLoad) {
        e.preventDefault();
        cargarContenido(dataLoad);
        return;
      }

      // si el href contiene 'paginas/' y no es externo -> cargar via AJAX
      try {
        const href = a.getAttribute('href');
        if (href && typeof href === 'string' && href.includes('paginas/') && (href.indexOf('http') !== 0 && href.indexOf('//') !== 0)) {
          e.preventDefault();
          cargarContenido(href);
          return;
        }
      } catch (err) { /* ignore */ }

      // prevenir recargas accidentales en href="#" o empty
      const href = a.getAttribute && a.getAttribute('href');
      if (href === '' || href === '#') e.preventDefault();
    }, true);
  }

  // ---------- Inicio / Restauración ----------
  document.addEventListener("DOMContentLoaded", async () => {
    // inicializar handlers de navegación
    initNavHandlers();

    const ultimaUrl = localStorage.getItem(STORAGE_KEYS.ULTIMA_PAGINA) || DEFAULT_PAGE;
    try { await cargarContenido(ultimaUrl); } catch (e) { console.warn(e); }

    // Restaurar scroll si existe (y luego borrar la clave)
    const y = parseInt(localStorage.getItem(STORAGE_KEYS.ULTIMA_POS_Y), 10);
    if (!isNaN(y)) {
      window.scrollTo({ top: y, behavior: "auto" });
      localStorage.removeItem(STORAGE_KEYS.ULTIMA_POS_Y);
    }
  });

  // Guardar scroll antes de salir
  window.addEventListener("beforeunload", () => {
    try { localStorage.setItem(STORAGE_KEYS.ULTIMA_POS_Y, window.scrollY); } catch (e) { /* no crítico */ }
  });

  // ---------- Export API ----------
  window.appCarga = window.appCarga || {};
  Object.assign(window.appCarga, {
    _initialized: true,
    cargarContenido,
    renderServicios,
    renderProyectos,
    renderPortafolio,
    renderFAQ,
    initNavHandlers
  });

  // marcar módulo interno como inicializado
  MODULE._initialized = true;
})();
