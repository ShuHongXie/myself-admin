import * as components from './components'
export * from './components'
import type { App } from 'vue'

// 导出所有组件
export const MsUIComponentsInstance = Object.values(components)
export const MsUIComponentsName = Object.keys(components)
console.log(MsUIComponentsInstance, MsUIComponentsName)

// 默认导出插件对象
export default {
  install: (app: App) => {
    MsUIComponentsInstance.forEach((component, index) => {
      app.component(MsUIComponentsName[index] as string, component)
    })
  }
}
