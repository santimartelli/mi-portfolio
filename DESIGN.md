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
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 6.2vw, 5.6rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 3.6vw, 3.4rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.625
    letterSpacing: "normal"
  meta:
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
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
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
    fontSize: "0.6rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
  micro-lg:
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  small:
    fontFamily: "'Manrope Variable', 'Manrope', system-ui, sans-serif"
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

Una sola familia para todo el sitio: **Manrope**, en todos los tamaños.

Es una geométrica de trazo abierto y buena legibilidad, así que sirve igual para un titular grande que para un párrafo: no hay que repartir familias por función. La pila se declara una vez, en el token `--font-sans`, con `"Manrope Variable"` delante y `Manrope` después por si está instalada en el sistema. El `<body>` la aplica y todo lo demás la hereda, así que no hay reglas de fuente repartidas por los componentes.

La monoespaciada (`font-mono`) es la del sistema y se reserva para lo que es dato: periodos, versiones, correos y cifras. No se descarga ninguna fuente para eso.

La escala es **fluida y única** para todo el sitio: diez pasos declarados como tokens en Tailwind, con los titulares en `clamp()` para escalar de forma continua en lugar de saltar por breakpoint.

| Token | Tamaño | Para qué |
|---|---|---|
| `display` | `clamp(2.75rem, 4.6vw, 4.25rem)` — 44 a 68px | El titular del hero |
| `headline` | `clamp(2.4rem, 3.6vw, 3.4rem)` — 38 a 54px | Titulares de sección |
| `title-lg` | 1.5rem — 24px | Títulos de caso, empresas, grupos |
| `subhead` | 1.25rem — 20px | El posicionamiento y los subtítulos |
| `lead` | 1.125rem — 18px | Entradillas y texto destacado |
| `base` | 1rem — 16px | Texto corrido |
| `ui` | 0.8125rem — 13px | *Reservado* para interfaz |
| `small` | 0.875rem — 14px | Texto secundario |
| `label` | 0.75rem — 12px | Rótulos en mayúsculas |
| `micro` | 0.6875rem — 11px | Micro-etiquetas y datos |

El hero usa `display`: el titular es la frase de posicionamiento y es lo primero que debe leerse, así que ocupa el escalón más alto de la escala. Su valor no está en el tema de Tailwind sino en el token `--text-display` de `Layout.astro`, y la utilidad lo consume con `var()`: la config de Tailwind no se recarga en caliente en desarrollo, y este es el único paso que se ajusta a ojo, así que tenerlo en la capa de tokens permite retocarlo sin reiniciar nada. Es el mismo patrón que `--accent`. El único paso reservado que queda es `ui`, que no genera CSS mientras no se use y por eso no cuesta nada.

El techo es **68px**, por debajo del límite de 6rem del craft floor: antes el hero llegaba a 128px y era la causa de que todo se leyera grande y desordenado, y un primer intento de arreglo en 90px seguía resultando excesivo. La jerarquía se sostiene con nueve pasos claros, y el `<body>` se queda en los 16px por defecto del navegador, así que no hay dos reglas compitiendo por el tamaño base.

## Layout

Las secciones **cruzan la pantalla** y el contenido se ordena con una única clase, `.shell`: ancho completo con un techo de `1400px` y márgenes laterales que crecen de `1.25rem` a `3rem` según el viewport. Ocupar todo el ancho no puede costar lectura, así que la prosa se limita aparte con `.measure` (64ch) y las cabeceras de sección van a `12` columnas: título a la izquierda, entradilla a la derecha.

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

- **Marca** (`Logo`): dos líneas apiladas —el nombre arriba y el posicionamiento debajo—, sin caja de iniciales y sin separador. La jerarquía la hacen el peso y el color: nombre en semibold y tinta, posicionamiento en light y gris. Dos renglones ocupan menos a lo ancho que uno solo con las dos cosas, así que el posicionamiento se ve también en móvil; el hueco del header se reduce en pantallas estrechas para dejarle sitio.
- **Navbar**: fijo, con filete inferior: la marca, el botón de idioma y los items de los desplegables usan la fuente del sitio, heredada del `body`. Las seis secciones viven en un menú desplegable que se abre con el botón de hamburguesa en todos los tamaños. La barra no se anima a sí misma, así que es visible aunque no haya JavaScript.
- **Desplegables** (menú y selector de idioma): el mismo panel estrecho alineado a la derecha (`w-56`), con borde completo, `p-3` y items compactos cuyo estado activo se marca con fondo y un punto a la derecha. Comparten variantes de motion y clases en `dropdownMotion.ts`, así que no pueden divergir.
- **Filtros** (experiencia): rectángulos con filete; el activo se invierte a tinta sólida. Llevan `aria-pressed`.
- **Filas enlazadas** (contacto y CV): rejilla de 12 columnas con etiqueta, valor y descripción; el fondo se aclara en hover. Nunca son tarjetas.
- **Tabla de métricas**: cruza la anchura completa, con cabecera en versalitas y cifras monoespaciadas con `font-variant-numeric: tabular-nums`.

## Motion

Sin animaciones de entrada. Cada sección aparecía antes con el mismo fade-up, y ese patrón repetido es lo que resta sensación de solidez: el contenido ahora está visible de entrada en el HTML, sin depender de JavaScript.

Framer Motion se limita a lo funcional, donde una transición explica un cambio de estado: el desplegable del menú, el del selector de idioma y el botón de tema. La barra de navegación **no** se anima a sí misma, para que sea visible aunque no haya JavaScript.

Queda un único momento de motion, y es funcional: la apertura del menú.

Fuera de Framer Motion hay un solo movimiento, en CSS puro: el latido del punto de estado del hero (`animate-status-pulse`). Su opacidad va de 1 a 0.45 en 2.8 s, así que se atenúa pero nunca llega a desaparecer. Es la única animación en bucle del sitio y no necesita JavaScript.

Bajo `prefers-reduced-motion` el bloque global de `Layout.astro` reduce toda animación a 0.01 ms y una sola iteración, así que el punto queda fijo y visible. El movimiento no es la única señal de estado: el texto «Abierto a nuevas oportunidades» comunica lo mismo sin él.

## Do's and Don'ts

**Do**

- Usa `signal-blue` como única señal de acento; el resto del mundo es neutro.
- Mantén el peso 300 en los titulares grandes: es lo que da el aire técnico.
- Separa secciones con el `Divider` y deja respirar 8–10rem.
- Etiqueta en mayúsculas con tracking amplio; reserva la monoespaciada para identificadores.

**Don't**

- No introduzcas una segunda familia tipográfica: Manrope es todo el sistema.
- No añadas radios: el mundo es de esquinas rectas.
- No uses el acento en superficies grandes; es una señal, no un fondo.
- No añadas animaciones de entrada ni hagas aparecer secciones al hacer scroll.
- No estires la prosa a todo el ancho: usa `.measure` para el texto y deja que `.shell` dé la anchura.

## Desviaciones conocidas

Registradas por el detector y el craft floor de Impeccable, **no corregidas** porque el usuario pidió volver a este mundo tal cual estaba. Si en el futuro se retoma el pulido, este es el orden de valor:

Resueltas en esta pasada: el fade-up idéntico en cada sección, los `border-left` de color >1px, el halo de color sin offset, el tematizado de las superficies del navegador y el `<noscript>`.

**Desviaciones aceptadas a petición del usuario.** El craft floor prohíbe el antetítulo sobre el titular y el mundo favorece la columna única, pero el hero volvió a introducir ambos tras una referencia visual aportada por el usuario (una maqueta de dos columnas con el enfoque en un panel lateral). Se mantienen a sabiendas: el antetítulo «Hospitality · Hotel Tech» en `micro`, la rejilla 7/5 desde `lg` y el botón «Ver experiencia» que se había retirado antes. No son descuidos: si en el futuro se retoma el pulido, hay que consultarlo antes de tocarlos. La maqueta de referencia traía además contenido de una versión antigua del sitio; el texto se ha alineado con ella por decisión explícita del usuario, salvo los lemas inventados del panel («HOSPITALITY MEETS TECHNOLOGY», «SAME HOSPITALITY. A BRIGHTER TOMORROW.»), que se sustituyeron por el enfoque real y no se han copiado.

**Trampa registrada — la escala tipográfica.** El commit `a311201` borró sin querer el bloque `theme.extend.fontSize` mientras corregía los colores de acento. Como Tailwind descarta las clases que no puede resolver en vez de avisar, durante ese tramo los 32 usos de `text-headline`, `text-lead`, `text-subhead`, `text-title`, `text-title-lg`, `text-label` y `text-small` no generaban ninguna regla y los titulares caían al tamaño por defecto del navegador. Si los titulares se ven pequeños o todos del mismo tamaño, lo primero que hay que comprobar es que `theme.extend.fontSize` sigue en `tailwind.config.mjs`, y confirmarlo sobre el CSS construido, no sobre el código fuente.

**Recarga en desarrollo.** Hay dos ritmos distintos y conviene no confundirlos.

Todo el código de la web —componentes `.astro` y `.tsx`, CSS, JSON de contenido, páginas y `src/util`— usa el **HMR normal de Astro/Vite**: se guarda y el navegador se actualiza solo, sin reiniciar el proceso. Verificado con un cambio real en `src/content/es/hero.json`.

Los archivos de configuración no pueden seguir ese camino, porque Vite los lee una sola vez al arrancar. `tailwind.config.mjs` y `astro.config.mjs` requieren un reinicio completo del proceso, y **de esa supervisión se encarga systemd, no la aplicación**: el unit `mi-portfolio-config-watch.path` vigila los dos archivos y, al cambiar cualquiera de ellos, activa `mi-portfolio-config-restart.service`, que hace `systemctl try-restart dev-project@mi-portfolio.service`. Los cambios de configuración se aplican solos, sin ningún comando manual.

La decisión es deliberada: **nada dentro de la aplicación implementa su propio supervisor**. Hubo un plugin de Vite (`watch-tailwind-config`) que llamaba a `server.restart()`, y se retiró: con systemd supervisando el proceso, un reinicio desde dentro competía con el de systemd y dejaba dos mecanismos haciendo lo mismo. Si en el futuro hace falta reaccionar a un archivo nuevo, la respuesta es añadirlo al `.path`, no volver a meterlo en el código.

Siguen abiertas:

3. **Peso del JS**: quedan dos islas hidratadas (navbar y filtro de experiencia) y Framer Motion viaja con el navbar para tres transiciones funcionales. Son ~89 kB comprimidos, casi todo el runtime de React. Sustituir esas dos islas por componentes de Astro con un script mínimo eliminaría React y Framer Motion enteros del envío.
