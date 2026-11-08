(() => {
  const servicios = [
    {
      titulo: 'Diseño Web Profesional',
      icono: 'bi-globe2',
      resumen: 'Sitios modernos, rápidos y adaptables a cada pantalla.',
      detalles: 'Diseño personalizado, optimización móvil y una base SEO para que tu marca se vea y funcione mejor.'
    },
    {
      titulo: 'Software y Licencias',
      icono: 'bi-patch-check',
      resumen: 'Instalación de software con licencias legítimas.',
      detalles: 'Te ayudamos a instalar y configurar software original como Office, antivirus, navegadores y herramientas de productividad.'
    },
    {
      titulo: 'Mantenimiento y Soporte Técnico',
      icono: 'bi-tools',
      resumen: 'Acompañamiento técnico para que todo siga funcionando.',
      detalles: 'Mantenimiento preventivo, actualizaciones, copias de respaldo y asistencia remota según tus necesidades.'
    },
    {
      titulo: 'Apps Móviles',
      icono: 'bi-phone',
      resumen: 'Aplicaciones móviles útiles y fáciles de usar.',
      detalles: 'Experiencias para iOS y Android, con diseño centrado en las personas e integración con tus servicios.'
    },
    {
      titulo: 'Integración de APIs',
      icono: 'bi-plug',
      resumen: 'Conecta tus plataformas y evita procesos repetidos.',
      detalles: 'Integramos APIs y servicios de terceros para que tus herramientas compartan información de forma coherente.'
    }
  ];

  function setFlipped(card, flipped) {
    card.classList.toggle('is-flipped', flipped);
    card.setAttribute('aria-expanded', String(flipped));
    card.setAttribute(
      'aria-label',
      `${card.dataset.title}. ${flipped ? 'Ver resumen' : 'Ver detalles'}`
    );
    card.querySelector('.service-flip-front')?.setAttribute('aria-hidden', String(flipped));
    card.querySelector('.service-flip-back')?.setAttribute('aria-hidden', String(!flipped));
  }

  function createCard(service, create) {
    const card = create('article', {
      class: 'service-flip-card group',
      tabindex: '0',
      role: 'button',
      'aria-expanded': 'false',
      'aria-label': `${service.titulo}. Ver detalles`,
      'data-title': service.titulo
    });
    const inner = create('div', { class: 'service-flip-inner' });

    const front = create('div', {
      class: 'service-flip-face service-flip-front relative overflow-hidden',
      'aria-hidden': 'false'
    });

    // Indicador triangular neumórfico en la esquina superior derecha
    const clickBadge = create('div', {
      class: 'service-flip-click-corner absolute top-0 right-0 grid h-20 w-20 justify-items-end items-start pt-2.5 pr-2.5 pointer-events-none',
      'aria-hidden': 'true',
      html: '<i class="bi bi-hand-index-thumb service-flip-click-icon inline-flex items-center justify-center text-lg leading-none transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110" aria-hidden="true"></i>'
    });

    // Icono redondo centrado encima del título
    const icon = create('div', {
      class: 'service-flip-icon !w-20 !h-20 aspect-square !p-0 shrink-0 !rounded-full flex items-center justify-center mx-auto mb-4',
      html: `<i class="bi ${service.icono} inline-flex items-center justify-center leading-none" aria-hidden="true"></i>`
    });

    // Título centrado
    const title = create('h3', {
      class: 'text-center',
      text: service.titulo
    });

    front.append(clickBadge, icon, title);

    // Cara trasera con la descripción del servicio
    const back = create('div', {
      class: 'service-flip-face service-flip-back',
      'aria-hidden': 'true'
    });
    back.append(
      create('h4', { text: service.titulo }),
      create('p', { text: service.detalles }),
      create('p', {
        class: 'service-flip-hint',
        text: 'Explora nuestros servicios o contáctanos'
      })
    );

    inner.append(front, back);
    card.appendChild(inner);

    let pointerInside = false;
    let focused = false;
    let pinned = false;
    const update = () => setFlipped(card, pointerInside || focused || pinned);

    card.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') {
        pointerInside = true;
        update();
      }
    });
    card.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse') {
        pointerInside = false;
        update();
      }
    });
    card.addEventListener('focus', () => {
      focused = card.matches(':focus-visible');
      update();
    });
    card.addEventListener('blur', () => {
      focused = false;
      update();
    });
    card.addEventListener('click', () => {
      if (pointerInside) return;
      pinned = !pinned;
      update();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        pinned = !pinned;
        update();
      }
      if (event.key === 'Escape') {
        pinned = false;
        focused = false;
        card.blur();
        update();
      }
    });

    return card;
  }

  function renderServicios() {
    const container = document.getElementById('contenedor-servicios');
    const { create, clearChildren } = window.appDom || {};
    if (!container || !create || !clearChildren) return;

    clearChildren(container);
    servicios.forEach((service) => container.appendChild(createCard(service, create)));
  }

  window.appServicios = { renderServicios };
})();