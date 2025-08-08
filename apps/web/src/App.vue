<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useInitGlobalStyle } from '@myself/utils'
import { i18n } from '@myself/locales'
import { useRoutesStore } from '@myself/store'
import { staticRoutes } from '#/router/routes'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 设置静态路由
const { setStaticRoutes } = useRoutesStore()
setStaticRoutes(staticRoutes)

const locale = computed(() => (i18n.global.locale.value === 'zh-CN' ? zhCn : en))

useInitGlobalStyle()
</script>

<template>
  <ElConfigProvider size="default" :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
