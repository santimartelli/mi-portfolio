import { transform } from "typescript";

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
      fontFamily: {
        "titillium-web": ["Titillium Web", "sans-serif"],
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
