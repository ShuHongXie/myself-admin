<template>
  <div class="demo-button">
    <div class="demo-section">
      <p>默认防抖（1000ms）：快速点击只会触发一次</p>
      <ml-button type="primary" @click="handleDebounceClick">
        防抖按钮（点击次数：{{ clickCount }}）
      </ml-button>
    </div>

    <div class="demo-section">
      <p>自定义防抖时间（500ms）：</p>
      <ml-button type="success" :time="500" @click="handleCustomClick">
        500ms防抖（点击次数：{{ customCount }}）
      </ml-button>
    </div>

    <div class="demo-section">
      <p>禁用防抖：每次点击都会触发</p>
      <ml-button type="warning" :is-debounce="false" @click="handleNoDebounceClick">
        无防抖（点击次数：{{ noDebounceCount }}）
      </ml-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const clickCount = ref(0)
const customCount = ref(0)
const noDebounceCount = ref(0)

const handleDebounceClick = () => {
  clickCount.value++
  ElMessage.success(`防抖点击 ${clickCount.value}`)
}

const handleCustomClick = () => {
  customCount.value++
  ElMessage.success(`自定义防抖点击 ${customCount.value}`)
}

const handleNoDebounceClick = () => {
  noDebounceCount.value++
  ElMessage.success(`无防抖点击 ${noDebounceCount.value}`)
}
</script>

<style scoped>
.demo-button {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.demo-section p {
  margin-bottom: 10px;
  color: #606266;
}
</style>
