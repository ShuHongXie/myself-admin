<template>
  <div class="demo-number-range-input">
    <ml-number-range-input v-model="priceRange" label="价格" />
    <p class="demo-result">当前值: {{ priceRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const priceRange = ref([null, null])
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
