import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/callOutSettings/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/callOutSettings/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/callOutSettings/list',
    method: 'get',
    params: query
  })
}
