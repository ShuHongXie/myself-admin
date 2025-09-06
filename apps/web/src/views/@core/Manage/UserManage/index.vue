<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { SearchTable } from '@myself/ui'
import { Delete, Download, Edit, Plus, Upload } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { searchProps } from './data'
import { getRolesList } from '#/apis'

const selectColumns = ref([])
const currentOperateItem = ref<any>({})

// 基础配置----------------start-------------------
const form = ref({
  username: '',
  nickname: '',
  status: '',
  telephone: ''
})

// 表格字段
const columns = ref([
  {
    type: 'selection'
  },
  {
    prop: 'index',
    label: '序号',
    align: 'center',
    type: 'index',
    width: 80
  },
  {
    prop: 'username',
    label: '账户名',
    align: 'center'
  },
  {
    prop: 'nickname',
    label: '用户昵称',
    align: 'center'
  },
  {
    prop: 'telephone',
    label: '手机号码',
    align: 'center'
  },
  {
    prop: 'status',
    label: '用户状态',
    align: 'center',
    slotName: 'status'
  },
  {
    prop: 'rolesName',
    label: '关联角色',
    align: 'center',
    render: (row: any) => {
      return <span>{row.rolesName.join(',')}</span>
    }
  },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    slotName: 'operation'
  }
])

// 编辑规则
const formRules = ref({
  username: [
    {
      required: true,
      message: '请输入账户名',
      trigger: ['blur']
    }
  ],
  nickname: [
    {
      required: true,
      message: '请输入用户昵称',
      trigger: ['blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: ['blur']
    }
  ],
  // 邮箱验证规则
  email: [
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '邮箱格式不正确（示例：xxx@xxx.com）',
      trigger: ['blur', 'change']
    }
  ],
  telephone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的11位手机号码',
      trigger: ['blur', 'change']
    }
  ]
})

// 基础配置----------------end-------------------

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // emit('confirm', form.value)
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleEdit = (row: any) => {
  console.log(row)
  operateDialogVisible.value = true
  currentOperateItem.value = row
}

const handleSelect = (val: any) => {
  selectColumns.value = val
}

// 新增编辑操作----------------start-------------------
interface RoleItem {
  id: number
  roleName: string
  // 可能还有其他属性...
}

const operateDialogVisible = ref(false)
const operateType = ref(1) // 1 新增 2 修改
const rolesList = ref<RoleItem[]>([])
const ruleFormRef = ref<FormInstance>()

// 获取所有角色列表
const loadRoleList = () => {
  getRolesList().then((res) => {
    rolesList.value = res.data
    console.log(rolesList.value)
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
      url="/user/list"
      :columns="columns"
      :search-props="searchProps"
      @reset="reset"
      @select-all="handleSelect"
      @select="handleSelect"
    >
      <template #status="scope">
        <el-switch
          v-model="scope.row.status"
          style="--el-switch-on-color: var(--el-color-primary)"
          inline-prompt
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="停用"
        />
      </template>
      <template #operation="scope">
        <el-link type="primary" @click="handleEdit(scope.row)">编辑</el-link>
      </template>
      <template #prefix>
        <div>
          <el-button type="primary" :icon="Plus" @click="operateDialogVisible = true"
            >新增</el-button
          >
          <el-button type="danger" :icon="Delete" :disabled="!selectColumns.length">删除</el-button>
          <el-button type="success" :icon="Upload">导入</el-button>
        </div>
      </template>
    </SearchTable>
    <el-dialog
      v-model="operateDialogVisible"
      @close="currentOperateItem = {}"
      :title="operateType === 1 ? '新增用户' : '修改用户'"
      width="700"
    >
      <el-form ref="ruleFormRef" :rules="formRules" :model="currentOperateItem" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="账户:">
              <el-input clearable v-model="currentOperateItem.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="password" label="密码:">
              <el-input
                clearable
                v-model="currentOperateItem.password"
                type="password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="nickname" label="用户昵称:">
              <el-input clearable v-model="currentOperateItem.nickname" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="telephone" label="手机号码:">
              <el-input clearable v-model="currentOperateItem.telephone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="email" label="邮箱地址:">
              <el-input clearable v-model="currentOperateItem.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户状态:">
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
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
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
