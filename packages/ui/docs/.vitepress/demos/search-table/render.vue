<script setup>
import { ref, h } from 'vue'
import { ElTag, ElButton, ElMessage } from 'element-plus'

// 从全局变量获取 API 基础地址
const apiBaseUrl = typeof __API_BASE_URL__ !== 'undefined' ? __API_BASE_URL__ : '/api'
console.log('apiBaseUrl:', apiBaseUrl)

const searchModel = ref({
  name: '',
  status: '',
  _component: 'render' // 添加组件标识，避免重复请求被取消
})

const searchConfig = {
  item: [
    {
      prop: 'name',
      input: {
        type: 'input',
        props: { placeholder: '请输入用户名' }
      },
      formItemProps: { label: '用户名' }
    },
    {
      prop: 'status',
      input: {
        type: 'select',
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ],
          labelKey: 'label',
          valueKey: 'value'
        }
      },
      formItemProps: { label: '状态' }
    }
  ],
  span: 8
}

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '用户名', width: 120 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: (row) => {
      return h(
        ElTag,
        {
          type: row.status === 1 ? 'success' : 'danger'
        },
        () => (row.status === 1 ? '启用' : '禁用')
      )
    }
  },

  {
    label: '操作',
    width: 150,
    fixed: 'right',
    render: (row) => {
      return h('div', [
        h(
          ElButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => handleEdit(row)
          },
          () => '编辑'
        ),
        h(
          ElButton,
          {
            type: 'danger',
            size: 'small',
            onClick: () => handleDelete(row),
            style: { marginLeft: '8px' }
          },
          () => '删除'
        )
      ])
    }
  }
]

const handleEdit = (row) => {
  ElMessage.success(`编辑用户: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessage.warning(`删除用户: ${row.name}`)
}
</script>

<template>
  <ml-search-table
    v-model:search="searchModel"
    :url="apiBaseUrl + '/mock/users/list'"
    method-type="post"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>
