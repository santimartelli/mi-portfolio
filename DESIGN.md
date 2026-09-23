---
name: Santiago Martelli — portfolio
description: Portfolio oscuro y técnico: hospitalidad, operaciones y tecnología contadas como una sola trayectoria.
colors:
  void: "#0a0b0f"
  slate-deep: "#151821"
  slate: "#1f2937"
  slate-raised: "#374151"
  slate-line: "#4b5563"
  chalk: "#f8fafc"
  mist: "#e2e8f0"
  silver: "#cbd5e1"
  ash: "#94a3b8"
  ash-deep: "#64748b"
  signal-blue: "#3b82f6"
  signal-blue-deep: "#2563eb"
  cyan: "#06b6d4"
  violet: "#8b5cf6"
  success: "#10b981"
  warning: "#f59e0b"
  error: "#ef4444"
  paper: "#ffffff"
  paper-soft: "#f8fafc"
  paper-sunk: "#f1f5f9"
  ink: "#0f172a"
  ink-soft: "#1e293b"
  ink-muted: "#475569"
typography:
  display:
    fontFamily: "'Alumni Sans Hero', 'Alumni Sans Variable', 'Alumni Sans', system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 2rem + 7vw, 8rem)"
    fontWeight: 300
    lineHeight: 0.85
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Alumni Sans Hero', 'Alumni Sans Variable', 'Alumni Sans', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Alumni Sans Hero', 'Alumni Sans Variable', 'Alumni Sans', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "'Titillium Web', 'Inter variable', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.625
    letterSpacing: "normal"
  meta:
    fontFamily: "'Titillium Web', 'Inter variable', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  micro:
    fontFamily: "'Titillium Web', 'Inter variable', system-ui, sans-serif"
    fontSize: "0.6rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
  micro-lg:
    fontFamily: "'Titillium Web', 'Inter variable', system-ui, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  small:
    fontFamily: "'Titillium Web', 'Inter variable', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0px"
  focus: "2px"
  button: "12px"
  pill: "999px"
spacing:
  section: "8rem"
  section-lg: "10rem"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.chalk}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  button-secondary:
    backgroundColor: "{colors.void}"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  nav-link:
    backgroundColor: "{colors.void}"
    textColor: "{colors.ash}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.75rem"
---

# Santiago Martelli — Design System

> **Estado:** este documento describe el mundo **oscuro y técnico**, que es el que se sirve. Un rediseño hacia un mundo de papel cálido se construyó y se revirtió por decisión del usuario (ver `## Do's and Don'ts` y el final de este archivo). El contrato de dirección de la home vive en `.impeccable/surfaces/`.

## Overview

Portfolio profesional de una sola página, bilingüe, que cuenta una sola trayectoria: hospitalidad + operaciones + cliente + tecnología, con la tecnología como evidencia verificable en lugar de como titular.

El mundo es **oscuro y técnico**: fondo casi negro con tinte azulado, tipografía ligera de gran tamaño y un azul de señal como único acento saturado. La estética busca parecer la de alguien que construye software: minimalista, geométrica, sin adornos, con el código (Astro, React, TypeScript) como argumento.

Modo del visitante: **Persuade**. La página tiene que sostener una decisión y una acción: contactar.

## Colors

Dos temas con los mismos nombres de variable, así que los componentes no cambian de clase entre uno y otro.

Tema **oscuro** (por defecto):
- `void` — el suelo. Casi negro con tinte azulado.
- `slate-deep` / `slate` / `slate-raised` — superficies secundarias, tarjetas y hover.
- `slate-line` — bordes suaves.
- `chalk` — titulares y texto de máximo contraste.
- `mist` / `silver` — texto normal y secundario.
- `ash` / `ash-deep` — metadatos y texto apagado.
- `signal-blue` — el acento. Azul de señal, usado en enlaces, estados activos y el botón primario.
- `signal-blue-deep` — hover del acento.
- `cyan` / `violet` — acentos secundarios para gradientes.
- `success` / `warning` / `error` — estados.

Tema **claro**: los mismos papeles invertidos (`paper`, `paper-soft`, `paper-sunk`, `ink`, `ink-soft`, `ink-muted`) con el azul oscurecido a `#2563eb` para mantener el contraste sobre blanco.

## Typography

Dos familias con trabajos separados.

**Alumni Sans** es la voz de display: el nombre, los titulares de sección y los títulos de los casos de estudio. Es una condensada, y eso le da al titular un perfil editorial y vertical que la sans ancha no tiene. La pila se declara con `"Alumni Sans Hero"` delante —una fuente del sistema, no un archivo que sirvamos— y cae en `Alumni Sans Variable`, que sí viaja con el sitio.

**Titillium Web** se queda con todo el texto corrido, con **Inter variable** de respaldo. Titillium aporta el carácter ligeramente técnico y cuadrado del mundo, y se lee mucho mejor que una condensada en párrafos largos. El reparto es deliberado: Alumni Sans nunca se usa para leer, solo para titular.

La escala es la de Tailwind, de `text-xs` a `text-9xl`. El display llega a **8rem** en el nombre del hero (por encima del techo de 6rem que marca el craft floor de Impeccable: es una desviación conocida y deliberada de este mundo). El tracking negativo llega a −0.025em.

Los metadatos (etiquetas de sección, periodos, categorías) van en mayúsculas con tracking amplio, y los identificadores literales (correo, usuario) en monoespaciada.

> **Aviso de peso.** Los titulares usan `font-light` (300) y Alumni Sans es una condensada: a 300 y tamaño grande puede leerse demasiado fina. Si al verlo resulta anémica, el ajuste es subir el peso de los titulares a 400–500, no cambiar el tamaño.

## Layout

Las secciones **cruzan la pantalla** y el contenido se ordena con una única clase, `.shell`: ancho completo con un techo de `1800px` y márgenes laterales que crecen de `1.5rem` a `4rem` según el viewport. Ocupar todo el ancho no puede costar lectura, así que la prosa se limita aparte con `.measure` (68ch) y las cabeceras de sección van a `12` columnas: título a la izquierda, entradilla a la derecha.

Cada sección respira `5rem` en móvil y `7rem` en escritorio, y abre con un filete de 1px (`border-t`). El contenido denso se organiza en **unidades repetibles** con la misma anatomía: metadatos a la izquierda, relato a la derecha, filete entre unidades. Las listas largas (hitos de un puesto, canales de contacto, métricas) se despliegan en dos columnas o cruzan toda la anchura en vez de apilarse en una columna estrecha.

Los casos de estudio usan una unidad de dos columnas: a la izquierda la prueba visual y los datos (imagen, canal, stack, enlaces) con la imagen fija al hacer scroll; a la derecha el relato. La tabla de métricas cruza la anchura completa porque es una comparación.

## Elevation & Depth

La profundidad se declara **una sola vez y con borde de 1px** (`border-gray-200` en claro, `border-gray-700` en oscuro). No hay sombras: las utilidades `.theme-card` y `.theme-button-primary` que llevaban sombras teñidas de azul eran código muerto y se retiraron junto con `.theme-text-gradient`. Esto elimina las dos únicas desviaciones que el detector marcaba como anti-patrón (texto con degradado y halo de color sin offset).

## Shapes

Predominan las **esquinas rectas**: `border-radius` es 0 en contenedores, tarjetas, campos y enlaces. Hay tres excepciones documentadas:

- `focus` = 2px — el contorno de foco, para que no se vea roto en esquinas rectas.
- `button` = 12px — los botones de utilidad `.theme-button-primary` y `.theme-button-secondary`.
- `pill` = 999px — el raíl del conmutador de tema y los puntos de estado.

La mezcla es una inconsistencia conocida: lo coherente con el resto del mundo sería llevar los botones a 0 o 2px.

## Components

- **Botón primario** (`.theme-button-primary`): gradiente de `signal-blue` a `signal-blue-deep`, texto en blanco, sin radio, con elevación en hover.
- **Botón secundario** (`.theme-button-secondary`): transparente con borde de acento al 30%, texto en `mist`; en hover se rellena de acento al 10%.
- **Tarjeta** (`.theme-card`): fondo `slate`, borde de acento al 10%, hover con `slate-raised` y sombra de acento.
- **Filtros** (experiencia): botones con borde; el activo usa fondo `gray-100`/`gray-800` y texto de máximo contraste.
- **Enlaces de sección**: mayúsculas, tracking amplio, sin subrayado; el color cambia en hover.
- **Navbar**: fijo, con filete inferior. Las seis secciones viven en un **menú desplegable** que se abre con el botón de hamburguesa en todos los tamaños, con la sección activa resaltada. La barra no se anima a sí misma, así que es visible aunque no haya JavaScript.
- **Filtros** (experiencia): rectángulos con filete; el activo se invierte a tinta sólida. Llevan `aria-pressed`.
- **Filas enlazadas** (contacto, CV): rejilla de 12 columnas con etiqueta, valor y descripción; el fondo se aclara en hover.
- **Tabla de métricas**: cruza el ancho, con cifras monoespaciadas y `font-variant-numeric: tabular-nums`.

## Motion

Sin animaciones de entrada. Cada sección aparecía antes con el mismo fade-up, y ese patrón repetido es lo que resta sensación de solidez: el contenido ahora está visible de entrada en el HTML, sin depender de JavaScript.

Framer Motion se limita a lo funcional, donde una transición explica un cambio de estado: el desplegable del menú, el del selector de idioma y el botón de tema. La barra de navegación **no** se anima a sí misma, para que sea visible aunque no haya JavaScript.

Queda un único momento de motion, y es funcional: la apertura del menú.

## Do's and Don'ts

**Do**

- Usa `signal-blue` como única señal de acento; el resto del mundo es neutro.
- Mantén el peso 300 en los titulares grandes: es lo que da el aire técnico.
- Separa secciones con el `Divider` y deja respirar 8–10rem.
- Etiqueta en mayúsculas con tracking amplio; reserva la monoespaciada para identificadores.

**Don't**

- No introduzcas una segunda familia tipográfica: Titillium Web con Inter de respaldo es todo el sistema.
- No añadas radios: el mundo es de esquinas rectas.
- No uses el acento en superficies grandes; es una señal, no un fondo.
- No añadas animaciones de entrada ni hagas aparecer secciones al hacer scroll.
- No estires la prosa a todo el ancho: usa `.measure` para el texto y deja que `.shell` dé la anchura.

## Desviaciones conocidas

Registradas por el detector y el craft floor de Impeccable, **no corregidas** porque el usuario pidió volver a este mundo tal cual estaba. Si en el futuro se retoma el pulido, este es el orden de valor:

Resueltas en esta pasada: el kicker sobre el titular, el fade-up idéntico en cada sección, los `border-left` de color >1px, el halo de color sin offset, el tematizado de las superficies del navegador y el `<noscript>`.

Siguen abiertas:

1. **Display a 8rem**, por encima del techo de 6rem del craft floor.
2. **`Inter` como respaldo**: el detector la marca como fuente sobreusada.
3. **Peso del JS**: quedan dos islas hidratadas (navbar y filtro de experiencia) y Framer Motion viaja con el navbar para tres transiciones funcionales. Son ~89 kB comprimidos, casi todo el runtime de React. Sustituir esas dos islas por componentes de Astro con un script mínimo eliminaría React y Framer Motion enteros del envío.
