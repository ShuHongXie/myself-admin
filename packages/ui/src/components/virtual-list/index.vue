<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

defineOptions({
  name: 'MlVirtualList'
})

interface Props {
  /** 数据源 */
  dataSource?: any[]
  /** 容器高度，默认 500px */
  height?: number
  /** 列表项高度，默认 50px */
  itemHeight?: number
  /** 预加载数量（上下各预加载几个），默认为可视区域能容纳的数量 */
  preLoadCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  dataSource: () => [],
  height: 500,
  itemHeight: 50,
  preLoadCount: 0
})

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT = computed(() => props.height)
/** @name 列表项高度 */
const ITEM_HEIGHT = computed(() => props.itemHeight)
/** @name 预加载数量 */
const PRE_LOAD_COUNT = computed(
  () => props.preLoadCount || Math.ceil(SCROLL_VIEW_HEIGHT.value / ITEM_HEIGHT.value)
)

/** 容器 Ref */
const containerRef = ref<HTMLElement | null>(null)
/** 数据源 */
const sourceData = ref<any[]>([])
/** 显示范围 */
const showRange = ref({
  start: 0,
  end: PRE_LOAD_COUNT.value
})

/**
 * 初始化数据 - 创建 4000 条测试数据
 */
const createListData = () => {
  const initialList: number[] = Array.from(Array(4000).keys())
  sourceData.value = initialList
}

/**
 * scrollView 整体高度
 */
const scrollViewHeight = computed(() => {
  const data = props.dataSource.length > 0 ? props.dataSource : sourceData.value
  return data.length * ITEM_HEIGHT.value
})

/**
 * 滚动条偏移量（使用 transform 实现，性能更好）
 */
const scrollViewOffset = computed(() => showRange.value.start * ITEM_HEIGHT.value)

/**
 * 当前 scrollView 展示列表
 */
const currentViewList = computed(() => {
  const data = props.dataSource.length > 0 ? props.dataSource : sourceData.value
  return data.slice(showRange.value.start, showRange.value.end).map((el, index) => ({
    data: el,
    index: showRange.value.start + index
  }))
})

/**
 * 计算元素范围
 */
const calculateRange = () => {
  const element = containerRef.value
  if (element) {
    // 计算已滚动过的元素数量
    const offset: number = Math.floor(element.scrollTop / ITEM_HEIGHT.value)
    // 计算可视区域能容纳的元素数量
    const viewItemSize: number = Math.ceil(element.clientHeight / ITEM_HEIGHT.value)
    // 计算开始位置（减去预加载数量）
    const startSize: number = offset - PRE_LOAD_COUNT.value
    // 计算结束位置（加上预加载数量）
    const endSize: number = viewItemSize + offset + PRE_LOAD_COUNT.value

    const data = props.dataSource.length > 0 ? props.dataSource : sourceData.value
    showRange.value = {
      start: startSize < 0 ? 0 : startSize,
      end: endSize > data.length ? data.length : endSize
    }
  }
}

/**
 * onScroll 事件回调
 */
const onContainerScroll = (event: Event) => {
  event.preventDefault()
  calculateRange()
}

onMounted(() => {
  // 如果没有传入数据源，则创建测试数据
  if (props.dataSource.length === 0) {
    createListData()
  }
  // 初始化计算显示范围
  calculateRange()
})
</script>

<template>
  <div
    class="virtual-list-container"
    ref="containerRef"
    :style="{
      height: SCROLL_VIEW_HEIGHT + 'px',
      overflow: 'auto'
    }"
    @scroll="onContainerScroll"
  >
    <div
      class="virtual-list-content"
      :style="{
        width: '100%',
        height: scrollViewHeight + 'px',
        transform: `translateY(${scrollViewOffset}px)`
      }"
    >
      <div
        v-for="item in currentViewList"
        :key="item.index"
        class="virtual-list-item"
        :style="{
          height: ITEM_HEIGHT + 'px'
        }"
      >
        <slot :item="item.data" :index="item.index">
          <!-- 默认内容：如果没有传入 slot，就显示默认格式 -->
          <div class="default-item-content">Current Position: {{ item.data }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-list-container {
  position: relative;
  overflow: auto;

  .virtual-list-content {
    position: relative;
  }

  .virtual-list-item {
    box-sizing: border-box;
  }

  .default-item-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-bottom: 8px;
    background-color: #fff;
    transition: all 0.2s;

    &:hover {
      background-color: #f5f7fa;
      border-color: #409eff;
    }
  }
}
</style>
