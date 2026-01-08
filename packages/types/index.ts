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

/**
 * 图表实例通用接口，支持 ECharts、Chart.js 等主流图表库
 */
export interface ChartInstance {
  resize(): void
  dispose?(): void
  setOption?(option: any, notMerge?: boolean, lazyUpdate?: boolean): void
  on?(event: string, handler: Function): void
  off?(event: string, handler?: Function): void
  getWidth?(): number
  getHeight?(): number
  getOption?(): any
  clear?(): void
  showLoading?(opts?: any): void
  hideLoading?(): void
}
