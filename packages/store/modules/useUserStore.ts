import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  [key: string]: any
  avatar?: string
  username?: string
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
    const token = ref('')

    // 设置用户信息
    const setUserInfo = (data: Partial<UserInfo>) => {
      userInfo.value = data
    }
    // 设置权限列表
    const setPermissionList = (data: any) => {
      permissionList.value = data
    }
    // 设置token信息
    const setToken = (data: string) => {
      token.value = data
    }
    // 检查是否具有权限
    const hasPermission = (permission: string): boolean => {
      return permissionList.value.includes(permission)
    }

    // 登出 - 清除所有用户信息
    const logout = () => {
      userInfo.value = {}
      permissionList.value = []
      token.value = ''
    }

    return {
      userInfo,
      permissionList,
      token,
      setToken,
      setUserInfo,
      setPermissionList,
      hasPermission,
      logout
    }
  },
  {
    persist: true
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
