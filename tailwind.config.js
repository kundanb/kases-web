const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        theme: {
          DEFAULT: '#F2613F',
          acc: '#9B3922',
        },
      },

      fontFamily: {
        sans: ['Noto Sans', ...theme.fontFamily.sans],
        disp: ['Raleway', 'Noto Sans', ...theme.fontFamily.sans],
      },

      zIndex: {
        'pg-loader': 1000,
        popup: 200,
        header: 100,
        navbar: 90,
      },

      height: {
        icon: '1.75em',
        field: '2.5em',
        'field-sm': '1.5em',
        'field-md': '2em',
        'field-lg': '3em',
        'field-xl': '4em',
      },

      padding: {
        field: '0.75em',
        'field-sm': '0.5em',
        'field-md': '1em',
        'field-lg': '1.5em',
        'field-xl': '2em',
      },

      borderRadius: {
        DEFAULT: theme.borderRadius.md,
      },

      borderWidth: {
        field: '0.1em',
        'field-sm': '0.05em',
        'field-md': '0.15em',
        'field-lg': '0.2em',
        'field-xl': '0.3em',
      },

      boxShadow: {
        smooth: '0 0 20px -6px #0002',
      },

      ringOpacity: {
        DEFAULT: 1,
      },
      ringWidth: {
        DEFAULT: theme.ringWidth[2],
      },
      ringOffsetWidth: {
        DEFAULT: theme.ringOffsetWidth[2],
      },
      ringColor: {
        DEFAULT: '#9B3922',
      },

      animation: {
        'fade-in': 'fade-in 0.15s ease-in-out',
        float: 'float 2s ease-in-out infinite',
        'float-in': 'float-in 0.15s ease-in-out',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        'float-in': {
          from: { transform: 'translateY(5%)' },
        },
      },
    },
  },
}
