<template>
  <ml-detail :desc-data="descData" :data-list="dataList" />
</template>

<script setup>
import { ref, h } from 'vue'
import { ElTag } from 'element-plus'

const dataList = ref({
  name: '测试用户',
  priority: 'high'
})

const descData = [
  {
    label: '姓名',
    value: dataList.value.name
  },
  {
    labelRender: (item) => {
      return h('div', [
        h(ElTag, { type: 'danger', size: 'small' }, { default: () => '重要' }),
        h('span', { style: 'margin-left: 8px' }, '优先级：')
      ])
    },
    value: '高'
  }
]
</script>
