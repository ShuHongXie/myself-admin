import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

const outDir = 'myself'

// https://vite.dev/config/
export default defineConfig({
  build: {
    //打包后文件目录
    outDir,
    //css代码分割
    cssCodeSplit: true,
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: [
        'vue',
        'element-plus',
        'unplugin-vue-components',
        'unplugin-auto-import',
        '@minilo/utils'
      ],
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
          dir: `./${outDir}/es`
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
          dir: `./${outDir}/lib`
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      name: outDir,
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
      '#': resolve(__dirname, 'src'),
      myself: resolve(__dirname, 'src/components')
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
