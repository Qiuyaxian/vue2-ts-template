module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.{css,less}'], // css 相关文件由 postcss-scss 处理
      customSyntax: 'postcss-less'
    }
  ],
  rules: {
    'block-no-empty': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment']
      }
    ],
    indentation: [2],
    'max-empty-lines': 2,
    'string-quotes': 'single',
    'selector-class-pattern': [
      // 命名规范 -
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ]
  }
}
