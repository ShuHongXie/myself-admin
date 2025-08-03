import { router } from './router'
import { createApp } from 'vue'
import App from './App.vue'
import NProgress from 'nprogress'
import 'virtual:svg-icons-register'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import './assets/scss/global.scss'
import '@myself/ui/styles'

export const init = () => {
  NProgress.configure({ showSpinner: false })
  const app = createApp(App)
  app.use(router)

  app.mount('#app')
}
