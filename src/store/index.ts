import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})

// 自动执行每个模块的 init 方法
for (const moduleName of Object.keys(modules)) {
  const moduleItem = modules[moduleName]
  if (moduleItem && moduleItem.actions && moduleItem.actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store
