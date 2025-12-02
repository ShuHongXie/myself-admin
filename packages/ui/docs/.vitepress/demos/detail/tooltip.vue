<template>
  <ml-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '赵六',
  score: 95
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name,
    tooltip: '这是用户的真实姓名',
    iconSize: 16,
    iconColor: '#409eff'
  },
  {
    label: '分数',
    value: dataList.value.score,
    tooltip: (item) => `当前分数为：${item.value}分`,
    iconSize: 16,
    iconColor: '#409eff'
  }
]
</script>
