import request from '@/utils/request'

export function createDictionary(data) {
  return request({
    url: '/trainResource/create',
    method: 'post',
    data
  })
}

export function updateDictionary(data) {
  return request({
    url: '/trainResource/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/trainResource/list',
    method: 'get',
    params: query
  })
}

export function fetchDictionary(query) {
  return request({
    url: '/trainResource/detail',
    method: 'get',
    params: query
  })
}
