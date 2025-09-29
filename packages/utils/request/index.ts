import axios, { type CreateAxiosDefaults } from 'axios'
import { merge } from '../func'

export * from 'axios'
export { axios }

// 创建请求实例
export const initRequestInstance = (extendConfig: CreateAxiosDefaults = {}) => {
  const axiosConfig = merge({}, extendConfig, {
    baseURL: '/', // 从环境变量获取基础URL
    timeout: 10000, // 超时时间
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  const instance = axios.create(axiosConfig)

  return instance
}
