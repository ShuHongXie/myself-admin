<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useInitGlobalStyle } from '@myself/utils'

useInitGlobalStyle()
</script>

<template>
  <ElConfigProvider size="default">
    <RouterView />
  </ElConfigProvider>
  <!-- <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container> -->
</template>

<style scoped></style>
