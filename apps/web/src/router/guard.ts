import type { Router } from 'vue-router'

import nprogress from 'nprogress'
import { userConfig } from '@minilo/utils'
import { useConfigStore, useRoutesStore, useUserStore } from '@minilo/store'
import { generateRoutes } from './generate'
import { matchRoutes } from './routes'
import { useInitStore } from '#/store/useInitStore'

// 白名单路由（无需登录即可访问）
const WHITE_LIST = ['/auth/login', '/auth/register', '/404']

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
 * 权限访问守卫配置（包含登录认证和动态路由加载）
 * @param router
 */
function setupAccessGuard(router: Router) {
  // 使用闭包变量确保只初始化一次
  let initializing = false

  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const initStore = useInitStore()
    const routesStore = useRoutesStore()
    const configStore = useConfigStore()

    // 检查是否已登录
    const token = userStore.token
    const isAuthenticated = !!token

    // 目标路由是否在白名单中
    const isInWhiteList = WHITE_LIST.includes(to.path)

    // ========== 登录认证检查 ==========
    if (!isAuthenticated) {
      // 未登录
      if (isInWhiteList) {
        // 白名单路由直接放行
        return next()
      } else {
        // 非白名单路由，重定向到登录页
        return next({
          path: '/auth/login',
          query: {
            // 使用 encodeURIComponent 编码 redirect 参数
            redirect: encodeURIComponent(to.fullPath)
          },
          replace: true
        })
      }
    } else {
      // 已登录用户访问登录页，重定向到首页
      if (to.path === '/auth/login') {
        return next({ path: userConfig.app?.defaultHomePath || '/', replace: true })
      }
    }

    // ========== 动态路由加载 ==========
    // 如果未登录，直接放行（白名单已在上面处理）
    if (!isAuthenticated) {
      return next()
    }

    // 如果正在初始化，直接放行
    if (initializing) {
      console.log('🔄 正在初始化，放行:', to.path)
      return next()
    }

    // 检查是否已经初始化过路由
    if (!routesStore.isRouterInitialized) {
      initializing = true
      try {
        // 从服务器加载路由数据
        if (!initStore.routers || initStore.routers.length === 0) {
          await initStore.loadRouters()
        }

        const { dynamicRoutes, menuData } = generateRoutes(initStore.routers)
        const mergeRoutes = [...dynamicRoutes, ...matchRoutes]
        console.log('🔍 即将添加的路由:', mergeRoutes)

        // 添加动态路由
        mergeRoutes.forEach((routes) => {
          router.addRoute('Layout', routes)
          console.log('✅ 已添加路由到 Layout:', routes.path)
        })

        // 关键：必须在 next 之前设置，避免重复初始化
        routesStore.setDynamicRoutes(dynamicRoutes)
        routesStore.setRouterInitialized(true)
        configStore.setMenuData(menuData)
        initializing = false

        console.log(
          '📋 当前所有路由:',
          router.getRoutes().map((r) => ({ name: r.name, path: r.path }))
        )
        console.log('🎯 当前目标路由:', to.path)

        // 检查是否需要跳转到默认路由地址
        if (to.path === '/' && userConfig.app?.defaultHomePath) {
          console.log('🏠 重定向到默认首页:', userConfig.app.defaultHomePath)
          return next({ path: userConfig.app.defaultHomePath, replace: true })
        }

        // 重新触发路由导航，这次会匹配到动态路由
        console.log('🔄 重新导航到:', to.fullPath)
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
  /** 权限访问（包含登录认证） */
  setupAccessGuard(router)
}

export { createRouterGuard }
