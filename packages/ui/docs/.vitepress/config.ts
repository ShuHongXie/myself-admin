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
        items: [{ text: '组件总览', link: '/guide/' }]
      },
      {
        text: '组件',
        items: [
          { text: 'MlChart 图表', link: '/components/chart' },
          { text: 'MlSearch 搜索', link: '/components/search' },
          { text: 'MlSearchTable 搜索表格', link: '/components/search-table' }
        ]
      },
      {
        text: '示例',
        items: [
          { text: 'Markdown示例', link: '/markdown-examples' },
          { text: 'API示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
