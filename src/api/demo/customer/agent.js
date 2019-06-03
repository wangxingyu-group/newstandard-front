import request from '@/utils/request'

export function createAgent(data) {
  return request({
    url: '/agent/create',
    method: 'post',
    data
  })
}

export function updateAgent(data) {
  return request({
    url: '/agent/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/agent/list',
    method: 'get',
    params: query
  })
}

export function fetchAgent(id) {
  return request({
    url: '/agent/detail',
    method: 'get',
    params: { id }
  })
}

export function updateArticle(data) {
  return request({
    url: '/agent/update',
    method: 'post',
    data
  })
}
