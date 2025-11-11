import type { MenuDataItem, BreadcrumbItem, OptionItem } from '@myself/types'

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

/**
 * @description 将options数组转换为对象，渲染
 * @author xieshuhong
 * @export
 * @param {OptionItem[]} options 数据源
 * @param {false} inverse 是否反向转换
 * @return {*}  {(Record<string | number, string>)}
 */
export function transOptionsToObject(
  options: OptionItem[],
  inverse?: false
): Record<string | number, string> {
  const obj: Record<string | number, string> = {}
  options.forEach((item) => {
    if (!inverse) {
      obj[item.value] = item.label
    } else {
      obj[item.label] = item.value
    }
  })
  return obj
}

/**
 * @description 根据多层级键路径从对象中获取值
 * @author xieshuhong
 * @param {Object} obj - 要查询的对象
 * @param {string} path - 键路径，如 'a.b' 或 'a.b.c'
 * @param {any} [defaultValue] - 可选，路径不存在时返回的默认值
 * @returns {any} 路径对应的 value 或 defaultValue
 */
export function getNestedValue(obj: any, path: string, defaultValue?: any) {
  // 处理边界情况：如果obj不是对象或path为空，直接返回默认值
  if (typeof obj !== 'object' || obj === null || !path) {
    return defaultValue
  }

  // 将路径按 '.' 分割成数组（支持处理空字符串和连续点的情况）
  const keys = path.split('.').filter((key) => key !== '')

  // 逐层访问对象属性
  return keys.reduce((current, key) => {
    // 如果当前值不是对象，直接返回默认值（避免访问非对象的属性）
    if (typeof current !== 'object' || current === null) {
      return defaultValue
    }
    // 访问下一级属性
    return current[key] !== undefined ? current[key] : defaultValue
  }, obj)
}

/**
 * @description 将驼峰命名法转换为连字符命名法
 * @author xieshuhong
 * @export
 * @param {string} key
 * @return {*}
 */
export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}
