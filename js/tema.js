const btn = document.getElementById('toggle-theme');
const setTheme = t => {
    document.documentElement.setAttribute('data-bs-theme', t);
    localStorage.setItem('theme', t);
    btn.innerHTML = t === 'dark'
    ? '<i class="fa-solid fa-sun"></i> Claro'
    : '<i class="fa-solid fa-moon"></i> Oscuro';
};
btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});
// Aplica tema guardado al cargar la página
setTheme(localStorage.getItem('theme') || 'light');