function cargarTarjetasServicios() {
    const servicios = [
        {
            titulo: "Diseño Web Profesional",
            icono: "fas fa-globe",
            resumen: "Desarrollamos sitios modernos, rápidos y adaptables a todos los dispositivos.",
            detalles: "Creamos páginas web optimizadas para móviles, con buen posicionamiento en buscadores (SEO básico) y diseño atractivo para tu marca."
        },
        {
            titulo: "Gestión de Computadores Corporativos",
            icono: "fas fa-laptop-medical",
            resumen: "Preparamos tus equipos para un uso seguro y exclusivo por parte de tu personal.",
            detalles: "Configuramos permisos, bloqueamos accesos innecesarios, realizamos limpieza profunda, optimizamos el rendimiento y protegemos la información de tu empresa."
        },
        {
            titulo: "Instalación de Software Legal",
            icono: "fas fa-download",
            resumen: "Instalamos y configuramos todo el software que necesitas para trabajar.",
            detalles: "Office, Adobe, navegadores, herramientas contables, antivirus y más. Todo instalado correctamente, actualizado y funcional."
        }
    ];

    const contenedor = document.getElementById("contenedor-servicios");
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpiar si ya había tarjetas

    servicios.forEach((servicio, index) => {
        const delay = (index + 1) * 100;

        const tarjeta = `
        <div class="col-lg-4 col-md-6 mb-4 d-flex justify-content-center" data-aos="flip-left" data-aos-delay="${delay}">
            <div class="card-container">
                <div class="card-flip">
                    <div class="card-front bg-dark text-light text-center shadow-light border rounded-4">
                        <div class="card-body d-flex flex-column align-items-center p-3">
                            <h3 class="card-title fuente-secundaria">${servicio.titulo}</h3>
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

    // Reinicializar AOS después de insertar las tarjetas (importante)
    if (typeof AOS !== "undefined") {
        AOS.refresh();
    }
}
