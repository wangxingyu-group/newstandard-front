import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function firesList(query) {
  return request({
    url: '/user/fires',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/user/pv',
    method: 'get',
    params: { pv }
  })
}

export function createFires(data) {
  return request({
    url: '/user/createF',
    method: 'post',
    data
  })
}

export function createArticle(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
