# MlTreeSelectDialog 树形选择对话框

树形选择对话框组件，将树形选择功能集成到对话框中，支持单选、多选等功能。

<script setup>
import BasicDemo from '../.vitepress/demos/tree-select-dialog/basic.vue'
import MultipleDemo from '../.vitepress/demos/tree-select-dialog/multiple.vue'
import EventsDemo from '../.vitepress/demos/tree-select-dialog/events.vue'
</script>

## 基础用法

点击按钮打开对话框，在对话框中选择树形数据。

<BasicDemo />

## 多选对话框

通过 `multiple` 属性支持多选功能。

<MultipleDemo />

## 事件透传示例

所有 el-tree 的事件都会自动透传，可以直接在父组件中监听。

<EventsDemo />

::: tip 事件透传原理
组件使用 `v-on="$attrs"` 实现事件批量透传，无需手动定义每个事件。

**透传链路：**

```
父组件 → MlTreeSelectDialog → MlTreeSelect → el-tree
```

这意味着你可以直接在 `<ml-tree-select-dialog>` 上监听所有 el-tree 的事件，如：

- `@node-click` - 节点被点击
- `@node-contextmenu` - 节点右键菜单
- `@check-change` - 勾选状态变化
- `@check` - 勾选节点
- `@current-change` - 当前选中节点变化
- `@node-expand` - 节点展开
- `@node-collapse` - 节点收起
- `@node-drag-start` - 节点开始拖拽
- `@node-drag-enter` - 拖拽进入节点
- `@node-drag-leave` - 拖拽离开节点
- `@node-drag-over` - 拖拽经过节点
- `@node-drag-end` - 拖拽结束
- `@node-drop` - 拖拽成功
  :::

## Props

### 对话框特有属性

| 参数       | 说明                        | 类型      | 可选值 | 默认值       |
| ---------- | --------------------------- | --------- | ------ | ------------ |
| modelValue | 对话框的显示状态（v-model） | `boolean` | —      | `false`      |
| title      | 对话框的标题                | `string`  | —      | `'树形选择'` |
| width      | 对话框的宽度                | `string`  | —      | `'500px'`    |

### 树形选择属性

继承 `MlTreeSelect` 的所有属性，如 `treeData`、`multiple`、`nodeKey` 等。

## Events

### 组件自定义事件

| 事件名  | 说明               | 回调参数                           |
| ------- | ------------------ | ---------------------------------- |
| confirm | 确认选择时触发     | `(selectedData: T \| T[]) => void` |
| close   | 对话框关闭时触发   | `() => void`                       |
| input   | 搜索输入变化时触发 | `(value: string) => void`          |

### el-tree 透传事件

所有 el-tree 的事件都会自动透传，包括：

| 事件名           | 说明                       | 回调参数                                    |
| ---------------- | -------------------------- | ------------------------------------------- |
| node-click       | 节点被点击时触发           | `(data, node, instance)`                    |
| node-contextmenu | 节点被鼠标右键点击时触发   | `(event, data, node, instance)`             |
| check-change     | 节点选中状态发生变化时触发 | `(data, checked, indeterminate)`            |
| check            | 点击复选框时触发           | `(data, checkState)`                        |
| current-change   | 当前选中节点变化时触发     | `(data, node)`                              |
| node-expand      | 节点被展开时触发           | `(data, node, instance)`                    |
| node-collapse    | 节点被关闭时触发           | `(data, node, instance)`                    |
| node-drag-start  | 节点开始拖拽时触发         | `(node, event)`                             |
| node-drag-enter  | 拖拽进入其他节点时触发     | `(draggingNode, dropNode, event)`           |
| node-drag-leave  | 拖拽离开某个节点时触发     | `(draggingNode, dropNode, event)`           |
| node-drag-over   | 在拖拽节点时触发           | `(draggingNode, dropNode, event)`           |
| node-drag-end    | 拖拽结束时触发             | `(draggingNode, dropNode, dropType, event)` |
| node-drop        | 拖拽成功完成时触发         | `(draggingNode, dropNode, dropType, event)` |

## 方法

组件通过 `defineExpose` 暴露以下方法：

| 方法名 | 说明         | 参数            | 返回值 |
| ------ | ------------ | --------------- | ------ |
| input  | 触发输入事件 | `value: string` | `void` |

::: tip
更多方法请参考内部 `MlTreeSelect` 组件的方法，可以通过组件实例访问。
:::

## 使用场景

- 在表单中选择组织结构或部门
- 弹出框中选择权限或菜单
- 对话框方式的分类选择
- 其他需要树形选择的场景

## 注意事项

1. **对话框关闭时重置**：关闭对话框时会自动重置树形选择的状态
2. **属性透传**：对话框的其他属性（如 `close-on-click-modal`）可以直接传递
3. **事件透传**：所有 el-tree 的事件都会自动透传，无需手动定义
4. **双向绑定**：务必使用 `v-model` 绑定 `visible` 属性，否则对话框无法正确打开/关闭
