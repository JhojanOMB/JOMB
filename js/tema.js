document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggle-theme');
  const html = document.documentElement;

  // Verifica si hay tema guardado, si no, aplica "light" por defecto
  const temaGuardado = localStorage.getItem('theme');
  const temaInicial = temaGuardado || 'light';
  html.setAttribute('data-bs-theme', temaInicial);

  if (btn) {
    actualizarBoton(btn, temaInicial);

    btn.addEventListener('click', () => {
      const temaActual = html.getAttribute('data-bs-theme');
      const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-bs-theme', nuevoTema);
      localStorage.setItem('theme', nuevoTema);
      actualizarBoton(btn, nuevoTema);
    });
  }

  // Función opcional para cambiar el ícono del botón según el tema
  function actualizarBoton(boton, tema) {
    boton.innerHTML = tema === 'dark'
      ? '<i class="bi bi-sun-fill me-1"></i> Claro'
      : '<i class="bi bi-moon-fill me-1"></i> Oscuro';
  }
});
