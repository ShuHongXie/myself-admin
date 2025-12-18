<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, type Ref } from 'vue'
import * as XLSX from 'xlsx'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  dataImportWizardProps,
  type SystemField,
  type ValidateRule,
  type HeaderMatch,
  type EditCell,
  type ImportResult
} from './props'

defineOptions({
  name: 'MlDataImportWizard'
})

// -------------------------- Props定义 --------------------------
const props = defineProps(dataImportWizardProps)

// -------------------------- 响应式状态 --------------------------
// 基础弹窗控制
const dialogVisible = ref(false)
const stepLoading = ref(false)
const importLoading = ref(false)
const stepLoadingTimer = ref<NodeJS.Timeout | null>(null)

// 步骤控制
const currentStep = ref(0)
const validateTabKey = ref('all') // 校验页签：all/error

// Excel相关
const fileList = ref<File[]>([]) // 上传的文件列表
const sheetList = ref<string[]>([]) // Excel的Sheet列表
const selectedSheet = ref('') // 选中的Sheet
const excelData = ref<any[]>([]) // 解析后的Excel原始数据

// 表头匹配
const headerMatchList = ref<HeaderMatch[]>([]) // Excel表头→系统字段映射

// 数据校验&编辑
const validatedData = ref<any[]>([]) // 校验后的数据（含错误信息）
const editData = ref<any[]>([]) // 编辑中的数据
const editCell = ref<EditCell>({ key: '', value: '' }) // 行内编辑单元格状态
const editInputRef = ref<Ref<any>>(null) // 编辑输入框ref

// 分页控制
const currentPage = ref(1)
const pageSize = ref(10)

// 导入结果
const importSuccess = ref(false)
const successCount = ref(0)
const failCount = ref(0)
const importErrorMsg = ref('')

// -------------------------- 计算属性 --------------------------
// 显示的列（Excel表头）
const displayColumns = computed(() => headerMatchList.value.map((item) => item.excelHeader))

// 过滤后的校验数据（根据页签：全部/仅错误）
const filterValidatedData = computed(() => {
  const baseData = validatedData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
  if (validateTabKey.value === 'error') {
    return baseData.filter((row) => row.errorMsg)
  }
  return baseData
})

// 过滤后的编辑数据
const filterEditData = computed(() => {
  const baseData = editData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
  return baseData
})

// -------------------------- 缺失方法补全 --------------------------
/**
 * 分页大小变化
 */
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1 // 重置页码
}

/**
 * 页码变化
 */
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 重置编辑单元格状态
  editCell.value = { key: '', value: '' }
}

/**
 * 表格行样式（错误行标红）
 */
const rowClassName = ({ row }: { row: any }) => {
  return row.errorMsg ? 'el-table__row--error' : ''
}

/**
 * 自动匹配表头（根据文字相似度）
 */
const autoMatchHeader = () => {
  headerMatchList.value = headerMatchList.value.map((item) => {
    // 简单匹配：系统字段label包含Excel表头 或 Excel表头包含系统字段label
    const matchField = props.systemFields.find(
      (field) => field.label.includes(item.excelHeader) || item.excelHeader.includes(field.label)
    )
    return {
      ...item,
      systemField: matchField?.value || ''
    }
  })
  ElMessage.success('已自动匹配表头，请检查确认')
}

/**
 * 移除表头匹配项
 */
const removeHeaderMatch = (row: HeaderMatch) => {
  ElMessageBox.confirm('确定要移除该表头匹配吗？', '提示', {
    type: 'warning'
  }).then(() => {
    headerMatchList.value = headerMatchList.value.filter(
      (item) => item.excelHeader !== row.excelHeader
    )
  })
}

/**
 * 单元格点击（触发行内编辑）
 */
const handleCellClick = (row: any, column: any) => {
  // 跳过错误信息列
  if (column.prop === 'errorMsg') return
  // 设置编辑单元格
  editCell.value = {
    key: `${row._uid}-${column.prop}`,
    value: row[column.prop] || ''
  }
  // 聚焦输入框
  nextTick(() => {
    if (editInputRef.value) {
      ;(editInputRef.value as HTMLElement).focus()
    }
  })
}

/**
 * 单元格失焦（结束编辑并重新校验）
 */
const handleCellBlur = (row: any, prop: string) => {
  // 更新行数据
  row[prop] = editCell.value.value
  // 重新校验当前行
  validateSingleRow(row)
  // 重置编辑状态
  editCell.value = { key: '', value: '' }
}

/**
 * 校验单行数据
 */
const validateSingleRow = (row: any) => {
  const errorMsg: string[] = []
  // 遍历所有校验规则
  Object.entries(props.validateRules).forEach(([field, rules]) => {
    const value = row[field]
    rules.forEach((rule) => {
      // 必填校验
      if (rule.required && (value === undefined || value === null || value === '')) {
        errorMsg.push(rule.message)
      }
      // 正则校验
      if (rule.pattern && value && !rule.pattern.test(value)) {
        errorMsg.push(rule.message)
      }
      // 类型校验
      if (rule.type === 'number' && value && typeof value !== 'number') {
        errorMsg.push(rule.message)
      }
      // 日期格式校验（简单版）
      if (rule.type === 'date' && value) {
        const dateReg = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/
        if (!dateReg.test(value)) {
          errorMsg.push(rule.message)
        }
      }
    })
  })
  row.errorMsg = errorMsg.join('；')
}

/**
 * 导出失败日志为Excel
 */
const exportErrorLog = () => {
  const errorRows = editData.value.filter((row) => row.errorMsg)
  if (errorRows.length === 0) {
    ElMessage.warning('暂无失败数据可导出')
    return
  }
  // 转换为Excel格式
  const worksheet = XLSX.utils.json_to_sheet(errorRows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '导入失败数据')
  // 下载文件
  XLSX.writeFile(workbook, `导入失败日志_${new Date().getTime()}.xlsx`)
  ElMessage.success('失败日志已导出')
}

/**
 * 重试导入
 */
const retryImport = () => {
  currentStep.value = 3 // 回到编辑步骤
  importSuccess.value = false
  importErrorMsg.value = ''
}

/**
 * 重置导入向导状态
 */
const resetWizard = () => {
  currentStep.value = 0
  fileList.value = []
  sheetList.value = []
  selectedSheet.value = ''
  excelData.value = []
  headerMatchList.value = []
  validatedData.value = []
  editData.value = []
  currentPage.value = 1
  pageSize.value = 10
  importSuccess.value = false
  successCount.value = 0
  failCount.value = 0
  importErrorMsg.value = ''
  editCell.value = { key: '', value: '' }
  stepLoading.value = false
  importLoading.value = false
  if (stepLoadingTimer.value) {
    clearTimeout(stepLoadingTimer.value)
  }
}

// -------------------------- 核心逻辑 --------------------------
/**
 * 步骤1：上传并解析Excel
 */
const handleBeforeUpload = (file: File) => {
  if (
    ![
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ].includes(file.type)
  ) {
    ElMessage.error('仅支持.xlsx/.xls格式文件')
    return false
  }
  if (file.size > 50 * 1024 * 1024) {
    ElMessage.error('文件大小不能超过50MB')
    return false
  }

  fileList.value = [file] // 只保留最新上传的文件
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      // 获取所有Sheet名称
      sheetList.value = workbook.SheetNames
      selectedSheet.value = sheetList.value[0]
      // 解析选中Sheet的数据（跳过表头行）
      const worksheet = workbook.Sheets[selectedSheet.value]
      excelData.value = XLSX.utils.sheet_to_json(worksheet)

      if (excelData.value.length === 0) {
        ElMessage.warning('该Sheet暂无数据')
        return
      }

      // 提取Excel表头，初始化表头匹配列表
      headerMatchList.value = Object.keys(excelData.value[0] || {}).map((excelHeader) => ({
        excelHeader,
        systemField: '' // 待匹配的系统字段
      }))
    } catch (error) {
      ElMessage.error('Excel解析失败，请检查文件格式')
      console.error('Excel解析错误：', error)
    }
  }

  reader.onerror = () => {
    ElMessage.error('文件读取失败')
  }

  reader.readAsArrayBuffer(file)
  return false // 阻止Element-Plus自动上传
}

/**
 * 步骤2→3：数据校验
 */
const validateData = () => {
  if (headerMatchList.value.length === 0) {
    ElMessage.warning('暂无表头匹配数据')
    return
  }
  // 1. 映射Excel数据到系统字段（根据表头匹配关系）
  const mappedData = excelData.value.map((row) => {
    const mappedRow: any = {}
    headerMatchList.value.forEach(({ excelHeader, systemField }) => {
      mappedRow[systemField] = row[excelHeader]
    })
    // 给每行添加唯一标识（用于行内编辑）
    mappedRow._uid = Math.random().toString(36).slice(2)
    return mappedRow
  })

  // 2. 执行批量校验
  validatedData.value = mappedData.map((row) => {
    const errorMsg: string[] = []
    // 遍历所有校验规则
    Object.entries(props.validateRules).forEach(([field, rules]) => {
      const value = row[field]
      rules.forEach((rule) => {
        // 必填校验
        if (rule.required && (value === undefined || value === null || value === '')) {
          errorMsg.push(rule.message)
        }
        // 正则校验
        if (rule.pattern && value && !rule.pattern.test(value)) {
          errorMsg.push(rule.message)
        }
        // 类型校验
        if (rule.type === 'number' && value && typeof value !== 'number') {
          errorMsg.push(rule.message)
        }
        // 日期格式校验
        if (rule.type === 'date' && value) {
          const dateReg = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/
          if (!dateReg.test(value)) {
            errorMsg.push(rule.message)
          }
        }
      })
    })
    return { ...row, errorMsg: errorMsg.join('；') }
  })

  // 3. 复制到编辑数据
  editData.value = JSON.parse(JSON.stringify(validatedData.value))
}

/**
 * 步骤4→5：执行导入
 */
const handleImport = async () => {
  // 过滤无错误的数据
  const validRows = editData.value.filter((row) => !row.errorMsg)
  if (validRows.length === 0) {
    ElMessage.warning('暂无有效数据可导入，请修正错误后重试')
    return
  }

  importLoading.value = true
  try {
    // 调用外部导入接口
    const res = await props.importApi(validRows)
    successCount.value = res.successCount
    failCount.value = res.failCount
    importSuccess.value = true
    currentStep.value = 4
    ElMessage.success(`导入完成：成功${res.successCount}条，失败${res.failCount}条`)
  } catch (error) {
    importSuccess.value = false
    importErrorMsg.value = (error as Error).message || '导入接口调用失败'
    currentStep.value = 4
    ElMessage.error(`导入失败：${importErrorMsg.value}`)
  } finally {
    importLoading.value = false
  }
}

/**
 * 下一步
 */
const nextStep = () => {
  // 加载状态（避免快速点击）
  stepLoading.value = true
  stepLoadingTimer.value = setTimeout(() => {
    stepLoading.value = false
  }, 800)

  // 步骤1→2：校验
  if (currentStep.value === 0) {
    if (fileList.value.length === 0) {
      ElMessage.warning('请先上传Excel文件')
      stepLoading.value = false
      return
    }
    if (!selectedSheet.value) {
      ElMessage.warning('请选择要导入的Sheet')
      stepLoading.value = false
      return
    }
  }

  // 步骤2→3：校验表头匹配
  if (currentStep.value === 1) {
    if (headerMatchList.value.some((item) => !item.systemField)) {
      ElMessage.warning('请完成所有表头与系统字段的匹配')
      stepLoading.value = false
      return
    }
    // 执行数据校验
    validateData()
  }

  // 步骤3→4：无需额外校验（直接进入编辑）
  currentStep.value++
}

/**
 * 上一步
 */
const prevStep = () => {
  currentStep.value--
  // 重置分页
  currentPage.value = 1
  // 重置编辑状态
  editCell.value = { key: '', value: '' }
}

// -------------------------- 对外暴露方法 --------------------------
defineExpose({
  open: () => {
    dialogVisible.value = true
    resetWizard() // 打开时重置状态
  },
  close: () => {
    dialogVisible.value = false
  }
})

// -------------------------- 样式（局部） --------------------------
</script>

<template>
  <ElDialog title="数据导入向导" v-model="dialogVisible" width="80%" @close="resetWizard">
    <!-- 步骤条 -->
    <ElSteps :active="currentStep" align-center style="margin-bottom: 20px">
      <ElStep title="上传Excel" />
      <ElStep title="表头匹配" />
      <ElStep title="数据校验" />
      <ElStep title="修正错误" />
      <ElStep title="导入完成" />
    </ElSteps>

    <!-- 步骤1：上传Excel -->
    <template v-if="currentStep === 0">
      <ElUpload
        :before-upload="handleBeforeUpload"
        :auto-upload="false"
        drag
        action=""
        :file-list="fileList"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">拖放文件到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip">支持.xlsx/.xls格式，单文件不超过50MB</div>
      </ElUpload>
      <!-- 多Sheet选择（若Excel有多个Sheet） -->
      <ElSelect
        v-if="sheetList.length"
        v-model="selectedSheet"
        style="margin-top: 10px; width: 200px"
      >
        <ElOption v-for="sheet in sheetList" :key="sheet" :label="sheet" :value="sheet" />
      </ElSelect>
    </template>

    <!-- 步骤2：表头匹配 -->
    <template v-else-if="currentStep === 1">
      <div style="margin-bottom: 10px">
        <ElButton type="primary" size="small" @click="autoMatchHeader"> 自动匹配表头 </ElButton>
      </div>
      <ElTable :data="headerMatchList" border style="width: 100%">
        <ElTableColumn prop="excelHeader" label="Excel表头" width="200" />
        <ElTableColumn label="系统字段" width="200">
          <template #default="scope">
            <ElSelect
              v-model="scope.row.systemField"
              placeholder="选择对应字段"
              style="width: 100%"
            >
              <ElOption
                v-for="field in systemFields"
                :key="field.value"
                :label="field.label"
                :value="field.value"
              />
            </ElSelect>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="80">
          <template #default="scope">
            <ElButton
              type="text"
              @click="removeHeaderMatch(scope.row)"
              disabled
              v-if="headerMatchList.length <= 1"
            >
              删除
            </ElButton>
            <ElButton type="text" @click="removeHeaderMatch(scope.row)" v-else text danger>
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </template>

    <!-- 步骤3：数据校验 -->
    <template v-else-if="currentStep === 2">
      <ElTabs v-model="validateTabKey" type="card" style="margin-bottom: 10px">
        <ElTabPane label="全部数据" name="all" />
        <ElTabPane label="仅错误数据" name="error" />
      </ElTabs>
      <ElTable
        :data="filterValidatedData"
        border
        style="width: 100%"
        :row-class-name="rowClassName"
        size="small"
      >
        <ElTableColumn
          v-for="col in displayColumns"
          :key="col"
          :prop="col"
          :label="col"
          min-width="120"
        />
        <ElTableColumn label="错误信息" prop="errorMsg" min-width="200" />
      </ElTable>
      <ElPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterValidatedData.length"
        style="margin-top: 10px; text-align: right"
      />
    </template>

    <!-- 步骤4：修正错误（行内编辑） -->
    <template v-else-if="currentStep === 3">
      <ElTable
        :data="filterEditData"
        border
        style="width: 100%"
        :row-class-name="rowClassName"
        size="small"
        @cell-click="handleCellClick"
        :cell-style="
          ({ row, column }) => ({
            'background-color': editCell.key === `${row._uid}-${column.prop}` ? '#f5f7fa' : ''
          })
        "
      >
        <ElTableColumn
          v-for="col in displayColumns"
          :key="col"
          :prop="col"
          :label="col"
          min-width="120"
        >
          <template #default="scope">
            <!-- 行内编辑输入框 -->
            <div v-if="editCell.key === `${scope.row._uid}-${scope.column.prop}`">
              <ElInput
                v-model="editCell.value"
                @blur="handleCellBlur(scope.row, scope.column.prop)"
                @keyup.enter="handleCellBlur(scope.row, scope.column.prop)"
                ref="editInputRef"
                size="small"
              />
            </div>
            <span v-else>{{ scope.row[scope.column.prop] || '-' }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn label="错误信息" prop="errorMsg" min-width="200">
          <template #default="scope">
            <ElTag type="danger" v-if="scope.row.errorMsg">
              {{ scope.row.errorMsg }}
            </ElTag>
            <ElTag type="success" v-else>校验通过</ElTag>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterEditData.length"
        style="margin-top: 10px; text-align: right"
      />
    </template>

    <!-- 步骤5：导入结果 -->
    <template v-else-if="currentStep === 4">
      <ElResult
        :icon="importSuccess ? 'success' : 'error'"
        :title="importSuccess ? '导入完成' : '导入失败'"
        :subTitle="
          importSuccess
            ? `成功导入：${successCount}条 | 失败：${failCount}条`
            : `导入异常：${importErrorMsg}`
        "
      >
        <template #extra>
          <ElButton type="primary" @click="dialogVisible = false" v-if="importSuccess">
            关闭
          </ElButton>
          <ElButton type="primary" @click="retryImport" v-else> 重试导入 </ElButton>
          <ElButton
            type="text"
            @click="exportErrorLog"
            v-if="failCount > 0"
            style="margin-left: 10px"
          >
            下载失败日志
          </ElButton>
        </template>
      </ElResult>
    </template>

    <!-- 底部操作按钮 -->
    <template #footer>
      <ElButton @click="dialogVisible = false" v-if="currentStep === 0"> 取消 </ElButton>
      <ElButton @click="prevStep" v-if="currentStep > 0 && currentStep < 4"> 上一步 </ElButton>
      <ElButton type="primary" @click="nextStep" v-if="currentStep < 3" :loading="stepLoading">
        下一步
      </ElButton>
      <ElButton
        type="success"
        @click="handleImport"
        v-if="currentStep === 3"
        :loading="importLoading"
      >
        开始导入
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped>
.el-table__row--error {
  --el-table-row-hover-bg-color: #fff2f2 !important;
  background-color: #fff2f2 !important;
}
.el-table__row--error > td {
  color: #f56c6c !important;
}
.result-container {
  text-align: center;
  padding: 20px 0;
}
</style>
