const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        'light-blue': colors.lightBlue,
        lime: colors.lime,
        rose: colors.rose,
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['Menlo', ...fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {},
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
