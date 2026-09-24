---
name: Santiago Martelli — portfolio
description: Portfolio claro y técnico: hospitalidad, operaciones y tecnología contadas como una sola trayectoria.
colors:
  paper: "#ffffff"
  paper-soft: "#f8fafc"
  paper-sunk: "#f1f5f9"
  paper-line: "#e2e8f0"
  paper-edge: "#cbd5e1"
  ink: "#0f172a"
  ink-soft: "#334155"
  ink-muted: "#475569"
  ink-faint: "#64748b"
  signal-blue: "#2563eb"
  signal-blue-deep: "#1d4ed8"
  cyan: "#0891b2"
  violet: "#7c3aed"
  success: "#059669"
  warning: "#d97706"
  error: "#dc2626"
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
  button: "8px"
  pill: "999px"
spacing:
  section: "8rem"
  section-lg: "10rem"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  nav-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-faint}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.75rem"
---

# Santiago Martelli — Design System

> **Estado:** este documento describe el mundo **claro y técnico**, que es el único que se sirve: el selector de tema se retiró a petición del usuario. Antes hubo dos temas y, más atrás, un rediseño hacia un mundo de papel cálido que se construyó y se revirtió (ver `## Do's and Don'ts` y el final de este archivo). El contrato de dirección de la home vive en `.impeccable/surfaces/`.

## Overview

Portfolio profesional de una sola página, bilingüe, que cuenta una sola trayectoria: hospitalidad + operaciones + cliente + tecnología, con la tecnología como evidencia verificable en lugar de como titular.

El mundo es **claro y técnico**: papel blanco, tipografía ligera de gran tamaño y un azul de señal como único acento saturado. La estética busca parecer la de alguien que construye software: minimalista, geométrica, sin adornos, con el código (Astro, React, TypeScript) como argumento.

Modo del visitante: **Persuade**. La página tiene que sostener una decisión y una acción: contactar.

## Colors

Un solo tema. Hubo dos, con los mismos nombres de variable para que los componentes no cambiaran de clase; al retirarse el selector quedó el claro, y sus valores viven en `:root` de `Layout.astro`. Los nombres de variable siguen siendo `--darkbg-*` y `--darktext-*` por herencia: de ellos dependen las utilidades de Tailwind y la tabla de remapeo, así que se conservó el nombre y se cambió el valor.

- `paper` (`--darkbg-950`) — el suelo. Blanco puro.
- `paper-soft` / `paper-sunk` / `paper-line` — superficies secundarias, tarjetas y hover.
- `paper-edge` — bordes.
- `ink` (`--darktext-50`) — titulares y texto de máximo contraste.
- `ink-soft` / `ink-muted` — texto normal y secundario.
- `ink-faint` — metadatos y texto apagado.
- `signal-blue` — el acento. `#2563eb`, oscurecido respecto al del tema retirado para mantener el contraste sobre blanco.
- `signal-blue-deep` — hover del acento.
- `cyan` / `violet` — acentos secundarios, sin uso actual.
- `success` / `warning` / `error` — estados, sin uso actual.

## Typography

Una sola familia para todo el sitio: **Manrope**, en todos los tamaños.

Es una geométrica de trazo abierto y buena legibilidad, así que sirve igual para un titular grande que para un párrafo: no hay que repartir familias por función. La pila se declara una vez, en el token `--font-sans`, con `"Manrope Variable"` delante y `Manrope` después por si está instalada en el sistema. El `<body>` la aplica y todo lo demás la hereda, así que no hay reglas de fuente repartidas por los componentes.

La monoespaciada (`font-mono`) es la del sistema y se reserva para lo que es dato: periodos, versiones, correos y cifras. No se descarga ninguna fuente para eso.

La escala es **fluida y única** para todo el sitio: diez pasos declarados como tokens en Tailwind, con los titulares en `clamp()` para escalar de forma continua en lugar de saltar por breakpoint.

| Token | Tamaño | Para qué |
|---|---|---|
| `display` | `clamp(2.75rem, 4.6vw, 4.25rem)` — 44 a 68px; en pantallas de menos de 1024px baja a `clamp(1.75rem, 3.2vw, 2.5rem)` — 28 a 40px | El titular del hero |
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

Las secciones **cruzan la pantalla** y el contenido se ordena con una única clase, `.shell`: ancho completo con un techo de `1600px` y márgenes laterales por escalones, de `1.25rem` a `6rem` (`1.25` / `1.75` / `4` / `5` / `6`rem desde 640, 1024, 1280 y 1536px). En escritorio manda el margen: **el aire va en los bordes y no en el centro**, y el hueco entre las dos columnas del hero se aprieta a `3rem`. La barra de navegación comparte esos escalones desde `lg` —no usa `.shell` porque necesita el ancho completo—, así que la marca y el contenido arrancan en la misma vertical. Ocupar todo el ancho no puede costar lectura, así que la prosa se limita aparte con `.measure` (64ch) y las cabeceras de sección van a `12` columnas: título a la izquierda, entradilla a la derecha. Ese es el motivo de que el techo del contenedor pueda subir sin tocar la medida de lectura: son dos límites independientes.

En el hero, cada una de las dos mitades (6/6) llega a su borde: el texto arranca en el borde izquierdo del contenedor y la ilustración se pega al derecho (`margin-inline-start: auto`, **no** centrada en su columna), así que la composición queda simétrica y alineada con la rejilla del resto de secciones. El ancho de la ilustración lo decide su tope de alto, y por eso, sin esa regla, le sobraba aire a la derecha mientras el texto tocaba su borde: era lo único que descentraba el hero. Centrar cada bloque en su mitad no sirve, porque las dos mitades no se estrechan lo mismo.

En vertical, el contenedor del hero **se queda con todo el alto** que queda por debajo del header: la sección no lo centra ni reserva padding abajo, así que la caja va del borde inferior del header al borde inferior de la pantalla. Dentro, la rejilla reparte ese alto en dos filas, `1fr` para las dos columnas y `auto` para el marquee, y el `align-items: center` de la rejilla deja el bloque de texto y el de la imagen en el medio de la primera fila. El marquee queda al pie, y el aire que reserva el contenedor debajo (`4rem`) no es arbitrario: es el que lo deja **centrado en la franja blanca que hay entre el borde inferior de la ilustración y el borde inferior de la pantalla**. Con el tope de alto de la ilustración puesto —el caso normal en un portátil— el aire que sobra por debajo de la imagen dentro de su fila es `(145 - pb) / 2`, así que igualarlo a ese padding da `4rem`. El alto de la ilustración sigue topado por `calc(100vh - 16rem)`, así que en pantallas bajas encoge antes que el texto; en pantallas muy altas o estrechas, donde la ilustración ya no puede crecer (la limita el ancho de su columna), el marquee queda unas decenas de píxeles por debajo del centro exacto, porque tanto él como la imagen se colocan con valores fijos.

Cada sección respira `5rem` en móvil y `7rem` en escritorio, y **abre con una sola regla de 1px**, la clase `.section-rule`: un gris (`gray-300` al 60 %) que se desvanece en los dos costados, dibujado como fondo del propio elemento —1px de alto, pegado arriba— porque un `border-top` no admite degradado. Antes había además un `Divider` de gradiente entre secciones, a 32px de esa regla, y se retiró a petición del usuario: la regla que queda se quedó con aquel estilo difuminado. Como la regla cae en el borde superior de la sección, para que quede **centrada** el aire de arriba y el de abajo tienen que ser el mismo. Casi siempre lo es: cada sección reserva abajo lo mismo que la siguiente reserva arriba (5rem y 7rem). El hero es la excepción, porque reserva abajo 1.5rem por debajo de `lg` y `4rem` desde `lg` (el aire que deja el marquee centrado en la franja que queda entre la ilustración y el borde de la pantalla): ahí la regla se mete hacia dentro de About la mitad de la diferencia (`--rule-offset` en la clase `.section-rule-hero`: 1.75, 2.75 y 1.5rem según el escalón), de modo que **aparece un poco por debajo del pliegue** en vez de en el borde, y queda igual de lejos del marquee que del titular. Los filetes de dentro de cada sección, los que separan unidades, siguen siendo sólidos. El contenido denso se organiza en **unidades repetibles** con la misma anatomía: metadatos a la izquierda, relato a la derecha, filete entre unidades. Las listas largas (hitos de un puesto, canales de contacto, métricas) se despliegan en dos columnas o cruzan toda la anchura en vez de apilarse en una columna estrecha.

**Las secciones de relato no usan esa unidad.** About va en dos columnas como el hero: a la izquierda el titular, la entradilla y la trayectoria en tres paradas, en orden y separadas por aire, y a la derecha, en piezas cortas, lo que aporto. Cada parada y cada pieza se quedan en una línea: el detalle vive en experiencia, skills y proyectos, así que ahí solo está el arco. La línea de tiempo vertical que unió esas paradas durante una pasada se retiró a petición del usuario. El texto se recortó también a petición suya, de 416 a 216 palabras: lo que no se cuenta aquí (el freelance para Acerko, Tanya Martelli Photography) sigue con su ficha en experiencia y proyectos, y la parada de Tecnología se la lleva casi entera recep-app, el producto propio que el usuario usa en la operación de Els Químics.

Los casos de estudio usan una unidad de dos columnas: a la izquierda la prueba visual y los datos (imagen, canal, stack, enlaces) con la imagen fija al hacer scroll; a la derecha el relato. La tabla de métricas cruza la anchura completa porque es una comparación.

## Elevation & Depth

La profundidad se declara **una sola vez y con borde de 1px** (`border-gray-200`). **No hay sombras**: las utilidades `.theme-card` y `.theme-button-primary`, que llevaban sombras teñidas de azul, eran código muerto y se retiraron junto con `.theme-text-gradient`. El CTA que se copió de otro proyecto traía una sombra tenida y un labio inferior de 4px; los dos se han quitado, porque este mundo no tiene sombras. Esto elimina las dos únicas desviaciones que el detector marcaba como anti-patrón (texto con degradado y halo de color sin offset).

**La única superficie translúcida es la barra de navegación con la página desplazada.** En cuanto el scroll pasa de 8px, su blanco baja al 85% y lo que pasa por debajo se ve difuminado (`backdrop-filter: blur(12px)`, con el prefijo `-webkit-` que Tailwind emite por su cuenta). La elevación sigue siendo el mismo filete de 1px, así que el efecto no añade una segunda regla de profundidad. El 85% no es un número al azar: sobre cualquier fondo, incluso negro puro, la mezcla nunca baja de ahí, de modo que el nombre y los items en tinta se mantienen por encima de 13:1 y el posicionamiento en gris se queda en ~3,4:1 en ese caso extremo y por encima de 4,5:1 sobre las superficies reales de la página, que son claras. El desenfoque va dentro de un `@supports`, así que un navegador sin `backdrop-filter` se queda con la barra opaca en vez de con un blanco lechoso sin desenfoque.

## Shapes

Predominan las **esquinas rectas**: `border-radius` es 0 en contenedores, tarjetas, campos y enlaces. Hay dos excepciones documentadas:

- `focus` = 2px — el contorno de foco, para que no se vea roto en esquinas rectas.
- `button` = 8px — los dos botones del hero, que conservan un radio pequeño del botón portado. El principal empezó siendo una pastilla y se rebajó a petición del usuario; el secundario lo comparte para que se lean como la misma familia.
- `pill` = 9999px — los puntos de estado.

La mezcla es una inconsistencia conocida: lo coherente con el resto del mundo sería llevar el CTA a 0 o 2px. El radio de 12px que figuraba aquí era de `.theme-button-primary` y `.theme-button-secondary`, utilidades muertas que ya no existen.

## Components

- **Marca** (`Logo`): dos líneas apiladas —el nombre arriba y el posicionamiento debajo—, sin caja de iniciales y sin separador. La jerarquía la hacen el peso y el color: nombre en semibold y tinta, posicionamiento en light y gris. Dos renglones ocupan menos a lo ancho que uno solo con las dos cosas, así que el posicionamiento se ve también en móvil; el hueco del header se reduce en pantallas estrechas para dejarle sitio.
- **Navbar**: fijo, con filete inferior: la marca, el botón de idioma y los items de los desplegables usan la fuente del sitio, heredada del `body`. Las seis secciones viven en un menú desplegable que se abre con el botón de hamburguesa en todos los tamaños. **El botón de idioma es de solo icono.** Lleva el símbolo de diccionario y nada más: el código (`ES` / `EN`) pasó por tres versiones a petición del usuario —primero más grande y fino, después en su tamaño de siempre con el peso fino de la marca, y por último fuera—, así que hoy el nombre accesible lo pone el `aria-label` y el idioma activo se marca dentro del desplegable. **Los dos controles de la barra van juntos.** Los dos miden lo mismo (`h-14 w-12`, o sea 48×56 en el objetivo táctil) y sus cajas están pegadas, sin hueco: el aire lo pone un padding asimétrico en cada uno —`pl-1` en el de idioma, `pr-1` en el del menú—, que empuja su dibujo 2px hacia el vecino. Así entre el símbolo y las barras quedan 22px en vez de los 42px que salían con las cajas centradas, sin solapar áreas de toque ni bajar de 48px, que es el objetivo que usa el resto del sitio. El ajuste es fino a propósito: con el empuje a 4px quedaban 18px y los dos controles empezaban a leerse como uno solo. La barra no se mueve a sí misma; lo único que cambia con el scroll es el fondo (ver Elevation & Depth), y sin JavaScript ese cambio no llega a ocurrir, así que la barra se ve como siempre.
- **Desplegables** (menú y selector de idioma): el mismo panel estrecho alineado a la derecha (`w-56`), con borde completo, `p-3` y items compactos cuyo estado activo se marca con fondo y un punto a la derecha. Comparten variantes de motion y clases en `dropdownMotion.ts`, así que no pueden divergir.
- **Filtros** (experiencia): rectángulos con filete; el activo se invierte a tinta sólida. Llevan `aria-pressed`.
- **Filas enlazadas** (contacto y CV): rejilla de 12 columnas con etiqueta, valor y descripción; el fondo se aclara en hover. Nunca son tarjetas.
- **Tabla de métricas**: cruza la anchura completa, con cabecera en versalitas y cifras monoespaciadas con `font-variant-numeric: tabular-nums`.

## Motion

Sin animaciones de entrada. Cada sección aparecía antes con el mismo fade-up, y ese patrón repetido es lo que resta sensación de solidez: el contenido ahora está visible de entrada en el HTML, sin depender de JavaScript.

Framer Motion se limita a lo funcional, donde una transición explica un cambio de estado: el desplegable del menú y el del selector de idioma. La barra de navegación no se mueve a sí misma: su único estado lo fija el scroll, y es de color —el fondo pasa de opaco a translúcido con el contenido difuminado detrás—, con una transición de 200ms. El difuminado está siempre declarado y lo que se interpola es la opacidad del blanco, que es lo único interpolable; así el cambio es continuo y sin saltos. Sin JavaScript la barra se queda opaca, que es exactamente el estado de arriba del todo.

Queda un único momento de motion, y es funcional: la apertura del menú.

Hay **una única animación en CSS**, y no es de entrada: el marquee de características al pie del hero (`@keyframes marquee`), que desplaza su pista la mitad del ancho en 60 s lineales. La pista lleva la lista dos veces, así que el bucle no tiene costura, y la copia duplicada va con `aria-hidden` para que no se lea dos veces. Los dos costados llevan una **máscara de desvanecido** (`mask-image` con un degradado de alpha, no de color) para que la pieza nunca se corte a media palabra contra el borde; la distancia es porcentual, con suelo de `2.5rem` y tope de `10rem`, así que crece con la pantalla sin comerse la fila en pantallas anchas. Se para con el puntero encima o con el foco dentro, que es lo mínimo para poder leer algo que se mueve solo. Fuera de eso solo hay transiciones de estado —el hover del CTA y el de los iconos—, que no son animaciones.

**Desviación registrada.** El detector marca el marquee como `[marquee]`: el contenido que se desplaza solo «exige una atención que no se ha ganado y esconde la mitad en cada momento». Es una petición explícita del usuario, y es la única desviación marcada del proyecto. Lo que la mitiga: que se pare con el puntero o el foco, el desvanecido de los costados, que `prefers-reduced-motion` lo deje quieto, y que todo lo que cuenta está además en las secciones de experiencia y skills, así que no se pierde nada si no se llega a leer.

Por aquí pasaron otras animaciones y se retiraron: el latido del punto de estado, que se fue con su línea de disponibilidad, y el brillo del CTA portado, que llegó a repetirse en bucle y que el detector también marcaba como `[marquee]`.

Bajo `prefers-reduced-motion` el bloque global de `Layout.astro` reduce toda animación a 0.01 ms y una sola iteración, y desactiva el desplazamiento suave; el marquee va más allá y se queda sin animación, quieto al principio de la lista y con el desvanecido solo en el costado derecho, que es el que sigue teniendo contenido detrás.

## Do's and Don'ts

**Do**

- Usa `signal-blue` como única señal de acento; el resto del mundo es neutro.
- Mantén el peso 300 en los titulares grandes: es lo que da el aire técnico.
- Separa las secciones con **una sola regla** (`.section-rule`, difuminada en los costados); no añadas una segunda línea. El `Divider` de gradiente que iba aparte se retiró a petición del usuario.
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

**Desviaciones aceptadas a petición del usuario.** El mundo se había comprometido con la columna única, las esquinas rectas y el acento como única señal. El hero volvió a introducir lo contrario tras una referencia visual aportada por el usuario, que pidió reproducirla «exactamente igual». Lo único que queda en pie de aquella maqueta es la rejilla de dos columnas desde `lg`, hoy 6/6; el resto se ha ido retirando después a petición del usuario: el antetítulo sobre el titular, los chips del enfoque con su rótulo, el bloque de experiencia práctica, los dos botones («Ver experiencia» y el de LinkedIn), la línea de disponibilidad y, por último, el panel lateral con sus dibujos y sus lemas, sustituido por la ilustración del perfil. El titular vuelve a ser lo primero de la columna, así que la desviación del craft floor que suponía el antetítulo ya no existe. El acento sigue siendo el azul del mundo y no el ámbar de la maqueta, por decisión previa del usuario; cambiarlo es una línea en el token `--accent`.

**El CTA viene de otro proyecto, pero ya casi no queda nada de él.** El usuario lo copió desde otro repositorio suyo y se le fueron quitando piezas a petición suya: la sombra y el labio (aquí no hay sombras), la elevación al pasar el puntero, la forma de pastilla y por último el brillo. Lo único que sobrevive es el ancho mínimo (`min-w-[10rem]`) y el radio de 8px. Su efecto es ahora el de los iconos de contacto, un cambio de color con transición. La sombra tenida y el labio inferior de 4px se quitaron a petición del usuario, porque aquí no hay sombras; el radio bajó de pastilla a 8px; y el tamaño volvió al que tenía antes del port, porque el grande del original (`px-8 py-6 text-xl`) dejaba el botón en unos 80px y se comía el reparto de los cinco bloques en móvil. Los colores ya eran los del mundo. Tampoco se ha traído la animación de entrada `.hero-in` que acompaña al botón en su repositorio de origen, porque las animaciones de entrada están prohibidas aquí por decisión previa del propio usuario.

**El hero tiene dos acciones desde la última pasada.** Junto a «Ver experiencia» (`.cta-primary`, sólido en tinta) va «Ver proyectos» (`.cta-secondary`), a petición del usuario. Mismo cuerpo, mismo radio y mismo tempo, pero sin relleno: se declara con el filete de 1px —la forma de declarar profundidad de este mundo— y al pasar el puntero solo cambia el gris del filete a tinta. Así la acción principal sigue siendo una sola y las dos no compiten. Los dos comparten bloque en móvil (el reparto vertical del hero está ajustado al píxel, un séptimo bloque no cabe) y solo forman fila desde `lg`, que es donde además se muestra el de proyectos: en móvil el hero no tiene ancho para los dos sin que el bloque crezca 40px.

**La barra de navegación se difumina al bajar, a petición del usuario.** El craft floor rechaza el cristal y el desenfoque cuando son decoración; aquí tienen una función concreta —la barra es fija y el contenido pasa por debajo— y la petición es explícita, así que se implementa con tres límites: solo aparece con la página desplazada (arriba del todo no hay nada detrás y la barra es blanca opaca), va dentro de un `@supports` para que quien no soporte `backdrop-filter` no acabe con un blanco lechoso y sin desenfoque, y el blanco se queda en el 85%, que es lo que sostiene la legibilidad sobre cualquier fondo. El detector no lo marca; el marquee sigue siendo la única desviación que registra.

**Procedencia de la ilustración del hero.** Hay dos recortes de la misma escena, y `<picture>` sirve uno u otro según el ancho: `public/images/hero-landscape.webp` (1400×611, WebP q88, 88 kB, de un PNG de 1672×941) por debajo de 1024px, y `public/images/hero-portrait.webp` (1000×1102, WebP q88, 109 kB, de un PNG de 1122×1402) desde 1024px. A los dos se les ha recortado el aire en blanco que traian de origen: 131px arriba en el apaisado, que a tamaño de movil se veian como un hueco de casi 30px entre el header y el dibujo, y 113px en el vertical. Se deja un margen de 8px para que el trazo no toque el borde. El emparejamiento con el tamaño de cada uno vive en la clase `.hero-media` de `Layout.astro`. Ambos PNG los aportó el usuario como archivo adjunto. **Su origen y su licencia no están verificados**: no consta autoría, ni cesión de derechos, ni si viene de un banco de imágenes. Hay que acreditarlo antes de dar por buena la publicación, porque el resto de imágenes del sitio son propias o de clientes. Si no se puede acreditar, hay que sustituirla.

Sobre su fondo: no necesita ningún recorte. Medido sobre los píxeles del original, el fondo ya es blanco puro y neutro (254-255 en los tres canales, sin perfil ICC incrustado), así que integra sin costura sobre el `#ffffff` del tema claro. Conviene no repetir aquí la impresión de que tenía un tinte crema: era un error de lectura de una versión anterior, y el dato medido lo desmiente.

**La imagen ya no se invierte.** Tuvo `dark:invert` mientras hubo tema oscuro: la imagen es escala de grises, así que el filtro daba un resultado limpio sin cargar una segunda versión. Al retirarse el selector de tema el filtro se quedó sin efecto posible —el variante `dark:` no llega a activarse nunca— y se retiró con él. Un dato que sigue siendo útil si algún día vuelve a hacer falta: el 85,1 % de sus píxeles es fondo blanco y solo el 6,0 % son líneas oscuras, así que invertirla funciona; el precio sería que el 4,2 % de grises muy claros (sombreados y rellenos) se vuelve gris oscuro y pierde presencia.

**Trampa registrada — la escala tipográfica.** El commit `a311201` borró sin querer el bloque `theme.extend.fontSize` mientras corregía los colores de acento. Como Tailwind descarta las clases que no puede resolver en vez de avisar, durante ese tramo los 32 usos de `text-headline`, `text-lead`, `text-subhead`, `text-title`, `text-title-lg`, `text-label` y `text-small` no generaban ninguna regla y los titulares caían al tamaño por defecto del navegador. Si los titulares se ven pequeños o todos del mismo tamaño, lo primero que hay que comprobar es que `theme.extend.fontSize` sigue en `tailwind.config.mjs`, y confirmarlo sobre el CSS construido, no sobre el código fuente.

**Recarga en desarrollo.** Hay dos ritmos distintos y conviene no confundirlos.

Todo el código de la web —componentes `.astro` y `.tsx`, CSS, JSON de contenido, páginas y `src/util`— usa el **HMR normal de Astro/Vite**: se guarda y el navegador se actualiza solo, sin reiniciar el proceso. Verificado con un cambio real en `src/content/es/hero.json`.

Los archivos de configuración no pueden seguir ese camino, porque Vite los lee una sola vez al arrancar. `tailwind.config.mjs` y `astro.config.mjs` requieren un reinicio completo del proceso, y **de esa supervisión se encarga systemd, no la aplicación**: el unit `mi-portfolio-config-watch.path` vigila los dos archivos y, al cambiar cualquiera de ellos, activa `mi-portfolio-config-restart.service`, que hace `systemctl try-restart dev-project@mi-portfolio.service`. Los cambios de configuración se aplican solos, sin ningún comando manual.

La decisión es deliberada: **nada dentro de la aplicación implementa su propio supervisor**. Hubo un plugin de Vite (`watch-tailwind-config`) que llamaba a `server.restart()`, y se retiró: con systemd supervisando el proceso, un reinicio desde dentro competía con el de systemd y dejaba dos mecanismos haciendo lo mismo. Si en el futuro hace falta reaccionar a un archivo nuevo, la respuesta es añadirlo al `.path`, no volver a meterlo en el código.

Siguen abiertas:

3. **Peso del JS**: quedan dos islas hidratadas (navbar y filtro de experiencia) y Framer Motion viaja con el navbar para tres transiciones funcionales. Son ~89 kB comprimidos, casi todo el runtime de React. Sustituir esas dos islas por componentes de Astro con un script mínimo eliminaría React y Framer Motion enteros del envío.
