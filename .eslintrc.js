/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier', 'plugin:tailwindcss/recommended'],
  rules: {
    '@next/next/no-img-element': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
};
