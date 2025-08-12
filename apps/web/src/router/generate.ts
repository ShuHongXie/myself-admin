import type { RouteMeta } from 'vue-router'
import { cloneDeep } from '@myself/utils'
import { data as routerData } from './routerData'
import Layout from '#/@core/Layout.vue'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('../views/**/*.vue')

export const generateRoutes = () => {
  let data = cloneDeep(routerData)
  let menuData = [] as any
  menuData = generateMenus(data, menuData).sort((a: any, b: any) => (a?.no ?? 999) - (b?.no ?? 999))
  data = formatRoutes(data)
  return {
    menuData,
    dynamicRoutes: data
  }
}

export const formatRoutes = (routes: any[]) => {
  routes.forEach((item) => {
    if ((item.component as any) === 'Layout') {
      item.component = Layout
    } else {
      item.component = modules[`../views${item.path}.vue`]
    }
    if (item.children) {
      formatRoutes(item.children)
    }
  })
  return routes
}

/**
 * 根据路由配置生成菜单数据
 * @param routes - 路由配置数组，类型为 RouteRecordRaw
 * @returns 返回符合菜单配置的数据数组
 */
export const generateMenus = (routes: any[], menuData: any = []) => {
  // 遍历路由配置数组
  routes.forEach((item: any) => {
    const { path, redirect, name: routeName, meta = {} as RouteMeta } = item
    const {
      link = '',
      title,
      icon,
      showInBreadcrumb = true,
      showInTab = true,
      showInMenu = true
    } = meta
    const menu = {
      path: link || path || redirect,
      name: title || routeName,
      icon,
      showInBreadcrumb,
      showInTab,
      showInMenu,
      children: []
    }
    if (item.component === 'Layout') {
      if (item.children && item.children.length) {
        generateMenus(item.children, menuData)
      }
    } else {
      if (item.children) {
        menu.children = generateMenus(item.children)
      }
      menuData.push(menu)
    }
  })
  return menuData
}
