import type { PropType } from 'vue'
import type { UploadFile } from 'element-plus'

/**
 * 上传 API 配置（参考 search-table 的配置方式）
 */
export interface UploadApiConfig {
  url: string // 上传接口地址
  method?: 'post' | 'put' // 请求方法，默认 post
  headers?: Record<string, string> // 请求头
  fieldName?: string // 文件字段名，默认 'file'
  data?: Record<string, any> // 额外的表单数据
  responseUrlField?: string // 响应中 URL 的字段路径，默认 'data.url'
}

/**
 * 尺寸限制配置
 */
export interface SizeLimit {
  width: number // 最小宽度（0表示不限制）
  height: number // 最小高度（0表示不限制）
  size: number // 最大文件大小（MB）
}

/**
 * 裁剪比例配置
 */
export interface AspectRatio {
  fixed: boolean // 是否固定比例
  value: [number, number] // 比例值 [宽, 高]
}

/**
 * 预览项（增强版UploadFile）
 */
export interface PreviewItem extends UploadFile {
  isCover?: boolean // 是否为封面
  rawFile?: File // 原始文件对象
  blobUrl?: string // 本地 blob URL（用于裁剪）
  serverUrl?: string // 服务器返回的 URL（用于显示和提交）
}

/**
 * 图片上传组件 Props
 */
export const imageUploadProProps = {
  /**
   * 已上传图片列表（用于回显）
   * v-model 绑定的值
   */
  modelValue: {
    type: Array as PropType<PreviewItem[]>,
    default: () => []
  },

  /**
   * 允许上传的图片格式
   * 默认支持 jpg、png、webp
   */
  acceptType: {
    type: String,
    default: 'image/jpeg,image/jpg,image/png,image/webp'
  },

  /**
   * 尺寸限制配置
   * width/height 为 0 表示不限制
   * size 为最大文件大小（MB）
   */
  sizeLimit: {
    type: Object as PropType<SizeLimit>,
    default: () => ({
      width: 0,
      height: 0,
      size: 2
    })
  },

  /**
   * 最大上传数量
   * 默认 9 张
   */
  maxCount: {
    type: Number,
    default: 9
  },

  /**
   * 是否允许裁剪图片
   * 启用后会在上传时弹出裁剪对话框
   */
  allowCrop: {
    type: Boolean,
    default: true
  },

  /**
   * 是否支持封面标记
   * 允许用户标记某张图片为封面
   */
  allowCover: {
    type: Boolean,
    default: true
  },

  /**
   * 是否支持拖拽排序
   * 启用后可以通过拖拽调整图片顺序
   */
  allowSort: {
    type: Boolean,
    default: true
  },

  /**
   * 上传 API 配置
   * 配置后，每次选择或裁剪图片时会自动上传到服务器
   */
  uploadApi: {
    type: Object as PropType<UploadApiConfig>,
    default: null
  },

  /**
   * 是否自动上传
   * 启用后，选择或裁剪图片时自动调用上传接口
   */
  autoUpload: {
    type: Boolean,
    default: false
  }
}

/**
 * 组件 Props 类型（从 props 定义中推导）
 */
export type ImageUploadProProps = {
  modelValue?: PreviewItem[]
  accept?: string
  sizeLimit?: SizeLimit
  maxCount?: number
  allowCrop?: boolean
  allowCover?: boolean
  allowSort?: boolean
}

/**
 * 组件暴露的方法
 */
export interface ImageUploadProExpose {
  /**
   * 上传到服务器
   * @param uploadApi 上传接口函数，接收 File 对象，返回图片 URL
   * @returns 上传后的图片列表
   */
  uploadToServer: (uploadApi: (file: File) => Promise<string>) => Promise<PreviewItem[]>

  /**
   * 清空所有已上传的图片
   */
  clear: () => void
}
