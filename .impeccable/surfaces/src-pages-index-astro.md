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
- **Decisión abierta:** si el tema oscuro se mantiene como opción o se retira.

## Direction contract

THESIS: La web se presenta como una pieza **oscura y técnica**: casi negro con tinte azulado, tipografía ligera a gran escala y un único azul de señal, con el propio código como argumento. Refuta el portfolio claro de tarjetas y el badge de posicionamiento como titular.

OWN-WORLD: Fondo `#0a0b0f` con superficies `#151821` y `#1f2937`; texto de `#f8fafc` a `#94a3b8`; un solo acento saturado, `signal-blue` `#3b82f6`, con `#2563eb` en hover y cian/violeta para gradientes. Titillium Web en peso 300 con Inter de respaldo. Esquinas rectas, bordes de 1px, sombras tenidas de azul.

STORY: El visitante entiende en cinco segundos que el perfil combina operaciones hoteleras y tecnología, comprueba que hay producto real detrás, y escribe.

FIRST VIEWPORT: Una sola columna, **centrada en todos los tamaños**. El titular en `display` (44–68px, token `--text-display`) es la frase de posicionamiento —"Operaciones hoteleras y tecnología, en un mismo perfil."— y es también el `h1`. Debajo, la descripción en `lead` limitada por `.measure`, el dato de enfoque (rótulo "Enfoque" en `micro` y el valor "Hospitalidad + Operaciones + Tecnología") que resume los tres ejes para quien lee en diagonal, el contacto directo —LinkedIn, WhatsApp y correo como iconos con objetivo táctil de 44px, sin rótulo— y cerrando, la disponibilidad con su punto de estado, que late. Sin nombre propio y sin botón a la sección de experiencia: la navegación ya la cubre el header.
FORM: Pieza técnica oscura con acento único. Roll de dirección `98d9d5d1` (modo persuade, index 3).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Historia

El 2026-09-23 se construyó un mundo alternativo de papel cálido como dirección fijada por el usuario, siguiendo su referencia a `impeccable.style`. El usuario lo rechazó y pidió volver al mundo oscuro. Revertido en el commit `4426660`. No se reintenta sin una petición explícita.
