import { router } from './router'
import { createApp } from 'vue'
import App from './App.vue'
import NProgress from 'nprogress'
import 'virtual:svg-icons-register'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import './assets/scss/global.scss'
import '@myself/ui/styles'
import { initI18n } from '@myself/locales'

export const init = () => {
  NProgress.configure({ showSpinner: false })
  const app = createApp(App)
  // 路由注册
  app.use(router)
  // 国际化注册
  initI18n(app)

  app.mount('#app')
}
