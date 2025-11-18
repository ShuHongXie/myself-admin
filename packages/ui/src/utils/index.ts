import type { App, Component } from 'vue'

// 全局组件库前缀
export const libraryNamePrefix = 'ml'

/**
 * @description 组件注册函数
 * @author xieshuhong
 * @template T
 * @param {T} comp
 * @return {*}
 */
export const withInstall = <T extends Component>(comp: T) => {
  ;(comp as Record<string, unknown>).install = (app: App) => {
    const compName = comp.name
    if (!compName) return
    app.component(compName, comp)
  }
  return comp
}

/**
 * BEM命名规范工具函数
 * @param {string} block - 必选，块名（如'button'）
 * @param {string|undefined} element - 可选，元素名（如'icon'）
 * @param {string|string[]|undefined} modifier - 可选，修饰符（如'primary'或['large', 'disabled']）
 * @returns {string} 生成的class字符串
 */
export function bem(block = '', element = '', modifier = '') {
  // 校验block必填
  if (!block || typeof block !== 'string') {
    console.error('BEM: block必须是字符串且不能为空')
    return ''
  }

  let base = `${libraryNamePrefix}-${block}`
  if (element && typeof element === 'string') {
    base += `__${element}`
  }

  if (!modifier) {
    return base // 无修饰符，直接返回基础class
  }

  const modifiers = Array.isArray(modifier) ? modifier : [modifier]
  const validModifiers = modifiers.filter((m) => typeof m === 'string' && m.trim() !== '')

  if (validModifiers.length === 0) {
    return base
  }

  return validModifiers.map((mod) => `${base}--${mod}`).join(' ')
}
