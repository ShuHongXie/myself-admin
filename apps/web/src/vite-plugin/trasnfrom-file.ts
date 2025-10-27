// vite-plugin-babel.js
import babel from '@babel/core'

export default function viteBabelPlugin(options = {}) {
  return {
    name: 'vite-plugin-babel', // 插件名称（必填）

    // transform 钩子：在模块被加载时转换代码
    async transform(code, id) {
      // 只处理指定类型的文件（如 .js, .jsx, .ts, .tsx）
      if (!/\.(js|jsx|ts|tsx)$/.test(id)) {
        return null // 不处理非目标文件
      }

      // 配置 Babel 选项（可外部传入，或内部定义）
      const babelOptions = {
        presets: [
          // 处理 ES6+ 转 ES5 及兼容性
          ['@babel/preset-env', { targets: 'defaults' }],
          // 如需处理 TypeScript
          '@babel/preset-typescript'
        ],
        plugins: [
          // 示例：添加自定义插件或官方插件
          '@babel/plugin-transform-runtime'
        ],
        ...options, // 允许外部覆盖配置
        filename: id // 传入文件名，帮助 Babel 识别文件类型
      }

      try {
        // 调用 Babel 转译代码
        const result = await babel.transformAsync(code, babelOptions)
        // 返回转译后的代码和 sourcemap（如果需要）
        return {
          code: result.code || code,
          map: result.map // 保留 sourcemap，便于调试
        }
      } catch (err) {
        console.error('Babel 转译失败：', err)
        throw err // 抛出错误，终止构建
      }
    }
  }
}
