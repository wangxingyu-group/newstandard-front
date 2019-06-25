import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/class1/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/class1/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/class1/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/class1/list',
    method: 'get',
    params: query
  })
}
