# 组件总览

Minilo-UI 是基于 Element Plus 二次封装的 Vue3 组件库，提供了一系列开箱即用的业务组件。

## 特性

- 🎨 **基于 Element Plus** - 继承 Element Plus 的所有特性
- 🚀 **开箱即用** - 封装常见业务场景，减少重复代码
- 📱 **响应式设计** - 组件自动适配不同屏幕尺寸
- 🎯 **TypeScript** - 完整的类型定义支持
- ⚡ **高性能** - 性能优化，防抖处理，智能渲染
- 🔌 **自动按需引入** - 支持 unplugin-vue-components，无需手动导入

## 组件列表

### 数据展示

- **[MlChart 图表组件](/components/chart)** - 基于 ECharts 封装的响应式图表组件，支持自动响应式、主题切换、空状态处理等功能。
- **[MlDetail 详情组件](/components/detail)** - 基于 el-descriptions 封装的详情展示组件，支持下拉数据回显、自定义插槽、提示信息等功能。

### 表单组件

- **[MlSearch 搜索组件](/components/search)** - 响应式搜索表单组件，支持多种输入类型、自适应布局、展开收起等功能。
- **[MlButton 按钮组件](/components/button)** - 基于 el-button 封装的按钮组件，提供统一的按钮样式和行为。
- **[MlNumberRangeInput 数值范围输入框](/components/number-range-input)** - 基于 el-input 封装的数值范围输入组件，支持最小值和最大值输入，适用于价格区间、年龄范围等场景。

### 选择器组件

- **[MlTreeSelect 树形选择](/components/tree-select)** - 树形选择组件，支持单选、多选、搜索等功能，可内嵌在页面中使用。
- **[MlTreeSelectDialog 树形选择对话框](/components/tree-select-dialog)** - 将树形选择集成到对话框中，适用于弹窗场景的树形数据选择。
- **[MlTreeSelectDrawer 树形选择抽屉](/components/tree-select-drawer)** - 将树形选择集成到抽屉中，适用于侧边栏场景的树形数据选择。

### 数据组件

- **[MlSearchTable 搜索表格组件](/components/search-table)** - 集成搜索和表格的复合组件，自动处理数据请求、分页、排序等功能。
- **[MlVirtualList 虚拟列表组件](/components/virtual-list)** - 高性能虚拟滚动列表，支持定高/不定高、分页/无分页，最多只渲染 10 个 DOM 节点。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Element Plus** - 基于 Vue 3 的组件库
- **ECharts** - 强大的数据可视化库
- **VueUse** - Vue Composition API 工具集

## 开始使用

查看 [快速开始](/guide/getting-started) 了解如何在项目中使用 Minilo-UI。
