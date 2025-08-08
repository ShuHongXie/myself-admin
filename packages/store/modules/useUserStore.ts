import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  [key: string]: any
  avatar?: string
  username?: string
}

interface TokenInfo {
  [key: string]: any
}

/**
 * @description: 用户信息(token)和权限状态管理
 * @return {*}
 * @Author: xieshuhong
 */
export const useUserStore = defineStore(
  'permission',
  () => {
    const userInfo = ref<UserInfo>({})
    const permissionList = ref<string[]>([])
    const tokenInfo = ref<TokenInfo>(null)

    // 设置用户信息
    const setUserInfo = (data: Partial<UserInfo>) => {
      userInfo.value = data
    }
    // 设置权限列表
    const setPermissionList = (data: any) => {
      permissionList.value = data
    }
    // 设置token信息
    const setTokenInfo = (data: Partial<TokenInfo>) => {
      tokenInfo.value = data
    }

    return { userInfo, permissionList, tokenInfo, setTokenInfo, setUserInfo, setPermissionList }
  },
  {
    persist: true
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
