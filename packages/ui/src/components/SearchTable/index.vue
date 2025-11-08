<script setup lang="ts">
import MsSearch from '../Search/index.vue'
import { ref, onMounted, defineProps } from 'vue'
import { searchTableProps, RequestMethodType } from './props'
import { type SearchModel } from '../Search/props'
import { getNestedValue, type AxiosRequestConfig, initRequestInstance } from '@myself/utils'
import Render from './render'

defineOptions({ name: 'MsSearchTable' })

interface Pagination {
  currentPage: number
  pageSize: number
  total: number
}

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
  baseURL: '',
  headers: props.headers
})
const data = ref([])
const loading = ref(false)
const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 20,
  total: 100
})

/**
 * @description: 请求数据
 * @return {*}
 * @Author: xieshuhong
 */
const handleSearch = async (reset = true) => {
  try {
    if (reset) {
      pagination.value.currentPage = 1
    }
    const defaultParams = {
      ...searchModel.value
    }

    // 是否需要分页
    if (props.showPagination) {
      Object.assign(defaultParams, {
        pageSize: pagination.value.pageSize,
        currentPage: pagination.value.currentPage
      })
    }

    // 参数合并
    const params = props.paramsHandler ? props.paramsHandler(defaultParams) : defaultParams
    const requestParams = [RequestMethodType.GET, RequestMethodType.DELETE].includes(
      props.methodType
    )
      ? { params }
      : params
    loading.value = true
    const res = await axios[props.methodType as RequestMethodType](
      props.url,
      requestParams as AxiosRequestConfig
    )
    data.value = getNestedValue(res, props.responseDataField)
    if (props.showPagination) {
      pagination.value.total = getNestedValue(res, props.responseTotalField)
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const submit = () => {
  handleSearch()
}
const reset = () => {
  emit('reset')
  handleSearch()
}

// 初始化逻辑
onMounted(() => {
  handleSearch()
})
defineExpose({
  handleSearch
})
// 列表初始化-----------end-------------

// 其他逻辑初始化-----------start-------------

/**
 * @description: 事件传递处理函数
 * @param {array} args
 * @return {*}
 * @Author: xieshuhong
 */
const emitEventHandler = (...args: any) => {
  emit(args[0], ...args.slice(1))
}
// 其他逻辑初始化-----------end-------------
</script>

<template>
  <div class="search-table">
    <MsSearch @submit="submit" @reset="reset" v-model="searchModel" v-bind="searchProps">
      <template :key="item.prop" #[item.prop] v-for="item in searchProps.slots">
        <slot :name="item.prop"></slot>
      </template>
    </MsSearch>
    <slot name="prefix"></slot>
    <el-table
      v-loading.lock="loading"
      @select="(selection: any, row: any) => emitEventHandler('select', selection, row)"
      @select-all="(selection: any) => emitEventHandler('select-all', selection)"
      @selection-change="(selection: any) => emitEventHandler('selection-change', selection)"
      @cell-mouse-enter="
        (row: any, column: any, cell: any, event: any) =>
          emitEventHandler('cell-mouse-enter', row, column, cell, event)
      "
      @cell-mouse-leave="
        (row: any, column: any, cell: any, event: any) =>
          emitEventHandler('cell-mouse-leave', row, column, cell, event)
      "
      @cell-click="
        (row: any, column: any, cell: any, event: any) =>
          emitEventHandler('cell-click', row, column, cell, event)
      "
      @cell-dblclick="
        (row: any, column: any, cell: any, event: any) =>
          emitEventHandler('cell-dblclick', row, column, cell, event)
      "
      @row-click="
        (row: any, event: any, column: any) => emitEventHandler('row-click', row, event, column)
      "
      @row-dblclick="(row: any, event: any) => emitEventHandler('row-dblclick', row, event)"
      @row-contextmenu="(row: any, event: any) => emitEventHandler('row-contextmenu', row, event)"
      @header-click="(column: any, event: any) => emitEventHandler('header-click', column, event)"
      @sort-change="(args: any) => emitEventHandler('sort-change', args)"
      @filter-change="(filters: any) => emitEventHandler('filter-change', filters)"
      @current-change="
        (currentRow: any, oldCurrentRow: any) =>
          emitEventHandler('current-change', currentRow, oldCurrentRow)
      "
      @header-dragend="
        (newWidth: any, oldWidth: any, column: any, event: any) =>
          emitEventHandler('header-dragend', newWidth, oldWidth, column, event)
      "
      @expand-change="(row: any, expanded: any) => emitEventHandler('expand-change', row, expanded)"
      class="search-table__content"
      v-bind="tableProps"
      :border="true"
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
        @change="handleSearch(false)"
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

<!-- <style lang="scss">
@use '../Search/index.scss' as *;
@use './index.scss' as *;
</style> -->
