import glob from 'fast-glob'
import { resolve } from 'path'
import { rollup, type OutputOptions } from 'rollup'
import { output, writeBundles, root, withTaskName, cwd } from '../config'
import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'vite-plugin-dts'
import { series, type TaskFunction } from 'gulp'

const plugins = [
  esbuild({
    exclude: [],
    target: 'esnext',
    loaders: {
      '.ts': 'ts'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    treeShaking: true,
    legalComments: 'eof'
  }),
  nodeResolve({
    preferBuiltins: true,
    browser: true,
    extensions: ['.mjs', '.js', '.ts']
  }),
  commonjs(),
  dts({
    tsconfigPath: resolve(cwd, '../tsconfig.dts.json'),
    outDir: `${output}/resolver`
  })
]

async function buildResolverESM() {
  console.log('Building resolver (ESM)...')

  const input = await glob(['resolver/index.ts'], {
    cwd: root,
    absolute: true,
    onlyFiles: true
  })

  if (input.length === 0) {
    console.warn('No resolver files found')
    return
  }

  const config = {
    input,
    plugins,
    external: ['vue', 'element-plus', /\.\.\/utils/],
    treeshake: { moduleSideEffects: false }
  }

  const bundle = await rollup(config)

  const outputOptions: OutputOptions = {
    format: 'esm',
    dir: resolve(output, 'resolver'),
    exports: undefined,
    preserveModules: true,
    preserveModulesRoot: root,
    sourcemap: false,
    entryFileNames: '[name].mjs'
  }

  await writeBundles(bundle, [outputOptions])
  console.log('Resolver ESM build completed')
}

async function buildResolverCJS() {
  console.log('Building resolver (CJS)...')

  const input = await glob(['resolver/index.ts'], {
    cwd: root,
    absolute: true,
    onlyFiles: true
  })

  if (input.length === 0) {
    console.warn('No resolver files found')
    return
  }

  const config = {
    input,
    plugins,
    external: ['vue', 'element-plus', /\.\.\/utils/],
    treeshake: { moduleSideEffects: false }
  }

  const bundle = await rollup(config)

  const outputOptions: OutputOptions = {
    format: 'cjs',
    dir: resolve(output, 'resolver'),
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: root,
    sourcemap: false,
    entryFileNames: '[name].js'
  }

  await writeBundles(bundle, [outputOptions])
  console.log('Resolver CJS build completed')
}

export const buildResolver: TaskFunction = series(
  withTaskName('buildResolverESM', buildResolverESM),
  withTaskName('buildResolverCJS', buildResolverCJS)
)
