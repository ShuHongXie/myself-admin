export const searchProps = {
  slots: [],
  item: [
    {
      prop: 'roleName',
      formItemProps: {
        label: '角色名称'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入角色名称'
        }
      }
    },
    {
      prop: 'status',
      formItemProps: {
        label: '角色状态'
      },
      input: {
        type: 'select',
        props: {
          placeholder: '请选择状态',
          labelWidth: '140px',
          labelKey: 'label',
          valueKey: 'value',
          clearable: true,
          options: [
            {
              label: '停用',
              value: 0
            },
            {
              label: '启用',
              value: 1
            }
          ]
        }
      }
    },
    {
      prop: 'createTime',
      formItemProps: {
        label: '创建时间'
      },
      input: {
        type: 'date-picker',
        props: {
          type: 'daterange',
          placeholder: '请选择创建时间'
        }
      }
    }
  ]
}

// 表格字段
export const columns = ref([
  {
    type: 'selection'
  },
  {
    prop: 'index',
    label: '序号',
    align: 'center',
    type: 'index',
    width: 80
  },
  {
    prop: 'roleName',
    label: '角色名称',
    align: 'center'
  },
  {
    prop: 'status',
    label: '角色状态',
    align: 'center',
    slotName: 'status'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    align: 'center',
    width: 180
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    align: 'center',
    slotName: 'operation'
  }
])

// 编辑规则
export const roleFormRules = ref({
  username: [
    {
      required: true,
      message: '请输入账户名',
      trigger: ['blur']
    }
  ],
  nickname: [
    {
      required: true,
      message: '请输入用户昵称',
      trigger: ['blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: ['blur']
    }
  ],
  // 邮箱验证规则
  email: [
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '邮箱格式不正确（示例：xxx@xxx.com）',
      trigger: ['blur', 'change']
    }
  ],
  telephone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的11位手机号码',
      trigger: ['blur', 'change']
    }
  ]
})
