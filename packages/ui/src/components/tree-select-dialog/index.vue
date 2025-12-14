<script setup lang="ts" generic="T = any">
import { ref, computed, watch, nextTick } from 'vue'
import { ElTree, ElMessage } from 'element-plus'
import type { TreeSelectDialogProps } from './type'

// 使用 defineModel 双向绑定弹窗显示状态
const visible = defineModel<boolean>({ default: false })

// Props 定义
const props = withDefaults(defineProps<TreeSelectDialogProps<T>>(), {
  title: '树形选择',
  width: '500px',
  treeProps: () => ({ label: 'label', children: 'children' }),
  multiple: false,
  defaultExpandAll: true,
  defaultSelectedKeys: () => []
})

// 事件定义
const emit = defineEmits<{
  confirm: [selectedData: T | T[]] // 确认选择事件
  close: [] // 弹窗关闭事件
}>()

// 内部状态
const searchKeyword = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const selectedKeys = ref<any[]>([]) // 选中的节点key
const selectedData = ref<T | T[]>(props.multiple ? [] : ({} as T)) // 选中的节点数据

// 监听弹窗显示状态
watch(
  visible,
  (val) => {
    // 弹窗打开时初始化选中状态
    if (val) {
      selectedKeys.value = [...props.defaultSelectedKeys]
      nextTick(() => {
        if (treeRef.value) {
          // 设置树形选中状态
          if (props.multiple) {
            treeRef.value.setCheckedKeys(props.defaultSelectedKeys)
          } else {
            treeRef.value.setCurrentKey(props.defaultSelectedKeys[0])
          }
        }
      })
    }
  },
  { immediate: true }
)

// 过滤后的树形数据（根据搜索关键词）
const filteredTreeData = computed(() => {
  if (!searchKeyword.value) return props.treeData
  // 递归过滤树形节点
  const filterNode = (nodes: T[]): T[] => {
    return nodes
      .map((node) => {
        const children = filterNode((node as any).children || [])
        // 匹配当前节点或子节点有匹配的
        const isMatch = (node as any)[props.treeProps.label].includes(searchKeyword.value)
        if (isMatch || children.length > 0) {
          return { ...node, children }
        }
        return null
      })
      .filter(Boolean) as T[]
  }
  return filterNode(props.treeData)
})

// 搜索事件
const handleSearch = () => {
  // 搜索时可以做其他处理
}

// 多选时勾选变更
const handleCheckChange = (data: T, checked: boolean) => {
  if (checked) {
    selectedKeys.value.push((data as any).id)
    if (Array.isArray(selectedData.value)) {
      selectedData.value.push(data)
    }
  } else {
    selectedKeys.value = selectedKeys.value.filter((key) => key !== (data as any).id)
    if (Array.isArray(selectedData.value)) {
      selectedData.value = selectedData.value.filter((item: any) => item.id !== (data as any).id)
    }
  }
}

// 单选时节点点击
const handleNodeClick = (data: T) => {
  if (!props.multiple) {
    selectedKeys.value = [(data as any).id]
    selectedData.value = data
  }
}

// 弹窗关闭前回调
const handleBeforeClose = () => {
  visible.value = false
}

// 确认选择
const handleConfirm = () => {
  if (selectedKeys.value.length === 0) {
    ElMessage.warning('请选择至少一个节点')
    return
  }
  emit('confirm', selectedData.value)
  visible.value = false
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :before-close="handleBeforeClose"
    @close="emit('close')"
  >
    <!-- 搜索框 -->
    <el-input
      v-model="searchKeyword"
      placeholder="请输入关键词搜索"
      clearable
      prefix-icon="el-icon-search"
      style="margin-bottom: 16px"
      @input="handleSearch"
    />

    <!-- 树形选择 -->
    <el-tree
      ref="treeRef"
      :data="filteredTreeData as any"
      :props="treeProps"
      :show-checkbox="multiple"
      :default-expand-all="defaultExpandAll"
      node-key="id"
      @check-change="handleCheckChange"
      @node-click="handleNodeClick"
    />

    <!-- 底部按钮 -->
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
