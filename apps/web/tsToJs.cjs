const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 编译 TS 为 JS
execSync('tsc', { stdio: 'inherit' })

// 源目录和输出目录
const srcDir = path.join(__dirname, 'src')
const distDir = path.join(__dirname, 'dist')
console.log(distDir)

// 复制非 TS 文件（如 JSON、静态资源）
function copyNonTsFiles() {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }

  const files = fs.readdirSync(srcDir, { withFileTypes: true })
  for (const file of files) {
    const srcPath = path.join(srcDir, file.name)
    const distPath = path.join(distDir, file.name)

    if (file.isDirectory()) {
      copyNonTsFiles(srcPath, distPath)
    } else if (!file.name.endsWith('.ts')) {
      fs.copyFileSync(srcPath, distPath)
    }
  }
}

// 执行复制
copyNonTsFiles()

console.log('转换完成！JS 文件已输出到 dist 目录')
