module.exports = {
  extends: 'stylelint-config-standard',
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
    'string-quotes': 'double'
  }
}
