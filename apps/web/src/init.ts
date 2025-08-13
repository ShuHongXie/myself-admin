import { router } from './router'
import { createApp } from 'vue'
import { initI18n } from '@myself/locales'
import { initPersistStores } from '@myself/store/init'

import App from './App.vue'
import NProgress from 'nprogress'
import 'virtual:svg-icons-register'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import './assets/scss/global.scss'
import '@myself/ui/styles'

export const init = async () => {
  NProgress.configure({ showSpinner: false })
  const app = createApp(App)
  // 路由注册
  app.use(router)
  // 状态管理注册
  initPersistStores(app)
  // 国际化注册
  await initI18n(app)

  app.mount('#app')
}
