/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Chargent brand palette (Chargent Brand Style Guide v1.2)
        turquoise: "#49DFA9",
        teal: { DEFAULT: "#2E8787", dark: "#005452", deeper: "#003F3D" },
        yellow: "#FFCC33",
        charcoal: "#383E42",
        "dark-gray": "#5A5D60",
        "medium-gray": "#838689",
        "light-gray": "#F2F2F2",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: { none: "0px", full: "9999px" },
      maxWidth: { page: "1200px" },
    },
  },
  plugins: [],
};
