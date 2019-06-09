import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/revisitLogRecord/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/revisitLogRecord/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/revisitLogRecord/list',
    method: 'get',
    params: query
  })
}
