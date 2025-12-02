# MlChart 图表组件

基于 ECharts 封装的 Vue3 图表组件，提供响应式、易用的图表解决方案。

<script setup>
import BasicDemo from '../.vitepress/demos/chart/basic.vue'
import EmptyDemo from '../.vitepress/demos/chart/empty.vue'
import CustomEmptyDemo from '../.vitepress/demos/chart/custom-empty.vue'
</script>

## 安装依赖

MlChart 组件依赖 ECharts 库，使用前需要先安装：

```bash
pnpm add echarts
# 或
npm install echarts
# 或
yarn add echarts
```

## 全局配置

在使用 MlChart 组件之前，需要在项目入口文件（如 `main.ts`）中全局注册 ECharts：

```typescript
import { createApp } from 'vue'
import * as echarts from 'echarts'
import App from './App.vue'

const app = createApp(App)

// 将 echarts 挂载到全局属性
app.config.globalProperties.$echarts = echarts

app.mount('#app')
```

::: tip 提示
如果使用了自动按需引入（unplugin-vue-components），也需要在 `main.ts` 中进行上述配置。
:::

## 基础用法

<BasicDemo />

::: details 查看代码

```vue
<script>
import { ref } from 'vue'

const chartOptions = ref({
  title: {
    text: 'ECharts 示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
})
</script>

<template>
  <ml-chart :options="chartOptions" style="height: 400px;" />
</template>
```

:::

## 主题配置

通过 `theme` 属性设置图表主题。

::: details 查看代码

```vue
<template>
  <ml-chart :options="chartOptions" theme="dark" />
</template>
```

:::

## 空状态

组件支持自定义空状态显示。

<EmptyDemo />

::: details 查看代码

```vue
<script>
import { ref } from 'vue'

const chartOptions = ref({
  title: {
    text: '折线图示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['销售额', '利润']
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销售额',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
      smooth: true
    },
    {
      name: '利润',
      type: 'line',
      data: [60, 100, 80, 50, 40, 70, 90],
      smooth: true
    }
  ]
})

const isEmpty = ref(false)
</script>

<template>
  <div>
    <el-button @click="isEmpty = !isEmpty" style="margin-bottom: 10px;"> 切换空状态 </el-button>
    <ml-chart
      :options="chartOptions"
      :is-empty="isEmpty"
      description="暂无图表数据"
      style="height: 400px;"
    />
  </div>
</template>
```

:::

::: details 查看代码

```vue
<template>
  <ml-chart
    :options="chartOptions"
    :is-empty="!chartOptions.series?.length"
    description="暂无图表数据"
  />
</template>
```

:::

也可以使用函数判断空状态：

::: details 查看代码

```vue
<template>
  <ml-chart :options="chartOptions" :is-empty="checkEmpty" />
</template>

<script>
const checkEmpty = (options) => {
  return !options.series || options.series.length === 0
}
</script>
```

:::

## 自定义空状态

使用 `empty` 插槽自定义空状态内容。

<CustomEmptyDemo />

::: details 查看代码

```vue
<template>
  <ml-chart :options="chartOptions" :is-empty="true">
    <template #empty>
      <div class="custom-empty" style="text-align: center; padding: 40px;">
        <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
        <p style="font-size: 16px; color: #666;">暂无数据</p>
        <p style="font-size: 14px; color: #999; margin-top: 8px;">请选择日期范围查看数据</p>
      </div>
    </template>
  </ml-chart>
</template>

<script>
import { ref } from 'vue'

const chartOptions = ref({
  title: {
    text: '销售数据统计'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {},
  series: []
})
</script>
```

:::

## 获取图表实例

通过 `@chart` 事件获取 ECharts 实例，进行更多高级操作。

::: details 查看代码

```vue
<template>
  <ml-chart :options="chartOptions" @chart="onChartReady" />
</template>

<script>
const onChartReady = (chartInstance) => {
  console.log('图表实例:', chartInstance)
  // 可以使用 chartInstance 调用 ECharts 的各种方法
}
</script>
```

:::

## 监听图表事件

组件支持 ECharts 的所有事件，通过 `on` 前缀监听。

::: details 查看代码

```vue
<template>
  <ml-chart :options="chartOptions" @click="handleClick" @mouseover="handleMouseOver" />
</template>

<script>
const handleClick = (params) => {
  console.log('点击了图表:', params)
}

const handleMouseOver = (params) => {
  console.log('鼠标悬停:', params)
}
</script>
```

:::

## Props

| 参数        | 说明           | 类型                                                     | 可选值 | 默认值       |
| ----------- | -------------- | -------------------------------------------------------- | ------ | ------------ |
| options     | ECharts 配置项 | `Record<string, any>`                                    | —      | `{}`         |
| id          | 图表容器 ID    | `string`                                                 | —      | 随机生成     |
| theme       | 图表主题       | `string`                                                 | —      | `''`         |
| isEmpty     | 是否为空状态   | `boolean \| ((options: Record<string, any>) => boolean)` | —      | `false`      |
| description | 空状态描述文字 | `string`                                                 | —      | `'暂无数据'` |

## Events

| 事件名    | 说明                    | 回调参数                       |
| --------- | ----------------------- | ------------------------------ |
| chart     | 图表实例创建完成时触发  | `(chartInstance: any) => void` |
| click     | 图表点击事件            | ECharts 事件参数               |
| dblclick  | 图表双击事件            | ECharts 事件参数               |
| mouseover | 鼠标悬停事件            | ECharts 事件参数               |
| mouseout  | 鼠标移出事件            | ECharts 事件参数               |
| ...       | 支持 ECharts 的所有事件 | —                              |

## Slots

| 插槽名  | 说明                     |
| ------- | ------------------------ |
| empty   | 自定义空状态内容         |
| default | 默认插槽，可添加额外内容 |

## 特性说明

### 自动响应式

组件会自动监听容器尺寸变化并重绘图表，无需手动调用 resize。

### 性能优化

- 使用防抖优化 resize 和 setOption 操作
- 使用 `markRaw` 优化 ECharts 实例，避免 Vue 的响应式开销
- 组件销毁时自动清理 ECharts 实例

### 主题切换

当 `theme` 属性变化时，组件会自动销毁旧实例并使用新主题重新初始化。
