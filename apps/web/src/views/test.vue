<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

// 组件 props 类型定义
const props = defineProps<{
  msg?: string
}>()

// 组件 emits 类型定义
// const emits = defineEmits<{
//   (event: 'click', data: string): void
// }>(['click'])

// 响应式数据
const count = ref(0)

// 生命周期钩子
onMounted(() => {
  console.log('Component mounted')
})

// 方法
const increment = () => {
  count.value++
  // emits('click', 'clicked')
}
</script>

<template>
  <div class="component-name">
    <el-button type="primary">Primary</el-button>
    <h1>{{ props.msg || 'Hello World' }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<style lang="scss" scoped></style>
