const limitTypeList = require('./versionrc').types
const limitTypeKeyList = limitTypeList.map((item) => item.value)
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', limitTypeKeyList],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
