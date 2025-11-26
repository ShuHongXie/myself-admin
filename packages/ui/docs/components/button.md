# MlButton 按钮组件

基于 `el-button` 二次封装的按钮组件，内置防抖功能，防止用户快速重复点击。

<script setup>
import BasicDemo from '../.vitepress/demos/button/basic.vue'
import DebounceDemo from '../.vitepress/demos/button/debounce.vue'
import TooltipDemo from '../.vitepress/demos/button/tooltip.vue'
</script>

## 基础用法

基础的按钮用法，继承 `el-button` 的所有属性。

<BasicDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-button">
    <ml-button type="primary" @click="handleClick">主要按钮</ml-button>
    <ml-button type="success" @click="handleClick">成功按钮</ml-button>
    <ml-button type="info" @click="handleClick">信息按钮</ml-button>
    <ml-button type="warning" @click="handleClick">警告按钮</ml-button>
    <ml-button type="danger" @click="handleClick">危险按钮</ml-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('按钮被点击了')
}
</script>
```

:::

## 防抖功能

内置防抖功能，默认防抖时间为 1000ms，可以通过 `time` 属性自定义防抖时间，通过 `isDebounce` 属性控制是否启用防抖。

<DebounceDemo />

::: details 查看代码

```vue
<template>
  <div>
    <div class="demo-section">
      <p>默认防抖（1000ms）：快速点击只会触发一次</p>
      <ml-button type="primary" @click="handleDebounceClick">
        防抖按钮（点击次数：{{ clickCount }}）
      </ml-button>
    </div>
    
    <div class="demo-section">
      <p>自定义防抖时间（500ms）：</p>
      <ml-button type="success" :time="500" @click="handleCustomClick">
        500ms防抖（点击次数：{{ customCount }}）
      </ml-button>
    </div>
    
    <div class="demo-section">
      <p>禁用防抖：每次点击都会触发</p>
      <ml-button type="warning" :is-debounce="false" @click="handleNoDebounceClick">
        无防抖（点击次数：{{ noDebounceCount }}）
      </ml-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const clickCount = ref(0)
const customCount = ref(0)
const noDebounceCount = ref(0)

const handleDebounceClick = () => {
  clickCount.value++
  ElMessage.success(`防抖点击 ${clickCount.value}`)
}

const handleCustomClick = () => {
  customCount.value++
  ElMessage.success(`自定义防抖点击 ${customCount.value}`)
}

const handleNoDebounceClick = () => {
  noDebounceCount.value++
  ElMessage.success(`无防抖点击 ${noDebounceCount.value}`)
}
</script>
```

:::

## 提示信息

通过 `tip` 属性可以为按钮添加 tooltip 提示信息，支持通过 `placement` 设置提示位置，通过 `tipProps` 自定义 tooltip 属性。

<TooltipDemo />

::: details 查看代码

```vue
<template>
  <div>
    <ml-button 
      type="primary" 
      tip="这是一个提示信息" 
      @click="handleClick"
    >
      悬停查看提示
    </ml-button>
    
    <ml-button 
      type="success" 
      tip="提示在右侧显示" 
      placement="right"
      @click="handleClick"
    >
      右侧提示
    </ml-button>
    
    <ml-button 
      type="warning" 
      tip="这是一个很长的提示信息，用来演示提示框的换行效果" 
      placement="top"
      :tip-props="{ effect: 'dark' }"
      @click="handleClick"
    >
      自定义提示样式
    </ml-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('按钮被点击了')
}
</script>
```

:::

## Props

| 参数        | 说明                                      | 类型                   | 可选值                                         | 默认值  |
| ----------- | ----------------------------------------- | ---------------------- | ---------------------------------------------- | ------- |
| time        | 防抖时间（毫秒）                          | `number`               | —                                              | `1000`  |
| tip         | 提示信息                                  | `string`               | —                                              | `''`    |
| placement   | 提示信息显示位置                          | `string`               | `top`/`bottom`/`left`/`right` 等               | `'top'` |
| tipProps    | el-tooltip 的其他属性                     | `Record<string, any>`  | —                                              | `{}`    |
| isDebounce  | 是否启用防抖                              | `boolean`              | —                                              | `true`  |

组件继承 `el-button` 的所有属性，如 `type`、`size`、`plain`、`round`、`circle`、`loading`、`disabled` 等。

## Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| click  | 点击按钮时触发 | `() => void` |

## Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 按钮内容       |

## 使用场景

- 防止表单重复提交
- 防止接口重复调用
- 防止用户快速重复点击
- 需要提示信息的按钮
- 所有需要按钮的场景

## 注意事项

1. **防抖机制**：默认启用防抖，防抖时间为 1000ms，在此时间内的重复点击将被忽略
2. **自定义防抖时间**：可以通过 `time` 属性自定义防抖时间，单位为毫秒
3. **禁用防抖**：如果不需要防抖功能，可以设置 `:is-debounce="false"`
4. **提示信息**：当设置了 `tip` 属性时，会自动包裹 `el-tooltip` 组件
5. **完全兼容**：继承 `el-button` 的所有功能和样式，可以直接替换使用
