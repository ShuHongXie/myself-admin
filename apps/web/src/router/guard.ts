import type { Router } from 'vue-router'

import nprogress from 'nprogress'

/**
 * 通用守卫配置
 * @param router
 */
function setupCommonGuard(router: Router) {
  router.beforeEach(() => {
    nprogress.start()
    return true
  })

  router.afterEach(() => {
    nprogress.done()
  })
}

/**
 * 权限访问守卫配置
 * @param router
 */
// function setupAccessGuard(router: Router) {}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 通用 */
  setupCommonGuard(router)
  /** 权限访问 */
  // setupAccessGuard(router)
}

export { createRouterGuard }
