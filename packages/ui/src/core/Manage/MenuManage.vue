<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'

// 组件 emits 类型定义
const emits = defineEmits<{
  (event: 'click', data: string): void
}>()
</script>

<template>
  <div class="user-manage">用户管理</div>
</template>

<style lang="scss" scoped></style>
