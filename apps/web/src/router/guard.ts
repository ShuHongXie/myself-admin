import type { Router } from 'vue-router'

import nprogress from 'nprogress'
import { userConfig } from '@myself/utils'
// import { data as routerData } from './routerData'

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
  router.beforeEach(() => {
    return true
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
