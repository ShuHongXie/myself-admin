<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { compressImage } from './your-utils-path' // 图片压缩工具函数

/**
 * 业务级图片上传 Hooks（支持预览/压缩/进度/重试）
 * @param {string} uploadUrl - 上传接口地址
 * @param {Object} uploadConfig - 上传配置（headers/参数）
 * @returns {Object} 上传状态和方法
 */
const useImageUploader = (uploadUrl, uploadConfig = {}) => {
  // 上传状态
  const previewUrl = ref('') // 图片预览地址
  const uploadProgress = ref(0) // 上传进度
  const isUploading = ref(false) // 是否正在上传
  const uploadError = ref('') // 上传错误信息
  const uploadResult = ref(null) // 上传结果（接口返回）

  // 选择图片（生成预览）
  const selectImage = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      uploadError.value = '请选择有效的图片文件'
      return
    }

    // 生成预览URL
    previewUrl.value = URL.createObjectURL(file)
    uploadError.value = ''
    return file
  }

  // 上传图片（支持压缩+进度+重试）
  const uploadImage = async (file, retry = 1) => {
    if (!file) return
    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = ''

    try {
      // 图片压缩（可选）
      const compressedFile = await compressImage(file, { quality: 0.8 })

      // 构建FormData
      const formData = new FormData()
      formData.append('file', compressedFile)
      // 业务自定义参数
      if (uploadConfig.params) {
        Object.entries(uploadConfig.params).forEach(([k, v]) => formData.append(k, v))
      }

      // 上传请求（带进度）
      const res = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data', ...uploadConfig.headers },
        onUploadProgress: (e) => {
          uploadProgress.value = Math.round((e.loaded / e.total) * 100)
        }
      })

      uploadResult.value = res.data
      return res.data
    } catch (err) {
      uploadError.value = err.message || '上传失败'
      // 重试逻辑
      if (retry > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return uploadImage(file, retry - 1)
      }
      throw err
    } finally {
      isUploading.value = false
    }
  }

  // 清空上传状态
  const clearUploadState = () => {
    previewUrl.value = ''
    uploadProgress.value = 0
    uploadError.value = ''
    uploadResult.value = null
  }

  return {
    previewUrl,
    uploadProgress,
    isUploading,
    uploadError,
    uploadResult,
    selectImage,
    uploadImage,
    clearUploadState
  }
}

// ----------------  使用示例  ----------------
// 图片上传 Hooks（上传接口+自定义header）
const { previewUrl, uploadProgress, isUploading, uploadError, selectImage, uploadImage } =
  useImageUploader('/api/upload/image', {
    headers: { token: 'your-token' },
    params: { type: 'avatar' }
  })

// 选择图片后触发上传
const handleFileChange = async (e) => {
  const file = selectImage(e)
  if (file) {
    await uploadImage(file)
  }
}
</script>

<template>
  <div class="image-uploader">
    <!-- 图片选择 -->
    <input type="file" accept="image/*" @change="handleFileChange" :disabled="isUploading" />

    <!-- 预览 -->
    <div v-if="previewUrl" class="preview">
      <img :src="previewUrl" style="width: 200px; height: 200px; object-fit: cover" />
    </div>

    <!-- 上传进度 -->
    <div v-if="isUploading" class="progress">上传中：{{ uploadProgress }}%</div>

    <!-- 错误提示 -->
    <div v-if="uploadError" style="color: red">{{ uploadError }}</div>
  </div>
</template>
