<script setup lang="ts">
import { ref } from 'vue'
import testSearch from './preview/testSearch.vue'
import testRangeInput from './preview/testRangeInput.vue'
import treeSelectDialog from './preview/treeSelectDialog.vue'
// import dataImportWizard from './preview/dataImportWizard.vue'
import imageUploadPro from './preview/imageUploadPro.vue'
</script>

<template>
  <div class="app-container">
    <!-- <testSearch></testSearch> -->
    <!-- <testRangeInput></testRangeInput> -->
    <!-- <treeSelectDialog></treeSelectDialog> -->
    <imageUploadPro />
  </div>
</template>

<style lang="scss">
// @import './style/index.scss';
@use './style/index.scss' as *;
</style>
