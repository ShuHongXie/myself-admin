import { client } from '#/apis/client.gen'
import {
  axios,
  initRequestInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults
} from '@myself/utils'
import { ElMessage } from 'element-plus'

/**
 * 后端统一响应格式
 * @template T - 响应体中 result 字段的类型
 */
export interface ApiResponse<T = any> {
  data: T // data 可以是任意结构，包含 result、total 等字段
  code: number
  msg: string
}

// 存储当前正在进行的请求
const pendingRequests = new Map()

/**
 * 生成请求唯一标识
 * @param {Object} config 请求配置
 * @returns {String} 唯一标识
 */
export const generateRequestKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config
  // 序列化参数，确保相同参数生成相同key
  const paramsStr = params ? JSON.stringify(params) : ''
  const dataStr = data ? JSON.stringify(data) : ''
  return `${method}-${url}-${paramsStr}-${dataStr}`
}

/**
 * 取消所有 pending 状态的请求
 */
export const cancelAllRequests = () => {
  pendingRequests.forEach((source) => {
    source.cancel('所有请求已被取消')
  })
  pendingRequests.clear()
}

/**
 * 根据URL取消相关请求
 * @param {String} url 要取消请求的URL
 */
export const cancelRequestsByUrl = (url: string) => {
  Array.from(pendingRequests.entries()).forEach(([key, source]) => {
    if (key.includes(url)) {
      source.cancel(`与${url}相关的请求已被取消`)
      pendingRequests.delete(key)
    }
  })
}

/**
 * 添加请求到pending列表
 * @param {Object} config 请求配置
 */
export const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateRequestKey(config)
  // 如果存在相同请求，则取消之前的请求
  if (pendingRequests.has(requestKey)) {
    const cancelToken = pendingRequests.get(requestKey)
    cancelToken.cancel(`重复请求被取消: ${config.url}`)
    pendingRequests.delete(requestKey)
  }

  // 创建新的取消令牌
  const source = axios.CancelToken.source()
  config.cancelToken = source.token
  pendingRequests.set(requestKey, source)
}

/**
 * 从pending列表移除请求
 * @param {Object} config 请求配置
 */
export const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

/**
 * @description 自定义初始化openapi-ts实例
 * @author xieshuhong
 * @export
 * @param {CreateAxiosDefaults} [extendConfig={}]
 * @param {(config?: AxiosRequestConfig) => void} [interceptorsRequestFn=() => {}]
 * @param {(Response?: AxiosResponse) => void} [interceptorsResponseFn=() => {}]
 */
export default function initOpenApiInstance(
  extendConfig: CreateAxiosDefaults = {},
  interceptorsRequestFn: (config?: AxiosRequestConfig) => void = () => {},
  interceptorsResponseFn: (Response?: AxiosResponse) => void = () => {}
) {
  client.setConfig({
    axios: initRequestInstance(extendConfig)
  })

  // 请求拦截器
  client.instance.interceptors.request.use(
    (config) => {
      // typeof interceptorsRequestFn === 'function' && interceptorsRequestFn(config)
      interceptorsRequestFn(config)
      // 添加请求到pending列表，处理重复请求
      addPendingRequest(config)

      // 添加认证token（根据实际情况修改）
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // 可以在这里添加其他请求处理逻辑，如请求加载动画等

      return config
    },
    (error) => {
      // 请求错误处理
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  client.instance.interceptors.response.use(
    (response: AxiosResponse) => {
      interceptorsResponseFn(response)
      // 从pending列表移除请求
      removePendingRequest(response.config)

      const data = response.data as ApiResponse<any>

      // 根据实际后端接口规范处理响应
      if (data.code === 200) {
        return Promise.resolve({
          ...response,
          ...data,
          data: data.data
        })
      } else {
        // 非成功状态，显示错误信息
        ElMessage.error(data.msg || '请求失败')
        return Promise.reject(new Error(data.msg || '请求失败'))
      }
    },
    (error) => {
      // 请求完成后从pending列表移除
      if (error.config) {
        removePendingRequest(error.config)
      }

      // 处理取消请求的错误
      if (axios.isCancel(error)) {
        console.warn('请求已被取消:', error.message)
        return Promise.reject(new Error('请求已被取消'))
      }

      // 处理网络错误
      if (!window.navigator.onLine) {
        ElMessage.error('网络连接已断开，请检查网络')
        return Promise.reject(new Error('网络连接已断开'))
      }

      // 处理HTTP错误状态码
      const { response } = error
      if (response) {
        switch (response.status) {
          case 401:
            ElMessage.error('身份验证失败，请重新登录')
            // 可以在这里添加跳转到登录页的逻辑
            break
          case 403:
            ElMessage.error('没有权限执行此操作')
            break
          case 404:
            ElMessage.error('请求的资源不存在')
            break
          case 500:
            ElMessage.error('服务器内部错误')
            break
          default:
            ElMessage.error(`请求错误: ${response.status}`)
        }
      } else {
        ElMessage.error('请求失败，请稍后重试')
      }

      return Promise.reject(error)
    }
  )
}
