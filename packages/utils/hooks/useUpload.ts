import { ref } from 'vue'
import axios from 'axios'
import { compressImage } from './helper'

interface UploadConfig {
  params?: Record<string, any>
  headers?: Record<string, string>
  quality?: number
}

export default function useUpload(uploadUrl: string, uploadConfig: UploadConfig = {}) {
  // 上传状态
  const previewUrl = ref<string>('') // 图片预览地址
  const uploadProgress = ref<number>(0) // 上传进度
  const isUploading = ref<boolean>(false) // 是否正在上传
  const uploadError = ref<string>('') // 上传错误信息
  const uploadResult = ref<any>(null) // 上传结果（接口返回）

  // 选择图片（生成预览）
  const selectImage = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
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
  const uploadImage = async (file: File | Blob, retry = 1): Promise<any> => {
    if (!file) return
    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = ''

    try {
      // 图片压缩（可选）
      let uploadFile: File | Blob = file
      if (file instanceof File && file.type.startsWith('image/')) {
        uploadFile = await compressImage(file, { quality: uploadConfig.quality || 0.8 })
      }

      // 构建FormData
      const formData = new FormData()
      formData.append('file', uploadFile)
      // 业务自定义参数
      if (uploadConfig.params) {
        Object.entries(uploadConfig.params).forEach(([k, v]) => formData.append(k, v))
      }

      // 上传请求（带进度）
      const res = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data', ...uploadConfig.headers },
        onUploadProgress: (e) => {
          if (e.total) {
            uploadProgress.value = Math.round((e.loaded / e.total) * 100)
          }
        }
      })

      uploadResult.value = res.data
      return res.data
    } catch (err: any) {
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
