import { CustomSlot } from '../Search/props'

export enum RequestMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export const searchTableProps = {
  methodType: {
    type: String as () => RequestMethodType,
    default: 'get'
  },
  url: {
    type: String,
    default: ''
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  searchProps: {
    type: Object,
    default: () => ({
      slots: [
        {
          prop: 'custom1',
          position: 1,
          colProps: {},
          formItemProps: { label: '操作1' }
        },
        {
          prop: 'custom2',
          position: 2,
          formItemProps: { label: '自定义项1' }
        }
      ]
    })
  },
  tableProps: {
    type: Object,
    default: () => ({
      border: true
    })
  },
  // 表格列
  columns: {
    type: Array<any>,
    default: () => [
      {
        prop: 'organizationName',
        label: '地区公司',
        align: 'center',
        width: 130,
        uuid: '1232',
        hideInTable: true
      }
    ]
  }
}
