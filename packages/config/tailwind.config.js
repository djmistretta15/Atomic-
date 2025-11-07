/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#001F3F', // Deep navy
          50: '#E6EBF0',
          100: '#CCD7E1',
          200: '#99AFC3',
          300: '#6687A5',
          400: '#335F87',
          500: '#001F3F',
          600: '#001932',
          700: '#001326',
          800: '#000C19',
          900: '#00060D',
        },
        secondary: {
          DEFAULT: '#FFFEF7', // Off-white canvas
          50: '#FFFFFF',
          100: '#FFFEF7',
          200: '#FFFDF0',
          300: '#FFFCE8',
          400: '#FFFBE1',
          500: '#FFFAD9',
        },
        accent: {
          cyan: '#00D4FF',
          purple: '#7B2CBF',
          magenta: '#FF006E',
          gold: '#FFB703',
          green: '#06FFA5',
        },
        neutral: {
          DEFAULT: '#3A3A3A', // Charcoal
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#BABABA',
          400: '#A3A3A3',
          500: '#8C8C8C',
          600: '#757575',
          700: '#5E5E5E',
          800: '#474747',
          900: '#3A3A3A',
          950: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-spectral': 'linear-gradient(90deg, #00D4FF 0%, #7B2CBF 50%, #FF006E 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
