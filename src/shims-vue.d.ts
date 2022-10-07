declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'lodash'

declare module 'vuex-map-fields'

// 定义样式
declare module '*.less' {
  const less: any
  export default less
}
// 定义图片类型
declare module '*.jpg'

declare module '*.jpng'

declare module '*.png'
