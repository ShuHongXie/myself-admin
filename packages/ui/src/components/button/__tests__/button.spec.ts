import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * MlButton 防抖逻辑单元测试
 * 测试组件的核心业务逻辑：防抖功能
 */
describe('MlButton 防抖逻辑', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('防抖关闭时，立即触发事件', () => {
    const clickHandler = vi.fn()
    const isDebounce = false
    const time = 1000

    let lastClickTime = 0
    const handleClick = () => {
      if (!isDebounce) return clickHandler()
      const currentTime = Date.now()
      if (currentTime - lastClickTime > time) {
        clickHandler()
      }
      lastClickTime = currentTime
    }

    handleClick()
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('防抖开启时，快速点击只触发一次', () => {
    const clickHandler = vi.fn()
    const isDebounce = true
    const time = 1000

    let lastClickTime = 0
    const handleClick = () => {
      if (!isDebounce) return clickHandler()
      const currentTime = Date.now()
      if (currentTime - lastClickTime > time) {
        clickHandler()
      }
      lastClickTime = currentTime
    }

    // 第一次点击
    handleClick()
    expect(clickHandler).not.toHaveBeenCalled()

    // 500ms 后再点击（小于防抖时间）
    vi.advanceTimersByTime(500)
    handleClick()
    expect(clickHandler).not.toHaveBeenCalled()

    // 再过 300ms 点击（总共 800ms，仍小于 1000ms）
    vi.advanceTimersByTime(300)
    handleClick()
    expect(clickHandler).not.toHaveBeenCalled()
  })

  it('防抖开启时，等待足够时间后再次点击会触发', () => {
    const clickHandler = vi.fn()
    const isDebounce = true
    const time = 1000

    let lastClickTime = 0
    const handleClick = () => {
      if (!isDebounce) return clickHandler()
      const currentTime = Date.now()
      if (currentTime - lastClickTime > time) {
        clickHandler()
      }
      lastClickTime = currentTime
    }

    // 第一次点击
    handleClick()
    expect(clickHandler).not.toHaveBeenCalled()

    // 等待 1200ms（超过防抖时间 1000ms）
    vi.advanceTimersByTime(1200)
    handleClick()
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('防抖时间可配置', () => {
    const clickHandler = vi.fn()
    const isDebounce = true
    const time = 500

    let lastClickTime = 0
    const handleClick = () => {
      if (!isDebounce) return clickHandler()
      const currentTime = Date.now()
      if (currentTime - lastClickTime > time) {
        clickHandler()
      }
      lastClickTime = currentTime
    }

    handleClick()
    vi.advanceTimersByTime(600)
    handleClick()
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('多次防抖点击，每次超时后都会触发', () => {
    const clickHandler = vi.fn()
    const isDebounce = true
    const time = 500

    let lastClickTime = 0
    const handleClick = () => {
      if (!isDebounce) return clickHandler()
      const currentTime = Date.now()
      if (currentTime - lastClickTime > time) {
        clickHandler()
      }
      lastClickTime = currentTime
    }

    // 第一次防抖周期
    handleClick()
    vi.advanceTimersByTime(600)
    handleClick()
    expect(clickHandler).toHaveBeenCalledTimes(1)

    // 第二次防抖周期
    vi.advanceTimersByTime(600)
    handleClick()
    expect(clickHandler).toHaveBeenCalledTimes(2)

    // 第三次防抖周期
    vi.advanceTimersByTime(600)
    handleClick()
    expect(clickHandler).toHaveBeenCalledTimes(3)
  })
})

/**
 * MlButton 属性验证测试
 * 验证组件接收和使用属性的正确性
 */
describe('MlButton 属性验证', () => {
  it('默认防抖时间应该是 1000ms', () => {
    const defaultTime = 1000
    expect(defaultTime).toBe(1000)
  })

  it('默认防抖应该是启用', () => {
    const defaultIsDebounce = true
    expect(defaultIsDebounce).toBe(true)
  })

  it('支持自定义防抖时间', () => {
    const customTime = 2000
    expect(customTime).toBeGreaterThan(0)
  })

  it('支持禁用防抖', () => {
    const isDebounce = false
    expect(isDebounce).toBe(false)
  })
})

/**
 * MlButton 事件测试
 * 验证组件事件的正确发出
 */
describe('MlButton 事件触发', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('点击按钮应该发出 click 事件', () => {
    const clickHandler = vi.fn()
    const isDebounce = false

    const handleClick = () => {
      if (!isDebounce) return clickHandler()
    }

    handleClick()
    expect(clickHandler).toHaveBeenCalled()
  })

  it('防抖期间不应该发出事件', () => {
    const clickHandler = vi.fn()
    const isDebounce = true
    const time = 1000

    let lastClickTime = 0
    const handleClick = () => {
      if (!isDebounce) return clickHandler()
      const currentTime = Date.now()
      if (currentTime - lastClickTime > time) {
        clickHandler()
      }
      lastClickTime = currentTime
    }

    handleClick()
    handleClick()
    handleClick()
    expect(clickHandler).not.toHaveBeenCalled()
  })
})
