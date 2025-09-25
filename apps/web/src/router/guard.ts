import type { Router } from 'vue-router'

import nprogress from 'nprogress'
import { userConfig } from '@myself/utils'
import { useConfigStore, useRoutesStore } from '@myself/store'
import { generateRoutes } from './generate'
import { matchRoutes } from './routes'
import { toRaw } from 'vue'
import { useInitStore } from '#/store/useInitStore'

/**
 * 通用守卫配置
 * @param router
 */
function setupCommonGuard(router: Router) {
  const loadedPaths = new Set<string>()
  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path)

    // 页面加载进度条
    if (!to.meta.loaded && userConfig.transition?.progress) {
      nprogress.start()
    }
    return true
  })

  router.afterEach((to) => {
    loadedPaths.add(to.path)
    // 关闭页面加载进度条
    if (userConfig.transition?.progress) {
      nprogress.done()
    }
  })
}

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    // const userStore = useUserStore()
    const initStore = useInitStore()
    const routesStore = useRoutesStore()
    const configStore = useConfigStore()

    // 默认可进入的路由，需要屏蔽掉404
    // if (routesStore.accessStaticRouteList.includes(to.path)) {
    //   if (!userStore.tokenInfo?.accessToken && to.path === LOGIN_PATH) {
    //     return decodeURIComponent(to.query.redirect as string) || userConfig.app?.defaultHomePath
    //   }
    //   return true
    // }

    // 未登录时统一跳转登录
    // if (!userStore.tokenInfo?.accessToken) {
    //   if (to.fullPath !== LOGIN_PATH) {
    //     return {
    //       path: LOGIN_PATH,
    //       // 如不需要，直接删除 query
    //       query:
    //         to.fullPath === userConfig.app?.defaultHomePath
    //           ? {}
    //           : { redirect: encodeURIComponent(to.fullPath) },
    //       // 携带当前跳转的页面，登录后重新跳转该页面
    //       replace: true
    //     }
    //   }
    //   return to
    // }
    console.log('routesStore.mergeRoutes.length:', routesStore.mergeRoutes.length)

    if (routesStore.mergeRoutes.length) {
      return true
    }
    // 加载路由表
    await initStore.loadRouters()
    const { dynamicRoutes, menuData } = generateRoutes(initStore.routers)
    const mergeRoutes = [...toRaw(routesStore.staticRoutes), ...dynamicRoutes, ...matchRoutes]
    mergeRoutes.forEach((routes) => {
      router.addRoute(routes)
    })
    routesStore.setDynamicRoutes(dynamicRoutes)
    routesStore.setMergeRoutes(mergeRoutes)
    configStore.setMenuData(menuData)
    console.log('路由:', router.getRoutes())
    console.log('菜单:', configStore.menuData)
    const redirectPath = (from.query.redirect ??
      (to.path === userConfig.app?.defaultHomePath
        ? userConfig.app?.defaultHomePath
        : to.fullPath)) as string

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true
    }
  })
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 通用 */
  setupCommonGuard(router)
  /** 权限访问 */
  setupAccessGuard(router)
}

export { createRouterGuard }
