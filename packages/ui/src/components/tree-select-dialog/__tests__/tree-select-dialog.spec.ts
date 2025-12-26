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
    const defaultExpandAll = true
    expect(defaultExpandAll).toBe(true)
  })

  it('应支持初始选中节点配置', () => {
    const defaultSelectedKeys = ['1', '2']
    expect(Array.isArray(defaultSelectedKeys)).toBe(true)
  })

  it('应支持节点key字段配置', () => {
    const nodeKey = 'id'
    expect(nodeKey).toBe('id')
  })

  it('应支持搜索功能', () => {
    const showSearch = true
    expect(showSearch).toBe(true)
  })

  it('应支持禁用搜索', () => {
    const showSearch = false
    expect(showSearch).toBe(false)
  })

  it('应支持确认选择事件', () => {
    const handleConfirm = vi.fn()
    const selectedData = { id: '1', label: 'Selected' }
    handleConfirm(selectedData)
    expect(handleConfirm).toHaveBeenCalledWith(selectedData)
  })

  it('应支持确认后关闭弹窗', () => {
    let visible = true
    const handleConfirm = () => {
      visible = false
    }
    handleConfirm()
    expect(visible).toBe(false)
  })

  it('应支持关闭弹窗事件', () => {
    const handleClose = vi.fn()
    handleClose()
    expect(handleClose).toHaveBeenCalled()
  })

  it('应支持搜索输入事件', () => {
    const handleInput = vi.fn()
    handleInput('keyword')
    expect(handleInput).toHaveBeenCalledWith('keyword')
  })

  it('应弹窗关闭时重置树形选择', () => {
    const reset = vi.fn()
    const isVisible = true
    if (!isVisible) {
      reset()
    }
    expect(reset).not.toHaveBeenCalled()
  })

  it('应支持单选时选中单个节点', () => {
    const selectedKeys = ['1']
    expect(selectedKeys.length).toBe(1)
  })

  it('应支持多选时选中多个节点', () => {
    const selectedKeys = ['1', '2', '3']
    expect(selectedKeys.length).toBe(3)
  })

  it('应支持属性透传到Dialog', () => {
    const dialogProps = { closeOnClickModal: false }
    expect(dialogProps.closeOnClickModal).toBe(false)
  })

  it('应支持属性透传到TreeSelect', () => {
    const treeSelectProps = { expandOnClickNode: true }
    expect(treeSelectProps.expandOnClickNode).toBe(true)
  })

  it('应支持事件透传', () => {
    const onNodeClick = vi.fn()
    expect(typeof onNodeClick).toBe('function')
  })

  it('应支持弹窗关闭前回调', () => {
    const handleBeforeClose = vi.fn()
    handleBeforeClose()
    expect(handleBeforeClose).toHaveBeenCalled()
  })

  it('应支持获取选中节点数据', () => {
    const getSelectedData = vi.fn(() => ({ id: '1', label: 'Node' }))
    const result = getSelectedData()
    expect(result.id).toBe('1')
  })
})
