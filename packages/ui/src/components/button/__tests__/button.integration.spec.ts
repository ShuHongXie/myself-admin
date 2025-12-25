import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick, defineComponent, h } from 'vue'
import MlButton from '../index.vue'

/**
 * MlButton 组件集成测试 - 直接渲染组件
 */
describe('MlButton 组件集成测试', () => {
  const createWrapper = (props = {}) => {
    return mount(
      defineComponent({
        setup: () => () => h(MlButton, props)
      }),
      {
        global: {
          stubs: {
            ElButton: true,
            ElTooltip: true
          }
        }
      }
    )
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Props 验证', () => {
    it('应该正常挂载', () => {
      const wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('应该接受 time props', () => {
      const wrapper = createWrapper({ time: 500 })
      expect((wrapper.props() as any)['time']).toBe(500)
    })

    it('应该接受 isDebounce props', () => {
      const wrapper = createWrapper({ isDebounce: false })
      expect((wrapper.props() as any)['isDebounce']).toBe(false)
    })

    it('应该接受 tip props', () => {
      const wrapper = createWrapper({ tip: '提示文本' })
      expect((wrapper.props() as any)['tip']).toBe('提示文本')
    })

    it('应该接受 placement props', () => {
      const wrapper = createWrapper({ placement: 'bottom' })
      expect((wrapper.props() as any)['placement']).toBe('bottom')
    })
  })

  describe('防抖功能', () => {
    it('非防抖模式：每次点击都触发', () => {
      const wrapper = createWrapper({ isDebounce: false })
      const handleClick = (wrapper.vm as any).handleClick

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(1)

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(2)
    })

    it('防抖模式：快速点击被拦截', () => {
      const wrapper = createWrapper({ isDebounce: true, time: 1000 })
      const handleClick = (wrapper.vm as any).handleClick

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(1)

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(1)

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(1)
    })

    it('防抖模式：足够时间后生效', () => {
      const wrapper = createWrapper({ isDebounce: true, time: 1000 })
      const handleClick = (wrapper.vm as any).handleClick
      const record = (wrapper.vm as any).record

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(1)

      record.value = Date.now() - 1001
      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(2)
    })

    it('防抖模式：自定义时间生效', () => {
      const wrapper = createWrapper({ isDebounce: true, time: 500 })
      const handleClick = (wrapper.vm as any).handleClick
      const record = (wrapper.vm as any).record

      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(1)

      record.value = Date.now() - 501
      handleClick()
      expect(wrapper.emitted('click')?.length).toBe(2)
    })
  })

  describe('响应式变化', () => {
    it('time props 变化应响应', async () => {
      const time = ref(1000)
      const wrapper = mount(
        defineComponent({
          setup: () => () => h(MlButton, { time: time.value })
        }),
        {
          global: {
            stubs: {
              ElButton: true,
              ElTooltip: true
            }
          }
        }
      )

      expect((wrapper.props() as any)['time']).toBe(1000)
      time.value = 500
      await nextTick()
      expect((wrapper.props() as any)['time']).toBe(500)
    })
  })

  describe('内部状态', () => {
    it('handleClick 方法应存在', () => {
      const wrapper = createWrapper()
      expect((wrapper.vm as any).handleClick).toBeDefined()
      expect(typeof (wrapper.vm as any).handleClick).toBe('function')
    })

    it('record 响应式变量应存在', () => {
      const wrapper = createWrapper()
      expect((wrapper.vm as any).record).toBeDefined()
      expect((wrapper.vm as any).record.value).toBe(0)
    })
  })
})
