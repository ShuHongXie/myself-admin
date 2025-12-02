<script setup>
import { ref } from 'vue'

// 生成无分页不等高数据
const generateData = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    const contentLength = Math.floor(Math.random() * 5) + 2
    const content = Array(contentLength)
      .fill(0)
      .map((_, idx) => `这是第 ${i} 条数据的第 ${idx + 1} 行内容，高度不固定。`)
      .join('')
    data.push({
      id: i,
      title: `不等高数据项 #${i}`,
      content,
      time: new Date().toLocaleString()
    })
  }
  return data
}

const dataSource = ref(generateData())
</script>

<template>
  <ml-virtual-list
    :height="500"
    :item-equal="false"
    :estimated-item-height="100"
    :data-source="dataSource"
  >
    <template #default="{ item }">
      <div style="padding: 20px; border-bottom: 1px solid #e4e7ed; background: #fff">
        <div style="font-weight: bold; font-size: 16px; color: #303133; margin-bottom: 10px">
          {{ item.title }}
        </div>
        <div style="font-size: 14px; color: #606266; line-height: 1.8; margin-bottom: 10px">
          {{ item.content }}
        </div>
        <div style="font-size: 12px; color: #909399; text-align: right">{{ item.time }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
