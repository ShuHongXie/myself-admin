<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginProps, RuleForm, LoginExpose } from './Login.types'
import { reactive, ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = withDefaults(defineProps<LoginProps>(), {
  title: '欢迎回来',
  subtitle: '请输入您的帐户信息以开始管理您的项目',
  submitText: '登录',
  errorMessage: '输入验证出错!',
  showCaptcha: true,
  showRememberMe: false,
  usernamePlaceholder: '请输入账号',
  passwordPlaceholder: '请输入密码',
  captchaPlaceholder: '请输入验证码',
  size: 'large',
  loading: false,
  submitFn: () => {}
})

const emit = defineEmits<{
  submit: [formData: RuleForm]
  refreshCaptcha: []
}>()

const loginFormRef = ref<FormInstance>()

// 动态验证规则
const rules = computed<FormRules<RuleForm>>(() => ({
  username: [{ required: true, message: '请输入账户', trigger: 'change' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ],
  ...(props.showCaptcha
    ? {
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'change'
          }
        ]
      }
    : {})
}))

const formData = reactive<RuleForm>({
  username: '',
  password: '',
  ...(props.showCaptcha ? { code: '' } : {}),
  ...(props.showRememberMe ? { rememberMe: false } : {})
})

// 登录处理
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  const valid = await formEl.validate().catch(() => false)
  if (valid) {
    emit('submit', { ...formData })
    await props.submitFn(formData)
  } else {
    ElMessage.error(props.errorMessage)
  }
}

// 重置表单
const resetForm = () => {
  loginFormRef.value?.resetFields()
}

// 验证表单
const validate = async (): Promise<boolean> => {
  if (!loginFormRef.value) return false
  return await loginFormRef.value.validate().catch(() => false)
}

// 刷新验证码
const handleRefreshCaptcha = () => {
  emit('refreshCaptcha')
}

// 监听加载状态，清除验证码输入
watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (!newVal && oldVal && props.showCaptcha) {
      formData.code = ''
    }
  }
)

// 暴露方法给父组件
defineExpose<LoginExpose>({
  resetForm,
  validate
})
</script>

<template>
  <div class="login">
    <slot name="header">
      <div class="login-text">{{ props.title }}</div>
      <div class="login-tip">{{ props.subtitle }}</div>
    </slot>

    <el-form
      :size="props.size"
      ref="loginFormRef"
      label-position="top"
      label-width="auto"
      :model="formData"
      :rules="rules"
    >
      <slot name="form-prepend"></slot>
      <el-form-item prop="username" label="账号">
        <slot name="username" :model="formData">
          <el-input :placeholder="props.usernamePlaceholder" v-model="formData.username" />
        </slot>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <slot name="password" :model="formData">
          <el-input
            type="password"
            :placeholder="props.passwordPlaceholder"
            show-password
            v-model="formData.password"
          />
        </slot>
      </el-form-item>
      <el-form-item v-if="props.showCaptcha" prop="code" label="验证码">
        <slot name="captcha" :model="formData" :refresh="handleRefreshCaptcha">
          <div class="login-captcha">
            <el-input
              :placeholder="props.captchaPlaceholder"
              v-model="formData.code"
              class="login-captcha-input"
            />
            <div
              v-if="props.captchaImage"
              class="login-captcha-image"
              @click="handleRefreshCaptcha"
            >
              <div v-html="props.captchaImage"></div>
            </div>
          </div>
        </slot>
      </el-form-item>
      <el-form-item v-if="props.showRememberMe">
        <slot name="remember">
          <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
        </slot>
      </el-form-item>
      <slot name="form-append"></slot>
      <slot name="submit-button" :handleLogin="handleLogin" :loading="props.loading">
        <el-button
          class="login-btn"
          @click="handleLogin(loginFormRef)"
          type="primary"
          :loading="props.loading"
        >
          {{ props.submitText }}
        </el-button>
      </slot>
      <slot name="footer"></slot>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-text {
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 600;
    margin-bottom: 10px;
  }
  &-tip {
    font-size: clamp(12px, 3vw, 14px);
    color: #999;
    margin-bottom: 30px;
    line-height: 1.5;
  }
  &-captcha {
    display: flex;
    gap: 12px;
    align-items: center;
    flex: 1;
    &-input {
      flex: 1;
    }
    &-image {
      width: 120px;
      height: 40px;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--el-border-color);
      transition: all 0.3s;
      &:hover {
        border-color: var(--el-color-primary);
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
  &-btn {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
