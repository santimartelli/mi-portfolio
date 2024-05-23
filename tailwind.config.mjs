/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn .5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0,  },
          '100%': { opacity: 1, },
        },
      },
    },
  },
	variants: {
    extend: {
      animation: ['hover', 'focus', 'motion-safe'],
    },
  },
	plugins: [],
}
