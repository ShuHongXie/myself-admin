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
