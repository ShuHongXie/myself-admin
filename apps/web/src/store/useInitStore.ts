import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { getRouters } from '#/apis/sdk.gen'
import { router } from '#/router'

export const useInitStore = defineStore(
  'init',
  () => {
    const routers = ref<any[]>([]) // 路由信息

    const loadRouters = async () => {
      try {
        const res = await getRouters()
        routers.value = res.data
        // routers.value = [
        //   {
        //     component: 'Layout',
        //     name: 'Layout',
        //     path: '/',
        //     meta: {},
        //     children: res.data
        //   }
        // ]
      } catch (error) {
        console.error('加载路由失败:', error)
        throw error
      }
    }

    return { routers, loadRouters }
  },
  {
    persist: true
  }
)
