import type { Config } from './types'

export const config: Config = {
  theme: {
    colorDestructive: 'hsl(348 100% 61%)',
    colorPrimary: 'hsl(212 100% 45%)',
    colorSuccess: 'hsl(144 57% 58%)',
    colorWarning: 'hsl(42 84% 61%)'
  },
  sidebar: {
    collapse: false
  },
  app: {
    locale: 'zh-CN',
    name: 'Myself Admin'
  },
  transition: {
    progress: true
  }
}
