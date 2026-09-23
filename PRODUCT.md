# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Reclutadores y hiring managers de hotel tech, SaaS y producto** que llegan desde LinkedIn. Su trabajo es decidir en minutos si esta persona encaja en un puesto de customer success, implementation, onboarding, soporte de producto o product support. No son técnicos: buscan señales de trato con cliente, criterio operativo y capacidad de aprender el producto.
- **Reclutadores técnicos y leads de ingeniería** que necesitan comprobar que además sabe construir software de verdad, no solo hablar de ello.
- **Posibles clientes de freelance** que buscan a alguien para rediseñar o mantener su web.
- El propio Santiago, que usa la web como pieza central de su búsqueda y como destino del enlace de su perfil de LinkedIn.

Los tres primeros públicos tienen el mismo peso: Santiago confirmó que no quiere jerarquizar ninguno por encima de los demás.

## Product Purpose

Portfolio profesional de una sola página, bilingüe, que cuenta **una sola trayectoria**: hospitality + operaciones + cliente + tecnología, con la tecnología como evidencia verificable en lugar de como titular. Existe porque LinkedIn y la web contaban dos historias distintas y eso rompía la credibilidad del perfil.

El éxito es que alguien que llega desde LinkedIn entienda en segundos qué combinación de experiencia ofrece, vea pruebas reales y decida contactar.

## Positioning

La combinación que un perfil vecino no puede copiar con honestidad: **experiencia operativa real en recepción y gestión de alojamiento** (PMS, OTAs, check-in, incidencias, grupos, pricing) **más capacidad técnica real** para construir y mantener productos web en producción. Entiende el software hotelero desde los dos lados: como operador que lo usa a diario y como desarrollador que puede construirlo.

No se presenta como ingeniero senior, ni como customer success manager experimentado, ni como revenue manager. Las áreas objetivo donde su experiencia es transferible se marcan como objetivo, no como cargo desempeñado.

## Operating Context

- Idiomas de la web: español en `/` e inglés en `/en/`. **Mismo peso para los dos**, sin jerarquía. LinkedIn enlaza a `/en/`.
- El visitante llega sobre todo desde LinkedIn, en móvil, con poco tiempo y sin contexto previo.
- Santiago mantiene el contenido a mano en archivos JSON por idioma; no hay CMS.
- Hay un servicio systemd que sirve el working tree como preview; producción es `martelli.dev` desde `main`.
- Restricción operativa confirmada: no se publican importes, tarifas ni datos del establecimiento; no se enlazan repositorios privados; no se inventan métricas ni logos de clientes.

## Capabilities and Constraints

- Secciones: Hero, Sobre mí, Experiencia (con filtro por faceta), Skills (agrupa por origen, sin barras ni porcentajes), Proyectos como casos de estudio (problema, solución, rol, implementación, resultado, tecnología) y Contacto con acceso a LinkedIn, GitHub, email y CV.
- Cuatro casos de estudio reales: `recep-app`, Tanya Martelli Photography, Acerko.com y martelli.dev.
- El CV de Hotel Tech / Hospitality **no existe todavía**: hay un hueco preparado y marcado, y no se genera ni se inventa.
- El CV actual está orientado a desarrollo web y se identifica como tal.
- Stack: Astro con islas de React, TypeScript, Tailwind CSS, i18n por archivos JSON, SSR estático de dos páginas.
- Restricciones técnicas ya resueltas que no deben romperse: `<html lang>` y contenido correctos por idioma en el HTML inicial, canonical y hreflang (es, en, x-default), Open Graph, Twitter Cards, JSON-LD, sitemap y robots, enlace de salto, foco visible, ARIA en controles con solo icono, `prefers-reduced-motion` y alternativa sin JavaScript para las animaciones.
- Decisión abierta: si el tema oscuro se mantiene como opción o se retira en favor de un único mundo claro.

## Brand Commitments

- Nombre: Santiago Martelli. Marca personal, no de producto.
- Tono confirmado: humano, concreto, sin clichés corporativos ("passionate", "results-driven", "technology enthusiast" están prohibidos en el brief).
- **Restricción visual vinculante aportada por el usuario:** quiere una estética muy cercana a la de `https://impeccable.style/` — tipografía con carácter, paleta cálida y sobria, limpieza visual, sensación de solidez y de rendimiento alto. Las decisiones visuales concretas se toman en el flujo de trabajo visual, no aquí.
- Prohibiciones del brief: fotos de stock de hoteles, iconografía corporativa genérica, estética de consultora hotelera, exceso de badges, barras de progreso y keyword stuffing visual.

## Evidence on Hand

- Experiencia verificable: Apartaments Els Químics (33 apartamentos, 2026–actualidad), Hotel Marsol (2025–2026), Gran Hotel Flamingo (2024–2025), AC Palau de Bellavista by Marriott (≈2 años), Dorna Sports · MotoGP (2019–2024) y prácticas de desarrollo web en Dorna (2023), Acerko.com (2024–2025).
- Productos reales: `recep-app` (herramienta interna en uso diario), Tanya Martelli Photography (en producción desde 2024, stack verificado en su repositorio) y martelli.dev.
- Métricas medidas antes/después del reposicionamiento, publicadas en el caso de estudio de martelli.dev.
- Assets reales: tres imágenes de proyecto y dos imágenes sociales generadas, todas en `public/`.
- **Ausencias que no se deben fabricar:** no hay testimonios, ni logos de clientes, ni cifras de negocio publicables, ni el CV de Hotel Tech, ni capturas de la interfaz de `recep-app` (es una aplicación privada).

## Product Principles

1. **Una sola historia.** Hospitality, operaciones, cliente y tecnología se leen como una trayectoria, nunca como dos currículums pegados.
2. **Prueba, no adjetivo.** Cada afirmación se sostiene con un producto, una herramienta usada o una métrica medida. Si no se puede verificar, no se publica.
3. **Honestidad de nivel.** Lo transferible se marca como objetivo; nunca se presenta como cargo desempeñado.
4. **El reclutador manda.** Si algo no ayuda a decidir en minutos, sobra.
5. **La calidad técnica es el argumento.** La propia web demuestra que sabe construir: accesible, rápida, bilingüe de verdad.

## Accessibility & Inclusion

- Objetivo confirmado durante el trabajo previo: WCAG 2.1 AA en texto y controles. Todos los pares de texto pequeño deben superar 4.5:1.
- La web se consume sobre todo en móvil y desde LinkedIn, así que el orden de lectura, los objetivos táctiles y el contraste en exterior importan.
- Idioma declarado correctamente por página; el cambio de idioma funciona sin JavaScript.
