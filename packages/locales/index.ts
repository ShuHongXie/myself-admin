import { App } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'

import type { extendOptions, extendMessageFn, LanguagesType } from './types'
let extendMessage: extendMessageFn

const i18n = createI18n({
  legacy: false,
  locale: '',
  fallbackLocale: 'zh',
  messages: {}
})

const presetLocalMessage = import.meta.glob('./langs/**/*.json')

const setI18nLanguage = (locale: LanguagesType) => {
  i18n.global.locale.value = locale
  document?.querySelector('html')?.setAttribute('lang', locale)
}

/**
 * @description: 从文件夹里面获取所有语言包
 * @return {*}
 * @Author: xieshuhong
 */
const localesMap = async () => {
  const LanguagesTypeEntity = {}
  for (const path in presetLocalMessage) {
    const module = (await presetLocalMessage[path]()) as { default: any }
    const type = path.match(/langs\/([A-Za-z-]+)\//)[1]
    if (!LanguagesTypeEntity[type]) {
      LanguagesTypeEntity[type] = {}
    }
    for (const key in module?.default) {
      LanguagesTypeEntity[type][key] = module?.default[key]
    }
  }
  return LanguagesTypeEntity
}

/**
 * @description: 切换语言
 * @param {LanguagesType} lang
 * @return {*}
 * @Author: xieshuhong
 */
const loadLocalMessages = async (lang: LanguagesType) => {
  if (i18n.global.locale.value === lang) {
    setI18nLanguage(lang)
  }

  const message = await localesMap()
  if (Object.keys(message)) {
    i18n.global.setLocaleMessage(lang, message[lang])
  }

  const mergeMessage = await extendMessage(lang)
  i18n.global.mergeLocaleMessage(lang, mergeMessage)
}

/**
 * @description: 开始初始化国际化
 * @param {App} app
 * @param {extendOptions} options
 * @return {*}
 * @Author: xieshuhong
 */
const initI18n = async (app: App, options: extendOptions = {}) => {
  const { defaultLocale = 'zh-CN' } = options
  extendMessage = options?.extendMessage || (async () => ({}))

  await loadLocalMessages(defaultLocale)
  app.use(i18n)
}

export { initI18n, useI18n, loadLocalMessages }
