import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/adjust/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/adjust/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/adjust/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/adjust/list',
    method: 'get',
    params: query
  })
}
