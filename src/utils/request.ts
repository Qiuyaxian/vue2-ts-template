import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import isFunction from 'lodash/isFunction'
import { Message } from 'element-ui'
import appConfig from '../app.config'
const apiKeyName = appConfig.apiKeyName
let requestCount = 0

function NProgressStart() {
  if (requestCount === 0) {
    NProgress.start()
  }
  requestCount++
}

function NProgressDone() {
  requestCount--
  if (requestCount > 0) {
    NProgress.inc()
  } else {
    NProgress.done()
  }
}

interface RequestConfig {
  apiKey?: string | number | undefined;
  [k: string]: any;
}

export default function HttpRequest(requestConfig: RequestConfig = {}) {
  const {
    apiKey = null,
    silent = false,
    transformResponse = null,
    transformRequestConfig = null,
    ...axiosRequestConfig
  } = requestConfig
  const service: AxiosInstance = axios.create({
    timeout: appConfig.requestTimeout,
    withCredentials: true,
    responseType: 'json',
    ...axiosRequestConfig
  })

  service.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (appConfig.requestLoading) {
        NProgressStart()
      }
      if (apiKey) {
        config.headers = config.headers || {}
        config.headers[apiKeyName] = apiKey
      }
      return isFunction(transformRequestConfig)
        ? transformRequestConfig(config)
        : config
    },
    (error: any) => Promise.reject(error)
  )

  // 拦截响应回调
  service.interceptors.response.use(
    (response: AxiosResponse): Promise<any> => {
      if (appConfig.requestLoading) {
        NProgressDone()
      }

      const res = response.data
      if (isFunction(transformResponse)) {
        return transformResponse(res)
      }
      if (res.is_success === true) {
        return res
      } else if (!silent) {
        let isShowMessage = true
        let showMessage = ''
        let logMessage = ''

        if (res.error_info) {
          const { code, msg, validation_error_info } = res.error_info
          // 接口约定 code 小于 0 为不提示的错误信息
          isShowMessage = code > 0
          if (Array.isArray(validation_error_info)) {
            showMessage = validation_error_info
              .map((error) => error.message)
              .join(', ')
          } else {
            showMessage = msg
          }
          logMessage = `(${code}) ${showMessage}`
        } else {
          showMessage = '未知错误。'
        }

        if (isShowMessage) {
          Message({
            message: appConfig.errorMessageHasCode ? logMessage : showMessage,
            type: 'error',
            duration: 5000
          })
        }

        if (appConfig.logOnRequestError) {
          // eslint-disable-next-line no-console
          console.error(
            `[Error] 请求失败。url: ${response.request.responseURL}, message: ${logMessage}`
          )
        }
      }

      return Promise.reject(res.error_info)
    },
    (error) => {
      if (appConfig.requestLoading) {
        NProgressDone()
      }

      if (!silent) {
        if (appConfig.logOnRequestError) {
          let message = error.message || ''
          if (message.match(/timeout of (\d*)ms exceeded/)) {
            message = '接口调用超时。'
          }
          // eslint-disable-next-line no-console
          console.error(`[Error] ${message}`)
        }
      }
      return Promise.reject(error)
    }
  )
  return service
}
