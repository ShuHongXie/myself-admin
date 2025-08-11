import 'vue-router'

declare module 'vue-router' {
  // 扩展多视图带子路由的路由记录接口
  interface RouteRecordMultipleViewsWithChildren {
    // 覆盖原有component: never的定义，允许string类型
    component?: RawRouteComponent | string | null | undefined
  }
}

export * from 'vue-router'
