<template>
  <div class="demo-tree-select-dialog">
    <el-button type="primary" @click="dialogVisible = true">打开树形选择对话框</el-button>

    <ml-tree-select-dialog
      v-model="dialogVisible"
      title="选择组织结构"
      :tree-data="treeData"
      :default-selected-keys="['1-1']"
      @confirm="handleConfirm"
      @close="handleClose"
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
    label: '总公司',
    children: [
      {
        id: '1-1',
        label: '技术部',
        children: [
          {
            id: '1-1-1',
            label: '前端组'
          },
          {
            id: '1-1-2',
            label: '后端组'
          }
        ]
      },
      {
        id: '1-2',
        label: '市场部',
        children: [
          {
            id: '1-2-1',
            label: '策划组'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '分公司',
    children: [
      {
        id: '2-1',
        label: '销售部'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
  dialogVisible.value = false
}

const handleClose = () => {
  ElMessage.info('对话框已关闭')
}
</script>

<style scoped>
.demo-tree-select-dialog {
  padding: 20px;
}
</style>
