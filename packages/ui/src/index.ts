// export * from './components'
import * as components from './components/index'
export * from './components'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    for (const name in components) {
      app.component(name, components[name as keyof typeof components])
    }
  }
}
