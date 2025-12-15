<template>
  <div class="demo-tree-select">
    <ml-tree-select
      :tree-data="treeData"
      show-search
      placeholder="输入关键词进行搜索"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const treeData = [
  {
    id: '1',
    label: '产品部',
    children: [
      {
        id: '1-1',
        label: '产品经理',
        children: [
          {
            id: '1-1-1',
            label: '张三'
          },
          {
            id: '1-1-2',
            label: '李四'
          }
        ]
      },
      {
        id: '1-2',
        label: '设计师',
        children: [
          {
            id: '1-2-1',
            label: '王五'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '技术部',
    children: [
      {
        id: '2-1',
        label: '前端开发',
        children: [
          {
            id: '2-1-1',
            label: '赵六'
          }
        ]
      },
      {
        id: '2-2',
        label: '后端开发',
        children: [
          {
            id: '2-2-1',
            label: '钱七'
          }
        ]
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`已选择: ${selectedData.label}`)
}

const handleCancel = () => {
  ElMessage.info('已取消')
}

const handleInput = (value) => {
  console.log('搜索关键词:', value)
}
</script>

<style scoped>
.demo-tree-select {
  padding: 20px;
}
</style>
