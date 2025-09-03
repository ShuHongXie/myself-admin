<script setup lang="ts">
import { Search } from '../Search'
import { ref, reactive, onMounted, defineProps, defineEmits, toRaw, provide } from 'vue'
import { searchTableProps, RequestMethodType } from './props'
import { SearchModel } from '../Search/props'
import { AxiosRequestConfig, initRequestInstance, type ApiResponse } from '@myself/utils'

const searchModel = defineModel<SearchModel>('search')
const props = defineProps(searchTableProps)
const emit = defineEmits(['select', 'select-all', 'selection-change'])

// 列表初始化-----------start-------------
const axios = initRequestInstance({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: props.headers
})
const data = ref([])
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100
})
const searchProps = ref({
  slots: props.searchProps.slots
})

/**
 * @description: 请求数据
 * @return {*}
 * @Author: xieshuhong
 */
const handleRequest = async () => {
  try {
    const params = {
      ...searchModel.value,
      pageSize: pagination.value.pageSize,
      currentPage: pagination.value.currentPage
    }
    console.log(params)

    const requestParams = [RequestMethodType.GET, RequestMethodType.DELETE].includes(
      props.methodType
    )
      ? { params }
      : params
    const res = await axios[props.methodType as RequestMethodType]<ApiResponse<string[]>>(
      props.url,
      requestParams as AxiosRequestConfig
    )
    data.value = [...res.result]
    pagination.value.total = res.total
  } catch (error) {
    console.log(error)
  }
}

provide('handleSubmit', () => {
  console.log('搜索')
})
provide('handleReset', () => {
  console.log('重置')
})

// 初始化逻辑
onMounted(() => {
  handleRequest()
})
// 列表初始化-----------end-------------

// 其他逻辑初始化-----------start-------------
// 事件统一发出
const emitEventHandler = (...args) => {
  emit(args[0], ...args.slice(1))
}
// 其他逻辑初始化-----------end-------------
</script>

<template>
  <div class="search-table">
    <Search v-model="searchModel" v-bind="searchProps">
      <template :key="item.prop" #[item.prop] v-for="item in searchProps.slots">
        <slot :name="item.prop"></slot>
      </template>
    </Search>
    <slot name="prefix"></slot>
    <el-table
      @select="(selection, row) => emitEventHandler('select', selection, row)"
      @select-all="(selection) => emitEventHandler('select-all', selection)"
      @selection-change="(selection) => emitEventHandler('selection-change', selection)"
      class="search-table__content"
      v-bind="tableProps"
      :data="data"
    >
      <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item">
        <template v-if="item.slotName" #default="scope">
          <slot :name="item.slotName" :index="scope.$index" :row="scope.row"></slot>
        </template>
        <!-- <template v-e>
          <span>{{ item[item.prop] }}</span>
        </template> -->
      </el-table-column>
    </el-table>
    <div class="search-table__pagination">
      <el-pagination
        style="margin-top: 10px"
        v-if="showPagination"
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:page-size="pagination.pageSize"
        v-model:current-page="pagination.currentPage"
        :total="pagination.total"
      />
    </div>
    <slot name="suffix"></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/mixin.scss' as *;
.search-table {
  height: 100%;
  @include flex-col-start-start;
  :deep(.el-table) {
    border-radius: 8px 8px 0 0;
    th {
      background-color: #f3f3f3;
    }
  }
  &__content {
    width: 100%;
    margin-top: 10px;
    flex: 1;
  }
  &__pagination {
    width: 100%;
    @include flex-end-center;
    .el-pagination {
      @include flex-end-center;
    }
  }
}
</style>
