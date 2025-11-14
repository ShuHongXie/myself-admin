import type { Router } from 'vue-router'

import nprogress from 'nprogress'
import { userConfig } from '@minilo/utils'
import { useConfigStore, useRoutesStore } from '@minilo/store'
import { generateRoutes } from './generate'
import { matchRoutes } from './routes'
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
  // 使用闭包变量确保只初始化一次
  let initializing = false

  router.beforeEach(async (to, from, next) => {
    const initStore = useInitStore()
    const routesStore = useRoutesStore()
    const configStore = useConfigStore()

    // 如果正在初始化，直接放行
    if (initializing) {
      return next()
    }

    // 检查是否已经初始化过路由
    if (!routesStore.isRouterInitialized) {
      initializing = true
      // 加载路由表
      try {
        // 只有当路由数据为空时才重新加载
        if (!initStore.routers || initStore.routers.length === 0) {
          await initStore.loadRouters()
        }

        const { dynamicRoutes, menuData } = generateRoutes(initStore.routers)
        const mergeRoutes = [...dynamicRoutes, ...matchRoutes]

        // 添加动态路由
        mergeRoutes.forEach((routes) => {
          router.addRoute('Layout', routes)
        })

        // 设置路由状态
        routesStore.setDynamicRoutes(dynamicRoutes)
        routesStore.setRouterInitialized(true)
        configStore.setMenuData(menuData)

        // 检查是否需要跳转到默认路由地址
        // 如果当前路径是根路径'/'，则跳转到配置的默认首页路径
        if (to.path === '/' && userConfig.app?.defaultHomePath) {
          initializing = false
          return next({ path: userConfig.app.defaultHomePath, replace: true })
        }

        // 使用 replace: true 避免重复触发路由守卫
        initializing = false
        return next({ ...to, replace: true })
      } catch (error) {
        console.error('加载路由失败:', error)
        initializing = false
        return next(false)
      }
    }

    // 如果已经初始化过路由，直接放行
    next()
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
