<script setup lang="ts">
import { cloneDeep } from '@myself/utils'
import {
  searchProps,
  columns,
  menuFormRules,
  treeSettingSelect,
  defaultOperateItem
} from '../data.tsx'
import type { FormInstance } from 'element-plus'

defineProps({
  data: Object,
  type: {
    type: String,
    default: 'add'
  }
})

const emit = defineEmits(['confirm'])
const ruleFormRef = ref<FormInstance | null>(null)
const visible = defineModel<boolean>('visible')
const currentOperateItem = ref<any>(cloneDeep(defaultOperateItem))
</script>

<template>
  <!-- 新增编辑菜单 -->
  <el-dialog
    v-model="visible"
    @close="currentOperateItem = {}"
    :title="type === 'add' ? '新增菜单' : '修改菜单'"
    width="700"
  >
    <el-form
      ref="ruleFormRef"
      :rules="menuFormRules"
      :model="currentOperateItem"
      label-width="90px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="username" label="账户:">
            <el-input clearable v-model="currentOperateItem.username" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type === 'add'">
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
          <el-form-item prop="nickname" label="菜单昵称:">
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
          <el-form-item label="菜单状态:">
            <el-radio-group v-model="currentOperateItem.status">
              <el-radio :value="1">正常</el-radio>
              <el-radio :value="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="emit('confirm', ruleFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
