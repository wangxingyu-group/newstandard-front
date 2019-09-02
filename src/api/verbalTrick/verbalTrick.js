import request from '@/utils/request'

export function createServiceDetails(data) {
  return request({
    url: '/verbalTrick/create',
    method: 'post',
    data
  })
}

export function updateServiceDetails(data) {
  return request({
    url: '/verbalTrick/update',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/verbalTrick/list',
    method: 'get',
    params: query
  })
}

export function fetchServiceDetails(query) {
  return request({
    url: '/verbalTrick/detail',
    method: 'get',
    params: query
  })
}
