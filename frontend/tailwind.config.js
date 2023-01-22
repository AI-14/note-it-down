/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#4c97ed",
        primaryaccent: "#136acf",
      },
      fontFamily: {
        primary: "Playfair Display",
        body: "Work Sans",
      },
    },
  },
  plugins: [],
}
