<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { guider, userConfig, isHttp, findMenuItem } from '@myself/utils'
import { useRoute, useRouter } from 'vue-router'
import { loadLocaleMessages } from '@myself/locales'
import { SUPPORT_LANGUAGES, findLevelRoutes } from '@myself/utils'
import { useConfigStore } from '@myself/store'
import { $t } from '@myself/locales'

import screenfull from 'screenfull'
import NestedMenu from './NestedMenu.vue'
import { Icon } from '@iconify/vue'

import type { LanguagesType } from '@myself/locales'

const configStore = useConfigStore()
const { menuData, tabData, activeTab } = storeToRefs(configStore)
const route = useRoute()
const router = useRouter()

// 侧边栏相关逻辑-----------start---------------

/**
 * @description: 面包屑数据
 * @param {*} computed
 * @return {*}
 * @Author: xieshuhong
 */
const breadcrumbData = computed(() => findLevelRoutes(menuData.value, route.path))

/**
 * @description: 菜单选中跳转
 * @param {*} path
 * @return {*}
 * @Author: xieshuhong
 */
const handleSelect = (path: string) => {
  if (isHttp(path)) {
    window.open(path, '_blank')
  } else {
    router.push({ path })
  }
}

/**
 * @description: 侧边栏控制
 * @return {*}
 * @Author: xieshuhong
 */
const handleSidebar = () => {
  guider.updateConfig({
    sidebar: {
      collapse: !userConfig.sidebar?.collapse
    }
  })
}

/**
 * @description: 移除tab栏
 * @param {*} index
 * @return {*}
 * @Author: xieshuhong
 */
const handleRemoveTab = (index: number) => {
  configStore.removeTabData(index)
}

/**
 * @description: 点击tab栏
 * @param {*} path 路径
 * @return {*}
 * @Author: xieshuhong
 */
const handleClickTab = (path: string) => {
  configStore.setActiveTab(path)
  router.push({ path })
}

watch(
  () => route.path,
  () => {
    console.log(route)

    configStore.setActiveTab(route.path)
    const menuItem = findMenuItem(menuData.value, route.path)
    configStore.setTabData({
      ...menuItem,
      query: route.query
    })
  },
  {
    immediate: true
  }
)
// 侧边栏相关逻辑-----------end---------------

// 主题色切换逻辑-----------start---------------
/**
 * @description: 主题色切换
 * @param {*} val 色值
 * @return {*}
 * @Author: xieshuhong
 */
const handleThemeChange = (val: string) => {
  guider.updateConfig({
    theme: {
      colorPrimary: val
    }
  })
}
// 主题色切换逻辑-----------end---------------

/**
 * @description: 刷新当前页
 * @return {*}
 * @Author: xieshuhong
 */
const handleReload = () => {
  window.location.reload()
}
/**
 * @description: 全屏控制
 * @return {*}
 * @Author: xieshuhong
 */
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

/**
 * @description: 语言切换
 * @param {*} value
 * @return {*}
 * @Author: xieshuhong
 */
const handleSwitchLanguage = async (value: string | undefined) => {
  if (!value) return
  const locale = value as LanguagesType
  guider.updateConfig({
    app: {
      locale
    }
  })
}

/**
 * @description: 国际化更改监听
 * @return {*}
 * @Author: xieshuhong
 */
watch(
  () => userConfig.app?.locale,
  async () => {
    await loadLocaleMessages(userConfig.app?.locale as LanguagesType)
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <div class="layout">
    <el-container class="layout-container">
      <!-- 侧边栏 -->
      <el-aside
        :class="{
          collapse: userConfig.sidebar?.collapse
        }"
      >
        <!-- LOGO -->
        <div class="layout-logo">
          <slot name="logo">
            <div class="layout-logo__content">
              <img
                style="width: 32px; height: 32px"
                src="../../assets/images/png/logo.png"
                alt=""
              />
              <span v-if="!userConfig.sidebar?.collapse">MY&nbsp;ADMIN</span>
            </div>
          </slot>
        </div>
        <!-- 侧边菜单栏 -->
        <div class="layout-menu">
          <el-menu
            @select="handleSelect"
            v-if="menuData.length"
            :class="{
              collapse: userConfig.sidebar?.collapse
            }"
            :collapse="userConfig.sidebar?.collapse"
            :default-active="route.path"
            :collapse-transition="false"
          >
            <NestedMenu :collapse="userConfig.sidebar?.collapse" :menu-data="menuData"></NestedMenu>
          </el-menu>
        </div>
        <!-- 侧边菜单控制 -->
        <div class="layout-collapse">
          <div class="layout-collapse__icon" @click.stop="handleSidebar">
            <Icon
              :icon="userConfig.sidebar?.collapse ? 'ep:d-arrow-right' : 'ep:d-arrow-left'"
              color="#999"
            />
          </div>
        </div>
      </el-aside>
      <el-container class="layout-container">
        <!-- 头部 -->
        <el-header class="layout-header">
          <slot name="header">
            <div class="layout-header__left">
              <!-- 侧边栏折叠 -->
              <div
                :class="{ 'header-item': true, rotate: userConfig.sidebar?.collapse }"
                @click.stop="handleSidebar"
              >
                <Icon icon="ep:fold" color="#999" />
              </div>
              <!-- 页面刷新 -->
              <div class="header-item" @click.stop="handleReload">
                <Icon icon="ep:refresh" color="#999" />
              </div>
              <!-- 路由面包屑 -->
              <el-breadcrumb>
                <el-breadcrumb-item v-for="item in breadcrumbData" :key="item.path">{{
                  item.name
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="layout-header__right">
              <!-- 颜色切换 -->
              <div class="header-theme">
                <el-color-picker
                  @change="handleThemeChange"
                  v-model="userConfig.theme!.colorPrimary"
                  size="small"
                ></el-color-picker>
              </div>
              <!-- 中英文切换 -->
              <el-dropdown popper-class="language-dropdown" trigger="click" placement="bottom-end">
                <div class="header-item">
                  <Icon icon="cil:language" color="#000" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="handleSwitchLanguage(item.value)"
                      v-for="item in SUPPORT_LANGUAGES"
                      :key="item.value"
                      :class="item.value === userConfig.app?.locale ? 'active' : ''"
                      >{{ item.label }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <!-- 全屏切换 -->
              <div class="header-item" @click.stop="handleFullScreen">
                <Icon icon="ep:full-screen" color="#000" />
              </div>
              <!-- 消息通知 -->
              <div class="header-item">
                <el-popover placement="bottom">
                  <template #reference>
                    <el-badge is-dot :offset="[0, 5]">
                      <Icon icon="ep:bell" color="#000" />
                    </el-badge>
                  </template>
                  <slot name="messageBar"></slot>
                </el-popover>
              </div>
              <!-- 用户头像 -->
              <el-dropdown trigger="click">
                <div class="header-user">
                  <img
                    class="header-user__avatar"
                    src="../../assets/images/webp/logo.webp"
                    alt="用户头像"
                  />
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>{{ $t('common.logout') }}</el-dropdown-item>
                  </el-dropdown-menu></template
                >
              </el-dropdown>
            </div>
          </slot>
        </el-header>
        <!-- 历史访问页 -->
        <div class="layout-tabs">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane
              v-for="(item, index) in tabData"
              :key="item.path"
              :label="item.name"
              :name="item.path"
            >
              <template #label>
                <div @click.stop="handleClickTab(item.path as string)" class="layout-tabs__label">
                  <Icon v-if="item.icon" :icon="item!.icon" color="#999999" />
                  <span> {{ item.name }}</span>
                  <Icon @click.stop="handleRemoveTab(index)" icon="ep:close" color="#999999" />
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 主要内容区域 -->
        <el-main class="layout-main">
          <div class="layout-main__content">
            <slot name="routerView">
              <RouterView v-slot="{ Component, route }">
                <Transition name="fade-slide" appear mode="out-in">
                  <KeepAlive v-if="route.meta?.keepAlive">
                    <component :is="Component" />
                  </KeepAlive>
                  <component :is="Component" v-else />
                </Transition>
              </RouterView>
            </slot>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-backtop target=".layout-main" :visibility-height="1" :right="30" :bottom="30"> </el-backtop>
  </div>
</template>

<style lang="scss">
@use '../../assets/scss/mixin.scss' as *;
.language-dropdown .el-dropdown-menu__item.active {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}
.el-popover.el-popper {
  min-width: 0 !important;
}
.header-user__info {
  @include flex-between-center;
}
.el-menu {
  width: 60px;
  height: 100%;
  border-right: none !important;
  transition: all 0.15s ease;
  &:not(.el-menu--popup).el-menu--collapse {
    .layout-menu__text {
      opacity: 0;
      width: 0;
    }
  }
  &:not(.el-menu--collapse) {
    width: 224px;
  }
  &--collapse {
    .el-sub-menu.is-active {
      background-color: var(--el-color-primary-light-8);
      svg {
        color: var(--el-menu-active-color) !important;
      }
    }
  }
  .el-menu-item,
  .el-sub-menu__title {
    padding: 10px 12px;
    box-sizing: border-box;
    &:hover {
      background-color: var(--el-color-primary-light-8);
      .layout-menu__icon {
        transform: scale(1.2);
      }
    }
    .el-menu-title__wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 8px;
      gap: 8px;
      transition: all 0.15s ease;
      &.collapse {
        @include flex-center-center;
      }
    }
  }
  .el-menu-item {
    &.is-active {
      color: var(--primary);
      background-color: var(--el-color-primary-light-8);
      .layout-menu__icon {
        color: var(--primary) !important;
      }
    }
  }
  .el-sub-menu__title {
    .el-menu-title__wrap {
      &.collapse {
        justify-content: center;
      }
    }
  }
  .el-menu-item-group__title {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
@use '../../assets/scss/root.scss' as *;
@use '../../assets/scss/mixin.scss' as *;
@use '../../assets/scss/preset.scss' as *;
:deep(.el-aside) {
  max-width: 224px;
  min-width: 224px;
  height: 100vh;
  border-right: 1px solid var(--el-menu-border-color);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  &.collapse {
    max-width: 60px;
    min-width: 60px;
  }
}

.layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
  &-logo {
    overflow: hidden;
    width: 100%;
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.15s ease;
    text-align: center;
    &__content {
      @include flex-between-center;
      gap: 6px;
    }
  }
  &-menu {
    width: 100%;
    height: calc(100vh - 50px - 42px);
    background-color: #fff;
    overflow: hidden auto;
  }
  &-collapse {
    width: 100%;
    height: 42px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 10px;
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: rgb(228, 228, 231);
      border-radius: 4px;
      cursor: pointer;
    }
  }
  &-container {
    overflow: hidden;
  }
  &-header {
    @include flex-between-start;
    border-bottom: 1px solid #e4e4e7;
    box-sizing: border-box;
    cursor: pointer;
    --el-header-height: 50px;
    &__left {
      height: 100%;
      @include flex-start-center;
      gap: 8px;
    }
    &__right {
      height: 100%;
      @include flex-end-center;
      gap: 8px;
      :deep(.el-color-picker.is-focused .el-color-picker__trigger) {
        border-color: var(--primary) !important;
      }
    }
    .header {
      &-item {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        @include flex-between-center;
        padding: 0 4px;
        &:hover {
          background-color: rgb(228, 228, 231);
          svg {
            color: #000000 !important;
          }
        }
        &.rotate {
          transform: rotate(180deg);
        }
      }
      &-user {
        width: 44px;
        height: 44px;
        padding: 6px;
        border-radius: 50%;
        &:hover {
          background-color: rgba(228, 228, 231, 0.3);
        }
        &__avatar {
          width: 32px;
          border-radius: 50%;
        }
      }
    }
  }
  &-tabs {
    :deep(.el-tabs) {
      width: 100%;
    }
    :deep(.el-tabs__nav) {
      border-top-width: 0 !important;
      &:first-child {
        border-left-width: 0;
      }
    }
    :deep(.el-tabs__header) {
      margin-bottom: 0;
    }
    :deep(.el-tabs__content) {
      display: none;
    }
    :deep(.el-tabs__item) {
      min-width: 122px !important;
      padding: 0 10px !important;
      color: #999999;
      &.is-active,
      &:hover {
        svg {
          color: var(--el-color-primary) !important;
        }
        color: var(--el-color-primary);
        border-bottom-color: transparent;
        background-color: var(--el-color-primary-light-9);
        &.is-closable {
          padding: 0 6px;
        }
      }
    }
    &__label {
      @include flex-center-center(nowrap, 4px);
    }
  }
  &-main {
    background-color: #f0f2f5;
    --el-main-padding: 10px;
    overflow: hidden scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: var(--el-color-primary);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #666;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
    &__content {
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
