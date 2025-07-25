<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <div class="layout-logo"></div>
        <div class="layout-menu">
          <el-menu default-active="2">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <template #title>Navigator Four</template>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="layout-collapse">
          <div class="layout-collapse__icon">
            <Icon icon="ep:fold" color="#999" />
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <slot name="header"></slot>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-aside) {
  max-width: 224px;
  min-width: 224px;
  height: 100vh;
  border-right: 1px solid var(--el-menu-border-color);
}
:deep(.el-header) {
  --el-header-height: 50px;
}
:deep(.el-menu) {
  border-right: none;
}
.layout {
  &-logo {
    width: 100%;
    height: 50px;
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
    }
  }
}
</style>
