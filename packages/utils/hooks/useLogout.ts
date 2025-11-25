import { useRouter } from 'vue-router'
import { useUserStore, useRoutesStore, useConfigStore } from '@minilo/store'
import { ElMessageBox, ElMessage } from 'element-plus'
import { LOGIN_PATH } from '../constrant'

/**
 * 登出功能 Hook
 * @param getInitStore - 可选，获取 initStore 的函数
 */
export const useLogout = (getInitStore?: () => any) => {
  const router = useRouter()
  const userStore = useUserStore()
  const routesStore = useRoutesStore()
  const configStore = useConfigStore()

  /**
   * 执行登出操作
   * @param showConfirm 是否显示确认对话框，默认为 true
   */
  const logout = async (showConfirm = true) => {
    if (showConfirm) {
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch {
        // 用户取消登出
        return
      }
    }

    try {
      userStore.logout()
      routesStore.resetRoutes()
      configStore.resetConfig()
      if (getInitStore) {
        const initStore = getInitStore()
        initStore.resetRouters()
      }
      ElMessage.success('退出登录成功')
      router.replace({
        path: LOGIN_PATH,
        query: {
          redirect: encodeURIComponent(router.currentRoute.value.fullPath)
        }
      })
    } catch (error) {
      console.error('登出失败:', error)
      ElMessage.error('退出登录失败')
    }
  }

  return {
    logout
  }
}
