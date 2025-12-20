/// <reference types="vite/client" />

// Vite 环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  // 根据需要添加其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
