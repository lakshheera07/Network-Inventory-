/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
    pulseWave: {
      "0%": { transform: "translate(-50%, -50%) scale(0.5)", opacity: "0.8" },
      "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0" },
    },
    connect: {
      "0%": { opacity: "0", transform: "translate(-50%, -50%) scale(0.8)" },
      "50%": { opacity: "1", transform: "translate(-50%, -50%) scale(1.1)" },
      "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
    },
  },
  animation: {
    pulseWave: "pulseWave 2s infinite ease-out",
    connect: "connect 2s ease-in-out forwards",
  },
    },
  },
  plugins: [],
}
