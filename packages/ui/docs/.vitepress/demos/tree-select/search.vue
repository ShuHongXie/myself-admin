<template>
  <div class="demo-tree-select">
    <div class="demo-section">
      <h4>搜索功能</h4>
      <ml-tree-select
        :tree-data="treeData"
        :show-search="true"
        placeholder="搜索节点..."
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
    label: '用户管理',
    children: [
      {
        id: '1-1',
        label: '用户列表',
        children: [
          {
            id: '1-1-1',
            label: '用户详情'
          },
          {
            id: '1-1-2',
            label: '用户编辑'
          }
        ]
      },
      {
        id: '1-2',
        label: '角色管理',
        children: [
          {
            id: '1-2-1',
            label: '角色列表'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '权限管理',
    children: [
      {
        id: '2-1',
        label: '权限配置'
      },
      {
        id: '2-2',
        label: '菜单管理'
      }
    ]
  },
  {
    id: '3',
    label: '系统设置'
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
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
