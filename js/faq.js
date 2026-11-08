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
    preguntas.forEach(([question, answer], index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'border border-gray-200 rounded-lg overflow-hidden neumorph';
      const button = document.createElement('button');
      button.type = 'button';
      const answerId = `faq-answer-${index + 1}`;
      button.className = 'faq-toggle w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', answerId);
      const questionLabel = document.createElement('span');
      questionLabel.className = 'flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100';
      const questionIcon = document.createElement('i');
      questionIcon.className = 'fa-solid fa-question-circle text-purple-800 dark:text-purple-300';
      questionIcon.setAttribute('aria-hidden', 'true');
      const questionText = document.createElement('span');
      questionText.textContent = question;
      questionLabel.append(questionIcon, questionText);
      const arrow = document.createElement('i');
      arrow.className = 'fa-solid fa-chevron-down text-purple-800 dark:text-purple-300';
      arrow.setAttribute('aria-hidden', 'true');
      button.append(questionLabel, arrow);
      const content = document.createElement('div');
      content.id = answerId;
      content.className = 'faq-answer max-h-0 overflow-hidden px-4 bg-white text-gray-700 dark:text-gray-200 border-t border-gray-200 transition-all duration-300';
      content.setAttribute('aria-hidden', 'true');
      const answerText = document.createElement('p');
      answerText.className = 'py-3';
      answerText.textContent = answer;
      content.appendChild(answerText);
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        container.querySelectorAll('.faq-answer').forEach((item) => {
          item.style.maxHeight = '0px';
          item.setAttribute('aria-hidden', 'true');
        });
        container.querySelectorAll('.faq-toggle').forEach((item) => {
          item.setAttribute('aria-expanded', 'false');
          const icon = item.querySelector('.fa-chevron-up');
          if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        });
        if (!isOpen) {
          content.style.maxHeight = `${content.scrollHeight}px`;
          content.setAttribute('aria-hidden', 'false');
          button.setAttribute('aria-expanded', 'true');
          arrow.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
      });
      wrapper.append(button, content);
      container.appendChild(wrapper);
    });
  }

  window.appFaq = { renderFAQ };
})();
