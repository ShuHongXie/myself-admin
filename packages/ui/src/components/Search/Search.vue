<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits, toRefs } from 'vue'
import { searchProps } from './props'
import type { SearchModel } from './props'

const searchModel = reactive<SearchModel>({})

// 组件 props 类型定义
const props = defineProps(searchProps)
// const { inline, disabled, options } = toRefs(props)

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
    <el-form :model="searchModel" label-width="auto" style="max-width: 600px">
      <el-row :gutter="gutter">
        <template v-for="item in options" :key="item.prop">
          <el-col :span="item.span">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input v-if="item.type === 'input'" v-model="searchModel[item.prop]" />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
