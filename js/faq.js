(() => {
  const preguntas = [
    ['¿Cómo puedo solicitar un servicio?', 'Puedes usar el formulario de contacto o escribirnos directamente a WhatsApp.'],
    ['¿Trabajan de forma remota?', 'Sí, ofrecemos soporte remoto y presencial según el caso.'],
    ['¿Aceptan pagos en línea?', 'Sí, aceptamos transferencias, tarjetas y plataformas digitales.'],
    ['¿Qué tiempo tardan en responder?', 'Generalmente respondemos en menos de 24 horas.']
  ];

  function renderFAQ() {
    const container = document.getElementById('contenedor-faq');
    if (!container) return;
    container.replaceChildren();
    preguntas.forEach(([question, answer]) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'border border-gray-200 rounded-lg overflow-hidden neumorph';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'faq-toggle w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition focus:outline-none';
      button.innerHTML = `<span class="flex items-center gap-2"><i class="fa-solid fa-question-circle text-primary-custom"></i><span class="font-medium text-primary-custom">${question}</span></span><i class="fa-solid fa-chevron-down text-secondary-custom"></i>`;
      const content = document.createElement('div');
      content.className = 'faq-answer max-h-0 overflow-hidden px-4 bg-white text-secondary-custom border-t border-gray-200 transition-all duration-300';
      content.innerHTML = `<p class="py-3">${answer}</p>`;
      button.addEventListener('click', () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
        container.querySelectorAll('.faq-answer').forEach((item) => { item.style.maxHeight = '0px'; });
        container.querySelectorAll('.faq-toggle .fa-chevron-up').forEach((icon) => icon.classList.replace('fa-chevron-up', 'fa-chevron-down'));
        if (!isOpen) {
          content.style.maxHeight = `${content.scrollHeight}px`;
          button.querySelector('.fa-chevron-down')?.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
      });
      wrapper.append(button, content);
      container.appendChild(wrapper);
    });
  }

  window.appFaq = { renderFAQ };
})();
