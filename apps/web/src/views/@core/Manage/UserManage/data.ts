export const searchProps = {
  slots: [],
  item: [
    {
      prop: 'nickname',
      formItemProps: {
        label: '用户昵称'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入用户昵称'
        }
      }
    },
    {
      prop: 'username',
      formItemProps: {
        label: '登录ID'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入登录ID'
        }
      }
    },
    {
      prop: 'telephone',
      formItemProps: {
        label: '联系电话'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入联系电话'
        }
      }
    },
    {
      prop: 'status',
      formItemProps: {
        label: '用户状态'
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
    }
  ]
}
