<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits, toRefs, getCurrentInstance } from 'vue'
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
  const instance = getCurrentInstance()
  console.log('instance:', instance)
  console.log('Component mounted')
})
</script>

<template>
  <div class="search">
    <el-form :model="searchModel" :label-width="labelWidth">
      <el-row :gutter="gutter">
        <el-col :span="span">
          <slot name="formItem"> </slot>
        </el-col>
        <template v-for="item in options" :key="item.prop">
          <el-col :span="span" v-bind="item.colProps">
            <el-form-item v-bind="item.formItemProps" :prop="item.prop">
              <!-- 输入框 -->
              <el-input
                v-bind="item.inputProps"
                v-if="item.inputProps.type === 'input'"
                v-model="searchModel[item.prop]"
              />
              <!-- 筛选框 -->
              <el-select
                v-if="item.inputProps.type === 'select'"
                v-model="searchModel[item.prop]"
                v-bind="item.inputProps"
                style="width: 100%"
              >
                <el-option
                  v-for="subItem in item.inputProps.options"
                  :key="subItem.value"
                  :label="subItem.label"
                  :value="subItem.value"
                />
              </el-select>
              <!-- 时间选择框 -->
              <el-date-picker
                v-if="item.inputProps.type === 'date-picker'"
                v-model="searchModel[item.prop]"
                v-bind="item.inputProps"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
