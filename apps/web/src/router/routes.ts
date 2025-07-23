import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    component: () => import('#/views/@core/404.vue'),
    meta: {
      hideInBreadcrumb: true,
      hideInMenu: true,
      hideInTab: true,
      title: '404'
    },
    name: 'FallbackNotFound',
    path: '/:path(.*)*'
  },
  {
    path: '/test',
    component: () => import('#/views/test.vue')
  }
]
