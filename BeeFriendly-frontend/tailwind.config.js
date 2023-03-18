/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
     extend: {},

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      "2xl": "1536px",
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#000000',
      'asfar': '#FFBF5F',
      'white': '#FFFFFF',
      'gris': '#333333' , 
      'beige': '#EFEFEC' ,  
    }, 
  },
  plugins: [],
}