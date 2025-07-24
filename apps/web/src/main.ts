import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './assets/scss/global.scss'

import { router } from './router'

const app = createApp(App)
app.use(router)

app.mount('#app')
