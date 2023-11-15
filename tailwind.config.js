/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "scale-up-ver-bottom": "scale-up-ver-bottom 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "scale-down-center": "scale-down-center 0.2s cubic-bezier(0.250, 0.460, 0.250, 0.940)   both",
      },
      keyframes: {
        "scale-up-ver-bottom": {
          "0%": {
            transform: "scaleY(.4)",
            "transform-origin": "0% 100%",
          },
          to: {
            transform: "scaleY(1)",
            "transform-origin": "0% 100%",
          },
        },
        "scale-down-center": {
          "0%": {
            transform: "scale(1)",
          },
          to: {
            transform: "scale(.8)",
          },
        },
      },
    },
  },
  plugins: [],
};
