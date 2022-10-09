import _ from 'lodash'
import { RouteConfig } from 'vue-router'
import store from '@/store'

export const _import = (filePath: string) => () => import(`@/views/${filePath}`)

async function checkAuth(to: any, from: any, next: Function) {
  // 在没有会话接口用于验证登录状态的项目，使用是否获取到登录用户判断是否已登录。
  if (store.getters['auth/loggedIn']) {
    return next()
  } else {
    // return next({ name: '403' })
    // 除了直接进入 403 ，还可以通过下面代码的形式，在每次切换路由时尝试作一次请求获取登录状态，
    // 该形式不会与 store/auth/init 内的登录方法冲突产生两次请求，
    // 适用于登录失效后有其他补偿登录形式，如小弹窗、在新标签页面登录后再回来原页面有切换路由的操作。
    // 如果对于登录后有其他逻辑也可在此处处理，若无需跳转则直接运行 `next()` 即可。
    try {
      await store.dispatch('auth/getCurrentUser')
    } catch (e) {}
    if (store.getters['auth/loggedIn']) {
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
export function createRoutes (menuList:RouteConfig[]  = [], routes: RouteConfig[] = []) {
  if (Array.isArray(menuList)) {
    menuList.forEach((menuItem: any) => {
      if(menuItem.path && menuItem.path.length !== ''){
        const route: RouteConfig = {
            path: menuItem.path,
            component: _import(menuItem.component),
            //路由元信息
            meta: menuItem.meta || {},
            children:[]
        };
        if(menuItem.name) route.name = menuItem.name;
        //是否需要权限
        if(menuItem.isAuth && !menuItem['beforeEnter']){
          route.beforeEnter = (to, from, next) => {
            checkAuth(to, from, next)
          }
        } else if(_.has(menuItem, 'beforeEnter') && _.isFunction(menuItem['beforeEnter'])){
          route['beforeEnter'] = menuItem['beforeEnter'];
        }
        
        if(_.has(menuItem, 'children') && menuItem.children.length !== 0){
          route['children'] = createRoutes(menuItem.children);
        }
        routes.push(route);
      } else {
        throw new Error('path is not null');
      }
    })
  }
  return routes; 
}