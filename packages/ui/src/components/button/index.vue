<script setup lang="ts">
import { ref } from 'vue'
import type { MlButtonSelfProps as MlButtonProps } from './type'
import { bem } from '../../utils'
import { ElButton, ElTooltip } from 'element-plus'

defineOptions({
  name: 'MlButton'
})

const props = withDefaults(defineProps<MlButtonProps>(), {
  time: 1000,
  tip: '',
  placement: 'top',
  tipProps: () => ({}),
  isDebounce: true
})

// 抛出事件
const emits = defineEmits(['click'])

const record = ref(0)

const handleClick = () => {
  if (!props.isDebounce) return emits('click')
  const newTime = new Date()
  if (newTime.getTime() - record.value > props.time) {
    emits('click')
  }
  record.value = newTime.getTime()
}
</script>

<template>
  <ElTooltip v-if="tip" :content="tip" :placement="placement" v-bind="tipProps">
    <ElButton v-bind="$attrs" :class="bem('button', 'tip')" @click="handleClick">
      <slot></slot>
    </ElButton>
  </ElTooltip>
  <ElButton v-else v-bind="$attrs" @click="handleClick">
    <slot></slot>
  </ElButton>
</template>
