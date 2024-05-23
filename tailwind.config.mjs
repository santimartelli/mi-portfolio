/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn .5s ease-in forwards",
        imageHover: "imageHover .8s ease-in-out forwards",
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
      },
      boxShadow: {
        //black shadow soft and clean for dark mode
        // 'white': '0px 15px 50px -40px rgba(0, 0, 0, 0.1)',
        'white': '0px 15px 50px -40px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
