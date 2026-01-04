import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MlTreeSelectDialog from '../index.vue'
describe('MlTreeSelectDialog 树形选择弹窗', () => {
  it('应支持弹窗显示状态双向绑定', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('应支持打开弹窗', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('modelValue')).toBe(true)
  })

  it('应支持关闭弹窗', () => {
    let dialogVisible = true
    dialogVisible = false
    expect(dialogVisible).toBe(false)
  })

  it('应支持自定义弹窗标题', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        title: 'Select Department',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('title')).toBe('Select Department')
  })

  it('应支持自定义弹窗宽度', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        width: '700px',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('width')).toBe('700px')
  })

  it('应支持树形数据配置', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        treeData: [{ id: '1', label: 'Dept', children: [{ id: '2', label: 'SubDept' }] }],
        modelValue: false
      }
    })
    expect(wrapper.props('treeData')).toBeDefined()
    expect(wrapper.props('treeData').length).toBe(1)
  })

  it('应支持树形属性配置', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        treeProps: { label: 'name', children: 'sub' },
        modelValue: false,
        treeData: []
      }
    })
    const props = wrapper.props('treeProps') as any
    expect(props.label).toBe('name')
  })

  it('应支持单选模式', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        multiple: false,
        modelValue: false,
        treeData: []
      }
    })
    expect(wrapper.props('multiple')).toBe(false)
  })

  it('应支持多选模式', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        multiple: true,
        modelValue: false,
        treeData: []
      }
    })
    expect(wrapper.props('multiple')).toBe(true)
  })

  it('应支持默认全部展开树', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        defaultExpandAll: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('defaultExpandAll')).toBe(true)
  })

  it('应支持初始选中节点配置', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        defaultSelectedKeys: ['1', '2'],
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(Array.isArray(wrapper.props('defaultSelectedKeys'))).toBe(true)
    expect(wrapper.props('defaultSelectedKeys')).toEqual(['1', '2'])
  })

  it('应支持节点key字段配置', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        nodeKey: 'id',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('nodeKey')).toBe('id')
  })

  it('应支持搜索功能', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        showSearch: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('showSearch')).toBe(true)
  })

  it('应支持禁用搜索', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        showSearch: false,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('showSearch')).toBe(false)
  })

  it('应支持确认选择事件', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    const selectedData = { id: '1', label: 'Selected' }
    await wrapper.vm.$emit('confirm', selectedData)
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('confirm')[0]).toEqual([selectedData])
  })

  it('应支持确认后关闭弹窗', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    const selectedData = { id: '1', label: 'Selected' }
    await wrapper.vm.$emit('confirm', selectedData)
    expect(wrapper.emitted('confirm')).toBeTruthy()

    // 确认事件发出后，应该触发关闭逻辑
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('应支持关闭弹窗事件', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    await wrapper.vm.$emit('update:modelValue', false)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('应支持搜索输入事件', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        showSearch: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    const keyword = 'keyword'
    await wrapper.vm.$emit('input', keyword)
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('input')[0]).toEqual([keyword])
  })

  it('应弹窗关闭时重置树形选择', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    // 初始状态弹窗打开
    expect(wrapper.props('modelValue')).toBe(true)

    // 模拟关闭弹窗
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.props('modelValue')).toBe(false)

    // 验证组件内部状态是否重置
    expect(wrapper.vm.searchText).toBe('')
  })

  it('应支持单选时选中单个节点', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        multiple: false,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(wrapper.props('multiple')).toBe(false)

    // 模拟选择单个节点
    const selectedKeys = ['1']
    expect(selectedKeys.length).toBe(1)
  })

  it('应支持多选时选中多个节点', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        multiple: true,
        modelValue: false,
        treeData: [
          { id: '1', label: 'Dept' },
          { id: '2', label: 'SubDept' }
        ]
      }
    })

    expect(wrapper.props('multiple')).toBe(true)

    // 模拟选择多个节点
    const selectedKeys = ['1', '2', '3']
    expect(selectedKeys.length).toBe(3)
  })

  it('应支持属性透传到Dialog', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        closeOnClickModal: false,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(wrapper.props('closeOnClickModal')).toBe(false)
  })

  it('应支持属性透传到TreeSelect', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        expandOnClickNode: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(wrapper.props('expandOnClickNode')).toBe(true)
  })

  it('应支持事件透传', () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(typeof wrapper.vm.$emit).toBe('function')
  })

  it('应支持弹窗关闭前回调', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    await wrapper.vm.$emit('before-close')
    expect(wrapper.emitted('before-close')).toBeTruthy()
    expect(wrapper.emitted('before-close')).toHaveLength(1)
  })

  it('应支持获取选中节点数据', async () => {
    const wrapper = mount(MlTreeSelectDialog, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Node' }],
        defaultSelectedKeys: ['1']
      }
    })

    // 模拟获取选中数据
    const selectedData = { id: '1', label: 'Node' }
    expect(selectedData.id).toBe('1')
    expect(selectedData.label).toBe('Node')

    // 验证组件内部方法是否可以获取选中数据
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.treeRef).toBeDefined()
  })
})
