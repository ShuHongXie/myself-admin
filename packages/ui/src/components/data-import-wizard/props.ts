import type { PropType } from 'vue'

/**
 * 系统字段定义
 */
export interface SystemField {
  label: string // 字段显示名称
  value: string // 字段值（与后端对应）
}

/**
 * 校验规则定义
 */
export interface ValidateRule {
  required?: boolean // 是否必填
  message: string // 错误提示信息
  pattern?: RegExp // 正则校验
  type?: 'number' | 'date' | 'string' // 类型校验
}

/**
 * 表头匹配关系
 */
export interface HeaderMatch {
  excelHeader: string // Excel表头名称
  systemField: string // 系统字段value
}

/**
 * 编辑单元格状态
 */
export interface EditCell {
  key: string // 格式：row._uid-column.prop
  value: any // 编辑中的值
}

/**
 * 导入结果
 */
export interface ImportResult {
  successCount: number // 成功条数
  failCount: number // 失败条数
  errorMsg?: string // 错误信息（如接口异常）
}

/**
 * 数据导入向导组件 Props
 */
export const dataImportWizardProps = {
  /**
   * 系统目标字段列表
   * 示例：[{label: '订单号', value: 'orderNo'}, {label: '客户名称', value: 'customerName'}]
   */
  systemFields: {
    type: Array as PropType<SystemField[]>,
    default: () => [
      { label: '订单号', value: 'orderNo' },
      { label: '客户名称', value: 'customerName' },
      { label: '金额', value: 'amount' },
      { label: '创建时间', value: 'createTime' }
    ]
  },

  /**
   * 校验规则：key为systemField的value
   * 示例：{
   *   orderNo: [{required: true, message: '订单号必填'}, {pattern: /^OD\d+$/, message: '格式错误'}],
   *   amount: [{type: 'number', message: '金额需为数字'}]
   * }
   */
  validateRules: {
    type: Object as PropType<Record<string, ValidateRule[]>>,
    default: () => ({
      orderNo: [
        { required: true, message: '订单号必填' },
        { pattern: /^OD\d+$/, message: '订单号格式为OD开头+数字' }
      ],
      amount: [
        { required: true, message: '金额必填' },
        { type: 'number', message: '金额需为数字' }
      ],
      createTime: [{ type: 'date', message: '时间格式不正确（YYYY-MM-DD）' }]
    })
  },

  /**
   * 导入接口（外部传入）
   * 接收校验通过的数据数组，返回导入结果
   */
  importApi: {
    type: Function as PropType<(data: any[]) => Promise<ImportResult>>,
    required: true
  }
}

/**
 * 组件Props类型（从props定义中推导）
 */
export type DataImportWizardProps = {
  systemFields?: SystemField[]
  validateRules?: Record<string, ValidateRule[]>
  importApi: (data: any[]) => Promise<ImportResult>
}
