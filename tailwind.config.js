/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['SFProDisplay', 'sans-serif'],
      serif: ['Cirka', 'serif'],
    },
  },
  plugins: [],
};
