import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/group/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/group/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/group/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/group/list',
    method: 'get',
    params: query
  })
}
