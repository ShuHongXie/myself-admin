import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const getDeepRouterName = (router: RouteRecordRaw[], List: string[] = []) => {
  router.forEach((item) => {
    if (item.children) {
      getDeepRouterName(item.children, List)
    } else {
      List.push(item.name as string)
    }
  })
  return List
}
/**
 * @description: 应用路由状态管理
 * @return {*}
 * @Author: xieshuhong
 */
export const useRoutesStore = defineStore(
  'routes',
  () => {
    const dynamicRoutes = ref<RouteRecordRaw[]>([]) // 动态路由
    const staticRoutes = ref<RouteRecordRaw[]>([]) // 静态路由
    const accessStaticRouteList = computed<string[]>(() => {
      let list = []
      list = getDeepRouterName(unref(staticRoutes) as RouteRecordRaw[], list)
      return list
    }) // 默认可访问的路由名称列表

    const isRouterInitialized = ref(false) // 是否初始化

    // 设置设置静态路由
    const setDynamicRoutes = (data: RouteRecordRaw[]) => {
      dynamicRoutes.value = data
    }
    // 设置设置静态路由
    const setStaticRoutes = (data: RouteRecordRaw[]) => {
      staticRoutes.value = data
    }

    const setRouterInitialized = (data: boolean) => {
      isRouterInitialized.value = data
    }

    return {
      setDynamicRoutes,
      setStaticRoutes,
      setRouterInitialized,
      dynamicRoutes,
      staticRoutes,
      accessStaticRouteList,
      isRouterInitialized
    }
  },
  {
    persist: {
      pick: ['dynamicRoutes', 'mergeRoutes']
    }
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoutesStore, import.meta.hot))
}
