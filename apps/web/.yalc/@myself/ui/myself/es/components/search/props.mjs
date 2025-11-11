var SearchTypeEnum = /* @__PURE__ */ ((SearchTypeEnum2) => {
  SearchTypeEnum2[SearchTypeEnum2["ITEM"] = 1] = "ITEM";
  SearchTypeEnum2[SearchTypeEnum2["SLOT"] = 2] = "SLOT";
  return SearchTypeEnum2;
})(SearchTypeEnum || {});
const searchProps = {
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
    default: ""
  },
  // 'left' | 'right' | 'top'
  labelPosition: {
    type: String,
    default: "top"
  },
  // '' | 'large' | 'default' | 'small'
  size: {
    type: String,
    default: "default"
  },
  gutter: {
    type: [String, Number],
    default: 10
  },
  span: {
    type: Number,
    default: 6
  },
  submitBtnText: {
    type: String,
    default: "\u67E5\u8BE2"
  },
  resetBtnText: {
    type: String,
    default: "\u91CD\u7F6E"
  },
  slots: {
    type: Array,
    default: () => []
  },
  item: {
    type: Array,
    default: () => []
  }
};

export { SearchTypeEnum, searchProps };
