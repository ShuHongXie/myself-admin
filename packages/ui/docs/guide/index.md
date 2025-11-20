# 组件总览

Minilo-UI 是基于 Element Plus 二次封装的 Vue3 组件库，提供了一系列开箱即用的业务组件。

## 组件列表

### 数据展示

- **[MlChart 图表组件](/components/chart)** - 基于 ECharts 封装的响应式图表组件，支持自动响应式、主题切换、空状态处理等功能。

### 表单组件

- **[MlSearch 搜索组件](/components/search)** - 响应式搜索表单组件，支持多种输入类型、自适应布局、展开收起等功能。

### 复合组件

- **[MlSearchTable 搜索表格组件](/components/search-table)** - 集成搜索和表格的复合组件，自动处理数据请求、分页、排序等功能。

## 快速开始

### 安装

```bash
pnpm add @minilo/ui
```

### 全局注册

```javascript
import { createApp } from 'vue'
import MiniloUI from '@minilo/ui'
import '@minilo/ui/styles'
import App from './App.vue'

const app = createApp(App)
app.use(MiniloUI)
app.mount('#app')
```

### 按需引入

```vue
<script setup>
import { MlChart, MlSearch, MlSearchTable } from '@minilo/ui'
import '@minilo/ui/styles'
</script>

<template>
  <ml-chart :options="chartOptions" />
</template>
```

## 特性

- 🎨 **基于 Element Plus** - 继承 Element Plus 的所有特性
- 🚀 **开箱即用** - 封装常见业务场景，减少重复代码
- 📱 **响应式设计** - 组件自动适配不同屏幕尺寸
- 🎯 **TypeScript** - 完整的类型定义支持
- ⚡ **高性能** - 性能优化，防抖处理，智能渲染

## 技术栈

- Vue 3
- TypeScript
- Element Plus
- ECharts
- VueUse
