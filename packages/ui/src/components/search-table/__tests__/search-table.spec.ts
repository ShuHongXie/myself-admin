import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import MlSearchTable from '../index.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as utils from '@minilo/utils'

// Mock 工具库中的请求初始化函数
vi.mock('@minilo/utils', async () => {
  const actual = await vi.importActual('@minilo/utils')
  return {
    ...actual,
    initRequestInstance: vi.fn()
  }
})

describe('MlSearchTable 接口请求测试', () => {
  let mock: MockAdapter
  const mockAxiosInstance = axios.create()

  beforeEach(() => {
    // 为每个测试创建一个新的 Mock 适配器
    mock = new MockAdapter(mockAxiosInstance)

    // 让组件内部调用的 initRequestInstance 返回我们的 Mock 实例
    vi.mocked(utils.initRequestInstance).mockReturnValue(mockAxiosInstance as any)

    // 静默 console.log，避免测试 500 错误时产生堆栈输出
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    mock.restore()
    vi.restoreAllMocks()
  })

  // it('组件挂载时应自动请求接口并渲染数据', async () => {
  //   const mockData = {
  //     code: 200,
  //     msg: 'success',
  //     data: {
  //       result: [
  //         { id: 1, name: '测试项目1' },
  //         { id: 2, name: '测试项目2' }
  //       ],
  //       total: 2
  //     }
  //   }

  //   // 设置拦截规则：拦截 POST 请求并返回 mockData
  //   mock.onPost('/api/list').reply(200, mockData)

  //   const wrapper = mount(MlSearchTable, {
  //     props: {
  //       url: '/api/list',
  //       columns: [{ label: '名称', prop: 'name' }],
  //       responseDataField: 'data.result', // 对应 mockData 结构
  //       searchProps: { item: [], slots: [] }
  //     },
  //     global: {
  //       stubs: {
  //         MlSearch: true,
  //         ElTable: true,
  //         ElTableColumn: true,
  //         ElPagination: true
  //       }
  //     }
  //   })

  //   // 等待所有异步请求和 Promise 完成
  //   await flushPromises()

  //   // 断言：检查组件内部 data 状态是否已更新
  //   const vm = wrapper.vm as any
  //   expect(vm.data).toBeDefined()
  //   expect(vm.data).toHaveLength(2)
  //   expect(vm.data[0].name).toBe('测试项目1')
  // })

  it('请求失败时应处理错误状态', async () => {
    // 模拟接口返回 500 错误
    mock.onPost('/api/error').reply(500, { msg: '服务器错误' })

    const wrapper = mount(MlSearchTable, {
      props: {
        url: '/api/error',
        columns: [],
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

    await flushPromises()

    // 断言加载状态已关闭，数据为空
    expect((wrapper.vm as any).loading).toBe(false)
    expect((wrapper.vm as any).data).toEqual([])
  })

  it('应正确挂载基础属性', async () => {
    // 拦截初始化请求，防止 404
    mock.onPost('/api/list').reply(200, { code: 200, data: { result: [] } })

    const wrapper = mount(MlSearchTable, {
      props: {
        url: '/api/list',
        columns: [{ label: '名称', prop: 'name' }],
        tableProps: { border: true },
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

    await flushPromises()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('url')).toBe('/api/list')
    expect((wrapper.props('tableProps') as any).border).toBe(true)
  })
})
