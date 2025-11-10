import { series, dest, parallel } from 'gulp'
import { removeSync, mkdirsSync } from 'fs-extra'
import { output, run, root, runTask, withTaskName } from './config'
import { copyFile, mkdir } from 'fs'

export default series(
  withTaskName('clean', async () => {
    await removeSync(output)
  }),
  withTaskName('createOutput', async () => {
    await mkdirsSync(output)
  }),

  parallel(
    runTask('buildModules')
    // runTask('buildFullBundle'),
    // runTask('generateTypesDefinitions'),
    // runTask('buildHelper'),
    // runTask('buildFullStyle')
  )

  // parallel(copyTypesDefinitions, copyFiles)
)

export * from './tasks'
