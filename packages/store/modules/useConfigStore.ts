import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

import type { MenuDataItem, BreadcrumbItem } from '@myself/types'

/**
 * @description: 全局数据配置
 * @return {*}
 * @Author: xieshuhong
 */
export const useConfigStore = defineStore('config', () => {
  const menuData = ref<MenuDataItem[]>([]) // 动态路由
  const breadcrumbData = ref<BreadcrumbItem[]>([]) // 动态路由

  const setMenuData = (data: any[]) => {
    menuData.value = data
  }

  const setBreadcrumbData = (data: any[]) => {
    breadcrumbData.value = data
  }

  return {
    menuData,
    setMenuData,
    breadcrumbData,
    setBreadcrumbData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
}
