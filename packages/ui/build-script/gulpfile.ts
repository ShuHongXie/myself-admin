import { series, dest, parallel } from 'gulp'
import { output, run, runTask, withTaskName } from './config'
import { mkdir } from 'fs'

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', (done) => {
    mkdir(output, { recursive: true }, done)
  }),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle')
    // runTask('generateTypesDefinitions'),
    // runTask('buildHelper'),
    // series(
    //   withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
    //   copyFullStyle
    // )
  )

  // parallel(copyTypesDefinitions, copyFiles)
)
