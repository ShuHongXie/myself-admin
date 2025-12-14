<script setup lang="ts">
import { ref } from 'vue'
import testSearch from './preview/testSearch.vue'
import testRangeInput from './preview/testRangeInput.vue'
import treeSelectDialog from './preview/treeSelectDialog.vue'
</script>

<template>
  <div class="app-container">
    <!-- <testSearch></testSearch> -->
    <!-- <testRangeInput></testRangeInput> -->
    <treeSelectDialog></treeSelectDialog>
  </div>
</template>

<style lang="scss">
@import './style/index.scss';
</style>
