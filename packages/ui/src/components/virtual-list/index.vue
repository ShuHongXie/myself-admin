<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'MlVirtualList'
})

// const props = defineProps<{
//   msg?: string
// }>()

// const emits = defineEmits<{
//   (event: 'click', data: string): void
// }>()

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT: number = 500
/** @name 列表项高度 */
const ITEM_HEIGHT: number = 50
/** @name 预加载数量 */
const PRE_LOAD_COUNT: number = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT

const containerRef = ref<HTMLElement | null>(null)
const list = ref<any[]>([])
const scrollViewHeight = ref<number>(SCROLL_VIEW_HEIGHT)
const showRange = ref({
  start: 0,
  end: 10
})

// 初始化数据
const createListData = () => {
  const initnalList: number[] = Array.from(Array(4000).keys())
  list.value = initnalList
}

const scrollViewOffset = computed(() => showRange.value.start * ITEM_HEIGHT)

onMounted(() => {
  createListData()
})
</script>

<template>
  <div
    class="container"
    ref="containerRef"
    :style="{
      height: SCROLL_VIEW_HEIGHT,
      overflow: 'auto'
    }"
  >
    <div
      :style="{
        width: '100%',
        height: scrollViewHeight - scrollViewOffset,
        marginTop: scrollViewOffset
      }"
    >
      <div
        :style="{
          height: ITEM_HEIGHT + 'px'
        }"
        v-for="item in list"
        class="showElement"
        :key="item"
      >
        Current Position: {e}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.App {
  font-family: sans-serif;
  text-align: center;
}

.showElement {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
