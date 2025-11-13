'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var vue = require('vue')
var props = require('./props.js')
var vue$1 = require('@iconify/vue')
var elementPlus = require('element-plus')

const _hoisted_1 = { class: 'search' }
const _hoisted_2 = { class: 'search-content' }
const _hoisted_3 = { class: 'search-content__left' }
const _hoisted_4 = { class: 'search-content__right' }
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: 'MsSearch' },
  __name: 'index',
  props: /* @__PURE__ */ vue.mergeModels(props.searchProps, {
    modelValue: { type: Object },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ vue.mergeModels(['submit', 'reset'], ['update:modelValue']),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props$1 = __props
    const options = vue.ref([])
    const searchFormRef = vue.ref()
    const searchModel = vue.useModel(__props, 'modelValue')
    const emit = __emit
    const windowWidth = vue.ref(window.innerWidth)
    const isCollapse = vue.ref(false)
    const rowItemCount = vue.ref(0)
    const handleResize = () => {
      windowWidth.value = window.innerWidth
      rowItemCount.value = windowWidth.value >= 1900 ? 4 : windowWidth.value >= 1200 ? 3 : 2
    }
    vue.onMounted(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
    })
    vue.onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
    const handleSubmit = () => {
      emit('submit')
    }
    const handleReset = () => {
      searchFormRef.value?.resetFields()
      emit('reset')
    }
    vue.onMounted(() => {
      console.log(props$1)
      const itemProps = props$1.item.map((item) => ({
        type: props.SearchTypeEnum.ITEM,
        ...item
      }))
      const slotProps = props$1.slots.map((item) => ({
        type: props.SearchTypeEnum.SLOT,
        ...item
      }))
      slotProps.forEach((item) => {
        itemProps.splice(item.position || 0, 0, item)
      })
      options.value = itemProps
      console.log('\u914D\u7F6E\u9879\u7684\u503C:', options.value)
    })
    __expose({})
    return (_ctx, _cache) => {
      return (
        vue.openBlock(),
        vue.createElementBlock('div', _hoisted_1, [
          vue.createVNode(
            vue.unref(elementPlus.ElForm),
            {
              size: _ctx.size,
              'label-position': _ctx.labelPosition,
              inline: _ctx.inline,
              model: searchModel.value,
              'label-width': _ctx.labelWidth,
              ref_key: 'searchFormRef',
              ref: searchFormRef
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode('div', _hoisted_2, [
                  vue.createElementVNode('div', _hoisted_3, [
                    vue.createVNode(
                      vue.unref(elementPlus.ElRow),
                      { gutter: _ctx.gutter },
                      {
                        default: vue.withCtx(() => [
                          (vue.openBlock(true),
                          vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(options.value, (item, index) => {
                              return vue.withDirectives(
                                (vue.openBlock(),
                                vue.createBlock(
                                  vue.unref(elementPlus.ElCol),
                                  vue.mergeProps(
                                    {
                                      key: item.prop,
                                      span: _ctx.span
                                    },
                                    { ref_for: true },
                                    item.colProps
                                  ),
                                  {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(
                                        vue.unref(elementPlus.ElFormItem),
                                        vue.mergeProps({ ref_for: true }, item.formItemProps, {
                                          prop: item.prop
                                        }),
                                        {
                                          default: vue.withCtx(() => [
                                            item.type === vue.unref(props.SearchTypeEnum).SLOT
                                              ? vue.renderSlot(_ctx.$slots, item.prop, {
                                                  key: 0,
                                                  searchModel: searchModel.value
                                                })
                                              : (vue.openBlock(),
                                                vue.createElementBlock(
                                                  vue.Fragment,
                                                  { key: 1 },
                                                  [
                                                    vue.createCommentVNode(' \u8F93\u5165\u6846 '),
                                                    item.input.type === 'input'
                                                      ? (vue.openBlock(),
                                                        vue.createBlock(
                                                          vue.unref(elementPlus.ElInput),
                                                          vue.mergeProps(
                                                            {
                                                              key: 0,
                                                              modelValue:
                                                                searchModel.value[item.prop],
                                                              'onUpdate:modelValue': ($event) =>
                                                                (searchModel.value[item.prop] =
                                                                  $event)
                                                            },
                                                            { ref_for: true },
                                                            item.input.props,
                                                            { clearable: '' }
                                                          ),
                                                          null,
                                                          16,
                                                          ['modelValue', 'onUpdate:modelValue']
                                                        ))
                                                      : vue.createCommentVNode('v-if', true),
                                                    vue.createCommentVNode(' \u7B5B\u9009\u6846 '),
                                                    item.input.type === 'select'
                                                      ? (vue.openBlock(),
                                                        vue.createBlock(
                                                          vue.unref(elementPlus.ElSelect),
                                                          vue.mergeProps(
                                                            {
                                                              key: 1,
                                                              modelValue:
                                                                searchModel.value[item.prop],
                                                              'onUpdate:modelValue': ($event) =>
                                                                (searchModel.value[item.prop] =
                                                                  $event)
                                                            },
                                                            { ref_for: true },
                                                            item.input.props,
                                                            {
                                                              style: { width: '100%' },
                                                              clearable: ''
                                                            }
                                                          ),
                                                          {
                                                            default: vue.withCtx(() => [
                                                              (vue.openBlock(true),
                                                              vue.createElementBlock(
                                                                vue.Fragment,
                                                                null,
                                                                vue.renderList(
                                                                  item.input.props.options,
                                                                  (subItem) => {
                                                                    return (
                                                                      vue.openBlock(),
                                                                      vue.createBlock(
                                                                        vue.unref(
                                                                          elementPlus.ElOption
                                                                        ),
                                                                        {
                                                                          key: subItem.value,
                                                                          label:
                                                                            subItem[
                                                                              item.input.props
                                                                                .labelKey
                                                                            ],
                                                                          value:
                                                                            subItem[
                                                                              item.input.props
                                                                                .valueKey
                                                                            ],
                                                                          disabled: subItem.disabled
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                          'label',
                                                                          'value',
                                                                          'disabled'
                                                                        ]
                                                                      )
                                                                    )
                                                                  }
                                                                ),
                                                                128
                                                                /* KEYED_FRAGMENT */
                                                              ))
                                                            ]),
                                                            _: 2
                                                            /* DYNAMIC */
                                                          },
                                                          1040,
                                                          ['modelValue', 'onUpdate:modelValue']
                                                        ))
                                                      : vue.createCommentVNode('v-if', true),
                                                    vue.createCommentVNode(
                                                      ' \u65F6\u95F4\u9009\u62E9\u6846 '
                                                    ),
                                                    item.input.type === 'date-picker'
                                                      ? (vue.openBlock(),
                                                        vue.createBlock(
                                                          vue.unref(elementPlus.ElDatePicker),
                                                          vue.mergeProps(
                                                            {
                                                              key: 2,
                                                              modelValue:
                                                                searchModel.value[item.prop],
                                                              'onUpdate:modelValue': ($event) =>
                                                                (searchModel.value[item.prop] =
                                                                  $event)
                                                            },
                                                            { ref_for: true },
                                                            item.input.props,
                                                            { 'value-format': 'x' }
                                                          ),
                                                          null,
                                                          16,
                                                          ['modelValue', 'onUpdate:modelValue']
                                                        ))
                                                      : vue.createCommentVNode('v-if', true)
                                                  ],
                                                  64
                                                  /* STABLE_FRAGMENT */
                                                ))
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        },
                                        1040,
                                        ['prop']
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1040,
                                  ['span']
                                )),
                                [
                                  [
                                    vue.vShow,
                                    !isCollapse.value ? index <= rowItemCount.value : true
                                  ]
                                ]
                              )
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _: 3
                        /* FORWARDED */
                      },
                      8,
                      ['gutter']
                    )
                  ]),
                  vue.createElementVNode('div', _hoisted_4, [
                    vue.createVNode(
                      vue.unref(elementPlus.ElFormItem),
                      { label: '\u64CD\u4F5C' },
                      {
                        default: vue.withCtx(() => [
                          vue.createVNode(
                            vue.unref(elementPlus.ElButton),
                            {
                              type: 'primary',
                              size: _ctx.size,
                              loading: false,
                              onClick: vue.withModifiers(handleSubmit, ['stop'])
                            },
                            {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(
                                  vue.toDisplayString(_ctx.submitBtnText),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            },
                            8,
                            ['size']
                          ),
                          vue.createVNode(
                            vue.unref(elementPlus.ElButton),
                            {
                              loading: false,
                              onClick: vue.withModifiers(handleReset, ['stop'])
                            },
                            {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(
                                  vue.toDisplayString(_ctx.resetBtnText),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            }
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }
                    )
                  ])
                ]),
                options.value.length > rowItemCount.value
                  ? (vue.openBlock(),
                    vue.createBlock(
                      vue.unref(elementPlus.ElRow),
                      {
                        key: 0,
                        class: 'search-collapse'
                      },
                      {
                        default: vue.withCtx(() => [
                          vue.createVNode(
                            vue.unref(elementPlus.ElLink),
                            {
                              type: 'primary',
                              underline: 'never',
                              onClick:
                                _cache[0] ||
                                (_cache[0] = ($event) => (isCollapse.value = !isCollapse.value))
                            },
                            {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(
                                  vue.toDisplayString(
                                    isCollapse.value ? '\u6536\u8D77' : '\u5C55\u5F00'
                                  ) + '\u66F4\u591A\u7B5B\u9009\u6761\u4EF6 ',
                                  1
                                  /* TEXT */
                                ),
                                vue.createVNode(
                                  vue.unref(vue$1.Icon),
                                  {
                                    icon: isCollapse.value ? 'ep:arrow-up' : 'ep:arrow-down'
                                  },
                                  null,
                                  8,
                                  ['icon']
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            }
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }
                    ))
                  : vue.createCommentVNode('v-if', true)
              ]),
              _: 3
              /* FORWARDED */
            },
            8,
            ['size', 'label-position', 'inline', 'model', 'label-width']
          )
        ])
      )
    }
  }
})

exports.default = _sfc_main
