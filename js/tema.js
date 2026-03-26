document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggle-theme');
  const html = document.documentElement;

  // Función para actualizar el ícono del botón según el tema
  function actualizarBoton(boton, tema) {
    const icono = boton.querySelector('i');
    if (icono) {
      icono.className = tema === 'dark'
        ? 'bi bi-sun-fill text-xl'
        : 'bi bi-moon-fill text-xl';
    }
  }

  // Obtener tema actual del HTML (ya fue establecido en el script inline del head)
  const temaActual = html.getAttribute('data-bs-theme') || 'light';

  const aplicarTema = (tema) => {
    html.setAttribute('data-bs-theme', tema);
    html.classList.toggle('dark', tema === 'dark');

    // Tailwind utiliza `.dark` en el root para variantes dark:*
    document.body.classList.toggle('dark', tema === 'dark');

    localStorage.setItem('theme', tema);
    actualizarBoton(btn, tema);
  };

  if (btn) {
    // Actualizar icono del botón y aplicar estado inicial
    aplicarTema(temaActual);

    // Evento click para cambiar de tema
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const nuevoTema = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevoTema);
      console.log('Tema cambiado a:', nuevoTema);
    });
  } else {
    console.warn('Botón toggle-theme no encontrado');
  }
});
