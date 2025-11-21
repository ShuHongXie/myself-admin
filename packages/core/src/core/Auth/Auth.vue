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
  padding: 1rem;
  &-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 500px;
    min-width: 320px;
    padding: 2rem;
    border-radius: 1.5rem;
    background-color: #fff;
    box-shadow: 0 6px 16px 0px rgb(255 38 5 / 6%) !important;
    // 响应式设计
    @media (min-width: 768px) {
      width: 500px;
    }
    @media (max-width: 767px) {
      padding: 1.5rem;
      max-width: 400px;
    }
    @media (max-width: 480px) {
      padding: 1rem;
      min-width: 280px;
    }
  }
}
</style>
