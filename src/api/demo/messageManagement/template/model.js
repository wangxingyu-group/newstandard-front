import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/model/list',
    method: 'get',
    params: query
  })
}

export function firesList(query) {
  return request({
    url: '/model/fires',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/model/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/model/pv',
    method: 'get',
    params: { pv }
  })
}

export function createFires(data) {
  return request({
    url: '/model/createF',
    method: 'post',
    data
  })
}

export function createArticle(data) {
  return request({
    url: '/model/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/model/update',
    method: 'post',
    data
  })
}
