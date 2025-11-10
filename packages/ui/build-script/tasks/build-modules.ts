import glob from 'fast-glob'
import { resolve } from 'path'
import { rollup, type OutputOptions } from 'rollup'
import { output, libraryName } from '../config'

const config = {
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

async function buildModulesComponents() {
  const input = await glob(['src/**/*.{js,ts,vue}', '!src/style/(index|css).{js,ts,vue}'], {
    cwd: resolve(__dirname, '../'),
    absolute: true,
    onlyFiles: true
  })
  const bundle = await rollup({
    input,
    plugins,
    external: await generateExternal({ full: false }),
    treeshake: { moduleSideEffects: false }
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}
