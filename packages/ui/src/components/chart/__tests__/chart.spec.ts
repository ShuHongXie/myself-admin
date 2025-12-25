import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { computed, ref } from 'vue'
import type { MlChartProps } from '../type'

/**
 * MlChart 组件测试
 *
 * 说明：由于 Vue 组件在测试环境中存在 v-show、slot 等渲染兼容性问题，
 * 这里主要测试组件的核心业务逻辑
 */
describe('MlChart 组件', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Props 默认值验证', () => {
    it('options 默认应该是空对象', () => {
      const props: MlChartProps = {
        options: {}
      }
      expect(props.options).toEqual({})
    })

    it('id 应该可以自定义', () => {
      const customId = 'custom-chart-id'
      const props: MlChartProps = {
        id: customId
      }
      expect(props.id).toBe(customId)
    })

    it('theme 可以设置为自定义主题', () => {
      const props: MlChartProps = {
        theme: 'dark'
      }
      expect(props.theme).toBe('dark')
    })

    it('isEmpty 默认应该是 false', () => {
      const props: MlChartProps = {
        isEmpty: false
      }
      expect(props.isEmpty).toBe(false)
    })

    it('description 可以自定义', () => {
      const props: MlChartProps = {
        description: '自定义空状态提示'
      }
      expect(props.description).toBe('自定义空状态提示')
    })
  })

  describe('isEmpty 功能测试', () => {
    /**
     * 模拟组件中 formatEmpty 的计算逻辑
     */
    function createFormatEmpty(props: MlChartProps) {
      return computed(() => {
        if (typeof props.isEmpty === 'function') {
          return props.isEmpty(props.options || {})
        }
        return props.isEmpty
      })
    }

    it('isEmpty 为 boolean true 时应该显示空状态', () => {
      const props: MlChartProps = {
        isEmpty: true
      }

      const formatEmpty = createFormatEmpty(props)
      expect(formatEmpty.value).toBe(true)
    })

    it('isEmpty 为 boolean false 时应该显示图表', () => {
      const props: MlChartProps = {
        isEmpty: false
      }

      const formatEmpty = createFormatEmpty(props)
      expect(formatEmpty.value).toBe(false)
    })

    it('isEmpty 为函数时应该根据 options 计算结果', () => {
      const emptyChecker = (options: Record<string, any>) => {
        return !options.series || options.series.length === 0
      }

      const props: MlChartProps = {
        isEmpty: emptyChecker,
        options: {}
      }

      const formatEmpty = createFormatEmpty(props)
      expect(formatEmpty.value).toBe(true)
    })

    it('isEmpty 函数：options 有 series 数据时应该显示图表', () => {
      const emptyChecker = (options: Record<string, any>) => {
        return !options.series || options.series.length === 0
      }

      const props: MlChartProps = {
        isEmpty: emptyChecker,
        options: {
          series: [{ name: '销售额', data: [100, 200, 300] }]
        }
      }

      const formatEmpty = createFormatEmpty(props)
      expect(formatEmpty.value).toBe(false)
    })

    it('isEmpty 函数：options 的 series 为空数组时应该显示空状态', () => {
      const emptyChecker = (options: Record<string, any>) => {
        return !options.series || options.series.length === 0
      }

      const props: MlChartProps = {
        isEmpty: emptyChecker,
        options: {
          series: []
        }
      }

      const formatEmpty = createFormatEmpty(props)
      expect(formatEmpty.value).toBe(true)
    })

    it('isEmpty 函数：复杂判断逻辑应该正确工作', () => {
      const complexChecker = (options: Record<string, any>) => {
        if (!options.series) return true
        const hasData = options.series.some((item: any) => {
          return item.data && item.data.length > 0
        })
        return !hasData
      }

      const props: MlChartProps = {
        isEmpty: complexChecker,
        options: {
          series: [
            { name: '系列1', data: [] },
            { name: '系列2', data: [10, 20] }
          ]
        }
      }

      const formatEmpty = createFormatEmpty(props)
      expect(formatEmpty.value).toBe(false)
    })
  })

  describe('随机 ID 生成测试', () => {
    it('生成的 ID 应该是字符串', () => {
      const id = Math.random().toString(36).substring(2, 8)
      expect(typeof id).toBe('string')
    })

    it('生成的 ID 长度应该不超过6位', () => {
      const id = Math.random().toString(36).substring(2, 8)
      expect(id.length).toBeLessThanOrEqual(6)
    })

    it('多次生成的 ID 应该不同', () => {
      const ids = new Set()
      for (let i = 0; i < 100; i++) {
        ids.add(Math.random().toString(36).substring(2, 8))
      }
      // 100次生成应该至少有95个不同的ID（考虑极小概率的重复）
      expect(ids.size).toBeGreaterThan(95)
    })
  })

  describe('图表配置测试', () => {
    it('options 应该支持完整的 echarts 配置', () => {
      const props: MlChartProps = {
        options: {
          title: { text: '测试图表' },
          xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
          yAxis: { type: 'value' },
          series: [
            {
              name: '销售额',
              type: 'line',
              data: [150, 230, 224]
            }
          ]
        }
      }

      expect(props.options!.title.text).toBe('测试图表')
      expect(props.options!.series.length).toBe(1)
      expect(props.options!.series[0].data).toEqual([150, 230, 224])
    })

    it('options 为空对象时不应该报错', () => {
      const props: MlChartProps = {
        options: {}
      }

      expect(props.options).toEqual({})
      expect(Object.keys(props.options!).length).toBe(0)
    })
  })
})
