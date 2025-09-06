/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ruqaa: ['"Aref Ruqaa"', 'serif'],
        zain: ["'Zain'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

