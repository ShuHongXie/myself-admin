import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { locales } from '@myself/locales'
import 'element-plus/dist/index.css'

console.log(locales)

createApp(App).mount('#app')
