export enum RequestMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export const searchTableProps = {
  // 请求方式
  methodType: {
    type: String as () => RequestMethodType,
    default: 'post'
  },
  // 请求地址
  url: {
    type: String,
    default: ''
  },
  // 返回结果列表访问字段
  responseDataField: {
    type: String,
    default: 'data.result'
  },
  // 返回结果总数访问字段
  responseTotalField: {
    type: String,
    default: 'data.total'
  },
  // 请求头
  headers: {
    type: Object,
    default: () => ({})
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true
  },
  // 参数控制函数
  paramsHandler: {
    type: Function,
    default: null
  },
  // 列渲染函数
  render: {
    type: Function,
    default: null
  },
  // Search组件配置
  searchProps: {
    type: Object,
    default: () => {}
  },
  // el-table组件配置
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
