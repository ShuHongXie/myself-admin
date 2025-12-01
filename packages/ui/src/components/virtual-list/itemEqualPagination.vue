<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({
  name: 'MlVirtualListPagination'
})

interface Props {
  /** 容器高度，默认 500px */
  height?: number
  /** 列表项预估高度，默认 50px（用于首次渲染） */
  estimatedItemHeight?: number
  /** 预加载数量（上下各预加载几个） */
  preLoadCount?: number
  /** 距离底部多少像素时触发加载 */
  threshold?: number
  /** 数据源 */
  dataSource?: any[]
  /** 是否正在加载 */
  loading?: boolean
  /** 是否已加载完所有数据 */
  finished?: boolean
}

// 位置信息接口
interface PositionInfo {
  index: number
  top: number
  bottom: number
  height: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 500,
  estimatedItemHeight: 50,
  preLoadCount: 5,
  threshold: 200,
  dataSource: () => [],
  loading: false,
  finished: false
})

const emit = defineEmits<{
  (e: 'load-more'): void
}>()

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT = computed(() => props.height)
/** @name 预估列表项高度 */
const ESTIMATED_ITEM_HEIGHT = computed(() => props.estimatedItemHeight)
/** @name 预加载数量 */
const PRE_LOAD_COUNT = computed(() => props.preLoadCount)

/** 容器 Ref */
const containerRef = ref<HTMLElement | null>(null)
/** 位置缓存 - 每个元素的位置信息 */
const positions = ref<PositionInfo[]>([])
/** 显示范围 */
const showRange = ref({
  start: 0,
  end: 10
})
/** requestAnimationFrame ID */
let rafId: number | null = null
/** 是否正在执行 RAF */
let isRafPending = false

/**
 * 初始化位置信息
 */
const initPositions = () => {
  const data = props.dataSource
  positions.value = data.map((_, index) => ({
    index,
    height: ESTIMATED_ITEM_HEIGHT.value,
    top: index * ESTIMATED_ITEM_HEIGHT.value,
    bottom: (index + 1) * ESTIMATED_ITEM_HEIGHT.value
  }))
}

/**
 * scrollView 整体高度（根据实际位置计算）
 */
const scrollViewHeight = computed(() => {
  const len = positions.value.length
  const lastPos = positions.value[len - 1]
  if (len > 0 && lastPos) {
    return lastPos.bottom
  }
  return 0
})

/**
 * 滚动条偏移量（使用 transform 实现，性能更好）
 */
const scrollViewOffset = computed(() => {
  const start = showRange.value.start
  return start > 0 && positions.value[start] ? positions.value[start].top : 0
})

/**
 * 当前 scrollView 展示列表
 */
const currentViewList = computed(() => {
  return props.dataSource.slice(showRange.value.start, showRange.value.end).map((el, index) => ({
    data: el,
    index: showRange.value.start + index
  }))
})

/**
 * 二分查找：根据滚动位置找到起始索引
 */
const getStartIndex = (scrollTop: number): number => {
  let start = 0
  let end = positions.value.length - 1
  let mid = 0

  while (start <= end) {
    mid = Math.floor((start + end) / 2)
    const midPos = positions.value[mid]
    if (!midPos) break

    const midBottom = midPos.bottom
    const midTop = midPos.top

    if (midTop <= scrollTop && midBottom > scrollTop) {
      return mid
    } else if (midTop > scrollTop) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return 0
}

/**
 * 更新位置缓存（在渲染后测量实际高度）
 */
const updatePositions = () => {
  const nodes = containerRef.value?.querySelectorAll('.virtual-list-item')
  if (!nodes || nodes.length === 0) return

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect()
    const height = rect.height
    const index = parseInt((node as HTMLElement).dataset.index || '0')
    const pos = positions.value[index]
    if (!pos) return

    const oldHeight = pos.height || 0

    // 如果高度变化，更新缓存
    if (oldHeight !== height) {
      const diff = height - oldHeight
      pos.height = height
      pos.bottom = pos.top + height

      // 更新后续元素的位置
      for (let i = index + 1; i < positions.value.length; i++) {
        const currentPos = positions.value[i]
        const prevPos = positions.value[i - 1]
        if (currentPos && prevPos) {
          currentPos.top = prevPos.bottom
          currentPos.bottom = currentPos.top + currentPos.height
        }
      }
    }
  })
}

/**
 * 计算元素范围
 */
const calculateRange = () => {
  const element = containerRef.value
  if (!element || positions.value.length === 0) return

  const scrollTop = element.scrollTop
  const clientHeight = element.clientHeight

  // 使用二分查找找到起始索引
  const start = getStartIndex(scrollTop)
  // 计算结束索引
  let end = start
  let totalHeight = 0
  const targetHeight = clientHeight + PRE_LOAD_COUNT.value * ESTIMATED_ITEM_HEIGHT.value

  for (let i = start; i < positions.value.length; i++) {
    const pos = positions.value[i]
    if (!pos) break
    totalHeight += pos.height
    if (totalHeight >= targetHeight) {
      end = i + 1
      break
    }
    end = i + 1
  }

  // 限制最多渲染 10 个元素
  const maxVisibleItems = 10
  if (end - start > maxVisibleItems) {
    end = start + maxVisibleItems
  }

  showRange.value = {
    start: Math.max(0, start - PRE_LOAD_COUNT.value),
    end: Math.min(positions.value.length, end + PRE_LOAD_COUNT.value)
  }
}

/**
 * 检查是否需要加载更多
 */
const checkLoadMore = () => {
  const element = containerRef.value
  if (!element || props.loading || props.finished) return

  const scrollTop = element.scrollTop
  const clientHeight = element.clientHeight
  // 使用计算出的总高度，而不是 scrollHeight
  const totalHeight = scrollViewHeight.value

  // 距离底部的距离
  const distanceToBottom = totalHeight - scrollTop - clientHeight

  // 如果距离底部小于阈值，触发加载
  if (distanceToBottom < props.threshold) {
    emit('load-more')
  }
}

/**
 * onScroll 事件回调（使用 RAF 优化）
 */
const onContainerScroll = () => {
  // 如果已经有待处理的 RAF，直接返回
  if (isRafPending) return

  isRafPending = true

  rafId = requestAnimationFrame(() => {
    updatePositions()
    calculateRange()
    checkLoadMore()
    isRafPending = false
  })
}

// 监听数据变化，重新初始化位置
watch(
  () => props.dataSource.length,
  (newLen, oldLen = 0) => {
    if (newLen !== oldLen) {
      // 只初始化新增的数据项
      if (newLen > oldLen) {
        for (let i = oldLen; i < newLen; i++) {
          const lastPos = positions.value[i - 1]
          positions.value.push({
            index: i,
            height: ESTIMATED_ITEM_HEIGHT.value,
            top: lastPos ? lastPos.bottom : 0,
            bottom: (lastPos ? lastPos.bottom : 0) + ESTIMATED_ITEM_HEIGHT.value
          })
        }
      } else {
        // 数据减少，移除多余的位置信息
        positions.value = positions.value.slice(0, newLen)
      }

      // 下一帧更新高度和计算范围
      requestAnimationFrame(() => {
        updatePositions()
        calculateRange()
      })
    }
  },
  { immediate: true }
)

onMounted(() => {
  // 初始化位置信息
  initPositions()
  // 等待 DOM 渲染完成后更新实际高度
  requestAnimationFrame(() => {
    updatePositions()
    calculateRange()
  })
})

// 组件卸载时清理 RAF
onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <div class="virtual-list-pagination">
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
        class="virtual-list-phantom"
        :style="{
          height: scrollViewHeight + 'px'
        }"
      >
        <div
          class="virtual-list-content"
          :style="{
            transform: `translateY(${scrollViewOffset}px)`
          }"
        >
          <div
            v-for="item in currentViewList"
            :key="item.index"
            class="virtual-list-item"
            :data-index="item.index"
          >
            <slot :item="item.data" :index="item.index">
              <!-- 默认内容 -->
              <div class="default-item-content">
                <div class="item-title">{{ item.data?.title }}</div>
                <div class="item-content">{{ item.data?.content }}</div>
              </div>
            </slot>
          </div>
        </div>
      </div>

      <!-- 加载状态提示（在容器内部） -->
      <div v-if="props.loading" class="loading-tip">
        <span class="loading-spinner"></span>
        <span>加载中...</span>
      </div>

      <!-- 加载完成提示 -->
      <div v-if="props.finished && !props.loading" class="finished-tip">已加载全部数据</div>
    </div>

    <!-- 统计信息 -->
    <div class="stats-bar">
      <span>已加载: {{ props.dataSource.length }} 条</span>
      <span>状态: {{ props.loading ? '加载中' : props.finished ? '已完成' : '正常' }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-list-pagination {
  .virtual-list-container {
    position: relative;
    overflow: auto;
    border: 1px solid #e4e7ed;
    border-radius: 4px;

    .virtual-list-phantom {
      position: relative;
      width: 100%;
    }

    .virtual-list-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .virtual-list-item {
      box-sizing: border-box;
    }

    .default-item-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 12px 16px;
      height: 100%;
      border-bottom: 1px solid #f0f0f0;
      background-color: #fff;
      transition: all 0.2s;

      &:hover {
        background-color: #f5f7fa;
      }

      .item-title {
        font-weight: bold;
        font-size: 14px;
        color: #303133;
        margin-bottom: 4px;
      }

      .item-content {
        font-size: 12px;
        color: #909399;
      }
    }

    // 加载提示在容器内部
    .loading-tip,
    .finished-tip {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #909399;
      font-size: 14px;
      background-color: #fff;
    }

    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border: 2px solid #e4e7ed;
      border-top-color: #409eff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .finished-tip {
      color: #67c23a;
    }
  }

  .stats-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 12px;
    padding: 8px 16px;
    background-color: #f5f7fa;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;

    span {
      padding: 4px 8px;
      background-color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
