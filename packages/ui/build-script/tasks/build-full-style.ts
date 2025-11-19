import { resolve, join, basename } from 'path'
import { copyFile, mkdir } from 'fs'
import { Transform } from 'stream'
import chalk from 'chalk'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import consola from 'consola'
import postcss from 'postcss'
import cssnano from 'cssnano'
import { output, root, withTaskName, libraryNameMin } from '../config'

const distFolder = join(output, '/theme-chalk')

export const copyFullStyle = async () => {
  await mkdir(resolve(output, 'dist'), { recursive: true }, () => {})
  await copyFile(join(output, 'theme-chalk/index.css'), join(output, 'dist/index.css'), () => {})
}

// 复制src文件夹到theme-chalk
export function copyThemeChalkBundle() {
  return src(join(root, `style/**`)).pipe(dest(join(distFolder, 'src')))
}

/**
 * 使用cssnano压缩CSS文件的函数
 * 返回一个Transform流，用于处理文件
 * @returns {Transform} 返回一个可以处理CSS文件的Transform流
 */
function compressWithCssnano() {
  // 创建一个PostCSS处理器，配置cssnano插件
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          colormin: false, // 禁用颜色值优化
          minifyFontValues: false // 禁用字体值优化
        }
      ]
    })
  ])
  // 返回一个新的Transform流
  return new Transform({
    objectMode: true, // 以对象模式处理流
    transform(chunk, _encoding, callback) {
      const file = chunk
      // 如果文件内容为空，直接返回
      if (file.isNull()) {
        callback(null, file)
        return
      }
      // 如果文件是流，抛出错误（不支持流处理）
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      // 将文件内容转换为CSS字符串
      const cssString = file.contents!.toString()
      // 使用PostCSS处理器处理CSS
      processor.process(cssString, { from: file.path }).then((result) => {
        // 获取文件名
        const name = basename(file.path)
        // 更新文件内容为压缩后的CSS
        file.contents = Buffer.from(result.css)
        // 输出压缩前后的文件大小信息
        consola.success(
          `${chalk.cyan(name)}: ${chalk.yellow(
            cssString.length / 1000
          )} KB -> ${chalk.green(result.css.length / 1000)} KB`
        )
        callback(null, file)
      })
    }
  })
}

function buildStyle() {
  console.log('开始集中构建样式文件>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('path:', distFolder)

  const sass = gulpSass(dartSass as any)
  const withoutMsPrefixFile = /(index|base|display)/
  return src(resolve(root, './style/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(
      rename((path: { basename: string }) => {
        if (!withoutMsPrefixFile.test(path.basename)) {
          path.basename = `${libraryNameMin}-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

export const buildFullStyle = series(
  withTaskName('buildFullStyle', buildStyle),
  withTaskName('copyFullStyle', copyFullStyle),
  withTaskName('copyThemeChalkBundle', copyThemeChalkBundle)
)
