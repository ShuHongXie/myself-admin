import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MlDetail from '../index.vue'
describe('MlDetail 详情组件', () => {
  it('应支持描述列数配置', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descColumn: 4,
        dataList: { name: 'Test' },
        descData: [{ label: '名称', value: 'Test' }]
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('descColumn')).toBe(4)
  })

  it('应支持自定义描述数据', () => {
    const descData = [
      { label: '名称', value: 'Test' },
      { label: '状态', value: '正常' }
    ]
    const wrapper = mount(MlDetail, {
      props: { descData }
    })
    expect(wrapper.findAll('.el-descriptions-item')).toHaveLength(2)
  })

  it('应支持字段值映射', () => {
    const wrapper = mount(MlDetail, {
      props: {
        dataList: { name: '映射值' },
        descData: [{ label: '名称', fieldName: 'name' }]
      }
    })
    expect(wrapper.text()).toContain('映射值')
  })

  it('应支持下拉数据回显中文', () => {
    const wrapper = mount(MlDetail, {
      props: {
        dataList: { status: 1 },
        listTypeInfo: {
          statusList: [
            { value: 1, label: '在线' },
            { value: 0, label: '离线' }
          ]
        },
        descData: [
          {
            label: '状态',
            fieldName: 'status',
            filters: { list: 'statusList' }
          }
        ]
      }
    })
    expect(wrapper.text()).toContain('在线')
  })

  it('应支持单位显示', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '重量', value: 100, unit: 'kg' }]
      }
    })
    expect(wrapper.text()).toContain('100kg')
  })

  it('应支持tooltips提示', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '名称', value: 'Test', tooltip: '提示信息' }]
      }
    })
    expect(wrapper.findComponent({ name: 'ElTooltip' }).exists()).toBe(true)
  })

  it('应支持tooltips为函数类型', () => {
    const tooltipRender = vi.fn((h) => h('div', '自定义提示'))
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '名称', value: 'Test', tooltip: tooltipRender }]
      }
    })
    expect(wrapper.findComponent({ name: 'ElTooltip' }).exists()).toBe(true)
  })

  it('应支持图标大小和颜色配置', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [
          {
            label: '名称',
            value: 'Test',
            tooltip: '提示',
            iconSize: 20,
            iconColor: 'red'
          }
        ]
      }
    })
    const icon = wrapper.findComponent({ name: 'ElIcon' })
    expect(icon.props('size')).toBe(20)
    expect(icon.props('color')).toBe('red')
  })

  it('应支持标签粗体显示', () => {
    const wrapper = mount(MlDetail, {
      props: {
        isLabelBold: true,
        descData: [{ label: '名称', value: 'Test' }]
      }
    })
    const label = wrapper.find('.el-descriptions-item__label span')
    expect(label.attributes('style')).toContain('font-weight: bold')
  })

  it('应支持冒号显示配置', () => {
    const wrapper = mount(MlDetail, {
      props: {
        isColon: true,
        descData: [{ label: '名称', value: 'Test' }]
      }
    })
    expect(wrapper.find('.el-descriptions-item__label').text()).toContain('名称：')
  })

  it('应支持隐藏冒号', () => {
    const wrapper = mount(MlDetail, {
      props: {
        isColon: false,
        descData: [{ label: '名称', value: 'Test' }]
      }
    })
    expect(wrapper.find('.el-descriptions-item__label').text()).not.toContain('：')
  })

  it('应支持自定义标签渲染', () => {
    const labelRender = vi.fn((h) => h('span', '自定义标签'))
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '名称', labelRender }]
      }
    })
    expect(wrapper.text()).toContain('自定义标签')
    expect(labelRender).toHaveBeenCalled()
  })

  it('应支持插槽自定义内容', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '自定义', slotName: 'custom' }]
      },
      slots: {
        custom: '<div class="custom-slot">插槽内容</div>'
      }
    })
    expect(wrapper.find('.custom-slot').exists()).toBe(true)
    expect(wrapper.text()).toContain('插槽内容')
  })

  it('应支持自定义跨度配置', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '描述', value: '内容', span: 2 }]
      }
    })
    expect(wrapper.findComponent({ name: 'ElDescriptionsItem' }).props('span')).toBe(2)
  })

  it('应支持默认跨度1', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '描述', value: '内容' }]
      }
    })
    expect(wrapper.findComponent({ name: 'ElDescriptionsItem' }).props('span')).toBe(1)
  })

  it('应支持过滤器自定义key/label字段', () => {
    const wrapper = mount(MlDetail, {
      props: {
        dataList: { status: 'A' },
        listTypeInfo: {
          statusList: [
            { code: 'A', name: '通过' },
            { code: 'B', name: '拒绝' }
          ]
        },
        descData: [
          {
            label: '状态',
            fieldName: 'status',
            filters: { list: 'statusList', key: 'code', label: 'name' }
          }
        ]
      }
    })
    expect(wrapper.text()).toContain('通过')
  })

  it('应支持自定义绑定属性', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [
          {
            label: '名称',
            value: 'Test',
            bind: { class: 'custom-class' }
          }
        ]
      }
    })
    expect(wrapper.find('.custom-class').exists()).toBe(true)
  })

  it('应支持描述项为空时显示空值', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [{ label: '名称', value: '' }]
      }
    })
    const content = wrapper.find('.el-descriptions-item__content')
    expect(content.text()).toBe('')
  })

  it('应支持tooltip placement配置', () => {
    const wrapper = mount(MlDetail, {
      props: {
        descData: [
          {
            label: '名称',
            value: 'Test',
            tooltip: '提示',
            placement: 'top'
          }
        ]
      }
    })
    expect(wrapper.findComponent({ name: 'ElTooltip' }).props('placement')).toBe('top')
  })

  it('应支持组件属性透传', () => {
    const wrapper = mount(MlDetail, {
      props: {
        border: true,
        descData: [{ label: '名称', value: 'Test' }]
      }
    })
    expect(wrapper.findComponent({ name: 'ElDescriptions' }).props('border')).toBe(true)
  })
})
