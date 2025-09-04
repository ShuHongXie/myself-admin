<script setup lang="ts">
import { Search } from '../Search'
import { ref, reactive, onMounted, defineProps, defineEmits, toRaw, provide } from 'vue'
import { searchTableProps, RequestMethodType } from './props'
import { SearchModel } from '../Search/props'
import { AxiosRequestConfig, initRequestInstance, type ApiResponse } from '@myself/utils'
import Render from './render'

const searchModel = defineModel<SearchModel>('search')
const props = defineProps(searchTableProps)
const emit = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'reset',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change'
])

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

/**
 * @description: 请求数据
 * @return {*}
 * @Author: xieshuhong
 */
const handleRequest = async (reset = true) => {
  try {
    if (reset) {
      pagination.value.currentPage = 1
    }
    const defaultParams = {
      ...searchModel.value,
      pageSize: pagination.value.pageSize,
      currentPage: pagination.value.currentPage
    }
    // 参数合并
    const params = props.paramsHandler ? props.paramsHandler(defaultParams) : defaultParams
    const requestParams = [RequestMethodType.GET, RequestMethodType.DELETE].includes(
      props.methodType
    )
      ? { params }
      : params
    const res = await axios[props.methodType as RequestMethodType](
      props.url,
      requestParams as AxiosRequestConfig
    )
    data.value = [...res.result]
    pagination.value.total = res.total
  } catch (error) {
    console.log(error)
  }
}

provide('submit', () => {
  handleRequest()
})
provide('reset', () => {
  emit('reset')
  handleRequest()
})

// 初始化逻辑
onMounted(() => {
  handleRequest()
})
// 列表初始化-----------end-------------

// 其他逻辑初始化-----------start-------------

/**
 * @description: 事件传递处理函数
 * @param {array} args
 * @return {*}
 * @Author: xieshuhong
 */
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
      @cell-mouse-enter="
        (row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)
      "
      @cell-mouse-leave="
        (row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)
      "
      @cell-click="
        (row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)
      "
      @cell-dblclick="
        (row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)
      "
      @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
      @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
      @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
      @header-click="(column, event) => emitEventHandler('header-click', column, event)"
      @sort-change="(args) => emitEventHandler('sort-change', args)"
      @filter-change="(filters) => emitEventHandler('filter-change', filters)"
      @current-change="
        (currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)
      "
      @header-dragend="
        (newWidth, oldWidth, column, event) =>
          emitEventHandler('header-dragend', newWidth, oldWidth, column, event)
      "
      @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)"
      class="search-table__content"
      v-bind="tableProps"
      :data="data"
    >
      <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item">
        <template #default="scope">
          <slot
            v-if="item.slotName"
            :name="item.slotName"
            :index="scope.$index"
            :row="scope.row"
          ></slot>
          <!-- 渲染函数 -->
          <Render v-if="item.render" :scope="scope" :render="item.render" />
        </template>
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
