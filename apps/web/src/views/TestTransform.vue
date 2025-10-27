<template>
  <div>
    <h1>TypeScript 转换测试</h1>
    <p>检查控制台输出以验证转换是否正常工作</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { handleError, handleSuccess } from '../test-transform'

onMounted(() => {
  console.log('测试错误处理:')
  const errorResult = handleError()
  console.log('错误处理结果:', errorResult)

  console.log('测试成功处理:')
  const successResult = handleSuccess()
  console.log('成功处理结果:', successResult)
})
</script>
