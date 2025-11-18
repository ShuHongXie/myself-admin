import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/search.scss'
import * as echarts from 'echarts' // 引入echarts

const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.$echarts = echarts // 全局使用

app.mount('#app')
