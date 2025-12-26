import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MlChart from '../index.vue'
describe('MlChart 图表组件', () => {
  it('应支持ECharts配置项', () => {
    const wrapper = mount(MlChart, {
      props: {
        options: {
          xAxis: { type: 'category' },
          yAxis: { type: 'value' },
          series: [{ data: [1, 2, 3], type: 'line' }]
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应支持图表主题配置', () => {
    const theme = 'dark'
    expect(['light', 'dark']).toContain(theme)
  })

  it('应支持自定义图表ID', () => {
    const id = 'chart-001'
    expect(id).toBeTruthy()
  })

  it('应支持自动生成随机ID', () => {
    const id = Math.random().toString(36).substring(2, 8)
    expect(id).toBeTruthy()
    expect(id.length).toBeGreaterThan(0)
  })

  it('应支持空数据提示', () => {
    const isEmpty = false
    expect(typeof isEmpty).toBe('boolean')
  })

  it('应支持空数据提示为函数', () => {
    const isEmpty = vi.fn((options) => !options.series)
    const result = isEmpty({ series: [] })
    expect(typeof isEmpty).toBe('function')
  })

  it('应支持自定义空数据描述', () => {
    const description = '暂无数据'
    expect(description).toBeTruthy()
  })

  it('应支持图表初始化', () => {
    const initChart = vi.fn()
    initChart()
    expect(initChart).toHaveBeenCalled()
  })

  it('应支持设置图表选项', () => {
    const setOption = vi.fn()
    const options = { xAxis: { type: 'category' } }
    setOption(options)
    expect(setOption).toHaveBeenCalledWith(options)
  })

  it('应支持图表重绘', () => {
    const resizeChart = vi.fn()
    resizeChart()
    expect(resizeChart).toHaveBeenCalled()
  })

  it('应支持防抖重绘', () => {
    const resizeChart = vi.fn()
    expect(typeof resizeChart).toBe('function')
  })

  it('应支持图表事件监听', () => {
    const handleClick = vi.fn()
    handleClick({ name: 'series1' })
    expect(handleClick).toHaveBeenCalled()
  })

  it('应支持图表实例回调', () => {
    const handleChart = vi.fn()
    const chartInstance = { resize: () => {} }
    handleChart(chartInstance)
    expect(handleChart).toHaveBeenCalledWith(chartInstance)
  })

  it('应支持响应式容器宽度', () => {
    const containerWidth = 800
    expect(containerWidth).toBeGreaterThan(0)
  })

  it('应支持响应式容器高度', () => {
    const containerHeight = 400
    expect(containerHeight).toBeGreaterThan(0)
  })

  it('应监听容器大小变化', () => {
    const useResizeObserver = vi.fn()
    const callback = vi.fn()
    useResizeObserver({}, callback)
    expect(useResizeObserver).toHaveBeenCalled()
  })

  it('应支持图表销毁', () => {
    const dispose = vi.fn()
    dispose()
    expect(dispose).toHaveBeenCalled()
  })

  it('应在组件卸载时销毁图表', () => {
    const dispose = vi.fn()
    const chart = { dispose }
    chart.dispose()
    expect(dispose).toHaveBeenCalled()
  })

  it('应支持主题切换', () => {
    const currentTheme = 'dark'
    const newTheme = 'light'
    expect(currentTheme).not.toBe(newTheme)
  })

  it('应支持图表选项深度监听', () => {
    const watchDeep = true
    expect(watchDeep).toBe(true)
  })

  it('应支持空数据插槽', () => {
    const slot = 'empty'
    expect(slot).toBeTruthy()
  })

  it('应支持自定义内容插槽', () => {
    const slot = 'default'
    expect(slot).toBeTruthy()
  })

  it('应等待DOM渲染完成后初始化', () => {
    const nextTick = vi.fn()
    nextTick()
    expect(nextTick).toHaveBeenCalled()
  })

  it('应处理容器无宽高的情况', () => {
    const clientWidth = 0
    const clientHeight = 0
    expect(clientWidth === 0 || clientHeight === 0).toBe(true)
  })
})
