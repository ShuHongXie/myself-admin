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
      return next()
    }

    // 检查是否已经初始化过路由
    // 注意：页面刷新后 isRouterInitialized 会重置为 false，但 dynamicRoutes 会被持久化
    if (!routesStore.isRouterInitialized) {
      initializing = true
      try {
        // 如果存在持久化的动态路由，直接使用它们重新注册
        if (routesStore.dynamicRoutes && routesStore.dynamicRoutes.length > 0) {
          const mergeRoutes = [...routesStore.dynamicRoutes, ...matchRoutes]

          // 重新添加动态路由到 router 实例
          mergeRoutes.forEach((routes) => {
            router.addRoute('Layout', routes)
          })

          // 标记路由已初始化（menuData 已经被 configStore 持久化，无需重新设置）
          routesStore.setRouterInitialized(true)

          // 使用 replace: true 避免重复触发路由守卫
          initializing = false
          return next({ ...to, replace: true })
        }

        // 如果没有持久化的路由数据，则从服务器加载
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
  /** 权限访问（包含登录认证） */
  setupAccessGuard(router)
}

export { createRouterGuard }
