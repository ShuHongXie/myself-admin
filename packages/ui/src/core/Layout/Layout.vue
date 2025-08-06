<script setup lang="ts">
import { Icon } from '@iconify/vue'
import screenfull from 'screenfull'
import { ref, watch } from 'vue'
import { loadLocaleMessages } from '@myself/locales'
import { SUPPORT_LANGUAGES } from '@myself/utils'

import type { LanguagesType } from '@myself/locales'

// 主题色切换逻辑-----------start---------------
import { guider, userConfig } from '@myself/utils'
/**
 * @description: 主题色切换
 * @param {*} val
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

const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    content: '系统管理1'
  },
  {
    title: 'Tab 2',
    content: '用户管理2'
  },
  {
    title: 'Tab 1',
    content: '系统管理3'
  },
  {
    title: 'Tab 2',
    content: '用户管理4'
  },
  {
    title: 'Tab 1',
    content: '系统管理5'
  }
])
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
        <div class="layout-logo">
          <slot name="logo">
            <div><span>MY</span><span v-if="!userConfig.sidebar?.collapse">&nbsp;ADMIN</span></div>
          </slot>
        </div>
        <div class="layout-menu">
          <el-menu
            :class="{
              collapse: userConfig.sidebar?.collapse
            }"
            :collapse="userConfig.sidebar?.collapse"
            default-active="2"
          >
            <el-sub-menu index="1">
              <template #title>
                <div
                  class="el-menu-title__wrap"
                  :class="{
                    collapse: userConfig.sidebar?.collapse
                  }"
                >
                  <Icon icon="ep:fold" color="#999999" class="layout-menu__icon"></Icon>
                  <span class="layout-menu__text">Navigator One</span>
                </div>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <div
                    class="el-menu-title__wrap"
                    :class="{
                      collapse: userConfig.sidebar?.collapse
                    }"
                  >
                    <Icon icon="ep:fold" color="#999999" class="layout-menu__icon"></Icon>
                    <span class="layout-menu__text">子菜单</span>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2">
              <template #title>Navigator Two</template>
            </el-menu-item>
          </el-menu>
        </div>
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
              <div class="header-item" @click.stop="handleSidebar">
                <Icon icon="ep:fold" color="#999" />
              </div>
              <!-- 页面刷新 -->
              <div class="header-item" @click.stop="handleReload">
                <Icon icon="ep:refresh" color="#999" />
              </div>
              <!-- 路由面包屑 -->
              <el-breadcrumb>
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
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
                <Icon icon="ep:bell" color="#000" />
              </div>
              <!-- 用户头像 -->
              <div class="header-user" @click.stop="handleFullScreen">
                <el-badge :value="3">
                  <img
                    class="header-user__avatar"
                    src="../../assets/images/webp/logo.webp"
                    alt="用户头像"
                  />
                </el-badge>
              </div>
            </div>
          </slot>
        </el-header>
        <!-- 历史访问页 -->
        <div class="layout-tabs">
          <el-tabs v-model="editableTabsValue" type="card">
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.content"
              :label="item.content"
              :name="item.content"
            >
              <template #label>
                <div class="layout-tabs__label">
                  <Icon icon="ep:fold" color="#999" />
                  <span> {{ item.content }}</span>
                  <Icon icon="ep:close" color="#999" />
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 主要内容区域 -->
        <el-main class="layout-main">
          <div class="layout-main__content">
            <RouterView></RouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-backtop target=".layout-main" :visibility-height="1" :right="30" :bottom="30"> </el-backtop>
  </div>
</template>

<style lang="scss">
.language-dropdown .el-dropdown-menu__item.active {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}
.el-menu {
  width: 60px;
  height: 100%;
  border-right: 1px solid #fff;
  transition: width 0.15s ease;
  &:not(.el-menu--popup).el-menu--collapse {
    .layout-menu__text {
      display: none;
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
        transform: scale(1.1);
      }
    }
    .el-menu-title__wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 8px;
      gap: 8px;
      &.collapse {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
  .el-menu-item {
    &.is-active {
      color: var(--primary);
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
  }
  &-menu {
    width: 100%;
    height: calc(100vh - 50px - 42px);
    background-color: #fff;
    overflow: hidden auto;
    &__icon {
      font-size: 16px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
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
      }
      &-user {
        width: 44px;
        height: 44px;
        padding: 6px;
        border-radius: 50%;
        margin-left: 10px;
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
      border-top: none;
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
      &.is-active,
      &:hover {
        svg {
          color: var(--el-color-primary) !important;
        }
        border-bottom-color: transparent;
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
