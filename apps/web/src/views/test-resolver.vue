<script setup lang="ts">
import { ref } from 'vue'

console.log('测试页面加载')
</script>

<template>
  <div class="test-page">
    <h1>测试MyselfUiResolver</h1>
    <!-- 直接使用MsSearchTable组件 -->
    <MsSearchTable />
  </div>
</template>

<style lang="scss" scoped>
.test-page {
  padding: 20px;
}
</style>
