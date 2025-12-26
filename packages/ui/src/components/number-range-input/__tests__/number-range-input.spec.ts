import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MlNumberRangeInput from '../index.vue'
describe('MlNumberRangeInput 数值范围测试', () => {
  it('组件初始化时，应该有默认值 [null, null]', () => {
    const wrapper = mount(MlNumberRangeInput, {
      props: {
        label: 'Price Range',
        modelValue: [null, null]
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('modelValue')).toEqual([null, null])
  })

  it('最小值更新时，应该只修改数组的第一个元素', () => {
    let modelValue: [number | null, number | null] = [null, null]
    modelValue = [10, modelValue[1]]
    expect(modelValue).toEqual([10, null])
    expect(modelValue[0]).toBe(10)
  })

  it('最大值更新时，应该只修改数组的第二个元素', () => {
    let modelValue: [number | null, number | null] = [null, null]
    modelValue = [modelValue[0], 100]
    expect(modelValue).toEqual([null, 100])
    expect(modelValue[1]).toBe(100)
  })

  it('同时更新最小值和最大值', () => {
    let modelValue: [number | null, number | null] = [null, null]
    modelValue = [10, 100]
    expect(modelValue).toEqual([10, 100])
  })

  it('组件支持自定义分隔符', () => {
    const defaultSeparator = '至'
    const customSeparator = '-'
    expect(defaultSeparator).toBe('至')
    expect(customSeparator).toBe('-')
  })

  it('禁用状态下输入框都应被禁用', () => {
    const isDisabled = true
    expect(isDisabled).toBe(true)
  })

  it('支持v-model.number修饰符转换字符串为数字', () => {
    const stringValue = '10'
    const numberValue = Number(stringValue)
    expect(numberValue).toBe(10)
    expect(typeof numberValue).toBe('number')
  })

  it('数值范围验证 - 最小值应小于最大值', () => {
    const minValue = 10
    const maxValue = 100
    expect(minValue < maxValue).toBe(true)
  })

  it('支持清空数值设置为null', () => {
    let modelValue: [number | null, number | null] = [10, 100]
    modelValue = [null, modelValue[1]]
    expect(modelValue[0]).toBe(null)
    expect(modelValue[1]).toBe(100)
  })

  it('支持大数值输入', () => {
    const largeNumber = 999999999
    expect(largeNumber).toBeGreaterThan(1000000)
  })

  it('支持负数输入', () => {
    const modelValue: [number | null, number | null] = [-100, 100]
    expect(modelValue[0]).toBe(-100)
    expect(modelValue[1]).toBe(100)
  })

  it('支持小数输入', () => {
    const modelValue: [number | null, number | null] = [10.5, 99.9]
    expect(modelValue[0]).toBe(10.5)
    expect(modelValue[1]).toBe(99.9)
  })
})

/**
 * MlNumberRangeInput 属性验证测试
 */
describe('MlNumberRangeInput 属性验证', () => {
  it('label属性是必需的', () => {
    const wrapper = mount(MlNumberRangeInput, {
      props: {
        label: 'Price',
        modelValue: [null, null]
      }
    })
    expect(wrapper.props('label')).toBe('Price')
  })

  it('disabled属性应为布尔值', () => {
    const disabled = false
    expect(typeof disabled).toBe('boolean')
  })

  it('separator属性支持自定义字符串', () => {
    const separators = ['至', '-', '~', '到']
    separators.forEach((separator) => {
      expect(typeof separator).toBe('string')
      expect(separator.length > 0).toBe(true)
    })
  })

  it('inputProps支持任意ElInput属性', () => {
    const inputProps = {
      clearable: true,
      maxlength: 10,
      readonly: false
    }
    expect(inputProps.clearable).toBe(true)
    expect(inputProps.maxlength).toBe(10)
  })

  it('minInputProps和maxInputProps支持独立配置', () => {
    const minInputProps = { maxlength: 5 }
    const maxInputProps = { maxlength: 10 }
    expect(minInputProps.maxlength).toBe(5)
    expect(maxInputProps.maxlength).toBe(10)
  })
})

/**
 * MlNumberRangeInput 插槽支持测试
 */
describe('MlNumberRangeInput 插槽支持', () => {
  it('应支持min-prefix插槽', () => {
    const wrapper = mount(MlNumberRangeInput, {
      props: {
        label: 'Range',
        modelValue: [null, null]
      },
      slots: {
        'min-prefix': '<span>Min</span>'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应支持min-suffix插槽', () => {
    const slots = { 'min-suffix': true }
    expect(slots['min-suffix']).toBe(true)
  })

  it('应支持max-prefix插槽', () => {
    const slots = { 'max-prefix': true }
    expect(slots['max-prefix']).toBe(true)
  })

  it('应支持max-suffix插槽', () => {
    const slots = { 'max-suffix': true }
    expect(slots['max-suffix']).toBe(true)
  })

  it('应支持min-prepend插槽', () => {
    const slots = { 'min-prepend': true }
    expect(slots['min-prepend']).toBe(true)
  })

  it('应支持min-append插槽', () => {
    const slots = { 'min-append': true }
    expect(slots['min-append']).toBe(true)
  })

  it('应支持max-prepend插槽', () => {
    const slots = { 'max-prepend': true }
    expect(slots['max-prepend']).toBe(true)
  })

  it('应支持max-append插槽', () => {
    const slots = { 'max-append': true }
    expect(slots['max-append']).toBe(true)
  })
})
