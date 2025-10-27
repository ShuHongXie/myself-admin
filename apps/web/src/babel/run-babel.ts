import { transformFileSync } from '@babel/core'
import replaceConsolePlugin from './replace-console.ts'
import translateEPlugin from './translate-e.ts'

// 转换目标文件
const result = transformFileSync('./src/babel/test.ts', {
  plugins: [translateEPlugin]
})

// 输出转换后的代码
if (result?.code) {
  console.log(result.code)
}
// npx ts-node ./src/babel/run-babel.ts
// npx babel src/test.js --out-file dist/output.js
