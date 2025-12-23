## 基于element-plus中Form组件的二次封装插件

### 传参差异相关

1. inline： 是否行内表单
2. disabled： 是否禁用
3. labelWidth： 表单域标签的宽度，例如 '50px'。支持 `auto`。
4. labelPosition： 表单域标签的位置，可选值为 `top`、`left`、`right`。
5. size： 用于控制该表单内组件的尺寸。可选值为 `medium`、`small`、`mini`。
6. gutter: 表单项之间的间隔，单位为像素。 例如：50
7. span: 所占比例，例如：默认为6
8. slots：插槽

```js
const slots = [
  {
    prop: 'custom1', // 插槽名称，也是校验的prop，通用
    position: 0, // 所要插入的位置
    colProps: {}, // colProps: el-col组件的所有配置项
    formItemProps: {} // formItemProps: el-form-item组件的所有配置项
  }
]
```

9. item：普通表单配置项

```js
const slots = [{
  prop: 'custom1',  // 验的prop，通用
  colProps: {}, // colProps: el-col组件的所有配置项
  formItemProps: {} // formItemProps: el-form-item组件的所有配置项
  input: {
    type: 'input', // element-plus的组件类型(小写)
    labelKey: 'label', // select类型时的自定义label的key，默认为 'label'
    valueKey: 'value', // select类型时的自定义value的key，默认为 'value'
    props: {}, // 对应组件的取值属性
  }
}]
```
