import { defineConfig } from 'vitepress'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Minilo-UI',
  description: 'Minilo-UI组件库',
  vite: {
    resolve: {
      alias: {
        '#': resolve(__dirname, '../../src'),
        '@minilo/utils': resolve(__dirname, '../../../utils'),
        '@minilo/types': resolve(__dirname, '../../../types')
      }
    },
    ssr: {
      noExternal: [
        'element-plus',
        '@minilo/utils',
        '@minilo/types',
        '@vueuse/core',
        'lodash.clonedeep',
        'axios',
        'defu'
      ],
      external: ['axios-mock-adapter']
    },
    optimizeDeps: {
      include: ['axios-mock-adapter']
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
        text: '组件',
        items: [
          { text: 'MlChart 图表', link: '/components/chart' },
          { text: 'MlSearch 搜索', link: '/components/search' },
          { text: 'MlSearchTable 搜索表格', link: '/components/search-table' },
          { text: 'MlDetail 详情', link: '/components/detail' },
          { text: 'MlButton 按钮', link: '/components/button' },
          { text: 'MlTreeSelect 树形选择', link: '/components/tree-select' },
          { text: 'MlTreeSelectDialog 树形选择对话框', link: '/components/tree-select-dialog' },
          { text: 'MlTreeSelectDrawer 树形选择抽屉', link: '/components/tree-select-drawer' },
          { text: 'MlVirtualList 虚拟列表', link: '/components/virtual-list' },
          { text: 'MlNumberRangeInput 数值范围输入框', link: '/components/number-range-input' }
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
