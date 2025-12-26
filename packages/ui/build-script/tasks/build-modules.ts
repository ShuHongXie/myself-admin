import glob from 'fast-glob'
import { resolve } from 'path'
import { rollup, type OutputOptions } from 'rollup'
import { output, libraryName, writeBundles, root, withTaskName, cwd } from '../config'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from '@rollup/plugin-node-resolve' // 解析 node_modules
import commonjs from '@rollup/plugin-commonjs' // 转换 CJS 为 ESM
import type { BuildInfo, Module } from './types'
import dts from 'vite-plugin-dts'
import { series, type TaskFunction } from 'gulp'

const outputConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(output, 'es')
    },
    bundle: {
      path: `${libraryName}/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(output, 'lib')
    },
    bundle: {
      path: `${libraryName}/lib`
    }
  }
}

const plugins = [
  vue(),
  esbuild({
    exclude: [],
    target: 'esnext',
    loaders: {
      '.vue': 'ts'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    treeShaking: true,
    legalComments: 'eof'
  }),
  // 1. 解析 node_modules 中的依赖（包括 @iconify/vue）
  nodeResolve({
    preferBuiltins: true,
    browser: true, // 针对浏览器环境解析
    extensions: ['.vue', '.mjs', '.js', '.ts'] // 支持的文件后缀
  }),
  commonjs(),
  dts({
    tsconfigPath: resolve(cwd, '../tsconfig.dts.json'),
    outDir: `${output}/es`,
    exclude: ['node_modules/**']
  }),
  dts({
    tsconfigPath: resolve(cwd, '../tsconfig.dts.json'),
    outDir: `${output}/lib`,
    exclude: ['node_modules/**']
  })
]

async function buildModulesComponents() {
  console.log('path:', root)

  const input = await glob(
    [
      'components/**/*.{js,ts,vue}',
      '!components/**/style/(index|css).{js,ts,vue}',
      '!components/**/__tests__/**',
      '!components/**/*.(test|spec).{js,ts,tsx}'
    ],
    {
      cwd: root,
      absolute: true,
      onlyFiles: true
    }
  )
  const config = {
    input,
    plugins,
    external: ['vue', 'element-plus', 'axios', 'defu', '@iconify/vue', 'echarts', 'vue-cropper'],
    treeshake: { moduleSideEffects: false }
  }
  const bundle = await rollup(config)
  const outputOptionsList: OutputOptions[] = Object.entries(outputConfig).map(
    ([module, config]) => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: root,
        sourcemap: false,
        entryFileNames: `[name].${config.ext}`
      }
    }
  )

  await writeBundles(bundle, outputOptionsList)
}

// async function buildModulesStyles() {
//   const input = await glob('**/style/(index|css).{js,ts,vue}', {
//     cwd: root,
//     absolute: true,
//     onlyFiles: true
//   })
//   const bundle = await rollup({
//     input,
//     plugins,
//     treeshake: false
//   })

//   const outputOptionsList: OutputOptions[] = Object.entries(outputConfig).map(
//     ([module, config]) => {
//       return {
//         format: config.format,
//         dir: resolve(config.output.path, 'components'),
//         exports: module === 'cjs' ? 'named' : undefined,
//         preserveModules: true,
//         preserveModulesRoot: join(root, 'components'),
//         sourcemap: true,
//         entryFileNames: `[name].${config.ext}`
//       }
//     }
//   )

//   await writeBundles(bundle, outputOptionsList)
// }

export const buildModules: TaskFunction = series(
  withTaskName('buildModulesComponents', buildModulesComponents)
  // withTaskName('buildModulesStyles', buildModulesStyles)
)
