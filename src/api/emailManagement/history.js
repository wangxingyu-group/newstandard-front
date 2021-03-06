import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/email/history/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/email/history/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/email/history/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/email/history/list',
    method: 'get',
    params: query
  })
}
