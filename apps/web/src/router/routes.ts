import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('#/views/test.vue')
  },
  // {
  //   component: BasicLayout,
  //   meta: {
  //     hideInBreadcrumb: true,
  //     title: 'Root'
  //   },
  //   name: 'Root',
  //   path: '/',
  //   redirect: preferences.app.defaultHomePath,
  //   children: []
  // },
  {
    component: () => import('#/views/@core/Auth.vue'),
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
        component: () => import('#/views/@core/Login.vue'),
        meta: {
          title: '登录'
        }
      }
    ]
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
