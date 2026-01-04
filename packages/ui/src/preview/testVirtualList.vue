<script setup>
import MlVirtualList from '../../src/components/virtual-list'
import { ref } from 'vue'

const dataSource = ref([])
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(0)
const pageSize = 20
const totalCount = 150

const loadMoreData = async () => {
  if (loading.value || finished.value) return

  loading.value = true
  currentPage.value++

  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = currentPage.value * pageSize

  if (startIndex >= totalCount) {
    finished.value = true
    loading.value = false
    return
  }

  const pageData = Array.from({ length: pageSize }, (_, i) => {
    const index = startIndex + i
    if (index >= totalCount) return null
    // 随机生成不同长度的内容
    const contentLength = Math.floor(Math.random() * 5) + 2
    const content = Array(contentLength)
      .fill(0)
      .map((_, idx) => `这是第 ${index} 条数据的第 ${idx + 1} 行内容。`)
      .join('')
    return {
      id: index,
      title: `不等高数据项 #${index}`,
      content,
      expanded: false
    }
  }).filter(Boolean)

  dataSource.value.push(...pageData)
  loading.value = false

  if (endIndex >= totalCount) {
    finished.value = true
  }
}

const toggleExpand = (index) => {
  const item = dataSource.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}

loadMoreData()
</script>

<template>
  <ml-virtual-list
    :height="500"
    :item-equal="false"
    :estimated-item-height="120"
    :data-source="dataSource"
    :loading="loading"
    :finished="finished"
    @load-more="loadMoreData"
  >
    <template #default="{ item, index }">
      <div @click="toggleExpand(index)" style="padding: 20px; cursor: pointer">
        <div style="display: flex; justify-content: space-between">
          {{ item.title }}
          <span>{{ item.expanded ? '▼' : '▶' }}</span>
        </div>
        <div v-show="item.expanded">{{ item.content }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
