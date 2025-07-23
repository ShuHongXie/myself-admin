import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { routes } from './routes'

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  // 应该添加到路由的初始路由列表。
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  }
})

// const resetRoutes = () =>  resetStaticRoutes(router, routes)
const resetRoutes = () => {}

export { resetRoutes, router }
