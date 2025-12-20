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
  // el-tree 暴露的方法
  getCheckedNodes: () => any[] // 获取被勾选的节点
  getCheckedKeys: () => any[] // 获取被勾选节点的 key
  getHalfCheckedNodes: () => any[] // 获取半选节点
  getHalfCheckedKeys: () => any[] // 获取半选节点的 key
  getCurrentKey: () => string | number | undefined // 获取当前选中节点的 key
  getCurrentNode: () => any // 获取当前选中节点
  setCheckedKeys: (keys: any[]) => void // 设置勾选的节点
  setCheckedNodes: (nodes: any[]) => void // 设置勾选的节点对象
  setCurrentKey: (key: string | number | undefined) => void // 设置当前选中节点的 key
  setCurrentNode: (node: any) => void // 设置当前选中节点
  getNode: (key: string | number) => any // 获取指定 key 对应的节点对象
  filter: (value: string) => void // 对树节点进行筛选操作
  updateKeyChildren: (key: string | number, children: any[]) => void // 为 lazy 树更新某个节点的子节点
  remove: (node: any) => void // 删除节点
  append: (data: any, parentNode?: any) => void // 插入一个新的节点
  insertBefore: (data: any, refNode: any) => void // 在指定节点前插入一个新的节点
  insertAfter: (data: any, refNode: any) => void // 在指定节点后插入一个新的节点
  input: (value: string) => void // 搜索输入
}
