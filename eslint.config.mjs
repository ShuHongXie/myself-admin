import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },

  // 新增添加内容：这里我们可以添加自己的 rules
  {
    rules: {
      semi: ['error', 'never'], // 语句后不带分号
      'no-unused-vars': 'error', // 没有使用的参数
      'no-undef': 'off', // 没有定义参数
      'vue/multi-word-component-names': 'off',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    ignores: ['node_modules/', 'apps/**/dist', '*.md'] // 忽略目录
  },
  // prettier融合配置
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
]
