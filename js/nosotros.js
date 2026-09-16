(() => {
  function inicializarNosotros() {
    const seccion = document.getElementById('sobre-nosotros-body');
    if (!seccion) return;
    seccion.classList.add('module-nosotros');
  }

  window.appNosotros = { inicializarNosotros };
})();
