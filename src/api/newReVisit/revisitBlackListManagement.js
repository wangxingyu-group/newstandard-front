import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/revisitBlackListManagement/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/revisitBlackListManagement/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/revisitBlackListManagement/list',
    method: 'get',
    params: query
  })
}
