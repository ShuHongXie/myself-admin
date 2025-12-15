<template>
  <div class="demo-tree-select-dialog">
    <el-button type="success" @click="dialogVisible = true">多选对话框</el-button>

    <ml-tree-select-dialog
      v-model="dialogVisible"
      title="选择权限"
      :tree-data="treeData"
      :multiple="true"
      :default-selected-keys="['1-1', '2-1']"
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
    label: '系统管理',
    children: [
      {
        id: '1-1',
        label: '用户管理',
        children: [
          {
            id: '1-1-1',
            label: '添加用户'
          },
          {
            id: '1-1-2',
            label: '删除用户'
          }
        ]
      },
      {
        id: '1-2',
        label: '角色管理'
      }
    ]
  },
  {
    id: '2',
    label: '业务管理',
    children: [
      {
        id: '2-1',
        label: '订单管理'
      },
      {
        id: '2-2',
        label: '商品管理'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  const names = selectedData.map((d) => d.label).join(', ')
  ElMessage.success(`选择了 ${selectedData.length} 项: ${names}`)
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
