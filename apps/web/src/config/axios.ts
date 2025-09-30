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
    axios: initRequestInstance(extendConfig)
  })

  console.log('client:', client)
}
