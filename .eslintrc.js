module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'import/no-anonymous-default-export': [
      2,
      {
        allowArrowFunction: true
      }
    ]
  },
  globals: {
    React: true
  }
}
