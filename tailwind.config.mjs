/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkbg: {
          950: "#0B0C10", // Very dark (almost black)
          900: "#1F2833", // Dark gray with slight blue tint
        },
        darktext: {
          300: "#C5C6C7", // Light gray text
        },
        /*
         * La escala apunta a los tokens reales. Antes guardaba la paleta teal
         * abandonada (#66FCF1 / #45A29E), asi que cualquier utilidad de acento
         * que no cubriera la tabla de remapeo pintaba el color viejo.
         */
        accent: {
          400: "var(--accent)",
          500: "var(--accent)",
        },
      },
      /*
       * Escala tipografica fluida. Un solo juego de pasos para todo el sitio:
       * display -> headline -> title-lg -> subhead -> lead -> base -> ui -> small
       * -> label -> micro. Los titulares usan clamp() para escalar de forma
       * continua en vez de saltar por breakpoint.
       *
       * Restaurada: el commit a311201 la borro sin querer al corregir los colores
       * de acento, asi que durante ese tramo los 32 usos de estos pasos
       * (text-headline, text-lead, text-subhead, text-title, ...) no generaban
       * ninguna regla y los titulares caian al tamano por defecto del navegador.
       */
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
        ui: ["0.8125rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.65" }],
        title: ["1.0625rem", { lineHeight: "1.4" }],
        lead: ["1.125rem", { lineHeight: "1.6" }],
        subhead: ["1.25rem", { lineHeight: "1.45" }],
        "title-lg": ["1.5rem", { lineHeight: "1.3" }],
        headline: ["clamp(2.4rem, 3.6vw, 3.4rem)", { lineHeight: "1.06", letterSpacing: "-0.01em" }],
        /*
         * El valor de display vive en el token --text-display de Layout.astro,
         * no aqui: la config no se recarga en caliente en desarrollo y este es
         * el unico paso que se ajusta a ojo. Mismo patron que --accent.
         */
        display: ["var(--text-display)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
      },
      fontFamily: {
        // Fuente unica del sitio. Misma pila que el token --font-sans.
        sans: ["Manrope Variable", "Manrope", "system-ui", "sans-serif"],
      },
      /*
       * Sin animaciones declaradas. Aqui vivieron fadeIn, imageHover, enterUp y
       * blink, que eran animaciones de entrada y la politica de movimiento
       * prohibe, y despues statusPulse, el latido del punto de estado del hero.
       * El punto se retiro con la linea de disponibilidad, asi que no queda
       * ninguna. Todo el movimiento del sitio es el de Framer Motion en los dos
       * desplegables y el boton de tema.
       */
      boxShadow: {
        white: "0px 15px 50px -40px rgba(0, 0, 0, 0.5)",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
