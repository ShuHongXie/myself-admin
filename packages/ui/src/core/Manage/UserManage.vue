<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import Search from '../../components/Search/Search.vue'
import { Delete, Download, Edit, Plus, Upload } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(true)
const formLabelWidth = '140px'
const operateType = ref(1) // 1 新增 2 修改
const data = ref([])

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const form = reactive({
  username: '',
  password: '',
  nickname: '',
  status: 1,
  telephone: '',
  email: '',
  roles: []
})

const formRules = ref({
  username: [
    {
      required: true,
      message: '请输入手机号码',
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
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="user-manage">
    <Search></Search>
    <div>
      <el-button type="primary" :icon="Plus">新增</el-button>
      <el-button color="#626aef" :icon="Edit">修改</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
      <el-button type="success" :icon="Upload">导入</el-button>
      <el-button color="#a30676" :icon="Download">导出</el-button>
    </div>
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
          <el-form-item label="用户昵称:">
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
  padding: 10px;
}
</style>
