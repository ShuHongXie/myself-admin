export interface MenuDataItem {
  path: string
  name: string
  icon?: string
  showInBreadcrumb?: boolean
  showInTab?: boolean
  showInMenu?: boolean
  children: MenuDataItem[]
}

export interface BreadcrumbItem {
  name?: string
  path?: string
}

export interface TabItem {
  name?: string
  path?: string
  fixed?: boolean
  icon?: string
  fullPath?: string
  query?: {
    [key: string]: any
  }
}

export interface OptionItem {
  label: string
  value: any
}

/**
 * 按钮权限响应类型
 */
export interface ButtonPermissionsResponse {
  code: number
  msg: string
  data: string[]
}
