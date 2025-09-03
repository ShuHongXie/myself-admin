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
  paramsHandler: {
    type: Function,
    default: null
  },
  searchProps: {
    type: Object,
    default: () => {}
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
    default: () => []
  }
}
