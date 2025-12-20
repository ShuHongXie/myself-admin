# 快速开始

本指南将帮助你快速上手 Minilo-UI 组件库。

## 安装

使用你喜欢的包管理器安装 Minilo-UI：

::: code-group

```bash [pnpm]
pnpm add @minilo/ui
```

```bash [npm]
npm install @minilo/ui
```

```bash [yarn]
yarn add @minilo/ui
```

:::

## 使用方式

Minilo-UI 支持多种使用方式，你可以根据项目需求选择合适的方式。

### 方式一：自动按需引入（推荐）

使用 `unplugin-vue-components` 实现组件的自动引入，无需手动导入组件。

#### 1. 安装插件

```bash
pnpm add -D unplugin-vue-components
```

#### 2. 配置 Vite

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { MiniloUiResolver } from '@minilo/ui/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [MiniloUiResolver()]
    })
  ]
})
```

#### 3. 直接使用

配置完成后，可以直接在模板中使用组件，无需导入：

```vue
<template>
  <ml-chart :options="chartOptions" />
  <ml-search :search-data="searchData" @search="handleSearch" />
  <ml-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref } from 'vue'

const chartOptions = ref({
  // ECharts 配置
})
</script>
```

### 方式二：全局注册

适合大部分组件都需要使用的场景。

```typescript
import { createApp } from 'vue'
import MiniloUI from '@minilo/ui'
import '@minilo/ui/styles'
import App from './App.vue'

const app = createApp(App)
app.use(MiniloUI)
app.mount('#app')
```

然后在任何组件中直接使用：

```vue
<template>
  <ml-chart :options="chartOptions" />
</template>
```

### 方式三：手动按需引入

适合只使用少量组件的场景。

```vue
<script setup>
import { MlChart, MlSearch, MlDetail } from '@minilo/ui'
import '@minilo/ui/styles'

const chartOptions = ref({
  // ECharts 配置
})
</script>

<template>
  <ml-chart :options="chartOptions" />
</template>
```

## 组件概览

### 基础组件

Minilo-UI 提供了一系列功能丰富的基础组件，覆盖常见的 UI 需求：

| 组件名             | 说明                       | 文档                                       |
| ------------------ | -------------------------- | ------------------------------------------ |
| MlChart            | 图表组件，基于 ECharts     | [查看文档](/components/chart)              |
| MlSearch           | 搜索组件，支持多种搜索条件 | [查看文档](/components/search)             |
| MlDetail           | 详情展示组件               | [查看文档](/components/detail)             |
| MlButton           | 按钮组件                   | [查看文档](/components/button)             |
| MlNumberRangeInput | 数值范围输入框             | [查看文档](/components/number-range-input) |
| MlTreeSelect       | 树形选择组件               | [查看文档](/components/tree-select)        |
| MlTreeSelectDialog | 树形选择对话框             | [查看文档](/components/tree-select-dialog) |
| MlTreeSelectDrawer | 树形选择抽屉               | [查看文档](/components/tree-select-drawer) |

### 复杂组件

Minilo-UI 还提供了功能强大的复杂组件，适用于各种复杂业务场景：

| 组件名           | 说明                                 | 文档                                     |
| ---------------- | ------------------------------------ | ---------------------------------------- |
| MlImageUploadPro | 功能完整的图片上传、裁剪、排序组件   | [查看文档](/components/image-upload-pro) |
| MlSearchTable    | 搜索表格组件，集成搜索、表格、分页   | [查看文档](/components/search-table)     |
| MlVirtualList    | 虚拟列表组件，支持大数据量高性能渲染 | [查看文档](/components/virtual-list)     |

## Resolver 配置说明

### MiniloUiResolver

Minilo-UI 提供了自定义的 resolver，用于 `unplugin-vue-components` 插件。

#### 工作原理

Resolver 会自动识别以 `Ml` 开头的组件，并将其转换为对应的导入路径：

```typescript
// 使用组件
<ml-chart />

// 自动转换为
import { MlChart } from '@minilo/ui/es/chart'
import '@minilo/ui/theme-chalk/ml-chart'
```

#### 支持的组件格式

- `<ml-chart />` → `MlChart`
- `<ml-search />` → `MlSearch`
- `<ml-detail />` → `MlDetail`
- `<ml-button />` → `MlButton`
- `<ml-number-range-input />` → `MlNumberRangeInput`
- `<ml-tree-select />` → `MlTreeSelect`
- `<ml-tree-select-dialog />` → `MlTreeSelectDialog`
- `<ml-tree-select-drawer />` → `MlTreeSelectDrawer`
- `<ml-image-upload-pro />` → `MlImageUploadPro`
- `<ml-search-table />` → `MlSearchTable`
- `<ml-virtual-list />` → `MlVirtualList`

#### 高级配置

如果需要同时使用 Element Plus 和 Minilo-UI：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { MiniloUiResolver } from '@minilo/ui/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver(), MiniloUiResolver()]
    })
  ]
})
```

## 样式引入

### 自动引入样式

使用 resolver 时，样式会自动按需引入，无需手动导入。

### 手动引入全部样式

如果不使用 resolver，需要手动引入样式：

```typescript
import '@minilo/ui/styles'
// 或
import '@minilo/ui/dist/index.css'
```

## TypeScript 支持

Minilo-UI 使用 TypeScript 编写，提供完整的类型定义。

### 组件类型

```typescript
import type { MlChartProps, MlSearchProps } from '@minilo/ui'

const chartProps: MlChartProps = {
  options: {
    // ECharts 配置
  },
  theme: 'dark'
}
```

### 全局类型声明

在 `tsconfig.json` 中添加类型声明：

```json
{
  "compilerOptions": {
    "types": ["@minilo/ui/global"]
  }
}
```

## 常见问题

### 组件未自动引入？

1. 检查 resolver 配置是否正确
2. 确认组件名称以 `Ml` 开头
3. 重启开发服务器

### 样式丢失？

1. 检查是否引入了样式文件
2. 使用 resolver 时确保配置了 `sideEffects`
3. 检查 CSS 打包配置

### 与 Element Plus 冲突？

Minilo-UI 基于 Element Plus 封装，两者可以同时使用。确保在 resolver 配置中同时添加两个 resolver：

```typescript
resolvers: [ElementPlusResolver(), MiniloUiResolver()]
```

## 下一步

- 查看 [组件总览](/guide/) 了解所有可用组件
- 浏览 [组件文档](/components/chart) 学习组件的详细用法
- 查看 [GitHub 仓库](https://github.com/ShuHongXie/minilo) 获取更多信息
