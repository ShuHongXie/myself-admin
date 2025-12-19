<template>
  <div style="padding: 20px">
    <h3>增强型图片上传器示例</h3>
    <MIImageUploadPro
      v-model="uploadedImages"
      :auto-upload="true"
      :upload-api="{
        url: '/api/upload/image',
        method: 'post',
        fieldName: 'file',
        responseUrlField: 'data.url',
        data: {
          folder: 'products',
          userId: '123'
        }
      }"
      :size-limit="{ width: 200, height: 200, size: 5 }"
      :max-count="6"
      allow-crop
      allow-cover
      allow-sort
      @change="handleImageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MIImageUploadPro from '../components/image-upload-pro/index.vue'
import type { PreviewItem } from '../components/image-upload-pro/type.ts'

const token = ref(
  'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJjaGVuankwMDA2IiwiZXhwIjoxNzk3NjY4NDM2fQ.ojDPri9_G6GwIMijozbSOkwS3oYHXDyxR1EnF5Fx31HwEFkaFD8lqksM25T23SYs9ZWoNnaO06X2pbm08wHS-g4dpqt2t1siYJ1_9NmuJ1BFlk__f6xdcLmEI9YB9e2SyVEIvgGL_-cWRKwwm0qPscVJPSzIF-Q4rqZUa6OS8G8'
)
// 已上传图片列表（回显/存储）
const uploadedImages = ref<PreviewItem[]>([])

/**
 * 图片列表变化回调
 */
const handleImageChange = (list: PreviewItem[]) => {
  console.log('图片列表变化：', list)
  console.log(uploadedImages.value)
  // 示例：调用后端接口上传图片
  // list.forEach(item => {
  //   if (item.rawFile) {
  //     uploadApi(item.rawFile).then(url => {
  //       item.url = url;
  //     });
  //   }
  // });
}
</script>
