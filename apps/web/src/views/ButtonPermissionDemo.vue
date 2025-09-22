<template>
  <div class="button-permission-demo">
    <h2>按钮权限演示</h2>

    <div class="demo-section">
      <h3>用户按钮权限列表</h3>
      <div class="permissions-list">
        <el-tag
          v-for="permission in buttonPermissions"
          :key="permission"
          type="primary"
          size="small"
          class="permission-tag"
        >
          {{ permission }}
        </el-tag>
        <el-tag v-if="buttonPermissions.length === 0" type="info"> 暂无按钮权限 </el-tag>
      </div>
    </div>

    <div class="demo-section">
      <h3>权限控制按钮演示</h3>
      <el-space wrap>
        <!-- 用户创建权限 -->
        <el-button
          v-if="hasPermission('user:create', buttonPermissions)"
          type="primary"
          @click="handleAction('创建用户')"
        >
          创建用户
        </el-button>

        <!-- 用户删除权限 -->
        <el-button
          v-if="hasPermission('user:delete', buttonPermissions)"
          type="danger"
          @click="handleAction('删除用户')"
        >
          删除用户
        </el-button>

        <!-- 用户编辑权限 -->
        <el-button
          v-if="hasPermission('user:update', buttonPermissions)"
          type="warning"
          @click="handleAction('编辑用户')"
        >
          编辑用户
        </el-button>

        <!-- 角色管理权限 -->
        <el-button
          v-if="hasPermission('role:create', buttonPermissions)"
          type="success"
          @click="handleAction('创建角色')"
        >
          创建角色
        </el-button>

        <!-- 菜单管理权限 -->
        <el-button
          v-if="hasPermission('menu:create', buttonPermissions)"
          type="info"
          @click="handleAction('创建菜单')"
        >
          创建菜单
        </el-button>
      </el-space>
    </div>

    <div class="demo-section">
      <h3>权限检查方法演示</h3>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="单个权限检查 (user:create)">
          {{ hasPermission('user:create', buttonPermissions) ? '有权限' : '无权限' }}
        </el-descriptions-item>

        <el-descriptions-item label="任一权限检查 (user:create 或 user:delete)">
          {{
            hasAnyPermission(['user:create', 'user:delete'], buttonPermissions)
              ? '有权限'
              : '无权限'
          }}
        </el-descriptions-item>

        <el-descriptions-item label="全部权限检查 (user:create 和 user:delete)">
          {{
            hasAllPermissions(['user:create', 'user:delete'], buttonPermissions)
              ? '有权限'
              : '无权限'
          }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="demo-section">
      <h3>刷新权限</h3>
      <el-button @click="refreshPermissions" :loading="loading"> 重新获取按钮权限 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@myself/store'
import { useButtonPermission } from '@myself/utils'
import { getUserButtonPermissions } from '#/apis'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const { hasPermission, hasAnyPermission, hasAllPermissions } = useButtonPermission()

const loading = ref(false)

// 响应式的按钮权限列表
const buttonPermissions = computed(() => userStore.buttonPermissions)

// 处理按钮点击
const handleAction = (action: string) => {
  ElMessage.success(`执行操作: ${action}`)
}

// 刷新权限
const refreshPermissions = async () => {
  loading.value = true
  try {
    const res = await getUserButtonPermissions()
    if (res.data.code === 200) {
      userStore.setButtonPermissions(res.data.data)
      ElMessage.success('权限刷新成功')
    } else {
      ElMessage.error('权限刷新失败')
    }
  } catch (error) {
    console.error('刷新权限失败:', error)
    ElMessage.error('权限刷新失败')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.button-permission-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .demo-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background-color: #fafafa;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #303133;
    }
  }

  .permissions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .permission-tag {
      margin: 0;
    }
  }
}
</style>
