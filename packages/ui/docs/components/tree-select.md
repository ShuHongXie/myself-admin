# MlTreeSelect 树形选择组件

树形选择组件，支持单选、多选、搜索等功能，可用于快速选择树形数据。

<script setup>
import BasicDemo from '../.vitepress/demos/tree-select/basic.vue'
import MultipleDemo from '../.vitepress/demos/tree-select/multiple.vue'
import SearchDemo from '../.vitepress/demos/tree-select/search.vue'
</script>

## 基础用法

基础的树形选择，默认为单选模式，支持搜索和动态展开。

<BasicDemo />

::: details 查看代码

```vue
<template>
  <div class="demo-tree-select">
    <div class="demo-section">
      <h4>单选模式</h4>
      <ml-tree-select
        :tree-data="treeData"
        :default-selected-keys="['1']"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const treeData = [
  {
    id: '1',
    label: '一级 1',
    children: [
      {
        id: '1-1',
        label: '二级 1-1',
        children: [
          {
            id: '1-1-1',
            label: '三级 1-1-1'
          },
          {
            id: '1-1-2',
            label: '三级 1-1-2'
          }
        ]
      },
      {
        id: '1-2',
        label: '二级 1-2'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
}

const handleCancel = () => {
  ElMessage.info('已取消选择')
}
</script>
```

:::

## 多选模式

设置 `multiple` 属性为 `true` 启用多选模式，用户可以选择多个节点。

<MultipleDemo />

::: details 查看代码

```vue
<template>
  <ml-tree-select
    :tree-data="treeData"
    :multiple="true"
    :default-selected-keys="['1-1', '2-1']"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ElMessage } from 'element-plus'

const treeData = [
  // 树形数据...
]

const handleConfirm = (selectedData) => {
  const names = selectedData.map(d => d.label).join(', ')
  ElMessage.success(`选择了 ${selectedData.length} 项: ${names}`)
}

const handleCancel = () => {
  ElMessage.info('已取消选择')
}
</script>
```

:::

## 搜索功能

内置搜索功能，可以快速过滤树形数据。

<SearchDemo />

::: details 查看代码

```vue
<template>
  <ml-tree-select
    :tree-data="treeData"
    :show-search="true"
    placeholder="搜索节点..."
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ElMessage } from 'element-plus'

const treeData = [
  // 树形数据...
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
}

const handleCancel = () => {
  ElMessage.info('已取消选择')
}
</script>
```

:::

## Props

| 参数                   | 说明                  | 类型                  | 可选值 | 默认值                          |
| ---------------------- | --------------------- | --------------------- | ------ | ------------------------------- |
| treeData               | 树形数据              | `T[]`                 | —      | `[]`                            |
| treeProps              | 树的节点属性配置      | `Record<string, any>` | —      | `{ label: 'label', children: 'children' }` |
| multiple               | 是否为多选            | `boolean`             | —      | `false`                         |
| defaultExpandAll       | 是否默认展开所有节点  | `boolean`             | —      | `true`                          |
| defaultSelectedKeys    | 默认选中的节点 key    | `any[]`               | —      | `[]`                            |
| nodeKey                | 节点的唯一标识字段    | `string`              | —      | `'id'`                          |
| showSearch             | 是否显示搜索框        | `boolean`             | —      | `true`                          |
| placeholder            | 搜索框占位符          | `string`              | —      | `'请输入关键词搜索'`            |
| expandOnClickNode      | 是否点击节点展开      | `boolean`             | —      | `false`                         |

## Events

| 事件名 | 说明                     | 回调参数          |
| ------ | ------------------------ | ----------------- |
| confirm | 确认选择时触发           | `(selectedData: T \| T[]) => void` |
| cancel | 取消选择时触发           | `() => void`      |

## Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| footer  | 底部操作按钮槽 |

## Methods

通过 `ref` 可以访问以下方法：

| 方法名          | 说明                   | 参数  | 返回值     |
| --------------- | ---------------------- | ----- | ---------- |
| reset           | 重置所有选择           | —     | `void`     |
| getSelectedData | 获取选中的数据         | —     | `T \| T[]` |
| getSelectedKeys | 获取选中的节点 key     | —     | `any[]`    |

## 使用场景

- 选择组织结构或部门
- 权限或菜单选择
- 分类或标签选择
- 任何需要树形数据选择的场景

## 注意事项

1. **树形数据结构**：确保提供的数据结构与 `treeProps` 配置匹配
2. **节点唯一标识**：`nodeKey` 指定的字段值在树中必须唯一
3. **搜索功能**：搜索会根据 `treeProps.label` 指定的字段进行匹配
4. **默认值**：`defaultSelectedKeys` 中的值应该存在于 `treeData` 中
5. **泛型约束**：组件使用泛型 `T`，确保树形数据类型的一致性
