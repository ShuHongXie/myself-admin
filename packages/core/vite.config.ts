import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.page']
  },
  plugins: [vue()],
  build: {
    // 子包按库模式打包
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // 子包入口
      name: 'subPkg', // 全局变量名（可选）
      formats: ['es'], // 输出ES模块（主包优先用ES模块）
      fileName: () => 'sub-pkg.es.js' // 输出文件名
    },
    rollupOptions: {
      // 外部化Vue，避免子包打包Vue（主包已提供，防止多实例）
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' } // 映射Vue全局变量
      }
    }
  }
})
