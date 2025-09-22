# 按钮权限功能使用说明

## 功能概述

本项目新增了获取用户按钮权限的功能，支持根据用户角色动态控制按钮的显示和操作权限。

## 后端接口

### 获取用户按钮权限

- **路径**: `GET /menu/buttonPermissions`
- **说明**: 获取当前登录用户的所有按钮权限列表
- **认证**: 需要JWT token
- **返回格式**:

```json
{
  "code": 200,
  "msg": "success",
  "data": ["user:create", "user:delete", "user:update", "role:create", "menu:create"]
}
```

### 实现逻辑

1. 通过JWT token获取用户ID
2. 查询用户关联的所有角色
3. 获取角色关联的所有菜单中类型为"按钮"(MenuType.Button = 3)的权限
4. 超级管理员自动获取所有按钮权限
5. 去重并返回权限标识列表

## 前端使用

### 1. API调用

```typescript
import { getUserButtonPermissions } from '#/apis'

// 获取按钮权限
const res = await getUserButtonPermissions()
if (res.data.code === 200) {
  console.log('用户按钮权限:', res.data.data)
}
```

### 2. 状态管理

```typescript
import { useUserStore } from '@myself/store'

const userStore = useUserStore()

// 设置按钮权限
userStore.setButtonPermissions(['user:create', 'user:delete'])

// 检查权限
const hasPermission = userStore.hasButtonPermission('user:create')

// 获取所有权限
const permissions = userStore.buttonPermissions
```

### 3. 组合式API

```typescript
import { useButtonPermission } from '@myself/utils'

const { hasPermission, hasAnyPermission, hasAllPermissions } = useButtonPermission()

// 检查单个权限
const canCreate = hasPermission('user:create', userPermissions)

// 检查任一权限
const canEdit = hasAnyPermission(['user:update', 'user:edit'], userPermissions)

// 检查全部权限
const canManage = hasAllPermissions(['user:create', 'user:delete'], userPermissions)
```

### 4. 在组件中使用

```vue
<template>
  <div>
    <!-- 根据权限显示按钮 -->
    <el-button
      v-if="userStore.hasButtonPermission('user:create')"
      type="primary"
      @click="createUser"
    >
      创建用户
    </el-button>

    <el-button
      v-if="userStore.hasButtonPermission('user:delete')"
      type="danger"
      @click="deleteUser"
    >
      删除用户
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@myself/store'

const userStore = useUserStore()

const createUser = () => {
  if (!userStore.hasButtonPermission('user:create')) {
    return // 双重验证
  }
  // 执行创建用户逻辑
}
</script>
```

## 权限标识规范

建议使用以下格式定义权限标识：

- `资源:操作` 格式，如：
  - `user:create` - 用户创建
  - `user:update` - 用户更新
  - `user:delete` - 用户删除
  - `role:create` - 角色创建
  - `menu:create` - 菜单创建

## 数据库设计

按钮权限信息存储在菜单表中：

```sql
-- 菜单表中的按钮权限示例
INSERT INTO menu (name, menuType, permission, parentId) VALUES
('创建用户', 3, 'user:create', 1),
('删除用户', 3, 'user:delete', 1),
('编辑用户', 3, 'user:update', 1);
```

其中 `menuType = 3` 表示按钮类型，`permission` 字段存储权限标识。

## 注意事项

1. **安全性**: 前端权限控制仅用于UI展示，真正的权限验证必须在后端进行
2. **性能**: 权限数据会缓存在前端状态中，登录时获取一次即可
3. **实时性**: 如需实时更新权限，可调用刷新接口重新获取
4. **兼容性**: 超级管理员自动拥有所有按钮权限
5. **扩展性**: 新增按钮权限只需在数据库中添加对应的菜单记录

## 测试建议

1. 创建不同角色的测试用户
2. 为角色分配不同的菜单权限
3. 登录后验证按钮权限是否正确获取
4. 测试超级管理员权限
5. 验证权限刷新功能
