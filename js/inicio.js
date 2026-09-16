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
    proyectos.forEach((proyecto, index) => {
      const card = create('article', { class: 'relative rounded-2xl overflow-hidden p-8 neumorph transition-transform duration-300 hover:-translate-y-1' });
      card.appendChild(create('div', { class: 'neumorph-bg absolute right-4 top-4 bg-indigo-600 w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md', html: '<i class="bi bi-star-fill text-xl"></i>' }));
      card.appendChild(create('h3', { class: 'text-xl font-semibold text-primary-custom mb-4', text: proyecto.nombre }));
      card.appendChild(create('p', { class: 'text-secondary-custom text-sm mb-6', text: proyecto.descripcion }));
      card.appendChild(create('a', { href: proyecto.detalle, class: 'btn-neumorph inline-flex items-center text-primary-custom px-5', html: 'Ver proyecto <i class="bi bi-arrow-right-short text-2xl ml-1"></i>' }));
      grid.appendChild(card);
    });
  }

  window.appInicio = { renderProyectos };
})();
