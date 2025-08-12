import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

import type { MenuDataItem, TabItem } from '@myself/types'

/**
 * @description: 全局数据配置
 * @return {*}
 * @Author: xieshuhong
 */
export const useConfigStore = defineStore('config', () => {
  const menuData = ref<MenuDataItem[]>([]) // 动态路由
  const tabData = ref<TabItem[]>([]) // 动态路由
  const activeTab = ref<string>('') // 当前激活的tab

  const setMenuData = (data: MenuDataItem[]) => {
    menuData.value = data
  }

  const setTabData = (data: TabItem) => {
    const index = tabData.value.findIndex((item: TabItem) => item.path === data.path)
    if (index !== -1) {
      tabData.value.splice(index, 1, data)
    } else {
      tabData.value.push(data)
    }
  }

  const removeTabData = (index: number) => {
    tabData.value.splice(index, 1)
  }

  const setActiveTab = (path: string) => {
    activeTab.value = path
  }

  return {
    menuData,
    setMenuData,
    tabData,
    setTabData,
    removeTabData,
    activeTab,
    setActiveTab
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
}
