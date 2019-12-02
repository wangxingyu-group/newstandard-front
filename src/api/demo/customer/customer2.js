import request from '@/utils/request'

export function createCustomer(data) {
  return request({
    url: '/customer/create',
    method: 'post',
    data
  })
}

export function updateCustomer(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/customer/list',
    method: 'get',
    params: query
  })
}

export function fetchCustomer(id) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params: { id }
  })
}

export function updateArticle(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  })
}
