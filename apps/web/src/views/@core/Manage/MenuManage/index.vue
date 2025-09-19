<script setup lang="tsx">
import { SearchTable } from '@myself/ui'
import { Plus, Upload } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import OperationDialog from './components/OperationDialog.vue'
import { searchProps, columns, defaultOperateItem, MenuType, menuTypeData } from './data.tsx'
import { createMenu, getMenuDetail, deleteMenu, updateMenu, getMenuTree } from '#/apis'
import { cloneDeep } from '@myself/utils'

// 搜索表单---------------start-------------------
const form = ref({})
// 搜索表单---------------end-------------------

// 新增编辑操作----------------start-------------------
const operateDialogVisible = ref(false)
const operateType = ref('add') // add 新增 edit 修改
const menuTree = ref<any[]>([])
const searchTableRef = ref<InstanceType<typeof SearchTable> | null>(null)
const currentOperateItem = ref<any>(cloneDeep(defaultOperateItem))

// 获取菜单树
const loadMenuTree = () => {
  getMenuTree().then((res) => {
    menuTree.value = [{ id: -1, name: '顶层菜单', children: res.data }]
  })
}
// 操作
const handleOperate = (type: string, row?: any) => {
  if (type === 'edit') {
    currentOperateItem.value = row
  } else {
    currentOperateItem.value = row
      ? cloneDeep({
          ...defaultOperateItem,
          parentId: row.id
        })
      : cloneDeep(defaultOperateItem)
  }
  console.log(currentOperateItem.value)

  operateType.value = type
  operateDialogVisible.value = true
}

// 确认修改/编辑
const confirm = async () => {
  if (operateType.value === 'add') {
    createMenu(currentOperateItem.value).then((res: any) => {
      ElMessage.success(res.msg || '菜单创建成功')
      operateDialogVisible.value = false
      console.log(searchTableRef.value)
      currentOperateItem.value = cloneDeep(defaultOperateItem)
      searchTableRef.value?.handleSearch()
    })
  } else {
    updateMenu(currentOperateItem.value.id, currentOperateItem.value).then((res: any) => {
      ElMessage.success(res.msg || '菜单更新成功')
      operateDialogVisible.value = false
      currentOperateItem.value = cloneDeep(defaultOperateItem)
      searchTableRef.value?.handleSearch()
    })
  }
}

// 删除菜单
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除${menuTypeData[row.menuType]}【${row.name}】?`, 'Warning', {
    type: 'warning'
  }).then(() => {
    deleteMenu(row.id).then((res: any) => {
      ElMessage.success(res.msg)
      searchTableRef.value?.handleSearch()
    })
  })
}

// 新增编辑操作----------------end---------------------

onMounted(() => {
  loadMenuTree()
})
</script>

<template>
  <div class="menu-manage">
    <SearchTable
      v-model:search="form"
      url="/menu/info"
      ref="searchTableRef"
      :columns="columns"
      :search-props="searchProps"
      :show-pagination="false"
      response-data-field="data"
      :table-props="{
        showOverflowTooltip: true,
        highlightCurrentRow: true,
        defaultExpandAll: true,
        rowKey: 'id'
      }"
    >
      <template #operation="scope">
        <el-space>
          <el-link
            type="primary"
            v-if="scope.row.menuType !== MenuType['按钮']"
            @click="handleOperate('add', scope.row)"
            >新增</el-link
          >
          <el-link type="primary" @click="handleOperate('edit', scope.row)">编辑</el-link>
          <el-link type="danger" @click="handleDelete(scope.row)">删除</el-link>
        </el-space>
      </template>
      <template #prefix>
        <div>
          <el-button type="primary" :icon="Plus" @click="handleOperate('add')">新增</el-button>
          <el-button type="success" :icon="Upload">导入</el-button>
        </div>
      </template>
    </SearchTable>
    <OperationDialog
      v-model:visible="operateDialogVisible"
      v-model:form="currentOperateItem"
      :type="operateType"
      :menu-list="menuTree"
      @confirm="confirm"
    ></OperationDialog>
  </div>
</template>

<style lang="scss" scoped>
.menu-manage {
  height: 100%;
  padding: 10px;
}
</style>
