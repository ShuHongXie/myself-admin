import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'

import { router } from './router'

const app = createApp(App)
app.use(router)

app.mount('#app')
