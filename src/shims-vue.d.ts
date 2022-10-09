// import { CreateElement, VNode } from 'vue'
// import { RenderContext, DefaultProps as Props } from 'vue/types/options'
// import VueRouter, { Route } from "vue-router"

// declare module 'vue/types/vue' {
//   interface Vue {
//     $router: VueRouter
//     $route: Route
//     // hack is for funcitonal component type inference, should not used in user code
//     render?(createElement: CreateElement, hack: RenderContext<Props>): void
//     renderError?: (h: () => VNode, err: Error) => VNode
//     beforeCreate?(this: Vue): void
//     created?(): void
//     beforeDestroy?(): void
//     destroyed?(): void
//     beforeMount?(): void
//     mounted?(): void
//     beforeUpdate?(): void
//     updated?(): void
//     activated?(): void
//     deactivated?(): void
//     errorCaptured?(err: Error, vm: Vue, info: string): boolean | void
//   }
// }

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'lodash'
declare module 'lodash/isFunction'
declare module 'lodash/isPlainObject'

declare module 'vuex-map-fields'
declare module 'nprogress'

// 定义样式
declare module '*.less' {
  const less: any
  export default less
}
// 定义图片类型
declare module '*.jpg'

declare module '*.jpng'

declare module '*.png'

