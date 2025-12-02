<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { bem } from '../../utils'
defineOptions({
  name: 'MlVirtualList'
})

interface Props {
  /** 容器高度，默认 500px */
  height?: number
  /** 列表项高度（定高模式必传） */
  itemHeight?: number
  /** 列表项预估高度（不定高模式使用），默认 50px */
  estimatedItemHeight?: number
  /** 是否为等高列表，true=定高，false=不定高，默认 true */
  itemEqual?: boolean
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
  itemHeight: 50,
  estimatedItemHeight: 50,
  itemEqual: true,
  preLoadCount: 5,
  threshold: 200,
  dataSource: () => []
  // loading 和 finished 不设置默认值，保持 undefined，用于区分是否启用分页模式
})

const emit = defineEmits<{
  (e: 'load-more'): void
}>()

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT = computed(() => props.height)
/** @name 列表项高度（定高模式） */
const ITEM_HEIGHT = computed(() => props.itemHeight)
/** @name 预估列表项高度（不定高模式） */
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
/** ResizeObserver 实例 */
let resizeObserver: ResizeObserver | null = null
/** ResizeObserver 更新防抖定时器 */
let resizeUpdateTimer: number | null = null

/**
 * 初始化位置信息
 */
const initPositions = () => {
  const data = props.dataSource
  const height = props.itemEqual ? ITEM_HEIGHT.value : ESTIMATED_ITEM_HEIGHT.value
  positions.value = data.map((_, index) => ({
    index,
    height,
    top: index * height,
    bottom: (index + 1) * height
  }))
}

/**
 * scrollView 整体高度（根据实际位置计算）
 */
const scrollViewHeight = computed(() => {
  // 定高模式直接计算
  if (props.itemEqual) {
    return props.dataSource.length * ITEM_HEIGHT.value
  }
  // 不定高模式使用位置缓存
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
  // 定高模式直接计算
  if (props.itemEqual) {
    return start * ITEM_HEIGHT.value
  }
  // 不定高模式使用位置缓存
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
 * 仅在不定高模式下执行
 */
const updatePositions = () => {
  // 定高模式不需要更新位置
  if (props.itemEqual) return

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
 * 初始化 ResizeObserver 监听列表项高度变化
 */
const initResizeObserver = () => {
  // 定高模式不需要监听
  if (props.itemEqual) return

  // 清理旧的观察器
  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  // 创建新的 ResizeObserver
  resizeObserver = new ResizeObserver((entries) => {
    let needUpdate = false
    const changedIndices: number[] = []

    for (const entry of entries) {
      const target = entry.target as HTMLElement
      const index = parseInt(target.dataset.index || '0')
      const pos = positions.value[index]
      if (!pos) continue

      const newHeight = entry.contentRect.height
      const oldHeight = pos.height

      // 高度变化时标记需要更新
      if (Math.abs(newHeight - oldHeight) > 1) {
        needUpdate = true
        changedIndices.push(index)
        pos.height = newHeight
        pos.bottom = pos.top + newHeight
      }
    }

    // 如果有高度变化，防抖更新
    if (needUpdate) {
      // 清除之前的定时器
      if (resizeUpdateTimer !== null) {
        clearTimeout(resizeUpdateTimer)
      }

      // 设置防抖，避免频繁更新
      resizeUpdateTimer = window.setTimeout(() => {
        // 找到最小的变化索引
        const minChangedIndex = Math.min(...changedIndices)

        // 只更新变化项及之后的位置
        for (let i = minChangedIndex + 1; i < positions.value.length; i++) {
          const currentPos = positions.value[i]
          const prevPos = positions.value[i - 1]
          if (currentPos && prevPos) {
            currentPos.top = prevPos.bottom
            currentPos.bottom = currentPos.top + currentPos.height
          }
        }

        changedIndices.length = 0
        resizeUpdateTimer = null
      }, 16) // 16ms 防抖，约 60fps
    }
  })

  // 观察所有可见的列表项
  observeVisibleItems()
}

/**
 * 观察当前可见的列表项
 */
const observeVisibleItems = () => {
  if (!resizeObserver || props.itemEqual) return

  // 先断开所有旧的观察
  resizeObserver.disconnect()

  const nodes = containerRef.value?.querySelectorAll('.virtual-list-item')
  if (!nodes) return

  nodes.forEach((node) => {
    resizeObserver!.observe(node as HTMLElement)
  })
}

/**
 * 计算元素范围
 */
const calculateRange = () => {
  const element = containerRef.value
  if (!element) return

  const scrollTop = element.scrollTop
  const clientHeight = element.clientHeight

  let start = 0
  let end = 0

  if (props.itemEqual) {
    // 定高模式：直接计算
    start = Math.floor(scrollTop / ITEM_HEIGHT.value)
    const viewItemSize = Math.ceil(clientHeight / ITEM_HEIGHT.value)
    end = start + viewItemSize
  } else {
    // 不定高模式：使用二分查找
    if (positions.value.length === 0) return
    start = getStartIndex(scrollTop)

    // 计算结束索引
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
  }

  // 限制最多渲染 10 个元素
  const maxVisibleItems = 10
  if (end - start > maxVisibleItems) {
    end = start + maxVisibleItems
  }

  showRange.value = {
    start: Math.max(0, start - PRE_LOAD_COUNT.value),
    end: Math.min(props.dataSource.length, end + PRE_LOAD_COUNT.value)
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
    // 只有当 finished 不为 undefined 时才检查加载更多（兼容无分页模式）
    if (props.finished !== undefined && !props.finished) {
      checkLoadMore()
    }
    isRafPending = false
  })
}

// 监听数据变化，重新初始化位置
watch(
  () => props.dataSource.length,
  (newLen, oldLen = 0) => {
    if (newLen !== oldLen) {
      if (props.itemEqual) {
        // 定高模式：简单处理，重新初始化
        initPositions()
      } else {
        // 不定高模式：只初始化新增的数据项
        if (newLen > oldLen) {
          const height = ESTIMATED_ITEM_HEIGHT.value
          for (let i = oldLen; i < newLen; i++) {
            const lastPos = positions.value[i - 1]
            positions.value.push({
              index: i,
              height,
              top: lastPos ? lastPos.bottom : 0,
              bottom: (lastPos ? lastPos.bottom : 0) + height
            })
          }
        } else {
          // 数据减少，移除多余的位置信息
          positions.value = positions.value.slice(0, newLen)
        }
      }

      // 下一帧更新高度和计算范围
      requestAnimationFrame(() => {
        updatePositions()
        calculateRange()
        // 重新观察新的列表项
        if (!props.itemEqual) {
          observeVisibleItems()
        }
      })
    }
  },
  { immediate: true }
)

// 监听显示范围变化，更新 ResizeObserver 观察的元素
watch(
  () => showRange.value,
  () => {
    if (!props.itemEqual && resizeObserver) {
      // 使用防抖，避免滚动时频繁重新观察
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        observeVisibleItems()
        rafId = null
      })
    }
  },
  { deep: true }
)

onMounted(() => {
  // 初始化位置信息
  initPositions()
  // 初始化 ResizeObserver
  initResizeObserver()
  // 等待 DOM 渲染完成后更新实际高度
  requestAnimationFrame(() => {
    updatePositions()
    calculateRange()
  })
})

// 组件卸载时清理 RAF 和 ResizeObserver
onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
  if (resizeUpdateTimer !== null) {
    clearTimeout(resizeUpdateTimer)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <div :class="bem('virtual-list')">
    <div
      :class="bem('virtual-list', 'container')"
      ref="containerRef"
      :style="{
        height: SCROLL_VIEW_HEIGHT + 'px',
        overflow: 'auto'
      }"
      @scroll="onContainerScroll"
    >
      <div
        :class="bem('virtual-list', 'phantom')"
        :style="{
          height: scrollViewHeight + 'px'
        }"
      >
        <div
          :class="bem('virtual-list', 'content')"
          :style="{
            transform: `translateY(${scrollViewOffset}px)`
          }"
        >
          <div
            v-for="item in currentViewList"
            :key="item.index"
            :class="bem('virtual-list', 'item')"
            :data-index="item.index"
            :style="itemEqual ? { height: ITEM_HEIGHT + 'px' } : {}"
          >
            <slot :item="item.data" :index="item.index"> </slot>
          </div>
        </div>
      </div>

      <!-- 加载状态提示（在容器内部） -->
      <div :class="bem('virtual-list', 'loading-tip')">
        <slot name="loading">
          <span class="loading-spinner"></span>
          <span>加载中...</span>
        </slot>
      </div>

      <!-- 加载完成提示 -->
      <div :class="bem('virtual-list', 'finished-tip')">
        <slot name="finished">已加载全部数据</slot>
      </div>
    </div>
  </div>
</template>
