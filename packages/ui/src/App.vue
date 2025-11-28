<script setup lang="ts">
import testSearch from './preview/testSearch.vue'
import virtualList from './components/virtual-list/index.vue'
</script>

<template>
  <div>
    <!-- <testSearch></testSearch> -->
    <virtualList></virtualList>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
