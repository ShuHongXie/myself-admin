<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import type { ElUpload, UploadProps } from 'element-plus'
import { imageUploadProProps, type SizeLimit, type AspectRatio, type PreviewItem } from './type'
import { initRequestInstance, getNestedValue } from '@minilo/utils'
import { bem } from '../../utils'

defineOptions({
  name: 'MlImageUploadPro'
})

// -------------------------- 常量定义 --------------------------
// 裁剪比例选项
const ASPECT_RATIO_OPTIONS = [
  { label: '自由比例', value: 'free' },
  { label: '1:1', value: '1:1' },
  { label: '4:3', value: '4:3' },
  { label: '16:9', value: '16:9' }
] as const

// -------------------------- Props定义 --------------------------
const props = defineProps(imageUploadProProps)

// -------------------------- 响应式状态 --------------------------
// 上传组件Ref
const uploadRef = ref<InstanceType<typeof ElUpload>>()
// 裁剪组件Ref
const cropperRef = ref<InstanceType<typeof VueCropper>>()

// 上传文件列表
const fileList = ref<UploadFile[]>([])
// 预览列表（增强版）
const previewList = ref<PreviewItem[]>([])

// 裁剪弹窗状态
const cropDialogVisible = ref(false)
const cropImageUrl = ref('') // 裁剪图片URL
const cropTargetItem = ref<PreviewItem>() // 待裁剪的图片项
const dragIndex = ref(-1) // 拖拽索引

// 裁剪配置
const cropForm = reactive({
  aspectRatio: 'free' // 裁剪比例
})

const cropWidth = ref(props.sizeLimit.width || 400)
const cropHeight = ref(props.sizeLimit.height || 400)

// 显示用的裁剪尺寸（实时跟随裁剪框变化）
const displayWidth = ref(props.sizeLimit.width || 400)
const displayHeight = ref(props.sizeLimit.height || 400)

const aspectRatio = reactive<AspectRatio>({
  fixed: false,
  value: [1, 1]
})

// 初始化 axios 实例（参考 search-table 的实现）
const axios = computed(() => {
  if (!props.uploadApi) return null
  return initRequestInstance({
    baseURL: '',
    headers: props.uploadApi.headers || {}
  })
})

// -------------------------- 计算属性 --------------------------
// 格式化接受类型描述
const acceptDesc = computed(() => {
  return props.acceptType
    .split(',')
    .map((type) => type.replace('image/', '.'))
    .join('、')
})

// -------------------------- 监听 --------------------------
// 监听外部传入的modelValue，同步到预览列表
watch(
  () => props.modelValue,
  (val) => {
    if (val.length) {
      previewList.value = val.map((item) => ({
        ...item,
        url: item.url || item.response?.url || ''
      }))
      fileList.value = val
    }
  },
  { immediate: true, deep: true }
)

// -------------------------- 核心方法 --------------------------
/**
 * 上传单个文件到服务器（参考 search-table 的 API 调用方式）
 */
const uploadSingleFile = async (file: File): Promise<string> => {
  if (!props.uploadApi || !axios.value) {
    throw new Error('未配置上传 API')
  }

  const formData = new FormData()
  formData.append(props.uploadApi.fieldName || 'file', file)

  // 添加额外数据
  if (props.uploadApi.data) {
    Object.keys(props.uploadApi.data).forEach((key) => {
      formData.append(key, props.uploadApi.data![key])
    })
  }

  const method = props.uploadApi.method || 'post'
  const response = await axios.value[method](props.uploadApi.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  // 从响应中提取 URL
  const urlField = props.uploadApi.responseUrlField || 'data.url'
  return getNestedValue(response, urlField)
}

/**
 * 上传前校验
 */
const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  // 1. 格式校验
  const isAccept = props.accept.includes(file.type)
  if (!isAccept) {
    ElMessage.error(`仅支持上传${acceptDesc.value}格式的图片`)
    return false
  }

  // 2. 大小校验
  const isOverSize = file.size / 1024 / 1024 > props.sizeLimit.size
  if (isOverSize) {
    ElMessage.error(`单文件大小不能超过${props.sizeLimit.size}MB`)
    return false
  }

  // 3. 数量校验
  if (previewList.value.length >= props.maxCount) {
    ElMessage.error(`最多只能上传${props.maxCount}张图片`)
    return false
  }

  // 4. 尺寸校验（可选）
  if (props.sizeLimit.width || props.sizeLimit.height) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const isOverWidth = props.sizeLimit.width && img.width < props.sizeLimit.width
        const isOverHeight = props.sizeLimit.height && img.height < props.sizeLimit.height

        if (isOverWidth || isOverHeight) {
          ElMessage.error(
            `图片尺寸要求：宽≥${props.sizeLimit.width}px 高≥${props.sizeLimit.height}px，当前图片宽${img.width}px 高${img.height}px`
          )
          resolve(false)
        } else {
          resolve(true)
        }
      }
      img.src = URL.createObjectURL(file)
    })
  }

  return true
}

/**
 * 文件状态变化（新增/修改）
 */
const handleFileChange: UploadProps['onChange'] = async (file, files) => {
  if (file.status === 'ready') {
    // 创建 blob URL
    const blobUrl = URL.createObjectURL(file.raw as File)

    // 新增文件
    const newItem: PreviewItem = {
      ...file,
      rawFile: file.raw as File,
      blobUrl: blobUrl, // 保存 blob URL 用于裁剪
      url: blobUrl // 初始显示使用 blob URL
    }

    // 如果开启裁剪，自动弹出裁剪弹窗
    if (props.allowCrop) {
      ElMessageBox.confirm('是否需要裁剪该图片？', '提示', {
        type: 'info',
        confirmButtonText: '裁剪',
        cancelButtonText: '直接上传'
      })
        .then(() => {
          handleCropImage(newItem)
        })
        .catch(async () => {
          // 直接上传，不裁剪
          if (props.autoUpload && props.uploadApi) {
            try {
              const uploadedUrl = await uploadSingleFile(file.raw as File)
              newItem.serverUrl = uploadedUrl // 保存服务器 URL
              newItem.url = uploadedUrl // 显示服务器 URL
              ElMessage.success('图片上传成功')
            } catch (error) {
              ElMessage.error('图片上传失败')
              console.error(error)
              return
            }
          }
          previewList.value.push(newItem)
          syncModelValue()
        })
    } else {
      // 不裁剪，直接上传
      if (props.autoUpload && props.uploadApi) {
        try {
          const uploadedUrl = await uploadSingleFile(file.raw as File)
          newItem.serverUrl = uploadedUrl // 保存服务器 URL
          newItem.url = uploadedUrl // 显示服务器 URL
          ElMessage.success('图片上传成功')
        } catch (error) {
          ElMessage.error('图片上传失败')
          console.error(error)
          return
        }
      }
      previewList.value.push(newItem)
      syncModelValue()
    }
  }

  fileList.value = files
}

/**
 * 移除文件
 */
const handleFileRemove: UploadProps['onRemove'] = (file) => {
  previewList.value = previewList.value.filter((item) => item.uid !== file.uid)
  syncModelValue()
}

/**
 * 处理图片裁剪
 */
const handleCropImage = (item: PreviewItem) => {
  console.log(item)

  if (!props.allowCrop) return

  cropTargetItem.value = item

  // 优先使用 blobUrl，如果没有则使用 url
  cropImageUrl.value = item.blobUrl || item.url || ''
  cropDialogVisible.value = true

  // 重置裁剪配置
  nextTick(() => {
    cropForm.aspectRatio = 'free'
    cropWidth.value = props.sizeLimit.width || 400
    cropHeight.value = props.sizeLimit.height || 400
    displayWidth.value = props.sizeLimit.width || 400
    displayHeight.value = props.sizeLimit.height || 400
    aspectRatio.fixed = false
  })
}

/**
 * 裁剪比例变化
 */
const handleAspectRatioChange = (val: string) => {
  if (val === 'free') {
    aspectRatio.fixed = false
  } else {
    aspectRatio.fixed = true
    const [w, h] = val.split(':').map(Number)
    aspectRatio.value = [w, h]
  }
}

/**
 * 监听裁剪框实时变化
 */
const handleCropRealTime = (data: any) => {
  // 只更新显示值，不反向控制裁剪框（避免抖动）
  if (data && data.w && data.h) {
    displayWidth.value = Math.round(data.w)
    displayHeight.value = Math.round(data.h)
  }
}

/**
 * 手动输入尺寸时更新裁剪框
 */
const handleSizeChange = () => {
  cropWidth.value = displayWidth.value
  cropHeight.value = displayHeight.value
}

/**
 * 确认裁剪
 */
const handleCropConfirm = () => {
  if (!cropperRef.value || !cropTargetItem.value) return

  // 获取裁剪后的图片base64
  cropperRef.value.getCropBlob(async (blob: Blob) => {
    const croppedFile = new File([blob], cropTargetItem.value!.name || 'cropped.jpg', {
      type: cropTargetItem.value!.rawFile?.type || 'image/jpeg'
    })

    // 创建新的 blob URL
    const newBlobUrl = URL.createObjectURL(croppedFile)
    let displayUrl = newBlobUrl

    // 如果启用自动上传，上传到服务器
    if (props.autoUpload && props.uploadApi) {
      try {
        const serverUrl = await uploadSingleFile(croppedFile)
        displayUrl = serverUrl // 显示服务器 URL
        ElMessage.success('图片上传成功')

        // 更新预览项
        const index = previewList.value.findIndex((item) => item.uid === cropTargetItem.value!.uid)
        if (index > -1) {
          previewList.value[index].url = displayUrl // 显示 URL
          previewList.value[index].blobUrl = newBlobUrl // 保存 blob URL
          previewList.value[index].serverUrl = serverUrl // 保存服务器 URL
          previewList.value[index].rawFile = croppedFile
        } else {
          previewList.value.push({
            ...cropTargetItem.value,
            url: displayUrl,
            blobUrl: newBlobUrl,
            serverUrl: serverUrl,
            rawFile: croppedFile
          })
        }
      } catch (error) {
        ElMessage.error('图片上传失败')
        console.error(error)
        return
      }
    } else {
      // 不上传，只更新本地 blob
      const index = previewList.value.findIndex((item) => item.uid === cropTargetItem.value!.uid)
      if (index > -1) {
        previewList.value[index].url = newBlobUrl
        previewList.value[index].blobUrl = newBlobUrl
        previewList.value[index].rawFile = croppedFile
      } else {
        previewList.value.push({
          ...cropTargetItem.value,
          url: newBlobUrl,
          blobUrl: newBlobUrl,
          rawFile: croppedFile
        })
      }
    }

    syncModelValue()
    cropDialogVisible.value = false
    ElMessage.success('图片裁剪成功')
  })
}

/**
 * 重置裁剪器
 */
const resetCropper = () => {
  cropTargetItem.value = undefined
  cropImageUrl.value = ''
}

/**
 * 移除预览图片
 */
const handleRemovePreview = (item: PreviewItem) => {
  ElMessageBox.confirm('确定要删除该图片吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    previewList.value = previewList.value.filter((i) => i.uid !== item.uid)
    fileList.value = fileList.value.filter((i) => i.uid !== item.uid)
    syncModelValue()
    ElMessage.success('图片删除成功')
  })
}

/**
 * 拖拽排序 - 开始拖拽
 */
const handleDragStart = (index: number) => {
  if (!props.allowSort) return
  dragIndex.value = index
}

/**
 * 拖拽排序 - 拖拽中
 */
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

/**
 * 拖拽排序 - 放下
 */
const handleDrop = (index: number) => {
  if (!props.allowSort || dragIndex.value === -1 || dragIndex.value === index) return

  // 交换位置
  const temp = previewList.value[dragIndex.value]
  previewList.value.splice(dragIndex.value, 1)
  previewList.value.splice(index, 0, temp)

  dragIndex.value = -1
  syncModelValue()
}

/**
 * 同步值到父组件
 */
const syncModelValue = () => {
  emit('update:modelValue', [...previewList.value])
  // 可额外触发自定义上传事件（比如上传到服务器）
  emit('change', [...previewList.value])
}

// -------------------------- 对外暴露 --------------------------
const emit = defineEmits<{
  'update:modelValue': [value: PreviewItem[]]
  change: [value: PreviewItem[]]
  upload: [value: PreviewItem[]]
}>()

// 手动触发上传（比如上传到服务器，需结合后端接口）
const uploadToServer = async (uploadApi: (file: File) => Promise<string>) => {
  const uploadPromises = previewList.value.map(async (item) => {
    if (item.rawFile) {
      const url = await uploadApi(item.rawFile)
      item.url = url
      return item
    }
    return item
  })

  const result = await Promise.all(uploadPromises)
  previewList.value = result
  syncModelValue()
  return result
}

defineExpose({
  uploadToServer, // 暴露上传到服务器的方法
  clear: () => {
    // 清空所有图片
    previewList.value = []
    fileList.value = []
    syncModelValue()
  }
})
</script>

<template>
  <div :class="bem('image-upload-pro')">
    <!-- 核心上传区域 -->
    <el-upload
      ref="uploadRef"
      :class="bem('image-upload-pro', 'upload-container')"
      action=""
      :auto-upload="false"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :on-change="handleFileChange"
      :on-remove="handleFileRemove"
      :accept="acceptType"
      :show-file-list="false"
    >
      <el-button :disabled="fileList.length === props.maxCount" type="primary">选择图片</el-button>
      <template #tip>
        <div :class="bem('image-upload-pro', 'upload-text')">
          支持格式：{{ acceptDesc }} | 单文件大小≤{{ props.sizeLimit.size }}MB
          <span v-if="props.sizeLimit.width || props.sizeLimit.height">
            | 尺寸要求：宽≥{{ props.sizeLimit.width }}px 高≥{{ props.sizeLimit.height }}px
          </span>
        </div>
      </template>
    </el-upload>

    <!-- 已上传图片预览列表 -->
    <div :class="bem('image-upload-pro', 'preview-list')" v-if="previewList.length">
      <div
        :class="[bem('image-upload-pro', 'preview-item'), { active: item.isCover }]"
        v-for="(item, index) in previewList"
        :key="item.uid"
        draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver($event)"
        @drop="handleDrop(index)"
      >
        <!-- 图片预览 -->
        <div :class="bem('image-upload-pro', 'preview-img')">
          <el-image
            :src="item.url"
            :preview-src-list="previewList.map((i) => i.url)"
            :preview-current-index="index"
            fit="cover"
          />
        </div>

        <!-- 操作按钮组 -->
        <div :class="bem('image-upload-pro', 'preview-actions')">
          <el-button type="primary" text size="small" @click="handleCropImage(item)"
            >裁剪</el-button
          >
          <el-button text size="small" type="danger" @click="handleRemovePreview(item)"
            >删除</el-button
          >
        </div>
      </div>
    </div>

    <!-- 裁剪弹窗 -->
    <el-dialog
      v-model="cropDialogVisible"
      title="图片裁剪"
      width="900px"
      :close-on-click-modal="false"
      destroy-on-close
      @close="resetCropper"
    >
      <div :class="bem('image-upload-pro', 'cropper-container')">
        <!-- 裁剪区域 -->
        <vue-cropper
          ref="cropperRef"
          :img="cropImageUrl"
          :info="true"
          :auto-crop="true"
          :auto-crop-width="cropWidth"
          :auto-crop-height="cropHeight"
          :fixed="aspectRatio.fixed"
          :fixed-number="aspectRatio.value"
          :can-move="true"
          :can-scale="true"
          :can-rotate="false"
          @realTime="handleCropRealTime"
        />
      </div>

      <!-- 裁剪配置 -->
      <div :class="bem('image-upload-pro', 'cropper-config')">
        <el-form :model="cropForm">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="裁剪比例">
                <el-select
                  style="width: 100%"
                  v-model="cropForm.aspectRatio"
                  @change="handleAspectRatioChange"
                >
                  <el-option
                    v-for="option in ASPECT_RATIO_OPTIONS"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="裁剪尺寸">
                <el-input-number
                  v-model="displayWidth"
                  placeholder="宽度"
                  :min="props.sizeLimit.width || 100"
                  @change="handleSizeChange"
                />
                <span style="margin: 0 8px">*</span>
                <el-input-number
                  v-model="displayHeight"
                  placeholder="高度"
                  :min="props.sizeLimit.height || 100"
                  @change="handleSizeChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <template #footer>
        <el-button @click="cropDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCropConfirm">确认裁剪</el-button>
      </template>
    </el-dialog>
  </div>
</template>
