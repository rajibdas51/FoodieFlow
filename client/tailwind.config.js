/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}', // Scans App Router files
    './pages/**/*.{ts,tsx}', // Scans Pages Router files (if used)
    './components/**/*.{ts,tsx}', // Scans your components
    './src/**/*.{ts,tsx}', // Scans src folder (if you use it)
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd831e', // Primary color: #fd831e
          50: '#fef2e6', // Lighter shades (optional, generated for flexibility)
          100: '#fee2c2', // You can adjust these shades as needed
          200: '#fdd18e',
          300: '#fcbb5a',
          400: '#fba733',
          500: '#fd831e', // Base primary color
          600: '#f87314',
          700: '#ef5e0f',
          800: '#e6490a',
          900: '#da2e06',
        },
      },
      // Optional: Add custom spacing, typography, etc.
      spacing: {
        128: '32rem', // Example custom spacing
      },
    },
  },
  plugins: [import('tailwind-scrollbar-hide')],
};
