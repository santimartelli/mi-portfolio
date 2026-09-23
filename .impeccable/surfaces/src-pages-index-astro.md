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

THESIS: La web es una **publicación profesional**, no un escaparate de tarjetas: tipografía con carácter sobre papel cálido, jerarquía por escala y espacio, y separaciones por filetes de un píxel. Refuta la rejilla de tarjetas iguales, el kicker sobre el titular y el halo de color sin offset.

OWN-WORLD: Papel cálido (#FAF9F6) y tinta casi negra (#171614); acento ámbar que solo aparece como baño o filete, nunca como texto sobre papel claro, con un ámbar oscuro para texto cuando haga falta contraste; un verde patina secundario. Alumni Sans condensada para display, Albert Sans para texto, JetBrains Mono solo para etiquetas y cadenas literales. Esquinas rectas, filetes de 1px, cero sombras decorativas.

STORY: El visitante entiende en cinco segundos que el perfil combina operaciones hoteleras y tecnología, comprueba que hay producto real detrás, y escribe.

FIRST VIEWPORT: Sobre papel, sin kicker. El nombre en Alumni Sans a 6rem como máximo, ocupando el ancho de lectura; debajo, el titular de posicionamiento en dos líneas; después una línea de contexto operativo y los dos accesos (experiencia y contacto). Un único momento de motion: el nombre se descubre con un barrido de máscara al cargar.

FORM: Publicación sobre papel con filetes, séptima de siete candidatas; seed de dirección `98d9d5d1` (modo persuade, index 3). Dirección fijada por el usuario por encima del roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
