<template>
  <div class="button-permission-demo">
    <h2>权限演示</h2>

    <div class="demo-section">
      <h3>用户权限列表</h3>
      <div class="permissions-list">
        <el-tag
          v-for="permission in permissionList"
          :key="permission"
          type="primary"
          size="small"
          class="permission-tag"
        >
          {{ permission }}
        </el-tag>
        <el-tag v-if="permissionList.length === 0" type="info"> 暂无权限 </el-tag>
      </div>
    </div>

    <div class="demo-section">
      <h3>权限控制演示</h3>
      <el-space wrap>
        <!-- 使用传统方式的权限控制 -->
        <el-button
          v-if="userStore.hasPermission('user:create')"
          type="primary"
          @click="handleAction('创建用户')"
        >
          创建用户 (传统方式)
        </el-button>

        <!-- 使用 v-permission 指令的权限控制 -->
        <el-button v-permission="'user:create'" type="primary" @click="handleAction('创建用户')">
          创建用户 (指令方式)
        </el-button>

        <!-- 用户删除权限 -->
        <el-button v-permission="'user:delete'" type="danger" @click="handleAction('删除用户')">
          删除用户
        </el-button>

        <!-- 用户编辑权限 -->
        <el-button v-permission="'user:update'" type="warning" @click="handleAction('编辑用户')">
          编辑用户
        </el-button>

        <!-- 角色管理权限 -->
        <el-button v-permission="'role:create'" type="success" @click="handleAction('创建角色')">
          创建角色
        </el-button>

        <!-- 菜单管理权限 -->
        <el-button v-permission="'menu:create'" type="info" @click="handleAction('创建菜单')">
          创建菜单
        </el-button>
      </el-space>
    </div>

    <div class="demo-section">
      <h3>v-permission 指令高级用法</h3>
      <el-space wrap>
        <!-- 检查多个权限中的任意一个 -->
        <el-button
          v-permission="['user:create', 'user:update']"
          type="primary"
          @click="handleAction('创建或编辑用户')"
        >
          创建或编辑用户
        </el-button>

        <!-- 检查是否拥有所有指定权限 -->
        <el-button
          v-permission.all="['user:create', 'user:delete']"
          type="danger"
          @click="handleAction('完全用户管理权限')"
        >
          完全用户管理权限
        </el-button>
      </el-space>
    </div>

    <div class="demo-section">
      <h3>v-permission 指令禁用模式</h3>
      <el-space wrap>
        <!-- 无权限时禁用而不是隐藏 -->
        <el-button
          v-permission.disable="'user:create'"
          type="primary"
          @click="handleAction('创建用户(禁用模式)')"
        >
          创建用户(禁用模式)
        </el-button>

        <!-- 无权限时禁用而不是隐藏，检查多个权限 -->
        <el-button
          v-permission.disable.all="['user:create', 'user:delete']"
          type="danger"
          @click="handleAction('完全权限(禁用模式)')"
        >
          完全权限(禁用模式)
        </el-button>
      </el-space>
    </div>

    <div class="demo-section">
      <h3>权限检查方法演示</h3>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="单个权限检查 (user:create)">
          {{ userStore.hasPermission('user:create') ? '有权限' : '无权限' }}
        </el-descriptions-item>

        <el-descriptions-item label="任一权限检查 (user:create 或 user:delete)">
          {{
            userStore.hasPermission('user:create') || userStore.hasPermission('user:delete')
              ? '有权限'
              : '无权限'
          }}
        </el-descriptions-item>

        <el-descriptions-item label="全部权限检查 (user:create 和 user:delete)">
          {{
            userStore.hasPermission('user:create') && userStore.hasPermission('user:delete')
              ? '有权限'
              : '无权限'
          }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="demo-section">
      <h3>刷新权限</h3>
      <el-button @click="refreshPermissions" :loading="loading"> 重新获取权限 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@minilo/store'
import { usePermission } from '@minilo/store'
import { getUserButtonPermissions } from '#/apis/sdk.gen'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

const loading = ref(false)

// 响应式的权限列表
const permissionList = computed(() => userStore.permissionList)

// 处理按钮点击
const handleAction = (action: string) => {
  ElMessage.success(`执行操作: ${action}`)
}

// 刷新权限
const refreshPermissions = async () => {
  loading.value = true
  try {
    const res = await getUserButtonPermissions()

    // 类型断言：后端返回的 data 实际上是 string[] 类型
    userStore.setPermissionList(res.data as string[])
    ElMessage.success('权限刷新成功')
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
