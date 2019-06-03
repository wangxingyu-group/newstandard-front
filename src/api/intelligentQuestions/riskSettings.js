import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/riskSettings/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/riskSettings/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/riskSettings/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/riskSettings/list',
    method: 'get',
    params: query
  })
}
