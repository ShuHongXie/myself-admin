# MlTreeSelectDrawer 树形选择抽屉

树形选择抽屉组件，将树形选择功能集成到抽屉中，提供更灵活的选择体验。

<script setup>
import BasicDemo from '../.vitepress/demos/tree-select-drawer/basic.vue'
import MultipleDemo from '../.vitepress/demos/tree-select-drawer/multiple.vue'
</script>

## 基础用法

点击按钮打开抽屉，在抽屉中选择树形数据。

<BasicDemo />

::: details 查看代码

```vue
<template>
  <div>
    <el-button type="primary" @click="drawerVisible = true">打开树形选择抽屉</el-button>

    <ml-tree-select-drawer
      v-model="drawerVisible"
      title="选择部门"
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

const drawerVisible = ref(false)

const treeData = [
  {
    id: '1',
    label: '公司总部',
    children: [
      {
        id: '1-1',
        label: '研发中心'
      }
    ]
  }
]

const handleConfirm = (selectedData) => {
  ElMessage.success(`选择了: ${selectedData.label}`)
  drawerVisible.value = false
}

const handleClose = () => {
  ElMessage.info('抽屉已关闭')
}
</script>
```

:::

## 多选抽屉

通过 `multiple` 属性支持多选功能。

<MultipleDemo />

::: details 查看代码

```vue
<template>
  <div>
    <el-button type="success" @click="drawerVisible = true">多选抽屉</el-button>

    <ml-tree-select-drawer
      v-model="drawerVisible"
      title="批量分配权限"
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

const drawerVisible = ref(false)

const treeData = [
  // 树形数据...
]

const handleConfirm = (selectedData) => {
  const names = selectedData.map(d => d.label).join(', ')
  ElMessage.success(`已分配 ${selectedData.length} 项权限: ${names}`)
  drawerVisible.value = false
}

const handleClose = () => {
  ElMessage.info('抽屉已关闭')
}
</script>
```

:::

## Props

### 抽屉特有属性

| 参数      | 说明                   | 类型     | 可选值                    | 默认值     |
| --------- | ---------------------- | -------- | ------------------------- | ---------- |
| modelValue | 抽屉的显示状态（v-model） | `boolean` | — | `false` |
| title     | 抽屉的标题             | `string` | —                         | `'树形选择'` |
| size      | 抽屉的宽度/高度        | `string` | —                         | `'400px'`  |
| direction | 抽屉打开方向           | `string` | `'ltr'` / `'rtl'` / `'ttb'` / `'btt'` | `'rtl'` |

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
| close | 抽屉关闭时触发           | `() => void`      |

## v-model

使用 `v-model` 双向绑定抽屉的显示状态：

```vue
<ml-tree-select-drawer v-model="drawerVisible" />
```

## 使用场景

- 在页面侧边栏中选择树形数据
- 批量编辑时的数据选择
- 不希望使用对话框的场景
- 需要更大操作空间的树形选择

## 注意事项

1. **抽屉关闭时重置**：关闭抽屉时会自动重置树形选择的状态
2. **打开方向**：通过 `direction` 属性控制抽屉打开方向
  - `'ltr'` - 从左向右打开
  - `'rtl'` - 从右向左打开（默认）
  - `'ttb'` - 从上向下打开
  - `'btt'` - 从下向上打开
3. **属性透传**：抽屉的其他属性（如 `lock-scroll`）可以直接传递
4. **与 MlTreeSelect 的关系**：本组件内部使用 `MlTreeSelect`，支持其所有配置
5. **双向绑定**：务必使用 `v-model` 绑定 `visible` 属性，否则抽屉无法正确打开/关闭
