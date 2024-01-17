/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': '#ff00ff', // Reemplaza '#ff00ff' con tu color personalizado
        'whitesmoke': '#f0f2f5',
        "how":"#f5f6f6",
        "suave":"#8696a0", 
        "darki":"#f0f2f5",
        "highblue":"#3e9cd1",
        "botongreen":"#008069",// Agregado para el color whitesmoke
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Agrega tus colores personalizados aquí
        tituloblack: '#445560',
        greenhard:"#008069", // Cambia esto a tu color personalizado
      },
    },
  },
  variants: {},
  plugins: [],
};
