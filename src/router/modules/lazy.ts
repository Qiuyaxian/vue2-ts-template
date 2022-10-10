import { createRoutes } from '../utils'
const LazyLoadingRoutes = function (callback: Function | null) {
  const routes = createRoutes([
    {
      path: '/500',
      name: '500',
      meta: { noAuthRequired: true },
      component: 'layout/ErrorPage/401'
    }
  ])
  callback && callback(routes)
  // setTimeout(() => {
  //   const routes = createRoutes([
  //     {
  //       path: '/500',
  //       name: '500',
  //       meta: { noAuthRequired: true },
  //       component: 'layout/ErrorPage/401',
  //     }
  //   ])
  //   callback && callback(routes)
  // }, 1000)
}
export default LazyLoadingRoutes
