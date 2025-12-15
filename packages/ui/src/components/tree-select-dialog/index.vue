<script setup lang="ts" generic="T = any">
import { ref, watch, useAttrs, computed } from 'vue'
import MlTreeSelect from '../tree-select'
import type { TreeSelectDialogProps } from './type'
import { dialogPropKeys } from './type'
import type { TreeSelectExpose } from '../tree-select/type'
import { bem } from '../../utils'

defineOptions({
  name: 'MlTreeSelectDialog'
})

// 使用 defineModel 双向绑定弹窗显示状态
const visible = defineModel<boolean>({ default: false })

// Props 定义
const props = withDefaults(defineProps<TreeSelectDialogProps<T>>(), {
  title: '树形选择',
  width: '500px',
  treeProps: () => ({ label: 'label', children: 'children' }),
  multiple: false,
  defaultExpandAll: true,
  defaultSelectedKeys: () => [],
  nodeKey: 'id',
  showSearch: true
})

// 事件定义
const emit = defineEmits<{
  confirm: [selectedData: T | T[]] // 确认选择事件
  close: [] // 弹窗关闭事件
  input: [value: string] // 搜索输入事件
}>()

// 获取透传属性
const attrs = useAttrs()

// 过滤 Dialog 属性
const dialogAttrs = computed(() => {
  const result: Record<string, any> = {
    title: props.title,
    width: props.width
  }
  Object.keys(attrs).forEach((key) => {
    if (dialogPropKeys.includes(key)) {
      result[key] = attrs[key]
    }
  })
  return result
})

// 过滤 TreeSelect 属性
const treeSelectAttrs = computed(() => {
  const result: Record<string, any> = {
    treeData: props.treeData,
    treeProps: props.treeProps,
    multiple: props.multiple,
    defaultExpandAll: props.defaultExpandAll,
    defaultSelectedKeys: props.defaultSelectedKeys,
    nodeKey: props.nodeKey,
    showSearch: props.showSearch
  }
  Object.keys(attrs).forEach((key) => {
    if (!dialogPropKeys.includes(key) && !key.startsWith('on')) {
      result[key] = attrs[key]
    }
  })
  return result
})

// 树形选择组件引用
const treeSelectRef = ref<TreeSelectExpose>()

// 监听弹窗显示状态
watch(visible, (val) => {
  if (!val && treeSelectRef.value) {
    // 弹窗关闭时重置
    treeSelectRef.value.reset()
  }
})

// 弹窗关闭前回调
const handleBeforeClose = () => {
  visible.value = false
}

// 确认选择
const handleConfirm = (selectedData: T | T[]) => {
  emit('confirm', selectedData)
  visible.value = false
}

// 取消
const handleCancel = () => {
  visible.value = false
}

// 暴露方法
defineExpose<{
  input: (value: string) => void
}>({
  input: (value: string) => emit('input', value)
})
</script>

<template>
  <el-dialog
    v-model="visible"
    v-bind="dialogAttrs"
    :class="bem('tree-select-dialog')"
    :before-close="handleBeforeClose"
    @close="emit('close')"
  >
    <MlTreeSelect
      ref="treeSelectRef"
      :tree-data="props.treeData"
      v-bind="treeSelectAttrs"
      v-on="$attrs"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </el-dialog>
</template>
