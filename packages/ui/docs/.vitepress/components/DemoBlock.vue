<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <slot name="preview"></slot>
    </div>
    <div class="demo-block__control">
      <el-button link @click="toggle">
        <span v-if="!isExpanded">显示代码</span>
        <span v-else>隐藏代码</span>
      </el-button>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="isExpanded" class="demo-block__source">
        <slot name="source"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const isExpanded = ref(false)

const toggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped lang="scss">
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 20px 0;
  overflow: hidden;

  &__preview {
    padding: 24px;
    background-color: var(--vp-c-bg);
  }

  &__control {
    border-top: 1px solid var(--vp-c-divider);
    padding: 8px 16px;
    text-align: center;
    background-color: var(--vp-c-bg-soft);
  }

  &__source {
    border-top: 1px solid var(--vp-c-divider);

    :deep(pre) {
      margin: 0;
      border-radius: 0;
    }

    :deep(code) {
      background-color: transparent;
    }
  }
}
</style>
