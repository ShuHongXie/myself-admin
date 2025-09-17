<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits, onUnmounted, inject } from 'vue'
import { searchProps, SearchTypeEnum, type SearchModel, type SearchProps } from './props'
import { Icon } from '@iconify/vue'
import type { FormInstance } from 'element-plus'

const props = defineProps(searchProps)
const options = ref<SearchProps[]>([])
const searchFormRef = ref<FormInstance>()

// model定义
const searchModel = defineModel<SearchModel>()

// 组件 emits 类型定义
const emit = defineEmits(['submit', 'reset'])

// 视口监听-----------start-------------
const windowWidth = ref(window.innerWidth)
const isCollapse = ref(false)
const rowItemCount = ref(0)

/**
 * @description: 视口监听
 * @return {*}
 * @Author: xieshuhong
 */
const handleResize = () => {
  windowWidth.value = window.innerWidth
  rowItemCount.value = windowWidth.value >= 1900 ? 4 : windowWidth.value >= 1200 ? 3 : 2
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
// 视口监听-----------end-------------

// 操作-----------start-------------
/**
 * @description: 搜索
 * @return {*}
 * @Author: xieshuhong
 */
const handleSubmit = () => {
  emit('submit')
}

/**
 * @description: 重置
 * @return {*}
 * @Author: xieshuhong
 */
const handleReset = () => {
  searchFormRef.value?.resetFields()
  emit('reset')
}

// 操作-----------end-------------

// 生命周期钩子
onMounted(() => {
  console.log(props)

  // 组装项
  const itemProps = props.item.map((item) => ({
    type: SearchTypeEnum.ITEM,
    ...item
  }))
  const slotProps = props.slots.map((item) => ({
    type: SearchTypeEnum.SLOT,
    ...item
  }))
  slotProps.forEach((item) => {
    itemProps.splice(item.position || 0, 0, item)
  })
  options.value = itemProps
  console.log('配置项的值:', options.value)
})

defineExpose({})
</script>

<template>
  <div class="search">
    <el-form
      :size="size"
      :label-position="labelPosition"
      :inline="inline"
      :model="searchModel"
      :label-width="labelWidth"
      ref="searchFormRef"
    >
      <div class="search-content">
        <div class="search-content__left">
          <el-row :gutter="gutter">
            <template v-for="(item, index) in options" :key="item.prop">
              <el-col
                v-show="!isCollapse ? index <= rowItemCount : true"
                :span="span"
                v-bind="item.colProps"
              >
                <el-form-item v-bind="item.formItemProps" :prop="item.prop">
                  <template v-if="item.type === SearchTypeEnum.SLOT">
                    <slot :name="item.prop" :searchModel="searchModel"></slot>
                  </template>
                  <template v-else>
                    <!-- 输入框 -->
                    <el-input
                      v-if="item.input.type === 'input'"
                      v-model="searchModel![item.prop]"
                      v-bind="item.input.props"
                      clearable
                    />
                    <!-- 筛选框 -->
                    <el-select
                      v-if="item.input.type === 'select'"
                      v-model="searchModel![item.prop]"
                      v-bind="item.input.props"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        v-for="subItem in item.input.props.options"
                        :key="subItem.value"
                        :label="subItem[item.input.props.labelKey]"
                        :value="subItem[item.input.props.valueKey]"
                        :disabled="subItem.disabled"
                      />
                    </el-select>
                    <!-- 时间选择框 -->
                    <el-date-picker
                      v-if="item.input.type === 'date-picker'"
                      v-model="searchModel![item.prop]"
                      v-bind="item.input.props"
                      value-format="x"
                    />
                  </template>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </div>
        <div class="search-content__right">
          <el-form-item label="操作">
            <el-button type="primary" :size="size" :loading="false" @click.stop="handleSubmit">
              {{ submitBtnText }}
            </el-button>
            <el-button :loading="false" @click.stop="handleReset">
              {{ resetBtnText }}
            </el-button>
          </el-form-item>
        </div>
      </div>
      <el-row class="search-collapse" v-if="options.length > rowItemCount">
        <el-link type="primary" underline="never" @click="isCollapse = !isCollapse">
          {{ isCollapse ? '收起' : '展开' }}更多筛选条件
          <Icon :icon="isCollapse ? 'ep:arrow-up' : 'ep:arrow-down'" />
        </el-link>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/mixin.scss' as *;
.search {
  width: 100%;
  &-content {
    @include flex-between-start;
    .el-form-item {
      margin-bottom: 6px;
    }
    &__left {
      flex: 1;
    }
    &__right {
      margin-left: 12px;
    }
  }
  &-collapse {
    margin-bottom: 10px;
  }
}
</style>
