<template>
  <div>
    <el-alert
      title="提示"
      type="info"
      description="1. 点击'选择图片'上传图片 2. 在弹出窗口中选择'裁剪' 3. 在裁剪弹窗中调整裁剪框和比例 4. 点击'确认裁剪'完成裁剪"
      :closable="false"
      style="margin-bottom: 20px"
    />
    <ml-image-upload-pro
      v-model="imageList"
      :auto-upload="false"
      :max-count="5"
      :allow-crop="true"
      :allow-sort="true"
      :size-limit="{
        width: 400,
        height: 300,
        size: 5
      }"
    />
    <div v-if="imageList.length" style="margin-top: 20px">
      <p><strong>本地图片预览：</strong></p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap">
        <div v-for="(item, index) in imageList" :key="index" style="position: relative">
          <img
            :src="item.url"
            style="width: 100px; height: 100px; object-fit: cover; border: 1px solid #ddd"
            :alt="item.name"
          />
          <span
            v-if="item.isCover"
            style="
              position: absolute;
              top: 5px;
              right: 5px;
              background: #67c23a;
              color: white;
              padding: 2px 6px;
              font-size: 12px;
              border-radius: 2px;
            "
            >封面</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageList = ref([])
</script>
