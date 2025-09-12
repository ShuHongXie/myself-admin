<script setup lang="tsx">
import { SearchTable } from '@myself/ui'
import { Plus, Upload } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { searchProps, columns, roleFormRules } from './data.tsx'
import { getRolesList, createUserByAdmin, updateUser, deleteUser } from '#/apis'
import { cloneDeep } from '@myself/utils'

const defaultOperateItem = {
  username: '',
  password: '',
  nickname: '',
  telephone: '',
  email: '',
  status: 1,
  rolesId: []
}

const selectColumns = ref([])

const form = ref({})

// 基础配置----------------start-------------------

const handleSelect = (val: any) => {
  selectColumns.value = val
}

// 参数编辑
const paramsHandler = (params: any) => {
  params.startCreateDate = params.createTime ? params.createTime[0] : null
  params.endCreateDate = params.createTime ? params.createTime[1] : null
  return params
}
// 基础配置----------------end-------------------

// 新增编辑操作----------------start-------------------
interface RoleItem {
  id: number
  roleName: string
  // 可能还有其他属性...
}

const operateDialogVisible = ref(false)
const operateType = ref('add') // 1 新增 2 修改
const rolesList = ref<RoleItem[]>([])
const ruleFormRef = ref<FormInstance | null>(null)
const searchTableRef = ref<InstanceType<typeof SearchTable> | null>(null)
const switchLoading = ref(false)
const currentOperateItem = ref<any>(defaultOperateItem)

// 获取所有角色列表
const loadRoleList = () => {
  getRolesList().then((res) => {
    rolesList.value = res.data
  })
}

// 启动/禁用
const handleSwitchChange = (row: any) => {
  currentOperateItem.value = row
  switchLoading.value = true
  updateUser({
    ...currentOperateItem.value
  })
    .then(() => {
      ElMessage.success(`角色${!row.status ? '停用' : '启用'}成功`)
      operateDialogVisible.value = false
      currentOperateItem.value = cloneDeep(defaultOperateItem)
      searchTableRef.value?.handleSearch()
    })
    .finally(() => {
      switchLoading.value = false
    })
}

// 操作
const handleOperate = (type: string, row?: any) => {
  operateType.value = type
  operateDialogVisible.value = true
  if (type === 'edit') {
    currentOperateItem.value = row
  } else {
    currentOperateItem.value = cloneDeep(defaultOperateItem)
  }
}

// 确认修改/编辑
const confirm = async (formEl: FormInstance | null) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (operateType.value === 'add') {
        createUserByAdmin(currentOperateItem.value).then((res: any) => {
          ElMessage.success(res.msg || '角色创建成功')
          operateDialogVisible.value = false
          console.log(searchTableRef.value)
          currentOperateItem.value = cloneDeep(defaultOperateItem)
          searchTableRef.value?.handleSearch()
        })
      } else {
        updateUser(currentOperateItem.value).then((res: any) => {
          ElMessage.success(res.msg || '角色更新成功')
          operateDialogVisible.value = false
          currentOperateItem.value = cloneDeep(defaultOperateItem)
          searchTableRef.value?.handleSearch()
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 删除角色
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除账户【${row.username}】?`, 'Warning', {
    type: 'warning'
  }).then(() => {
    deleteUser(row.id).then((res: any) => {
      ElMessage.success(res.msg)
      searchTableRef.value?.handleSearch()
    })
  })
}

const reset = () => {
  console.log('重置')
}

onMounted(() => {
  loadRoleList()
})
// 新增编辑操作----------------end-------------------
</script>

<template>
  <div class="user-manage">
    <SearchTable
      v-model:search="form"
      url="/role/rolesByPage"
      ref="searchTableRef"
      :columns="columns"
      :search-props="searchProps"
      :params-handler="paramsHandler"
      @reset="reset"
      @select-all="handleSelect"
      @select="handleSelect"
    >
      <template #status="scope">
        <el-switch
          @click="handleSwitchChange(scope.row)"
          v-model="scope.row.status"
          :loading="currentOperateItem.id === scope.row.id && switchLoading"
          style="--el-switch-on-color: var(--el-color-primary)"
          inline-prompt
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="停用"
        />
      </template>
      <template #operation="scope">
        <el-space>
          <el-link type="primary" @click="handleOperate('edit', scope.row)">编辑</el-link>
          <el-link type="primary" @click="handleDelete(scope.row)">删除</el-link>
        </el-space>
      </template>
      <template #prefix>
        <div>
          <el-button type="primary" :icon="Plus" @click="handleOperate('add')">新增</el-button>
          <el-button type="success" :icon="Upload">导入</el-button>
        </div>
      </template>
    </SearchTable>
    <el-dialog
      v-model="operateDialogVisible"
      @close="currentOperateItem = {}"
      :title="operateType === 'add' ? '新增角色' : '修改角色'"
      width="700"
    >
      <el-form
        ref="ruleFormRef"
        :rules="roleFormRules"
        :model="currentOperateItem"
        label-width="90px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="角色名:">
              <el-input clearable v-model="currentOperateItem.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色状态:">
              <el-radio-group v-model="currentOperateItem.status">
                <el-radio :value="1">正常</el-radio>
                <el-radio :value="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择角色:">
              <el-select
                v-model="currentOperateItem.rolesId"
                multiple
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option
                  v-for="item in rolesList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="operateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.user-manage {
  height: 100%;
  padding: 10px;
}
</style>
