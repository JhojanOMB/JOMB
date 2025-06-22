document.addEventListener("DOMContentLoaded", () => {
    // Al cargar la página, muestra inicio por defecto
    cargarContenido("paginas/inicio.html");
});

function cargarContenido(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar la página');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('main').innerHTML = html;
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Esperar al DOM para insertar tarjetas si es inicio
            if (url.includes("inicio.html")) {
                insertarTarjetasServicios();
            }
        })
        .catch(error => {
            document.querySelector('main').innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        });
}

function insertarTarjetasServicios() {
    const servicios = [
        {
            titulo: "Diseño Web",
            icono: "bi-globe", // 🌐
            resumen: "Creamos páginas modernas, responsivas y rápidas.",
            detalles: "Tu sitio estará optimizado para móviles, con SEO básico y listo para posicionar tu marca."
        },
        {
            titulo: "Optimización de PCs",
            icono: "bi-speedometer2", // 🚀
            resumen: "Mejoramos el rendimiento de tu equipo.",
            detalles: "Limpieza de virus, optimización de arranque, y mejoras de velocidad garantizadas."
        },
        {
            titulo: "Instalación de Software",
            icono: "bi-download", // ⬇️
            resumen: "Instalamos y configuramos tus herramientas de trabajo.",
            detalles: "Office, Adobe, navegadores, software contable y más, todo legal y funcional."
        }
    ];

    const contenedor = document.getElementById("contenedor-servicios");

    if (!contenedor) {
        console.warn("⚠️ No se encontró el contenedor de servicios.");
        return;
    }

    contenedor.innerHTML = ""; // Por si ya hay algo

    servicios.forEach((servicio, index) => {
        const delay = (index + 1) * 100;
        const tarjeta = `
            <div class="col-lg-4 col-md-6 mb-4 d-flex justify-content-center" data-aos="flip-left" data-aos-delay="${delay}">
                <div class="card-container">
                    <div class="card-flip">
                        <div class="card-front bg-dark text-light text-center shadow-light border rounded-4">
                            <div class="card-body d-flex flex-column align-items-center p-3">
                                <h3 class="card-title fw-bold">${servicio.titulo}</h3>
                                <hr class="w-75 border border-3 rounded mb-3">
                                <div class="icono-servicio rounded-circle bg-black d-flex justify-content-center align-items-center mb-4" style="width: 90px; height: 90px;">
                                    <i class="${servicio.icono} fa-3x text-white"></i>
                                </div>
                                <p class="card-text">${servicio.resumen}</p>
                            </div>
                        </div>
                        <div class="card-back bg-morado-gradient text-light text-center shadow-light border rounded-4">
                            <div class="card-body d-flex flex-column align-items-center p-3">
                                <h4 class="fw-bold">Detalles</h4>
                                <hr class="w-75 border border-3 bg-white rounded-3 mb-3 mt-0">
                                <p>${servicio.detalles}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        contenedor.innerHTML += tarjeta;
    });
}
