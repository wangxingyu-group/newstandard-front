import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/onlineSeating/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/onlineSeating/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/onlineSeating/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/onlineSeating/list',
    method: 'get',
    params: query
  })
}
