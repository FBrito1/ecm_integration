module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: "standard",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "space-before-function-paren": ["error", "always"],
    "arrow-parens": 0,
    "comma-dangle": 0,
    "consistent-return": 0,
    "implicit-arrow-linebreak": 0,
    "no-case-declarations": 0,
    "no-console": "off",
    "no-constant-condition": 1,
    "no-plusplus": 0,
    "no-useless-escape": 0,
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "padded-blocks": 0,
    semi: 0,
    "no-useless-catch": "off",
  },
};
