import { rollup, type OutputOptions } from 'rollup'
import { resolve } from 'path'
import { series, dest, parallel } from 'gulp'
import {
  root,
  output as outputDirectory,
  formatBundleFilename,
  writeBundles,
  withTaskName,
  libraryName
} from '../config'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from '@rollup/plugin-node-resolve' // 解析 node_modules
import commonjs from '@rollup/plugin-commonjs' // 转换 CJS 为 ESM
import nodePolyfills from 'rollup-plugin-polyfill-node'

interface BuildOptions {
  minify: boolean
}

async function buildAllLibrary(options: BuildOptions = { minify: false }): Promise<void> {
  const { minify } = options
  const config = {
    input: resolve(root, 'index.ts'),
    external: ['vue', 'element-plus'],
    plugins: [
      vue({
        css: false
      }),
      esbuild({
        minify,
        jsxFactory: 'h' // 可选：自定义 JSX 工厂函数（如 Vue 的 h）
      }),
      // 1. 解析 node_modules 中的依赖（包括 @iconify/vue）
      nodeResolve({
        preferBuiltins: true,
        browser: true, // 针对浏览器环境解析
        extensions: ['.vue', '.js', '.ts'] // 支持的文件后缀
      }),
      // 2. 转换 CommonJS 模块为 ES 模块（处理依赖中的 CJS 格式）
      commonjs(),
      nodePolyfills()
    ]
  }
  let bundle
  try {
    bundle = await rollup(config)
    const outputOptionsList: OutputOptions[] = [
      {
        name: libraryName,
        format: 'umd',
        file: resolve(outputDirectory, 'dist', formatBundleFilename('index.full', minify, 'js')),
        globals: {
          vue: 'Vue'
        },
        sourcemap: minify,
        exports: 'named'
      },
      {
        name: libraryName,
        format: 'cjs',
        file: resolve(outputDirectory, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
        sourcemap: minify,
        exports: 'named'
      }
    ]
    await writeBundles(bundle, outputOptionsList)
  } catch (error) {
    console.error('打包失败：', error)
    process.exit(1) // 异常退出
  } finally {
    // ③ 关闭打包实例（释放资源）
    if (bundle) await bundle.close()
  }
}

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', () => buildAllLibrary({ minify: true })),
  withTaskName('buildFull', () => buildAllLibrary())
)
