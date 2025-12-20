<template>
  <div class="demo-section">
    <div class="demo-item">
      <h4>前缀/后缀插槽</h4>
      <ml-number-range-input v-model="salaryRange" label="薪资">
        <template #min-prefix>
          <span style="padding: 0 8px">￥</span>
        </template>
        <template #max-suffix>
          <span style="padding: 0 8px">K</span>
        </template>
      </ml-number-range-input>
      <p class="demo-result">当前值: {{ salaryRange }}</p>
    </div>

    <div class="demo-item">
      <h4>前置/后置内容插槽</h4>
      <ml-number-range-input v-model="percentRange" label="百分比">
        <template #min-append>%</template>
        <template #max-append>%</template>
      </ml-number-range-input>
      <p class="demo-result">当前值: {{ percentRange }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const salaryRange = ref([null, null])
const percentRange = ref([0, 100])
</script>

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.demo-item h4 {
  margin: 0;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}
.demo-result {
  color: #909399;
  font-size: 13px;
  margin: 0;
}
</style>
