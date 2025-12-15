<script setup lang="ts">
import MlSearch from '../search/index.vue'
import { ref, onMounted, useAttrs } from 'vue'
import { searchTableProps, RequestMethodType } from './props'
import { type SearchModel } from '../search/props'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { getNestedValue, type AxiosRequestConfig, initRequestInstance } from '@minilo/utils'
import Render from './render'
import { bem } from '../../utils'

defineOptions({
  name: 'MlSearchTable',
  inheritAttrs: false
})

interface Pagination {
  currentPage: number
  pageSize: number
  total: number
}

const searchModel = defineModel<SearchModel>('search')
const props = defineProps(searchTableProps)
const attrs = useAttrs()
const emit = defineEmits(['reset'])

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

// 过滤出 el-table 的事件监听器
const tableListeners = Object.keys(attrs).reduce((listeners: Record<string, any>, key) => {
  if (key.startsWith('on')) {
    listeners[key] = attrs[key]
  }
  return listeners
}, {})

// 其他逻辑初始化-----------end-------------
</script>

<template>
  <div :class="bem('search-table')">
    <MlSearch @submit="submit" @reset="reset" v-model="searchModel" v-bind="searchProps">
      <template :key="item.prop" #[item.prop] v-for="item in searchProps.slots">
        <slot :name="item.prop"></slot>
      </template>
    </MlSearch>
    <slot name="prefix"></slot>
    <el-table
      v-loading.lock="loading"
      v-on="tableListeners"
      :class="bem('search-table', 'content')"
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
          <Render v-if="item.render" :scope="scope" :render="item.render" />
        </template>
      </el-table-column>
    </el-table>
    <div :class="bem('search-table', 'pagination')">
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
