import { client } from '#/apis/client.gen'
import {
  initRequestInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults
} from '@minilo/utils'
import { useUserStore } from '@minilo/store'

/**
 * @description 自定义初始化openapi-ts实例
 * @author xieshuhong
 * @export
 * @param {CreateAxiosDefaults} [extendConfig={}]
 */
export default function initOpenApiInstance(extendConfig: CreateAxiosDefaults = {}) {
  const userStore = useUserStore()
  client.setConfig({
    axios: initRequestInstance(extendConfig, {
      interceptorsRequestFn: (config?: AxiosRequestConfig) => {
        // 添加认证token
        if (userStore && userStore.token) {
          config!.headers!.Authorization = `Bearer ${userStore.token}`
        }
      }
    }),
    // 设置为true，使错误能够正确抛出而不是被转换为成功的响应
    throwOnError: true
  })
}
