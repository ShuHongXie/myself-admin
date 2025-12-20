<template>
  <div class="demo-number-range-input">
    <ml-number-range-input v-model="range" label="价格" disabled />
    <p class="demo-result">当前值: {{ range }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const range = ref([100, 500])
</script>

<style scoped>
.demo-number-range-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-result {
  color: #606266;
  font-size: 14px;
  margin: 0;
}
</style>
