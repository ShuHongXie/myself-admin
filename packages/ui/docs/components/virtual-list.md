# MlVirtualList 虚拟列表

高性能虚拟滚动列表组件，支持定高/不定高、分页/无分页多种场景，最多只渲染 10 个 DOM 节点，适用于大量数据展示。

<script setup>
import PaginationEqual from '../.vitepress/demos/virtual-list/pagination-equal.vue'
import PaginationUnequal from '../.vitepress/demos/virtual-list/pagination-unequal.vue'
import NoPaginationEqual from '../.vitepress/demos/virtual-list/no-pagination-equal.vue'
import NoPaginationUnequal from '../.vitepress/demos/virtual-list/no-pagination-unequal.vue'
</script>

## 分页加载 - 定高模式

适用于列表项高度固定且需要分页加载的场景，性能最优。

<PaginationEqual />

::: details 查看代码

```vue
<script setup>
import { ref } from 'vue'

// 分页加载相关状态
const dataSource = ref([])
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(0)
const pageSize = 20
const totalCount = 200

// 模拟从服务器加载数据
const loadMoreData = async () => {
  if (loading.value || finished.value) return

  loading.value = true
  currentPage.value++

  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = currentPage.value * pageSize

  if (startIndex >= totalCount) {
    finished.value = true
    loading.value = false
    return
  }

  // 生成当前页的数据
  const pageData = Array.from({ length: pageSize }, (_, i) => {
    const index = startIndex + i
    if (index >= totalCount) return null
    return {
      id: index,
      title: `数据项 #${index}`,
      content: `这是第 ${index} 条数据的详细内容`
    }
  }).filter(Boolean)

  dataSource.value.push(...pageData)
  loading.value = false

  if (endIndex >= totalCount) {
    finished.value = true
  }
}

// 初始加载
loadMoreData()
</script>

<template>
  <ml-virtual-list
    :height="500"
    :item-height="60"
    :item-equal="true"
    :data-source="dataSource"
    :loading="loading"
    :finished="finished"
    @load-more="loadMoreData"
  >
    <template #default="{ item }">
      <div style="padding: 15px; border-bottom: 1px solid #eee">
        <div style="font-weight: bold; margin-bottom: 5px">{{ item.title }}</div>
        <div style="color: #909399; font-size: 12px">{{ item.content }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
```

:::

## 分页加载 - 不定高模式

适用于列表项高度不固定且需要分页加载的场景，支持动态高度监听。点击列表项可展开/折叠内容，组件会自动监听高度变化。

<PaginationUnequal />

::: details 查看代码

```vue
<script setup>
import { ref } from 'vue'

const dataSource = ref([])
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(0)
const pageSize = 20
const totalCount = 150

const loadMoreData = async () => {
  if (loading.value || finished.value) return

  loading.value = true
  currentPage.value++

  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = currentPage.value * pageSize

  if (startIndex >= totalCount) {
    finished.value = true
    loading.value = false
    return
  }

  const pageData = Array.from({ length: pageSize }, (_, i) => {
    const index = startIndex + i
    if (index >= totalCount) return null
    // 随机生成不同长度的内容
    const contentLength = Math.floor(Math.random() * 5) + 2
    const content = Array(contentLength)
      .fill(0)
      .map((_, idx) => `这是第 ${index} 条数据的第 ${idx + 1} 行内容。`)
      .join('')
    return {
      id: index,
      title: `不等高数据项 #${index}`,
      content,
      expanded: false
    }
  }).filter(Boolean)

  dataSource.value.push(...pageData)
  loading.value = false

  if (endIndex >= totalCount) {
    finished.value = true
  }
}

const toggleExpand = (index) => {
  const item = dataSource.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}

loadMoreData()
</script>

<template>
  <ml-virtual-list
    :height="500"
    :item-equal="false"
    :estimated-item-height="120"
    :data-source="dataSource"
    :loading="loading"
    :finished="finished"
    @load-more="loadMoreData"
  >
    <template #default="{ item, index }">
      <div @click="toggleExpand(index)" style="padding: 20px; cursor: pointer">
        <div style="display: flex; justify-content: space-between">
          {{ item.title }}
          <span>{{ item.expanded ? '▼' : '▶' }}</span>
        </div>
        <div v-show="item.expanded">{{ item.content }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
```

:::

## 无分页 - 定高模式

适用于数据量固定且列表项高度相同的场景，不传 `loading` 和 `finished` 参数即为无分页模式。

<NoPaginationEqual />

::: details 查看代码

```vue
<script setup>
import { ref } from 'vue'

const generateData = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      title: `数据项 #${i}`,
      content: `这是第 ${i} 条数据，无需分页加载`
    })
  }
  return data
}

const dataSource = ref(generateData())
</script>

<template>
  <ml-virtual-list :height="500" :item-height="60" :data-source="dataSource">
    <template #default="{ item }">
      <div style="padding: 15px; border-bottom: 1px solid #eee">
        <div style="font-weight: bold; margin-bottom: 5px">{{ item.title }}</div>
        <div style="color: #909399; font-size: 12px">{{ item.content }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
```

:::

## 无分页 - 不定高模式

适用于数据量固定且列表项高度不同的场景。

<NoPaginationUnequal />

::: details 查看代码

```vue
<script setup>
import { ref } from 'vue'

const generateData = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    const contentLength = Math.floor(Math.random() * 5) + 2
    const content = Array(contentLength)
      .fill(0)
      .map((_, idx) => `这是第 ${i} 条数据的第 ${idx + 1} 行内容。`)
      .join('')
    data.push({
      id: i,
      title: `不等高数据项 #${i}`,
      content
    })
  }
  return data
}

const dataSource = ref(generateData())
</script>

<template>
  <ml-virtual-list
    :height="500"
    :item-equal="false"
    :estimated-item-height="100"
    :data-source="dataSource"
  >
    <template #default="{ item }">
      <div style="padding: 20px; border-bottom: 1px solid #e4e7ed">
        <div style="font-weight: bold; margin-bottom: 10px">{{ item.title }}</div>
        <div style="line-height: 1.8">{{ item.content }}</div>
      </div>
    </template>
  </ml-virtual-list>
</template>
```

:::

## 自定义加载状态

通过插槽自定义加载中和加载完成的提示内容。

```vue
<template>
  <ml-virtual-list
    :data-source="dataSource"
    :loading="loading"
    :finished="finished"
    @load-more="loadMore"
  >
    <template #default="{ item }">
      <div>{{ item.title }}</div>
    </template>

    <template #loading>
      <div style="color: #409eff">自定义加载中...</div>
    </template>

    <template #finished>
      <div style="color: #67c23a">✓ 全部加载完成</div>
    </template>
  </ml-virtual-list>
</template>
```

## Props

| 参数                | 说明                                       | 类型      | 可选值 | 默认值      |
| ------------------- | ------------------------------------------ | --------- | ------ | ----------- |
| height              | 容器高度（px）                             | `number`  | —      | `500`       |
| itemHeight          | 列表项高度（定高模式必传）                 | `number`  | —      | `50`        |
| estimatedItemHeight | 列表项预估高度（不定高模式使用）           | `number`  | —      | `50`        |
| itemEqual           | 是否为等高列表                             | `boolean` | —      | `true`      |
| dataSource          | 数据源                                     | `array`   | —      | `[]`        |
| loading             | 是否正在加载（不传表示无分页模式）         | `boolean` | —      | `undefined` |
| finished            | 是否已加载完所有数据（不传表示无分页模式） | `boolean` | —      | `undefined` |
| preLoadCount        | 预加载数量（上下各预加载几个）             | `number`  | —      | `5`         |
| threshold           | 距离底部多少像素时触发加载                 | `number`  | —      | `200`       |
| maxVisibleItems     | 最多渲染的元素个数（不定高模式推荐配置）   | `number`  | —      | `15`        |

## Events

| 事件名    | 说明                 | 回调参数 |
| --------- | -------------------- | -------- |
| load-more | 滚动到底部时触发加载 | —        |

## Slots

| 插槽名   | 说明               | 参数              |
| -------- | ------------------ | ----------------- |
| default  | 列表项内容         | `{ item, index }` |
| loading  | 自定义加载中提示   | —                 |
| finished | 自定义加载完成提示 | —                 |

## 特性说明

### 性能优化

- **虚拟滚动**：最多渲染 DOM 节点数量可配置（不定高模式默认 15 个），无论数据量多大
- **RAF 优化**：使用 requestAnimationFrame 优化滚动性能
- **防抖处理**：ResizeObserver 配合 16ms 防抖，避免频繁更新

### 定高 vs 不定高

**定高模式（`itemEqual: true`）**

- 适用于：列表项高度固定的场景
- 优势：性能最优，直接计算位置
- 要求：必须传入 `itemHeight` 参数

**不定高模式（`itemEqual: false`）**

- 适用于：列表项高度不固定的场景
- 优势：支持动态高度，自动监听变化
- 使用：传入 `estimatedItemHeight` 作为预估高度
- 特性：使用 ResizeObserver 监听高度变化

### 分页 vs 无分页

**分页模式**

- 传入 `loading` 和 `finished` 参数
- 监听 `@load-more` 事件加载数据
- 滚动到底部自动触发加载

**无分页模式**

- 不传 `loading` 和 `finished` 参数
- 直接传入全部数据到 `dataSource`
- 不会触发 `load-more` 事件

### 动态高度监听

不定高模式下，组件会自动监听列表项的高度变化（如展开/折叠），无需手动干预。使用 ResizeObserver API 实现，配合防抖机制保证性能。

### 最多渲染元素个数（maxVisibleItems）

- **定义**：控制虚拟列表一次最多渲染的 DOM 节点个数
- **作用**：在不定高模式下，需要渲染足够的高度来填满容器，不然会有空白
- **调整**：如果不定高模式出现空白区域，可以增加这个值
- **推荐值**：
  - 定高模式：`10` 或更少（因为高度固定，计算准确）
  - 不定高模式：`15-20`（根据实际列表项高度调整）
  - 列表项高度波动大：增加到 `20-25`
