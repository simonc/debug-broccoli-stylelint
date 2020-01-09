module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  extends: 'eslint:recommended',

  env: {
    browser: true,
    commonjs: true,
    es6: true
  },

  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error'],
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'comma-dangle': ['error', 'never'],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 'off',

    'max-len': ['error', {
      code: 90,
      comments: 120,
      ignoreUrls: true,
      tabWidth: 2
    }],

    'max-statements-per-line': ['error', { max: 2 }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always', { omitLastInOneLineBlock: true }]
  }
};
