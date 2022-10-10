import _ from 'lodash'
import { RouteConfig } from 'vue-router'
import store from '@/store'

export const _import = (filePath: string) => () => import(`@/views/${filePath}`)

export async function routeCheckAuth(to: any, from: any, next: Function) {
  // 在没有会话接口用于验证登录状态的项目，使用是否获取到登录用户判断是否已登录。
  if (store.getters['user/loggedIn']) {
    return next()
  } else {
    try {
      await store.dispatch('user/getCurrentUser')
    } catch (e) {}
    if (store.getters['user/loggedIn']) {
      return next()
    } else {
      return next({ name: '401' })
    }
  }
}

/**
 * [addRoutes 处理路径，返回结果]
 * @param  {Array}  menuList [description]
 * @param  {Array}  routes   [description]
 * @return {[type]} routes   [description]
 */
export function createRoutes(
  menuList: RouteConfig[] = [],
  routes: RouteConfig[] = []
) {
  if (Array.isArray(menuList)) {
    menuList.forEach((menuItem: any) => {
      if (menuItem.path && menuItem.path.length !== '') {
        const route: RouteConfig = {
          path: menuItem.path,
          component: _import(menuItem.component),
          // 路由元信息
          meta: menuItem.meta || {},
          children: []
        }
        if (menuItem.name) route.name = menuItem.name
        if (
          _.has(menuItem, 'beforeEnter') &&
          _.isFunction(menuItem['beforeEnter'])
        ) {
          route['beforeEnter'] = menuItem['beforeEnter']
        }

        if (_.has(menuItem, 'children') && menuItem.children.length !== 0) {
          route['children'] = createRoutes(menuItem.children)
        }
        routes.push(route)
      } else {
        throw new Error('path is not null')
      }
    })
  }
  return routes
}
