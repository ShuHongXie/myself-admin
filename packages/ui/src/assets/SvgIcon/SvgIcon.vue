<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: ''
  }
})

const symbolId = computed(() => `#icon-${props.name}`)
const className = computed(() => {
  return {
    [`svg-icon-${props.name}`]: !!props.name
  }
})
const style = computed(() => {
  const style = {}
  if (props.size) {
    style.width = typeof props.size === 'string' ? props.size : `${props.size}px`
    style.height = style.width
  }
  if (props.color) {
    style.color = props.color
    style.fill = props.color
  }
  return style
})
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :class="className" :style="style">
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
