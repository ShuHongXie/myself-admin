import type { RouteRecordRaw } from 'vue-router'
export const staticRoutes: RouteRecordRaw[] = [
  {
    component: () => import('#/@core/Layout.vue'),
    meta: {
      hideInBreadcrumb: true,
      title: 'Root'
    },
    name: 'Root',
    path: '/',
    redirect: '/home',
    children: [
      {
        name: 'Hpme',
        path: 'home',
        component: () => import('#/views/home.vue'),
        meta: {
          title: 'home页',
          hideInBreadcrumb: true
        }
      }
    ]
  },
  {
    component: () => import('#/@core/Auth.vue'),
    meta: {
      hideInTab: true,
      title: 'Authentication'
    },
    name: 'Authentication',
    path: '/auth',
    redirect: '/auth/login',
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('#/@core/Login.vue'),
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    component: () => import('#/@core/NotFound.vue'),
    meta: {
      hideInBreadcrumb: true,
      hideInMenu: true,
      hideInTab: true,
      title: '404'
    },
    name: 'FallbackNotFound',
    path: '/404'
  }
]

export const matchRoutes: RouteRecordRaw[] = [
  {
    path: '/:path(.*)*',
    redirect: '/404',
    meta: {
      hideInBreadcrumb: true,
      hideInMenu: true,
      hideInTab: true,
      title: '404'
    }
  }
]
