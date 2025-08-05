<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useInitGlobalStyle } from '@myself/utils'
import { i18n } from '@myself/locales'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { computed } from 'vue'

const locale = computed(() => (i18n.global.locale.value === 'zh-CN' ? zhCn : en))

useInitGlobalStyle()
</script>

<template>
  <ElConfigProvider size="default" :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
