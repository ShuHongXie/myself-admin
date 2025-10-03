<template>
  <el-form-item v-bind="formItemProps" :prop="prop" :label="label" :rules="computedRules">
    <slot></slot>
  </el-form-item>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { ElFormItem } from 'element-plus'
import type { FormItemRule } from 'element-plus'

interface FormItemValidatorProps {
  // el-form-item 的所有属性
  formItemProps?: Partial<InstanceType<typeof ElFormItem>['$props']>
  // 表单字段名
  prop?: string
  // 标签文本
  label?: string
  // 是否必填
  required?: boolean
  // 最小长度
  minLength?: number
  // 最大长度
  maxLength?: number
  // 自定义验证规则
  customRules?: FormItemRule[]
  // 正则表达式验证
  pattern?: RegExp
  // 验证消息
  message?: string
  // 触发方式
  trigger?: 'blur' | 'change' | Array<'blur' | 'change'>
}

const props = withDefaults(defineProps<FormItemValidatorProps>(), {
  formItemProps: () => ({}),
  trigger: 'blur',
  required: false
})

const slots = useSlots()

// 计算验证规则
const computedRules = computed(() => {
  const rules: FormItemRule[] = []

  // 必填验证
  if (props.required) {
    rules.push({
      required: true,
      message: props.message || `${props.label || props.prop}不能为空`,
      trigger: props.trigger
    })
  }

  // 长度验证
  if (props.minLength !== undefined || props.maxLength !== undefined) {
    const lengthRule: FormItemRule = {
      trigger: props.trigger
    }

    if (props.minLength !== undefined) {
      lengthRule.min = props.minLength
      lengthRule.message =
        props.message || `${props.label || props.prop}长度不能少于${props.minLength}位`
    }

    if (props.maxLength !== undefined) {
      lengthRule.max = props.maxLength
      lengthRule.message =
        props.message || `${props.label || props.prop}长度不能超过${props.maxLength}位`
    }

    rules.push(lengthRule)
  }

  // 正则验证
  if (props.pattern) {
    rules.push({
      pattern: props.pattern,
      message: props.message || `${props.label || props.prop}格式不正确`,
      trigger: props.trigger
    })
  }

  // 自定义验证规则
  if (props.customRules && props.customRules.length > 0) {
    rules.push(...props.customRules)
  }

  return rules
})

// 暴露验证方法
defineExpose({
  validate: async (callback?: (isValid: boolean, invalidFields?: any) => void) => {
    // 该方法将在父组件的 el-form 中被调用
    // 实际验证由 el-form 执行
  },
  clearValidate: () => {
    // 清除验证状态
  },
  validateField: (
    props?: string | string[],
    callback?: (isValid: boolean, invalidFields?: any) => void
  ) => {
    // 验证指定字段
  }
})
</script>

<style scoped lang="scss">
// 可以在这里添加自定义样式
</style>
