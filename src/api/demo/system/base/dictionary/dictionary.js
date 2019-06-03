import request from '@/utils/request'

export function createDictionary(data) {
  return request({
    url: '/dictionary/create',
    method: 'post',
    data
  })
}

export function updateDictionary(data) {
  return request({
    url: '/dictionary/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/dictionary/list',
    method: 'get',
    params: query
  })
}

export function fetchDictionary(query) {
  return request({
    url: '/dictionary_detail/detail',
    method: 'get',
    params: query
  })
}
