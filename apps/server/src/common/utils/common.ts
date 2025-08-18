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
