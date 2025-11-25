# MsDetail 详情组件

详情展示组件，基于 `el-descriptions` 二次封装。

<script setup>
import BasicDemo from '../.vitepress/demos/detail/basic.vue'
import FiltersDemo from '../.vitepress/demos/detail/filters.vue'
import SlotDemo from '../.vitepress/demos/detail/slot.vue'
import TooltipDemo from '../.vitepress/demos/detail/tooltip.vue'
</script>

## 基础用法

<BasicDemo />

::: details 查看代码

```vue
<template>
  <ms-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '张三',
  age: 25,
  gender: '男',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  address: '北京市朝阳区'
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    label: '年龄',
    value: dataList.value.age,
    unit: '岁'
  },
  {
    label: '性别',
    value: dataList.value.gender
  },
  {
    label: '手机号',
    value: dataList.value.phone
  },
  {
    label: '邮箱',
    value: dataList.value.email,
    span: 2
  },
  {
    label: '地址',
    value: dataList.value.address,
    span: 2
  }
]
</script>
```

:::

## 下拉数据回显

通过 `filters` 配置实现下拉数据的回显。

<FiltersDemo />

::: details 查看代码

```vue
<template>
  <ms-detail :desc-data="descData" :data-list="dataList" :list-type-info="listTypeInfo" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '李四',
  status: '1',
  type: '2'
})

const listTypeInfo = ref({
  statusList: [
    { label: '启用', value: '1' },
    { label: '禁用', value: '0' }
  ],
  typeList: [
    { label: '类型A', value: '1' },
    { label: '类型B', value: '2' },
    { label: '类型C', value: '3' }
  ]
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    label: '状态',
    fieldName: 'status',
    filters: {
      list: 'statusList'
    }
  },
  {
    label: '类型',
    fieldName: 'type',
    filters: {
      list: 'typeList'
    }
  }
]
</script>
```

:::

## 自定义插槽

通过 `slotName` 配置自定义内容展示。

<SlotDemo />

::: details 查看代码

```vue
<template>
  <ms-detail :desc-data="descData" :data-list="dataList">
    <template #statusSlot>
      <el-tag :type="dataList.status === '1' ? 'success' : 'danger'">
        {{ dataList.status === '1' ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </ms-detail>
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '王五',
  status: '1',
  createTime: '2024-01-01 12:00:00'
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    label: '状态',
    slotName: 'statusSlot'
  },
  {
    label: '创建时间',
    value: dataList.value.createTime
  }
]
</script>
```

:::

## 提示信息

通过 `tooltip` 配置添加提示信息。

<TooltipDemo />

::: details 查看代码

```vue
<template>
  <ms-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '赵六',
  score: 95
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name,
    tooltip: '这是用户的真实姓名'
  },
  {
    label: '分数',
    value: dataList.value.score,
    tooltip: (item) => `当前分数为：${item.value}分`,
    iconSize: 16,
    iconColor: '#409eff'
  }
]
</script>
```

:::

## 自定义标签渲染

通过 `labelRender` 函数自定义标签渲染。

```vue
<template>
  <ms-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref, h } from 'vue'
import { ElTag } from 'element-plus'

const dataList = ref({
  name: '测试用户',
  priority: 'high'
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    labelRender: (item) => {
      return h('div', [
        h(ElTag, { type: 'danger', size: 'small' }, { default: () => '重要' }),
        h('span', { style: 'margin-left: 8px' }, '优先级：')
      ])
    },
    value: '高'
  }
]
</script>
```

## 多列布局

通过 `descColumn` 属性设置每行显示的列数。

```vue
<template>
  <ms-detail :desc-column="3" :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
const descData = [
  { label: '字段1', value: '值1' },
  { label: '字段2', value: '值2' },
  { label: '字段3', value: '值3' },
  { label: '字段4', value: '值4', span: 2 },
  { label: '字段5', value: '值5' }
]
</script>
```

## Props

| 参数         | 说明             | 类型                  | 可选值 | 默认值 |
| ------------ | ---------------- | --------------------- | ------ | ------ |
| descColumn   | 每行显示的列数   | `number`              | —      | `4`    |
| dataList     | 数据源           | `Record<string, any>` | —      | `{}`   |
| listTypeInfo | 下拉数据字典     | `Record<string, any>` | —      | `{}`   |
| descData     | 详情项配置       | `DescItem[]`          | —      | `[]`   |
| isColon      | 是否显示标签冒号 | `boolean`             | —      | `true` |
| isLabelBold  | 标签文字是否加粗 | `boolean`             | —      | `true` |

组件继承 `el-descriptions` 的所有属性。

## DescItem 类型

```typescript
interface DescItem {
  span?: number // 占据的列数，默认 1
  bind?: Record<string, any> // el-descriptions-item 的属性
  label?: string // 标签文本
  labelRender?: (item: any) => any // 自定义标签渲染函数
  slotName?: string // 插槽名称
  tooltip?: string | ((item: any) => any) // 提示信息
  placement?: string // tooltip 显示位置，默认 'bottom'
  filters?: {
    // 下拉数据回显配置
    list: string // listTypeInfo 中的字段名
    key?: string // 数据源的 key 字段，默认 'value'
    label?: string // 数据源的 label 字段，默认 'label'
  }
  value?: string | number // 显示值
  unit?: string // 单位
  iconSize?: number // tooltip 图标大小
  iconColor?: string // tooltip 图标颜色
  fieldName?: string // dataList 中的字段名，用于 filters
}
```

## Slots

| 插槽名     | 说明                                | 作用域参数 |
| ---------- | ----------------------------------- | ---------- |
| [slotName] | 自定义内容，slotName 为配置的插槽名 | —          |

## 使用场景

- 用户信息详情展示
- 订单详情展示
- 产品详情展示
- 配置信息展示
- 需要展示键值对数据的场景

## 注意事项

1. `filters` 配置用于下拉数据回显，需要配合 `listTypeInfo` 和 `fieldName` 使用
2. `labelRender` 和 `label` 只需配置一个即可
3. `tooltip` 支持字符串和函数两种形式
4. 自定义插槽优先级最高，如果配置了 `slotName`，则其他显示配置将被忽略
5. `span` 属性用于设置该项占据的列数，可实现跨列显示
