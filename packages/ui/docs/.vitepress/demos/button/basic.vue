<template>
  <div class="demo-button">
    <ml-button type="primary" @click="handleClick">主要按钮</ml-button>
    <ml-button type="success" @click="handleClick">成功按钮</ml-button>
    <ml-button type="info" @click="handleClick">信息按钮</ml-button>
    <ml-button type="warning" @click="handleClick">警告按钮</ml-button>
    <ml-button type="danger" @click="handleClick">危险按钮</ml-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('按钮被点击了')
}
</script>

<style scoped>
.demo-button {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
