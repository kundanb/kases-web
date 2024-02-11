const theme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const fontFamily_sans = ['Noto Sans', 'sans-serif']

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {
        prim: {
          DEFAULT: colors.blue[500],
          ...colors.blue,
        },
        'prim-acc': {
          DEFAULT: colors.indigo[500],
          ...colors.indigo,
        },
        dark: {
          DEFAULT: '#010915',
        },
        'dark-acc': {
          DEFAULT: '#031a3f',
        },
        light: {
          DEFAULT: colors.white,
        },
        'light-acc': {
          DEFAULT: '#f1f6fe',
        },
        misc: {
          DEFAULT: colors.amber[300],
        },
      },

      fontFamily: {
        sans: fontFamily_sans,
        disp: ['Raleway', ...fontFamily_sans],
      },

      zIndex: {
        'page-loader': '1000',
        header: '100',
      },

      borderRadius: {
        DEFAULT: theme.borderRadius.md,
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
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
        DEFAULT: colors.amber[300],
      },
    },
  },
}
