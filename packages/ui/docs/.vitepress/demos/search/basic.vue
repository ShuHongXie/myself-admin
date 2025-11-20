<script setup>
import { ref } from 'vue'

const searchModel = ref({
  name: '',
  status: ''
})

const searchItems = [
  {
    prop: 'name',
    input: {
      type: 'input',
      props: {
        placeholder: '请输入名称'
      }
    },
    formItemProps: {
      label: '名称'
    }
  },
  {
    prop: 'status',
    input: {
      type: 'select',
      props: {
        placeholder: '请选择状态',
        options: [
          { label: '启用', value: '1' },
          { label: '禁用', value: '0' }
        ],
        labelKey: 'label',
        valueKey: 'value'
      }
    },
    formItemProps: {
      label: '状态'
    }
  },
  {
    prop: 'email',
    input: {
      type: 'input',
      props: {
        placeholder: '请输入邮箱'
      }
    },
    formItemProps: {
      label: '邮箱'
    }
  }
]

const handleSubmit = () => {
  console.log('搜索参数:', searchModel.value)
  alert(`搜索参数: ${JSON.stringify(searchModel.value, null, 2)}`)
}

const handleReset = () => {
  console.log('重置搜索')
}
</script>

<template>
  <ml-search
    v-model="searchModel"
    :item="searchItems"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>
