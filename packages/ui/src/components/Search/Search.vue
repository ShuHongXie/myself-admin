<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

// 组件 props 类型定义
const props = defineProps<{
  msg?: string
}>()

// 组件 emits 类型定义
const emits = defineEmits<{
  (event: 'click', data: string): void
}>()

// 响应式数据
const count = ref(0)
const state = reactive({
  list: [] as string[]
})

// 生命周期钩子
onMounted(() => {
  console.log('Component mounted')
})

// 方法
const increment = () => {
  count.value++
  emits('click', 'clicked')
}
</script>

<template>
  <div class="search">
    通用搜索组件
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
