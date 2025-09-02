<script setup lang="ts">
import { Search } from '../Search'
import { ref, reactive, onMounted, defineProps, defineEmits, toRaw, provide } from 'vue'
import { searchTableProps, RequestMethodType } from './props'
import { SearchModel } from '../Search/props'
import { AxiosRequestConfig, initRequestInstance } from '@myself/utils'

const searchModel = defineModel<SearchModel>('search')
const props = defineProps(searchTableProps)

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
    const res = await axios[props.methodType as RequestMethodType](
      props.url,
      requestParams as AxiosRequestConfig
    )
    data.value = res.result
    pagination.value.total = res.total
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

// 初始化逻辑
onMounted(() => {
  handleRequest()
})

// 列表初始化-----------end-------------

provide('handleSubmit', () => {
  console.log('搜索')
})
provide('handleReset', () => {
  console.log('重置')
})
</script>

<template>
  <div class="search-table">
    <Search v-model="searchModel" v-bind="searchProps">
      <template :key="item.prop" #[item.prop] v-for="item in searchProps.slots">
        <slot :name="item.prop"></slot>
      </template>
    </Search>
    <slot name="prefix"></slot>
    <el-table v-bind="tableProps" :data="data" style="width: 100%">
      <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item" />
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      v-if="showPagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="pagination.pageSize"
      v-model:current-page="pagination.currentPage"
      :total="pagination.total"
    />
    <slot name="suffix"></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/mixin.scss' as *;
.search-table {
  .el-pagination {
    @include flex-end-center;
  }
}
</style>
