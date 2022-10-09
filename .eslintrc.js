module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
    // 'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0, // 目前埋点有部分字段无法更换
    '@typescript-eslint/no-non-null-assertion': 0, // 允许非空断言运算符
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
