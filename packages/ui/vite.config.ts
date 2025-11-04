import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    //打包后文件目录
    outDir: 'build',
    //css代码分割
    cssCodeSplit: true,
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue', 'element-plus'],
      input: ['./src/index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: 'src', // 从src文件夹开始打包
          exports: 'named',
          //配置打包根目录
          dir: './build/es'
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          //配置打包根目录
          dir: './build/lib'
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      name: 'MsUI',
      fileName: 'index',
      formats: ['es', 'cjs']
    }
  },
  css: {
    // 确保所有 CSS 都被正确处理
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src')
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
