export enum SearchTypeEnum {
  ITEM = 1,
  SLOT = 2
}

export interface SearchItem {
  prop: string
  span?: number
  placeholder?: string
  multiple?: boolean
  options?: any[]
  labelWidth?: string
  input?: any
  colProps?: any
  formItemProps?: any
  [keyname: string]: any
}

export interface CustomSlot {
  prop: string // 对应插槽名称
  span?: number // 宽度占 6/24（默认）
  colProps?: any // el-col传参
  formItemProps?: any // el-form-item传参
  position?: number // 所在位置
  [keyname: string]: any
}

export interface SearchProps extends SearchItem, CustomSlot {
  type: SearchTypeEnum
}

export interface SearchModel {
  [key: string]: any // 添加索引签名，允许任何字符串作为键
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
    default: 'top'
  },
  // '' | 'large' | 'default' | 'small'
  size: {
    type: String,
    default: 'default'
  },
  gutter: {
    type: [String, Number],
    default: 10
  },
  span: {
    type: Number,
    default: 6
  },
  submitBtnText: {
    type: String,
    default: '查询'
  },
  resetBtnText: {
    type: String,
    default: '重置'
  },
  slots: {
    type: Array<CustomSlot>,
    default: () => []
  },
  item: {
    type: Array<SearchItem>,
    default: () => []
  }
}
