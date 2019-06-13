import request from '@/utils/request'

export function createServiceDetails(data) {
  return request({
    url: '/registration/create',
    method: 'post',
    data
  })
}

export function updateServiceDetails(data) {
  return request({
    url: '/registration/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/registration/list',
    method: 'get',
    params: query
  })
}

export function fetchServiceDetails(id) {
  return request({
    url: '/registration/detail',
    method: 'get',
    params: { id }
  })
}
