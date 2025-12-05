import { createPinia } from './index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

/**
 * @description: 初始化状态管理持久化存储
 * @param {App} app
 * @return {*}
 * @Author: xieshuhong
 */
export const initPersistStores = (app: App) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
