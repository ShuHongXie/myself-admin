interface LoginProps {
  submitText?: string
  errorMessage?: string
  submitFn?: (formData: RuleForm) => void
}

interface RuleForm {
  username: string
  password: string
  code: string
}

export { LoginProps, RuleForm }
