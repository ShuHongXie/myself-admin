interface SearchItem {
  label: string
  prop: string
  span?: number
  type?: string
  placeholder?: string
  multiple?: boolean
  options?: any[]
  labelWidth?: string
  input?: any
  colProps?: any
  formItemProps?: any
}
import { ComponentInternalInstance, defineComponent } from 'vue'

export interface SearchModel {
  [key: string]: any // 添加索引签名，允许任何字符串作为键
  // 其他具体属性...
}

import Test from '../../core/Manage/Test.vue'

export const searchProps = {
  inline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  // 'left' | 'right' | 'top'
  labelPosition: {
    type: String,
    default: 'right'
  },
  // '' | 'large' | 'default' | 'small'
  size: {
    type: String,
    default: ''
  },
  gutter: {
    type: [String, Number],
    default: 10
  },
  span: {
    type: Number,
    default: 6
  },
  customSlots: {
    type: Array,
    default: () => [
      {
        name: 'custom1', // 对应插槽名称 #custom1
        span: 4, // 宽度占 4/24（比默认的 6 更窄）
        colProps: { offset: 1 }, // 额外的 el-col 属性（如偏移量）
        formItemProps: { label: '操作' } // el-form-item 的属性
      },
      {
        name: 'custom2', // 对应插槽名称 #custom2
        span: 8, // 宽度占 8/24（更宽）
        formItemProps: { label: '自定义项' }
      }
    ]
  },
  options: {
    type: Array<SearchItem>,
    default: [
      {
        prop: 'date'

        // input: {
        //   type: 'custom',
        //   component: Test,
        //   props: {
        //     msg: '谢小谢',
        //     onClick: (instance: ComponentInternalInstance) => {}
        //   },
        //   slots: {
        //     aa: (props: any, instance: ComponentInternalInstance) => {
        //       console.log(props, instance)

        //       return <div onClick={() => props.onClick(instance)}>{props.msg}</div>
        //     }
        //   }
        // }
      },
      {
        prop: 'nickname',
        colProps: {},
        formItemProps: {
          label: '用户姓名',
          labelWidth: ''
        },
        input: {
          type: 'input',
          props: {
            placeholder: '请输入用户姓名'
          }
        }
      },
      {
        prop: 'nickname',
        colProps: {},
        formItemProps: {
          label: '用户姓名',
          labelWidth: ''
        },
        input: {
          type: 'input',
          props: {
            placeholder: '请输入用户姓名'
          }
        }
      },
      {
        prop: 'haveDiscount',
        colProps: {},
        formItemProps: {
          label: '是否涉及让利',
          labelWidth: ''
        },
        input: {
          type: 'select',
          props: {
            placeholder: '请选择是否涉及让利',
            labelWidth: '140px',
            options: [
              {
                label: '是',
                value: true
              },
              {
                label: '否',
                value: false
              }
            ]
          }
        }
      },
      {
        prop: 'time',
        label: '审核完成时间',
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        format: 'yyyy-MM-dd',
        valueFormat: 'timestamp',
        formItemProps: {
          label: '是否涉及让利',
          labelWidth: ''
        },
        input: {
          type: 'select',
          props: {
            placeholder: '请选择是否涉及让利',
            labelWidth: '140px',
            options: [
              {
                label: '是',
                value: true
              },
              {
                label: '否',
                value: false
              }
            ]
          }
        }
      }
      // {
      //   prop: 'lawName',
      //   label: '外委律所名称',
      //   labelWidth: '',
      //   placeholder: '请输入外委律所名称'
      // },
      // {
      //   prop: 'haveDiscount',
      //   label: '是否涉及让利',
      //   type: 'select',
      //   labelWidth: '',
      //   placeholder: '请选择是否涉及让利',
      //   options: [
      //     {
      //       label: '是',
      //       value: true
      //     },
      //     {
      //       label: '否',
      //       value: false
      //     }
      //   ]
      // },
      // {
      //   prop: 'ownerName',
      //   label: '客户姓名',
      //   labelWidth: '',
      //   placeholder: '请输入客户姓名'
      // },
      // {
      //   prop: 'ownerMobile',
      //   label: '客户手机号',
      //   labelWidth: '',
      //   placeholder: '请输入客户手机号'
      // },
      // {
      //   prop: ['auditCompletedBeginTime', 'auditCompletedEndTime'],
      //   label: '审核完成时间',
      //   type: 'daterange',
      //   startPlaceholder: '开始时间',
      //   endPlaceholder: '结束时间',
      //   uiFormat: 'yyyy-MM-dd',
      //   valueFormat: 'timestamp'
      // },
      // {
      //   prop: ['createBeginTime', 'createEndTime'],
      //   label: '创建时间',
      //   type: 'daterange',
      //   startPlaceholder: '开始时间',
      //   endPlaceholder: '结束时间',
      //   uiFormat: 'yyyy-MM-dd',
      //   valueFormat: 'timestamp'
      // }
    ]
  }
}
