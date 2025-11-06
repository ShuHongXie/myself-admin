import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { transformWithTypesPlugin } from './src/vite-plugin/transform-with-types'

const MyselfUiResolver = () => {
  console.log('MyselfUiResolver初始化')
  return {
    type: 'component' as const,
    resolve: (name) => {
      console.log('name:', name)
      // 只处理Ms开头的组件
      if (name.startsWith('Ms')) {
        const componentName = name.slice(2)
        console.log('componentName:', componentName)
        console.log('css path:', `@myself/ui/es/components/${componentName}/index.css`)
        return {
          name,
          from: `@myself/ui/es/${componentName}`,
          sideEffects: `@myself/ui/styles/${componentName}`
        }
      }
      return null
    }
  }
}

export default defineConfig({
  server: {
    port: 3000, // 指定端口号
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // 后端接口地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 移除请求路径中的/api前缀
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@myself/core/styles" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src')
      // '@myself/ui/es': resolve(__dirname, 'node_modules/@myself/ui/es')
    }
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true, // 将 on:click 转换为 onClick
      mergeProps: true // 合并 props
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia']
    }),
    Components({
      resolvers: [ElementPlusResolver(), MyselfUiResolver()],
      dts: 'src/types/components.d.ts'
    }),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [resolve(__dirname, 'src/assets/images/svg')],
      // 执行 icon name 的格式
      symbolId: 'icon-[name]'
    }),
    transformWithTypesPlugin({
      // 配置选项
      input: './src/apis/client/client.gen.ts',
      output: './src/apis/client/client.gen.ts',
      enableBuild: true,
      enableDev: true // 启用开发时监听
    }) // 添加我们的 TypeScript 转换插件
  ]
})
