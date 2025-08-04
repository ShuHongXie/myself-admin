interface extendOptions {
  extendMessage?: extendMessageFn
  defaultLocale?: LanguagesType
}

type LanguagesType = 'en-US' | 'zh-CN'

type extendMessageFn = (lang: LanguagesType) => Promise<Record<string, string> | undefined>

export { extendOptions, extendMessageFn, LanguagesType }
