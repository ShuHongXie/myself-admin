import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from '@myself/utils'
import { data as routerData } from './routerData'
import Layout from '#/@core/Layout.vue'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('../views/**/*.vue')
console.log(modules)

export const generateRoutes = () => {
  let data = cloneDeep(routerData)
  const menuData = [] as any
  data = formatRoutes(data)
  console.log(data)
  return {
    menuData,
    dynamicRoutes: data
  }
}

export const formatRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach((item) => {
    console.log(item)

    if (item.component === 'Layout') {
      item!.component = Layout
    } else {
      item.component = modules[`../views${item.path}.vue`]
    }
    if (item.children) {
      formatRoutes(item.children)
    }
  })
  return routes
}
