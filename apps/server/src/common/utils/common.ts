import { Menu } from '@modules/menu/entities/menu.entity'

export const convertToTree = (menuList: any[], parentId: number | null = null) => {
  const tree = [] as any

  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].parent_id === parentId) {
      const children = convertToTree(menuList, menuList[i].id)
      if (children.length) {
        menuList[i].children = children
      }
      tree.push(menuList[i])
    }
  }

  return tree
}

export const filterPermissions = (routers: Menu[]): string[] => {
  return [
    ...new Set(
      routers.map((router) => router.permission).filter((permission) => permission != null)
    )
  ]
}

/**
 * @description 判断是否为数字
 * @author xieshuhong
 * @param {*} value
 * @return {*}  {value is number}
 */
export const isValidNumber = (value: any): value is number => {
  // 排除空字符串、null、undefined
  if (value === '' || value === null || value === undefined) {
    return false
  }
  // 转换为数字后验证（字符串数字如 "123" 会被转换）
  const num = Number(value)
  return !isNaN(num) && typeof num === 'number'
}
