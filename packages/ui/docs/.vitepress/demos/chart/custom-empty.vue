<script setup>
import { ref } from 'vue'

const chartOptions = ref({
  title: {
    text: '销售数据统计'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
})

const isEmpty = ref(true)
</script>

<template>
  <div>
    <el-button @click="isEmpty = !isEmpty" style="margin-bottom: 10px"> 切换空状态 </el-button>
    <ml-chart :options="chartOptions" :is-empty="isEmpty">
      <template #empty>
        <div style="text-align: center; padding: 40px">
          <div style="font-size: 48px; margin-bottom: 16px">📊</div>
          <p style="font-size: 16px; color: #666">暂无数据</p>
          <p style="font-size: 14px; color: #999; margin-top: 8px">请选择日期范围查看数据</p>
        </div>
      </template>
    </ml-chart>
  </div>
</template>
