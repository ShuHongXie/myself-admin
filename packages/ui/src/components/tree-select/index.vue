<script setup lang="ts" generic="T = any">
import { ref, computed, watch, nextTick } from 'vue'
import { ElTree, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { bem } from '../../utils'

import type { TreeSelectProps, TreeSelectExpose } from './type'

defineOptions({
  name: 'MlTreeSelect'
})

// Props 定义
const props = withDefaults(defineProps<TreeSelectProps<T>>(), {
  treeProps: () => ({ label: 'label', children: 'children' }),
  multiple: false,
  defaultExpandAll: true,
  defaultSelectedKeys: () => [],
  nodeKey: 'id',
  showSearch: true,
  placeholder: '请输入关键词搜索'
})

// 事件定义
const emit = defineEmits<{
  confirm: [selectedData: T | T[]] // 确认选择事件
  cancel: [] // 取消事件
  input: [value: string] // 搜索输入事件
}>()

// 搜索关键词双向绑定
const searchKeyword = defineModel<string>('searchText', { default: '' })

// 内部状态
const treeRef = ref<InstanceType<typeof ElTree>>()
const selectedKeys = ref<any[]>([]) // 选中的节点key
const selectedData = ref<T | T[]>(props.multiple ? [] : ({} as T)) // 选中的节点数据

// 初始化选中状态
const initSelection = () => {
  selectedKeys.value = [...props.defaultSelectedKeys]
  nextTick(() => {
    if (treeRef.value) {
      if (props.multiple) {
        treeRef.value.setCheckedKeys(props.defaultSelectedKeys)
      } else {
        treeRef.value.setCurrentKey(props.defaultSelectedKeys[0])
      }
    }
  })
}

// 监听 defaultSelectedKeys 变化
watch(
  () => props.defaultSelectedKeys,
  () => {
    initSelection()
  },
  { immediate: true }
)

// 过滤后的树形数据（根据搜索关键词）
const filteredTreeData = computed<any[]>(() => {
  if (!searchKeyword.value) return props.treeData
  // 递归过滤树形节点
  const filterNode = (nodes: T[]): T[] => {
    return nodes
      .map((node) => {
        const children = filterNode((node as any)[props.treeProps.children || 'children'] || [])
        // 匹配当前节点或子节点有匹配的
        const isMatch = (node as any)[props.treeProps.label || 'label'].includes(
          searchKeyword.value
        )
        if (isMatch || children.length > 0) {
          return { ...node, [props.treeProps.children || 'children']: children }
        }
        return null
      })
      .filter(Boolean) as T[]
  }
  return filterNode(props.treeData)
})

// 多选时勾选变更
const handleCheckChange = (data: T, checked: boolean) => {
  const nodeKeyField = props.nodeKey
  if (checked) {
    selectedKeys.value.push((data as any)[nodeKeyField])
    if (Array.isArray(selectedData.value)) {
      selectedData.value.push(data)
    }
  } else {
    selectedKeys.value = selectedKeys.value.filter((key) => key !== (data as any)[nodeKeyField])
    if (Array.isArray(selectedData.value)) {
      selectedData.value = selectedData.value.filter(
        (item: any) => item[nodeKeyField] !== (data as any)[nodeKeyField]
      )
    }
  }
}

// 单选时节点点击
const handleNodeClick = (data: T) => {
  if (!props.multiple) {
    const nodeKeyField = props.nodeKey
    selectedKeys.value = [(data as any)[nodeKeyField]]
    selectedData.value = data
  }
}

// 重置选择
const reset = () => {
  searchKeyword.value = ''
  selectedKeys.value = []
  selectedData.value = props.multiple ? [] : ({} as T)
  if (treeRef.value) {
    if (props.multiple) {
      treeRef.value.setCheckedKeys([])
    } else {
      treeRef.value.setCurrentKey(undefined)
    }
  }
}

// 获取选中数据
const getSelectedData = () => selectedData.value

// 获取选中keys
const getSelectedKeys = () => selectedKeys.value

// 确认选择
const handleConfirm = () => {
  if (selectedKeys.value.length === 0) {
    ElMessage.warning('请选择至少一个节点')
    return
  }
  emit('confirm', selectedData.value)
}

// 取消
const handleCancel = () => {
  emit('cancel')
}

// 暴露方法
defineExpose<TreeSelectExpose>({
  reset,
  getSelectedData,
  getSelectedKeys,
  // el-tree 方法透传
  getCheckedNodes: () => treeRef.value?.getCheckedNodes() || [],
  getCheckedKeys: () => treeRef.value?.getCheckedKeys() || [],
  getHalfCheckedNodes: () => treeRef.value?.getHalfCheckedNodes() || [],
  getHalfCheckedKeys: () => treeRef.value?.getHalfCheckedKeys() || [],
  getCurrentKey: () => treeRef.value?.getCurrentKey() ?? undefined,
  getCurrentNode: () => treeRef.value?.getCurrentNode(),
  setCheckedKeys: (keys: any[]) => treeRef.value?.setCheckedKeys(keys),
  setCheckedNodes: (nodes: any[]) => treeRef.value?.setCheckedNodes(nodes),
  setCurrentKey: (key: string | number | undefined) => treeRef.value?.setCurrentKey(key),
  setCurrentNode: (node: any) => treeRef.value?.setCurrentNode(node),
  getNode: (key: string | number) => treeRef.value?.getNode(key),
  filter: (value: string) => treeRef.value?.filter(value),
  updateKeyChildren: (key: string | number, children: any[]) =>
    treeRef.value?.updateKeyChildren(key, children),
  remove: (node: any) => treeRef.value?.remove(node),
  append: (data: any, parentNode?: any) => treeRef.value?.append(data, parentNode),
  insertBefore: (data: any, refNode: any) => treeRef.value?.insertBefore(data, refNode),
  insertAfter: (data: any, refNode: any) => treeRef.value?.insertAfter(data, refNode),
  //
  input: (value: string) => emit('input', value)
})
</script>

<template>
  <div :class="bem('tree-select')">
    <!-- 搜索框 -->
    <el-input
      v-if="showSearch"
      v-model="searchKeyword"
      :placeholder="placeholder"
      clearable
      :prefix-icon="Search"
      :class="bem('tree-select', 'search')"
      @input="(value: string) => emit('input', value)"
    />

    <!-- 树形选择 -->
    <div :class="bem('tree-select', 'tree')">
      <el-tree
        ref="treeRef"
        :data="filteredTreeData"
        :props="treeProps"
        :show-checkbox="multiple"
        :default-expand-all="defaultExpandAll"
        :expand-on-click-node="expandOnClickNode"
        :node-key="nodeKey"
        @check-change="handleCheckChange"
        @node-click="handleNodeClick"
        v-bind="$attrs"
        v-on="$attrs"
      />
    </div>

    <!-- 底部按钮插槽 -->
    <div :class="bem('tree-select', 'footer')">
      <slot name="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </slot>
    </div>
  </div>
</template>
