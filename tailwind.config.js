/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"], // ✅ Set 'Lato' as default font
      },
    },
  },
  plugins: [],
};
