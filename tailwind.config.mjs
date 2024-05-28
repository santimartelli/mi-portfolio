/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn .5s ease-in forwards",
        imageHover: "imageHover .8s ease-in-out forwards",
        blink: 'blink 2s infinite',
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
          '0%': { opacity: '0.4', transform: 'rotate(0deg)' },
          '50%': { opacity: '1', transform: 'rotate(20deg)' },
          '100%': { opacity: '0.4', transform: 'rotate(0deg)' },
        },
      },
      boxShadow: {
        'white': '0px 15px 50px -40px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
