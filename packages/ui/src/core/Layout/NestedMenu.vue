<script setup lang="ts">
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'

defineProps<{
  menuData?: any
  collapse?: boolean
}>()
</script>

<template>
  <template v-for="item in menuData" :key="item.path">
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <div
          class="el-menu-title__wrap"
          :class="{
            collapse
          }"
        >
          <Icon :icon="item.icon" color="#999999" class="layout-menu__icon"></Icon>
          <span class="layout-menu__text">{{ item.name }}</span>
        </div>
      </template>
      <!-- 递归调用自身组件渲染子菜单 -->
      <NestedMenu :menu-data="item.children"></NestedMenu>
    </el-sub-menu>
    <!-- 无子菜单的情况 -->
    <el-menu-item v-else :index="item.path">
      <div
        class="el-menu-title__wrap"
        :class="{
          collapse
        }"
      >
        <Icon :icon="item.icon" color="#999999" class="layout-menu__icon"></Icon>
        <span class="layout-menu__text">{{ item.name }}</span>
      </div>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
.layout {
  &-menu {
    &__icon {
      font-size: 16px;
      transition: all 0.2s ease;
    }
    &__text {
      transition: all 0.2s ease;
    }
  }
}
.el-menu-title__wrap {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  &.collapse {
    justify-content: center;
  }
}
</style>
