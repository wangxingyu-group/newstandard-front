import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/question/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/question/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/question/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/question/list',
    method: 'get',
    params: query
  })
}
