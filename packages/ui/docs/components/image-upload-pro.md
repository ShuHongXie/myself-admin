# MlImageUploadPro 图片上传裁剪

一个功能完整的图片上传、裁剪、排序组件，支持自动上传、手动上传、图片裁剪、拖拽排序等功能。

<script setup>
import BasicDemo from '../.vitepress/demos/image-upload-pro/basic.vue'
import CropDemo from '../.vitepress/demos/image-upload-pro/crop.vue'
import LimitDemo from '../.vitepress/demos/image-upload-pro/limit.vue'
import FormDemo from '../.vitepress/demos/image-upload-pro/form.vue'
import CustomApiDemo from '../.vitepress/demos/image-upload-pro/custom-api.vue'
import DynamicLimitDemo from '../.vitepress/demos/image-upload-pro/dynamic-limit.vue'
</script>

## 基础用法

最简单的使用方式，自动上传到服务器。

<BasicDemo />

### 代码示例

::: details 点击查看代码

```vue
<template>
  <div>
    <ml-image-upload-pro
      v-model="imageList"
      :max-count="9"
      :auto-upload="true"
      :allow-crop="false"
      :upload-api="uploadApi"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageList = ref([])

const uploadApi = {
  url: '/api/upload', // 后端上传接口
  method: 'post',
  fieldName: 'file',
  responseUrlField: 'data.url' // 从响应中提取图片URL的字段路径
}
</script>
```

:::

## 裁剪功能

启用图片裁剪功能，支持自由比例、1:1、4:3、16:9 等多种裁剪比例。

<CropDemo />

::: tip 裁剪功能使用步骤

1. **选择图片** - 点击"选择图片"按钮上传本地图片
2. **确认裁剪** - 在弹出的确认框中选择"裁剪"
3. **调整裁剪框** - 在裁剪弹窗中：
   - 拖拽裁剪框边界调整大小
   - 在左侧选择裁剪比例（自由、1:1、4:3、16:9）
   - 在右侧输入精确的宽度和高度
   - 实时预览裁剪效果
4. **完成裁剪** - 点击"确认裁剪"按钮完成操作
   :::

### 代码示例

::: details 点击查看代码

```vue
<template>
  <div>
    <ml-image-upload-pro
      v-model="imageList"
      :max-count="5"
      :auto-upload="false"
      :allow-crop="true"
      :allow-sort="true"
      :size-limit="{
        width: 400,
        height: 300,
        size: 5
      }"
      :upload-api="uploadApi"
    />

    <!-- 上传按钮（手动上传） -->
    <el-button
      v-if="imageList.length"
      type="primary"
      @click="handleUpload"
      style="margin-top: 16px"
    >
      上传所有图片
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const imageList = ref([])

const uploadApi = {
  url: '/api/upload',
  method: 'post',
  fieldName: 'file',
  responseUrlField: 'data.url'
}

// 手动上传
const handleUpload = () => {
  const urls = imageList.value.map((img) => img.serverUrl || img.url)
  console.log('上传的图片 URL:', urls)
  ElMessage.success('图片上传成功')
}
</script>
```

:::

## 限制配置

通过配置参数限制上传数量、尺寸等。

<LimitDemo />

### 代码示例

::: details 点击查看代码

```vue
<template>
  <ml-image-upload-pro
    v-model="imageList"
    :max-count="3"
    :accept-type="'image/jpeg,image/png'"
    :size-limit="{
      width: 800, // 最小宽度
      height: 600, // 最小高度
      size: 2 // 单文件最大 2MB
    }"
    :upload-api="uploadApi"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageList = ref([])

const uploadApi = {
  url: '/api/upload',
  method: 'post',
  fieldName: 'file',
  responseUrlField: 'data.url'
}
</script>
```

:::

## 高级用法

### 配合表单使用

在表单中使用图片上传组件，配合其他表单项一起提交。

<FormDemo />

#### 代码示例

::: details 点击查看代码

```vue
<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="商品图片">
      <ml-image-upload-pro
        v-model="form.images"
        :max-count="9"
        :auto-upload="true"
        :upload-api="uploadApi"
      />
    </el-form-item>

    <el-form-item label="产品名称">
      <el-input v-model="form.name" placeholder="请输入产品名称" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit"> 保存 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  name: '',
  images: []
})

const uploadApi = {
  url: '/api/upload',
  method: 'post',
  fieldName: 'file',
  responseUrlField: 'data.url'
}

const handleSubmit = () => {
  // 获取所有图片的 URL
  const imageUrls = form.images.map((img) => img.serverUrl || img.url)

  // 提交表单数据
  const submitData = {
    name: form.name,
    images: imageUrls
  }

  console.log('提交数据:', submitData)
  ElMessage.success('保存成功')
}
</script>
```

:::

### 自定义上传接口配置

自定义上传接口的各种配置项，包括请求头、额外数据等。

<CustomApiDemo />

#### 代码示例

::: details 点击查看代码

```typescript
const uploadApi = {
  // 上传接口地址
  url: '/api/v1/upload/image',

  // 请求方法
  method: 'post',

  // 上传文件的字段名
  fieldName: 'img',

  // 请求头（如添加授权令牌）
  headers: {
    Authorization: 'Bearer YOUR_TOKEN'
  },

  // 额外的表单数据
  data: {
    category: 'product',
    bizType: 'shop'
  },

  // 从响应中提取图片 URL 的字段路径
  responseUrlField: 'result.imageUrl'
}
```

:::

### 动态限制参数

根据不同场景动态调整上传限制参数。

<DynamicLimitDemo />

#### 代码示例

::: details 点击查看代码

```typescript
const sizeLimit = reactive({
  width: 800,
  height: 600,
  size: 5
})

// 根据条件修改限制
if (useHighQuality) {
  sizeLimit.width = 1920
  sizeLimit.height = 1080
  sizeLimit.size = 10
}
```

:::

## Props

| 参数       | 说明                                  | 类型              | 可选值 | 默认值                                                   |
| :--------- | :------------------------------------ | :---------------- | :----- | :------------------------------------------------------- |
| modelValue | 已上传图片列表（v-model）             | `UploadFile[]`    | —      | `[]`                                                     |
| maxCount   | 最大上传数量                          | `number`          | —      | `9`                                                      |
| autoUpload | 是否自动上传（启用后需配置uploadApi） | `boolean`         | —      | `true`                                                   |
| allowCrop  | 是否允许裁剪                          | `boolean`         | —      | `false`                                                  |
| allowSort  | 是否允许拖拽排序                      | `boolean`         | —      | `true`                                                   |
| acceptType | 接受的文件类型                        | `string`          | —      | `'image/jpeg,image/png,image/gif,image/webp'`            |
| accept     | 接受的 MIME 类型数组                  | `string[]`        | —      | `['image/jpeg', 'image/png', 'image/gif', 'image/webp']` |
| sizeLimit  | 大小限制配置                          | `SizeLimit`       | —      | `{ width: 0, height: 0, size: 10 }`                      |
| uploadApi  | 上传接口配置                          | `UploadApiConfig` | —      | `undefined`                                              |

### SizeLimit 配置

| 字段   | 说明                 | 类型     | 默认值 |
| ------ | -------------------- | -------- | ------ |
| width  | 图片最小宽度（px）   | `number` | `0`    |
| height | 图片最小高度（px）   | `number` | `0`    |
| size   | 单文件最大大小（MB） | `number` | `10`   |

### UploadApiConfig 配置

| 字段             | 说明                  | 类型                                              | 默认值       |
| ---------------- | --------------------- | ------------------------------------------------- | ------------ |
| url              | 上传接口地址          | `string`                                          | —            |
| method           | 请求方法              | `'get' \| 'post' \| 'put' \| 'patch' \| 'delete'` | `'post'`     |
| fieldName        | 文件字段名            | `string`                                          | `'file'`     |
| headers          | 请求头                | `Record<string, any>`                             | `{}`         |
| data             | 额外的表单数据        | `Record<string, any>`                             | `{}`         |
| responseUrlField | 响应中 URL 字段的路径 | `string`                                          | `'data.url'` |

## Events

| 事件名            | 说明               | 回调参数                        |
| ----------------- | ------------------ | ------------------------------- |
| update:modelValue | 图片列表更新时触发 | `(value: UploadFile[]) => void` |

## Methods

通过 `ref` 获取组件实例后，可以调用以下方法：

| 方法名     | 说明         | 参数 | 返回值 |
| ---------- | ------------ | ---- | ------ |
| clearFiles | 清空所有图片 | —    | `void` |

## 数据结构

### UploadFile 接口

```typescript
interface UploadFile {
  uid: string | number
  name: string
  url?: string
  response?: any
  status?: 'success' | 'ready' | 'uploading' | 'fail'
}
```

### PreviewItem 接口（增强版）

```typescript
interface PreviewItem extends UploadFile {
  isCover?: boolean // 是否为封面
  rawFile?: File // 原始文件对象
  blobUrl?: string // 本地 Blob URL（用于裁剪）
  serverUrl?: string // 服务器返回的 URL（用于显示和提交）
}
```

## 使用场景

- 商品图片上传
- 头像上传和裁剪
- 轮播图管理
- 相册管理
- 任何需要图片上传的场景

## 功能特点

### ✨ 核心功能

- **自动上传**：支持选择后自动上传到服务器
- **手动上传**：支持延迟上传，方便批量处理
- **图片裁剪**：内置 vue-cropper，支持多种裁剪比例
- **拖拽排序**：支持拖拽调整图片顺序
- **尺寸验证**：支持验证上传图片的最小尺寸
- **大小限制**：支持限制单文件大小和总文件数量
- **格式检查**：支持限制上传文件格式

### 🎯 裁剪功能详解

- **多种比例**：自由比例、1:1、4:3、16:9
- **实时预览**：拖拽时实时显示裁剪尺寸
- **尺寸调整**：支持手动输入宽高进行精确裁剪
- **跨域支持**：使用 Blob URL 方案解决跨域图片裁剪

### 🔄 数据管理

- **Blob 和 URL 双存储**：
  - `blobUrl`：本地 Blob URL，用于裁剪（避免跨域问题）
  - `serverUrl`：服务器返回的 URL，用于显示和提交
- **实时同步**：支持通过 v-model 实时同步图片列表

## 注意事项

### ⚠️ 依赖安装

如果使用裁剪功能（`allowCrop: true`），**必须先安装 `vue-cropper` 依赖**：

```bash
pnpm add vue-cropper
```

安装后，需要在项目入口文件（如 `main.ts`）中全局注册 `vue-cropper` 组件：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

const app = createApp(App)

// 全局注册 vue-cropper
app.component('VueCropper', VueCropper)

app.mount('#app')
```

如果未安装此依赖或未注册组件而启用了裁剪功能，会导致编译错误。

### 其他事项

1. **API 配置**：需要配置 `uploadApi` 才能实现自动上传功能
2. **响应格式**：服务器返回的响应格式应匹配 `responseUrlField` 配置
3. **CORS 问题**：如果上传跨域图片进行裁剪，组件会自动使用 Blob URL 避免 CORS 错误
4. **大小限制**：`sizeLimit.size` 单位为 MB，最大值受浏览器和服务器限制
5. **格式支持**：默认支持 JPEG、PNG、GIF、WebP 格式
