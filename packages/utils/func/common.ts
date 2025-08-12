import type { MenuDataItem, BreadcrumbItem } from '@myself/types'

/**
 * @description 判断url是否是http或https
 * @author xieshuhong
 * @export
 * @param {string} url
 * @return {*}
 */
export function isHttp(url: string) {
  const regex = /^https?:\/\//i
  return regex.test(url)
}

/**
 * @description 递归查找当前path对应的所有层级路由，为面包屑提供数据
 * @author xieshuhong
 * @export
 * @param {MenuDataItem[]} menuList
 * @param {string} targetPath
 * @param {BreadcrumbItem[]} [parentPaths=[]]
 * @return {*}  {BreadcrumbItem[]}
 */
export function findLevelRoutes(
  menuList: MenuDataItem[],
  targetPath: string,
  parentPaths: BreadcrumbItem[] = []
): BreadcrumbItem[] {
  for (const item of menuList) {
    // 当前项的完整路径（父级路径 + 当前path）
    const currentPaths = [
      ...parentPaths,
      {
        path: item.path,
        name: item.name
      }
    ]

    // 找到目标路径，返回完整层级
    if (item.path === targetPath) {
      return currentPaths
    }

    // 有子菜单则递归查找
    if (item.children && item.children.length) {
      const result = findLevelRoutes(item.children, targetPath, currentPaths)
      if (result.length) return result
    }
  }
  return [] // 未找到
}

/**
 * @description 查找菜单栏中当前path对应的菜单项
 * @author xieshuhong
 * @export
 * @param {MenuDataItem[]} items
 * @param {string} targetPath
 * @return {*}  {(MenuDataItem | null)}
 */
export function findMenuItem(items: MenuDataItem[], targetPath: string): MenuDataItem | null {
  for (const item of items) {
    if (item.path === targetPath) return item
    if (item.children) {
      const found = findMenuItem(item.children, targetPath)
      if (found) return found
    }
  }
  return null
}
