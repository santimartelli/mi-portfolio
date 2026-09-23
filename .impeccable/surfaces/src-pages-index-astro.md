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

FIRST VIEWPORT: **Dos columnas** desde `lg` (6/6), apiladas en móvil, y el hero ocupa el alto de la ventana con el contenido centrado en vertical bajo el header (`min-h-screen` + `items-center` + `pt-[65px]`). A la izquierda: el titular en `display` (44–68px, token `--text-display`) —«Operaciones hoteleras + tecnología»—, el párrafo de presentación en `lead`, limitado por `.measure`, en un solo bloque sin cortes, la acción principal —«Ver experiencia», con `.cta-primary`, que enlaza a `#experience`— y cerrando la columna los tres accesos de contacto en iconos (LinkedIn, WhatsApp, correo). A la derecha, la ilustración del perfil (`/images/hero-portrait.webp`, 1000×1250, `loading="eager"`, con texto alternativo por idioma), que aportó el usuario; **su licencia está sin verificar** (ver la nota de procedencia en DESIGN.md), y cuyo alto está acotado para que no desborde. De la primera maqueta solo queda la rejilla de dos columnas: el antetítulo, los chips del enfoque, la experiencia práctica, la línea de disponibilidad y el panel se han ido retirando a petición del usuario, y de sus dos botones se conserva uno, el que lleva a la experiencia.
FORM: Pieza técnica clara con acento único. Roll de dirección `98d9d5d1` (modo persuade, index 3).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Historia

El 2026-09-23 se construyó un mundo alternativo de papel cálido como dirección fijada por el usuario, siguiendo su referencia a `impeccable.style`. El usuario lo rechazó y pidió volver al mundo oscuro, que era el que había entonces. Revertido en el commit `4426660`. No se reintenta sin una petición explícita.

Más tarde, ese mismo día, el usuario pidió retirar el conmutador de tema y quedarse con uno solo, y eligió el claro. El mundo oscuro y el papel cálido son por tanto historia: lo que se sirve hoy es `#ffffff` con el azul `#2563eb`.
