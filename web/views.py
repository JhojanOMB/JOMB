from django.shortcuts import render

def index(request):
    servicios_base = [
        {
            "titulo": "Instalación de Windows",
            "icono": "fa-brands fa-windows",
            "resumen": "Instalamos cualquier versión de Windows en tu equipo.",
            "detalles": "Incluye la instalación de drivers, programas esenciales y limpieza interna."
        },
        {
            "titulo": "Mejora de Rendimiento",
            "icono": "fa-solid fa-rocket",
            "resumen": "Aceleramos tu equipo mejorando su capacidad y velocidad.",
            "detalles": "Optimización de hardware y software, limpieza de archivos temporales y ajustes."
        },
        {
            "titulo": "Desarrollo Web",
            "icono": "fa-solid fa-laptop-code",
            "resumen": "Desarrollamos sitios web profesionales y personalizados.",
            "detalles": "Diseño responsivo, integración de sistemas de pago y más."
        },
    ]
    servicios = []
    for i, s in enumerate(servicios_base):
        s["delay"] = (i + 1) * 100  # 100ms, 200ms, 300ms...
        servicios.append(s)

    extras_base = [
        {
          "titulo": "Diseños Innovadores",
          "icono": "fas fa-cogs",
          "descripcion": "Potencia tu creatividad con herramientas avanzadas de diseño."
        },
        {
          "titulo": "Almacenamiento en la Nube",
          "icono": "fas fa-cloud",
          "descripcion": "Accede a tus archivos desde cualquier lugar con seguridad."
        },
        {
          "titulo": "Espacio Colaborativo",
          "icono": "fas fa-users",
          "descripcion": "Fomenta la colaboración en tiempo real con tu equipo."
        },
    ]
    extras = []
    for i, e in enumerate(extras_base):
        e["delay"] = (i + 1) * 100
        extras.append(e)

    return render(request, 'index.html', {
        'servicios': servicios,
        'extras': extras,
    })

def sobre_nosotros(request):
    valores = [
        {'nombre': 'Innovación', 'descripcion': 'Nos comprometemos con la innovación constante para brindar soluciones de vanguardia.'},
        {'nombre': 'Colaboración', 'descripcion': 'Fomentamos un ambiente de trabajo colaborativo para alcanzar resultados excepcionales.'},
        {'nombre': 'Calidad', 'descripcion': 'La calidad es fundamental en cada uno de nuestros proyectos y servicios.'},
        {'nombre': 'Integridad', 'descripcion': 'Actuamos con honestidad y transparencia en todas nuestras relaciones.'}
    ]
    
    proyectos = [
        {
            "nombre": "Cotizador de Envíos",
            "descripcion": "App para generar cotizaciones de viajes.",
            "imagen": "portafolio/cotizador/JOMB.webp",
            "demo": False
        },
        {
            "nombre": "Punto de Venta JOMB",
            "descripcion": "Visualización de cotizaciones, ingresos y más.",
            "imagen": "portafolio/pvjomb/JOMB.webp",
            "demo": True,
            "link": "https://web-production-482151.up.railway.app/"
        },
        {
            "nombre": "Horario-Timer",
            "descripcion": "Manejo de horas laborales propias.",
            "imagen": "portafolio/horario_timer/JOMB.webp",
            "demo": True,
            "link": "https://horariotimer-production.up.railway.app/"
        }
    ]
    
    return render(request, 'sobre_nosotros.html', {'valores': valores, 'proyectos': proyectos})


def servicios(request):
    return render(request, 'servicios.html')

def contacto(request):
    return render(request, 'contacto.html')

def portafolio(request):
    apps = [
        {
            "nombre": "Cotizador de Envíos",
            "descripcion": "App para generar cotizaciones de viajes.",
            "imagen": "portafolio/cotizador/JOMB.webp",
            "demo": False
        },
        {
            "nombre": "Punto de Venta JOMB",
            "descripcion": "Visualización de cotizaciones, ingresos y más.",
            "imagen": "portafolio/pvjomb/JOMB.webp",
            "demo": True,
            "link": "https://web-production-482151.up.railway.app/"
        },
        {
            "nombre": "Horario-Timer",
            "descripcion": "Manejo de horas laborales propias.",
            "imagen": "portafolio/horario_timer/JOMB.webp",
            "demo": True,
            "link": "https://horariotimer-production.up.railway.app/"
        }

        
    ]
    return render(request, 'portafolio.html', {'apps': apps})
