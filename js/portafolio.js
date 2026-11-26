(() => {
  const proyectos = [
    { nombre: 'Tienda JOMB', descripcion: 'E-commerce con carrito dinamico y pasarela de pagos en linea.', imagen: 'img/Tienda_jomb/Dashboard.png', imagenes: [
      { src: 'img/Tienda_jomb/Dashboard.png', caption: 'Panel principal y resumen de actividad.' },
      { src: 'img/Tienda_jomb/Productos.png', caption: 'Administracion del catalogo de productos.' },
      { src: 'img/Tienda_jomb/Inventario.png', caption: 'Control del inventario disponible.' },
      { src: 'img/Tienda_jomb/Bodega.png', caption: 'Organizacion de productos por bodega.' }
    ], detalle: 'paginas/portafolio/tienda-online.html', category: 'web', tech: ['Django', 'Wompi', 'Tailwind', 'Angular'] },
    { nombre: 'Masivos OLE! Logistics', descripcion: 'Sistema de gestion logistico para cotizaciones de transporte.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/masivos-ole-logistics.html', category: 'web', tech: ['Django', 'Bootstrap', 'Chart.js'] },
    { nombre: 'Finanworld', descripcion: 'Sistema de creditos de libranza para pensionados.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/finanworld.html', category: 'web', tech: ['Django', 'Tailwind'] },
    { nombre: 'Youtube-JOMB', descripcion: 'Aplicativo para descargar videos y audios en Windows y Linux.', imagen: 'img/JOMB.webp', detalle: 'paginas/portafolio/youtube-jomb.html', category: 'desktop', tech: ['Python', 'Tkinter', 'Pytube'] }
  ];

  let activeProject = null;
  let activeImage = 0;
  let returnFocus = null;
  let screenshotTrigger = null;

  function closeScreenshot() {
    const lightbox = document.getElementById('tienda-screenshot-lightbox');
    if (!lightbox) return;
    lightbox.remove();
    document.body.classList.remove('preview-open');
    screenshotTrigger?.focus();
    screenshotTrigger = null;
  }

  function openScreenshot(image) {
    if (document.getElementById('tienda-screenshot-lightbox')) return;
    const lightbox = document.createElement('div');
    lightbox.id = 'tienda-screenshot-lightbox';
    lightbox.className = 'fixed inset-0 z-[2100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Imagen ampliada');
    screenshotTrigger = image;
    lightbox.innerHTML = '<button type="button" class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300" aria-label="Cerrar imagen ampliada">&times;</button><img class="max-h-[90vh] max-h-[90dvh] max-w-[94vw] object-contain" alt="">';
    const enlarged = lightbox.querySelector('img');
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt;
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox || event.target.closest('button')) closeScreenshot(); });
    document.body.appendChild(lightbox);
    document.body.classList.add('preview-open');
    lightbox.querySelector('button').focus();
  }

  document.addEventListener('click', (event) => {
    const image = event.target instanceof Element ? event.target.closest('#tienda-online figure img') : null;
    if (image) openScreenshot(image);
  });

  document.addEventListener('keydown', (event) => {
    const lightbox = document.getElementById('tienda-screenshot-lightbox');
    if (lightbox && event.key === 'Escape') { event.preventDefault(); closeScreenshot(); return; }
    if (!lightbox && event.target instanceof HTMLImageElement && event.target.matches('#tienda-online figure img') && ['Enter', ' '].includes(event.key)) {
      event.preventDefault(); openScreenshot(event.target);
    }
  });

  function ensureModal() {
    let modal = document.getElementById('project-preview');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'project-preview';
    modal.className = 'project-preview-backdrop';
    modal.hidden = true;
    modal.innerHTML = `<section class="project-preview neumorph" role="dialog" aria-modal="true" aria-labelledby="preview-title" aria-describedby="preview-description" tabindex="-1">
      <div class="preview-gallery"><div class="preview-stage"><img data-preview-image alt=""><button class="preview-arrow preview-prev" type="button" aria-label="Imagen anterior"><i class="bi bi-chevron-left" aria-hidden="true"></i></button><button class="preview-arrow preview-next" type="button" aria-label="Imagen siguiente"><i class="bi bi-chevron-right" aria-hidden="true"></i></button></div><div class="preview-indicators" role="group" aria-label="Imagenes del proyecto"></div><p class="preview-caption" data-preview-caption aria-live="polite"></p></div>
      <div class="preview-info"><button class="preview-close" type="button" aria-label="Cerrar vista previa"><i class="bi bi-x-lg" aria-hidden="true"></i></button><p class="preview-meta" data-preview-meta></p><h2 id="preview-title" data-preview-title></h2><p id="preview-description" data-preview-description></p><div class="preview-tags" data-preview-tags></div><div class="preview-actions"><a class="btn-neumorph-morado" data-preview-detail>Ver proyecto</a><a class="btn-neumorph preview-code" data-preview-code target="_blank" rel="noopener noreferrer">Ver codigo</a></div></div>
    </section>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => { if (event.target === modal) closePreview(); });
    modal.querySelector('.preview-close').addEventListener('click', closePreview);
    modal.querySelector('[data-preview-detail]').addEventListener('click', closePreview);
    modal.querySelector('.preview-prev').addEventListener('click', () => moveImage(-1));
    modal.querySelector('.preview-next').addEventListener('click', () => moveImage(1));
    return modal;
  }

  function renderPreviewImage() {
    const modal = document.getElementById('project-preview');
    if (!modal || !activeProject) return;
    const images = activeProject.imagenes || [{ src: activeProject.imagen, caption: `Vista de ${activeProject.nombre}.` }];
    activeImage = (activeImage + images.length) % images.length;
    const item = images[activeImage];
    const image = modal.querySelector('[data-preview-image]');
    image.src = item.src;
    image.alt = `${activeProject.nombre}: ${item.caption}`;
    modal.querySelector('[data-preview-caption]').textContent = item.caption;
    modal.querySelector('.preview-prev').hidden = images.length < 2;
    modal.querySelector('.preview-next').hidden = images.length < 2;
    modal.querySelector('.preview-indicators').replaceChildren(...images.map((entry, index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'preview-dot';
      button.setAttribute('aria-label', `Ver imagen ${index + 1}: ${entry.caption}`);
      button.setAttribute('aria-current', String(index === activeImage));
      button.addEventListener('click', () => { activeImage = index; renderPreviewImage(); });
      return button;
    }));
  }

  function openPreview(project, trigger) {
    const modal = ensureModal();
    activeProject = project; activeImage = 0; returnFocus = trigger;
    modal.querySelector('[data-preview-meta]').textContent = project.category === 'desktop' ? 'Escritorio' : 'Web';
    modal.querySelector('[data-preview-title]').textContent = project.nombre;
    modal.querySelector('[data-preview-description]').textContent = project.descripcion;
    modal.querySelector('[data-preview-tags]').replaceChildren(...project.tech.map((tech) => {
      const tag = document.createElement('span'); tag.textContent = tech; return tag;
    }));
    modal.querySelector('[data-preview-detail]').href = project.detalle;
    const code = modal.querySelector('[data-preview-code]');
    if (project.codigo) { code.href = project.codigo; code.hidden = false; } else code.hidden = true;
    renderPreviewImage(); modal.hidden = false; document.body.classList.add('preview-open');
    requestAnimationFrame(() => { modal.classList.add('is-open'); modal.querySelector('.project-preview').focus(); });
  }

  function closePreview() {
    const modal = document.getElementById('project-preview');
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open'); document.body.classList.remove('preview-open');
    window.setTimeout(() => { modal.hidden = true; returnFocus?.focus(); }, 220);
  }

  function moveImage(direction) {
    const images = activeProject?.imagenes || [];
    if (images.length < 2) return;
    activeImage += direction; renderPreviewImage();
  }

  document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('project-preview');
    if (!modal || modal.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closePreview(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveImage(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveImage(1); }
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button:not([hidden]), a:not([hidden])')].filter((el) => !el.disabled && el.offsetParent !== null);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  function renderPortafolio(items = proyectos) {
    const grid = document.getElementById('portafolio-grid');
    const template = document.getElementById('portafolio-card-template');
    if (!grid || !template) return;
    const { create } = window.appDom || {};
    grid.replaceChildren();
    if (!items.length) {
      const emptyState = create?.('p', { class: 'col-span-full rounded-2xl neumorph-inset p-8 text-center text-gray-700 dark:text-gray-200', text: 'No encontramos proyectos que coincidan con tu busqueda.' });
      if (emptyState) grid.appendChild(emptyState);
      return;
    }
    items.forEach((proyecto) => {
      const card = template.content.cloneNode(true);
      const cardRoot = card.querySelector('.portafolio-card');
      const image = card.querySelector('img');
      const title = card.querySelector('[data-role="title"]');
      const description = card.querySelector('[data-role="desc"]');
      const tags = card.querySelector('[data-role="tags"]');
      const action = card.querySelector('[data-role="action"]');
      if (image) { image.src = proyecto.imagen; image.alt = proyecto.nombre; image.onerror = () => { image.onerror = null; image.src = 'img/JOMB.webp'; }; }
      if (title) title.textContent = proyecto.nombre;
      if (description) description.textContent = proyecto.descripcion;
      if (tags && create) tags.replaceChildren(...proyecto.tech.map((tecnologia) => create('span', { class: 'rounded-full border px-3 py-1 text-xs font-semibold', text: tecnologia })));
      if (action && create) {
        const link = create('a', { href: proyecto.detalle, class: 'btn-neumorph-morado flex h-11 w-11 items-center justify-center rounded-full text-lg transition hover:-translate-y-0.5', 'aria-label': `Ver detalles de ${proyecto.nombre}` });
        link.innerHTML = '<i class="bi bi-arrow-right"></i>'; action.replaceChildren(link);
      }
      if (cardRoot) {
        cardRoot.tabIndex = 0; cardRoot.setAttribute('role', 'button'); cardRoot.setAttribute('aria-haspopup', 'dialog');
        cardRoot.setAttribute('aria-label', `Vista previa de ${proyecto.nombre}`);
        cardRoot.addEventListener('click', (event) => { if (!event.target.closest('a')) openPreview(proyecto, cardRoot); });
        cardRoot.addEventListener('keydown', (event) => { if (event.target === cardRoot && ['Enter', ' '].includes(event.key)) { event.preventDefault(); openPreview(proyecto, cardRoot); } });
      }
      grid.appendChild(card);
    });
  }

  function setupPortafolioControls() {
    const input = document.getElementById('portafolio-search');
    const buttons = [...document.querySelectorAll('#portafolio .btn-neumorph[data-cat]')];
    const debounce = window.appDom?.debounce;
    if (!input || !buttons.length) return;
    let category = 'all';
    const filter = () => {
      const query = input.value.trim().toLowerCase();
      renderPortafolio(proyectos.filter((proyecto) => {
        const searchableText = [proyecto.nombre, proyecto.descripcion, ...proyecto.tech].join(' ').toLowerCase();
        return (category === 'all' || proyecto.category === category) && searchableText.includes(query);
      }));
    };
    input.oninput = debounce ? debounce(filter) : filter;
    buttons.forEach((button) => { button.onclick = () => {
      buttons.forEach((item) => { item.classList.remove('is-selected'); item.setAttribute('aria-pressed', 'false'); });
      button.classList.add('is-selected'); button.setAttribute('aria-pressed', 'true'); category = button.dataset.cat || 'all'; filter();
    }; });
    filter();
  }

  window.appPortafolio = { renderPortafolio, setupPortafolioControls };
})();
