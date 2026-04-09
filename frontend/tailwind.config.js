/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B19',
          900: '#0A1128',
          800: '#111D42',
          700: '#1C2F5D',
          600: '#2A437E',
        },
        electric: {
          500: '#2a9d8f',
          400: '#248b7f',
          300: '#5ab9ae',
        },
        gold: {
          500: '#c17f2b',
          400: '#d6953e',
          300: '#e6b56a',
        },
        neon: {
          purple: '#6d597a',
          pink: '#c06c84',
          cyan: '#264653',
        },
        night: {
          950: '#0d1321',
          900: '#162033',
          800: '#1f2a40',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        glow: 'glow 4s ease-in-out infinite',
        slideUp: 'slideUp 0.5s ease-out forwards',
        pulse2: 'pulse2 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideInRight: 'slideInRight 0.4s ease-out forwards',
        bounce2: 'bounce2 2s ease-in-out infinite',
      },
      backgroundSize: {
        '200': '200% 100%',
      },
    },
  },
  plugins: [],
};
