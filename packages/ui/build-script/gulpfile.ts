import { series, dest, parallel } from 'gulp'
import { output, run, runTask, withTaskName } from './config'
import { mkdir } from 'fs'
import { resolve } from 'path'

// export const copyFullStyle = async () => {
//   await mkdir(resolve(epOutput, 'dist'), { recursive: true })
//   await copyFile(
//     resolve(epOutput, 'theme-chalk/index.css'),
//     resolve(epOutput, 'dist/index.css')
//   )
// }

export default series(
  // withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', (done: any) => {
    mkdir(output, { recursive: true }, done)
  }),

  parallel(
    // runTask('buildModules'),
    runTask('buildFullBundle'),
    // runTask('generateTypesDefinitions'),
    // runTask('buildHelper'),
    series(
      withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
      copyFullStyle
    )
  )

  // parallel(copyTypesDefinitions, copyFiles)
)

export * from './tasks'
