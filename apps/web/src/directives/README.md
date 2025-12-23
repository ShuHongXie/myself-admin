## 权限指令使用说明

本项目包含一个自定义的权限指令 `v-permission`，用于根据用户的权限控制元素的显示或禁用状态。

### 基本用法

```vue
<!-- 精确匹配单个权限 -->
<el-button v-permission="'user:create'" type="primary">创建用户</el-button>

<!-- 匹配多个权限中的任意一个 -->
<el-button v-permission="['user:create', 'user:update']" type="primary">编辑用户</el-button>

<!-- 必须拥有所有指定权限 -->
<el-button
  v-permission.all="['user:create', 'user:delete']"
  type="danger"
>完全用户管理权限</el-button>

<!-- 无权限时禁用元素而不是隐藏 -->
<el-button v-permission.disable="'user:create'" type="primary">创建用户(禁用模式)</el-button>

<!-- 无权限时禁用元素而不是隐藏，并要求所有权限 -->
<el-button
  v-permission.disable.all="['user:create', 'user:delete']"
  type="danger"
>完全权限(禁用模式)</el-button>
```

### 指令修饰符

- `.all` - 要求拥有所有指定的权限
- `.disable` - 无权限时禁用元素而不是隐藏

### 注意事项

1. 权限指令会自动从用户存储中获取当前用户的权限列表
2. 当元素被隐藏时，指令会保存原始的 `display` 样式值，以便在权限恢复时正确恢复
3. 当元素被禁用时，指令会添加 `is-disabled` 类并设置适当的样式
