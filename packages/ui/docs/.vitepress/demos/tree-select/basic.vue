<template>
  <div class="demo-tree-select">
    <div class="demo-section">
      <h4>单选模式</h4>
      <ml-tree-select
        :tree-data="treeData"
        :default-selected-keys="['1']"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const treeData = [
  {
    id: '1',
    label: '一级 1',
    children: [
      {
        id: '1-1',
        label: '二级 1-1',
        children: [
          {
            id: '1-1-1',
            label: '三级 1-1-1'
          },
          {
            id: '1-1-2',
            label: '三级 1-1-2'
          }
        ]
      },
      {
        id: '1-2',
        label: '二级 1-2',
        children: [
          {
            id: '1-2-1',
            label: '三级 1-2-1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      {
        id: '2-1',
        label: '二级 2-1'
      },
      {
        id: '2-2',
        label: '二级 2-2'
      }
    ]
  },
  {
    id: '3',
    label: '一级 3'
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label || selectedData.map((d) => d.label).join(', ')}`)
}

const handleCancel = () => {
  ElMessage.info('已取消选择')
}
</script>

<style scoped>
.demo-tree-select {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.demo-section {
  flex: 1;
  min-width: 300px;
}

.demo-section h4 {
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}
</style>
