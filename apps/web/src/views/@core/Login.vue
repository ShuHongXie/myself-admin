<script setup lang="ts">
import { Login } from '@myself/ui'
import { login, getUserButtonPermissions } from '#/apis/sdk.gen'
import { useUserStore } from '@myself/store'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

// 登录提交函数
const handleLogin = async (formData: { username: string; password: string; code: string }) => {
  try {
    // 调用登录接口
    const res = await login(formData)
    if (res.data.code === 200) {
      // 保存token
      userStore.setTokenInfo({ accessToken: res.data.data })

      // 获取用户按钮权限
      try {
        const permRes = await getUserButtonPermissions()
        if (permRes.data.code === 200) {
          userStore.setButtonPermissions(permRes.data.data)
        }
      } catch (permError) {
        console.warn('获取按钮权限失败:', permError)
      }

      ElMessage.success('登录成功')
      // 跳转到首页
      router.push('/')
    } else {
      ElMessage.error(res.data.msg || '登录失败')
    }
  } catch (error: any) {
    console.error('登录失败:', error)
    ElMessage.error(error.response?.data?.msg || '登录失败')
  }
}

onMounted(async () => {
  // 获取用户按钮权限
})
</script>

<template>
  <Login :submit-fn="handleLogin" />
</template>

<style lang="scss" scoped></style>
