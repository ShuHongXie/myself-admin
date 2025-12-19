<template>
  <div>
    <ml-image-upload-pro
      v-model="imageList"
      :max-count="3"
      :allow-crop="false"
      :allow-sort="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageList = ref([])
</script>
