import type { Plugin } from 'vite'
import * as ts from 'typescript'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

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

export interface TransformWithTypesOptions {
  /**
   * 输入文件路径
   * @default './src/apis/client/client.gen.ts'
   */
  input?: string

  /**
   * 输出文件路径
   * @default './src/apis/client/transformed-client.gen.ts'
   */
  output?: string

  /**
   * 是否在构建时启用
   * @default true
   */
  enableBuild?: boolean

  /**
   * 是否在开发时启用
   * @default false
   */
  enableDev?: boolean
}

// Vite 插件
export function transformWithTypesPlugin(options?: TransformWithTypesOptions): Plugin {
  const inputPath = options?.input || './src/apis/client/client.gen.ts'
  const outputPath = options?.output || './src/apis/client/transformed-client.gen.ts'
  const enableBuild = options?.enableBuild !== false
  const enableDev = options?.enableDev || false

  let resolvedInputPath = ''
  let resolvedOutputPath = ''

  return {
    name: 'transform-with-types',
    enforce: 'pre',
    apply: 'serve',

    // 初始化配置
    configResolved(config) {
      console.log('config:', config)
      resolvedInputPath = resolve(config.root, inputPath)
      resolvedOutputPath = resolve(config.root, outputPath)
    },

    // 在构建阶段应用插件
    buildStart() {
      if (!enableBuild) return
      this.addWatchFile(resolvedInputPath)
      transformFile.call(this)
    },

    // 在开发服务器启动时也执行转换（如果启用）
    configureServer(server) {
      // 添加文件监听
      if (enableDev) {
        server.watcher.add(resolvedInputPath)

        // 监听文件变化
        server.watcher.on('change', (file) => {
          if (file === resolvedInputPath) {
            console.log(`检测到文件变化: ${file}`)
            transformFile.call(this)
          }
        })
      }

      return () => {
        // 服务器启动后的回调
        if (enableDev) {
          console.log('Vite 开发服务器已启动，TypeScript 转换插件已准备就绪')
        }
      }
    },

    // 处理文件变化
    handleHotUpdate(ctx) {
      if (ctx.file === resolvedInputPath && enableDev) {
        console.log(`热更新触发: ${ctx.file}`)
        transformFile.call(this)
        // 返回空数组表示我们自己处理了更新
        return []
      }
    }
  }

  // 转换文件的函数
  function transformFile(this: Plugin) {
    try {
      // 获取项目根目录
      const root = process.cwd()

      // 确保输出目录存在
      const outputDir = dirname(resolvedOutputPath)
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      // 读取 TypeScript 文件
      const sourceCode = readFileSync(resolvedInputPath, 'utf-8')

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
        'source.ts',
        sourceCode,
        ts.ScriptTarget.ES2020,
        true // 设置为 true 以保留原始文本
      )

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

      // 写入文件
      writeFileSync(resolvedOutputPath, transformedCode)

      // 释放资源
      result.dispose()
    } catch (error) {
      console.error('[转换出错:', error)
    }
  }
}
