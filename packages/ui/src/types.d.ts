// 导出所有组件类型
export * from './components'
export * from './core'

// 样式模块声明
declare module '@myself/ui/styles' {
  const content: any
  export default content
}
