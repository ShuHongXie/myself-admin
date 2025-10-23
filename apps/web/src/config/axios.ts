import { client } from '#/apis/client.gen'
import { initRequestInstance, type CreateAxiosDefaults } from '@myself/utils'
/**
 * @description 自定义初始化openapi-ts实例
 * @author xieshuhong
 * @export
 * @param {CreateAxiosDefaults} [extendConfig={}]
 */
export default function initOpenApiInstance(extendConfig: CreateAxiosDefaults = {}) {
  client.setConfig({
    axios: initRequestInstance(extendConfig),
    // 设置为true，使错误能够正确抛出而不是被转换为成功的响应
    throwOnError: true
  })

  console.log('client:', client)
}
