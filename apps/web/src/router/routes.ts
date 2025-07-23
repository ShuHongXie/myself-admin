import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('#/views/test.vue')
  },
  {
    component: () => import('#/views/@core/NotFound.vue'),
    meta: {
      hideInBreadcrumb: true,
      hideInMenu: true,
      hideInTab: true,
      title: '404'
    },
    name: 'FallbackNotFound',
    path: '/:path(.*)*'
  }
]
