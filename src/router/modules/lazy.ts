import { createRoutes } from '../utils'
const LazyLoadingRoutes = function (callback: Function | null) {
  const routes = createRoutes([
    {
      path: '/user',
      name: 'User',
      meta: { noAuthRequired: false },
      component: 'User'
    }
  ])
  callback && callback(routes)
}
export default LazyLoadingRoutes
