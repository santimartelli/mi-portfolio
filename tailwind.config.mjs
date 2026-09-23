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
        accent: {
          400: "#66FCF1", // Bright teal/mint
          500: "#45A29E", // Darker teal
        },
      },
      /*
       * Escala tipografica fluida. Un solo juego de pasos para todo el sitio:
       * display -> headline -> title-lg -> subhead -> lead -> base -> ui -> small
       * -> label -> micro. Los titulares usan clamp() para escalar de forma
       * continua en vez de saltar por breakpoint.
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
        display: ["clamp(3.2rem, 6.2vw, 5.6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
      },
      fontFamily: {
        // Fuente unica del sitio. Misma pila que el token --font-sans.
        sans: ["Manrope Variable", "Manrope", "system-ui", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn .5s ease-in forwards",
        imageHover: "imageHover .8s ease-in-out forwards",
        blink: "blink 2s infinite",
        enterUp: "enterUp 2.2s forwards",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        imageHover: {
          "0%": { transform: "scale(1)", filter: "blur(4px)", opacity: "0.5" },
          "100%": { transform: "scale(1.1)", filter: "blur(0)", opacity: "1" },
        },
        blink: {
          "0%": { opacity: "0.4", transform: "rotate(0deg)" },
          "50%": { opacity: "1", transform: "rotate(20deg)" },
          "100%": { opacity: "0.4", transform: "rotate(0deg)" },
        },
        enterUp: {
          "0%": { transform: "translateY(80%)", opacity: 0 },
          "50%": { transform: "translateY(40%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 1, color: "#444950" },
          "50%": { opacity: 0.9, color: "#45A29E" },
        },
      },
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
