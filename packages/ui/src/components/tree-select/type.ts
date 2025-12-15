export interface TreeSelectProps<T = any> {
  treeData: T[] // 树形数据
  treeProps?: Record<string, any> // 树形配置（同 Element Plus Tree）
  multiple?: boolean // 是否多选
  defaultExpandAll?: boolean // 是否默认展开所有节点
  defaultSelectedKeys?: any[] // 默认选中的节点key
  nodeKey?: string // 节点唯一标识字段
  showSearch?: boolean // 是否显示搜索框
  expandOnClickNode?: boolean // 是否点击节点展开
  placeholder?: string // 占位符
}

export interface TreeSelectExpose {
  reset: () => void // 重置选择
  getSelectedData: () => any // 获取选中数据
  getSelectedKeys: () => any[] // 获取选中keys
}
