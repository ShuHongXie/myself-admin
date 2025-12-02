<script setup>
import { ref } from 'vue'

// 分页加载相关状态
const dataSource = ref([])
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(0)
const pageSize = 20
const totalCount = 200

// 模拟从服务器加载数据
const loadMoreData = async () => {
  if (loading.value || finished.value) return

  loading.value = true
  currentPage.value++

  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = currentPage.value * pageSize

  if (startIndex >= totalCount) {
    finished.value = true
    loading.value = false
    return
  }

  // 生成当前页的数据
  const pageData = Array.from({ length: pageSize }, (_, i) => {
    const index = startIndex + i
    if (index >= totalCount) return null
    return {
      id: index,
      title: `数据项 #${index}`,
      content: `这是第 ${index} 条数据的详细内容`,
      time: new Date().toLocaleString()
    }
  }).filter(Boolean)

  dataSource.value.push(...pageData)
  loading.value = false

  if (endIndex >= totalCount) {
    finished.value = true
  }
}

// 初始加载
loadMoreData()
</script>

<template>
  <ml-virtual-list
    :height="500"
    :item-height="60"
    :item-equal="true"
    :data-source="dataSource"
    :loading="loading"
    :finished="finished"
    @load-more="loadMoreData"
  >
    <template #default="{ item }">
      <div style="padding: 15px; border-bottom: 1px solid #eee; background: #fff">
        <div style="font-weight: bold; margin-bottom: 5px; color: #303133">{{ item.title }}</div>
        <div style="color: #909399; font-size: 12px">{{ item.content }}</div>
        <div style="color: #c0c4cc; font-size: 12px; margin-top: 5px">{{ item.time }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
