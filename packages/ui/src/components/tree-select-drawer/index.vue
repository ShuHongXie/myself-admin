<script setup lang="ts" generic="T = any">
import { ref, watch, useAttrs, computed } from 'vue'
import type { TreeSelectDrawerProps } from './type'
import { drawerPropKeys } from './type'
import type { TreeSelectExpose } from '../tree-select/type'
import MlTreeSelect from '../tree-select/index.vue'
import { bem } from '../../utils'

defineOptions({
  name: 'MlTreeSelectDrawer'
})

// 使用 defineModel 双向绑定抽屉显示状态
const visible = defineModel<boolean>({ default: false })

// Props 定义
const props = withDefaults(defineProps<TreeSelectDrawerProps<T>>(), {
  title: '树形选择',
  size: '400px',
  direction: 'rtl',
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
  close: [] // 抽屉关闭事件
  input: [value: string] // 搜索输入事件
}>()

// 获取透传属性
const attrs = useAttrs()

// 过滤 Drawer 属性
const drawerAttrs = computed(() => {
  const result: Record<string, any> = {
    title: props.title,
    size: props.size,
    direction: props.direction
  }
  Object.keys(attrs).forEach((key) => {
    if (drawerPropKeys.includes(key)) {
      result[key] = attrs[key]
    }
  })
  return result
})

// 过滤 TreeSelect 属性
const treeSelectAttrs = computed(() => {
  const result: Record<string, any> = {
    treeProps: props.treeProps,
    multiple: props.multiple,
    defaultExpandAll: props.defaultExpandAll,
    defaultSelectedKeys: props.defaultSelectedKeys,
    nodeKey: props.nodeKey,
    showSearch: props.showSearch
  }
  Object.keys(attrs).forEach((key) => {
    if (!drawerPropKeys.includes(key) && !key.startsWith('on')) {
      result[key] = attrs[key]
    }
  })
  return result
})

// 树形选择组件引用
const treeSelectRef = ref<TreeSelectExpose>()

// 监听抽屉显示状态
watch(visible, (val) => {
  if (!val && treeSelectRef.value) {
    // 抽屉关闭时重置
    treeSelectRef.value.reset()
  }
})

// 抽屉关闭前回调
const handleBeforeClose = (done: () => void) => {
  visible.value = false
  done()
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
  <el-drawer
    v-model="visible"
    v-bind="drawerAttrs"
    :class="bem('tree-select-drawer')"
    :before-close="handleBeforeClose"
    @close="emit('close')"
  >
    <MlTreeSelect
      ref="treeSelectRef"
      :tree-data="treeData"
      v-bind="treeSelectAttrs"
      v-on="$attrs"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </el-drawer>
</template>
