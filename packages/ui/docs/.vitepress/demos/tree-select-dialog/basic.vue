<template>
  <div class="demo-tree-select-dialog">
    <el-button type="primary" @click="dialogVisible = true">打开树形选择对话框</el-button>

    <ml-tree-select-dialog
      v-model="dialogVisible"
      title="选择部门"
      :tree-data="treeData"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

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
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`已选择: ${selectedData.label}`)
}
</script>

<style scoped>
.demo-tree-select-dialog {
  padding: 20px;
}
</style>
