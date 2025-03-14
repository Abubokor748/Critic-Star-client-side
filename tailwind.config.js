/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--text-color)",
        background: "var(--bg-color)",
      },
    },
  },
  plugins: [require("daisyui")],
};
