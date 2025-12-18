<script setup lang="ts">
import { ref } from 'vue'
import testSearch from './preview/testSearch.vue'
import testRangeInput from './preview/testRangeInput.vue'
// import treeSelectDialog from './preview/treeSelectDialog.vue'
import MlDataImportWizard from './components'
const importWizard = ref()
// 自定义导入接口
const importDataApi = async (data) => {
  // 调用后端接口示例
  // const res = await fetch('/api/import', {
  //   method: 'POST',
  //   body: JSON.stringify({ data })
  // });
  // return res.json();

  // 模拟导入结果
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        successCount: data.length - 2,
        failCount: 2
      })
    }, 1000)
  })
}
</script>

<template>
  <div class="app-container">
    <!-- <testSearch></testSearch> -->
    <!-- <testRangeInput></testRangeInput> -->
    <!-- <treeSelectDialog></treeSelectDialog> -->
    <ElButton type="primary" @click="importWizard.open()">导入数据</ElButton>
    <MlDataImportWizard ref="importWizard" :import-api="importDataApi" />
  </div>
</template>

<style lang="scss">
// @import './style/index.scss';
@use './style/index.scss' as *;
</style>
