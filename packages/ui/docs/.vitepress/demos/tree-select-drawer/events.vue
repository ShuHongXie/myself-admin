<template>
  <div class="demo-tree-select-drawer">
    <el-button type="primary" @click="drawerVisible = true">打开抽屉测试事件</el-button>

    <div class="event-log">
      <h4>事件日志：</h4>
      <div class="log-list">
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
    </div>

    <ml-tree-select-drawer
      v-model="drawerVisible"
      title="事件透传示例"
      :tree-data="treeData"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      @current-change="handleCurrentChange"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      @confirm="handleConfirm"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const drawerVisible = ref(false)
const eventLogs = ref([])

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

const addLog = (message) => {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${message}`)
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

// el-tree 的 node-click 事件
const handleNodeClick = (data, node, instance) => {
  addLog(`节点点击: ${data.label}`)
  ElMessage.success(`点击了节点: ${data.label}`)
}

// el-tree 的 check-change 事件
const handleCheckChange = (data, checked, indeterminate) => {
  addLog(`勾选变更: ${data.label} - ${checked ? '选中' : '取消'}`)
}

// el-tree 的 current-change 事件
const handleCurrentChange = (data, node) => {
  if (data) {
    addLog(`当前节点变更: ${data.label}`)
  }
}

// el-tree 的 node-expand 事件
const handleNodeExpand = (data, node, instance) => {
  addLog(`节点展开: ${data.label}`)
}

// el-tree 的 node-collapse 事件
const handleNodeCollapse = (data, node, instance) => {
  addLog(`节点收起: ${data.label}`)
}

const handleConfirm = (selectedData) => {
  const label = selectedData.label || selectedData.map((d) => d.label).join(', ')
  addLog(`确认选择: ${label}`)
  ElMessage.success(`已选择: ${label}`)
  drawerVisible.value = false
}

const handleClose = () => {
  addLog('抽屉关闭')
}
</script>

<style scoped>
.demo-tree-select-drawer {
  padding: 20px;
}

.event-log {
  margin-top: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.event-log h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  padding: 5px 0;
  font-size: 12px;
  color: #606266;
  border-bottom: 1px solid #e4e7ed;
}

.log-item:last-child {
  border-bottom: none;
}
</style>
