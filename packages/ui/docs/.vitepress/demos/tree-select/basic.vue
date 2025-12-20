<template>
  <div class="demo-tree-select">
    <ml-tree-select :tree-data="treeData" @confirm="handleConfirm" @cancel="handleCancel" />
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const treeData = [
  {
    id: '1',
    label: '一级节点 1',
    children: [
      {
        id: '1-1',
        label: '二级节点 1-1',
        children: [
          {
            id: '1-1-1',
            label: '三级节点 1-1-1'
          }
        ]
      },
      {
        id: '1-2',
        label: '二级节点 1-2'
      }
    ]
  },
  {
    id: '2',
    label: '一级节点 2',
    children: [
      {
        id: '2-1',
        label: '二级节点 2-1'
      },
      {
        id: '2-2',
        label: '二级节点 2-2'
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
</script>

<style scoped>
.demo-tree-select {
  padding: 20px;
}
</style>
