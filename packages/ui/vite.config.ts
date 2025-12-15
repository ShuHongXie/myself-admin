import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

const outDir = 'minilo'

// https://vite.dev/config/
export default defineConfig({
  build: {
    //打包后文件目录
    outDir,
    //css代码分割
    cssCodeSplit: true,
    //压缩
    minify: false
  },
  css: {
    // 确保所有 CSS 都被正确处理
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src'),
      minilo: resolve(__dirname, 'src/components')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    dts({
      tsconfigPath: './tsconfig.prod.json',
      outDir: 'build/es'
    }),
    dts({
      tsconfigPath: './tsconfig.prod.json',
      outDir: 'build/lib'
    })
  ]
})
