/**
 * 全局类型定义文件
 * 此文件包含整个应用程序的全局类型定义
 */

// 应用配置类型
interface AppConfig {
  title: string
  version: string
  apiBaseUrl: string
  enableMock?: boolean
}

// 通用响应类型
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页响应类型
interface PaginationResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// Token信息类型
interface TokenInfo {
  token?: string
  refreshToken?: string
  expires?: number
  [key: string]: any
}

// 路由Meta类型扩展
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    keepAlive?: boolean
    requireAuth?: boolean
    permissions?: string[]
    roles?: string[]
    showInMenu?: boolean
    showInBreadcrumb?: boolean
    showInTab?: boolean
    orderNum?: number
  }
}

// Element Plus 组件实例类型
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // 自定义全局组件类型声明
    ElIcon: (typeof import('element-plus'))['ElIcon']
    SvgIcon: (typeof import('@minilo/ui'))['SvgIcon']
    MsSearchTable: (typeof import('@minilo/ui'))['MsSearchTable']
    Search: (typeof import('@minilo/ui'))['Search']
  }
}

// Vite 环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_BUILD_GZIP: string
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_BUILD_SOURCEMAP: string
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// CSS 模块声明
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// 图片资源声明
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// JSON 文件声明
declare module '*.json' {
  const value: any
  export default value
}

// 第三方库模块声明
declare module 'nprogress' {
  interface NProgress {
    start(): NProgress
    done(force?: boolean): NProgress
    set(n: number): NProgress
    inc(n?: number): NProgress
    configure(options: Partial<NProgressOptions>): NProgress
    status: number | null
    isStarted(): boolean
  }

  interface NProgressOptions {
    minimum: number
    template: string
    easing: string
    speed: number
    trickle: boolean
    trickleRate: number
    trickleSpeed: number
    showSpinner: boolean
    barSelector: string
    spinnerSelector: string
    parent: string
  }

  const nprogress: NProgress
  export default nprogress
}

// 自定义包模块声明
declare module '@minilo/utils' {
  export function cloneDeep<T>(obj: T): T
  export function transOptionsToObject(
    options: Array<{ label: string; value: any }>
  ): Record<string, string>
  // 添加其他工具函数类型声明
}

declare module '@minilo/ui' {
  export const SvgIcon: any
  export const Search: any
  export const MsSearchTable: any
  // 添加其他UI组件类型声明
}

declare module '@minilo/store' {
  export function useUserStore(): any
  export function useRoutesStore(): any
  export function useConfigStore(): any
  // 添加其他store类型声明
}

declare module '@minilo/locales' {
  export const setupI18n: (app: any) => void
  export const t: (key: string) => string
  // 添加其他国际化相关类型声明
}

// Pinia store 类型扩展
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?:
      | boolean
      | {
          key?: string
          storage?: Storage
          paths?: string[]
          beforeRestore?: (ctx: any) => void
          afterRestore?: (ctx: any) => void
        }
  }
}

// 确保文件被视为模块
export {}
