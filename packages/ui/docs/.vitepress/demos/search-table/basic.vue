<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 从环境变量获取 API 基础地址
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const searchModel = ref({
  name: '',
  status: '',
  _component: 'basic' // 添加组件标识，避免重复请求被取消
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
  { prop: 'email', label: '邮箱', width: 200 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    slotName: 'status'
  },
  {
    label: '操作',
    slotName: 'actions',
    fixed: 'right'
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
  >
    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>

    <template #actions="{ row }">
      <el-button type="primary" size="small" @click="handleEdit(row)"> 编辑 </el-button>
      <el-button type="danger" size="small" @click="handleDelete(row)"> 删除 </el-button>
    </template>
  </ml-search-table>
</template>
