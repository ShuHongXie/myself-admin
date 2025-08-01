<script setup lang="ts">
import { Icon } from '@iconify/vue'
import screenfull from 'screenfull'
import { ref } from 'vue'

// 主题色切换逻辑-----------start---------------
import { guider } from '@myself/utils'
const themeColor = ref('#000000')
const handleThemeChange = (val: string) => {
  console.log(val)

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
const isCollapse = ref(true)
const handleReload = () => {
  window.location.reload()
}
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

// 颜色更改
// watch(themeColor, (val) => {})
</script>

<template>
  <div class="layout">
    <el-container class="layout-container">
      <!-- 侧边栏 -->
      <el-aside
        :class="{
          collapse: isCollapse
        }"
      >
        <div class="layout-logo">
          <slot name="logo">
            <div><span>MY</span><span v-if="!isCollapse">&nbsp;ADMIN</span></div>
          </slot>
        </div>
        <div class="layout-menu">
          <el-menu
            :class="{
              collapse: isCollapse
            }"
            :collapse="isCollapse"
            default-active="2"
          >
            <el-sub-menu index="1">
              <template #title>
                <div
                  class="el-menu-title__wrap"
                  :class="{
                    collapse: isCollapse
                  }"
                >
                  <Icon icon="ep:fold" color="#999999" class="layout-menu__icon"></Icon>
                  <span v-if="!isCollapse" class="layout-menu__text">Navigator One</span>
                </div>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <div
                    class="el-menu-title__wrap"
                    :class="{
                      collapse: isCollapse
                    }"
                  >
                    <Icon icon="ep:fold" color="#999999" class="layout-menu__icon"></Icon>
                    <span v-if="!isCollapse" class="layout-menu__text">子菜单</span>
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
          <div class="layout-collapse__icon" @click.stop="isCollapse = !isCollapse">
            <Icon :icon="isCollapse ? 'ep:d-arrow-right' : 'ep:d-arrow-left'" color="#999" />
          </div>
        </div>
      </el-aside>
      <el-container class="layout-container">
        <!-- 头部 -->
        <el-header class="layout-header">
          <slot name="header">
            <div class="layout-header__left">
              <div class="header-item" @click.stop="isCollapse = !isCollapse">
                <Icon icon="ep:fold" color="#999" />
              </div>
              <div class="header-item" @click.stop="handleReload">
                <Icon icon="ep:refresh" color="#999" />
              </div>
            </div>
            <div class="layout-header__right">
              <div class="header-theme">
                <el-color-picker
                  @change="handleThemeChange"
                  v-model="themeColor"
                  size="small"
                ></el-color-picker>
              </div>
              <div class="header-item" @click.stop="handleFullScreen">
                <Icon icon="ep:setting" color="#000" />
              </div>
              <div class="header-item" @click.stop="handleFullScreen">
                <Icon icon="ep:full-screen" color="#000" />
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
        <!-- 历史网页tabs -->
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
  </div>
</template>

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
:deep(.el-menu) {
  width: 60px;
  height: 100%;
  border-right: 1px solid #fff;
  transition: width 0.15s ease;
  &:not(.el-menu--collapse) {
    width: 224px;
  }
  .el-sub-menu__title {
    &:hover {
      background-color: var(--primary--background);
    }
  }
  .el-menu-item {
    &:hover {
      background-color: var(--primary--background);
    }
    &.is-active {
      color: var(--primary);
      .layout-menu__icon {
        color: var(--primary) !important;
      }
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
      justify-content: center;
    }
  }
  .el-sub-menu__title,
  .el-menu-item {
    padding: 10px 12px;
    box-sizing: border-box;
    &:hover {
      .layout-menu__icon {
        transform: scale(1.1);
      }
    }
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
      margin: 0 4px;
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
