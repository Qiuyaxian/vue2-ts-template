import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NProgress from 'nprogress'
import appConfig from '@/app.config'
import { _import, routeCheckAuth } from './utils'
// 解决无法使用组件路由钩子（https://segmentfault.com/q/1010000017335734）
import Component from 'vue-class-component'
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

Vue.use(VueRouter)

// 设定主入口，通过替换children实现动态路由
let appRoutes: RouteConfig[] = []
let staticRoutes: RouteConfig[] = []
let asyncRoutes: Function[] = []
const mainRoute: RouteConfig = {
  path: '/',
  name: 'Main',
  meta: {
    noAuthRequired: false
  },
  redirect: () => '/home',
  component: _import('Main')
}

// 查找当前目录下所有的非单元测试 js 文件
const routeModules = require.context('./modules', true, /\.(ts|tsx)?$/)
routeModules.keys().forEach((fileName: string) => {
  const routeModuleItem =
    routeModules(fileName).default || routeModules(fileName)
  if (Array.isArray(routeModuleItem)) {
    staticRoutes = staticRoutes.concat(routeModuleItem)
  } else {
    asyncRoutes.push((callback: Function) => {
      routeModuleItem(callback)
    })
  }
})

// 设置404路由
const defaultRouteIndex = staticRoutes.findIndex(({ path }) => path === '*')
let defaultRoute: RouteConfig = {
  path: '*',
  redirect: { name: '404' }
}
if (defaultRouteIndex !== -1) {
  defaultRoute = staticRoutes.splice(defaultRouteIndex, 1)[0]
}

const router = new VueRouter({
  routes: appRoutes.concat(mainRoute),
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

const addVueRoutes = (routes: RouteConfig[]) => {
  // router@4 采用单路由
  // addRoute
  if (VueRouter.version.substring(0, 1) <= '3') {
    if (Array.isArray(routes) && routes.length !== 0) {
      router.addRoutes(routes)
    }
  }
}

// 执行队列
function initAsyncRoutes(callback: Function, initRoutes: RouteConfig[] = []) {
  const nextRoute = asyncRoutes.shift()
  nextRoute &&
    nextRoute((routes: RouteConfig[]) => {
      initRoutes = initRoutes.concat(routes)
      if (asyncRoutes.length <= 0) {
        mainRoute.name = 'MainEntry'
        mainRoute.children = (mainRoute.children || []).concat(initRoutes)
        addVueRoutes([
          mainRoute,
          {
            ...defaultRoute
          }
        ])
        callback && callback()
      } else {
        initAsyncRoutes(callback, initRoutes)
      }
    })
}
if (asyncRoutes.length !== 0) {
  ;(router.options as any).isLoading = false
  asyncRoutes.push((callback: Function) => {
    callback(defaultRoute)
  })
  asyncRoutes.push((callback: Function) => {
    ;(router.options as any).isLoading = true
    callback([])
  })
} else {
  staticRoutes.push(defaultRoute)
}

router.beforeEach(async (routeTo: any, routeFrom: any, next: Function) => {
  if ((router.options as any).isLoading) {
    if (appConfig.routerLoading) {
      // 直接进入的第一个页面不显示路由切换的进度条
      if (routeFrom.name) {
        NProgress.start()
      }
    }
    // 如果有部分路由不需要登录即可查看（如分享类页面），
    // 可设置路由配置的 meta.noAuthRequired 为 `true`
    const noAuthRequired = routeTo.matched.some(
      (route: any) => route.meta.noAuthRequired
    )
    // 不需登录判断的页面直接进入
    if (noAuthRequired) return next()
    routeCheckAuth(routeTo, routeFrom, next)
  } else {
    initAsyncRoutes(() => {
      next({ ...routeTo, replace: true } as any)
    })
  }
})
router.afterEach(() => {
  if (appConfig.routerLoading) {
    NProgress.done()
  }
})

addVueRoutes(staticRoutes)

export default router
