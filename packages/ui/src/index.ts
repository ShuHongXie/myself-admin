import * as components from './components/index'
export * from './components'
import type { App } from 'vue'

// 导出所有组件
export const MsUIComponents = components

// 默认导出插件对象
export default {
  install: (app: App) => {
    for (const name in components) {
      app.component(name, components[name as keyof typeof components])
    }
  }
}
