/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0da6f2", // Blue for Market
        secondary: "#0df20d", // Green for Inventory/Success
        "background-light": "#f5f7f8",
        "background-dark": "#101c22",
        "card-dark": "#182b34",
        "border-dark": "#223c49",
        "surface-green": "#162e16", // Specific for inventory
        "bg-green-dark": "#102210", // Specific for inventory
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
}