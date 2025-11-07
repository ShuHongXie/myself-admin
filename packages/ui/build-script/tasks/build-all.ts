import { rollup, type OutputOptions } from 'rollup'
import { resolve } from 'path'
import { series, dest, parallel } from 'gulp'
import {
  root,
  output as outputDirectory,
  formatBundleFilename,
  writeBundles,
  withTaskName
} from '../config'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'

interface BuildOptions {
  minify: boolean
}

async function buildAllLibrary(options: BuildOptions = { minify: false }): Promise<void> {
  const { minify } = options
  const config = {
    input: resolve(root, 'index.ts'),
    external: ['vue', 'element-plus'],
    plugins: [
      vue(),
      esbuild({
        minify,
        jsxFactory: 'h' // 可选：自定义 JSX 工厂函数（如 Vue 的 h）
      })
    ]
  }
  let bundle
  try {
    bundle = await rollup(config)
    const outputOptionsList: OutputOptions[] = [
      {
        format: 'umd',
        file: resolve(outputDirectory, 'dist', formatBundleFilename('index.full', minify, 'js')),
        globals: {
          vue: 'Vue'
        },
        sourcemap: minify
      },
      {
        format: 'esm',
        file: resolve(outputDirectory, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
        sourcemap: minify
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
