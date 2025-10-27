import { type PluginObj, types as t } from '@babel/core'
import { NodePath } from '@babel/traverse'

// 定义插件函数，符合 Babel 插件的类型规范
export default function translateEPlugin(): PluginObj {
  return {
    visitor: {
      // 访问 ReturnStatement 节点，指定路径类型为 ReturnStatement 的 NodePath
      ReturnStatement(path: NodePath<t.ReturnStatement>) {
        const { argument } = path.node

        // 严格类型检查：确保 argument 存在且是 Identifier 类型，且名称为 'e'
        if (argument !== null && t.isIdentifier(argument) && argument.name === 'e') {
          // 构建 Promise.reject 成员表达式
          const memberExpr: t.MemberExpression = t.memberExpression(
            t.identifier('Promise'), // 对象：Promise
            t.identifier('reject'), // 属性：reject
            false // 非计算属性（非 [] 形式）
          )

          // 构建 Promise.reject(e) 函数调用表达式
          const callExpr: t.CallExpression = t.callExpression(
            memberExpr, // 调用的函数
            [argument] // 参数：原有的 e
          )

          // 替换 return 的参数为 Promise.reject(e)
          path.node.argument = callExpr
        }
      }
    }
  }
}
