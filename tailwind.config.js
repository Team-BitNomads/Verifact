// tailwind.config.js
module.exports = {
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}" /* any other paths */],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}