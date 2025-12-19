<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 从全局变量获取 API 基础地址
const apiBaseUrl = typeof __API_BASE_URL__ !== 'undefined' ? __API_BASE_URL__ : '/api'
console.log('apiBaseUrl:', apiBaseUrl)

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

// 模拟后端 API
let mockServer
if (typeof window !== 'undefined') {
  onMounted(async () => {
    // 动态导入 axios-mock-adapter
    try {
      const MockAdapter = (await import('axios-mock-adapter')).default
      const axios = (await import('axios')).default

      mockServer = new MockAdapter(axios, { delayResponse: 500 })

      // 模拟用户列表 API
      mockServer.onPost('/api/mock/users').reply((config) => {
        const params = JSON.parse(config.data || '{}')
        console.log('请求参数:', params)

        let users = [
          { id: 1, name: '张三', email: 'zhangsan@example.com', status: 1 },
          { id: 2, name: '李四', email: 'lisi@example.com', status: 0 },
          { id: 3, name: '王五', email: 'wangwu@example.com', status: 1 },
          { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 1 },
          { id: 5, name: '孙七', email: 'sunqi@example.com', status: 0 },
          { id: 6, name: '周八', email: 'zhouba@example.com', status: 1 },
          { id: 7, name: '吴九', email: 'wujiu@example.com', status: 0 },
          { id: 8, name: '郑十', email: 'zhengshi@example.com', status: 1 }
        ]

        // 根据搜索条件过滤
        if (params.name) {
          users = users.filter((u) => u.name.includes(params.name))
        }
        if (params.status !== undefined && params.status !== '') {
          users = users.filter((u) => u.status === params.status)
        }

        // 分页
        const pageSize = params.pageSize || 20
        const currentPage = params.currentPage || 1
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        const paginatedUsers = users.slice(start, end)

        return [
          200,
          {
            data: {
              result: paginatedUsers,
              total: users.length
            },
            code: 200,
            msg: '成功'
          }
        ]
      })
    } catch (error) {
      console.warn('Mock adapter 加载失败，组件可能无法正常工作', error)
    }
  })
}
</script>

<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/mock/users"
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
