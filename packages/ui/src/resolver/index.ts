import { kebabCase } from '../utils'

export const MiniloUiResolver = () => {
  console.log('MiniloUiResolver初始化')
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      // 只处理Ms开头的组件
      if (name.startsWith('Ml')) {
        const componentName = kebabCase(name.slice(2))
        return {
          name,
          from: `@minilo/ui/es/${componentName}`,
          sideEffects: `@minilo/ui/theme-chalk/ml-${componentName}`
        }
      }
      return null
    }
  }
}
