import { transformFileSync } from '@babel/core'
import { writeFileSync } from 'fs'
import replaceConsolePlugin from './src/babel/replace-console.ts'
import translateEPlugin from './src/babel/translate-e.ts'

// 转换目标文件
const result = transformFileSync('./src/babel/test1.ts', {
  presets: ['@babel/preset-typescript'],
  plugins: [translateEPlugin]
})

// 输出转换后的代码到文件
if (result?.code) {
  console.log('转换成功!')
  console.log(result.code)

  // 写入文件
  writeFileSync('./dist/output.ts', result.code)
  console.log('输出文件已保存到 dist/output.js')
}
