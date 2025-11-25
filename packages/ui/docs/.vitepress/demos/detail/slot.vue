<template>
  <ms-detail :desc-data="descData" :data-list="dataList">
    <template #statusSlot>
      <el-tag :type="dataList.status === '1' ? 'success' : 'danger'">
        {{ dataList.status === '1' ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </ms-detail>
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '王五',
  status: '1',
  createTime: '2024-01-01 12:00:00'
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    label: '状态',
    slotName: 'statusSlot'
  },
  {
    label: '创建时间',
    value: dataList.value.createTime
  }
]
</script>
