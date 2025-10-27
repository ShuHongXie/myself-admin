import type { Plugin } from 'vite'
import * as ts from 'typescript'
import { readFileSync } from 'fs'

// 创建自定义转换器
const createTransformer = () => {
  const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
    return (sourceFile) => {
      const visit: ts.Visitor = (node) => {
        // 查找 return 语句
        if (ts.isReturnStatement(node) && node.expression) {
          // 检查是否是返回单个标识符 'e'
          if (ts.isIdentifier(node.expression) && node.expression.text === 'e') {
            // 创建 Promise.reject(e) 表达式
            const promiseReject = ts.factory.createPropertyAccessExpression(
              ts.factory.createIdentifier('Promise'),
              ts.factory.createIdentifier('reject')
            )

            const callExpression = ts.factory.createCallExpression(promiseReject, undefined, [
              node.expression
            ])

            // 返回新的 return 语句
            return ts.factory.createReturnStatement(callExpression)
          }
        }

        // 递归遍历子节点
        return ts.visitEachChild(node, visit, context)
      }

      return ts.visitNode(sourceFile, visit) as ts.SourceFile
    }
  }

  return transformer
}

// Vite 插件
export function tsTransformPlugin(): Plugin {
  return {
    name: 'ts-transform',

    // 在转换阶段应用插件
    transform(code, id) {
      // 只处理 .ts 文件（排除 .d.ts 声明文件）
      if (!id.endsWith('.ts') || id.endsWith('.d.ts')) {
        return null
      }

      // 使用 TypeScript 编译器 API 转换代码
      const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true
      }

      // 创建源文件
      const sourceFile = ts.createSourceFile(id, code, ts.ScriptTarget.ES2020, true)

      // 应用转换器
      const result = ts.transform(sourceFile, [createTransformer()], compilerOptions)

      // 获取转换后的源文件
      const transformedSourceFile = result.transformed[0]

      // 创建 printer 来生成代码
      const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
        removeComments: false,
        omitTrailingSemicolon: false
      })

      // 生成转换后的代码
      const transformedCode = printer.printNode(
        ts.EmitHint.SourceFile,
        transformedSourceFile,
        sourceFile
      )

      // 释放资源
      result.dispose()

      // 返回转换后的代码
      return {
        code: transformedCode,
        map: null // 简化处理，不生成 source map
      }
    }
  }
}
