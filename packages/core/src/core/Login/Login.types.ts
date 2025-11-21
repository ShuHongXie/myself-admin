interface LoginProps {
  // 文案配置
  title?: string
  subtitle?: string
  submitText?: string
  errorMessage?: string

  // 表单配置
  showCaptcha?: boolean
  showRememberMe?: boolean

  // 占位符配置
  usernamePlaceholder?: string
  passwordPlaceholder?: string
  captchaPlaceholder?: string

  // 验证码数据
  captchaImage?: string

  // 加载状态
  loading?: boolean

  // 表单尺寸
  size?: 'large' | 'default' | 'small'

  // 回调函数
  submitFn?: (formData: RuleForm) => void | Promise<void>
}

interface RuleForm {
  username: string
  password: string
  code?: string
  rememberMe?: boolean
}

interface LoginEmits {
  (e: 'submit', formData: RuleForm): void
  (e: 'refreshCaptcha'): void
}

interface LoginExpose {
  resetForm: () => void
  validate: () => Promise<boolean>
}

export type { LoginProps, RuleForm, LoginEmits, LoginExpose }
