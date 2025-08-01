import { markRaw, reactive, readonly } from 'vue'
import { StorageManager } from './storageManager'
import { config } from './config'
import type { Config } from './types'
import { merge } from '../func'
import { updateCSSVariables } from './updateCssVariables'

const STORAGE_KEY = 'config'

// 用户配置引导类
class Guider {
  private cache: null | StorageManager
  private isInitialized: boolean = false
  private state: Config = reactive<Config>({
    ...this.loadConfig()
  })
  constructor() {
    this.cache = new StorageManager()
    this.initConfig()
  }

  // 初始化配置
  public initConfig() {
    if (this.isInitialized) {
      return
    }
    this.updateConfig({})
    this.isInitialized = true
  }

  // 更新配置
  public updateConfig(config?: Partial<Config>) {
    const cacheState: Config = merge({}, config, markRaw(this.state))
    Object.assign(this.state, cacheState)
    console.log('new state: ', this.state)
    updateCSSVariables(this.state)
    this.saveConfig(this.state)
  }

  // 保存配置
  public saveConfig(config: Config) {
    this.cache?.setItem(STORAGE_KEY, config)
  }

  // 加载配置
  private loadConfig() {
    return this.cache?.getItem<Config>(STORAGE_KEY) || config
  }

  // 获取配置
  public getConfig() {
    return readonly(this.state)
  }
}

const guider = new Guider()
const userConfig = guider.getConfig()
export { Guider, userConfig, guider }
