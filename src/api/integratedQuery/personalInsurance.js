import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/personalInsurance/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/personalInsurance/update',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/personalInsurance/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchList(query) {
  return request({
    url: '/personalInsurance/list',
    method: 'get',
    params: query
  })
}
