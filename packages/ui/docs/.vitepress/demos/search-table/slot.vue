<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 从环境变量获取 API 基础地址
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

const searchModel = ref({
  name: '',
  status: '',
  _component: 'slot' // 添加组件标识，避免重复请求被取消
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
    width: 150,
    fixed: 'right'
  }
]

const handleAdd = () => {
  ElMessage.success('点击新增用户')
}

const handleBatchDelete = () => {
  ElMessage.warning('点击批量删除')
}

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
    <template #prefix>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="handleAdd">新增用户</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
    </template>

    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>

    <template #actions="{ row }">
      <el-button type="primary" size="small" @click="handleEdit(row)"> 编辑 </el-button>
      <el-button type="danger" size="small" @click="handleDelete(row)"> 删除 </el-button>
    </template>

    <template #suffix>
      <div style="margin-top: 10px; padding: 10px; background: #f5f7fa; border-radius: 4px">
        <p style="margin: 0; color: #606266; font-size: 14px">
          💡 提示：这里是表格后置插槽内容，可以放置统计信息、说明文字等
        </p>
      </div>
    </template>
  </ml-search-table>
</template>
