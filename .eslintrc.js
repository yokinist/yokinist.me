/** @type {import('eslint-config-next')*/
module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier', 'plugin:tailwindcss/recommended'],
  plugins: ['unused-imports'],
  rules: {
    '@next/next/no-img-element': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'unused-imports/no-unused-imports': 'error',
  },
};
