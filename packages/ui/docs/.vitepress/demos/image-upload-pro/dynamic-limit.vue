<template>
  <div>
    <div style="margin-bottom: 16px">
      <el-radio-group v-model="quality" @change="handleQualityChange">
        <el-radio-button label="normal">普通质量</el-radio-button>
        <el-radio-button label="high">高质量</el-radio-button>
      </el-radio-group>
    </div>

    <ml-image-upload-pro
      v-model="imageList"
      :max-count="3"
      :auto-upload="true"
      :size-limit="sizeLimit"
      :upload-api="uploadApi"
    />

    <el-divider />

    <div style="margin-top: 16px">
      <h4>当前限制配置：</h4>
      <el-descriptions :column="3" border size="small">
        <el-descriptions-item label="最小宽度">{{ sizeLimit.width }}px</el-descriptions-item>
        <el-descriptions-item label="最小高度">{{ sizeLimit.height }}px</el-descriptions-item>
        <el-descriptions-item label="文件大小">{{ sizeLimit.size }}MB</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const imageList = ref([])
const quality = ref('normal')

const sizeLimit = reactive({
  width: 800,
  height: 600,
  size: 5
})

const uploadApi = {
  url: apiBaseUrl + '/upload/image',
  method: 'post',
  fieldName: 'file',
  responseUrlField: 'data.url'
}

const handleQualityChange = (value: string) => {
  // 根据条件修改限制
  if (value === 'high') {
    sizeLimit.width = 1920
    sizeLimit.height = 1080
    sizeLimit.size = 10
    ElMessage.success('已切换到高质量模式')
  } else {
    sizeLimit.width = 800
    sizeLimit.height = 600
    sizeLimit.size = 5
    ElMessage.success('已切换到普通质量模式')
  }
}
</script>
