module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.

    'arrow-parens': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'arrow-body-style': 'off', // Not our taste?
    'function-paren-newline': 'off', // Incompatible with prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Incompatible with prettier

    'max-len': ['error', 100, 2, { ignoreUrls: true }], // airbnb is allowing some edge cases
    'no-console': 'error', // airbnb is using warn
    'no-alert': 'error', // airbnb is using warn

    'no-param-reassign': 'off', // Not our taste?
    radix: 'off', // parseInt, parseFloat radix turned off. Not my taste.
  },
};
