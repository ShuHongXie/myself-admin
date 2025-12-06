<script setup lang="ts">
import { ref } from 'vue'
import { MlNumberRangeInput } from '../index'
import { ElMessage } from 'element-plus'

// 基础示例
const priceRange = ref<[number | null, number | null]>([null, null])

// 带初始值的示例
const ageRange = ref<[number | null, number | null]>([18, 60])

// 自定义属性示例
const quantityRange = ref<[number | null, number | null]>([null, null])

// 带插槽的示例
const salaryRange = ref<[number | null, number | null]>([null, null])

const handleSubmit = () => {
  ElMessage.success(
    `价格范围: ${priceRange.value[0]} - ${priceRange.value[1]}\n` +
      `年龄范围: ${ageRange.value[0]} - ${ageRange.value[1]}\n` +
      `数量范围: ${quantityRange.value[0]} - ${quantityRange.value[1]}\n` +
      `薪资范围: ${salaryRange.value[0]} - ${salaryRange.value[1]}`
  )
}
</script>

<template>
  <div class="test-range-input">
    <h2>数值范围输入框组件测试</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>1. 基础用法</h3>
      <ml-number-range-input v-model="priceRange" label="价格" />
      <p>当前值: {{ priceRange }}</p>
    </div>

    <!-- 带初始值 -->
    <div class="demo-section">
      <h3>2. 带初始值</h3>
      <ml-number-range-input v-model="ageRange" label="年龄" />
      <p>当前值: {{ ageRange }}</p>
    </div>

    <!-- 自定义属性 -->
    <div class="demo-section">
      <h3>3. 自定义属性（大尺寸、可清空）</h3>
      <ml-number-range-input
        v-model="quantityRange"
        label="数量"
        :input-props="{
          size: 'large',
          clearable: true
        }"
      />
      <p>当前值: {{ quantityRange }}</p>
    </div>

    <!-- 分别设置最小值和最大值属性 -->
    <div class="demo-section">
      <h3>4. 分别设置属性</h3>
      <ml-number-range-input
        v-model="quantityRange"
        label="数量"
        :min-input-props="{ placeholder: '最小值' }"
        :max-input-props="{ placeholder: '最大值' }"
      />
    </div>

    <!-- 带插槽 -->
    <div class="demo-section">
      <h3>5. 带插槽（前缀/后缀）</h3>
      <ml-number-range-input v-model="salaryRange" label="薪资">
        <template #min-prefix>
          <span style="padding: 0 8px">￥</span>
        </template>
        <template #max-suffix>
          <span style="padding: 0 8px">K</span>
        </template>
      </ml-number-range-input>
      <p>当前值: {{ salaryRange }}</p>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>6. 禁用状态</h3>
      <ml-number-range-input v-model="priceRange" label="价格" disabled />
    </div>

    <!-- 提交按钮 -->
    <div class="demo-section">
      <el-button type="primary" @click="handleSubmit">查看所有值</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-range-input {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    margin-bottom: 30px;
    color: #333;
  }

  .demo-section {
    margin-bottom: 30px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #606266;
      font-size: 16px;
    }

    p {
      margin-top: 10px;
      color: #909399;
      font-size: 14px;
    }
  }
}
</style>
