# MlSearchTable 搜索表格组件

集成搜索和表格功能的复合组件，自动处理数据请求和分页。

<script setup>
import BasicDemo from '../.vitepress/demos/search-table/basic.vue'
import RenderDemo from '../.vitepress/demos/search-table/render.vue'
import SlotDemo from '../.vitepress/demos/search-table/slot.vue'
</script>

## 基础用法

::: tip 提示
下方演示使用 Mock 数据模拟后端 API，支持搜索和分页功能。
:::

<BasicDemo />

::: details 查看代码

```vue
<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/user/list"
    method-type="post"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchModel = ref({
  name: '',
  status: ''
})

const searchConfig = {
  item: [
    {
      prop: 'name',
      input: {
        type: 'input',
        props: { placeholder: '请输入用户名' }
      },
      formItemProps: { label: '用户名' }
    },
    {
      prop: 'status',
      input: {
        type: 'select',
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ],
          labelKey: 'label',
          valueKey: 'value'
        }
      },
      formItemProps: { label: '状态' }
    }
  ]
}

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '用户名', width: 120 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'status', label: '状态', width: 100 }
]
</script>
```

:::

## 自定义列渲染

### 使用 render 函数

::: tip 提示
使用 render 函数可以灵活自定义列的渲染内容，支持复杂的交互逻辑。
:::

<RenderDemo />

::: details 查看代码

```vue
<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/mock/users-render"
    method-type="post"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>

<script setup>
import { ref, h } from 'vue'
import { ElTag, ElButton, ElMessage } from 'element-plus'

const searchModel = ref({
  name: '',
  status: ''
})

const searchConfig = {
  item: [
    {
      prop: 'name',
      input: {
        type: 'input',
        props: { placeholder: '请输入用户名' }
      },
      formItemProps: { label: '用户名' }
    },
    {
      prop: 'status',
      input: {
        type: 'select',
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ],
          labelKey: 'label',
          valueKey: 'value'
        }
      },
      formItemProps: { label: '状态' }
    }
  ]
}

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '用户名', width: 120 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: (row) => {
      return h(
        ElTag,
        {
          type: row.status === 1 ? 'success' : 'danger'
        },
        () => (row.status === 1 ? '启用' : '禁用')
      )
    }
  },
  {
    prop: 'score',
    label: '评分',
    width: 120,
    render: (row) => {
      const score = row.score || 0
      const color = score >= 80 ? '#67C23A' : score >= 60 ? '#E6A23C' : '#F56C6C'
      return h(
        'span',
        {
          style: {
            color,
            fontWeight: 'bold'
          }
        },
        `${score} 分`
      )
    }
  },
  {
    label: '操作',
    width: 150,
    fixed: 'right',
    render: (row) => {
      return h('div', [
        h(
          ElButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => handleEdit(row)
          },
          () => '编辑'
        ),
        h(
          ElButton,
          {
            type: 'danger',
            size: 'small',
            onClick: () => handleDelete(row),
            style: { marginLeft: '8px' }
          },
          () => '删除'
        )
      ])
    }
  }
]

const handleEdit = (row) => {
  ElMessage.success(`编辑用户: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessage.warning(`删除用户: ${row.name}`)
}
</script>
```

:::

## 自定义请求参数

使用 `paramsHandler` 处理请求参数。

```vue
<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/user/list"
    :params-handler="handleParams"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>

<script setup>
const handleParams = (params) => {
  // 转换参数格式
  return {
    ...params,
    pageNum: params.currentPage,
    size: params.pageSize
  }
}
</script>
```

## 自定义响应数据字段

默认从 `data.result` 读取列表数据，从 `data.total` 读取总数。可通过 props 自定义。

```vue
<template>
  <ml-search-table
    url="/api/user/list"
    response-data-field="data.list"
    response-total-field="data.totalCount"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>
```

## 请求方法类型

支持 GET、POST、PUT、DELETE 请求方法。

```vue
<template>
  <!-- GET 请求，参数通过 query string -->
  <ml-search-table
    url="/api/user/list"
    method-type="get"
    :search-props="searchConfig"
    :columns="columns"
  />

  <!-- POST 请求，参数通过 body -->
  <ml-search-table
    url="/api/user/list"
    method-type="post"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>
```

## 禁用分页

```vue
<template>
  <ml-search-table
    url="/api/user/list"
    :show-pagination="false"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>
```

## 自定义请求头

```vue
<template>
  <ml-search-table
    url="/api/user/list"
    :headers="{ Authorization: 'Bearer token' }"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>
```

## 表格前后插槽

使用 `prefix` 和 `suffix` 插槽可以在表格前后添加自定义内容。

<SlotDemo />

::: details 查看代码

```vue
<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/mock/users-slot"
    method-type="post"
    :search-props="searchConfig"
    :columns="columns"
  >
    <template #prefix>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="handleAdd">新增用户</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
    </template>

    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>

    <template #actions="{ row }">
      <el-button type="primary" size="small" @click="handleEdit(row)"> 编辑 </el-button>
      <el-button type="danger" size="small" @click="handleDelete(row)"> 删除 </el-button>
    </template>

    <template #suffix>
      <div style="margin-top: 10px; padding: 10px; background: #f5f7fa; border-radius: 4px">
        <p style="margin: 0; color: #606266; font-size: 14px">
          💡 提示：这里是表格后置插槽内容，可以放置统计信息、说明文字等
        </p>
      </div>
    </template>
  </ml-search-table>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const searchModel = ref({
  name: '',
  status: ''
})

const searchConfig = {
  item: [
    {
      prop: 'name',
      input: {
        type: 'input',
        props: { placeholder: '请输入用户名' }
      },
      formItemProps: { label: '用户名' }
    },
    {
      prop: 'status',
      input: {
        type: 'select',
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ],
          labelKey: 'label',
          valueKey: 'value'
        }
      },
      formItemProps: { label: '状态' }
    }
  ]
}

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '用户名', width: 120 },
  { prop: 'email', label: '邮箱', width: 200 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    slotName: 'status'
  },
  {
    label: '操作',
    slotName: 'actions',
    width: 150,
    fixed: 'right'
  }
]

const handleAdd = () => {
  ElMessage.success('点击新增用户')
}

const handleBatchDelete = () => {
  ElMessage.warning('点击批量删除')
}

const handleEdit = (row) => {
  ElMessage.success(`编辑用户: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessage.warning(`删除用户: ${row.name}`)
}
</script>
```

:::

## 监听表格事件

```vue
<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/user/list"
    :search-props="searchConfig"
    :columns="columns"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
    @sort-change="handleSortChange"
  />
</template>

<script setup>
const handleSelectionChange = (selection) => {
  console.log('选中的行:', selection)
}

const handleRowClick = (row, event, column) => {
  console.log('点击行:', row)
}

const handleSortChange = ({ prop, order }) => {
  console.log('排序变化:', prop, order)
}
</script>
```

## 手动刷新

通过 ref 调用 `handleSearch` 方法手动刷新数据。

```vue
<template>
  <div>
    <el-button @click="refresh">刷新</el-button>
    <ml-search-table
      ref="tableRef"
      v-model:search="searchModel"
      url="/api/user/list"
      :search-props="searchConfig"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableRef = ref()

const refresh = () => {
  tableRef.value?.handleSearch()
}
</script>
```

## Props

| 参数               | 说明                 | 类型                   | 可选值                            | 默认值             |
| ------------------ | -------------------- | ---------------------- | --------------------------------- | ------------------ |
| methodType         | 请求方法类型         | `string`               | `get` / `post` / `put` / `delete` | `post`             |
| url                | 请求地址             | `string`               | —                                 | `''`               |
| responseDataField  | 响应数据列表字段路径 | `string`               | —                                 | `data.result`      |
| responseTotalField | 响应数据总数字段路径 | `string`               | —                                 | `data.total`       |
| headers            | 请求头               | `object`               | —                                 | `{}`               |
| showPagination     | 是否显示分页         | `boolean`              | —                                 | `true`             |
| paramsHandler      | 参数处理函数         | `(params: any) => any` | —                                 | `null`             |
| searchProps        | 搜索组件配置         | `object`               | —                                 | `{}`               |
| tableProps         | 表格组件配置         | `object`               | —                                 | `{ border: true }` |
| columns            | 表格列配置           | `array`                | —                                 | `[]`               |

## Column 配置

表格列配置继承 Element Plus Table Column 的所有属性，并扩展了以下属性：

| 参数     | 说明           | 类型                                 |
| -------- | -------------- | ------------------------------------ |
| slotName | 自定义插槽名称 | `string`                             |
| render   | 自定义渲染函数 | `(row: any, index: number) => VNode` |

## Events

| 事件名             | 说明                   | 回调参数                                      |
| ------------------ | ---------------------- | --------------------------------------------- |
| reset              | 搜索重置时触发         | `() => void`                                  |
| select             | 勾选数据行时触发       | `(selection, row) => void`                    |
| select-all         | 勾选全选时触发         | `(selection) => void`                         |
| selection-change   | 选择项发生变化时触发   | `(selection) => void`                         |
| cell-mouse-enter   | 鼠标进入单元格时触发   | `(row, column, cell, event) => void`          |
| cell-mouse-leave   | 鼠标离开单元格时触发   | `(row, column, cell, event) => void`          |
| cell-click         | 单击单元格时触发       | `(row, column, cell, event) => void`          |
| cell-dblclick      | 双击单元格时触发       | `(row, column, cell, event) => void`          |
| row-click          | 单击行时触发           | `(row, event, column) => void`                |
| row-contextmenu    | 右键点击行时触发       | `(row, event) => void`                        |
| row-dblclick       | 双击行时触发           | `(row, event) => void`                        |
| header-click       | 单击表头时触发         | `(column, event) => void`                     |
| header-contextmenu | 右键点击表头时触发     | `(column, event) => void`                     |
| sort-change        | 排序变化时触发         | `({ column, prop, order }) => void`           |
| filter-change      | 筛选条件变化时触发     | `(filters) => void`                           |
| current-change     | 当前行变化时触发       | `(currentRow, oldCurrentRow) => void`         |
| header-dragend     | 拖动表头改变宽度时触发 | `(newWidth, oldWidth, column, event) => void` |
| expand-change      | 展开行变化时触发       | `(row, expanded) => void`                     |

## Slots

| 插槽名     | 说明             | 作用域参数        |
| ---------- | ---------------- | ----------------- |
| prefix     | 表格前置内容     | —                 |
| suffix     | 表格后置内容     | —                 |
| [prop]     | 搜索框自定义插槽 | `{ searchModel }` |
| [slotName] | 表格列自定义插槽 | `{ row, index }`  |

## Exposes

| 方法名       | 说明         | 参数                                             |
| ------------ | ------------ | ------------------------------------------------ |
| handleSearch | 刷新表格数据 | `(reset?: boolean)` reset 为 true 时重置到第一页 |
