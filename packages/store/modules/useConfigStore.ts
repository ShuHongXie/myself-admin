import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description: 全局数据配置
 * @return {*}
 * @Author: xieshuhong
 */
export const useConfigStore = defineStore('config', () => {
  const menuData = ref<any[]>([]) // 动态路由

  const setMenuData = (data: any[]) => {
    menuData.value = data
  }

  return {
    menuData,
    setMenuData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
}
