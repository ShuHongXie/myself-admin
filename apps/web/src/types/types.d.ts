declare global {
  interface Window {
    // 全局配置对象
    __APP_CONFIG__?: AppConfig
    // 全局错误处理器
    __ERROR_HANDLER__?: (error: Error) => void
  }

  // 菜单项类型
  interface MenuItem {
    id: number | string
    name: string
    path: string
    component?: string
    permission?: string
    parentId: number | null
    menuType: number
    status: number
    title?: string
    meta: {
      icon: string
      orderNum: number | string
      title?: string
      isCache: number
      showInMenu: number
      showInBreadcrumb: number
      showInTab?: number
    }
    children?: MenuItem[]
  }

  // 菜单表单数据类型（用于菜单编辑表单）
  interface MenuFormData extends MenuItem {
    id?: number | string
  }

  // 用户信息类型
  interface UserInfo {
    id?: number
    username?: string
    avatar?: string
    email?: string
    roles?: string[]
    permissions?: string[]
    [key: string]: any
  }
}

export {}
