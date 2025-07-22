export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义规则示例
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert']
    ],
    'subject-case': [0] // 允许任意大小写
  }
}
