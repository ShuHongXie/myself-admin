<script setup lang="ts">
import { Search } from '../Search'
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { searchTableProps } from './props'
import { SearchModel } from '../Search/props'

const searchModel = defineModel<SearchModel>('search')
const props = defineProps(searchTableProps)
const data = reactive([])
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
