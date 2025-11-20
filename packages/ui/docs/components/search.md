# MlSearch 搜索组件

搜索表单组件，支持多种输入类型。

## 基础用法

<script setup>
import BasicDemo from '../.vitepress/demos/search/basic.vue'
</script>

<BasicDemo />

::: details 查看代码

```vue
<template>
  <ml-search
    v-model="searchModel"
    :item="searchItems"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchModel = ref({
  name: '',
  status: ''
})

const searchItems = [
  {
    prop: 'name',
    input: {
      type: 'input',
      props: {
        placeholder: '请输入名称'
      }
    },
    formItemProps: {
      label: '名称'
    }
  },
  {
    prop: 'status',
    input: {
      type: 'select',
      props: {
        placeholder: '请选择状态',
        options: [
          { label: '启用', value: '1' },
          { label: '禁用', value: '0' }
        ],
        labelKey: 'label',
        valueKey: 'value'
      }
    },
    formItemProps: {
      label: '状态'
    }
  }
]

const handleSubmit = () => {
  console.log('搜索参数:', searchModel.value)
}

const handleReset = () => {
  console.log('重置搜索')
}
</script>
```

:::

## 日期选择

```vue
<script setup>
const searchItems = [
  {
    prop: 'createTime',
    input: {
      type: 'date-picker',
      props: {
        type: 'daterange',
        placeholder: '请选择日期范围',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      }
    },
    formItemProps: {
      label: '创建时间'
    }
  }
]
</script>
```

## 自定义插槽

使用 `slots` 配置项和具名插槽实现自定义输入控件。

```vue
<template>
  <ml-search v-model="searchModel" :item="searchItems" :slots="customSlots">
    <template #customField="{ searchModel }">
      <el-input v-model="searchModel.customField" placeholder="自定义输入框" />
    </template>
  </ml-search>
</template>

<script setup>
const searchItems = [
  {
    prop: 'name',
    input: {
      type: 'input',
      props: { placeholder: '请输入名称' }
    },
    formItemProps: { label: '名称' }
  }
]

const customSlots = [
  {
    prop: 'customField',
    position: 1, // 插入位置
    formItemProps: {
      label: '自定义字段'
    }
  }
]
</script>
```

## 展开/收起

组件默认支持展开收起功能，超出一行的搜索项会被折叠。

## Props

| 参数          | 说明             | 类型               | 可选值                        | 默认值    |
| ------------- | ---------------- | ------------------ | ----------------------------- | --------- |
| inline        | 是否为行内表单   | `boolean`          | —                             | `false`   |
| disabled      | 是否禁用         | `boolean`          | —                             | `false`   |
| labelWidth    | 表单域标签宽度   | `string \| number` | —                             | `''`      |
| labelPosition | 表单域标签位置   | `string`           | `left` / `right` / `top`      | `top`     |
| size          | 表单尺寸         | `string`           | `large` / `default` / `small` | `default` |
| gutter        | 栅格间隔         | `number`           | —                             | `10`      |
| span          | 每项占据的栅格数 | `number`           | —                             | `6`       |
| submitBtnText | 查询按钮文字     | `string`           | —                             | `查询`    |
| resetBtnText  | 重置按钮文字     | `string`           | —                             | `重置`    |
| item          | 搜索项配置       | `SearchItem[]`     | —                             | `[]`      |
| slots         | 自定义插槽配置   | `CustomSlot[]`     | —                             | `[]`      |

## SearchItem 类型

```typescript
interface SearchItem {
  prop: string // 字段名
  span?: number // 栅格占据数
  placeholder?: string // 占位符
  multiple?: boolean // 是否多选
  options?: any[] // 选项列表
  labelWidth?: string // 标签宽度
  input?: {
    type: 'input' | 'select' | 'date-picker' // 输入类型
    props?: any // 传递给输入组件的属性
  }
  colProps?: any // el-col 属性
  formItemProps?: any // el-form-item 属性
}
```

## CustomSlot 类型

```typescript
interface CustomSlot {
  prop: string // 插槽名称
  span?: number // 栅格占据数，默认 6
  colProps?: any // el-col 属性
  formItemProps?: any // el-form-item 属性
  position?: number // 插入位置索引
}
```

## Events

| 事件名 | 说明               | 回调参数     |
| ------ | ------------------ | ------------ |
| submit | 点击查询按钮时触发 | `() => void` |
| reset  | 点击重置按钮时触发 | `() => void` |

## Slots

| 插槽名 | 说明                          | 作用域参数        |
| ------ | ----------------------------- | ----------------- |
| [prop] | 自定义输入控件，prop 为字段名 | `{ searchModel }` |

## 输入类型说明

### input（输入框）

```javascript
{
  prop: 'name',
  input: {
    type: 'input',
    props: {
      placeholder: '请输入',
      maxlength: 50,
      clearable: true
    }
  }
}
```

### select（下拉选择）

```javascript
{
  prop: 'status',
  input: {
    type: 'select',
    props: {
      placeholder: '请选择',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ],
      labelKey: 'label', // 选项显示字段
      valueKey: 'value', // 选项值字段
      multiple: false
    }
  }
}
```

### date-picker（日期选择）

```javascript
{
  prop: 'date',
  input: {
    type: 'date-picker',
    props: {
      type: 'daterange', // date/daterange/datetime 等
      placeholder: '请选择日期',
      format: 'YYYY-MM-DD'
    }
  }
}
```
