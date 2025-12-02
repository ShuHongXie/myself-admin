<script setup lang="ts">
import { ref } from 'vue'
import testSearch from './preview/testSearch.vue'
import virtualList from './components/virtual-list/index.vue'
// import virtualListPagination from './components/virtual-list/pagination.vue'
import itemEqualPagination from './components/virtual-list/index.vue'

// 分页加载相关状态
const paginationDataSource = ref<any[]>([])
const paginationLoading = ref(false)
const paginationFinished = ref(false)
const currentPage = ref(0)
const pageSize = 20
const totalCount = 1000

// 模拟从服务器加载数据
const loadMoreData = async () => {
  if (paginationLoading.value || paginationFinished.value) return

  paginationLoading.value = true
  currentPage.value++

  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = currentPage.value * pageSize

  if (startIndex >= totalCount) {
    paginationFinished.value = true
    paginationLoading.value = false
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

  paginationDataSource.value.push(...pageData)
  paginationLoading.value = false

  if (endIndex >= totalCount) {
    paginationFinished.value = true
  }
}

// 初始加载
loadMoreData()

// 不等高分页加载相关状态
const unequalDataSource = ref<any[]>([])
const unequalLoading = ref(false)
const unequalFinished = ref(false)
const unequalCurrentPage = ref(0)
const unequalPageSize = 20
const unequalTotalCount = 500

// 不等高数据加载
const loadUnequalData = async () => {
  if (unequalLoading.value || unequalFinished.value) return

  unequalLoading.value = true
  unequalCurrentPage.value++

  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (unequalCurrentPage.value - 1) * unequalPageSize
  const endIndex = unequalCurrentPage.value * unequalPageSize

  if (startIndex >= unequalTotalCount) {
    unequalFinished.value = true
    unequalLoading.value = false
    return
  }

  const pageData = Array.from({ length: unequalPageSize }, (_, i) => {
    const index = startIndex + i
    if (index >= unequalTotalCount) return null
    // 随机生成不同长度的内容
    const contentLength = Math.floor(Math.random() * 8) + 3
    const content = Array(contentLength)
      .fill(0)
      .map(
        (_, idx) =>
          `这是第 ${index} 条数据的第 ${idx + 1} 行内容，高度会不一样。内容长度随机生成，有的很长有的很短，用于测试不等高虚拟列表的效果。`
      )
      .join('')
    return {
      id: index,
      title: `不等高数据项 #${index}`,
      content,
      expanded: false, // 添加展开/折叠状态
      time: new Date().toLocaleString()
    }
  }).filter(Boolean)

  unequalDataSource.value.push(...pageData)
  unequalLoading.value = false

  if (endIndex >= unequalTotalCount) {
    unequalFinished.value = true
  }
}

// 切换展开/折叠状态
const toggleExpand = (index: number) => {
  const item = unequalDataSource.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}

// 初始加载不等高数据
loadUnequalData()

// 创建自定义数据源示例
const customDataList = ref<any[]>([])

const generateCustomData = (count: number) => {
  const types = ['success', 'info', 'warning', 'danger']
  const statuses = ['已完成', '进行中', '待处理', '已取消']
  const result = []

  for (let i = 0; i < count; i++) {
    const typeIndex = Math.floor(Math.random() * types.length)
    // 随机生成不同长度的内容，产生不同高度
    const contentLength = Math.floor(Math.random() * 5) + 1
    const content = Array(contentLength)
      .fill(0)
      .map((_, idx) => `这是第 ${i} 条数据的第 ${idx + 1} 行内容`)
      .join('，')

    result.push({
      id: i,
      type: types[typeIndex],
      status: statuses[typeIndex],
      title: `任务项 #${i}`,
      content,
      time: new Date().toLocaleString()
    })
  }
  return result
}

// 初始化 2000 条自定义数据
customDataList.value = generateCustomData(2000)

// 无分页模式数据源
const noPaginationData = ref<any[]>([])

// 生成无分页数据
const generateNoPaginationData = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      title: `无分页数据项 #${i}`,
      content: `这是第 ${i} 条数据，无需分页加载`,
      time: new Date().toLocaleString()
    })
  }
  return data
}

noPaginationData.value = generateNoPaginationData()
</script>

<template>
  <div class="app-container"></div>
</template>

<style lang="scss">
@import './style/index.scss';
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section h2 {
  margin-bottom: 30px;
  color: #303133;
  font-size: 28px;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.example-box {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.example-box h3 {
  margin: 0 0 8px 0;
  color: #409eff;
  font-size: 20px;
}

.desc {
  margin: 0 0 16px 0;
  color: #909399;
  font-size: 14px;
}

/* 自定义列表项样式 */
.custom-item {
  padding: 16px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.3s;
  cursor: pointer;
}

.custom-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-color: #409eff;
  transform: translateY(-2px);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title {
  font-weight: bold;
  font-size: 16px;
  color: #303133;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.success {
  background-color: #f0f9ff;
  color: #67c23a;
  border: 1px solid #b3e19d;
}

.status-badge.info {
  background-color: #f4f4f5;
  color: #909399;
  border: 1px solid #d3d4d6;
}

.status-badge.warning {
  background-color: #fdf6ec;
  color: #e6a23c;
  border: 1px solid #f5dab1;
}

.status-badge.danger {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fbc4c4;
}

.item-body {
  margin-bottom: 12px;
}

.item-body p {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.8;
  word-break: break-all;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f2f6fc;
}

.item-time,
.item-id {
  font-size: 12px;
  color: #909399;
}

.item-id {
  font-family: 'Courier New', monospace;
}

/* 不等高列表项样式 */
.unequal-item {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  transition: all 0.2s;
}

.unequal-item:hover {
  background-color: #f5f7fa;
}

.unequal-item-title {
  font-weight: bold;
  font-size: 18px;
  color: #303133;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.expand-icon {
  font-size: 14px;
  color: #909399;
  transition: transform 0.3s;
}

.unequal-item-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.8;
  margin-bottom: 12px;
  word-wrap: break-word;
}

.unequal-item-footer {
  font-size: 12px;
  color: #909399;
  text-align: right;
}
</style>
