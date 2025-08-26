interface SearchItem {
  label: string
  prop: string
  span?: number
  type?: string
  placeholder?: string
  multiple?: boolean
  options?: any[]
  labelWidth?: string
}

export interface SearchModel {
  [key: string]: any // 添加索引签名，允许任何字符串作为键
  // 其他具体属性...
}

export const searchProps = {
  inline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  // 'left' | 'right' | 'top'
  labelPosition: {
    type: String,
    default: 'right'
  },
  // '' | 'large' | 'default' | 'small'
  size: {
    type: String,
    default: ''
  },
  gutter: {
    type: [String, Number],
    default: 160
  },
  options: {
    type: Array<SearchItem>,
    default: [
      {
        prop: 'houseName',
        label: '楼栋/房号',
        labelWidth: '',
        placeholder: '请输入楼栋/房号',
        type: 'div'
      },
      {
        prop: 'lawName',
        label: '外委律所名称',
        labelWidth: '',
        placeholder: '请输入外委律所名称'
      },
      {
        prop: 'haveDiscount',
        label: '是否涉及让利',
        type: 'select',
        labelWidth: '',
        placeholder: '请选择是否涉及让利',
        options: [
          {
            label: '是',
            value: true
          },
          {
            label: '否',
            value: false
          }
        ]
      },
      {
        prop: 'ownerName',
        label: '客户姓名',
        labelWidth: '',
        placeholder: '请输入客户姓名'
      },
      {
        prop: 'ownerMobile',
        label: '客户手机号',
        labelWidth: '',
        placeholder: '请输入客户手机号'
      },
      {
        prop: ['auditCompletedBeginTime', 'auditCompletedEndTime'],
        label: '审核完成时间',
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        uiFormat: 'yyyy-MM-dd',
        valueFormat: 'timestamp'
      },
      {
        prop: ['createBeginTime', 'createEndTime'],
        label: '创建时间',
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        uiFormat: 'yyyy-MM-dd',
        valueFormat: 'timestamp'
      }
    ]
  }
}
