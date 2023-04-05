/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
          blue: "#00b1fc",
          green: "#69ba00",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light"
  }
}
