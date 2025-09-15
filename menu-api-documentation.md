# 菜单管理 API 文档

## 概述

本文档描述了菜单管理模块的所有增删改查接口。菜单管理模块支持层级菜单结构，包含菜单基础信息和元数据（meta）信息。

## 接口列表

### 1. 创建菜单

- **URL**: `POST /create`
- **描述**: 创建新的菜单项，支持目录、菜单、按钮三种类型
- **认证**: 无需认证（@Public）
- **请求体**:

```json
{
  "name": "菜单名称",
  "parentId": null,
  "menuType": 1,
  "component": "Layout",
  "permission": "system:menu:add",
  "path": "/system/menu",
  "status": 1,
  "createBy": 1,
  "meta": {
    "title": "菜单管理",
    "orderNum": 10,
    "icon": "menu",
    "showInBreadcrumb": true,
    "showInTab": true,
    "showInMenu": true,
    "isCache": false
  },
  "children": []
}
```

- **响应**:

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "菜单名称",
    "parentId": null,
    "menuType": 1,
    "component": "Layout",
    "permission": "system:menu:add",
    "path": "/system/menu",
    "status": 1,
    "createBy": 1,
    "createTime": "2025-09-15T13:20:00.000Z",
    "updateTime": "2025-09-15T13:20:00.000Z",
    "meta": {
      "id": 1,
      "title": "菜单管理",
      "orderNum": 10,
      "icon": "menu",
      "showInBreadcrumb": true,
      "showInTab": true,
      "showInMenu": true,
      "isCache": false
    }
  }
}
```

### 2. 获取菜单详情

- **URL**: `GET /:id`
- **描述**: 根据菜单ID获取单个菜单的详细信息
- **认证**: 无需认证（@Public）
- **路径参数**:
  - `id`: 菜单ID（数字）
- **响应**:

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "菜单名称",
    "parentId": null,
    "menuType": 1,
    "component": "Layout",
    "permission": "system:menu:add",
    "path": "/system/menu",
    "status": 1,
    "children": [...],
    "meta": {
      "id": 1,
      "title": "菜单管理",
      "orderNum": 10,
      "icon": "menu",
      "showInBreadcrumb": true,
      "showInTab": true,
      "showInMenu": true,
      "isCache": false
    }
  }
}
```

### 3. 更新菜单

- **URL**: `PUT /:id`
- **描述**: 更新指定ID的菜单信息
- **认证**: 无需认证（@Public）
- **路径参数**:
  - `id`: 菜单ID（数字）
- **请求体**: 支持部分更新，只传需要更新的字段

```json
{
  "name": "更新后的菜单名称",
  "meta": {
    "title": "更新后的标题",
    "orderNum": 20
  }
}
```

- **响应**:

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "更新后的菜单名称",
    "parentId": null,
    "menuType": 1,
    "component": "Layout",
    "permission": "system:menu:add",
    "path": "/system/menu",
    "status": 1,
    "meta": {
      "id": 1,
      "title": "更新后的标题",
      "orderNum": 20,
      "icon": "menu",
      "showInBreadcrumb": true,
      "showInTab": true,
      "showInMenu": true,
      "isCache": false
    }
  }
}
```

### 4. 删除菜单

- **URL**: `DELETE /:id`
- **描述**: 删除指定ID的菜单。如果菜单有子菜单，需要先删除子菜单
- **认证**: 无需认证（@Public）
- **路径参数**:
  - `id`: 菜单ID（数字）
- **响应**:

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

- **错误响应**（有子菜单时）:

```json
{
  "code": 20000,
  "msg": "该菜单下存在子菜单，请先删除子菜单"
}
```

### 5. 级联删除菜单

- **URL**: `DELETE /:id/cascade`
- **描述**: 删除指定ID的菜单及其所有子菜单
- **认证**: 无需认证（@Public）
- **路径参数**:
  - `id`: 菜单ID（数字）
- **响应**:

```json
{
  "code": 200,
  "msg": "级联删除成功"
}
```

### 6. 分页查询菜单列表

- **URL**: `GET /list`
- **描述**: 分页查询菜单列表，支持多种筛选条件
- **认证**: 无需认证（@Public）
- **查询参数**:
  - `page`: 页码（可选，默认1）
  - `pageSize`: 每页数量（可选，默认10）
  - `name`: 菜单名称模糊查询（可选）
  - `menuType`: 菜单类型（可选，1=目录，2=菜单，3=按钮）
  - `status`: 状态（可选，1=启用，0=禁用）
  - `parentId`: 父菜单ID（可选）
- **示例**: `GET /list?page=1&pageSize=10&menuType=1&status=1`
- **响应**:

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "菜单名称",
        "parentId": null,
        "menuType": 1,
        "component": "Layout",
        "permission": "system:menu:add",
        "path": "/system/menu",
        "status": 1,
        "parent": null,
        "meta": {
          "id": 1,
          "title": "菜单管理",
          "orderNum": 10,
          "icon": "menu",
          "showInBreadcrumb": true,
          "showInTab": true,
          "showInMenu": true,
          "isCache": false
        }
      }
    ],
    "total": 10,
    "page": 1,
    "pageSize": 10
  }
}
```

### 7. 获取菜单树（不含按钮）

- **URL**: `GET /getRouters`
- **描述**: 获取树形结构的菜单数据，不包含按钮类型的菜单，用于前端路由生成
- **认证**: 无需认证（@Public）
- **响应**:

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "系统管理",
      "parentId": null,
      "menuType": 1,
      "component": "Layout",
      "path": "/system",
      "status": 1,
      "meta": {
        "title": "系统管理",
        "orderNum": 1,
        "icon": "setting",
        "showInBreadcrumb": true,
        "showInTab": true,
        "showInMenu": true,
        "isCache": false
      },
      "children": [
        {
          "id": 2,
          "name": "菜单管理",
          "parentId": 1,
          "menuType": 2,
          "component": "system/menu/index",
          "path": "/system/menu",
          "status": 1,
          "meta": {
            "title": "菜单管理",
            "orderNum": 1,
            "icon": "menu",
            "showInBreadcrumb": true,
            "showInTab": true,
            "showInMenu": true,
            "isCache": false
          },
          "children": []
        }
      ]
    }
  ]
}
```

### 8. 获取所有菜单树

- **URL**: `GET /menu/info`
- **描述**: 获取完整的菜单树结构，包含所有类型的菜单
- **认证**: 无需认证（@Public）
- **响应**: 同上，但包含按钮类型的菜单

## 数据模型

### Menu 实体

| 字段名     | 类型   | 说明                               | 必填     |
| ---------- | ------ | ---------------------------------- | -------- |
| id         | number | 菜单ID（自增主键）                 | 自动生成 |
| name       | string | 菜单名称                           | ✓        |
| parentId   | number | 父菜单ID                           | -        |
| menuType   | number | 菜单类型（1=目录，2=菜单，3=按钮） | ✓        |
| component  | string | 组件路径                           | -        |
| permission | string | 权限标识                           | -        |
| path       | string | 路由路径                           | -        |
| status     | number | 状态（1=启用，0=禁用）             | -        |
| createBy   | number | 创建人ID                           | ✓        |
| createTime | Date   | 创建时间                           | 自动生成 |
| updateTime | Date   | 更新时间                           | 自动生成 |

### MenuMeta 实体

| 字段名           | 类型    | 说明                 | 必填     |
| ---------------- | ------- | -------------------- | -------- |
| id               | number  | 元数据ID（自增主键） | 自动生成 |
| title            | string  | 显示标题             | ✓        |
| orderNum         | number  | 排序号               | ✓        |
| icon             | string  | 图标                 | -        |
| showInBreadcrumb | boolean | 是否显示在面包屑     | -        |
| showInTab        | boolean | 是否显示在标签页     | -        |
| showInMenu       | boolean | 是否显示在菜单       | -        |
| isCache          | boolean | 是否缓存组件         | -        |

## 业务规则

1. **菜单类型**:
   - 1: 目录（通常有子菜单，不直接对应页面）
   - 2: 菜单（对应具体页面）
   - 3: 按钮（页面内的操作按钮）

2. **元数据**: 按钮类型的菜单不需要meta信息，系统会自动跳过

3. **层级关系**: 通过parentId构建父子关系，支持无限层级

4. **删除规则**:
   - 普通删除要求先删除子菜单
   - 级联删除会自动删除所有子菜单

5. **排序**: 菜单按parentId和meta.orderNum进行排序

## 错误码

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 200    | 成功                       |
| 20000  | 通用错误（如业务逻辑错误） |
| 500    | 服务器内部错误             |

## 注意事项

1. 所有接口当前都设置为公开接口（@Public），生产环境建议根据需要添加权限验证
2. 创建菜单时，子菜单的parentId会自动设置，无需手动指定
3. 更新菜单时不支持批量更新子菜单，子菜单需要单独更新
4. 分页查询支持多条件组合筛选
5. 菜单树接口会自动按层级结构返回数据
