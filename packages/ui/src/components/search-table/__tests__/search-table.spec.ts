import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MlSearchTable from '../index.vue'

describe('MlSearchTable 搜索表格', () => {
  it('应正确挂载组件', () => {
    const wrapper = mount(MlSearchTable, {
      props: {
        url: '/api/list',
        columns: [{ label: '名称', prop: 'name' }],
        tableProps: {},
        searchProps: { item: [], slots: [] }
      },
      global: {
        stubs: {
          MlSearch: true,
          ElTable: true,
          ElTableColumn: true,
          ElPagination: true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应接受url属性', () => {
    const wrapper = mount(MlSearchTable, {
      props: {
        url: '/api/test',
        columns: [],
        tableProps: {},
        searchProps: { item: [], slots: [] }
      },
      global: {
        stubs: {
          MlSearch: true,
          ElTable: true,
          ElTableColumn: true,
          ElPagination: true
        }
      }
    })
    expect(wrapper.props('url')).toBe('/api/test')
  })

  it('应接受columns属性', () => {
    const columns = [
      { label: '名称', prop: 'name' },
      { label: '状态', prop: 'status' }
    ]
    const wrapper = mount(MlSearchTable, {
      props: {
        url: '/api/list',
        columns,
        tableProps: {},
        searchProps: { item: [], slots: [] }
      },
      global: {
        stubs: {
          MlSearch: true,
          ElTable: true,
          ElTableColumn: true,
          ElPagination: true
        }
      }
    })
    expect(wrapper.props('columns')).toEqual(columns)
  })

  it('应接受tableProps属性', () => {
    const tableProps = { border: true, stripe: true }
    const wrapper = mount(MlSearchTable, {
      props: {
        url: '/api/list',
        columns: [],
        tableProps,
        searchProps: { item: [], slots: [] }
      },
      global: {
        stubs: {
          MlSearch: true,
          ElTable: true,
          ElTableColumn: true,
          ElPagination: true
        }
      }
    })
    expect(wrapper.props('tableProps')).toEqual(tableProps)
  })
})
