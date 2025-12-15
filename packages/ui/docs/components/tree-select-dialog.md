# MlTreeSelectDialog 树形选择对话框

树形选择对话框组件，将树形选择功能集成到对话框中，支持单选、多选等功能。

<script setup>
import BasicDemo from '../.vitepress/demos/tree-select-dialog/basic.vue'
import MultipleDemo from '../.vitepress/demos/tree-select-dialog/multiple.vue'
</script>

## 基础用法

点击按钮打开对话框，在对话框中选择树形数据。

<BasicDemo />

::: details 查看代码

```vue
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">打开树形选择对话框</el-button>

    <ml-tree-select-dialog
      v-model="dialogVisible"
      title="选择组织结构"
      :tree-data="treeData"
      :default-selected-keys="['1-1']"
      @confirm="handleConfirm"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const treeData = [
  {
    id: '1',
    label: '总公司',
    children: [
      {
        id: '1-1',
        label: '技术部'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
  dialogVisible.value = false
}

const handleClose = () => {
  ElMessage.info('对话框已关闭')
}
</script>
```

:::

## 多选对话框

通过 `multiple` 属性支持多选功能。

<MultipleDemo />

::: details 查看代码

```vue
<template>
  <div>
    <el-button type="success" @click="dialogVisible = true">多选对话框</el-button>

    <ml-tree-select-dialog
      v-model="dialogVisible"
      title="选择权限"
      :tree-data="treeData"
      :multiple="true"
      :default-selected-keys="['1-1', '2-1']"
      @confirm="handleConfirm"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const treeData = [
  // 树形数据...
]

const handleConfirm = (selectedData) => {
  const names = selectedData.map(d => d.label).join(', ')
  ElMessage.success(`选择了 ${selectedData.length} 项: ${names}`)
  dialogVisible.value = false
}

const handleClose = () => {
  ElMessage.info('对话框已关闭')
}
</script>
```

:::

## Props

### 对话框特有属性

| 参数  | 说明                   | 类型     | 可选值 | 默认值     |
| ----- | ---------------------- | -------- | ------ | ---------- |
| modelValue | 对话框的显示状态（v-model） | `boolean` | — | `false` |
| title | 对话框的标题           | `string` | —      | `'树形选择'` |
| width | 对话框的宽度           | `string` | —      | `'500px'` |

### 树形选择属性

继承 `MlTreeSelect` 的所有属性：

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

## Events

| 事件名 | 说明                     | 回调参数          |
| ------ | ------------------------ | ----------------- |
| confirm | 确认选择时触发           | `(selectedData: T \| T[]) => void` |
| close | 对话框关闭时触发         | `() => void`      |

## v-model

使用 `v-model` 双向绑定对话框的显示状态：

```vue
<ml-tree-select-dialog v-model="dialogVisible" />
```

## 使用场景

- 在表单中选择组织结构或部门
- 弹出框中选择权限或菜单
- 对话框方式的分类选择
- 其他需要树形选择的场景

## 注意事项

1. **对话框关闭时重置**：关闭对话框时会自动重置树形选择的状态
2. **属性透传**：对话框的其他属性（如 `close-on-click-modal`）可以直接传递
3. **与 MlTreeSelect 的关系**：本组件内部使用 `MlTreeSelect`，支持其所有配置
4. **双向绑定**：务必使用 `v-model` 绑定 `visible` 属性，否则对话框无法正确打开/关闭
