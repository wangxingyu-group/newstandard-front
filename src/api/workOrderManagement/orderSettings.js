import request from '@/utils/request'

export function createServiceDetails(data) {
  return request({
    url: '/orderSettings/create',
    method: 'post',
    data
  })
}

export function updateServiceDetails(data) {
  return request({
    url: '/orderSettings/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/orderSettings/list',
    method: 'get',
    params: query
  })
}

export function fetchServiceDetails(id) {
  return request({
    url: '/orderSettings/detail',
    method: 'get',
    params: { id }
  })
}
