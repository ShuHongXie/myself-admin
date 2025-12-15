import type { TreeSelectProps } from '../tree-select/type'
import type { DialogProps } from 'element-plus'

// Dialog 容器特有属性
export interface DialogContainerProps extends Partial<DialogProps> {
  title?: string // 弹窗标题
  width?: string // 弹窗宽度
}

// 组合 Props：容器属性 + 树形选择属性
export interface TreeSelectDialogProps<T = any> extends TreeSelectProps<T>, DialogContainerProps {}

// Dialog 属性键列表（用于过滤）
export const dialogPropKeys: string[] = [
  'title',
  'width',
  'fullscreen',
  'top',
  'modal',
  'modalClass',
  'appendToBody',
  'appendTo',
  'lockScroll',
  'closeOnClickModal',
  'closeOnPressEscape',
  'showClose',
  'draggable',
  'overflow',
  'center',
  'alignCenter',
  'destroyOnClose',
  'closeIcon',
  'zIndex',
  'headerAriaLevel'
]
