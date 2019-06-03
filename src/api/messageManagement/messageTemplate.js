import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/template/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/template/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/template/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/template/list',
    method: 'get',
    params: query
  })
}
