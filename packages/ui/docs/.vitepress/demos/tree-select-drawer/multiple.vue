<template>
  <div class="demo-tree-select-drawer">
    <el-button type="success" @click="drawerVisible = true">多选抽屉</el-button>

    <ml-tree-select-drawer
      v-model="drawerVisible"
      title="批量分配权限"
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

const drawerVisible = ref(false)

const treeData = [
  {
    id: '1',
    label: '权限管理',
    children: [
      {
        id: '1-1',
        label: '用户权限',
        children: [
          {
            id: '1-1-1',
            label: '查看用户'
          },
          {
            id: '1-1-2',
            label: '编辑用户'
          },
          {
            id: '1-1-3',
            label: '删除用户'
          }
        ]
      },
      {
        id: '1-2',
        label: '角色权限',
        children: [
          {
            id: '1-2-1',
            label: '配置角色'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '内容管理',
    children: [
      {
        id: '2-1',
        label: '文章管理'
      },
      {
        id: '2-2',
        label: '分类管理'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  const names = selectedData.map((d) => d.label).join(', ')
  ElMessage.success(`已分配 ${selectedData.length} 项权限: ${names}`)
  drawerVisible.value = false
}

const handleClose = () => {
  ElMessage.info('抽屉已关闭')
}
</script>

<style scoped>
.demo-tree-select-drawer {
  padding: 20px;
}
</style>
