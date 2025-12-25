import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ===== jsdom 环境兼容 mock =====

// 模拟 ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// 模拟 MutationObserver
if (!global.MutationObserver) {
  global.MutationObserver = class MutationObserver {
    observe() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  } as any
}

// 模拟 IntersectionObserver
if (!global.IntersectionObserver) {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
}

// 模拟 getComputedStyle
if (!window.getComputedStyle) {
  window.getComputedStyle = () =>
    ({
      getPropertyValue: () => ''
    }) as unknown as CSSStyleDeclaration
}

// 模拟 matchMedia
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }) as MediaQueryList
}

// 模拟 Element.prototype.getBoundingClientRect
if (!Element.prototype.getBoundingClientRect) {
  Element.prototype.getBoundingClientRect = function () {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect
  }
}

// 模拟 scrollTo
window.scrollTo = () => {}

// ===== Element Plus 配置 =====

// 全局注册 Element Plus 插件
;(config.global.plugins as any[]).push([ElementPlus])

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  config.global.components[key] = component
}

// 模拟全局属性
config.global.mocks = {
  $t: (key: string) => key
}
