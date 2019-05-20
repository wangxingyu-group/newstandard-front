import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/preCustomer/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/preCustomer/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/preCustomer/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/preCustomer/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/preCustomer/update',
    method: 'post',
    data
  })
}
