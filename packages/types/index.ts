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
