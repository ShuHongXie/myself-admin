import type { TreeSelectProps } from '../tree-select/type'
import type { DrawerProps } from 'element-plus'

// Drawer 容器特有属性
export interface DrawerContainerProps extends Partial<DrawerProps> {
  title?: string // 抽屉标题
  size?: string | number // 抽屉尺寸
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt' // 抽屉方向
}

// 组合 Props：容器属性 + 树形选择属性
export interface TreeSelectDrawerProps<T = any> extends TreeSelectProps<T>, DrawerContainerProps {}

// Drawer 属性键列表（用于过滤）
export const drawerPropKeys: string[] = [
  'title',
  'size',
  'direction',
  'appendToBody',
  'appendTo',
  'modal',
  'modalClass',
  'lockScroll',
  'closeOnClickModal',
  'closeOnPressEscape',
  'showClose',
  'withHeader',
  'openDelay',
  'closeDelay',
  'destroyOnClose',
  'zIndex'
]
