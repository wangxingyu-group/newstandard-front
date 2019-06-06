import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/revisitTaskMonitor/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/revisitTaskMonitor/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/revisitTaskMonitor/list',
    method: 'get',
    params: query
  })
}
