import 'axios'

// 扩展 Axios 响应数据的类型
declare module 'axios' {
  interface AxiosResponse<T = any> {
    // 声明 data 可能包含 result 字段（根据实际接口定义）
    data: T & {
      result?: any // 可选，避免必须包含该字段
      // 可添加其他常用字段，如 code、message 等
      code?: number
      message?: string
    }
  }
}
