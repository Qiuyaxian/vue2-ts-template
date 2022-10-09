import { RouteConfig } from 'vue-router'
import { createRoutes } from '../utils'
// 静态页面
const routes: RouteConfig[] = createRoutes([
  {
    path: '/home',
    name: 'Home',
    meta: { noAuthRequired: true },
    component: 'Home',
  },
  {
    path: '/401',
    name: '401',
    meta: { noAuthRequired: true },
    component: 'layout/ErrorPage/401',
  },
  {
    path: '/404',
    name: '404',
    meta: { noAuthRequired: true },
    component: 'layout/ErrorPage/404',
  }
])
export default routes