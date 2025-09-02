import { CustomSlot } from '../Search/props'

export const searchTableProps = {
  type: {
    type: String,
    default: 'get'
  },
  searchProps: {
    type: Object,
    default: () => ({
      slots: [
        {
          prop: 'custom1',
          position: 0,
          colProps: {},
          formItemProps: { label: '操作' }
        },
        {
          prop: 'custom2',
          position: 1,
          formItemProps: { label: '自定义项' }
        }
      ]
    })
  },
  tableProps: {
    type: Object,
    default: () => ({})
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
