<template>
  <ml-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref({
  name: '张三',
  age: 25,
  gender: '男',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  address: '北京市朝阳区'
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    label: '年龄',
    value: dataList.value.age,
    unit: '岁'
  },
  {
    label: '性别',
    value: dataList.value.gender
  },
  {
    label: '手机号',
    value: dataList.value.phone
  },
  {
    label: '邮箱',
    value: dataList.value.email,
    span: 2
  },
  {
    label: '地址',
    value: dataList.value.address,
    span: 2
  }
]
</script>
