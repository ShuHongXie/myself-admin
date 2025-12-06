import type { InputProps } from 'element-plus'
export type NumberRangeValue = [number | null, number | null]

export interface NumberRangeInputProps {
  label: string // 区间名称（如"价格""数量"）
  disabled?: boolean
  separator?: string // 分隔符，默认为"至"
  // 继承 el-input 的所有属性
  inputProps?: Partial<InputProps>
  // 最小值输入框的特定属性
  minInputProps?: Partial<InputProps>
  // 最大值输入框的特定属性
  maxInputProps?: Partial<InputProps>
}
