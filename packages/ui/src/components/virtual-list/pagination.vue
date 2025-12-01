<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({
  name: 'MlVirtualListPagination'
})

interface Props {
  /** 容器高度，默认 500px */
  height?: number
  /** 列表项高度，默认 50px */
  itemHeight?: number
  /** 预加载数量（上下各预加载几个） */
  preLoadCount?: number
  /** 每页加载的数据量 */
  pageSize?: number
  /** 距离底部多少像素时触发加载 */
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 500,
  itemHeight: 50,
  preLoadCount: 0,
  pageSize: 50,
  threshold: 200
})

const emit = defineEmits<{
  (e: 'load-more'): void
}>()

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT = computed(() => props.height)
/** @name 列表项高度 */
const ITEM_HEIGHT = computed(() => props.itemHeight)
/** @name 预加载数量 */
const PRE_LOAD_COUNT = computed(() => {
  if (props.preLoadCount) return props.preLoadCount
  console.log(
    SCROLL_VIEW_HEIGHT.value,
    ITEM_HEIGHT.value,
    Math.ceil(SCROLL_VIEW_HEIGHT.value / ITEM_HEIGHT.value)
  )
  // Math.ceil(SCROLL_VIEW_HEIGHT.value / ITEM_HEIGHT.value)
  return 0
})

/** 容器 Ref */
const containerRef = ref<HTMLElement | null>(null)
/** 数据源 */
const sourceData = ref<any[]>([])
/** 当前页码 */
const currentPage = ref(1)
/** 是否正在加载 */
const loading = ref(false)
/** 是否已加载完所有数据 */
const finished = ref(false)
/** 显示范围 */
const showRange = ref({
  start: 0,
  end: PRE_LOAD_COUNT.value
})
/** requestAnimationFrame ID */
let rafId: number | null = null
/** 是否正在执行 RAF */
let isRafPending = false

/**
 * 模拟从服务器加载数据
 */
const loadPageData = async (page: number) => {
  if (loading.value || finished.value) return

  loading.value = true

  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (page - 1) * props.pageSize
  const endIndex = page * props.pageSize

  // 模拟总数据量为 1000 条
  const totalCount = 200
  if (startIndex >= totalCount) {
    finished.value = true
    loading.value = false
    return
  }

  // 生成当前页的数据
  const pageData = Array.from({ length: props.pageSize }, (_, i) => {
    const index = startIndex + i
    if (index >= totalCount) return null
    return {
      id: index,
      title: `数据项 #${index}`,
      content: `这是第 ${index} 条数据的内容描述`,
      time: new Date().toLocaleString()
    }
  }).filter(Boolean)

  // 追加到已有数据
  sourceData.value = [...sourceData.value, ...pageData]
  currentPage.value = page

  loading.value = false

  // 检查是否已经加载完所有数据
  if (sourceData.value.length >= totalCount) {
    finished.value = true
  }
}

/**
 * scrollView 整体高度
 */
const scrollViewHeight = computed(() => {
  return sourceData.value.length * ITEM_HEIGHT.value
})

/**
 * 滚动条偏移量（使用 transform 实现，性能更好）
 */
const scrollViewOffset = computed(() => showRange.value.start * ITEM_HEIGHT.value)

/**
 * 当前 scrollView 展示列表
 */
const currentViewList = computed(() => {
  console.log(showRange.value.start, showRange.value.end)

  return sourceData.value.slice(showRange.value.start, showRange.value.end).map((el, index) => ({
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
    const offset: number = Math.floor(element.scrollTop / ITEM_HEIGHT.value)
    const viewItemSize: number = Math.ceil(element.clientHeight / ITEM_HEIGHT.value)
    const startSize: number = offset - PRE_LOAD_COUNT.value
    const endSize: number = viewItemSize + offset + PRE_LOAD_COUNT.value
    console.log('offset:', offset)
    console.log('viewItemSize:', viewItemSize)
    console.log('startSize:', startSize)
    console.log('endSize:', endSize)
    showRange.value = {
      start: startSize < 0 ? 0 : startSize,
      end: endSize > sourceData.value.length ? sourceData.value.length : endSize
    }
  }
}

/**
 * 检查是否需要加载更多
 */
const checkLoadMore = () => {
  const element = containerRef.value
  if (!element || loading.value || finished.value) return

  const scrollTop = element.scrollTop
  const clientHeight = element.clientHeight
  // 使用计算出的总高度，而不是 scrollHeight
  const totalHeight = scrollViewHeight.value

  // 距离底部的距离
  const distanceToBottom = totalHeight - scrollTop - clientHeight

  // 如果距离底部小于阈值，触发加载
  if (distanceToBottom < props.threshold) {
    console.log('触发加载', {
      scrollTop,
      clientHeight,
      totalHeight,
      distanceToBottom,
      threshold: props.threshold
    })
    loadPageData(currentPage.value + 1)
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
    calculateRange()
    checkLoadMore()
    isRafPending = false
  })
}

// 监听数据变化，重新计算范围
watch(
  () => sourceData.value.length,
  () => {
    calculateRange()
  }
)

onMounted(() => {
  // 初始加载第一页数据
  loadPageData(1)
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
    {{ currentViewList.length }}
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
            :style="{
              height: ITEM_HEIGHT + 'px'
            }"
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
      <div v-if="loading" class="loading-tip">
        <span class="loading-spinner"></span>
        <span>加载中...</span>
      </div>

      <!-- 加载完成提示 -->
      <div v-if="finished && !loading" class="finished-tip">已加载全部数据</div>
    </div>

    <!-- 统计信息 -->
    <div class="stats-bar">
      <span>已加载: {{ sourceData.length }} 条</span>
      <span>当前页: {{ currentPage }}</span>
      <span>状态: {{ loading ? '加载中' : finished ? '已完成' : '正常' }}</span>
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
