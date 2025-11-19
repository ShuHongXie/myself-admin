<script setup lang="ts">
const options = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
})
</script>

<template>
  <div style="width: 400px; height: 500px">
    <MlChart :options="options"></MlChart>
  </div>
</template>

<style lang="scss" scoped></style>
