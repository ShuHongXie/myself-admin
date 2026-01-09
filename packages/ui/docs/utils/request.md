# Request 请求工具

基于 Axios 封装的 HTTP 请求工具，提供了请求拦截、响应拦截、错误处理、重复请求处理等功能。

## 功能特性

- ✅ **自动错误处理** - 统一的错误提示和状态码处理
- ✅ **重复请求控制** - 自动取消重复的请求
- ✅ **请求拦截器** - 支持自定义请求拦截逻辑
- ✅ **响应拦截器** - 支持自定义响应拦截逻辑
- ✅ **TypeScript 支持** - 完整的类型定义
- ✅ **网络状态检测** - 自动检测网络连接状态

## 基础用法

### 创建请求实例

```typescript
import { initRequestInstance } from '@minilo/utils'

// 创建基础请求实例
const request = initRequestInstance()

// 发送 GET 请求
const response = await request.get('/api/users')

// 发送 POST 请求
const response = await request.post('/api/users', {
  name: 'John',
  age: 30
})
```

### 自定义配置

```typescript
import { initRequestInstance } from '@minilo/utils'

const request = initRequestInstance({
  baseURL: 'https://api.example.com',
  timeout: 15000,
  headers: {
    Authorization: 'Bearer token',
    'Content-Type': 'application/json'
  }
})
```

### 请求拦截器

```typescript
import { initRequestInstance } from '@minilo/utils'

const request = initRequestInstance(
  {
    baseURL: '/api'
  },
  {
    // 请求拦截器
    interceptorsRequestFn: (config) => {
      // 在发送请求之前做些什么
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求配置:', config)
    }
  }
)
```

### 响应拦截器

```typescript
import { initRequestInstance } from '@minilo/utils'

const request = initRequestInstance(
  {
    baseURL: '/api'
  },
  {
    // 响应拦截器
    interceptorsResponseFn: (response) => {
      // 对响应数据做点什么
      console.log('响应数据:', response)
    }
  }
)
```

## API 方法

### initRequestInstance

创建一个新的 Axios 实例，支持自定义配置、拦截器以及业务响应逻辑适配。

**类型定义：**

```typescript
function initRequestInstance(
  extendConfig?: CreateAxiosDefaults,
  options?: RequestInstanceOptions
): AxiosInstance
```

**参数：**

| 参数         | 说明           | 类型                     | 默认值 |
| ------------ | -------------- | ------------------------ | ------ |
| extendConfig | Axios 配置对象 | `CreateAxiosDefaults`    | `{}`   |
| options      | 初始化配置选项 | `RequestInstanceOptions` | `{}`   |

**返回值：** `AxiosInstance`

**示例：**

```typescript
const request = initRequestInstance(
  {
    baseURL: '/api',
    timeout: 10000
  },
  {
    interceptorsRequestFn: (config) => {
      // 请求拦截
      console.log('请求拦截:', config)
    },
    interceptorsResponseFn: (response) => {
      // 响应拦截
      console.log('响应拦截:', response)
    },
    // 自定义业务成功判定逻辑
    isSuccess: (data) => data.status === 'success',
    // 自定义数据提取逻辑
    getData: (data) => data.result
  }
)
```

### cancelAllRequests

取消所有正在进行的请求。

**类型定义：**

```typescript
function cancelAllRequests(): void
```

**示例：**

```typescript
import { cancelAllRequests } from '@minilo/utils'

// 取消所有请求（例如：在页面卸载时）
cancelAllRequests()
```

### cancelRequestsByUrl

根据 URL 取消相关的请求。

**类型定义：**

```typescript
function cancelRequestsByUrl(url: string): void
```

**参数：**

| 参数 | 说明                             | 类型     |
| ---- | -------------------------------- | -------- |
| url  | 要取消的请求 URL（支持部分匹配） | `string` |

**示例：**

```typescript
import { cancelRequestsByUrl } from '@minilo/utils'

// 取消所有包含 '/api/users' 的请求
cancelRequestsByUrl('/api/users')
```

### generateRequestKey

生成请求的唯一标识，用于判断重复请求。

**类型定义：**

```typescript
function generateRequestKey(config: AxiosRequestConfig): string
```

**参数：**

| 参数   | 说明           | 类型                 |
| ------ | -------------- | -------------------- |
| config | Axios 请求配置 | `AxiosRequestConfig` |

**返回值：** `string` - 请求的唯一标识

## 类型定义

### RequestInstanceOptions

请求实例初始化时的配置项。

```typescript
interface RequestInstanceOptions {
  /** 请求拦截器额外处理逻辑 */
  interceptorsRequestFn?: (config: AxiosRequestConfig) => void
  /** 响应拦截器额外处理逻辑 */
  interceptorsResponseFn?: (response: AxiosResponse) => void
  /** 判断响应是否成功的逻辑，默认判断 code === 200 */
  isSuccess?: (data: any) => boolean
  /** 从响应中提取数据的逻辑，默认返回 data.data */
  getData?: (data: any) => any
  /** 从响应中提取错误消息的逻辑，默认返回 data.msg */
  getMessage?: (data: any) => string
}
```

### ApiResponse

后端统一响应格式的类型定义。

```typescript
interface ApiResponse<T = any> {
  data: T // 响应数据
  code: number // 状态码
  msg: string // 响应消息
}
```

**示例：**

```typescript
import type { ApiResponse } from '@minilo/utils'

interface User {
  id: number
  name: string
  email: string
}

// 定义接口返回类型
type UserResponse = ApiResponse<User>

const getUser = async (id: number): Promise<UserResponse> => {
  const response = await request.get(`/api/users/${id}`)
  return response.data
}
```

## 内置功能

### 重复请求处理

自动取消重复的请求，避免同一个请求被重复发送。

```typescript
// 快速连续发送相同请求，只有最后一个会执行
request.get('/api/users')
request.get('/api/users')
request.get('/api/users') // 只有这个请求会真正执行
```

### 错误状态码处理

自动处理常见的 HTTP 错误状态码：

- **401** - 身份验证失败，请重新登录
- **403** - 没有权限执行此操作
- **404** - 请求的资源不存在
- **500** - 服务器内部错误

### 网络状态检测

自动检测网络连接状态，断网时会提示用户。

```typescript
// 网络断开时会自动提示：网络连接已断开，请检查网络
```

## 使用示例

### 完整示例

```typescript
import { initRequestInstance, cancelAllRequests } from '@minilo/utils'
import type { ApiResponse } from '@minilo/utils'
import { onBeforeUnmount } from 'vue'

// 定义数据类型
interface User {
  id: number
  name: string
  email: string
}

interface UserListData {
  list: User[]
  total: number
}

// 创建请求实例
const request = initRequestInstance(
  {
    baseURL: '/api',
    timeout: 10000
  },
  {
    interceptorsRequestFn: (config) => {
      // 添加 token
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    },
    interceptorsResponseFn: (response) => {
      // 记录响应日志
      console.log('API响应:', response)
    }
  }
)

// 获取用户列表
const getUserList = async (page: number, pageSize: number) => {
  const response = await request.get<ApiResponse<UserListData>>('/users', {
    params: { page, pageSize }
  })
  return response.data
}

// 创建用户
const createUser = async (user: Omit<User, 'id'>) => {
  const response = await request.post<ApiResponse<User>>('/users', user)
  return response.data
}

// 更新用户
const updateUser = async (id: number, user: Partial<User>) => {
  const response = await request.put<ApiResponse<User>>(`/users/${id}`, user)
  return response.data
}

// 删除用户
const deleteUser = async (id: number) => {
  const response = await request.delete<ApiResponse<void>>(`/users/${id}`)
  return response.data
}

// 组件卸载时取消所有请求
onBeforeUnmount(() => {
  cancelAllRequests()
})
```

## 注意事项

1. **响应格式**：默认期望后端返回格式为 `{ data: any, code: number, msg: string }`，其中 `code: 200` 表示成功
2. **重复请求**：相同的请求（URL、参数、方法都相同）会被自动取消，只保留最后一个
3. **错误处理**：请求失败时会自动显示错误提示，可以在拦截器中自定义错误处理逻辑
4. **请求取消**：组件卸载时建议调用 `cancelAllRequests()` 取消所有请求，避免内存泄漏
5. **TypeScript**：建议使用泛型明确指定响应数据类型，提高代码可维护性
