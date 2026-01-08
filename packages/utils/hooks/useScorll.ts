import { throttle } from 'lodash-es'
import { ref, onMounted, onUnmounted } from 'vue'

interface ScrollOptions {
  container?: string | HTMLElement
  initialThreshold?: number
  onReach?: Function | null
  direction?: string
  throttleTime?: number
}

export default function useScroll(options: ScrollOptions = {}) {
  const {
    container = window,
    initialThreshold = 0,
    onReach = null,
    direction = 'vertical',
    throttleTime = 200
  } = options

  const threshold = ref(initialThreshold || 0)
  let target: HTMLElement | Window

  const scrollPosition = ref(0)
  const isReached = ref(false)
  let rafId: number | null

  // 获取容器元素
  const getContainer = (): HTMLElement | null => {
    return typeof container === 'string'
      ? (document.querySelector(container) as HTMLElement)
      : (container as HTMLElement | Window)
  }

  const getScrollPosition = () => {
    if (target === window) {
      return direction === 'vertical' ? window.pageYOffset : window.pageXOffset
    } else {
      return direction === 'vertical'
        ? (target as HTMLElement).scrollTop
        : (target as HTMLElement).scrollLeft
    }
  }

  const updateThreshold = (val: number) => {
    threshold.value = val
  }

  const checkThreshold = () => {
    const currentPos = getScrollPosition()
    scrollPosition.value = currentPos
    // 实时检测是否达到阈值
    const newReached = currentPos >= threshold.value
    if (newReached !== isReached.value) {
      isReached.value = newReached
      if (onReach) onReach(newReached)
    }
  }

  const handleScroll = throttle(() => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      checkThreshold()
      rafId = null
    })
  }, throttleTime)

  onMounted(() => {
    target = getContainer()
    target.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    target.removeEventListener('scroll', handleScroll)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return {
    scrollPosition,
    isReached,
    checkThreshold, // 暴露手动检测方法
    updateThreshold
  }
}
