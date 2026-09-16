(() => {
  const proyectos = [
    { nombre: 'JOMB E-commerce', descripcion: 'Plataforma de comercio digital con inventario y medios de pago.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/jomb-ecommerce.html', category: 'web', tech: ['Django', 'Tailwind', 'Pagos'] },
    { nombre: 'Tienda Online', descripcion: 'E-commerce con carrito dinámico y pasarela de pagos.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/tienda-online.html', category: 'web', tech: ['Django', 'Bootstrap', 'Tailwind'] },
    { nombre: 'Masivos OLÉ! Logistics', descripcion: 'Sistema de gestión logístico para cotizaciones de transporte.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/masivos-ole-logistics.html', category: 'web', tech: ['Django', 'Bootstrap', 'Chart.js'] },
    { nombre: 'Finanworld', descripcion: 'Sistema de créditos de libranza para pensionados.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/finanworld.html', category: 'web', tech: ['Django', 'Tailwind'] },
    { nombre: 'Youtube-JOMB', descripcion: 'Aplicativo para descargar videos y audios en Windows y Linux.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/youtube-jomb.html', category: 'desktop', tech: ['Python', 'Tkinter', 'Pytube'] }
  ];

  function renderPortafolio(items = proyectos) {
    const grid = document.getElementById('portafolio-grid');
    const template = document.getElementById('portafolio-card-template');
    if (!grid || !template) return;
    const { create } = window.appDom || {};
    grid.replaceChildren();
    items.forEach((proyecto, index) => {
      const card = template.content.cloneNode(true);
      const image = card.querySelector('img');
      const title = card.querySelector('[data-role="title"]');
      const description = card.querySelector('[data-role="desc"]');
      const tags = card.querySelector('[data-role="tags"]');
      const action = card.querySelector('[data-role="action"]');
      if (image) {
        image.src = proyecto.imagen;
        image.alt = proyecto.nombre;
        image.onerror = () => { image.onerror = null; image.src = 'img/JOMB.webp'; };
      }
      if (title) title.textContent = proyecto.nombre;
      if (description) description.textContent = proyecto.descripcion;
      if (tags && create) {
        tags.replaceChildren(...proyecto.tech.map((tecnologia) => create('span', { class: 'rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-200', text: tecnologia })));
      }
      if (action && create) {
        const link = create('a', { href: proyecto.detalle, class: 'flex h-11 w-11 items-center justify-center rounded-full bg-purple-800 text-lg text-white shadow-lg transition hover:bg-purple-700 hover:-translate-y-0.5', 'aria-label': `Ver detalles de ${proyecto.nombre}` });
        link.innerHTML = '<i class="bi bi-arrow-right"></i>';
        action.replaceChildren(link);
      }
      grid.appendChild(card);
    });
  }

  function setupPortafolioControls() {
    const input = document.getElementById('portafolio-search');
    const buttons = [...document.querySelectorAll('.btn-neumorph[data-cat]')];
    const debounce = window.appDom?.debounce;
    if (!input || !buttons.length) return;
    let category = 'all';
    const filter = () => {
      const query = input.value.trim().toLowerCase();
      renderPortafolio(proyectos.filter((proyecto) => (category === 'all' || proyecto.category === category) && proyecto.nombre.toLowerCase().includes(query)));
    };
    input.oninput = debounce ? debounce(filter) : filter;
    buttons.forEach((button) => {
      button.onclick = () => {
        buttons.forEach((item) => item.classList.remove('bg-indigo-100', 'text-indigo-700'));
        button.classList.add('bg-indigo-100', 'text-indigo-700');
        category = button.dataset.cat || 'all';
        filter();
      };
    });
    filter();
  }

  window.appPortafolio = { renderPortafolio, setupPortafolioControls };
})();
