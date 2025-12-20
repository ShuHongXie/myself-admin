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
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const form = reactive({
  name: '',
  images: []
})

const uploadApi = {
  url: apiBaseUrl + '/upload/image',
  method: 'post',
  fieldName: 'file',
  responseUrlField: 'data.url'
}

const handleSubmit = () => {
  // 获取所有图片的 URL
  const imageUrls = form.images.map((img: any) => img.serverUrl || img.url)

  // 提交表单数据
  const submitData = {
    name: form.name,
    images: imageUrls
  }

  console.log('提交数据:', submitData)
  ElMessage.success('保存成功')
}
</script>
