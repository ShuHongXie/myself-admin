<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { ElInput } from 'element-plus'
import type { NumberRangeInputProps, NumberRangeValue } from './props'
import { bem } from '../../utils'

defineOptions({
  name: 'MlNumberRangeInput'
})

const props = defineProps<NumberRangeInputProps>()
const slots = useSlots()

// 使用 defineModel 定义双向绑定，类型为 [min, max] 数组
const modelValue = defineModel<NumberRangeValue>({ default: () => [null, null] })

// 计算属性访问 min 和 max
const minValue = computed({
  get: () => modelValue.value?.[0] ?? null,
  set: (val) => {
    modelValue.value = [val, modelValue.value?.[1] ?? null]
  }
})

const maxValue = computed({
  get: () => modelValue.value?.[1] ?? null,
  set: (val) => {
    modelValue.value = [modelValue.value?.[0] ?? null, val]
  }
})

// 合并最小值输入框属性
const mergedMinInputProps = computed(() => ({
  type: 'number',
  placeholder: `请输入${props.label}最小值`,
  disabled: props.disabled,
  ...props.inputProps,
  ...props.minInputProps
}))

// 合并最大值输入框属性
const mergedMaxInputProps = computed(() => ({
  type: 'number',
  placeholder: `请输入${props.label}最大值`,
  disabled: props.disabled,
  ...props.inputProps,
  ...props.maxInputProps
}))
</script>

<template>
  <div :class="bem('number-range-input')">
    <el-input v-model.number="minValue" v-bind="mergedMinInputProps">
      <!-- 最小值输入框的插槽 -->
      <template v-if="slots['min-prefix']" #prefix>
        <slot name="min-prefix" />
      </template>
      <template v-if="slots['min-suffix']" #suffix>
        <slot name="min-suffix" />
      </template>
      <template v-if="slots['min-prepend']" #prepend>
        <slot name="min-prepend" />
      </template>
      <template v-if="slots['min-append']" #append>
        <slot name="min-append" />
      </template>
    </el-input>
    <span :class="bem('number-range-input', 'separator')">{{ props.separator || '至' }}</span>
    <el-input v-model.number="maxValue" v-bind="mergedMaxInputProps">
      <!-- 最大值输入框的插槽 -->
      <template v-if="slots['max-prefix']" #prefix>
        <slot name="max-prefix" />
      </template>
      <template v-if="slots['max-suffix']" #suffix>
        <slot name="max-suffix" />
      </template>
      <template v-if="slots['max-prepend']" #prepend>
        <slot name="max-prepend" />
      </template>
      <template v-if="slots['max-append']" #append>
        <slot name="max-append" />
      </template>
    </el-input>
  </div>
</template>
