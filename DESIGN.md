---
name: Santiago Martelli — portfolio
description: Publicación profesional sobre papel cálido: hospitalidad, operaciones y tecnología en una sola historia.
colors:
  paper: "#faf9f6"
  paper-raised: "#ffffff"
  paper-sunk: "#f1efe8"
  paper-dark: "#14130f"
  paper-dark-raised: "#1c1a15"
  ink: "#17160f"
  ink-dark: "#f6f3ec"
  body: "#2e2c26"
  muted: "#635e54"
  faint: "#6f6b5e"
  rule: "rgba(23, 22, 15, 0.13)"
  rule-strong: "rgba(23, 22, 15, 0.28)"
  accent: "#e0a63a"
  accent-ink: "#7d5102"
  accent-wash: "rgba(224, 166, 58, 0.16)"
  patina: "#1c646d"
typography:
  display:
    fontFamily: "'Alumni Sans Variable', 'Alumni Sans', sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 4.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  display-sub:
    fontFamily: "'Alumni Sans Variable', 'Alumni Sans', sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Alumni Sans Variable', 'Alumni Sans', sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Alumni Sans Variable', 'Alumni Sans', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  lead:
    fontFamily: "'Albert Sans Variable', 'Albert Sans', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "'Albert Sans Variable', 'Albert Sans', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  meta:
    fontFamily: "'Albert Sans Variable', 'Albert Sans', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  micro:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  hairline: "1px"
spacing:
  prose: "68ch"
  section: "5rem"
  section-lg: "7rem"
  grid: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-ink}"
    textColor: "{colors.paper}"
  button-filter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.875rem"
  button-filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  row-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.25rem 0"
  row-link-hover:
    backgroundColor: "{colors.accent-wash}"
---

# Santiago Martelli — Design System

## Overview

El portfolio es una **publicación profesional**, no un escaparate de tarjetas. La jerarquía se construye con escala tipográfica, espacio y filetes de un píxel; las cajas se evitan deliberadamente porque una rejilla de contenedores iguales aplana la lectura y hace que todo pese lo mismo.

Norte: que un reclutador entienda en cinco segundos que este perfil combina operaciones hoteleras y tecnología, compruebe que hay producto real detrás, y escriba.

Modo del visitante: **Persuade**. La página tiene que sostener una decisión y una acción (contactar).

## Colors

Dos temas del mismo mundo: **papel cálido** de día y **tinta cálida** de noche. Ninguno de los dos es un gris neutro; todos los neutros están teñidos hacia el ámbar para que la página no se lea como una plantilla.

- `paper` — el suelo. Casi blanco, con un punto de calor.
- `paper-raised` — superficies que se despegan del suelo (desplegables, enlace de salto).
- `paper-sunk` — hueco bajo las imágenes mientras cargan.
- `ink` — titulares y texto de máximo contraste. También es el relleno del botón primario (botón de tinta sobre papel).
- `body` — texto corrido.
- `muted` — etiquetas, metadatos, descripciones secundarias.
- `faint` — micro-etiquetas y separadores. Es el neutro más claro que aún cumple AA (5.06:1 en claro, 5.70:1 en oscuro).
- `rule` / `rule-strong` — filetes de 1px. `rule` separa, `rule-strong` marca jerarquía (cabeceras de tabla, remates).
- `accent` — ámbar cálido. **Solo aparece como relleno, baño o punto.** Nunca como color de texto sobre papel: a 1.9:1 sería ilegible.
- `accent-ink` — el ámbar oscurecido que sí puede ser texto sobre papel (6.54:1) y el estado hover del botón primario.
- `patina` — verde azulado secundario, reservado para acentos fríos cuando haga falta distinguir.

Regla dura del sistema: **el ámbar no escribe**. Si algo tiene que ser ámbar y legible a la vez, se usa `accent-ink`, no `accent`.

## Typography

Tres familias, cada una con un trabajo y ningún solapamiento.

- **Alumni Sans** (display) para titulares y el nombre. Es una condensada: aguanta tamaño grande sin gritar y da al titular un perfil editorial en vez del sans ancho por defecto. Interlineado cerrado (0.92) y tracking negativo hasta −0.03em, nunca más.
- **Albert Sans** (texto) para todo lo que se lee de corrido. Medida de lectura de 68ch, interlineado 1.7. Es la voz neutral del sistema.
- **JetBrains Mono** (micro) solo para etiquetas, periodos, versiones, correos y cifras. Nunca para "parecer técnico" en prosa.

La escala va de `micro` (0.6875rem) a `display` (hasta 6rem). El techo de 6rem es deliberado: más grande deja de ser un titular y pasa a ser un cartel. Los pasos son amplios y evidentes para que la jerarquía se lea sin necesidad de color ni de cajas.

## Layout

Un contenedor de 6rem de padding lateral sobre `max-w-6xl`. Cada sección abre con un **filete de 1px** (`border-t border-rule`) y respira `5rem` en móvil y `7rem` en escritorio. No hay tarjetas: las secciones se separan por reglas y las filas por reglas.

Más espacio encima de un titular que debajo, siempre. Las listas largas (experiencia, implementación, canales) se resuelven como filas de 12 columnas con la etiqueta a la izquierda y el contenido a la derecha, que es lo que permite escanear rápido sin contenedores.

Medidas: prosa a 68ch; el titular del hero a 22–24ch para que rompa en dos líneas cortas y no en una tirada.

## Elevation & Depth

**No hay elevación.** El sistema declara profundidad una sola vez y con filetes, nunca con sombras: no existe ni una sombra en el sitio. La separación la hacen el filete de 1px y el espacio. Esto elimina el halo de color sin offset y el "ghost card" (borde más sombra difusa) que son los tics por defecto de una interfaz generada.

El único elemento que se despega (`paper-raised`) lo hace por color de fondo y borde, no por sombra.

## Shapes

Esquinas rectas. `border-radius` es 0 en todo el sistema, y el foco visible lleva 1px de radio para que el contorno no se vea roto. No hay píldoras, ni pastillas, ni chips redondeados: un control pequeño es un rectángulo con filete.

## Components

- **Botón primario** (`bg-ink` + `text-paper`): la acción principal. En hover pasa a `accent-ink` conservando el texto en papel. Es un bloque sólido, no una píldora.
- **Enlace secundario**: texto en `accent-ink` con subrayado de 1px y `text-underline-offset: 0.22em`; el subrayado se oscurece a `currentColor` en hover. El offset es parte del sistema, no un ajuste suelto.
- **Filtros** (experiencia): rectángulos con filete; el activo se invierte a tinta sólida. Llevan `aria-pressed`.
- **Filas enlazadas** (contacto, CV): rejilla de 12 columnas con etiqueta mono, valor y descripción; en hover se bañan de `accent-wash`. Nunca son tarjetas.
- **Tabla de métricas**: cabecera en micro mono con `rule-strong`, cifras en mono con `font-variant-numeric: tabular-nums` para que las columnas alineen.
- **Navbar**: fijo, con filete inferior. El menú y el selector de idioma se montan siempre y se revelan por opacidad, así que las transiciones son CSS y no hay parpadeo de layout.

## Do's and Don'ts

**Do**

- Construye jerarquía con escala, peso y espacio antes que con color.
- Usa `accent-ink` para cualquier texto que deba leerse; `accent` solo para relleno, baño o punto.
- Mantén el ámbar escaso: es una señal, no un tema.
- Separa con filetes de 1px y deja que el espacio haga el resto.
- Etiqueta con mono solo lo que es dato: fecha, versión, correo, cifra.

**Don't**

- No pongas un kicker ni una etiqueta encima de un titular. El titular se sostiene solo.
- No uses `accent` como color de texto sobre papel.
- No introduzcas sombras, halos ni desenfoques decorativos: el sistema no tiene elevación.
- No metas tarjetas dentro de tarjetas, ni rejillas de contenedores iguales como estructura de página.
- No uses `border-left` de color de más de 1px en tarjetas, filas ni avisos.
- No pases de 6rem en display ni de −0.03em de tracking.
- No añadas animaciones de entrada por sección: el sitio tiene un único momento de motion, el barrido del nombre.
