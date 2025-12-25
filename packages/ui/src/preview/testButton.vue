<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>

<template>
  <div class="component-name">
    <slot>12321</slot>
  </div>

  <el-button type="warning">
    <slot>Warning</slot>
  </el-button>
</template>

<style lang="scss" scoped></style>
