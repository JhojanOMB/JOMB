(() => {
  const servicios = [
    [
      'Diseño Web Profesional',
      'bi-globe2',
      'Sitios modernos, rápidos y adaptables.',
      'Optimización móvil, SEO básico y diseño visual atractivo.'
    ],
    [
      'Gestión de Computadores',
      'bi-pc-display-horizontal',
      'Equipos seguros y corporativos.',
      'Instalación, limpieza, bloqueo de accesos y más.'
    ],
    [
      'Software Legal',
      'bi-download',
      'Instalación de todo tu software.',
      'Office, Adobe, antivirus, navegadores y más.'
    ],
    [
      'Mantenimiento y Soporte',
      'bi-tools',
      'Respaldo y monitoreo continuo.',
      'Actualizaciones, parches de seguridad y asistencia 24/7.'
    ],
    [
      'Consultoría Tecnológica',
      'bi-people',
      'Estrategia para tu infraestructura.',
      'Diagnóstico, optimización de procesos y roadmap tecnológico.'
    ],
    [
      'Apps Móviles',
      'bi-phone',
      'iOS y Android nativas o híbridas.',
      'Diseño UX/UI, integración con tu backend y publicación en tiendas.'
    ],
    [
      'Integración de APIs',
      'bi-plug',
      'Conecta tus sistemas.',
      'REST, GraphQL y servicios de terceros.'
    ],
    [
      'SEO y Rendimiento',
      'bi-speedometer2',
      'Mejora tu visibilidad en Google.',
      'Auditoría SEO, Core Web Vitals y optimización de carga.'
    ]
  ];

  function renderServicios() {
    const container = document.getElementById('contenedor-servicios');
    const { create, clearChildren } = window.appDom || {};

    if (!container || !create || !clearChildren) {
      return;
    }

    clearChildren(container);

    servicios.forEach(
      ([titulo, icono, resumen, detalles], index) => {

        // =====================================================
        // TARJETA
        // =====================================================

        const card = create('div', {
          class: 'servicio-flip',
          tabindex: '0',
          role: 'button',
          'aria-label': `${titulo}. Ver detalles`,
          'data-aos': 'fade-up',
          'data-aos-delay': `${(index + 1) * 100}`
        });


        // =====================================================
        // CONTENEDOR 3D
        // =====================================================

        const inner = create('div', {
          class: 'servicio-flip-inner'
        });


        // =====================================================
        // CARA FRONTAL
        // =====================================================

        const front = create('div', {
          class: 'servicio-flip-front'
        });


        // Icono

        const iconCircle = create('div', {
          class: 'servicio-flip-icon',
          html: `
            <i
              class="bi ${icono}"
              aria-hidden="true">
            </i>
          `
        });


        // Título

        const tituloElemento = create('h3', {
          text: titulo
        });


        // Resumen

        const resumenElemento = create('p', {
          text: resumen
        });


        front.append(
          iconCircle,
          tituloElemento,
          resumenElemento
        );


        // =====================================================
        // CARA TRASERA
        // =====================================================

        const back = create('div', {
          class: 'servicio-flip-back'
        });


        // Título

        const detallesTitulo = create('h4', {
          text: 'Detalles'
        });


        // Separador

        const separador = create('hr');


        // Detalles

        const detallesTexto = create('p', {
          text: detalles
        });


        back.append(
          detallesTitulo,
          separador,
          detallesTexto
        );


        // =====================================================
        // ENSAMBLAR
        // =====================================================

        inner.append(
          front,
          back
        );

        card.appendChild(inner);


        // =====================================================
        // CLICK
        // =====================================================

        card.addEventListener('click', () => {
          card.classList.toggle('is-flipped');

          const volteada = card.classList.contains('is-flipped');

          card.setAttribute(
            'aria-label',
            volteada
              ? `${titulo}. Ocultar detalles`
              : `${titulo}. Ver detalles`
          );
        });


        // =====================================================
        // TECLADO
        // =====================================================

        card.addEventListener('keydown', (event) => {

          if (
            event.key === 'Enter' ||
            event.key === ' '
          ) {

            event.preventDefault();

            card.classList.toggle('is-flipped');

            const volteada =
              card.classList.contains('is-flipped');

            card.setAttribute(
              'aria-label',
              volteada
                ? `${titulo}. Ocultar detalles`
                : `${titulo}. Ver detalles`
            );
          }
        });


        container.appendChild(card);
      }
    );
  }


  window.appServicios = {
    renderServicios
  };
})();

