import request from '@/utils/request'

export function createPreCustomer(data) {
  return request({
    url: '/preCustomer/create',
    method: 'post',
    data
  })
}

export function updatePreCustomer(data) {
  return request({
    url: '/preCustomer/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/preCustomer/list',
    method: 'get',
    params: query
  })
}

export function fetchPreCustomer(id) {
  return request({
    url: '/preCustomer/detail',
    method: 'get',
    params: { id }
  })
}
