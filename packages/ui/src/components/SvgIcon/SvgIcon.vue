<script setup lang="ts">
import { computed } from 'vue'
import type { SvgIconProps, StyleComputed } from './SvgIcon.types.ts'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps<SvgIconProps>()

const symbolId = computed(() => `#icon-${props.name}`)
const className = computed(() => {
  return {
    [`svg-icon-${props.name}`]: !!props.name
  }
})
const style = computed((): StyleComputed => {
  const style = { width: '1em', height: '1em' } as StyleComputed
  if (props.size) {
    style.width = typeof props.size === 'string' ? props.size : `${props.size}px`
    style.height = typeof props.size === 'string' ? props.size : `${props.size}px`
  }
  if (props.color) {
    style.color = props.color
    style.fill = props.color
  }
  return style
})
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :class="className" :style="style as any">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
