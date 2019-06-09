import request from '@/utils/request'

export function createSettings(data) {
  return request({
    url: '/channelConfig/create',
    method: 'post',
    data
  })
}

export function updateSettings(data) {
  return request({
    url: '/channelConfig/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/channelConfig/list',
    method: 'get',
    params: query
  })
}
