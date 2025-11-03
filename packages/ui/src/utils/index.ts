import type { App, Component } from 'vue'

export const withInstall = <T extends Component>(comp: T) => {
  ;(comp as Record<string, unknown>).install = (app: App) => {
    const compName = comp.name
    if (!compName) return
    app.component(compName, comp)
  }
  return comp
}
