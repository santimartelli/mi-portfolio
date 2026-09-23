/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      /**
       * Tokens semanticos. Los valores viven como variables CSS en Layout.astro,
       * de modo que el tema claro y el oscuro comparten el mismo juego de clases.
       */
      colors: {
        paper: "var(--paper)",
        "paper-raised": "var(--paper-raised)",
        "paper-sunk": "var(--paper-sunk)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-wash": "var(--accent-wash)",
        patina: "var(--patina)",
      },
      fontFamily: {
        sans: ["'Albert Sans Variable'", "Albert Sans", "system-ui", "sans-serif"],
        display: ["'Alumni Sans Variable'", "Alumni Sans", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "monospace"],
      },
      /**
       * Escala tipografica con techo de 6rem en display y pasos claros.
       * El interlineado de display es cerrado porque Alumni Sans es condensada.
       */
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1.35", letterSpacing: "0.14em" }],
        meta: ["0.8125rem", { lineHeight: "1.5" }],
        base: ["1.0625rem", { lineHeight: "1.7" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        h4: ["1.125rem", { lineHeight: "1.4" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        h2: ["clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.75rem, 1.6rem + 4.6vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        display: ["clamp(2rem, 1.4rem + 2.6vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      maxWidth: {
        /** Medida de lectura 68ch, dentro del rango 65-75ch del quality floor. */
        measure: "68ch",
      },
      transitionTimingFunction: {
        /** Una sola curva para todo el sitio: salida exponencial. */
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
