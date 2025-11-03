<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginProps, RuleForm } from './Login.types'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = withDefaults(defineProps<LoginProps>(), {
  submitText: '登录',
  errorMessage: '输入验证出错!',
  submitFn: () => {}
})

const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入账户', trigger: 'change' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'change'
    }
  ]
})
const formData = reactive<RuleForm>({
  username: '',
  password: '',
  code: ''
})

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      props.submitFn(formData)
    } else {
      ElMessage.error(props.errorMessage)
    }
  })
}
</script>

<template>
  <div class="login">
    <slot>
      <div class="login-text">欢迎回来</div>
      <div class="login-tip">请输入您的帐户信息以开始管理您的项目</div>
      <el-form
        size="large"
        ref="loginFormRef"
        label-position="top"
        label-width="auto"
        :model="formData"
        :rules="rules"
      >
        <el-form-item prop="username" label="账号">
          <el-input placeholder="请输入账号" v-model="formData.username" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            placeholder="请输入密码"
            show-password
            v-model="formData.password"
          />
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input placeholder="请输入验证码" v-model="formData.code" />
        </el-form-item>
        <el-button class="login-btn" @click="handleLogin(loginFormRef)" type="primary">{{
          submitText
        }}</el-button>
      </el-form>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-text {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  &-tip {
    font-size: 14px;
    color: #999;
    margin-bottom: 30px;
  }
  &-btn {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
