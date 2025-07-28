import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './assets/scss/global.scss'

NProgress.configure({ showSpinner: false })
import { router } from './router'

const app = createApp(App)
app.use(router)

app.mount('#app')
