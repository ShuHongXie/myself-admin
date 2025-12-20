<template>
  <div class="demo-tree-select-drawer">
    <el-button type="primary" @click="drawerVisible = true">打开多选抽屉</el-button>

    <ml-tree-select-drawer
      v-model="drawerVisible"
      title="选择权限（多选）"
      :tree-data="treeData"
      multiple
      size="500px"
      :default-selected-keys="['1', '1-1']"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const drawerVisible = ref(false)

const treeData = [
  {
    id: '1',
    label: '用户管理',
    children: [
      {
        id: '1-1',
        label: '用户列表'
      },
      {
        id: '1-2',
        label: '用户新增'
      },
      {
        id: '1-3',
        label: '用户编辑'
      }
    ]
  },
  {
    id: '2',
    label: '角色管理',
    children: [
      {
        id: '2-1',
        label: '角色列表'
      },
      {
        id: '2-2',
        label: '角色配置'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  const labels = selectedData.map((d) => d.label).join(', ')
  ElMessage.success(`已选择: ${labels}`)
}
</script>

<style scoped>
.demo-tree-select-drawer {
  padding: 20px;
}
</style>
