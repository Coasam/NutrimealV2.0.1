/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        default: {
          "primary": "#37e657",
          "secondary": "#27d832",
          "accent": "#40c13e",
          "neutral": "#2C2433",
          "base-100": "#333948",
          "info": "#ABC3ED",
          "success": "#45E3D3",
          "warning": "#F6B53C",
          "error": "#E15551",
        }
      }
    ]
  },
  plugins: [require('daisyui')],
}
