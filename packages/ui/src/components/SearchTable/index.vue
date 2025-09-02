<script setup lang="ts">
import { Search } from '../Search'
import { ref, reactive, onMounted, defineProps, defineEmits, toRaw } from 'vue'
import { searchTableProps, RequestMethodType } from './props'
import { SearchModel } from '../Search/props'
import { AxiosRequestConfig, initRequestInstance } from '@myself/utils'

const searchModel = defineModel<SearchModel>('search')
const props = defineProps(searchTableProps)

// 列表初始化-----------start-------------
const axios = initRequestInstance({
  headers: props.headers
})
const data = reactive([])
const pagination = reactive({})

/**
 * @description: 请求数据
 * @return {*}
 * @Author: xieshuhong
 */
const handleRequest = async () => {
  try {
    const params = toRaw(searchModel)
    const requestParams = [RequestMethodType.GET, RequestMethodType.DELETE].includes(
      props.requestType
    )
      ? { params }
      : params
    const res = await axios[props.requestType as RequestMethodType](
      props.url,
      requestParams as AxiosRequestConfig
    )
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
    <el-pagination background layout="prev, pager, next" :total="1000" />
    <slot name="suffix"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
