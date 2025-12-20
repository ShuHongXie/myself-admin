<template>
  <div class="demo-section">
    <div class="demo-item">
      <h4>大尺寸 + 可清空</h4>
      <ml-number-range-input
        v-model="range1"
        label="数量"
        :input-props="{
          size: 'large',
          clearable: true
        }"
      />
      <p class="demo-result">当前值: {{ range1 }}</p>
    </div>

    <div class="demo-item">
      <h4>自定义占位符</h4>
      <ml-number-range-input
        v-model="range2"
        label="价格"
        :min-input-props="{ placeholder: '最低价' }"
        :max-input-props="{ placeholder: '最高价' }"
      />
      <p class="demo-result">当前值: {{ range2 }}</p>
    </div>

    <div class="demo-item">
      <h4>自定义分隔符</h4>
      <ml-number-range-input v-model="range3" label="金额" separator="-" />
      <p class="demo-result">当前值: {{ range3 }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const range1 = ref([null, null])
const range2 = ref([null, null])
const range3 = ref([null, null])
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
