<script setup lang="ts">
import { ref } from 'vue'
import testSearch from './preview/testSearch.vue'
import virtualList from './components/virtual-list/index.vue'

// 创建自定义数据源示例
const customDataList = ref<any[]>([])

const generateCustomData = (count: number) => {
  const types = ['success', 'info', 'warning', 'danger']
  const statuses = ['已完成', '进行中', '待处理', '已取消']
  const result = []

  for (let i = 0; i < count; i++) {
    const typeIndex = Math.floor(Math.random() * types.length)
    result.push({
      id: i,
      type: types[typeIndex],
      status: statuses[typeIndex],
      title: `任务项 #${i}`,
      content: `这是第 ${i} 条数据的详细内容描述`,
      time: new Date().toLocaleString()
    })
  }
  return result
}

// 初始化 2000 条自定义数据
customDataList.value = generateCustomData(2000)
</script>

<template>
  <div class="app-container">
    <!-- <testSearch></testSearch> -->

    <div class="demo-section">
      <h2>虚拟列表示例</h2>

      <!-- 示例1: 默认使用（4000条测试数据） -->
      <div class="example-box">
        <h3>示例1：默认虚拟列表（4000条数据）</h3>
        <p class="desc">不传任何参数，默认生成4000条测试数据</p>
        <virtualList></virtualList>
      </div>

      <!-- 示例2: 自定义数据源和样式 -->
      <div class="example-box">
        <h3>示例2：自定义数据源（2000条数据）</h3>
        <p class="desc">传入自定义数据，使用 slot 自定义列表项样式</p>
        <virtualList :data-source="customDataList" :height="600" :item-height="100">
          <template #default="{ item }">
            <div class="custom-item">
              <div class="item-header">
                <span class="item-title">{{ item.title }}</span>
                <span :class="['status-badge', item.type]">{{ item.status }}</span>
              </div>
              <div class="item-body">
                <p>{{ item.content }}</p>
              </div>
              <div class="item-footer">
                <span class="item-time">{{ item.time }}</span>
                <span class="item-id">ID: {{ item.id }}</span>
              </div>
            </div>
          </template>
        </virtualList>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  line-height: 1.6;
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
</style>
