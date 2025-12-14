export interface TreeSelectDialogProps<T = any> {
  title?: string // 弹窗标题
  width?: string // 弹窗宽度
  treeData: T[] // 树形数据
  treeProps?: Record<string, any> // 树形配置（同 Element Plus Tree）
  multiple?: boolean // 是否多选
  defaultExpandAll?: boolean // 是否默认展开所有节点
  defaultSelectedKeys?: any[] // 默认选中的节点key
}
