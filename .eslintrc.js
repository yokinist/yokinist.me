/** @type {import('eslint-config-next')*/
module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier', 'plugin:tailwindcss/recommended'],
  rules: {
    '@next/next/no-img-element': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
