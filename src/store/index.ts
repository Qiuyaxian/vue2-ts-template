import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production'
})

// // 自动执行每个模块的 init 方法
// for (const moduleName of Object.keys(modules)) {
//   if (modules[moduleName].actions && modules[moduleName].actions.init) {
//     store.dispatch(`${moduleName}/init`)
//   }
// }

export default store
