export default {
  extends: ['@commitlint/config-conventional'],
  // 规则
  rules: {
    // 范围不能为 0
    // 'scope-empty': [2, 'never'],
    // subject 大小写不验证
    'subject-case': [0],
    // git 类型必须是以下类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复异常
        'docs', // 更新文档
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 测试用例
        'build', // 构建流程，外部依赖更改
        'ci', // 修改 CI 配置，脚本
        'revert', // 回滚
        'chore', // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ],
    ],
  },
};
