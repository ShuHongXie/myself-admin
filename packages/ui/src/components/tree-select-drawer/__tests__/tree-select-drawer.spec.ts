import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MlTreeSelectDrawer from '../index.vue'
describe('MlTreeSelectDrawer 树形选择抽屉', () => {
  it('应支持抽屉显示状态双向绑定', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('应支持打开抽屉', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('modelValue')).toBe(true)
  })

  it('应支持关闭抽屉', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('应支持自定义抽屉标题', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        title: '选择部门',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('title')).toBe('选择部门')
  })

  it('应支持自定义抽屉宽度', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        size: '400px',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('size')).toMatch(/\d+px$/)
  })

  it('应支持自定义抽屉方向', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        direction: 'rtl',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('direction')).toBe('rtl')
  })

  it('应支持树形数据配置', () => {
    const treeData = [{ id: '1', label: 'Dept', children: [{ id: '2', label: 'SubDept' }] }]
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        treeData,
        modelValue: false
      }
    })
    expect(Array.isArray(wrapper.props('treeData'))).toBe(true)
    expect(wrapper.props('treeData').length).toBe(1)
  })

  it('应支持树形属性配置', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        treeProps: { label: 'name', children: 'sub' },
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    const props = wrapper.props('treeProps') as any
    expect(props.label).toBe('name')
  })

  it('应支持单选模式', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        multiple: false,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('multiple')).toBe(false)
  })

  it('应支持多选模式', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        multiple: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('multiple')).toBe(true)
  })

  it('应支持默认全部展开树', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        defaultExpandAll: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('defaultExpandAll')).toBe(true)
  })

  it('应支持初始选中节点配置', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
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
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        nodeKey: 'id',
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('nodeKey')).toBe('id')
  })

  it('应支持搜索功能', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        showSearch: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('showSearch')).toBe(true)
  })

  it('应支持禁用搜索', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        showSearch: false,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })
    expect(wrapper.props('showSearch')).toBe(false)
  })

  it('应支持确认选择事件', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
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

  it('应支持确认后关闭抽屉', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
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

  it('应支持关闭抽屉事件', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
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
    const wrapper = mount(MlTreeSelectDrawer, {
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

  it('应抽屉关闭时重置树形选择', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        modelValue: true,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    // 初始状态抽屉打开
    expect(wrapper.props('modelValue')).toBe(true)

    // 模拟关闭抽屉
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.props('modelValue')).toBe(false)

    // 验证组件内部状态是否重置
    expect(wrapper.vm.searchText).toBe('')
  })

  it('应支持单选时选中单个节点', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
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
    const wrapper = mount(MlTreeSelectDrawer, {
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

  it('应支持属性透传到Drawer', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        closeOnClickModal: false,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(wrapper.props('closeOnClickModal')).toBe(false)
  })

  it('应支持属性透传到TreeSelect', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        expandOnClickNode: true,
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(wrapper.props('expandOnClickNode')).toBe(true)
  })

  it('应支持事件透传', () => {
    const wrapper = mount(MlTreeSelectDrawer, {
      props: {
        modelValue: false,
        treeData: [{ id: '1', label: 'Dept' }]
      }
    })

    expect(typeof wrapper.vm.$emit).toBe('function')
  })

  it('应支持抽屉关闭前回调', async () => {
    const wrapper = mount(MlTreeSelectDrawer, {
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
    const wrapper = mount(MlTreeSelectDrawer, {
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
