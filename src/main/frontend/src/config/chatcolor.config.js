/**
 * @author hyunseul
 * @create date 2023-10-10 22:13:11
 * @modify date 2023-10-10 22:13:13
 */

const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}


