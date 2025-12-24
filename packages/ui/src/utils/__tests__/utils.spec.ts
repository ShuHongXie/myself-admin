import { describe, it, expect } from 'vitest'
import { bem } from '../index'

describe('Utils 工具函数', () => {
  it('bem 函数应该正常工作', () => {
    expect(bem('button')).toBe('ml-button')
    expect(bem('button', 'icon')).toBe('ml-button__icon')
    expect(bem('button', '', 'primary')).toBe('ml-button--primary')
    expect(bem('button', 'icon', 'large')).toBe('ml-button__icon--large')
  })

  it('bem 函数应该处理多个修饰符', () => {
    const result = bem('button', '', ['primary', 'large'] as any)
    expect(result).toContain('ml-button--primary')
    expect(result).toContain('ml-button--large')
  })

  it('bem 函数应该处理空值', () => {
    expect(bem('button', '', '')).toBe('ml-button')
  })
})
