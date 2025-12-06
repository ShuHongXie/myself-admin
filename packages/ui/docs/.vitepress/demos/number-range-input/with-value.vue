<template>
  <div class="demo-number-range-input">
    <ml-number-range-input v-model="ageRange" label="年龄" />
    <p class="demo-result">当前值: {{ ageRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ageRange = ref([18, 60])
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
