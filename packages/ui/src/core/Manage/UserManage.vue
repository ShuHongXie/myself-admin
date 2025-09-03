<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import SearchTable from '../../components/SearchTable/index.vue'
import { Delete, Download, Edit, Plus, Upload } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const operateType = ref(1) // 1 新增 2 修改
const data = ref([])
const selectColumns = ref([])

const props = defineProps({
  request: {
    type: Function,
    default: () => {}
  },
  confirm: {
    type: Function,
    default: () => {}
  }
})

onMounted(() => {
  props.request(form)
})

const emit = defineEmits(['confirm'])

const form = ref({
  username: '',
  password: '',
  nickname: '',
  status: 1,
  telephone: '',
  email: '',
  roles: [],
  value: false,
  num: 10,
  time: ''
})

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
    prop: 'roles',
    label: '关联角色',
    align: 'center'
  },
  {
    prop: 'operation',
    label: '操作',
    align: 'center',
    slotName: 'operation'
  }
])

const formRules = ref({
  username: [
    {
      required: true,
      message: '请输入账户名',
      trigger: ['blur', 'change']
    }
  ],
  nickname: [
    {
      required: true,
      message: '请输入用户昵称',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: ['blur', 'change']
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

const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('confirm', form.value)
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleEdit = (row: any) => {
  console.log(row)
  dialogFormVisible.value = true
  form.value = row
}

const handleSelect = (val: any) => {
  selectColumns.value = val
}
</script>

<template>
  <div class="user-manage">
    <!-- <Search v-model="form">
      <template #custom1>
        <el-input v-model="form.value" />
      </template>
      <template #custom2>
        <el-input v-model="form.value" />
      </template>
    </Search> -->
    <SearchTable
      @select-all="handleSelect"
      @select="handleSelect"
      url="/user/getUserList"
      :columns="columns"
      v-model:search="form"
    >
      <template #custom1>
        <el-input v-model="form.value" />
      </template>
      <template #custom2>
        <el-input v-model="form.value" />
      </template>
      <template #status="scope">
        <el-switch
          v-model="scope.row.status"
          style="--el-switch-on-color: var(--el-color-primary)"
          inline-prompt
          active-text="启用"
          inactive-text="停用"
        />
      </template>
      <template #operation="scope">
        <el-link type="primary" @click="handleEdit(scope.row)">编辑</el-link>
      </template>
      <template #prefix>
        <div>
          <el-button type="primary" :icon="Plus">新增</el-button>
          <el-button color="#626aef" :icon="Edit">修改</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
          <el-button type="success" :icon="Upload">导入</el-button>
          <el-button color="#a30676" :icon="Download">导出</el-button>
        </div>
      </template>
    </SearchTable>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    :title="operateType === 1 ? '新增用户' : '修改用户'"
    width="700"
  >
    <el-form ref="ruleFormRef" :rules="formRules" :model="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="username" label="账户:">
            <el-input clearable v-model="form.username" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="password" label="密码:">
            <el-input
              clearable
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="nickname" label="用户昵称:">
            <el-input clearable v-model="form.nickname" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="telephone" label="手机号码:">
            <el-input clearable v-model="form.telephone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="email" label="邮箱地址:">
            <el-input clearable v-model="form.email" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户状态:">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">正常</el-radio>
              <el-radio :value="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择角色:">
            <el-tree-select
              v-model="form.roles"
              placeholder="请账号拥有的角色"
              :data="data"
              multiple
              :render-after-expand="false"
              show-checkbox
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.user-manage {
  height: 100%;
  padding: 10px;
}
</style>
