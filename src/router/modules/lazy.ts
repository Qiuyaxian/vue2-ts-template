import { createRoutes } from '../utils'
const LazyLoadingRoutes = function (callback: Function | null) {
  const routes = createRoutes([
    {
      path: '/user',
      name: 'User',
      meta: { noAuthRequired: true },
      component: 'User'
    }
  ])
  callback && callback(routes)
}
export default LazyLoadingRoutes
