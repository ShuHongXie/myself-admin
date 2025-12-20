<template>
  <div>
    <el-form label-width="100px" style="margin-bottom: 20px">
      <el-form-item label="最大数量">
        <el-input-number v-model="maxCount" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="允许裁剪">
        <el-switch v-model="allowCrop" />
      </el-form-item>
      <el-form-item label="允许排序">
        <el-switch v-model="allowSort" />
      </el-form-item>
    </el-form>

    <ml-image-upload-pro
      v-model="imageList"
      :max-count="maxCount"
      :allow-crop="allowCrop"
      :allow-sort="allowSort"
      :size-limit="{
        width: 400,
        height: 300,
        size: 2
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageList = ref([])
const maxCount = ref(5)
const allowCrop = ref(true)
const allowSort = ref(true)
</script>
