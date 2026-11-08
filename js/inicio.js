(() => {
  const proyectos = [
    { nombre: 'Tienda Online', descripcion: 'E-commerce con pasarela de pagos y carrito dinámico.', detalle: 'paginas/portafolio/tienda-online.html' },
    { nombre: 'JOMB E-commerce', descripcion: 'Plataforma de comercio digital con inventario y pagos.', detalle: 'paginas/portafolio/jomb-ecommerce.html' }
  ];

  function renderProyectos() {
    const grid = document.getElementById('proyectos-grid');
    const { create, clearChildren } = window.appDom || {};
    if (!grid || !create || !clearChildren) return;
    clearChildren(grid);
    proyectos.forEach((proyecto) => {
      const card = create('article', { class: 'relative overflow-hidden neumorph transition-transform duration-300 hover:-translate-y-1' });
      card.appendChild(create('div', { class: 'about-project-icon absolute right-4 top-4', html: '<i class="bi bi-star-fill" aria-hidden="true"></i>' }));
      card.appendChild(create('h3', { class: 'mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100', text: proyecto.nombre }));
      card.appendChild(create('p', { class: 'text-gray-700 dark:text-gray-300 text-sm mb-6', text: proyecto.descripcion }));
      card.appendChild(create('a', { href: proyecto.detalle, class: 'btn-neumorph inline-flex items-center rounded-full px-5 py-2 text-gray-800 dark:text-gray-100', html: 'Ver proyecto <i class="bi bi-arrow-right-short ml-1 text-2xl"></i>' }));
      grid.appendChild(card);
    });
  }

  window.appInicio = { renderProyectos };
})();
