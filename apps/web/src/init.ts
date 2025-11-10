import { router } from './router'
import { createApp, watchEffect } from 'vue'
import { initI18n } from '@myself/locales'
import { initPersistStores } from '@myself/store/init'
import { useTitle } from '@myself/utils'
import { ElLoading } from 'element-plus'

import App from './App.vue'
import NProgress from 'nprogress'

import 'virtual:svg-icons-register'
import 'nprogress/nprogress.css'
import './assets/scss/global.scss'
import '@myself/ui/styles'
import 'element-plus/dist/index.css'
import initOpenApiInstance from '#/config/axios'
import Myself from '@myself/ui'

export const init = async () => {
  NProgress.configure({ showSpinner: false })
  const app = createApp(App)
  // axios实例注册
  initOpenApiInstance({
    baseURL: import.meta.env.VITE_BASE_URL
  })
  app.directive('loading', ElLoading.directive)
  // 路由注册
  app.use(router)
  // 状态管理注册
  initPersistStores(app)
  // 国际化注册
  await initI18n(app)

  app.use(Myself)

  // 动态标题
  const title = useTitle()
  watchEffect(() => {
    const pageTitle = router.currentRoute.value.meta.title as string
    title.value = pageTitle
  })

  app.mount('#app')
}
