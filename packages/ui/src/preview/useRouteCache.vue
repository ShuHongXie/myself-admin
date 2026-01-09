<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * 路由/标签页缓存管理 Hooks
 * @param {Array} defaultCached - 默认缓存的路由名称列表
 * @returns {Object} 缓存状态和操作方法
 */
const useRouteCache = (defaultCached = []) => {
  const route = useRoute()
  const router = useRouter()

  // keep-alive 的 include 列表（响应式）
  const cachedRoutes = ref([...defaultCached])
  // 已打开的标签页列表
  const tabList = ref([])

  // 初始化标签页（从当前路由）
  const initTabList = () => {
    if (!tabList.value.some((tab) => tab.path === route.path)) {
      tabList.value.push({
        title: route.meta.title || route.name,
        path: route.path,
        name: route.name
      })
    }
  }

  // 添加标签页（并缓存）
  const addTab = (tab) => {
    if (!tabList.value.some((t) => t.path === tab.path)) {
      tabList.value.push(tab)
      // 仅缓存标记为 keepAlive 的路由
      if (tab.meta?.keepAlive) {
        addCachedRoute(tab.name)
      }
    }
    // 跳转到该标签页
    router.push(tab.path)
  }

  // 关闭标签页
  const closeTab = (path, toPath = '/') => {
    const index = tabList.value.findIndex((t) => t.path === path)
    if (index > -1) {
      const closedTab = tabList.value.splice(index, 1)[0]
      // 关闭时移除缓存
      removeCachedRoute(closedTab.name)

      // 如果关闭的是当前页，跳转到指定页
      if (path === route.path) {
        router.push(toPath || tabList.value[index - 1]?.path || '/')
      }
    }
  }

  // 关闭其他标签页
  const closeOtherTabs = (currentPath) => {
    tabList.value = tabList.value.filter((t) => t.path === currentPath)
    // 仅保留当前页的缓存（如果有）
    const currentTab = tabList.value[0]
    cachedRoutes.value = currentTab.meta?.keepAlive ? [currentTab.name] : []
  }

  // 添加缓存路由
  const addCachedRoute = (name) => {
    if (name && !cachedRoutes.value.includes(name)) {
      cachedRoutes.value.push(name)
    }
  }

  // 移除缓存路由
  const removeCachedRoute = (name) => {
    const index = cachedRoutes.value.findIndex((n) => n === name)
    if (index > -1) cachedRoutes.value.splice(index, 1)
  }

  // 刷新当前路由（移除缓存后重新进入）
  const refreshCurrentRoute = () => {
    const currentName = route.name
    removeCachedRoute(currentName)
    // 先跳转到空页面（或自身），再跳转回来触发刷新
    const tempPath = `/empty-${Date.now()}`
    router.replace({ path: tempPath }).then(() => {
      router.replace({ path: route.path })
    })
  }

  // 初始化
  watch(() => route.path, initTabList, { immediate: true })

  return {
    cachedRoutes,
    tabList,
    addTab,
    closeTab,
    closeOtherTabs,
    addCachedRoute,
    removeCachedRoute,
    refreshCurrentRoute
  }
}

// ----------------  使用示例  ----------------
// 初始化路由缓存（默认缓存dashboard）
const { cachedRoutes, tabList, addTab, closeTab, refreshCurrentRoute } = useRouteCache([
  'dashboard'
])

// 添加新标签页
const openNewTab = () => {
  addTab({
    title: '用户列表',
    path: '/user/list',
    name: 'userList',
    meta: { keepAlive: true }
  })
}
</script>

<template>
  <!-- keep-alive 绑定缓存列表 -->
  <keep-alive :include="cachedRoutes">
    <router-view />
  </keep-alive>

  <!-- 标签页展示 -->
  <div class="tabs">
    <div v-for="tab in tabList" :key="tab.path" class="tab-item">
      {{ tab.title }}
      <button @click="closeTab(tab.path)">×</button>
      <button @click="refreshCurrentRoute">刷新</button>
    </div>
    <button @click="openNewTab">+ 新增标签</button>
  </div>
</template>
