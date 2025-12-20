# MlTreeSelect 树形选择

树形选择组件，支持单选、多选、搜索等功能，是 `MlTreeSelectDialog` 和 `MlTreeSelectDrawer` 的核心组件。

<script setup>
import BasicDemo from '../.vitepress/demos/tree-select/basic.vue'
import MultipleDemo from '../.vitepress/demos/tree-select/multiple.vue'
import SearchDemo from '../.vitepress/demos/tree-select/search.vue'
</script>

## 基础用法

基础的树形选择用法，通过 `treeData` 传入树形数据。

<BasicDemo />

## 多选模式

通过 `multiple` 属性支持多选功能。

<MultipleDemo />

## 搜索功能

通过 `showSearch` 属性启用搜索功能，支持对树节点进行关键词过滤。

<SearchDemo />

::: tip 搜索原理
组件会递归过滤树形节点，匹配节点的 label 字段或其子节点有匹配时，该节点会被保留并显示。
:::

## Props

| 参数                | 说明                   | 类型                  | 可选值 | 默认值                                     |
| ------------------- | ---------------------- | --------------------- | ------ | ------------------------------------------ |
| treeData            | 树形数据               | `T[]`                 | —      | `[]`                                       |
| treeProps           | 树形配置（同 el-tree） | `Record<string, any>` | —      | `{ label: 'label', children: 'children' }` |
| multiple            | 是否多选               | `boolean`             | —      | `false`                                    |
| defaultExpandAll    | 是否默认展开所有节点   | `boolean`             | —      | `true`                                     |
| defaultSelectedKeys | 默认选中的节点key      | `any[]`               | —      | `[]`                                       |
| nodeKey             | 节点唯一标识字段       | `string`              | —      | `'id'`                                     |
| showSearch          | 是否显示搜索框         | `boolean`             | —      | `true`                                     |
| expandOnClickNode   | 是否点击节点展开       | `boolean`             | —      | `undefined`                                |
| placeholder         | 搜索框占位符           | `string`              | —      | `'请输入关键词搜索'`                       |

组件继承 `el-tree` 的所有属性，可以通过 `v-bind` 透传。

## Events

| 事件名  | 说明               | 回调参数                           |
| ------- | ------------------ | ---------------------------------- |
| confirm | 确认选择时触发     | `(selectedData: T \| T[]) => void` |
| cancel  | 取消选择时触发     | `() => void`                       |
| input   | 搜索输入变化时触发 | `(value: string) => void`          |

### el-tree 透传事件

所有 el-tree 的事件都会自动透传，包括：

| 事件名           | 说明                       | 回调参数                         |
| ---------------- | -------------------------- | -------------------------------- |
| node-click       | 节点被点击时触发           | `(data, node, instance)`         |
| node-contextmenu | 节点被鼠标右键点击时触发   | `(event, data, node, instance)`  |
| check-change     | 节点选中状态发生变化时触发 | `(data, checked, indeterminate)` |
| check            | 点击复选框时触发           | `(data, checkState)`             |
| current-change   | 当前选中节点变化时触发     | `(data, node)`                   |
| node-expand      | 节点被展开时触发           | `(data, node, instance)`         |
| node-collapse    | 节点被关闭时触发           | `(data, node, instance)`         |

## 方法

组件通过 `defineExpose` 暴露以下方法：

### 基础方法

| 方法名          | 说明            | 参数            | 返回值     |
| --------------- | --------------- | --------------- | ---------- |
| reset           | 重置选择        | —               | `void`     |
| getSelectedData | 获取选中数据    | —               | `T \| T[]` |
| getSelectedKeys | 获取选中节点key | —               | `any[]`    |
| input           | 触发输入事件    | `value: string` | `void`     |

### el-tree 方法透传

| 方法名              | 说明                       | 参数                                     | 返回值                          |
| ------------------- | -------------------------- | ---------------------------------------- | ------------------------------- |
| getCheckedNodes     | 获取被勾选的节点           | —                                        | `any[]`                         |
| getCheckedKeys      | 获取被勾选节点的 key       | —                                        | `any[]`                         |
| getHalfCheckedNodes | 获取半选节点               | —                                        | `any[]`                         |
| getHalfCheckedKeys  | 获取半选节点的 key         | —                                        | `any[]`                         |
| getCurrentKey       | 获取当前选中节点的 key     | —                                        | `string \| number \| undefined` |
| getCurrentNode      | 获取当前选中节点           | —                                        | `any`                           |
| setCheckedKeys      | 设置勾选的节点             | `keys: any[]`                            | `void`                          |
| setCheckedNodes     | 设置勾选的节点对象         | `nodes: any[]`                           | `void`                          |
| setCurrentKey       | 设置当前选中节点的 key     | `key: string \| number \| undefined`     | `void`                          |
| setCurrentNode      | 设置当前选中节点           | `node: any`                              | `void`                          |
| getNode             | 获取指定 key 对应的节点    | `key: string \| number`                  | `any`                           |
| filter              | 对树节点进行筛选操作       | `value: string`                          | `void`                          |
| updateKeyChildren   | 为 lazy 树更新某节点子节点 | `key: string \| number, children: any[]` | `void`                          |
| remove              | 删除节点                   | `node: any`                              | `void`                          |
| append              | 插入一个新的节点           | `data: any, parentNode?: any`            | `void`                          |
| insertBefore        | 在指定节点前插入节点       | `data: any, refNode: any`                | `void`                          |
| insertAfter         | 在指定节点后插入节点       | `data: any, refNode: any`                | `void`                          |

## Slots

| 插槽名 | 说明       | 作用域参数 |
| ------ | ---------- | ---------- |
| footer | 底部按钮区 | —          |

默认底部包含"取消"和"确定"按钮，可以通过 `footer` 插槽自定义。

## 使用场景

- 作为独立的树形选择组件使用
- 作为 `MlTreeSelectDialog` 和 `MlTreeSelectDrawer` 的核心组件
- 需要内嵌在页面中的树形选择功能
- 组织架构选择、菜单选择、分类选择等

## 注意事项

1. **数据结构**：确保 `treeData` 的数据结构与 `treeProps` 配置匹配
2. **节点唯一标识**：`nodeKey` 必须对应树节点中的唯一标识字段
3. **单选与多选**：单选模式下点击节点即可选中，多选模式下需要勾选复选框
4. **搜索过滤**：搜索基于 `treeProps.label` 字段进行模糊匹配
5. **方法调用**：需要通过 `ref` 获取组件实例后调用暴露的方法
