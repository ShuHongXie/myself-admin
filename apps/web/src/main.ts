import { guider } from '@minilo/utils'
import { config } from './config'

async function start() {
  // name用于指定项目唯一标识
  // 用于区分不同项目的偏好设置以及存储数据的key前缀以及其他一些需要隔离的数据
  // const env = import.meta.env.PROD ? 'prod' : 'dev';
  // const appVersion = import.meta.env.VITE_APP_VERSION;
  // const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // app偏好设置初始化
  await guider.initConfig({
    namespace: 'minilo',
    config
  })

  // 启动应用并挂载
  // vue应用主要逻辑及视图
  const { init } = await import('./init')
  await init()

  // 移除并销毁loading
  // unmountGlobalLoading()
}

start()
