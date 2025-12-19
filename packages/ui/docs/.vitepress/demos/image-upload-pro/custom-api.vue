<template>
  <div>
    <ml-image-upload-pro
      v-model="imageList"
      :max-count="5"
      :auto-upload="true"
      :upload-api="uploadApi"
    />

    <el-divider />

    <div style="margin-top: 16px">
      <h4>当前配置：</h4>
      <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px">{{
        JSON.stringify(uploadApi, null, 2)
      }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageList = ref([])

const uploadApi = {
  // 上传接口地址
  url: '/api/upload/image',

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
</script>
