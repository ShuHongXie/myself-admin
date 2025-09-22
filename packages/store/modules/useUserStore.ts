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
    const buttonPermissions = ref<string[]>([])
    const tokenInfo = ref<TokenInfo>(null)

    // 设置用户信息
    const setUserInfo = (data: Partial<UserInfo>) => {
      userInfo.value = data
    }
    // 设置权限列表
    const setPermissionList = (data: any) => {
      permissionList.value = data
    }
    // 设置按钮权限列表
    const setButtonPermissions = (data: string[]) => {
      buttonPermissions.value = data
    }
    // 设置token信息
    const setTokenInfo = (data: Partial<TokenInfo>) => {
      tokenInfo.value = data
    }
    // 检查是否具有按钮权限
    const hasButtonPermission = (permission: string): boolean => {
      return buttonPermissions.value.includes(permission)
    }

    return {
      userInfo,
      permissionList,
      buttonPermissions,
      tokenInfo,
      setTokenInfo,
      setUserInfo,
      setPermissionList,
      setButtonPermissions,
      hasButtonPermission
    }
  },
  {
    persist: true
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
