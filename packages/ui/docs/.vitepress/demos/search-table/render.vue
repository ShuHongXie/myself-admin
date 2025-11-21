<script setup>
import { ref, onMounted, h } from 'vue'
import { ElTag, ElButton, ElMessage } from 'element-plus'

const searchModel = ref({
  name: '',
  status: ''
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
    prop: 'score',
    label: '评分',
    width: 120,
    render: (row) => {
      const score = row.score || 0
      const color = score >= 80 ? '#67C23A' : score >= 60 ? '#E6A23C' : '#F56C6C'
      return h(
        'span',
        {
          style: {
            color,
            fontWeight: 'bold'
          }
        },
        `${score} 分`
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

// 模拟后端 API
let mockServer
if (typeof window !== 'undefined') {
  onMounted(async () => {
    try {
      const MockAdapter = (await import('axios-mock-adapter')).default
      const axios = (await import('axios')).default

      mockServer = new MockAdapter(axios, { delayResponse: 500 })

      mockServer.onPost('/api/mock/users-render').reply((config) => {
        const params = JSON.parse(config.data || '{}')

        let users = [
          { id: 1, name: '张三', email: 'zhangsan@example.com', status: 1, score: 95 },
          { id: 2, name: '李四', email: 'lisi@example.com', status: 0, score: 72 },
          { id: 3, name: '王五', email: 'wangwu@example.com', status: 1, score: 88 },
          { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 1, score: 56 },
          { id: 5, name: '孙七', email: 'sunqi@example.com', status: 0, score: 91 }
        ]

        if (params.name) {
          users = users.filter((u) => u.name.includes(params.name))
        }
        if (params.status !== undefined && params.status !== '') {
          users = users.filter((u) => u.status === params.status)
        }

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
      console.warn('Mock adapter 加载失败', error)
    }
  })
}
</script>

<template>
  <ml-search-table
    v-model:search="searchModel"
    url="/api/mock/users-render"
    method-type="post"
    :search-props="searchConfig"
    :columns="columns"
  />
</template>
