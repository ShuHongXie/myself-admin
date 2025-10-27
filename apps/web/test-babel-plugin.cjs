const { transformSync } = require('@babel/core');
const plugin = require('./src/replace-console.js');

// 测试代码
const code = `
console.log('hello world');
console.error('error');
`;

// 使用插件转换代码
const result = transformSync(code, {
  plugins: [plugin]
});

console.log('转换结果:');
console.log(result.code);