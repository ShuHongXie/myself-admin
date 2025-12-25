import { mount, type MountingOptions } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import type { Component } from 'vue'

/**
 * 使用真实的 Element Plus 组件进行挂载
 */
export function realMount<T extends Component>(component: T, options: MountingOptions<T> = {}) {
  return mount(component, {
    ...options,
    // 挂载到真实的 DOM 元素
    attachTo: document.body,
    global: {
      // 安装 Element Plus 插件
      plugins: [ElementPlus],
      // 提供必要的上下文
      provide: {
        // Element Plus 配置
        $ELEMENT: {
          size: 'default',
          zIndex: 2000
        },
        // 国际化配置（如果需要）
        $ElConfig: {},
        // 覆盖 options 中的 provide
        ...options.global?.provide
      },
      // 禁用所有 stubs，使用真实组件
      stubs: false,
      // 禁用 mixins
      mixins: [],
      // 禁用全局组件（除非特别需要）
      components: {},
      // 禁用全局指令
      directives: {},
      // 禁用 mocks
      mocks: {},
      // 合并其他配置
      ...options.global
    }
  })
}

/**
 * 专门用于测试 slot 的真实挂载
 */
export function realMountWithSlots<T extends Component>(
  component: T,
  slots: Record<string, any>,
  options: Omit<MountingOptions<T>, 'slots'> = {}
) {
  return realMount(component, {
    ...options,
    slots
  })
}

/**
 * 等待所有异步操作完成
 */
export async function waitForRender(wrapper: any, delay = 0) {
  // 等待 Vue 更新
  await wrapper.vm.$nextTick()
  // 等待可能的 DOM 更新
  await new Promise((resolve) => setTimeout(resolve, delay))
  return wrapper
}
