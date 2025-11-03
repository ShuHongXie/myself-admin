import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  build: {
    //打包后文件目录
    outDir: 'myself-ui',
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
          exports: 'named',
          //配置打包根目录
          dir: './easyest/es',
          preserveModulesRoot: 'packages/ui'
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: './easyest/lib',
          preserveModulesRoot: 'packages/ui'
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      name: 'easyest',
      fileName: 'easyest',
      formats: ['es', 'umd', 'cjs']
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
      entryRoot: './src',
      outDir: ['./easyest/es/src', './easyest/lib/src'],
      tsconfigPath: './tsconfig.app.json'
    })
  ]
})
