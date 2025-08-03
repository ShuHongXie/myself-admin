interface InitialOptions {
  namespace: string
  config?: Partial<Config>
}

interface ThemeConfig {
  colorPrimary: string
}

interface Config {
  theme: ThemeConfig
}

export type { Config, InitialOptions }
