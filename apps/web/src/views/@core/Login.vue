<template>
  <div class="login">
    <div class="login-text">欢迎回来</div>
    <div class="login-tip">请输入您的帐户信息以开始管理您的项目</div>
    <el-form
      size="large"
      ref="loginFormRef"
      label-position="top"
      label-width="auto"
      :model="formLabelAlign"
      :rules="rules"
    >
      <el-form-item prop="username" label="账号">
        <el-input placeholder="请输入账号" v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          type="password"
          placeholder="请输入密码"
          show-password
          v-model="formLabelAlign.password"
        />
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input placeholder="请输入验证码" v-model="formLabelAlign.code" />
      </el-form-item>
      <el-button class="login-btn" @click="handleLogin(loginFormRef)" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

interface RuleForm {
  username: string
  password: string
  code: string
}

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
const formLabelAlign = reactive({
  username: '',
  password: '',
  code: ''
})

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('成功')
    } else {
      ElMessage.error('输入验证出错!')
    }
  })
}
</script>

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
