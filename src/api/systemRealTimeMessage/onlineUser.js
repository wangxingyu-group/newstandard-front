import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/onlineUser/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/onlineUser/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/onlineUser/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/onlineUser/list',
    method: 'get',
    params: query
  })
}
