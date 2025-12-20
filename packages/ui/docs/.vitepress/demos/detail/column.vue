<template>
  <ml-detail :desc-column="3" :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  field1: '值1',
  field2: '值2',
  field3: '值3',
  field4: '这是一个跨两列的内容值',
  field5: '值5',
  field6: '值6'
})

const descData = [
  { label: '字段1', value: dataList.value.field1 },
  { label: '字段2', value: dataList.value.field2 },
  { label: '字段3', value: dataList.value.field3 },
  { label: '字段4', value: dataList.value.field4, span: 2 },
  { label: '字段5', value: dataList.value.field5 }
]
</script>
