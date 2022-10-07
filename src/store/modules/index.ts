import _ from 'lodash'
import { ModuleTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

interface ModuleWrap {
  modules: ModuleTree<any>
}

// 递归获取各子目录模块命名空间
function getNamespace (subtree: ModuleWrap, path: string[]): ModuleWrap {
  if (path.length === 1) return subtree

  const namespace = path.shift() as string
  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace]
  }

  return getNamespace(subtree.modules[namespace] as ModuleWrap, path)
}

const root: ModuleWrap = {
  modules: {}
}

// 查找当前目录下所有的非单元测试 js 文件
const requireModule = require.context(
  '.',
  true,
  /^((?!index|\.unit\.).)*\.tsx?$/
)

requireModule.keys().forEach((fileName: string) => {
  // 拆分文件路径，并以驼峰格式存储各路径层次名至数组
  const modulePath: string[] = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .split(/\//)
    .map(_.camelCase)

  // 从当前路径获取模块内容
  const { modules } = getNamespace(root, modulePath)

  // 添加获取到的模块内容
  const module = {
    namespaced: true,
    ...requireModule(fileName)
  }
  if (module.mapFields) {
    module.getters = {
      ...(module.getters || {}),
      getField
    }
    module.mutations = {
      ...(module.mutations || {}),
      updateField
    }
  }
  modules[modulePath.pop() as string] = module
})

export default root.modules
