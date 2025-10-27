import { readFileSync, writeFileSync } from 'fs'
import { transformSync } from '@babel/core'
import translateEPlugin from './src/babel/translate-e.ts'

// 读取 TypeScript 文件
const sourceCode = readFileSync('./src/babel/test1.ts', 'utf-8')

// 使用 Babel 转换代码（保留类型）
const result = transformSync(sourceCode, {
  filename: 'test1.ts',
  presets: [
    [
      '@babel/preset-typescript',
      {
        isTSX: false,
        allExtensions: false
      }
    ]
  ],
  plugins: [translateEPlugin]
})

if (result?.code) {
  console.log('转换成功!')

  // 写入文件
  writeFileSync('./dist/test1-transformed.ts', result.code)
  console.log('输出文件已保存到 dist/test1-transformed.ts')
} else {
  console.error('转换失败')
}
