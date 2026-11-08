# Guía de diseño JOMB

## Estructura de la interfaz

- `index.html` es el shell común: navegación, contenedor de vistas, pie legal y aviso de cookies.
- `paginas/*.html` son fragmentos que `js/carga.js` obtiene dentro de `#content`; no deben repetir `<html>`, `<head>` ni importar scripts globales.
- `paginas/portafolio/*.html` contiene las fichas individuales de proyectos, también cargadas en el shell.
- `css/estilo.css` concentra variables, componentes compartidos, navegación, superficies y transiciones.
- `css/contacto.css`, `css/servicios.css`, `css/portafolio.css` y `css/sobre-nosotros.css` añaden reglas específicas de cada módulo.
- `js/tema.js`, `js/consentimiento.js` y `js/carga.js` controlan tema, preferencias y navegación, respectivamente. Los otros módulos renderizan o inicializan sus vistas.

## Sistema visual

La superficie principal usa un lenguaje neumórfico suave: base uniforme, sombras elevadas para paneles, botones y controles, sombras interiores para campos, contenedores hundidos y acciones presionadas, esquinas amplias y acento violeta. Los fondos fotográficos y degradados se reservan para imágenes, el hero y las acciones principales; no se usan como sustituto de la superficie común de los componentes. Las vistas dinámicas normalizan al final de la cascada los colores de texto y superficies Tailwind para conservar contraste entre temas.

| Token CSS | Claro | Oscuro | Uso |
|---|---|---|---|
| `--neumo-bg` / `--bg-body` | `#e0e5ec` | `#1e2430` | Fondo de página y superficies |
| `--neumo-light` | `#ffffff` | `#2d3748` | Sombra clara |
| `--neumo-dark` | `#bebebe` | `#0a0e12` | Sombra oscura |
| `--text` | `#0f172a` | `#f8fafc` | Texto principal |
| `--bg-secondary` | `#f8fafc` | `#1e2430` | Superficie secundaria |
| `--primary-morado` | `#6b21a8` | `#7c3aed` | Acción y énfasis |
| `--primary-light-morado` | `#a78bfa` | `#a78bfa` | Acento y foco |
| `--surface-shadow-dark` | `rgba(163, 177, 198, .72)` | `rgba(18, 22, 31, .9)` | Sombra elevada |
| `--surface-shadow-light` | `rgba(255, 255, 255, .9)` | `rgba(42, 51, 68, .82)` | Contraluz |

Los textos neutros Tailwind se normalizan a `#334155` en claro y `#e2e8f0` en oscuro. Los acentos violetas se ajustan a `#5b21b6` y `#c4b5fd`, respectivamente; texto blanco de botones conserva su contraste sobre fondos de acción.

### Tema claro

- Fondo y módulos comparten la base gris azulada `#e0e5ec`.
- El hero usa un degradado claro entre blanco, gris azulado y violeta suave; sus textos se mantienen oscuros. El navbar, las secciones y los controles usan la superficie y sombras neumórficas del tema.
- Texto principal oscuro y acento violeta oscuro para mantener legibilidad.
- Las tarjetas `.neumorph` se elevan; `.neumorph-inset` se usa para entradas o zonas hundidas.
- Las superficies Tailwind blancas/grises se normalizan a los tokens para evitar paneles blancos ajenos al sistema.

### Tema oscuro

- Se mantiene la misma jerarquía y geometría con fondo `#1e2430`, texto claro y sombras de bajo contraste.
- El hero conserva su degradado oscuro violeta con texto claro y acentos lavanda. El navbar y los componentes cambian a la misma base oscura con sombras tenues, sin fondos blancos fijos.
- El violeta claro identifica iconos, enlaces y foco; los botones primarios conservan texto blanco.
- Se elige el tema guardado y, si no existe, la preferencia del sistema operativo. El control manual se guarda localmente.

## Componentes e interacciones

- **Navegación:** navbar adaptable de vidrio líquido con fondo translúcido, desenfoque y enlaces en cápsulas con relieve/estado activo; controles hundidos al presionar y panel lateral neumórfico en móvil. Navbar y contenido tienen transiciones propias; todo movimiento respeta `prefers-reduced-motion`.
- **Vistas:** salida con desenfoque y desplazamiento sutil seguida por una entrada suave; las peticiones antiguas no deben reemplazar la vista más reciente. El foco es el contenido, no el movimiento decorativo del navbar.
- **Tarjetas y servicios:** los beneficios y servicios usan contenedores hundidos; cada servicio distribuye información e imagen 4:3 en dos columnas y se apila en móvil. Las tarjetas interactivas de Inicio giran en 3D con soporte para teclado/toque y una esquina triangular elevada, alineada y superpuesta al borde, con luces y sombras ligadas al tema claro u oscuro.
- **Botones y acciones flotantes:** los controles usan superficie elevada y se hunden al presionar; las acciones primarias conservan el degradado violeta con relieve. WhatsApp, volver arriba, filtros, avisos de cookies, enlaces sociales y controles del footer siguen la misma geometría y adaptan las sombras al tema.
- **Formulario:** Inicio reutiliza la columna del formulario de Contacto, sin duplicar la columna de datos de contacto; entradas y áreas de texto hundidas, iconos temáticos, etiquetas accesibles, validación y foco visible.
- **Sobre nosotros:** el panel «¿Quiénes somos?» mantiene su diseño; misión/visión, metas, valores y proyectos usan una jerarquía renovada de paneles neumórficos.
- **Portafolio:** fichas, etiquetas, filtros y acciones usan tokens neumórficos. Las tarjetas de pago de la ficha JOMB E-commerce mantienen sus colores de marca como parte de la demostración del producto.
- **Filtros:** controles neumórficos con estado seleccionado y `aria-pressed`; la búsqueda del portafolio cubre nombre, descripción y tecnología.
- **Cookies:** aviso accesible con elección registrada en almacenamiento local; incluye aceptar, solo necesarias y rechazar opcionales. En la versión actual no hay analítica ni publicidad que se activen con una aceptación.
- **Movimiento:** cualquier transición debe respetar `prefers-reduced-motion`; evitar animaciones permanentes que distraigan.
- **Ancho y espaciado:** diseñar primero para móvil; tarjetas se apilan en una columna y se amplían a varias columnas en puntos de quiebre Tailwind.

## Reglas al añadir una vista

1. Usa una sección con un `id` único y títulos en orden semántico (`h1` y después `h2`).
2. Usa `.neumorph` para paneles y `.neumorph-inset` para controles o paneles interiores; evita sombras duras locales si no son necesarias.
3. Usa tokens de tema para colores en CSS propio. Si usas utilidades Tailwind, proporciona variantes `dark:` cuando el contraste no esté resuelto por las reglas globales.
4. Los enlaces internos a vistas deben apuntar a `paginas/...` o declarar `data-load`; no dupliques manejadores inline.
5. Da nombre accesible a controles e imágenes informativas, y conserva `:focus-visible`, teclado y estados `aria-*`.
6. No incorpores analítica, publicidad, píxeles ni almacenamiento opcional sin actualizar el control de consentimiento y esta guía legal.

## Privacidad y publicación

`paginas/privacidad.html` documenta el almacenamiento funcional y el formulario con los datos del responsable suministrados para el proyecto. Antes de publicarla como política definitiva, verificar ortografía legal del nombre, identificación, dirección completa, canal y proceso para derechos, proveedor/receptor real, ubicación/garantías del tratamiento y aplicación efectiva del plazo de conservación. No inventar esos datos. Revisar también los recursos externos y las políticas de sus proveedores.
