import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import MlButton from '../index.vue'

describe('MlButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('props', () => {
    it('正确渲染默认属性', () => {
      const wrapper = mount(MlButton, {
        slots: {
          default: 'Button Text'
        }
      })

      expect(wrapper.text()).toContain('Button Text')
      expect(wrapper.props('time')).toBe(1000)
      expect(wrapper.props('tip')).toBe('')
      expect(wrapper.props('isDebounce')).toBe(true)
    })

    it('接受自定义时间属性', () => {
      const wrapper = mount(MlButton, {
        props: {
          time: 2000
        },
        slots: {
          default: 'Button Text'
        }
      })

      expect(wrapper.props('time')).toBe(2000)
    })

    it('接受自定义提示属性', () => {
      const wrapper = mount(MlButton, {
        props: {
          tip: 'Click me'
        },
        slots: {
          default: 'Button Text'
        }
      })

      expect(wrapper.props('tip')).toBe('Click me')
    })

    it('接受防抖开关属性', () => {
      const wrapper = mount(MlButton, {
        props: {
          isDebounce: false
        },
        slots: {
          default: 'Button Text'
        }
      })

      expect(wrapper.props('isDebounce')).toBe(false)
    })
  })

  describe('slots', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(MlButton, {
        slots: {
          default: '<span>Custom Content</span>'
        }
      })

      expect(wrapper.text()).toContain('Custom Content')
    })
  })

  describe('events', () => {
    it('当防抖关闭时触发点击事件', async () => {
      const wrapper = mount(MlButton, {
        props: {
          isDebounce: false
        }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('当开启防抖时，只触发一次点击事件', async () => {
      const wrapper = mount(MlButton, {
        props: {
          time: 1000
        }
      })

      // 快速连续点击多次
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('当点击间隔足够时，多次触发点击事件', async () => {
      const wrapper = mount(MlButton, {
        props: {
          time: 1000
        }
      })

      // 第一次点击
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)

      // 等待超过防抖时间
      vi.advanceTimersByTime(1100)

      // 第二次点击
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
    })

    it('在防抖间隔内多次点击不触发事件', async () => {
      const wrapper = mount(MlButton, {
        props: {
          time: 1000
        }
      })

      // 第一次点击
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)

      // 500ms 后再次点击（仍在防抖时间内）
      vi.advanceTimersByTime(500)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)

      // 再次点击（仍在防抖时间内）
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('tooltip', () => {
    it('当提示属性存在时渲染ElTooltip', () => {
      const wrapper = mount(MlButton, {
        props: {
          tip: 'Click me'
        },
        slots: {
          default: 'Button Text'
        }
      })

      expect(wrapper.findComponent({ name: 'ElTooltip' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'ElButton' }).exists()).toBe(true)
    })

    it('当提示属性为空时不渲染ElTooltip', () => {
      const wrapper = mount(MlButton, {
        props: {
          tip: ''
        },
        slots: {
          default: 'Button Text'
        }
      })

      expect(wrapper.findComponent({ name: 'ElTooltip' }).exists()).toBe(false)
      expect(wrapper.findComponent({ name: 'ElButton' }).exists()).toBe(true)
    })

    it('向ElTooltip传递正确的属性', () => {
      const wrapper = mount(MlButton, {
        props: {
          tip: 'Click me',
          placement: 'bottom'
        },
        slots: {
          default: 'Button Text'
        }
      })

      const tooltip = wrapper.findComponent({ name: 'ElTooltip' })
      expect(tooltip.props('content')).toBe('Click me')
      expect(tooltip.props('placement')).toBe('bottom')
    })
  })

  describe('attributes', () => {
    it('向ElButton传递属性', () => {
      const wrapper = mount(MlButton, {
        attrs: {
          type: 'primary',
          size: 'large'
        },
        slots: {
          default: 'Button Text'
        }
      })

      const button = wrapper.findComponent({ name: 'ElButton' })
      expect(button.attributes('type')).toBe('primary')
      expect(button.attributes('size')).toBe('large')
    })

    it('在启用提示时向ElButton传递属性', () => {
      const wrapper = mount(MlButton, {
        props: {
          tip: 'Click me'
        },
        attrs: {
          type: 'danger',
          size: 'small'
        },
        slots: {
          default: 'Button Text'
        }
      })

      const button = wrapper.findComponent({ name: 'ElButton' })
      expect(button.attributes('type')).toBe('danger')
      expect(button.attributes('size')).toBe('small')
    })
  })
})
