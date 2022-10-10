import request from '../utils/request'
import apiConfig from '../api.config'

const silentRequestService = request({
  ...apiConfig.main,
  silent: true,
  transformResponse: (response: any) => {
    return response.data
  }
})

export function getCurrentUser() {
  return silentRequestService({
    url: '/user/getCurrentUser',
    method: 'get'
  })
}
