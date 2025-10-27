import { readFileSync, writeFileSync } from 'fs'
import * as ts from 'typescript'

// 读取 TypeScript 文件
const sourceCode = readFileSync('./src/babel/test1.ts', 'utf-8')

// TypeScript 编译器选项
const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
  forceConsistentCasingInFileNames: true,
  noEmit: true // 不输出文件，我们手动处理
}

// 创建源文件
const sourceFile = ts.createSourceFile(
  'test1.ts',
  sourceCode,
  ts.ScriptTarget.ES2020,
  true // 设置为 true 以保留原始文本
)

// 创建自定义转换器
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

// 应用转换器
const result = ts.transform(sourceFile, [transformer], compilerOptions)

// 获取转换后的源文件
const transformedSourceFile = result.transformed[0]

// 创建 printer 来生成代码
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
  omitTrailingSemicolon: false
})

// 生成转换后的代码
const transformedCode = printer.printNode(ts.EmitHint.SourceFile, transformedSourceFile, sourceFile)

// 写入文件
writeFileSync('./dist/test1-with-types.ts', transformedCode)
console.log('转换成功! 输出文件已保存到 dist/test1-with-types.ts')

// 释放资源
result.dispose()
