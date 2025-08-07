import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

const usePermissionStore = defineStore(
  'permission',
  () => {
    const userInfo = ref({})
    const permissionList = ref([])

    // 设置用户信息
    const setUserInfo = (data: any) => {
      userInfo.value = data
    }
    // 设置权限列表
    const setPermissionList = (data: any) => {
      permissionList.value = data
    }

    return { userInfo, permissionList, setUserInfo, setPermissionList }
  },
  {
    persist: true
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
