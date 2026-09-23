---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/en/index.astro"]
---

# Surface brief — portfolio (home, `/` y `/en/`)

Modo: **Persuade**. El visitante decide y actúa: contactar.

- **Alcance:** la home completa en los dos idiomas. Fuera de alcance: el CV de Hotel Tech (no existe) y cualquier página nueva.
- **Audiencia y trabajo:** reclutador de hotel tech / SaaS que llega desde LinkedIn en móvil y decide en minutos si esta persona encaja en customer success, implementation, onboarding o soporte. También reclutador técnico y posible cliente freelance, con el mismo peso.
- **Acción:** escribir por email o LinkedIn. Prueba disponible: cuatro casos de estudio reales, experiencia hotelera verificable y métricas medidas.
- **Restricciones:** no publicar importes ni datos del establecimiento; no enlazar repositorios privados; no inventar métricas, testimonios ni logos. Conservar i18n/SSR, SEO, accesibilidad y el contenido ya validado.
- **Resuelto:** el tema oscuro se retiró junto con su conmutador; el sitio sirve un único tema claro.

## Direction contract

THESIS: La web se presenta como una pieza **clara y técnica**: papel blanco, tipografía ligera a gran escala y un único azul de señal, con el propio código como argumento. Refuta el portfolio claro de tarjetas y el badge de posicionamiento como titular.

OWN-WORLD: Fondo `#ffffff` con superficies `#f8fafc` y `#f1f5f9`; texto de `#0f172a` a `#64748b`; un solo acento saturado, `signal-blue` `#2563eb`, con `#1d4ed8` en hover. Manrope en peso 300, una sola familia. Esquinas rectas y bordes de 1px. Hubo un tema oscuro y un conmutador; se retiraron a petición del usuario, así que el sitio tiene un único juego de tokens.

STORY: El visitante entiende en cinco segundos que el perfil combina operaciones hoteleras y tecnología, comprueba que hay producto real detrás, y escribe.

FIRST VIEWPORT: **Dos columnas** desde `lg` (6/6), apiladas en móvil, y el hero ocupa el alto de la ventana con el contenido centrado en vertical bajo el header (`min-h-screen` + `items-center` + `pt-[65px]`). En móvil la imagen va primera (por `order`) y el bloque se alinea arriba, pegando a la imagen al borde del header, el texto sigue a la izquierda desde `lg` y los espacios se aprietan y el párrafo baja a `base` (16px) para que quepa el hero entero: gap de rejilla 0,75rem, márgenes de párrafo y fila 0,75rem y 1rem, `pb` de 1rem y la entradilla con interlineado 1,5 en vez del 1,65 de la escala. La imagen ocupa el ancho completo en móvil, que es lo que la deja ancha y baja. En escritorio el párrafo vuelve a `lead` (18px) y los espacios a sus valores de siempre. A la izquierda: el titular en `display` (44–68px, y 28–40px por debajo de 1024px, token `--text-display`) —«Operaciones hoteleras + tecnología»—, el párrafo de presentación en `lead`, limitado por `.measure`, en un solo bloque sin cortes, y, centrados juntos en una misma fila, la acción principal —«Ver experiencia» en versalitas, con `.cta-primary` sólido en negro, que enlaza a `#experience`— y los tres accesos de contacto en iconos (LinkedIn, WhatsApp, correo), de 24px sobre objetivos táctiles de 48px y sin rótulo. Al pie, un marquee con las características en piezas cortas («+8 años en operaciones hoteleras», «Marriott · Dorna Sports / MotoGP», los idiomas, la ubicación), separadas por un punto y desplazándose en bucle, con los dos costados difuminados por una máscara de desvanecido (porcentual, con suelo de `2.5rem` y tope de `10rem`) para que nada se corte a media palabra contra el borde; en móvil es el último bloque del reparto y desde `lg` ocupa una fila propia a lo ancho, y bajo `prefers-reduced-motion` no se mueve: queda quieto al principio y solo se difumina por la derecha. El detector lo marca como `[marquee]`, y es la única desviación marcada del proyecto (ver DESIGN.md). A la derecha, la ilustración del perfil, con dos recortes servidos por `<picture>`: el apaisado (`/images/hero-landscape.webp`, 1400×611, ya recortado el aire de origen) por debajo de 1024px, donde ocupa el ancho completo y por eso queda ancha y baja, y el vertical (`/images/hero-portrait.webp`, 1000×1102, tambien recortado) desde 1024px. Va en `loading="eager"` y con texto alternativo por idioma, que aportó el usuario; **su licencia está sin verificar** (ver la nota de procedencia en DESIGN.md), y cuyo tamaño está acotado por alto y por ancho para que no desborde; sus topes pequeños solo aplican por debajo de 1024px, y en escritorio vuelven a los anteriores. Desde `lg` la imagen se pega al borde derecho de su columna (`margin-inline-start: auto`), no se centra en ella: el texto arranca en el borde izquierdo del contenedor, así que las dos mitades quedan a la misma distancia del borde de la página y el hero se lee centrado y alineado con la rejilla del resto de secciones. De la primera maqueta solo queda la rejilla de dos columnas: el antetítulo, los chips del enfoque, la experiencia práctica, la línea de disponibilidad y el panel se han ido retirando a petición del usuario, y de sus dos botones se conserva uno, el que lleva a la experiencia.
FORM: Pieza técnica clara con acento único. Roll de dirección `98d9d5d1` (modo persuade, index 3).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Historia

El 2026-09-23 se construyó un mundo alternativo de papel cálido como dirección fijada por el usuario, siguiendo su referencia a `impeccable.style`. El usuario lo rechazó y pidió volver al mundo oscuro, que era el que había entonces. Revertido en el commit `4426660`. No se reintenta sin una petición explícita.

Más tarde, ese mismo día, el usuario pidió retirar el conmutador de tema y quedarse con uno solo, y eligió el claro. El mundo oscuro y el papel cálido son por tanto historia: lo que se sirve hoy es `#ffffff` con el azul `#2563eb`.
