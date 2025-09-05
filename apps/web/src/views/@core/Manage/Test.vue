<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'

// 组件 props 类型定义
const props = defineProps<{
  msg?: string
}>()
</script>

<template>
  <div class="component-name">
    <h1>{{ 'Hello World' }}</h1>
    <slot name="aa"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
