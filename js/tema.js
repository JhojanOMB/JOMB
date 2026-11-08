document.addEventListener('DOMContentLoaded', () => {
  const buttons = [
    document.getElementById('toggle-theme'),
    document.getElementById('toggle-theme-mobile')
  ].filter(Boolean);
  const root = document.documentElement;

  function updateButton(button, theme) {
    const icon = button.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark'
        ? 'bi bi-sun-fill text-xl'
        : 'bi bi-moon-fill text-xl';
    }
    button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  function applyTheme(theme, persist = true) {
    root.setAttribute('data-bs-theme', theme);
    root.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('dark', theme === 'dark');
    if (persist) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.warn('No se pudo guardar la preferencia de tema:', error);
      }
    }
    buttons.forEach((button) => updateButton(button, theme));
  }

  const initialTheme = root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(initialTheme, false);
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });
});
