<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  defineEmits,
  toRefs,
  getCurrentInstance,
  h,
  ComponentInternalInstance
} from 'vue'
import { searchProps } from './props'
import type { SearchModel } from './props'

// 组件 props 类型定义
const props = defineProps(searchProps)
// const { inline, disabled, options } = toRefs(props)

// 组件 emits 类型定义
const emits = defineEmits<{
  (event: 'click', data: string): void
}>()

const searchModel = defineModel<SearchModel>()
const name = ref('Search')
const instance = getCurrentInstance()

// const renderSlot = (
//   slotFn: (...strs: any) => void | null,
//   props: any,
//   instance: ComponentInternalInstance
// ) => {
//   return slotFn ? slotFn(props, instance) : null
// }

// 生命周期钩子
onMounted(() => {
  console.log('instance:', instance)
  console.log('this:', this)
})

defineExpose({
  name
})
</script>

<template>
  <div class="search">
    {{ name }}
    <el-form :model="searchModel" :label-width="labelWidth">
      <el-row :gutter="gutter">
        <template v-for="(slot, index) in customSlots" :key="index">
          <!-- 使用插槽配置的 span 和 colProps 控制宽度和其他属性 -->
          <el-col :span="slot.span" v-bind="slot.colProps">
            <el-form-item v-bind="slot.formItemProps">
              <!-- 渲染对应名称的插槽，传递插槽参数 -->
              <slot :name="slot.name" :searchModel="searchModel" />
            </el-form-item>
          </el-col>
        </template>
        <template v-for="item in options" :key="item.prop">
          <el-col :span="span" v-bind="item.colProps">
            <el-form-item v-bind="item.formItemProps" :prop="item.prop">
              <!-- 输入框 -->
              <el-input
                v-bind="item.input.props"
                v-if="item.input.type === 'input'"
                v-model="searchModel![item.prop]"
              />
              <!-- 筛选框 -->
              <el-select
                v-if="item.input.type === 'select'"
                v-model="searchModel![item.prop]"
                v-bind="item.input.props"
                style="width: 100%"
              >
                <el-option
                  v-for="subItem in item.input.options"
                  :key="subItem.value"
                  :label="subItem.label"
                  :value="subItem.value"
                />
              </el-select>
              <!-- 时间选择框 -->
              <el-date-picker
                v-if="item.input.type === 'date-picker'"
                v-model="searchModel![item.prop]"
                v-bind="item.input.props"
              />
              <!-- 自定义组件 -->
              <!-- <component :is="item.input.component" :msg="item.input.props.msg">
                <template
                  v-for="slotName in Object.keys(item.input.slots || [])"
                  #[slotName]
                  :key="slotName"
                >
                  <component
                    v-if="item.input.slots[slotName]"
                    :is="renderSlot(item.input.slots[slotName], item.input.props, instance)"
                  />
                </template>
              </component> -->
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
