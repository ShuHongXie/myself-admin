import { type PluginObj, types as t } from '@babel/core'

// 定义插件函数，返回 Babel 插件对象（PluginObj）
export default function replaceConsolePlugin(): PluginObj {
  return {
    // 插件名称（可选，用于调试）
    name: 'replace-console-log',

    // 访问者（Visitor）：定义对 AST 节点的处理逻辑
    visitor: {
      // 处理函数调用节点（CallExpression）
      CallExpression(path) {
        const callee = path.node.callee

        // 检查是否是 console.log（类型判断依赖 @types/babel__types）
        if (
          t.isMemberExpression(callee) && // 确保是成员表达式（如 a.b）
          t.isIdentifier(callee.object, { name: 'console' }) && // 对象是 console
          t.isIdentifier(callee.property, { name: 'log' }) // 属性是 log
        ) {
          // 将 console 替换为 logger（用 t.identifier 创建标识符节点）
          callee.object = t.identifier('logger')
        }
      }
    }
  }
}
