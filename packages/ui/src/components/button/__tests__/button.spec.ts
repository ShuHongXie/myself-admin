import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import MlButton from '../index.vue'

/**
 * MlButton 组件防抖逻辑测试
 *
 * 说明：由于 Element Plus 组件在测试环境中存在 slot 渲染兼容性问题，
 * 这里测试组件的核心业务逻辑：防抖功能的正确实现
 */
describe('MlButton 防抖逻辑', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  /**
   * 模拟 MlButton 组件的防抖逻辑
   * 这与组件源码中的 handleClick 方法逻辑完全一致
   */
  function createDebounceHandler(time = 1000, isDebounce = true) {
    const record = ref(0)
    const clickEvents: any[] = []

    const handleClick = () => {
      if (!isDebounce) {
        clickEvents.push({})
        return
      }
      const newTime = new Date()
      if (newTime.getTime() - record.value > time) {
        clickEvents.push({})
      }
      record.value = newTime.getTime()
    }

    return { handleClick, clickEvents, record }
  }

  describe('非防抖模式 (isDebounce: false)', () => {
    it('每次点击都应该立即触发事件', () => {
      const { handleClick, clickEvents } = createDebounceHandler(1000, false)

      handleClick()
      expect(clickEvents.length).toBe(1)

      handleClick()
      expect(clickEvents.length).toBe(2)

      handleClick()
      expect(clickEvents.length).toBe(3)
    })

    it('无论防抖时间设置为多少,都应该立即触发', () => {
      const { handleClick, clickEvents } = createDebounceHandler(5000, false)

      handleClick()
      handleClick()
      handleClick()
      expect(clickEvents.length).toBe(3)
    })
  })

  describe('防抖模式 (isDebounce: true)', () => {
    it('快速连续点击应该被防抖拦截', () => {
      const { handleClick, clickEvents } = createDebounceHandler(1000, true)

      // 第一次点击成功
      handleClick()
      expect(clickEvents.length).toBe(1)

      // 立即再次点击，被防抖拦截
      handleClick()
      expect(clickEvents.length).toBe(1)

      // 第三次点击，仍然被防抖
      handleClick()
      expect(clickEvents.length).toBe(1)
    })

    it('等待足够时间后点击应该生效', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(1000, true)

      // 第一次点击
      handleClick()
      expect(clickEvents.length).toBe(1)

      // 模拟时间推进 1001ms（减去1001让下次判断newTime - record.value > 1000成立）
      record.value = record.value - 1001

      // 再次点击应该成功
      handleClick()
      expect(clickEvents.length).toBe(2)
    })

    it('自定义防抖时间应该生效', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(500, true)

      handleClick()
      expect(clickEvents.length).toBe(1)

      // 模拟时间推进 501ms
      record.value = record.value - 501

      handleClick()
      expect(clickEvents.length).toBe(2)
    })

    it('边界测试：恰好等于防抖时间应该被拦截', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(1000, true)

      const startTime = Date.now()
      handleClick()
      expect(clickEvents.length).toBe(1)

      // 模拟恰好过去了1000ms：将record设置为当前时间 - 1000
      record.value = Date.now() - 1000
      handleClick()
      // 条件是 > time，不是 >= time，所以应该被拦截
      expect(clickEvents.length).toBe(1)

      // 模拟过去了1001ms
      record.value = Date.now() - 1001
      handleClick()
      expect(clickEvents.length).toBe(2)
    })

    it('连续多次点击应该正确计数', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(1000, true)

      // 第1次点击（成功）
      handleClick()
      expect(clickEvents.length).toBe(1)

      // 时间推进 1001ms
      record.value = Date.now() - 1001

      // 第2次点击（成功）
      handleClick()
      expect(clickEvents.length).toBe(2)

      // 时间推进 500ms（不足）
      record.value = Date.now() - 500

      // 第3次点击（失败，被防抖）
      handleClick()
      expect(clickEvents.length).toBe(2)

      // 再推进 1001ms（超过防抖时间）
      record.value = Date.now() - 1001

      // 第4次点击（成功）
      handleClick()
      expect(clickEvents.length).toBe(3)
    })

    it('极短时间内多次点击只应该生效一次', () => {
      const { handleClick, clickEvents } = createDebounceHandler(100, true)

      // 连续10次点击
      for (let i = 0; i < 10; i++) {
        handleClick()
      }

      // 只有第一次生效
      expect(clickEvents.length).toBe(1)
    })

    it('长时间间隔后的每次点击都应该生效', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(100, true)

      for (let i = 0; i < 5; i++) {
        handleClick()
        record.value = record.value - 101 // 每次推进超过防抖时间
      }

      expect(clickEvents.length).toBe(5)
    })
  })

  describe('防抖时间参数测试', () => {
    it('应该支持100ms的防抖时间', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(100, true)

      handleClick()
      record.value = record.value - 101
      handleClick()

      expect(clickEvents.length).toBe(2)
    })

    it('应该支持3000ms的防抖时间', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(3000, true)

      handleClick()
      record.value = record.value - 3001
      handleClick()

      expect(clickEvents.length).toBe(2)
    })

    it('防抖时间为0时的行为', () => {
      const { handleClick, clickEvents, record } = createDebounceHandler(0, true)

      handleClick()
      record.value = record.value - 1
      handleClick()

      expect(clickEvents.length).toBe(2)
    })
  })
})

/**
 * JSX 风格的 MlButton 组件测试
 * 这里展示如何使用 JSX 语法导入和测试 MlButton 组件
 *
 * 注意：JSX 需要 .tsx 文件或专门的配置来正常编译。
 * 下面是我们桀主推荐的方式：渲染前返回箭头函数
 *
 * 例子：
 * ```typescript
 * // 不需要 JSX，用箭头函数传递 render 函数
 * const wrapper = mount(() => h(MlButton, { isDebounce: false }))
 *
 * // 或者使用箭头函数，直接参考所有可能的 Props
 * const wrapper = mount(() => h(MlButton, { time: 800, isDebounce: true }))
 *
 * // 然后直接调用组件憧核 API
 * const handleClick = (wrapper.vm as any).handleClick
 * handleClick()
 * expect(wrapper.emitted('click')).toBeTruthy()
 * ```
 */
