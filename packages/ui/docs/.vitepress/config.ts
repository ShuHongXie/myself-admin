import { defineConfig } from 'vitepress'
import { resolve } from 'path'

// 获取环境变量中的 API 地址，默认使用相对路径
const API_BASE_URL = process.env.VITE_API_BASE_URL || '/api'
export default defineConfig({
  title: 'Minilo-UI',
  description: 'Minilo-UI组件库',
  base: '/minilo/',
  vite: {
    resolve: {
      alias: {
        '#': resolve(__dirname, '../../src'),
        '@minilo/utils': resolve(__dirname, '../../../utils/index.ts'),
        '@minilo/types': resolve(__dirname, '../../../types/index.ts')
      }
    },
    define: {
      __API_BASE_URL__: JSON.stringify(API_BASE_URL)
    },
    ssr: {
      noExternal: [
        'element-plus',
        '@minilo/types',
        '@vueuse/core',
        'lodash.clonedeep',
        'defu',
        'echarts',
        'vue-cropper'
      ]
    },
    optimizeDeps: {
      exclude: ['@minilo/utils', '@minilo/types']
    },
    build: {
      rollupOptions: {
        external: ['crypto', 'stream', 'util', 'http', 'https', 'path', 'fs', 'zlib', 'url']
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/chart' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '组件总览', link: '/guide/' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'MlChart 图表', link: '/components/chart' },
          { text: 'MlSearch 搜索', link: '/components/search' },
          { text: 'MlDetail 详情', link: '/components/detail' },
          { text: 'MlButton 按钮', link: '/components/button' },
          { text: 'MlNumberRangeInput 数值范围输入框', link: '/components/number-range-input' },
          { text: 'MlTreeSelect 树形选择', link: '/components/tree-select' },
          { text: 'MlTreeSelectDialog 树形选择对话框', link: '/components/tree-select-dialog' },
          { text: 'MlTreeSelectDrawer 树形选择抽屉', link: '/components/tree-select-drawer' }
        ]
      },
      {
        text: '复杂组件',
        items: [
          { text: 'MlImageUploadPro 图片上传裁剪', link: '/components/image-upload-pro' },
          { text: 'MlSearchTable 搜索表格', link: '/components/search-table' },
          { text: 'MlVirtualList 虚拟列表', link: '/components/virtual-list' }
        ]
      },
      {
        text: '@minilo/utils 工具库',
        items: [{ text: 'Request 请求工具', link: '/utils/request' }]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ShuHongXie/minilo' }]
  }
})
