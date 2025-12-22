import { useUserStore } from '../modules/useUserStore'

/**
 * 权限相关的组合式API
 */
export function usePermission() {
  const userStore = useUserStore()

  /**
   * 检查是否具有指定的权限
   * @param permission 权限标识，如 'user:create', 'user:delete' 等
   * @returns 是否具有该权限
   */
  const hasPermission = (permission: string): boolean => {
    return userStore.permissionList.includes(permission)
  }

  /**
   * 检查是否具有多个权限中的任意一个
   * @param permissionList 权限标识数组
   * @returns 是否具有其中任一权限
   */
  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some((permission) => hasPermission(permission))
  }

  /**
   * 检查是否具有所有指定的权限
   * @param permissionList 权限标识数组
   * @returns 是否具有所有权限
   */
  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every((permission) => hasPermission(permission))
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  }
}
