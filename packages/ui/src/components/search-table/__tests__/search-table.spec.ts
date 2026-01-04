// import { mount } from '@vue/test-utils'
// import { describe, it, expect, vi } from 'vitest'
// import MlSearchTable from '../index.vue'

// describe('MlSearchTable 搜索表格', () => {
//   it('应正确挂载组件', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [{ label: '名称', prop: 'name' }],
//         tableProps: {},
//         searchProps: { item: [], slots: [] }
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.exists()).toBe(true)
//   })

//   it('应接受columns属性', () => {
//     const columns = [
//       { label: '名称', prop: 'name' },
//       { label: '状态', prop: 'status' }
//     ]
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns,
//         tableProps: {},
//         searchProps: { item: [], slots: [] }
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('columns')).toEqual(columns)
//   })

//   it('应接受tableProps属性', () => {
//     const tableProps = { border: true, stripe: true }
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps,
//         searchProps: { item: [], slots: [] }
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('tableProps')).toEqual(tableProps)
//   })

//   it('应接受searchProps属性', () => {
//     const searchProps = { item: [{ prop: 'name', label: '名称' }], slots: [] }
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('searchProps')).toEqual(searchProps)
//   })

//   it('应支持pagination属性', () => {
//     const pagination = { currentPage: 1, pageSize: 10, total: 100 }
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         pagination
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('pagination')).toEqual(pagination)
//   })

//   it('应支持data属性', () => {
//     const data = [{ id: 1, name: 'Test' }]
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         data
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('data')).toEqual(data)
//   })

//   it('应支持loading属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         loading: true
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('loading')).toBe(true)
//   })

//   it('应支持actionColumn属性', () => {
//     const actionColumn = { label: '操作', width: 200 }
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         actionColumn
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('actionColumn')).toEqual(actionColumn)
//   })

//   it('应支持rowKey属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         rowKey: 'id'
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('rowKey')).toBe('id')
//   })

//   it('应支持selection属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         selection: true
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('selection')).toBe(true)
//   })

//   it('应支持expand属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         expand: true
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('expand')).toBe(true)
//   })

//   it('应支持index属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         index: true
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('index')).toBe(true)
//   })

//   it('应支持paginationProps属性', () => {
//     const paginationProps = { layout: 'total, sizes, prev, pager, next, jumper' }
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         paginationProps
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('paginationProps')).toEqual(paginationProps)
//   })

//   it('应支持searchShow属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         searchShow: false
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('searchShow')).toBe(false)
//   })

//   it('应支持paginationShow属性', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         paginationShow: false
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.props('paginationShow')).toBe(false)
//   })

//   it('应支持插槽渲染', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [{ label: '名称', prop: 'name', slot: 'name' }],
//         tableProps: {},
//         searchProps: { item: [], slots: [] }
//       },
//       slots: {
//         'name-slot': '<span>Custom Name</span>'
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.find('span').text()).toBe('Custom Name')
//   })

//   it('应支持操作栏插槽', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         actionColumn: { label: '操作' }
//       },
//       slots: {
//         'action-slot': '<button>Action Button</button>'
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.find('button').text()).toBe('Action Button')
//   })

//   it('应支持搜索栏插槽', () => {
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [{ prop: 'name', label: '名称' }], slots: ['name'] }
//       },
//       slots: {
//         'search-name': '<input type="text" placeholder="Custom Search" />'
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })
//     expect(wrapper.find('input').attributes('placeholder')).toBe('Custom Search')
//   })

//   it('应支持表格事件透传', () => {
//     const rowClickHandler = vi.fn()
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         'onRow-click': rowClickHandler
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })

//     // 验证事件处理函数已定义
//     expect(typeof wrapper.props('onRow-click')).toBe('function')
//   })

//   it('应支持搜索事件', () => {
//     const searchHandler = vi.fn()
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         onSearch: searchHandler
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })

//     expect(typeof wrapper.props('onSearch')).toBe('function')
//   })

//   it('应支持重置事件', () => {
//     const resetHandler = vi.fn()
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         onReset: resetHandler
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })

//     expect(typeof wrapper.props('onReset')).toBe('function')
//   })

//   it('应支持分页变化事件', () => {
//     const pageChangeHandler = vi.fn()
//     const wrapper = mount(MlSearchTable, {
//       props: {
//         columns: [],
//         tableProps: {},
//         searchProps: { item: [], slots: [] },
//         'onSize-change': pageChangeHandler,
//         'onCurrent-change': pageChangeHandler
//       },
//       global: {
//         stubs: {
//           MlSearch: true,
//           ElTable: true,
//           ElTableColumn: true,
//           ElPagination: true
//         }
//       }
//     })

//     expect(typeof wrapper.props('onSize-change')).toBe('function')
//     expect(typeof wrapper.props('onCurrent-change')).toBe('function')
//   })
// })
