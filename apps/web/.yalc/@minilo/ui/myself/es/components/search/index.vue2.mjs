import { defineComponent, mergeModels, ref, useModel, onMounted, onUnmounted, createElementBlock, openBlock, createVNode, unref, withCtx, createElementVNode, createBlock, createCommentVNode, Fragment, renderList, withDirectives, mergeProps, renderSlot, vShow, withModifiers, createTextVNode, toDisplayString } from 'vue';
import { SearchTypeEnum, searchProps } from './props.mjs';
import { Icon } from '@iconify/vue';
import { ElForm, ElRow, ElCol, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElButton, ElLink } from 'element-plus';

const _hoisted_1 = { class: "search" };
const _hoisted_2 = { class: "search-content" };
const _hoisted_3 = { class: "search-content__left" };
const _hoisted_4 = { class: "search-content__right" };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "MsSearch" },
  __name: "index",
  props: /* @__PURE__ */ mergeModels(searchProps, {
    "modelValue": { type: Object },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit", "reset"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const options = ref([]);
    const searchFormRef = ref();
    const searchModel = useModel(__props, "modelValue");
    const emit = __emit;
    const windowWidth = ref(window.innerWidth);
    const isCollapse = ref(false);
    const rowItemCount = ref(0);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      rowItemCount.value = windowWidth.value >= 1900 ? 4 : windowWidth.value >= 1200 ? 3 : 2;
    };
    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    const handleSubmit = () => {
      emit("submit");
    };
    const handleReset = () => {
      searchFormRef.value?.resetFields();
      emit("reset");
    };
    onMounted(() => {
      console.log(props);
      const itemProps = props.item.map((item) => ({
        type: SearchTypeEnum.ITEM,
        ...item
      }));
      const slotProps = props.slots.map((item) => ({
        type: SearchTypeEnum.SLOT,
        ...item
      }));
      slotProps.forEach((item) => {
        itemProps.splice(item.position || 0, 0, item);
      });
      options.value = itemProps;
      console.log("\u914D\u7F6E\u9879\u7684\u503C:", options.value);
    });
    __expose({});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(unref(ElForm), {
          size: _ctx.size,
          "label-position": _ctx.labelPosition,
          inline: _ctx.inline,
          model: searchModel.value,
          "label-width": _ctx.labelWidth,
          ref_key: "searchFormRef",
          ref: searchFormRef
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_2, [
              createElementVNode("div", _hoisted_3, [
                createVNode(unref(ElRow), { gutter: _ctx.gutter }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(options.value, (item, index) => {
                        return withDirectives((openBlock(), createBlock(unref(ElCol), mergeProps({
                          key: item.prop,
                          span: _ctx.span
                        }, { ref_for: true }, item.colProps), {
                          default: withCtx(() => [
                            createVNode(unref(ElFormItem), mergeProps({ ref_for: true }, item.formItemProps, {
                              prop: item.prop
                            }), {
                              default: withCtx(() => [
                                item.type === unref(SearchTypeEnum).SLOT ? renderSlot(_ctx.$slots, item.prop, {
                                  key: 0,
                                  searchModel: searchModel.value
                                }) : (openBlock(), createElementBlock(
                                  Fragment,
                                  { key: 1 },
                                  [
                                    createCommentVNode(" \u8F93\u5165\u6846 "),
                                    item.input.type === "input" ? (openBlock(), createBlock(unref(ElInput), mergeProps({
                                      key: 0,
                                      modelValue: searchModel.value[item.prop],
                                      "onUpdate:modelValue": ($event) => searchModel.value[item.prop] = $event
                                    }, { ref_for: true }, item.input.props, { clearable: "" }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("v-if", true),
                                    createCommentVNode(" \u7B5B\u9009\u6846 "),
                                    item.input.type === "select" ? (openBlock(), createBlock(unref(ElSelect), mergeProps({
                                      key: 1,
                                      modelValue: searchModel.value[item.prop],
                                      "onUpdate:modelValue": ($event) => searchModel.value[item.prop] = $event
                                    }, { ref_for: true }, item.input.props, {
                                      style: { "width": "100%" },
                                      clearable: ""
                                    }), {
                                      default: withCtx(() => [
                                        (openBlock(true), createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(item.input.props.options, (subItem) => {
                                            return openBlock(), createBlock(unref(ElOption), {
                                              key: subItem.value,
                                              label: subItem[item.input.props.labelKey],
                                              value: subItem[item.input.props.valueKey],
                                              disabled: subItem.disabled
                                            }, null, 8, ["label", "value", "disabled"]);
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    }, 1040, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("v-if", true),
                                    createCommentVNode(" \u65F6\u95F4\u9009\u62E9\u6846 "),
                                    item.input.type === "date-picker" ? (openBlock(), createBlock(unref(ElDatePicker), mergeProps({
                                      key: 2,
                                      modelValue: searchModel.value[item.prop],
                                      "onUpdate:modelValue": ($event) => searchModel.value[item.prop] = $event
                                    }, { ref_for: true }, item.input.props, { "value-format": "x" }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("v-if", true)
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                ))
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1040, ["prop"])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1040, ["span"])), [
                          [vShow, !isCollapse.value ? index <= rowItemCount.value : true]
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 3
                  /* FORWARDED */
                }, 8, ["gutter"])
              ]),
              createElementVNode("div", _hoisted_4, [
                createVNode(unref(ElFormItem), { label: "\u64CD\u4F5C" }, {
                  default: withCtx(() => [
                    createVNode(unref(ElButton), {
                      type: "primary",
                      size: _ctx.size,
                      loading: false,
                      onClick: withModifiers(handleSubmit, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(_ctx.submitBtnText),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["size"]),
                    createVNode(unref(ElButton), {
                      loading: false,
                      onClick: withModifiers(handleReset, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(_ctx.resetBtnText),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ]),
            options.value.length > rowItemCount.value ? (openBlock(), createBlock(unref(ElRow), {
              key: 0,
              class: "search-collapse"
            }, {
              default: withCtx(() => [
                createVNode(unref(ElLink), {
                  type: "primary",
                  underline: "never",
                  onClick: _cache[0] || (_cache[0] = ($event) => isCollapse.value = !isCollapse.value)
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(isCollapse.value ? "\u6536\u8D77" : "\u5C55\u5F00") + "\u66F4\u591A\u7B5B\u9009\u6761\u4EF6 ",
                      1
                      /* TEXT */
                    ),
                    createVNode(unref(Icon), {
                      icon: isCollapse.value ? "ep:arrow-up" : "ep:arrow-down"
                    }, null, 8, ["icon"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            })) : createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["size", "label-position", "inline", "model", "label-width"])
      ]);
    };
  }
});

export { _sfc_main as default };
