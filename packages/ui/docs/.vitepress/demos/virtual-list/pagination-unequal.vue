<script setup>
import { ref } from 'vue'

// 分页加载相关状态
const dataSource = ref([])
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(0)
const pageSize = 20
const totalCount = 150

// 不等高数据加载
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
      .map((_, idx) => `这是第 ${index} 条数据的第 ${idx + 1} 行内容，高度会不一样。`)
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

// 切换展开/折叠状态
const toggleExpand = (index) => {
  const item = dataSource.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}

// 初始加载
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
      <div
        @click="toggleExpand(index)"
        style="
          padding: 20px;
          border-bottom: 1px solid #e4e7ed;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
        "
        :style="{ background: item.expanded ? '#f5f7fa' : '#fff' }"
      >
        <div
          style="
            font-weight: bold;
            font-size: 16px;
            color: #303133;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          {{ item.title }}
          <span style="font-size: 14px; color: #909399">{{ item.expanded ? '▼' : '▶' }}</span>
        </div>
        <div
          v-show="item.expanded"
          style="font-size: 14px; color: #606266; line-height: 1.8; margin-bottom: 10px"
        >
          {{ item.content }}
        </div>
      </div>
    </template>
    <template #loading>
      <div style="color: #409eff; font-size: 14px"><i class="el-icon-loading"></i> 加载中...</div>
    </template>
    <template #finished>
      <div style="color: #67c23a; font-size: 14px">✓ 全部加载完成</div>
    </template>
  </ml-virtual-list>
</template>
