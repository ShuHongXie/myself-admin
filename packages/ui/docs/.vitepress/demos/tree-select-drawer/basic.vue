<template>
  <div class="demo-tree-select-drawer">
    <el-button type="primary" @click="drawerVisible = true">打开树形选择抽屉</el-button>

    <ml-tree-select-drawer
      v-model="drawerVisible"
      title="选择部门"
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

const drawerVisible = ref(false)

const treeData = [
  {
    id: '1',
    label: '公司总部',
    children: [
      {
        id: '1-1',
        label: '研发中心',
        children: [
          {
            id: '1-1-1',
            label: '前端开发'
          },
          {
            id: '1-1-2',
            label: '后端开发'
          },
          {
            id: '1-1-3',
            label: '测试部'
          }
        ]
      },
      {
        id: '1-2',
        label: '产品中心',
        children: [
          {
            id: '1-2-1',
            label: '产品设计'
          },
          {
            id: '1-2-2',
            label: '用户运营'
          }
        ]
      },
      {
        id: '1-3',
        label: '市场中心'
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
      },
      {
        id: '2-2',
        label: '市场部'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
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
