// carga.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Leer la última URL guardada (o usar la de inicio por defecto)
  const ultimaUrl = localStorage.getItem('ultimaPagina') || "paginas/inicio.html";
  cargarContenido(ultimaUrl).then(() => {
    // 2. Restaurar scroll si lo guardaste antes
    const y = parseInt(localStorage.getItem('ultimaPosY'), 10);
    if (!isNaN(y)) {
      window.scrollTo({ top: y, behavior: 'auto' });
      localStorage.removeItem('ultimaPosY');
    }
  });
});

// Carga dinámica de contenido y guardado de estado
function cargarContenido(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar la página');
      return response.text();
    })
    .then(html => {
      // Inyecta el HTML en el <main>
      document.querySelector('main').innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Guardar la URL actual
      localStorage.setItem('ultimaPagina', url);

      // Detectar y renderizar módulos dinámicos
      if (document.getElementById('contenedor-servicios')) {
        insertarTarjetasServicios();
      }
      if (document.getElementById('proyectos-grid')) {
        insertarProyectosDestacados();
      }
      if (document.getElementById('portafolio-grid')) {
        renderPortafolio(portafolioData);
        setupPortafolioControls();
      }
    })
    .catch(error => {
      document.querySelector('main').innerHTML =
        `<div class="alert alert-danger">Error: ${error.message}</div>`;
    });
}

// Antes de recargar o cerrar, guardo scroll
window.addEventListener('beforeunload', () => {
  localStorage.setItem('ultimaPosY', window.scrollY);
});

// ------------------ Servicios ------------------

function insertarTarjetasServicios() {
  const servicios = [
    { titulo: "Diseño Web Profesional", icono: "bi-globe2", resumen: "Sitios modernos, rápidos y adaptables.", detalles: "Optimización móvil, SEO básico y diseño visual atractivo." },
    { titulo: "Gestión de Computadores", icono: "bi-pc-display-horizontal", resumen: "Equipos seguros y corporativos.", detalles: "Instalación, limpieza, bloqueo de accesos y más." },
    { titulo: "Software Legal", icono: "bi-download", resumen: "Instalación de todo tu software.", detalles: "Office, Adobe, antivirus, navegadores y más." },
    { titulo: "Mantenimiento y Soporte", icono: "bi-tools", resumen: "Respaldo y monitoreo continuo.", detalles: "Actualizaciones, parches de seguridad y asistencia 24/7." },
    { titulo: "Consultoría Tecnológica", icono: "bi-people", resumen: "Estrategia para tu infraestructura.", detalles: "Diagnóstico, optimización de procesos y roadmap tecnológico." },
    { titulo: "Apps Móviles", icono: "bi-phone", resumen: "iOS y Android nativas o híbridas.", detalles: "Diseño UX/UI, integración con tu backend y publicación en tiendas." },
    { titulo: "Integración de APIs", icono: "bi-plug", resumen: "Conecta tus sistemas.", detalles: "REST, GraphQL, servicios de terceros (pagos, mapas, mensajería...)." },
    { titulo: "SEO y Rendimiento", icono: "bi-speedometer2", resumen: "Mejora tu visibilidad en Google.", detalles: "Auditoría SEO, Core Web Vitals y optimización de carga." },
  ];

  const contenedor = document.getElementById("contenedor-servicios");
  contenedor.innerHTML = "";

  servicios.forEach((s, i) => {
    const delay = (i + 1) * 100;
    contenedor.innerHTML += `
      <div class="flip-card w-full max-w-sm h-80" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="flip-card-inner relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]">
          <!-- Front -->
          <div class="flip-card-front absolute inset-0 bg-[#e0e0e0] rounded-2xl p-6 flex flex-col items-center justify-center 
                      [backface-visibility:hidden] shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff]">
            <div class="text-indigo-600 text-5xl mb-4"><i class="${s.icono}"></i></div>
            <h3 class="text-lg font-semibold text-center text-gray-800 mb-2">${s.titulo}</h3>
            <p class="text-gray-600 text-center">${s.resumen}</p>
          </div>
          <!-- Back -->
          <div class="flip-card-back absolute inset-0 bg-[#e0e0e0] rounded-2xl p-6 flex flex-col items-center justify-center 
                      [backface-visibility:hidden] transform rotate-y-180 shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]">
            <h4 class="text-indigo-700 text-lg font-medium mb-2">Detalles</h4>
            <hr class="w-1/2 border-indigo-300 mb-3" />
            <p class="text-center text-gray-700">${s.detalles}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// ------------------ Proyectos Destacados ------------------

const proyectosData = [
  { nombre: 'App de Ventas', descripcion: 'Dashboard comercial con filtros avanzados y gráficos, además de generación de facturas electrónicas DIAN, PDF y QR.' },
  { nombre: 'Tienda Online', descripcion: 'E‑commerce con pasarela de pagos y carrito dinámico.' },
];

function insertarProyectosDestacados() {
  const grid = document.getElementById('proyectos-grid');
  if (!grid) return;
  grid.innerHTML = "";

  proyectosData.forEach((app, idx) => {
    const card = document.createElement('div');
    card.className = `
      relative rounded-2xl overflow-hidden p-8 neumorph
      hover:neumorph-inset transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]
    `;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', 200 + idx * 100);

    card.innerHTML = `
      <div class="absolute right-4 top-4 bg-indigo-600 w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md">
        <i class="bi bi-star-fill text-xl"></i>
      </div>
      <h5 class="text-xl font-semibold text-gray-800 mb-4">${app.nombre}</h5>
      <p class="text-gray-700 text-sm mb-6">${app.descripcion}</p>
      <a href="#"
         class="btn-neumorph inline-flex items-center text-indigo-600
                hover:text-indigo-700 transition-colors">
        Ver más
        <i class="bi bi-arrow-right-short text-2xl"></i>
      </a>
    `;
    grid.appendChild(card);
  });
}

// ------------------ Datos de Portafolio ------------------
const portafolioData = [
  {
    nombre: 'Tienda Online',
    descripcion: 'E‑commerce con carrito dinámico y pasarela de pagos.',
    imagen: 'img/JOMB.webp',
    live: "http://217.196.48.97/",
    category: 'web',
    tech: ['Django', 'Bootstrap', 'Tailwind', 'Chart.js']
  },
    {
    nombre: 'Masivos OLÉ! Logistics',
    descripcion: 'Sistema de gestión logistico con gráficos para manejo de cotizaciones de transporte.',
    imagen: 'img/JOMB.webp',
    live: "https://masivosolelogistics.com/",
    category: 'web',
    tech: ['Django', 'Bootstrap', 'Chart.js']
  },
];

// Función que renderiza el grid completo
function renderPortafolio(items) {
  const grid = document.getElementById('portafolio-grid');
  const tpl  = document.getElementById('portafolio-card-template');
  grid.innerHTML = '';

  items.forEach((app, i) => {
    const clone = tpl.content.cloneNode(true);

    // Imagen y alt
    const img = clone.querySelector('img');
    img.src = app.imagen;
    img.alt = app.nombre;

    // Título / descripción
    clone.querySelector('[data-role="title"]').textContent = app.nombre;
    clone.querySelector('[data-role="desc"]').textContent  = app.descripcion;

    // Tech tags
    const tags = clone.querySelector('[data-role="tags"]');
    app.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full';
      span.textContent = t;
      tags.appendChild(span);
    });

    // Acción (Live o candado)
    const action = clone.querySelector('[data-role="action"]');
    if (app.live) {
      const a = document.createElement('a');
      a.href = app.live;
      a.target = '_blank';
      a.className = 'w-10 h-10 flex items-center justify-center text-white text-lg bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all';
      a.innerHTML = '<i class="bi bi-box-arrow-up-right"></i>';
      action.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = 'w-10 h-10 flex items-center justify-center text-white text-lg bg-gray-500 rounded-full';
      span.innerHTML = '<i class="bi bi-lock-fill"></i>';
      action.appendChild(span);
    }

    // Delay AOS
    const card = clone.querySelector('.group');
    card.setAttribute('data-aos-delay', 100 + i * 100);

    grid.appendChild(clone);
  });
}

// ------------------ Búsqueda y Filtros ------------------
function setupPortafolioControls() {
  const input   = document.getElementById('portafolio-search');
  const buttons = document.querySelectorAll('.btn-neumorph');
  let cat   = 'all';
  let query = '';

  function apply() {
    const filtered = portafolioData
      .filter(p => cat === 'all' || p.category === cat)
      .filter(p => p.nombre.toLowerCase().includes(query));
    renderPortafolio(filtered);
  }

  // Escucha búsqueda
  input.addEventListener('input', e => {
    query = e.target.value.trim().toLowerCase();
    apply();
  });

  // Escucha filtros de categoría
  buttons.forEach(btn =>
    btn.addEventListener('click', () => {
      // Actualiza clases en botones
      buttons.forEach(b => {
        b.classList.replace('bg-indigo-100','bg-transparent');
        b.classList.replace('text-indigo-700','text-gray-600');
      });
      btn.classList.replace('bg-transparent','bg-indigo-100');
      btn.classList.replace('text-gray-600','text-indigo-700');

      cat = btn.dataset.cat;
      apply();
    })
  );

  // Render inicial
  apply();
}