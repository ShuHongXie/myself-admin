<template>
  <div class="demo-button">
    <ml-button type="primary" tip="这是一个提示信息" @click="handleClick"> 悬停查看提示 </ml-button>

    <ml-button type="success" tip="提示在右侧显示" placement="right" @click="handleClick">
      右侧提示
    </ml-button>

    <ml-button
      type="warning"
      tip="这是一个很长的提示信息，用来演示提示框的换行效果"
      placement="top"
      :tip-props="{ effect: 'dark', popperClass: 'custom-tooltip' }"
      @click="handleClick"
    >
      自定义提示样式
    </ml-button>
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
  align-items: center;
}
</style>
