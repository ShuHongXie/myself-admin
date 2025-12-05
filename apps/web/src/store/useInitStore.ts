import { defineStore } from '@minilo/store'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { getRouters } from '#/apis/sdk.gen'

export const useInitStore = defineStore(
  'init',
  () => {
    const routers = ref<any[]>([]) // 路由信息

    const loadRouters = async () => {
      try {
        const res = await getRouters()
        routers.value = res.data as RouteRecordRaw[]
      } catch (error) {
        console.error('加载路由失败:', error)
        throw error
      }
    }

    // 重置路由数据
    const resetRouters = () => {
      routers.value = []
    }

    return { routers, loadRouters, resetRouters }
  },
  {
    persist: true
  }
)
