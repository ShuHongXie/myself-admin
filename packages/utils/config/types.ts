interface InitialOptions {
  namespace: string
  config?: Partial<Config>
}

// 主题配置
interface ThemeConfig {
  colorDestructive?: string
  // 主题色
  colorPrimary?: string
  colorSuccess?: string
  colorWarning?: string
}

// 侧边栏相关配置
interface SidebarConfig {
  // 侧边栏是否折叠
  collapse: boolean
}

// 动画相关配置
interface TransitionConfig {
  // 是否开启页面进度条动画
  progress: boolean
}

// 全局配置
interface AppConfig {
  // 语言
  locale?: string
  // 应用名称
  name?: string
}

// 整体用户偏好配置
interface Config {
  app?: AppConfig
  theme?: ThemeConfig
  sidebar?: SidebarConfig
  transition?: TransitionConfig
}

export type { Config, InitialOptions }
