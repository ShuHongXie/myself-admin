console.log('hello world')
console.error('error') // 不处理，因为 property 是 error

// // 转换前的代码
// function example1() {
//   const error = 1
//   if (error) {
//     const e = new Error('error')
//     return e // 会被替换
//   }
//   return 123 // 不处理
// }
