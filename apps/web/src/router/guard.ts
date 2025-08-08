// import type { Router } from 'vue-router'

// import nprogress from 'nprogress'
// import { userConfig, LOGIN_PATH } from '@myself/utils'
// import { useRoutesStore, useUserStore } from '@myself/store'
// import { generateRoutes } from './generate'
// import { matchRoutes } from './routes'
// import { toRaw } from 'vue'

// /**
//  * 通用守卫配置
//  * @param router
//  */
// function setupCommonGuard(router: Router) {
//   const loadedPaths = new Set<string>()
//   router.beforeEach((to) => {
//     to.meta.loaded = loadedPaths.has(to.path)

//     // 页面加载进度条
//     if (!to.meta.loaded && userConfig.transition?.progress) {
//       nprogress.start()
//     }
//     return true
//   })

//   router.afterEach((to) => {
//     loadedPaths.add(to.path)
//     // 关闭页面加载进度条
//     if (userConfig.transition?.progress) {
//       nprogress.done()
//     }
//   })
// }

// /**
//  * 权限访问守卫配置
//  * @param router
//  */
// function setupAccessGuard(router: Router) {
//   router.beforeEach((to, from) => {
//     const userStore = useUserStore()
//     const routesStore = useRoutesStore()

//     // 默认可进入的路由，需要屏蔽掉404
//     // if (routesStore.accessStaticRouteList.includes(to.path)) {
//     //   if (!userStore.tokenInfo?.accessToken && to.path === LOGIN_PATH) {
//     //     return decodeURIComponent(to.query.redirect as string) || userConfig.app?.defaultHomePath
//     //   }
//     //   return true
//     // }

//     // // 未登录时统一跳转登录
//     // if (!userStore.tokenInfo?.accessToken) {
//     //   if (to.fullPath !== LOGIN_PATH) {
//     //     return {
//     //       path: LOGIN_PATH,
//     //       // 如不需要，直接删除 query
//     //       query:
//     //         to.fullPath === userConfig.app?.defaultHomePath
//     //           ? {}
//     //           : { redirect: encodeURIComponent(to.fullPath) },
//     //       // 携带当前跳转的页面，登录后重新跳转该页面
//     //       replace: true
//     //     }
//     //   }
//     //   return to
//     // }

//     // if (routesStore.isExistConfigRoute.value) {
//     //   return true
//     // }
//     // const { menuData, dynamicRoutes } = generateRoutes()
//     // console.log(routesStore.staticRoutes[0])

//     // const mergeRoutes = [...toRaw(routesStore.staticRoutes), ...dynamicRoutes, ...matchRoutes]
//     // mergeRoutes.forEach((routes) => {
//     //   router.addRoute(routes)
//     // })

//     // console.log(mergeRoutes)
//     // console.log(router.getRoutes())

//     // routesStore.setDynamicRoutes(dynamicRoutes)
//     // routesStore.setMergeRoutes(mergeRoutes)
//     // const redirectPath = (from.query.redirect ??
//     //   (to.path === userConfig.app?.defaultHomePath
//     //     ? userConfig.app?.defaultHomePath
//     //     : to.fullPath)) as string
//     // console.log(redirectPath)

//     // return {
//     //   ...router.resolve(decodeURIComponent(redirectPath)),
//     //   replace: true
//     // }
//     return true
//   })
// }

// /**
//  * 项目守卫配置
//  * @param router
//  */
// function createRouterGuard(router: Router) {
//   /** 通用 */
//   setupCommonGuard(router)
//   /** 权限访问 */
//   // setupAccessGuard(router)
// }

// export { createRouterGuard }
