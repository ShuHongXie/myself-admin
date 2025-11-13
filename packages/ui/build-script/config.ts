import { resolve } from 'path'
import type { OutputOptions, RollupBuild } from 'rollup'
import { spawn } from 'child_process'
import chalk from 'chalk'
import consola from 'consola'

export const libraryName = 'minilo'
export const root = resolve(__dirname, '../src')
export const output = resolve(__dirname, `../${libraryName}`)
export const cwd = process.cwd()

export function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export const withTaskName = (name: string, fn: any) => Object.assign(fn, { displayName: name })

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => run(`pnpm run build ${name}`, root))

export const run = async (command: string, cwd: string = root) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args]: string[] = command.split(' ')
    consola.info(`run: ${chalk.hex('#fc291a')(`${cmd} ${args.join(' ')}`)}`)
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })

    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)

      if (code === 0) resolve()
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`))
    })

    app.on('error', (error) => {
      console.log('错误:', error)
      process.removeListener('exit', onProcessExit)
      reject(error)
    })
    process.on('exit', onProcessExit)
  })
