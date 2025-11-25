<template>
  <ms-detail :desc-data="descData" :data-list="dataList" :list-type-info="listTypeInfo" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '李四',
  status: '1',
  type: '2'
})

const listTypeInfo = ref({
  statusList: [
    { label: '启用', value: '1' },
    { label: '禁用', value: '0' }
  ],
  typeList: [
    { label: '类型A', value: '1' },
    { label: '类型B', value: '2' },
    { label: '类型C', value: '3' }
  ]
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    label: '状态',
    fieldName: 'status',
    filters: {
      list: 'statusList'
    }
  },
  {
    label: '类型',
    fieldName: 'type',
    filters: {
      list: 'typeList'
    }
  }
]
</script>
