<script setup lang="ts">
import { cloneDeep } from '@myself/utils'
import {
  menuFormRules,
  menuTypeOptions,
  menuTypeData,
  defaultOperateItem,
  MenuType
} from '../data.tsx'
import type { FormInstance } from 'element-plus'

const props = defineProps({
  data: Object,
  menuList: Array,
  type: {
    type: String,
    default: 'add'
  }
})

const emit = defineEmits(['confirm'])
const ruleFormRef = ref<FormInstance | null>(null)
const visible = defineModel<boolean>('visible')
const form = ref<any>(cloneDeep(defaultOperateItem))

onMounted(() => {
  if (props.data && props.type === 'edit') {
    form.value = cloneDeep(props.data)
  }
})
</script>

<template>
  <!-- 新增编辑菜单 -->
  <el-dialog
    v-model="visible"
    :title="type === 'add' ? '新增菜单' : '修改菜单'"
    width="700"
    destroy-on-close
  >
    <el-form ref="ruleFormRef" :rules="menuFormRules" :model="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="parentId" label="父级菜单:">
            <el-tree-select
              v-model="form.parentId"
              :data="menuList"
              check-strictly
              node-key="id"
              :props="{
                label: 'name'
              }"
              default-expand-all
              :render-after-expand="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="password" label="菜单类型:">
            <el-radio-group v-model="form.menuType">
              <el-radio :value="item.value" v-for="item in menuTypeOptions" :key="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="meta.icon" label="页面图标:">
            <div class="icon-input">
              <el-input clearable v-model="form.meta.icon" />
              <el-link
                type="primary"
                underline="never"
                href="https://icon-sets.iconify.design/"
                target="_blank"
                >复制iconify图标</el-link
              >
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="name" label="菜单名称:">
            <el-input clearable v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="meta.orderNum" label="排序:">
            <el-input clearable v-model.number="form.meta.orderNum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="component" label="组件名称:">
            <el-input clearable v-model="form.component" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="permission" label="权限标识:">
            <el-input clearable v-model="form.permission" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="path" label="路由跳转地址:" label-width="120px">
            <el-input clearable v-model="form.path" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="`${menuTypeData[form.menuType]}状态:`">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">正常</el-radio>
              <el-radio :value="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- 菜单为菜单时专属 -->
        <template v-if="form.menuType === MenuType['菜单']">
          <el-col :span="12">
            <el-form-item prop="title" label="页面标题:">
              <el-input clearable v-model="form.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="meta.isCache" label="是否缓存组件:" label-width="120px">
              <el-radio-group v-model="form.meta.isCache">
                <el-radio :value="1">是</el-radio>
                <el-radio :value="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="meta.showInBreadcrumb"
              label="是否显示在面包栏:"
              label-width="130px"
            >
              <el-radio-group v-model="form.meta.showInBreadcrumb">
                <el-radio :value="1">是</el-radio>
                <el-radio :value="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="meta.showInTab" label="是否显示标签栏:" label-width="120px">
              <el-radio-group v-model="form.meta.showInTab">
                <el-radio :value="1">是</el-radio>
                <el-radio :value="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </template>
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

<style lang="scss" scoped>
.icon-input {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  .el-link {
    min-width: 200px;
    flex: 1;
    display: inline-block;
  }
}
</style>
