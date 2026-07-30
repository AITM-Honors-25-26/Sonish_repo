/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        blue: {
          100: '#4F46E5'
        },
        white: {
          100: '#FFFFFF'
        },
        gray: {
          100: '#F5F7FA'
        },
        black: {
          100: '#1E1E1E'
        },
        light :{
          100: '#6366F1'
        }
      },
    },
  },
  plugins: [],
}