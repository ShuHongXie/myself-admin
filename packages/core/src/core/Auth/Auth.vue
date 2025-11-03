<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="auth">
    <div class="auth-wrap">
      <RouterView v-slot="{ Component, route }">
        <Transition appear mode="out-in" name="slide-right">
          <KeepAlive :include="['Login']">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  height: 100%;
  background: linear-gradient(154deg, #07070915 30%, hsla(212, 78%, 48%, 0.3) 48%, #07070915 64%);
  display: flex;
  justify-content: center;
  align-items: center;
  &-wrap {
    position: relative;
    z-index: 2;
    width: 50%;
    max-width: 500px;
    padding: 2rem;
    border-radius: 1.5rem;
    background-color: #fff;
    box-shadow: 0 6px 16px 0px rgb(255 38 5 / 6%) !important;
  }
}
</style>
