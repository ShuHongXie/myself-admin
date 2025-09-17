import { ElButton } from 'element-plus'
import { transOptionsToObject } from '@myself/utils'
export const searchProps = {
  slots: [],
  span: 8,
  item: [
    {
      prop: 'name',
      formItemProps: {
        label: '菜单名称'
      },
      input: {
        type: 'input',
        props: {
          placeholder: '请输入菜单名称'
        }
      }
    },
    {
      prop: 'status',
      formItemProps: {
        label: '菜单状态'
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

export enum MenuType {
  '目录' = 1,
  '菜单' = 2,
  '按钮' = 3
}

export const menuTypeOptions = [
  {
    label: '目录',
    value: 1
  },
  {
    label: '菜单',
    value: 2
  },
  {
    label: '按钮',
    value: 3
  }
]

export const menuTypeData = transOptionsToObject(menuTypeOptions)

// 表格字段
export const columns = ref([
  {
    prop: 'orderNum',
    label: '序号',
    align: 'center',
    width: 80
  },
  {
    prop: 'name',
    label: '菜单名称',
    align: 'center'
  },
  {
    prop: 'menuType',
    label: '菜单类型',
    align: 'center',
    render: (row: any) => (
      <ElButton type={'primary'} link>
        {menuTypeData[row.menuType]}
      </ElButton>
    )
  },
  {
    prop: 'path',
    label: '组件路径',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'permission',
    label: '菜单权限',
    align: 'center',
    minWidth: 180
  },
  {
    prop: 'status',
    label: '菜单状态',
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
export const menuFormRules = ref({
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: ['blur']
    }
  ],
  orderNum: [
    {
      required: true,
      message: '请输入输入序号',
      trigger: ['blur']
    }
  ],
  parentId: [
    {
      required: true,
      message: '请选择父级菜单',
      trigger: ['blur']
    }
  ]
})

// 菜单树设置
export const treeSettingSelect = ref([
  {
    label: '展开/折叠',
    id: 1,
    value: 'expand'
  },
  {
    label: '全选/全不选',
    id: 2,
    value: 'checkAll'
  },
  {
    label: '父子联动',
    id: 3,
    value: 'linkage'
  }
])

// 默认操作对象
export const defaultOperateItem = {
  name: '',
  menuType: 1,
  component: '',
  permission: '',
  path: '',
  status: 1,
  meta: {
    icon: '',
    orderNum: '',
    title: '',
    isCache: 0
  }
}
