/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        muted: '#f8f9f9',
        card: '#f5f7f7',
        'card-foreground': 'black',
      }
    },
  },
  plugins: [
  ],
}

