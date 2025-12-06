# MlNumberRangeInput 数值范围输入框

用于输入数值范围的组件，基于 `el-input` 封装，支持最小值和最大值输入，适用于价格区间、年龄范围、数量区间等场景。

<script setup>
import BasicDemo from '../.vitepress/demos/number-range-input/basic.vue'
import WithValueDemo from '../.vitepress/demos/number-range-input/with-value.vue'
import CustomPropsDemo from '../.vitepress/demos/number-range-input/custom-props.vue'
import SlotsDemo from '../.vitepress/demos/number-range-input/slots.vue'
import DisabledDemo from '../.vitepress/demos/number-range-input/disabled.vue'
</script>

## 基础用法

基本的数值范围输入，使用 `v-model` 绑定一个数组，第一个元素为最小值，第二个元素为最大值。

<BasicDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-number-range-input">
    <ml-number-range-input v-model="priceRange" label="价格" />
    <p class="demo-result">当前值: {{ priceRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const priceRange = ref([null, null])
</script>
```

:::

## 带初始值

可以设置初始值，数组第一个元素为最小值，第二个元素为最大值。

<WithValueDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-number-range-input">
    <ml-number-range-input v-model="ageRange" label="年龄" />
    <p class="demo-result">当前值: {{ ageRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ageRange = ref([18, 60])
</script>
```

:::

## 自定义属性

通过 `inputProps` 可以为两个输入框统一设置属性，通过 `minInputProps` 和 `maxInputProps` 可以分别为最小值和最大值输入框设置属性。支持自定义分隔符。

<CustomPropsDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-section">
    <div class="demo-item">
      <h4>大尺寸 + 可清空</h4>
      <ml-number-range-input
        v-model="range1"
        label="数量"
        :input-props="{
          size: 'large',
          clearable: true
        }"
      />
      <p class="demo-result">当前值: {{ range1 }}</p>
    </div>

    <div class="demo-item">
      <h4>自定义占位符</h4>
      <ml-number-range-input
        v-model="range2"
        label="价格"
        :min-input-props="{ placeholder: '最低价' }"
        :max-input-props="{ placeholder: '最高价' }"
      />
      <p class="demo-result">当前值: {{ range2 }}</p>
    </div>

    <div class="demo-item">
      <h4>自定义分隔符</h4>
      <ml-number-range-input v-model="range3" label="金额" separator="-" />
      <p class="demo-result">当前值: {{ range3 }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const range1 = ref([null, null])
const range2 = ref([null, null])
const range3 = ref([null, null])
</script>
```

:::

## 插槽

支持 `el-input` 的所有插槽，包括 `prefix`、`suffix`、`prepend`、`append`。需要在插槽名称前加上 `min-` 或 `max-` 前缀以区分最小值和最大值输入框。

<SlotsDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-section">
    <div class="demo-item">
      <h4>前缀/后缀插槽</h4>
      <ml-number-range-input v-model="salaryRange" label="薪资">
        <template #min-prefix>
          <span style="padding: 0 8px">￥</span>
        </template>
        <template #max-suffix>
          <span style="padding: 0 8px">K</span>
        </template>
      </ml-number-range-input>
      <p class="demo-result">当前值: {{ salaryRange }}</p>
    </div>

    <div class="demo-item">
      <h4>前置/后置内容插槽</h4>
      <ml-number-range-input v-model="percentRange" label="百分比">
        <template #min-append>%</template>
        <template #max-append>%</template>
      </ml-number-range-input>
      <p class="demo-result">当前值: {{ percentRange }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const salaryRange = ref([null, null])
const percentRange = ref([0, 100])
</script>
```

:::

## 禁用状态

通过 `disabled` 属性可以禁用输入框。

<DisabledDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-number-range-input">
    <ml-number-range-input v-model="range" label="价格" disabled />
    <p class="demo-result">当前值: {{ range }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const range = ref([100, 500])
</script>
```

:::

## Props

| 参数          | 说明                   | 类型                               | 默认值         |
| ------------- | ---------------------- | ---------------------------------- | -------------- |
| v-model       | 绑定值                 | `[number \| null, number \| null]` | `[null, null]` |
| label         | 区间名称               | `string`                           | —              |
| disabled      | 是否禁用               | `boolean`                          | `false`        |
| separator     | 分隔符                 | `string`                           | `'至'`         |
| inputProps    | 两个输入框的通用属性   | `Partial<InputProps>`              | —              |
| minInputProps | 最小值输入框的特定属性 | `Partial<InputProps>`              | —              |
| maxInputProps | 最大值输入框的特定属性 | `Partial<InputProps>`              | —              |

## Slots

| 插槽名      | 说明                   |
| ----------- | ---------------------- |
| min-prefix  | 最小值输入框的头部内容 |
| min-suffix  | 最小值输入框的尾部内容 |
| min-prepend | 最小值输入框的前置内容 |
| min-append  | 最小值输入框的后置内容 |
| max-prefix  | 最大值输入框的头部内容 |
| max-suffix  | 最大值输入框的尾部内容 |
| max-prepend | 最大值输入框的前置内容 |
| max-append  | 最大值输入框的后置内容 |

## 使用场景

- 价格区间筛选
- 年龄范围筛选
- 数量区间输入
- 评分范围筛选
- 任何需要输入数值范围的场景

## 注意事项

1. **数据格式**：`v-model` 绑定的值必须是数组格式 `[min, max]`，第一个元素为最小值，第二个元素为最大值
2. **数值类型**：输入框会自动将输入转换为数字类型，使用 `v-model.number` 修饰符
3. **验证**：组件本身不包含验证逻辑，建议在外部使用 `el-form-item` 进行验证
4. **属性优先级**：`minInputProps` 和 `maxInputProps` 的优先级高于 `inputProps`，可以覆盖通用属性
5. **插槽命名**：使用插槽时，需要在插槽名称前加上 `min-` 或 `max-` 前缀以区分最小值和最大值输入框
