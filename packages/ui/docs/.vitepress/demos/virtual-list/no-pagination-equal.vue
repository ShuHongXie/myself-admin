<script setup>
import { ref } from 'vue'

// 生成无分页数据
const generateData = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      title: `数据项 #${i}`,
      content: `这是第 ${i} 条数据，无需分页加载`
    })
  }
  return data
}

const dataSource = ref(generateData())
</script>

<template>
  <ml-virtual-list :height="500" :item-height="60" :item-equal="true" :data-source="dataSource">
    <template #default="{ item }">
      <div style="padding: 15px; border-bottom: 1px solid #eee; background: #fff">
        <div style="font-weight: bold; margin-bottom: 5px; color: #303133">{{ item.title }}</div>
        <div style="color: #909399; font-size: 12px">{{ item.content }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
