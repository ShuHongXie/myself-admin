<script setup lang="ts">
import {
  onMounted,
  getCurrentInstance,
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  markRaw,
  useAttrs,
  computed
} from 'vue'
import { ElEmpty } from 'element-plus'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import type { MlChartProps } from './type'
import { bem } from '../../utils'

defineOptions({
  name: 'MlChart'
})
const { proxy } = getCurrentInstance() as any

const props = withDefaults(defineProps<MlChartProps>(), {
  options: () => ({}),
  id: () => Math.random().toString(36).substring(2, 8),
  theme: '',
  isEmpty: false,
  description: '暂无数据'
})

const echartRef = ref<HTMLDivElement>()
const chart = ref()
const emits = defineEmits<{
  chart: [chartInstance: any]
  [key: string]: any
}>()
const events = Object.entries(useAttrs())

// 图表初始化
const renderChart = async () => {
  // 等待 DOM 渲染完成
  await nextTick()

  if (!echartRef.value) return

  // 确保容器有宽高
  const { clientWidth, clientHeight } = echartRef.value
  if (clientWidth === 0 || clientHeight === 0) {
    console.warn('[MlChart] DOM width or height is 0, waiting for next frame...')
    // 使用 requestAnimationFrame 确保样式已应用
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initChart()
      })
    })
    return
  }

  initChart()
}

// 初始化图表实例
const initChart = () => {
  if (!echartRef.value) return

  chart.value = markRaw(proxy.$echarts.init(echartRef.value, props.theme))
  setOption(props.options)
  // 返回chart实例
  emits('chart', chart.value)

  // 监听图表事件
  events.forEach(([key]) => {
    if (key.startsWith('on') && !key.startsWith('onChart')) {
      const on = key.toLowerCase().substring(2)
      chart.value.on(on, (...args: any) => emits(on, ...args))
    }
  })

  // 监听元素变化
  useResizeObserver(echartRef.value, resizeChart)
}

// 重绘图表函数
const resizeChart = useDebounceFn(() => {
  chart.value?.resize()
}, 300)

// 设置图表函数
const setOption = useDebounceFn(async (data) => {
  if (!chart.value) return
  chart.value.setOption(data, true, true)
  await nextTick()
  resizeChart()
}, 300)

const formatEmpty = computed(() => {
  if (typeof props.isEmpty === 'function') {
    return props.isEmpty(props.options)
  }
  return props.isEmpty
})

watch(
  () => props.options,
  async (nw) => {
    await nextTick()
    setOption(nw)
  },
  { deep: true }
)

watch(
  () => props.theme,
  async () => {
    if (chart.value) {
      chart.value.dispose()
    }
    await renderChart()
  }
)

onMounted(async () => {
  await renderChart()
})
onBeforeUnmount(() => {
  // 销毁echarts实例
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})
</script>

<template>
  <div :class="bem('chart')" v-bind="$attrs">
    <div v-show="!formatEmpty" :class="bem('chart', 'container')" :id="id" ref="echartRef" />
    <slot v-if="formatEmpty" name="empty">
      <el-empty v-bind="$attrs" :description="description" />
    </slot>
    <slot></slot>
  </div>
</template>
