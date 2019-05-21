import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/customer/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/customer/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/customer/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  })
}
