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
          DEFAULT: '#042556',
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
        info: {
          DEFAULT: colors.blue[500],
        },
        'info-acc': {
          DEFAULT: colors.blue[600],
        },
        success: {
          DEFAULT: colors.green[500],
        },
        'success-acc': {
          DEFAULT: colors.green[600],
        },
        warning: {
          DEFAULT: colors.yellow[500],
        },
        'warning-acc': {
          DEFAULT: colors.yellow[600],
        },
        danger: {
          DEFAULT: colors.red[500],
        },
        'danger-acc': {
          DEFAULT: colors.red[600],
        },
      },

      fontFamily: {
        sans: fontFamily_sans,
        disp: ['Raleway', ...fontFamily_sans],
      },

      zIndex: {
        'page-loader': '1000',
        header: '100',
        popup: '200',
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
