/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', "./public/index.html"],
  theme: { extend: {} },
  plugins: [],
})
