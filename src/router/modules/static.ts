import { RouteConfig } from 'vue-router'
import { createRoutes } from '../utils'
// 静态页面
const routes: RouteConfig[] = createRoutes([
  {
    path: '/home',
    name: 'Home',
    meta: { noAuthRequired: true },
    component: 'Home'
  },
  {
    path: '/401',
    name: '401',
    meta: { noAuthRequired: true },
    component: 'layout/ErrorPage/401'
  },
  {
    path: '/403',
    name: '403',
    meta: { noAuthRequired: true },
    component: 'layout/ErrorPage/403'
  },
  {
    path: '/404',
    name: '404',
    meta: { noAuthRequired: true },
    component: 'layout/ErrorPage/404'
  },
  {
    path: '/500',
    name: '500',
    meta: { noAuthRequired: true },
    component: 'layout/ErrorPage/500'
  }
])
export default routes
