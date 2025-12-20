import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import * as MiniloUI from '../../../src/components'
import '../../../src/style/index.scss'
import DemoBlock from '../components/DemoBlock.vue'
import './custom.css'

// SSR 环境 polyfill（确保客户端也有定义）
if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'undefined') {
  window.requestAnimationFrame = (cb: any) => setTimeout(cb, 16)
}
if (typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'undefined') {
  window.cancelAnimationFrame = (id: any) => clearTimeout(id)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 Element Plus
    app.use(ElementPlus)

    // 注册 ECharts
    app.config.globalProperties.$echarts = echarts

    // 注册 Minilo UI 组件
    Object.values(MiniloUI).forEach((component: any) => {
      if (component.name) {
        app.component(component.name, component)
      }
    })

    // 注册 Demo 组件
    app.component('DemoBlock', DemoBlock)
  }
}
