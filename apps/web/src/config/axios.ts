import { client } from '#/apis/client.gen'
import { initRequestInstance, type CreateAxiosDefaults } from '@myself/utils'
/**
 * @description 自定义初始化openapi-ts实例
 * @author xieshuhong
 * @export
 * @param {CreateAxiosDefaults} [extendConfig={}]
 * @param {(config?: AxiosRequestConfig) => void} [interceptorsRequestFn=() => {}]
 * @param {(Response?: AxiosResponse) => void} [interceptorsResponseFn=() => {}]
 */
export default function initOpenApiInstance(extendConfig: CreateAxiosDefaults = {}) {
  client.setConfig({
    axios: initRequestInstance(extendConfig)
  })

  console.log('client:', client)
}
