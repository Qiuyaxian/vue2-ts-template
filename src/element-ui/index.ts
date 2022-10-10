/**
 * UI组件, 统一使用饿了么桌面端组件库(https://github.com/ElemeFE/element）
 *
 * 使用:
 *  1. 项目中需要的组件进行释放(解开注释)
 *
 * 注意:
 *  1. 打包只会包含释放(解开注释)的组件, 减少打包文件大小
 */

import Vue from 'vue'

import {
  Button,
  Loading
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)

Vue.use(Loading.directive)
Vue.prototype.$ELEMENT = { size: 'medium' }
