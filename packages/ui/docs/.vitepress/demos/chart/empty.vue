<script setup>
import { ref } from 'vue'

const chartOptions = ref({
  title: {
    text: '折线图示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['销售额', '利润']
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销售额',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
      smooth: true
    },
    {
      name: '利润',
      type: 'line',
      data: [60, 100, 80, 50, 40, 70, 90],
      smooth: true
    }
  ]
})

const isEmpty = ref(false)
</script>

<template>
  <div>
    <el-button @click="isEmpty = !isEmpty" style="margin-bottom: 10px"> 切换空状态 </el-button>
    <ml-chart
      :options="chartOptions"
      :is-empty="isEmpty"
      description="暂无图表数据"
      style="height: 400px"
    />
  </div>
</template>
