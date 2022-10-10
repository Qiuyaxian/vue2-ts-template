import isPlainObject from 'lodash/isPlainObject'

interface ApiConfig {
  url: string;
  [k: string]: any;
}

const confEnv: string | null | undefined = process.env.REACT_APP_ENV

function _loadApiEnvConfig(env: string | null | undefined): ApiConfig | null {
  const apiEnvConfigs = require.context('./config', true, /\.js$/)
  const envRegExp = new RegExp('/' + env + '.js', 'i')
  const apiEnvConfigKeys = apiEnvConfigs.keys()
  const apiConfigKey: string | undefined = apiEnvConfigKeys.find((fileName) => {
    return envRegExp.test(fileName)
  })
  if (!apiConfigKey) return null
  return apiEnvConfigs(apiConfigKey).default || apiEnvConfigs(apiConfigKey)
}

const globalApiConfig = _loadApiEnvConfig(confEnv)
if (!globalApiConfig) {
  throw Error(`${confEnv} api 配置项不存在，请在 src/api/config/ 内配置。`)
}

/**
 *
 * input:
 * {
 *   platform1: 'http://platform1.server',
 *   platform2: {
 *     url: 'http://platform2.server',
 *     apiKey: 'platform2-apikey
 *   }
 * }
 *
 * return:
 * {
 *   platform1: {
 *     baseURL: 'http://platform1.server'
 *   },
 *   platform2: {
 *     baseURL: 'http://platform2.server',
 *     apiKey: 'platform2-apikey
 *   }
 * }
 */
function _normalizeApiConfig(originConfig: ApiConfig) {
  const finalConfig: any = {}
  const invalidConfig: any[] = []
  Object.entries(originConfig).forEach(([platform, config]) => {
    let normalizedConfig: any = null
    if (typeof config === 'string') {
      normalizedConfig = { baseURL: config }
    } else if (isPlainObject(config)) {
      const { url, apiKey } = config
      if (url) {
        normalizedConfig = { baseURL: config.url }
        if (apiKey) {
          normalizedConfig['apiKey'] = apiKey
        }
      }
    }
    if (normalizedConfig) {
      finalConfig[platform] = normalizedConfig
    } else {
      invalidConfig.push(platform)
    }
  })
  if (invalidConfig.length > 0) {
    throw Error(`Invalid api config (${confEnv}): ${invalidConfig.join(', ')}`)
  }

  return finalConfig
}

const normalizedApiConfig = _normalizeApiConfig(globalApiConfig)

export default normalizedApiConfig
