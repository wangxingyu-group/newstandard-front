import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/successRate/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/successRate/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/successRate/list',
    method: 'get',
    params: query
  })
}
